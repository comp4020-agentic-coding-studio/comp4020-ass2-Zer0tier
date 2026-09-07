import type { AnswerKey } from '../../lib/tutorial-quiz';

export const threatAuditAnswers: AnswerKey = {
  boundary: {
    answer: 'remove',
    explanation: 'The image would leave the prototype for an external upload service, and money would move to a payment destination. Those are separate assets and crossings. The course release excludes both capabilities, including a small or supposedly refundable deposit. checkReleasePlan checks declared Booleans; a passing object cannot certify different page behaviour. Remove the working paths, use authored text fixtures and inspect the result. The supplied request supports a protective control, not a public accusation.',
  },
  triage: {
    answer: 'coded',
    explanation: 'Only C contains a review code: money-request. Retain its quote as evidence for review. A’s disclosed automation and typo do not establish malicious intent; B’s image-no-match describes only the supplied index result. No-additional-flag means the rule found no activating code, not that a person is safe or verified. The program consumes a reviewer’s codes and quotes; it neither interprets free text nor turns a review finding into a malicious ground-truth label.',
  },
  precision: {
    answer: 37.5,
    explanation: 'There are 6 + 10 = 16 flags, so precision = 100 × 6/16 = 37.5%. The dashboard’s 6/8 = 75% is recall: it uses all eight malicious labels as its denominator. Accuracy is (6 + 82)/100 = 88%. A never-flag detector would have 92% accuracy yet zero recall and undefined precision. Keep each metric’s denominator visible. These counts describe the new authored sample and do not estimate real-world detection quality.',
  },
  cost: {
    answer: 'cost-aware',
    explanation: 'At cFN = 4, the losses are 2 × 4 + 10 = 18 and 4 × 4 + 2 = 18. At cFN = 6 they become 22 and 26, favouring threshold 55 among these two. Raising the threshold trades eight fewer false alarms for two more misses. The full flag counts are 16 and 6; ordinary review workload is not included in this error-only loss. Keep the tie at cost 4 and the scope of the tested alternatives; there is no universal best threshold here.',
  },
  prevalence: {
    answer: 'projected',
    explanation: 'Of 20 malicious-labelled cases, 0.60 × 20 = 12 are flagged and eight missed. Of 980 benign cases, 0.05 × 980 = 49 are flagged and 931 are not. Precision is 12/(12 + 49) = 12/61 ≈ 19.67%. The other fractions are recall, false-positive rate and accuracy respectively. This projection assumes the conditional rates transfer unchanged; a new population could change them too. It is an expected-count exercise, not evidence of a service’s scam prevalence.',
  },
  review: {
    answer: 'retain',
    explanation: 'The window is [4, 6). A’s late reply updates the underlying phase while review stays active; complete clearance then exposes replied/no-reply. Both f-pay and f-image plus a note are required. B closes at the decline before the deadline, with observation reply; the later resolution leaves its entire closed snapshot unchanged. C’s assessment advances the observation checkpoint to no-reply but adds no finding and removes neither hold. Clearance checks record completeness, not safety or consent. No branch sends a message or publishes an accusation.',
  },
};
