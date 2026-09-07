import type { TutorialQuiz } from '../../lib/tutorial-quiz';

export const matchAuditQuiz: TutorialQuiz = {
  id: 'match-audit',
  title: 'The match forecast needs an audit',
  intro: 'The spreadsheet has booked a table for its expected value. Check the assumptions first.',
  context: 'The pair counts, probabilities, routes and time windows are separate authored teaching fixtures. The final case uses the existing course benchmark, not real dating outcomes.',
  questions: [
    {
      id: 'conditional', type: 'choice', title: 'The denominator changes direction', skill: 'Read a conditional from the right population',
      scenario: 'Each of 200 fictional pairs supplies both selection decisions within a complete outcome window, even when one direction says no. A and B denote the two directions. You now inspect only pairs where B selected.',
      evidence: {
        caption: 'Complete invented pair table · counts, not probabilities',
        columns: ['First direction', 'B selects', 'B does not'],
        rows: [['A selects', '20', '30'], ['A does not', '80', '70']],
      },
      prompt: 'Among the pairs where B selected, what fraction also have A selecting: P(A | B)?',
      options: [
        { id: 'forward', text: '20/50 = 40%, using all pairs where A selected.' },
        { id: 'reverse', text: '20/100 = 20%, using all pairs where B selected.' },
        { id: 'joint-share', text: '20/200 = 10%, using every pair in the table.' },
        { id: 'either', text: '130/200 = 65%, counting pairs with at least one selection.' },
      ],
    },
    {
      id: 'dependence', type: 'choice', title: 'One expected match requests a chair', skill: 'Separate expectation from the chance of any event',
      scenario: 'Ten new opportunities each have assumed mutual-match probability 0.10. Model I makes their match indicators independent. Model S uses one shared draw: with probability 0.10 all ten match; otherwise none do. These are hypothetical models, not observations about people.',
      tool: 'E[X] = sum of the individual match probabilities. For independent opportunities only, P(any) = 1 − product of (1 − p).',
      prompt: 'Which comparison is correct?',
      options: [
        { id: 'guaranteed', text: 'Both have expected count 1, so both guarantee at least one match.' },
        { id: 'same-mean', text: 'Both have expected count 1, so both have the same 65.13% chance of any match.' },
        { id: 'shared-draw', text: 'Both have expected count 1; the chance of any is about 65.13% in I and 10% in S.' },
        { id: 'no-expectation', text: 'Dependence prevents calculating an expected count for S.' },
      ],
    },
    {
      id: 'joint', type: 'number', title: 'The second yes has a denominator', skill: 'Multiply along the conditional path',
      scenario: 'A separate model supplies P(A) = 0.40 and P(B | A) = 0.30 for one eligible fictional pair. A is selection in one direction; B is selection in the reverse direction. The second number is conditional on A, not a marginal P(B).',
      illustration: {
        src: '/data/quizzes/match-path.svg', width: 640, height: 360,
        alt: 'The mutual-selection path requires A, with probability 0.40, followed by B given A, with conditional probability 0.30. The product is not supplied.',
        caption: 'The two required events on the mutual-selection path. The labels are inputs, not the final joint probability.',
      },
      tool: 'P(A and B) = P(A) × P(B | A). Multiply the result by 100 to express it as a percentage.',
      prompt: 'What is the assumed mutual-match probability as a percentage? Enter a number without the % sign.',
      inputLabel: 'Mutual-match probability (%)',
    },
    {
      id: 'venue', type: 'choice', title: 'The return bus submits an invoice', skill: 'Apply both whole-outing constraints',
      scenario: 'Alex has Friday 5–7 pm and $20 total. Travel times include walking, waiting and buses. Transport prices cover both legs; activity prices are Alex’s full additional cost. No extra reserve is required in this deterministic exercise. These are invented options, and the recipient’s availability is unknown.',
      evidence: {
        caption: 'Travel + meeting + return in minutes · transport + activity in dollars',
        columns: ['Option', 'Minutes', 'Cost'],
        rows: [['Studio', '25 + 65 + 30', '$7 + $13'], ['Loft', '20 + 65 + 36', '$7 + $12'], ['Atrium', '15 + 60 + 20', '$7 + $13.01']],
      },
      prompt: 'Which option passes both Alex’s time and total-cost checks?',
      options: [
        { id: 'loft', text: 'Loft: its lower price compensates for the return time.' },
        { id: 'atrium', text: 'Atrium: its shorter outing makes the extra cent acceptable under the stated rule.' },
        { id: 'reserve', text: 'None: finishing exactly at a limit automatically fails the stated rule.' },
        { id: 'studio', text: 'Studio: exactly 120 minutes and $20 pass, with no spare time or money.' },
      ],
    },
    {
      id: 'windows', type: 'choice', title: 'Sunday hires a headline writer', skill: 'Compare rates with their exposure denominators',
      scenario: 'Two disjoint fictional pair pools have complete outcome windows and at most one mutual match per pair. Time was not randomly assigned. The manager divides Sunday’s match count by Tuesday’s and declares Sunday “2.25 times better”.',
      evidence: {
        caption: 'Separate invented window counts · not results of a time experiment',
        columns: ['Window', 'Matches', 'Exposures'],
        rows: [['Sunday', '18', '120'], ['Tuesday', '8', '40']],
      },
      prompt: 'Which replacement headline is supported?',
      options: [
        { id: 'denominators', text: 'Sunday has more matches but a 15% rate versus Tuesday’s 20%; these observations do not establish a time effect.' },
        { id: 'count-winner', text: 'Sunday’s 2.25-fold match count is also its match-rate advantage.' },
        { id: 'exposure-winner', text: 'Sunday’s threefold exposure count gives each pair three times the chance of a match.' },
        { id: 'bookings', text: 'Sunday supplies 18 confirmed meetings, compared with Tuesday’s eight.' },
      ],
    },
    {
      id: 'benchmark', type: 'choice', title: 'The leaderboard borrows a percent sign', skill: 'Keep rubric rank separate from match probability',
      scenario: 'An illustrative candidate has ratings [4, 3, 3, 3]. In the unchanged 99-control course benchmark, one control scores higher, three tie this candidate and 95 score lower. The vector is an arithmetic exercise; actual ratings still require quoted evidence.',
      tool: 'Score = 100 × sum of four ratings / 16. Rank = 1 + count of controls whose score is greater than or equal to the candidate’s. There are 100 entries including the candidate.',
      prompt: 'Which result and interpretation follow the primary benchmark?',
      options: [
        { id: 'discard-ties', text: '81.25 points and rank 2/100; discard tied controls before ranking.' },
        { id: 'conservative', text: '81.25 points and rank 5/100; neither number is a probability of a mutual match.' },
        { id: 'score-probability', text: '81.25 points means an 81.25% chance of a mutual match.' },
        { id: 'rank-probability', text: 'Rank 5/100 means this candidate has a 5% mutual-match probability.' },
      ],
    },
  ],
};
