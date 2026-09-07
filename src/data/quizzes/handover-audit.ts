import type { TutorialQuiz } from '../../lib/tutorial-quiz';

export const handoverAuditQuiz: TutorialQuiz = {
  id: 'handover-audit',
  title: 'The itinerary mistakes itself for an agreement',
  intro: 'Six planning tickets. The backup venue has already invited itself.',
  context: 'All venues, prices, events and probabilities are authored fixtures. Cases 3–5 use one new contingency model and stated changes to it; the other cases are separate planning records. Alex’s Friday 5–7 pm, bus and $20 constraints remain fixed.',
  questions: [
    {
      id: 'venues', type: 'choice', title: 'The best lighting cannot find the exit', skill: 'Filter hard constraints before preference scores',
      scenario: 'Three new fictional venue cards have the observations below. All required checks not mentioned in a row pass, including opening times, the specified step-free route and bus travel. An unknown exit means independent departure has not been verified. Scores use the supplied preference weights, not new facts about Alex.',
      evidence: {
        caption: 'Authored venue checks · higher preference scores rank only eligible venues',
        columns: ['Venue', 'Hard observations', 'Score'],
        rows: [['Nook', 'Public; exit unknown', '19'], ['Den', 'Private; exit checked', '20'], ['Arcade', 'All pass; home 19:00; total $20', '12']],
      },
      prompt: 'Which selection follows the Week 9 filter?',
      options: [
        { id: 'penalty', text: 'Choose Nook after subtracting a small penalty for its unknown exit.' },
        { id: 'highest', text: 'Choose Den because its score of 20 compensates for the private setting.' },
        { id: 'screened', text: 'Only Arcade is eligible. The exact time and budget limits pass; the other two remain excluded.' },
        { id: 'strict-limits', text: 'Reject all three: arriving home at 19:00 or spending exactly $20 violates a hard limit.' },
      ],
    },
    {
      id: 'bill', type: 'choice', title: 'The cheaper bill loses two signatures', skill: 'Keep cost arithmetic and versioned agreement separate',
      scenario: 'A separate feasible plan v1 has two $7.50 drinks and $3 of Alex’s round-trip transport. Both actors confirmed Alex covering both drinks. Before the confirmation point, a recorded revision creates v2 with split-drinks: “Could we each cover our own drink? Either of us can cancel.” No actor has confirmed v2. The counterpart’s transport cost is unknown.',
      prompt: 'What costs and agreement state should the revised record show?',
      options: [
        { id: 'new-version', text: 'Alex proposes $10.50; counterpart proposes $7.50 for a drink, with transport unknown. v2 has zero confirmations and needs both actors again.' },
        { id: 'carry-signatures', text: 'Alex proposes $10.50 and counterpart $7.50. Keep both old confirmations because Alex’s bill became cheaper.' },
        { id: 'split-everything', text: 'Each pays $9, splitting Alex’s transport too. The arithmetic itself confirms the revised arrangement.' },
        { id: 'zero-transport', text: 'Alex pays $10.50; counterpart’s complete cost is exactly $7.50 because no transport price was supplied.' },
      ],
    },
    {
      id: 'tail', type: 'number', title: 'The 110-minute row tries to join the tail', skill: 'Enumerate joint outcomes with strict exceedance',
      scenario: 'A new contingency fixture starts at 85 minutes and $18. Lateness adds 25 minutes with probability 0.20. Closure adds ten minutes and $2 with probability 0.15. Assume the two events are independent and the stated fallback is usable. The working target is 110 minutes; Alex’s hard limits are 120 minutes and $20.',
      illustration: {
        src: '/data/quizzes/handover-contingencies.svg', width: 640, height: 400,
        alt: 'Assumed contingency inputs: base 85 minutes and $18; lateness probability 20 percent adds 25 minutes; closure probability 15 percent adds ten minutes and $2. Events are independent. Target 110 minutes; hard limits 120 minutes and $20.',
        caption: 'Inputs to a new four-outcome model. Probabilities and fallback consequences are assumed, not measured travel conditions.',
      },
      tool: 'List on-time/open, on-time/closed, late/open and late/closed. Multiply the independent branch probabilities, then sum only outcomes with duration strictly greater than 110 minutes.',
      prompt: 'What is the probability of exceeding 110 minutes, as a percentage? Enter the number only, without a % sign.',
      inputLabel: 'Probability of duration > 110 minutes (%)',
    },
    {
      id: 'dependence', type: 'choice', title: 'The average approves a different tail', skill: 'Separate marginal means from joint risk',
      scenario: 'Keep Case 3’s base, increments and lateness probability of 0.20. Replace independence with P(closed | late) = 0.50 and P(closed | on time) = 0.0625. A teammate argues that if the mean duration is unchanged, the chance of missing the working target must be unchanged too.',
      tool: 'P(closed) = P(late)P(closed | late) + P(on time)P(closed | on time). With additive consequences, E(T) = 85 + 25P(late) + 10P(closed).',
      prompt: 'Which report correctly compares this changed model with Case 3?',
      options: [
        { id: 'same-tail', text: 'Closure stays 15%, so both the mean duration and the >110-minute probability must stay unchanged.' },
        { id: 'dependent', text: 'Closure stays 15%; means stay $18.30 and 91.5 minutes. The >110-minute probability rises from 3% to 10%.' },
        { id: 'sum-conditionals', text: 'Closure becomes 56.25% by adding the two conditional probabilities directly.' },
        { id: 'mean-guarantee', text: 'The mean is below 110 minutes, so neither model can produce a duration above 110.' },
      ],
    },
    {
      id: 'fallback', type: 'choice', title: 'The backup venue appoints itself', skill: 'Recheck changed fallbacks before revising a plan',
      scenario: 'Before departure, a fallback recheck changes Case 3’s closure increment from ten to 25 minutes. The late increment remains 25 minutes, the base remains 85, and the fallback exit is now unverified. A teammate proposes moving the confirmed plan there automatically because it still costs at most $20.',
      prompt: 'Which response handles the changed route and agreement?',
      options: [
        { id: 'auto-switch', text: 'Switch automatically: naming an alternative in the earlier plan pre-authorises all of its changed terms.' },
        { id: 'budget-only', text: 'Keep the fallback because the $20 budget passes; ignore the duration and exit checks.' },
        { id: 'mean-only', text: 'Approve the fallback whenever its expected duration is under 120 minutes, regardless of individual outcomes.' },
        { id: 'revise', text: 'Late plus closed now takes 135 minutes, and the exit check fails. Find a feasible checked alternative and obtain fresh versioned agreement, or cancel.' },
      ],
    },
    {
      id: 'deadline', type: 'choice', title: 'The confirmation clock closes the ticket', skill: 'Preserve deadline, cancellation and review transitions',
      scenario: 'Each branch starts from a separate proposed plan q1, with Alex’s confirmation at 16:20. Its confirmation point is 16:40 and departure is 17:00. Every counterpart confirmation names q1. Review updates concern the same replied Week 8 record. Read times as minutes on the proposal day, not hours since an opener.',
      evidence: {
        caption: 'Independent branches · all events have new IDs and chronological times',
        columns: ['Branch', 'Next events'],
        rows: [['A', 'Counterpart confirms 16:39'], ['B', 'Counterpart confirms 16:40'], ['C', 'Cancel 16:30; counterpart confirms 16:35'], ['D', 'Review hold 16:30; complete clearance 16:35']],
      },
      prompt: 'Which final states and Week 10 export decision follow the contract?',
      options: [
        { id: 'inclusive', text: 'A and B are confirmed; C and D can reuse Alex’s earlier confirmation to finish later.' },
        { id: 'terminal', text: 'A confirmed; B expired; C cancelled; D draft with no confirmations. Only A can be exported as a currently agreed plan.' },
        { id: 'latest-wins', text: 'A, B and C are confirmed because the latest confirmation wins; D returns to proposed with Alex still confirmed.' },
        { id: 'clear-restores', text: 'A confirmed; B expired; C cancelled; D restores the earlier proposed plan with Alex’s confirmation intact.' },
      ],
    },
  ],
};
