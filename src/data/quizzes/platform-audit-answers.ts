import type { AnswerKey } from '../../lib/tutorial-quiz';

export const platformAuditAnswers: AnswerKey = {
  queue: {
    answer: 'filtered',
    explanation: 'Nia fails the time check before ranking. Sol and Rio pass the stated time and cost checks; Sol’s 9 beats Rio’s 7, so the one-card limit exposes Sol. Rio is eligible but unseen. Travel remains unchecked, and exposure establishes no mutual interest.',
  },
  disclosure: {
    answer: 'scoped',
    explanation: 'The disclosure names signal categories, not an implementation. Record it as the platform’s description and keep the algorithm and coefficients unknown. The course’s toy Elo model cannot fill those gaps. Nor does missing detail prove that a rating model is absent.',
  },
  elo: {
    answer: 1412,
    explanation: 'The rating gap is zero, so E = 1 / (1 + 10^0) = 0.5. Then 1400 + 24 × (1 − 0.5) = 1412. Adding all 24 points ignores the expected result. This is one classroom update, not a production-platform score or a measure of anyone’s worth.',
  },
  census: {
    answer: 'corrected',
    explanation: 'Only active grows: 250 + 50 = 300. Reciprocal-to-active is 30/300 = 10%; reciprocal-to-available stays 30/100 = 30%. Dividing by 150 would wrongly mark the new records available. Eligibility does not establish attraction or a chance of a date.',
  },
  dashboard: {
    answer: 'bounded',
    explanation: 'A’s observed rate is 36/900 = 4%; B’s is 20/250 = 8%. Counts rank A first; rates rank B first. Different audiences and allocation can explain differences, so this log alone cannot isolate a wording effect. Preserve the denominator and the causal limitation in your audit.',
  },
  feedback: {
    answer: 'allocation',
    explanation: 'Expected count is exposures × assumed response probability. After the swap, B expects 800 × 0.05 = 40 and A expects 200 × 0.05 = 10. The response probabilities did not change. A rule that rewards counts can reinforce an exposure advantage; an expectation is not a guaranteed realised count or evidence about real platforms.',
  },
};
