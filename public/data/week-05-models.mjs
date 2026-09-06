// SLOP1276 Week 5: explicit teaching models, with no fitted app probabilities.
const probability = p => {
  if (!Number.isFinite(p) || p < 0 || p > 1) throw new RangeError('Use a probability in [0, 1].');
};
const count = n => {
  if (!Number.isSafeInteger(n) || n < 0) throw new RangeError('Use non-negative safe integer counts.');
};

export function mutualProbability(pA, pBGivenA) {
  probability(pA);
  probability(pBGivenA);
  // When pA is zero the joint is zero; the supplied conditional is unused.
  return pA * pBGivenA;
}

export function pairSummary({ both, aOnly, bOnly, neither }) {
  [both, aOnly, bOnly, neither].forEach(count);
  const total = both + aOnly + bOnly + neither;
  count(total);
  if (!total) throw new RangeError('The pair table must contain at least one pair.');
  const a = both + aOnly, b = both + bOnly;
  return { total, pA: a / total, pB: b / total, joint: both / total,
    pBGivenA: a ? both / a : null, pAGivenB: b ? both / b : null };
}

// This function REQUIRES independent match indicators. Naming is part of the API.
// Probabilities may differ; the common-p binomial example is a special case.
export function independentOpportunities(probabilities) {
  if (!Array.isArray(probabilities)) throw new TypeError('Supply an array of probabilities.');
  // Array.from also exposes sparse entries to validation.
  const values = Array.from(probabilities);
  values.forEach(probability);
  const expected = values.reduce((sum, p) => sum + p, 0);
  const logNone = values.reduce((sum, p) => sum + Math.log1p(-p), 0);
  return { expected, none: Math.exp(logNone), atLeastOne: -Math.expm1(logNone) || 0 };
}

export function venueDecision(venue, availableMinutes = 120, budgetCents = 2000) {
  const { outboundMinutes, meetingMinutes, returnMinutes, transportCents, activityCents } = venue;
  [outboundMinutes, meetingMinutes, returnMinutes, transportCents, activityCents, availableMinutes, budgetCents].forEach(count);
  const minutes = outboundMinutes + meetingMinutes + returnMinutes;
  const costCents = transportCents + activityCents;
  [minutes, costCents].forEach(count);
  const reasons = [];
  if (minutes > availableMinutes) reasons.push('time');
  if (costCents > budgetCents) reasons.push('budget');
  return { minutes, costCents, spareMinutes: availableMinutes - minutes,
    spareCents: budgetCents - costCents, feasible: reasons.length === 0, reasons };
}

export function windowRate(matches, exposures) {
  [matches, exposures].forEach(count);
  if (matches > exposures) throw new RangeError('Matches cannot exceed exposures.');
  return exposures ? matches / exposures : null;
}
