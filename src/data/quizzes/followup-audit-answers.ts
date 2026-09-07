import type { AnswerKey } from '../../lib/tutorial-quiz';

export const followupAuditAnswers: AnswerKey = {
  cutoff: {
    answer: 'history',
    explanation: 'Before 1082, only Alex’s event at 1080 is included: pending. Before 1084, both agreement events are included but the withdrawal at exactly 1084 is excluded: agreed. The completed record includes that withdrawal and the later departure, so its latest next-date label is declined and its meeting status is ended. A cutoff reconstructs a historical view; it does not overwrite the source or erase a later boundary. Keep the event evidence and do not retry the declined invitation.',
  },
  dashboard: {
    answer: 'denominators',
    explanation: 'Among all records, 100 × 5/16 = 31.25%. Resolved means agreed or declined, so the second fraction is 100 × 5/(5 + 3) = 62.5%. The six pending and two unobserved records do not become refusals or disappear from the all-record denominator. Retain their counts and the 36-hour rule. If the resolved denominator were zero, its fraction would be undefined (null), not 0%. These invented counts establish neither a population success rate nor permission to follow up.',
  },
  rate: {
    answer: 3,
    explanation: 'Recorded durations are 15 + 60 + 20 + 5 = 100 minutes, or 5/3 activity-hours. Five benefit units divided by 5/3 hours gives 3 units per activity-hour, equivalent to 0.05 units per activity-minute. The full elapsed span is 110 minutes with a ten-minute unallocated gap; using that different denominator would give about 2.727 units per elapsed hour. Keep the accounting basis explicit. The chosen benefit is arbitrary and says nothing about another person’s wishes or an obligation created by past effort.',
  },
  ranking: {
    answer: 'common-weights',
    explanation: 'Primary score = 100 × 12/16 = 75; rank = 1 + 4 + 6 = 11/100. With feasibility doubled, score = 100 × 16/20 = 80; rank = 1 + 1 + 4 = 6/100. All controls must use the same weights as the candidate. Comparing 80 with old scores instead would produce a misleading rank 5 on mixed scales. Keep the primary result and label the common-weight sensitivity separately. Neither result meets this benchmark’s rank-1 target, and ratings still require evidence.',
  },
  availability: {
    answer: 'fidelity',
    explanation: 'The changed window is 100 minutes. The library itinerary uses all 100, leaving zero slack; $14 also fits the $20 budget. Equality passes the hard plan check. The frozen text still advertises two hours, though, so it contradicts the separately changed availability. Record that failure regardless of rank. Revised text and dependent invitations need their own version and review; do not overwrite the original freeze or its results. Numeric controls without source bios cannot honestly be re-rated for a new availability condition.',
  },
  release: {
    answer: 'rendered',
    explanation: 'Identical bytes reproduce the same hidden paragraph: checksums cannot establish that CSS makes it visible. Keep the exact candidate and its evaluated result while repairing the presentation in a revised release. Inspect the actual candidate text, keyboard focus and links at 1920×1080 and 390×844, then resize and check overflow. Record what was actually observed and reproduce the new output bytes with its updated manifest. Changing candidate text instead would require a separate version and evaluation; a new digest cannot retroactively validate the old result.',
  },
};
