import type { AnswerKey } from '../../lib/tutorial-quiz';

export const dateAuditAnswers: AnswerKey = {
  orientation: {
    answer: 'row-update',
    explanation: 'The erroneous vector sums to 0.625: it read the C column instead of the C row. A row-vector update uses next[j] = sum_i current[i] × P[i,j], producing (0.375, 0.25, 0.25, 0.125) after one step from C. Read only the old vector until every new component is computed. Normalising a transposed result changes the model rather than repairing its orientation. The supplied rows already sum to one; the N and E rows retain absorbed mass.',
  },
  sampler: {
    answer: 'half-open',
    explanation: 'At C, u = 0.625 is excluded from A’s interval [0.375, 0.625) and included in N’s [0.625, 0.875). At N, the row is (0, 0, 1, 0). With u = 0, strict < skips both zero cumulative totals and selects N. Replacing < with <= would first choose A at 0.625 and can also choose a zero-mass C at zero. Keep drawing after absorption to preserve the workbook’s two-draw-per-path contract; the endpoint stays fixed.',
  },
  endpoint: {
    answer: 37.5,
    explanation: 'The N contributions are 0.375 × 0.25 = 0.09375, 0.25 × 0.125 = 0.03125, 0.25 × 1 = 0.25 and 0.125 × 0 = 0. Their sum is 0.375 = 37.5%. Dropping the already-absorbed term would report only 12.5%. The complete vector is (0.203125, 0.15625, 0.375, 0.265625), which sums to one. Conditioning on N or E would change the denominator; eventual absorption would change the horizon. This is an assumed model result, not a measured agreement rate.',
  },
  simulation: {
    answer: 'prefix',
    explanation: 'From A, 177/800 = 0.22125 and 345/1600 = 0.215625. Against exact N = 0.21875, absolute errors are 0.0025 and 0.003125 in probability units: 0.25 and 0.3125 percentage points. This cell became less accurate even though the run grew. Restarting seed 202710 with the same path reset and two-draw contract makes the first 800 paths identical. Preserve those settings and counts for reproduction; neither a smaller error nor a repeated seed validates the assumed probabilities for real people.',
  },
  bill: {
    answer: 'review-bill',
    explanation: 'The cost version assigns $8 of drinks to each actor. Alex’s $2 transport makes Alex’s outing total $10, while counterpart transport remains unknown. The café comparison is $18 versus $8 + $8 = $16, so the bill enters review. Old split terms cannot allocate a changed amount automatically; clarify and obtain a separate renewed agreement. Leaving is allowed and preserves review in the ended record. Even a matching bill acknowledged by both actors would record answers, not take payment or establish another date.',
  },
  observations: {
    answer: 'withdrawal',
    explanation: 'A progresses pending → agreed → declined before leaving; withdrawal clears the agreeing actors and the decline cannot be retried. B has no relevant response, so it remains unobserved. C has one agreement when the meeting ends, so it remains pending; the queued event cannot alter any part of its ended snapshot. All three export meeting = ended separately from next-date status. Absorbing N freezes a first simulated endpoint; it cannot make an observed agreement irrevocable or replace missing evidence.',
  },
};
