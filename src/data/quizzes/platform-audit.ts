import type { TutorialQuiz } from '../../lib/tutorial-quiz';

// Public question data only. Solutions are fetched after a complete submission.
export const platformAuditQuiz: TutorialQuiz = {
  id: 'platform-audit',
  title: 'Your shift at Null Island',
  intro: 'The dashboard wants a victory lap. Check its arithmetic first.',
  context: 'All profiles, disclosures and numbers here are fictional teaching examples.',
  questions: [
    {
      id: 'queue', type: 'choice', title: 'The queue jumper', skill: 'Filter → rank → expose',
      scenario: 'Alex is free Friday 5–7 pm and has $20 total. This toy pipeline first checks meeting time and cost, then sorts the survivors by score. It displays just one card. Travel is not checked in this example.',
      evidence: {
        caption: 'Three retrieved fictional cards · all times Friday',
        columns: ['Card', 'Meeting', 'Total cost', 'Score'],
        rows: [['Sol', '6–6.30 pm', '$12', '9'], ['Nia', '8–8.30 pm', '$8', '10'], ['Rio', '5.30–6 pm', '$18', '7']],
      },
      prompt: 'Which card is displayed after this pipeline runs?',
      options: [
        { id: 'highest', text: 'Nia: the largest score always goes first.' },
        { id: 'filtered', text: 'Sol: remove time conflicts, then rank the survivors.' },
        { id: 'earliest', text: 'Rio: the earliest meeting wins.' },
        { id: 'all', text: 'Sol and Rio: passing the filters guarantees exposure.' },
      ],
    },
    {
      id: 'disclosure', type: 'choice', title: 'The black-box bluff', skill: 'Audit a source claim',
      scenario: 'An invented platform disclosure says: “We use profile fields and past interactions to order recommendations.” A teammate adds: “So it must use Elo with K = 32.” No code, formula or weights are supplied.',
      prompt: 'Which entry belongs in your source / claim / unknown table?',
      options: [
        { id: 'confirmed', text: 'Confirmed: the platform runs Elo with K = 32.' },
        { id: 'impossible', text: 'Confirmed: the platform cannot use a rating model.' },
        { id: 'scoped', text: 'Disclosed: two signal categories. Unknown: the model, weights and K.' },
        { id: 'measure', text: 'Measured: Alex’s attractiveness is 1200.' },
      ],
    },
    {
      id: 'elo', type: 'number', title: 'The rating hotfix', skill: 'Apply a toy Elo update',
      scenario: 'Two synthetic profiles start at rating 1400. In one simulated comparison, profile A wins. Use K = 24 and the pre-event ratings; do not add a separate penalty.',
      tool: 'E = 1 / (1 + 10^((R_B − R_A) / 400)); R′_A = R_A + K(S − E). A win has S = 1.',
      prompt: 'What is profile A’s new rating after this one event?',
      inputLabel: 'New rating for profile A',
    },
    {
      id: 'census', type: 'choice', title: 'The vanishing denominator', skill: 'Repair a population summary',
      scenario: 'A synthetic census contains 250 active profiles, including 100 available and 30 reciprocally eligible. An import finds 50 more active profiles. None of the added profiles is available or reciprocally eligible. These are nested eligibility counts, not mutual likes.',
      prompt: 'After the import, what are reciprocal-to-active and reciprocal-to-available, in that order?',
      options: [
        { id: 'corrected', text: '10% and 30%.' },
        { id: 'old', text: '12% and 30%.' },
        { id: 'both', text: '10% and 20%.' },
        { id: 'date', text: '10% and a 30% chance of a date.' },
      ],
    },
    {
      id: 'dashboard', type: 'choice', title: 'The dashboard victory lap', skill: 'Counts, rates and causal claims',
      scenario: 'A manager sees this synthetic log and announces: “A is the better bio. It got more likes.” The two profiles had different audiences; there was no randomised bio experiment.',
      evidence: {
        caption: 'One reporting window · at most one like per exposure',
        columns: ['Profile', 'Likes', 'Exposures'],
        rows: [['A', '36', '900'], ['B', '20', '250']],
      },
      prompt: 'Which correction can the log support?',
      options: [
        { id: 'count', text: 'A has the higher response rate because 36 is greater than 20.' },
        { id: 'causal', text: 'B’s wording causes twice as many likes for every audience.' },
        { id: 'same', text: 'Both rates are equal once exposure is considered.' },
        { id: 'bounded', text: 'B’s observed rate is 8% versus A’s 4%; this does not establish a bio effect.' },
      ],
    },
    {
      id: 'feedback', type: 'choice', title: 'The algorithm crowns itself', skill: 'Test an exposure-feedback story',
      scenario: 'In a toy allocator, the profile with more likes today receives 800 exposures tomorrow; the other receives 200. Both profiles have the same assumed response probability, 0.05 per exposure. Today A had 800 exposures and B had 200. Expected likes, rather than sampled counts, drive this exercise.',
      prompt: 'For one sensitivity run, give tomorrow’s 800 exposures to B and 200 to A while keeping probabilities fixed. What follows?',
      options: [
        { id: 'intrinsic', text: 'A still expects more likes, so its earlier lead measures intrinsic appeal.' },
        { id: 'allocation', text: 'B expects 40 likes and A 10. Allocation alone can reverse the lead.' },
        { id: 'equal', text: 'Both expect 25 likes because their response probabilities are equal.' },
        { id: 'certain', text: 'B is guaranteed exactly 40 likes from real users.' },
      ],
    },
  ],
};
