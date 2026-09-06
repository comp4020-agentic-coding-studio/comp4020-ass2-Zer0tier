// SLOP1276 Week 7: authored event replay and toy decisions. No network or timers.
import { routeMessage } from './week-06-models.mjs';

const nonNegative = value => Number.isFinite(value) && value >= 0;
const text = value => typeof value === 'string' && value.trim().length > 0;
const actions = ['Ask', 'Wait'];

/**
 * @param {number} q
 * @param {{clarificationCost?: number, clarificationAllowed?: boolean}} [options]
 */
export function compareResponses(q, { clarificationCost = 5, clarificationAllowed } = {}) {
  if (!nonNegative(q) || q > 1 || !nonNegative(clarificationCost) || typeof clarificationAllowed !== 'boolean') {
    throw new RangeError('Supply q in [0,1], a finite non-negative cost and Boolean admissibility.');
  }
  const scores = [{ id: 'stop', utility: 0 }, { id: 'wait', utility: 2 * q - 1 }];
  if (clarificationAllowed) scores.push({ id: 'clarify', utility: 7 * q - clarificationCost });
  const maximum = Math.max(...scores.map(row => row.utility));
  return { scores, excluded: clarificationAllowed ? [] : ['clarify'], maximum,
    winners: scores.filter(row => Math.abs(row.utility - maximum) <= 1e-10).map(row => row.id) };
}

export function analyseGame(payoffs) {
  if (!Array.isArray(payoffs) || payoffs.length !== 2 || Array.from(payoffs).some(row =>
    !Array.isArray(row) || row.length !== 2 || Array.from(row).some(pair =>
      !Array.isArray(pair) || pair.length !== 2 || !Array.from(pair).every(Number.isFinite)))) {
    throw new TypeError('Supply a finite 2×2 matrix of [row player, column player] payoffs.');
  }
  const rowBest = [0, 1].map(col => [0, 1].filter(row => payoffs[row][col][0] === Math.max(payoffs[0][col][0], payoffs[1][col][0])));
  const columnBest = [0, 1].map(row => [0, 1].filter(col => payoffs[row][col][1] === Math.max(payoffs[row][0][1], payoffs[row][1][1])));
  const equilibria = [];
  for (const row of [0, 1]) for (const col of [0, 1]) {
    if (rowBest[col].includes(row) && columnBest[row].includes(col)) equilibria.push([actions[row], actions[col]]);
  }
  const rowDominant = [0, 1].filter(row => [0, 1].every(col => payoffs[row][col][0] > payoffs[1 - row][col][0]));
  const columnDominant = [0, 1].filter(col => [0, 1].every(row => payoffs[row][col][1] > payoffs[row][1 - col][1]));
  return { rowBest: rowBest.map(ids => ids.map(id => actions[id])), columnBest: columnBest.map(ids => ids.map(id => actions[id])),
    equilibria, rowDominant: rowDominant.map(id => actions[id]), columnDominant: columnDominant.map(id => actions[id]) };
}

export function startConversation(handoff, windowHours = 2) {
  if (!nonNegative(windowHours) || windowHours === 0) throw new RangeError('Use a finite positive observation window.');
  if (!handoff || !text(handoff.candidateVersion) || !text(handoff.invitationVersion)) throw new TypeError('Keep the candidate and invitation versions.');
  const decision = routeMessage(handoff.snapshot);
  if (!['draft-context', 'draft-plain'].includes(decision.action)) throw new Error(`Week 6 requires ${decision.action}; cannot initialise a fresh opener.`);
  return { version: 'week-07-v1', phase: 'ready', closure: null, windowHours,
    sentAt: null, lastAt: null, deliveredAt: null, readAt: null,
    observation: 'not-started', events: [], handoff: structuredClone(handoff), decision };
}

const eventTypes = ['send', 'wait', 'delivered', 'read', 'reply', 'decline', 'block', 'close', 'timeout'];

// Use only snapshots produced by startConversation/stepConversation. This is
// in-memory classroom replay, not a durable queue or a free-text interpreter.
export function stepConversation(input, event) {
  if (!input || input.version !== 'week-07-v1' || !['ready', 'sent', 'pending', 'replied', 'closed'].includes(input.phase) || !Array.isArray(input.events)) {
    throw new TypeError('Use a Week 7 conversation snapshot.');
  }
  const state = structuredClone(input);
  const trace = [state.phase];
  const finish = action => ({ state, action, trace, sendsMessage: false });
  // Terminal closure is checked before any event can change the conversation.
  if (state.phase === 'closed') return finish('stop');
  if (!event || !text(event.id) || !eventTypes.includes(event.type) || !nonNegative(event.at)) {
    throw new TypeError('Events need an ID, a known type and finite non-negative observation hours.');
  }
  const previous = state.events.find(row => row.id === event.id);
  if (previous) {
    if (previous.type !== event.type || previous.at !== event.at) throw new Error('Conflicting event ID; review the ledger.');
    return finish('duplicate');
  }
  if (state.lastAt !== null && event.at < state.lastAt) throw new RangeError('Events must be in observation-time order.');
  if (event.type === 'send' && state.phase !== 'ready') throw new Error('An opener is already recorded; no second send transition.');
  if (['wait', 'delivered', 'read', 'reply', 'timeout'].includes(event.type) && state.sentAt === null) {
    throw new Error('This event requires a recorded opener.');
  }
  const deadline = state.sentAt === null ? null : state.sentAt + state.windowHours;
  if (event.type === 'timeout' && event.at < deadline) throw new RangeError('The observation window has not ended.');
  // Half-open window [sentAt, deadline): equality is already outside the window.
  if (state.observation === 'open' && event.at >= deadline) state.observation = 'no-reply';
  state.events.push({ id: event.id, type: event.type, at: event.at });
  state.lastAt = event.at;
  if (event.type === 'send') {
    if (!Number.isFinite(event.at + state.windowHours)) throw new RangeError('The observation deadline must be finite.');
    state.sentAt = event.at;
    state.observation = 'open';
    state.phase = 'sent';
  } else if (['decline', 'block', 'close'].includes(event.type)) {
    if (event.type === 'decline') {
      trace.push('declined');
      if (state.observation === 'open') state.observation = 'reply';
    }
    if (['open', 'not-started'].includes(state.observation)) state.observation = 'ended';
    state.phase = 'closed';
    state.closure = event.type;
  } else if (event.type === 'reply') {
    if (state.observation === 'open') state.observation = 'reply';
    state.phase = 'replied';
  } else if (event.type === 'wait' && state.phase === 'sent') state.phase = 'pending';
  else if (event.type === 'delivered' && state.deliveredAt === null) state.deliveredAt = event.at;
  else if (event.type === 'read' && state.readAt === null) state.readAt = event.at;
  if (state.phase !== trace.at(-1)) trace.push(state.phase);
  if (state.phase === 'closed') return finish('stop');
  if (event.type === 'reply') return finish(state.observation === 'no-reply' ? 'review-late-reply' : 'review-reply');
  return finish('record-only');
}
