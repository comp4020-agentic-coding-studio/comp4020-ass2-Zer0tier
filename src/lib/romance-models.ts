/** Explicit course models, not proprietary dating-app implementations. */
export function eloUpdate(rating: number, opponent: number, result: 0 | 1, k = 32) {
  if (![rating, opponent, k].every(Number.isFinite) || k <= 0 || ![0, 1].includes(result)) {
    throw new RangeError('Use finite ratings, a positive K, and a result of 0 or 1.');
  }
  const expected = 1 / (1 + 10 ** ((opponent - rating) / 400));
  return rating + k * (result - expected);
}

export function compareBios(a: number, nA: number, b: number, nB: number) {
  if (![a, nA, b, nB].every(Number.isSafeInteger) || nA < 1 || nB < 1 ||
    a < 0 || b < 0 || a > nA || b > nB || nA > 1_000_000 || nB > 1_000_000) {
    throw new RangeError('Use whole counts: 1–1,000,000 exposures per bio, with positives between zero and exposures.');
  }
  const rateA = a / nA;
  const rateB = b / nB;
  const difference = rateB - rateA;
  const pooled = (a + b) / (nA + nB);
  // A deliberately conservative course guardrail, not an exact-test substitute.
  const sparse = Math.min(a, nA - a, b, nB - b) < 10;
  const z = sparse ? null : difference / Math.sqrt(pooled * (1 - pooled) * (1 / nA + 1 / nB));
  const conclusion = z === null ? 'Normal approximation withheld: a cell has fewer than 10 observations.'
    : Math.abs(z) > 1.959963984540054 ? 'Difference detected under the stated model; this does not establish causation.'
      : 'No clear difference under the stated model; this does not establish equivalence.';
  return { rateA, rateB, difference, z, conclusion };
}

export function qualityScore(features: number[], feasibilityWeight = 1) {
  if (features.length !== 4 || !features.every(n => Number.isInteger(n) && n >= 0 && n <= 4) ||
    !Number.isFinite(feasibilityWeight) || feasibilityWeight <= 0) {
    throw new RangeError('Use four integer feature scores from 0 to 4 and a positive feasibility weight.');
  }
  const [clarity, specificity, feasibility, exit] = features;
  return 100 * (clarity + specificity + feasibilityWeight * feasibility + exit) / (4 * (3 + feasibilityWeight));
}

export function conservativeRank(candidateScore: number, controls: number[]) {
  if (controls.length !== 99 || ![candidateScore, ...controls].every(n => Number.isFinite(n) && n >= 0 && n <= 100)) {
    throw new RangeError('Null Island v1 requires 99 control scores and one candidate, all between 0 and 100.');
  }
  return 1 + controls.filter(score => score >= candidateScore).length;
}

/** Exact four-state oracle for the fictional week 10 logistics model. */
export function dateLogistics(closureWhenLate = 0.1, closureWhenOnTime = 0.1, timeLimit = 110) {
  if (![closureWhenLate, closureWhenOnTime].every(p => Number.isFinite(p) && p >= 0 && p <= 1) ||
    !Number.isFinite(timeLimit) || timeLimit < 0) throw new RangeError('Use probabilities in [0,1] and a non-negative time limit.');
  const states = [false, true].flatMap(late => [false, true].map(closed => {
    const closureProbability = late ? closureWhenLate : closureWhenOnTime;
    return {
      late, closed,
      probability: (late ? 0.25 : 0.75) * (closed ? closureProbability : 1 - closureProbability),
      cost: 14 + (closed ? 6 : 0),
      minutes: 90 + (late ? 20 : 0) + (closed ? 10 : 0),
    };
  }));
  return {
    states,
    expectedCost: states.reduce((sum, state) => sum + state.probability * state.cost, 0),
    expectedMinutes: states.reduce((sum, state) => sum + state.probability * state.minutes, 0),
    failureProbability: states.filter(state => state.minutes > timeLimit || state.cost > 20)
      .reduce((sum, state) => sum + state.probability, 0),
  };
}
