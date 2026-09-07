import type { AnswerKey } from '../../lib/tutorial-quiz';

export const communicationAuditAnswers: AnswerKey = {
  receipt: {
    answer: 'fields',
    explanation: 'The send opens the window and wait changes sent to pending. Read records readAt = 6; it supplies neither a delivery timestamp nor a reply. The phase remains pending, observation remains open and deliveredAt remains null. Missing delivery telemetry is not proof of non-delivery. A read timestamp describes an observation, not attention, intention or permission. This reducer records events and emits no messages.',
  },
  arrivals: {
    answer: 'complement',
    explanation: 'The mean is λt = 0.3 × 4 = 1.2 messages. P(zero) = exp(−1.2) ≈ 0.301194, so P(at least one) ≈ 0.698806, or 69.88%. Exactly one has probability 1.2 × exp(−1.2) ≈ 36.14%; it excludes two or more arrivals. Neither the count nor its probability identifies invitation acceptance, since declines also count. The assumed process is separate from these event logs and supplies no personal response deadline.',
  },
  threshold: {
    answer: 0.7,
    explanation: 'Equating 7q − 4.5 and 2q − 1 gives 5q = 3.5, so q = 0.7. Both utilities are 0.4, above stop’s zero; retain wait and clarify as tied maximisers. Merely beating stop is insufficient: at q = 0.65 clarification gives 0.05 while waiting gives 0.3. These are assumed scores for admissible choices. If clarification is excluded, remove it before comparing scores; neither this q nor a receipt overrides pending or terminal closure.',
  },
  game: {
    answer: 'best-responses',
    explanation: 'Against Ask, Wait earns 0 instead of −2. Against Wait, Ask earns 3 instead of 0. Reading B’s second coordinate gives the same best responses, so Ask/Wait and Wait/Ask are the pure equilibria and neither action strictly dominates. For mixing, Ask earns −2r + 3(1 − r) = 3 − 5r while Wait earns zero. Indifference gives r = 3/5, replacing the lecture’s 2/3. This strategy probability is separate from q and λ; it does not prescribe real messages.',
  },
  deadline: {
    answer: 'late',
    explanation: 'Send at 5 h plus three hours gives the window [5, 8). The reply at 8 is outside it. Before classifying that new event, the reducer freezes observation as no-reply; it then returns phase replied and action review-late-reply. No earlier timeout event is needed. A reply at 7.999 would instead set observation to reply. The completed window remains unchanged, while the still-open conversation can receive a late reply for review. This is neither a refusal nor a resend instruction.',
  },
  ledger: {
    answer: 'preserve',
    explanation: 'A matches r7’s original type and time, so deduplication returns the unchanged snapshot before checking chronological order. B reuses that ID with different content and raises a conflict without changing the input; do not silently renumber it. C traces pending → declined → closed at 7.5, recording observation reply within [5, 8). The event at 8.5 hits the terminal guard and leaves closure = decline and observation = reply intact. Retain the ledger between calls; this local replay provides no durable or exactly-once delivery guarantee.',
  },
};
