// SLOP1276 Week 8. Authored labels and observations, not a real-person detector.
import { stepConversation } from './week-07-models.mjs';

const text = value => typeof value === 'string' && value.trim().length > 0;
const nonNegative = value => Number.isFinite(value) && value >= 0;
const ratio = (numerator, denominator) => denominator ? numerator / denominator : null;

export function parseDetectorCsv(csv) {
  const [header, ...lines] = csv.trim().split(/\r?\n/);
  if (header !== 'id,malicious,score') throw new Error('Expected id,malicious,score header.');
  const seen = new Set();
  return lines.map(line => {
    const fields = line.split(',');
    const [id, label, score] = fields;
    if (fields.length !== 3 || !text(id) || seen.has(id) || !['0','1'].includes(label) || !/^(?:\d+)(?:\.\d+)?$/.test(score)) {
      throw new Error('Invalid row or duplicate detector ID.');
    }
    seen.add(id);
    if (Number(score) > 100) throw new RangeError('Scores use the authored 0–100 scale.');
    return { id, malicious: label === '1', score: Number(score) };
  });
}

export function evaluateDetector(rows, threshold = 50) {
  if (!Array.isArray(rows) || !nonNegative(threshold) || threshold > 100) throw new RangeError('Use rows and a threshold in [0,100].');
  const counts = { tp: 0, fn: 0, fp: 0, tn: 0 };
  const flaggedIds = [];
  const seen = new Set();
  for (const row of rows) {
    if (!row || !text(row.id) || seen.has(row.id) || typeof row.malicious !== 'boolean' || !nonNegative(row.score) || row.score > 100) {
      throw new TypeError('Rows need unique IDs, Boolean labels and scores in [0,100].');
    }
    seen.add(row.id);
    const flagged = row.score >= threshold;
    if (flagged) flaggedIds.push(row.id);
    counts[row.malicious ? (flagged ? 'tp' : 'fn') : (flagged ? 'fp' : 'tn')]++;
  }
  const { tp, fn, fp, tn } = counts;
  return { threshold, counts, total: rows.length, flaggedIds,
    precision: ratio(tp, tp + fp), recall: ratio(tp, tp + fn),
    falsePositiveRate: ratio(fp, fp + tn), accuracy: ratio(tp + tn, rows.length) };
}

export function errorCost(counts, falseNegativeCost = 5, falsePositiveCost = 1) {
  if (!counts || ![counts.tp, counts.fn, counts.fp, counts.tn].every(n => Number.isSafeInteger(n) && n >= 0) ||
      ![falseNegativeCost, falsePositiveCost].every(nonNegative)) throw new RangeError('Use whole counts and finite non-negative costs.');
  const cost = counts.fn * falseNegativeCost + counts.fp * falsePositiveCost;
  if (!Number.isFinite(cost)) throw new RangeError('Cost arithmetic must remain finite.');
  return cost;
}

export function projectedPrecision(prevalence, recall = 0.8, falsePositiveRate = 0.2) {
  if (![prevalence, recall, falsePositiveRate].every(n => nonNegative(n) && n <= 1)) throw new RangeError('Use probabilities in [0,1].');
  const positive = prevalence * recall;
  return ratio(positive, positive + (1 - prevalence) * falsePositiveRate);
}

const reviewKinds = ['money-request', 'identity-conflict', 'repeated-template', 'image-match'];
const observationKinds = [...reviewKinds, 'syntax-only', 'image-no-match', 'timeout', 'read-receipt', 'disclosed-automation'];

export function screenCase(card) {
  if (!card || !text(card.id) || !Array.isArray(card.observations)) throw new TypeError('Supply an authored case with observations.');
  const ids = new Set();
  const observations = Array.from(card.observations).map(item => {
    if (!item || !text(item.id) || ids.has(item.id) || !observationKinds.includes(item.kind) || !text(item.quote)) throw new TypeError('Observation IDs, kinds and quotes must be valid.');
    ids.add(item.id);
    return { id: item.id, kind: item.kind, quote: item.quote };
  });
  const evidence = observations.filter(item => reviewKinds.includes(item.kind));
  return { caseId: card.id, action: evidence.length ? 'review' : 'no-additional-flag', evidence };
}

export function startReview(conversation) {
  if (!conversation || conversation.version !== 'week-07-v1' || !['ready','sent','pending','replied','closed'].includes(conversation.phase) || !Array.isArray(conversation.events)) {
    throw new TypeError('Supply a snapshot produced by the Week 7 workbook.');
  }
  if (conversation.events.some(event => event.id.startsWith('review-clock/'))) throw new Error('The review-clock/ namespace must be unused in the incoming ledger.');
  return { version: 'week-08-v1', conversation: structuredClone(conversation), holds: [], resolutions: [], events: [], lastAt: conversation.lastAt };
}

export function stepReview(input, event) {
  if (!input || input.version !== 'week-08-v1') throw new TypeError('Use a Week 8 review snapshot.');
  const state = structuredClone(input);
  const phase = () => state.conversation.phase === 'closed' ? 'closed' : state.holds.length ? 'review' : state.conversation.phase;
  const finish = action => ({ state, phase: phase(), action, sendsMessage: false, publishesAccusation: false });
  // Closure has priority over review, clearance and every later event.
  if (state.conversation.phase === 'closed') return finish('stop');
  if (!event || !text(event.id) || event.id.startsWith('review-clock/') || !text(event.type) || !nonNegative(event.at)) throw new TypeError('Use an external event ID, type and observation time.');
  const previous = state.events.find(row => row.id === event.id);
  if (previous) {
    if (JSON.stringify(previous) !== JSON.stringify(event)) throw new Error('Conflicting review event ID.');
    return finish('duplicate');
  }
  if (state.conversation.events.some(row => row.id === event.id)) throw new Error('Event ID is already in the earlier communication ledger.');
  if (state.lastAt !== null && event.at < state.lastAt) throw new RangeError('Review events must stay in observation-time order.');
  if (event.type === 'assess') {
    // Recompute the triage result from the supplied observation codes; do not
    // accept an external verdict or the numeric fixture's answer labels.
    const finding = screenCase(event.card);
    if (finding.action === 'review') state.holds.push({ eventId: event.id, finding });
  } else if (event.type === 'resolve-review') {
    const expected = state.holds.map(hold => hold.eventId).sort();
    if (!expected.length || !text(event.note) || !Array.isArray(event.findingIds) ||
        JSON.stringify([...event.findingIds].sort()) !== JSON.stringify(expected)) throw new Error('Resolution must name every open finding and supply a review note.');
    state.resolutions.push({ findingIds: [...event.findingIds], note: event.note, findings: structuredClone(state.holds) });
    state.holds = [];
  } else {
    if (state.holds.length && event.type === 'send') throw new Error('Review holds the workflow; no send record is accepted.');
    const output = stepConversation(state.conversation, event);
    state.conversation = output.state;
  }
  if (['assess','resolve-review'].includes(event.type) && state.conversation.sentAt !== null) {
    // A derived wait checkpoint preserves Week 7's clock/window convention.
    // It is recorded once, never fed back into the review event loop.
    state.conversation = stepConversation(state.conversation, { id: `review-clock/${event.id}`, type: 'wait', at: event.at }).state;
  }
  state.events.push(structuredClone(event));
  state.lastAt = event.at;
  if (phase() === 'closed') return finish('stop');
  if (state.holds.length) return finish('hold-for-review');
  return finish(event.type === 'resolve-review' ? 'review-cleared' : 'record-only');
}

export function checkReleasePlan(plan) {
  const requirements = { fictional: true, collectsRealContact: false, acceptsPayments: false,
    uploadsThirdPartyImages: false, appIntegration: false, publishesAccusations: false };
  const failed = Object.entries(requirements).filter(([key, expected]) => !plan || plan[key] !== expected).map(([key]) => key);
  return { allowed: failed.length === 0, failed };
}
