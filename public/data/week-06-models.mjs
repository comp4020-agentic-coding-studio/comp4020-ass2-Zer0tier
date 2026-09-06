// SLOP1276 Week 6. A snapshot classifier, not a sender, scheduler or NLP model.
const text = value => typeof value === 'string' && value.trim().length > 0;
const nonNegative = value => Number.isFinite(value) && value >= 0;

export function routeMessage(input) {
  const trace = [];
  const result = (action, reason, evidence = []) => ({ action, reason, evidence, trace: [...trace], sendsMessage: false });
  if (!input || typeof input !== 'object' || Array.isArray(input)) return result('review', 'Invalid snapshot');
  // Terminal evidence takes priority even if unrelated topic metadata is broken.
  trace.push('terminal');
  if (input.closed === true || ['declined', 'blocked'].includes(input.boundary) || input.inbound === 'decline') {
    return result('stop', 'Closed, declined or blocked');
  }
  trace.push('metadata');
  if (input.closed !== false || input.boundary !== 'clear' || typeof input.sent !== 'boolean' ||
      !['none', 'reply'].includes(input.inbound)) return result('review', 'Incomplete or unknown routing metadata');
  trace.push('history');
  if (input.inbound === 'reply' && !input.sent) return result('review', 'Reply recorded without an opener in this conversation');
  if (input.inbound === 'reply') return result('respond', 'Review the actual reply; do not restart the opener');
  if (input.sent) return result('pending', 'Opener already sent; no new opener');
  trace.push('context');
  const recipient = input.recipient;
  if (recipient === null || recipient === undefined) return result('draft-plain', 'No recipient topic evidence');
  if (!text(recipient.id) || !(recipient.topics === null || Array.isArray(recipient.topics))) {
    return result('review', 'Malformed recipient evidence');
  }
  const topics = Array.from(recipient.topics ?? []);
  if (topics.some(item => !item || !text(item.topic) || !text(item.quote))) return result('review', 'Malformed topic evidence');
  const shared = topics.find(item => item.topic === 'board-games');
  if (shared) return result('draft-context', 'Board-games context supplied for both sides', [{ source: recipient.id, quote: shared.quote }]);
  return result('draft-plain', 'No supported shared board-games topic');
}

export function replyRate(replies, exposures) {
  if (![replies, exposures].every(Number.isSafeInteger) || replies < 0 || exposures < 0 || replies > exposures) {
    throw new RangeError('Use whole counts with 0 <= replies <= exposures.');
  }
  return exposures ? replies / exposures : null;
}

export function compareDrafts(options, valuePerReply = 10, costPerSecond = 0.05) {
  if (!Array.isArray(options) || !nonNegative(valuePerReply) || !nonNegative(costPerSecond)) {
    throw new RangeError('Supply options and finite non-negative utility parameters.');
  }
  const ids = new Set();
  const scores = [{ id: 'defer', utility: 0 }];
  const excluded = [];
  for (const option of options) {
    if (!option || !text(option.id) || option.id === 'defer' || ids.has(option.id) || typeof option.admissible !== 'boolean') {
      throw new TypeError('Options need unique IDs and an explicit admissibility decision.');
    }
    ids.add(option.id);
    // Eligibility is a prior human/policy judgement, never inferred from a score.
    if (!option.admissible) { excluded.push(option.id); continue; }
    if (!nonNegative(option.probability) || option.probability > 1 || !nonNegative(option.seconds)) {
      throw new RangeError('Use probabilities in [0,1] and finite non-negative seconds.');
    }
    const utility = valuePerReply * option.probability - costPerSecond * option.seconds;
    if (!Number.isFinite(utility)) throw new RangeError('Utility arithmetic must remain finite.');
    scores.push({ id: option.id, utility });
  }
  const maximum = Math.max(...scores.map(row => row.utility));
  // Arithmetic tolerance is a course implementation choice, not indifference data.
  const winners = scores.filter(row => Math.abs(row.utility - maximum) <= 1e-10).map(row => row.id);
  return { scores, excluded, winners, maximum };
}
