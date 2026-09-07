import type { AnswerKey } from '../../lib/tutorial-quiz';

export const matchAuditAnswers: AnswerKey = {
  conditional: {
    answer: 'reverse',
    explanation: 'B selects in 20 + 80 = 100 pairs. Of those, 20 also have A selecting, so P(A | B) = 20/100 = 20%. By contrast, P(B | A) = 20/50 = 40%, and the joint share is 20/200 = 10%. The conditioning event chooses the denominator. The complete fixture supplies both decisions; it does not imply that a real app reveals them or that either selection is agreement to meet.',
  },
  dependence: {
    answer: 'shared-draw',
    explanation: 'Linearity gives E[X] = 10 × 0.10 = 1 in both models. Under independence, P(any) = 1 − 0.90^10 ≈ 65.13%. In S, X is ten with probability 0.10 and zero otherwise, so P(any) = 10% while its mean stays one. Equal expectations do not determine equal chances of any event. This is dependence across opportunities; it is separate from dependence between the two selections within a pair.',
  },
  joint: {
    answer: 12,
    explanation: 'P(A and B) = 0.40 × 0.30 = 0.12, or 12%. The conditional product rule already uses B given A; independence between the two selections is not required. Adding the inputs does not compute the joint event, and reporting 0.12% confuses a proportion with a percentage. These supplied probabilities belong to this separate model, not the first table or the repeated-opportunity case. A mutual match is still not a confirmed meeting.',
  },
  venue: {
    answer: 'studio',
    explanation: 'Studio uses 25 + 65 + 30 = 120 minutes and $7 + $13 = $20. Both inclusive limits pass, with zero reserve. Loft takes 121 minutes despite costing $19; Atrium takes 95 minutes but costs $20.01. Time and money must both pass: neither margin cancels a failure in the other. Studio is feasible only under these supplied deterministic inputs for Alex; recipient availability and agreement remain unknown.',
  },
  windows: {
    answer: 'denominators',
    explanation: 'Sunday’s rate is 18/120 = 15%; Tuesday’s is 8/40 = 20%. Sunday has 2.25 times the matches and three times the exposures, but its rate ratio is 0.15/0.20 = 0.75 and its rate is five percentage points lower. Different non-randomly assigned pools cannot establish what moving the same pairs to Sunday would do. A mutual-match count is not a count of agreed meetings.',
  },
  benchmark: {
    answer: 'conservative',
    explanation: 'The ratings sum to 13, giving 100 × 13/16 = 81.25 points. One higher control plus three ties makes four controls at or above the candidate: rank = 1 + 4 = 5/100. Using only strictly higher scores would incorrectly give rank 2/100. Freeze the controls, score, tie rule, candidate versions and rating evidence for later evaluation. Neither a rubric score nor a rank supplies a match probability; this candidate also does not meet the course’s rank-1/100 top-1% label.',
  },
};
