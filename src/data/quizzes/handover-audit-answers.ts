import type { AnswerKey } from '../../lib/tutorial-quiz';

export const handoverAuditAnswers: AnswerKey = {
  venues: {
    answer: 'screened',
    explanation: 'Nook’s unknown exit fails a required check; Den’s private setting fails another. Preference scores are considered only after those checks, so neither can buy eligibility with points. Arcade reaches home exactly at 19:00 and costs exactly $20; equality passes both hard limits in this model. Its score of 12 can therefore rank within the eligible set. These authored observations establish fixture feasibility, not a real venue’s safety or anyone’s acceptance.',
  },
  bill: {
    answer: 'new-version',
    explanation: 'Cover-both proposed $15 + $3 = $18 for Alex. Split-drinks proposes $7.50 + $3 = $10.50 for Alex and $7.50 for the counterpart’s drink. Their transport remains null, not zero. Changing the cost mode creates v2 and clears both confirmations: one actor’s saving does not authorise the other actor’s new contribution. Keep v1 in history, reject confirmations naming it, and obtain both actors’ explicit confirmations of v2. The calculation makes no payment and creates no obligation.',
  },
  tail: {
    answer: 3,
    explanation: 'Durations are 85, 95, 110 and 120 minutes. Only late-and-closed is strictly above 110, so its probability is 0.20 × 0.15 = 0.03 = 3%. The four joint probabilities are 0.68, 0.12, 0.17 and 0.03. Using ≥ would incorrectly include late/open and report 20%. Costs are $18 or $20; every listed outcome fits the 120-minute hard window and budget, including equality. Meeting a hard limit is distinct from meeting the stricter working target.',
  },
  dependence: {
    answer: 'dependent',
    explanation: 'Closure remains 0.20 × 0.50 + 0.80 × 0.0625 = 0.15. The new joint cells are 0.75, 0.05, 0.10 and 0.10. E(cost) = 18 + 2 × 0.15 = $18.30 and E(duration) = 85 + 25 × 0.20 + 10 × 0.15 = 91.5 minutes in both models. The late/closed tail is now 10%, seven percentage points above 3%. Additive means depend on marginals; this tail depends on their joint distribution. The assumed dependence does not establish causation.',
  },
  fallback: {
    answer: 'revise',
    explanation: 'The changed late/closed duration is 85 + 25 + 25 = 135 minutes. Starting at 17:00 would mean returning at 19:15, outside Alex’s window. An unverified exit also fails the hard filter, even though the budget passes. A fallback label cannot bypass either check. A changed venue, route or cost needs a feasible revised proposal and fresh agreement before use; otherwise cancel. The numerical branch describes an assumed consequence, not an automatic switching policy.',
  },
  deadline: {
    answer: 'terminal',
    explanation: '16:39 is 999 minutes after midnight and lies before confirmBy = 1000; A gains the second actor’s confirmation. B reaches the excluded endpoint and expires. C’s cancellation is terminal, so its later confirmation leaves the complete snapshot unchanged. In D, a fresh review update clears acceptance; clearance before the deadline returns to draft with zero confirmations, requiring proposal and confirmation again. Only A is exportable. Export records agreement to a version, not arrival or continuing agreement, and performs no booking or payment.',
  },
};
