import type { TutorialQuiz } from '../../lib/tutorial-quiz';

export const followupAuditQuiz: TutorialQuiz = {
  id: 'followup-audit',
  title: 'The dashboard congratulates itself',
  intro: 'Six evaluation tickets. The dashboard would prefer a different denominator.',
  context: 'All events, activity logs, ratings and release examples are authored teaching fixtures. The six cases are separate exercises, not records to join into a dataset. Case 4 uses the unchanged 99 Null Island controls; Case 5 explicitly changes availability for a stress test. Alex’s fixed course case remains unchanged.',
  questions: [
    {
      id: 'cutoff', type: 'choice', title: 'The cutoff edits the past', skill: 'Keep reporting windows and latest observations separate',
      scenario: 'A new completed Week 10 export retains the following events after both arrivals. Its bill is acknowledged. Reconstruct next-date labels using windows [0, 1082) and [0, 1084), with times in minutes since midnight. A teammate wants to replace both historical labels with the latest result.',
      evidence: {
        caption: 'One authored meeting history · distinct event IDs',
        columns: ['Minute', 'Coded event'],
        rows: [['1080', 'Alex agrees'], ['1082', 'Counterpart agrees'], ['1084', 'Counterpart withdraws'], ['1088', 'Alex leaves']],
      },
      prompt: 'Which report preserves the half-open cutoffs and the completed record?',
      options: [
        { id: 'include-edge', text: 'At 1082: agreed. At 1084: declined. Include each event at the stated cutoff.' },
        { id: 'overwrite', text: 'Both cutoffs are declined because the latest observation should replace every earlier label.' },
        { id: 'history', text: 'At 1082: pending. At 1084: agreed. The latest label is declined and the meeting ended; retain the full history.' },
        { id: 'permanent', text: 'At 1082: pending. At 1084: agreed. The latest label must stay agreed because a previous agreement cannot be withdrawn.' },
      ],
    },
    {
      id: 'dashboard', type: 'choice', title: 'Eight records leave the denominator', skill: 'Name the population behind each percentage',
      scenario: 'A separate dashboard contains 16 distinct fictional meeting records, all coded at 36 hours after their own meeting. A headline writer removes unresolved rows and describes the resulting fraction as agreement among all meetings.',
      evidence: {
        caption: 'Synthetic dashboard · one common reporting rule',
        columns: ['Label', 'Records'],
        rows: [['Agreed', '5'], ['Declined', '3'], ['Pending', '6'], ['Unobserved', '2']],
      },
      prompt: 'Which report keeps the evidence and denominators intact?',
      options: [
        { id: 'recode', text: 'Recode all eight unresolved rows as declined so the report has no missing observations.' },
        { id: 'denominators', text: 'Report 31.25% among all 16 and 62.5% among the eight resolved records, alongside all four counts and the 36-hour cutoff.' },
        { id: 'headline', text: 'Report 62.5% among all meetings; removing unresolved rows does not change the question.' },
        { id: 'empty-zero', text: 'Report only resolved rows, and use 0% whenever a dashboard contains no agreed or declined records.' },
      ],
    },
    {
      id: 'rate', type: 'number', title: 'Five benefit units request a percentage', skill: 'Audit time coverage and convert the rate’s units',
      scenario: 'A new log records the four non-overlapping activity intervals below. No activity is recorded between minutes 75 and 85. Assign five arbitrary benefit units for this arithmetic exercise. Use the sum of recorded activity durations as the denominator, including both travel legs and composition.',
      illustration: {
        src: '/data/quizzes/followup-time-log.svg', width: 640, height: 420,
        alt: 'Recorded activity intervals in elapsed minutes: outbound travel [0, 15); time together [15, 75); return travel [85, 105); compose follow-up [105, 110). The gap [75, 85) has no recorded activity.',
        caption: 'Inputs from a separate fictional log. Rows are not drawn to scale; composition time does not establish sending or delivery.',
      },
      tool: 'Each recorded duration is end − start. Convert their sum from minutes to hours, then divide five benefit units by those activity-hours. Keep any unallocated gap separate.',
      prompt: 'What is the benefit rate in units per recorded activity-hour? Enter the number only; this is not a percentage.',
      inputLabel: 'Benefit units per recorded activity-hour',
    },
    {
      id: 'ranking', type: 'choice', title: 'The candidate changes scales mid-race', skill: 'Reweight every entry and count ties conservatively',
      scenario: 'A separate frozen arithmetic probe has ratings (2, 3, 4, 3) in clarity/specificity/feasibility/exit order. These are supplied ratings, not a revised biography. Compare primary weights with doubled feasibility using all 99 unchanged Null Island controls. The control counts below were computed on each rule’s own scale.',
      evidence: {
        caption: 'Controls compared with the probe · candidate makes entry 100',
        columns: ['Rule', 'Strictly above', 'Tied'],
        rows: [['Primary', '4', '6'], ['Double feasibility', '1', '4']],
      },
      tool: 'Primary score = 100 × sum(ratings) / 16. Double-feasibility score = 100 × (clarity + specificity + 2×feasibility + exit) / 20. Conservative rank = 1 + above + tied.',
      prompt: 'Which comparison follows the declared scoring and ranking rules?',
      options: [
        { id: 'common-weights', text: 'Primary: 75, rank 11/100. Double feasibility: 80, rank 6/100. Rescore all 100 entries and retain both results.' },
        { id: 'drop-ties', text: 'Primary: 75, rank 5/100. Double feasibility: 80, rank 2/100. Ties do not count against the candidate.' },
        { id: 'old-controls', text: 'Use the new candidate score of 80 against the original control scores and report rank 5/100.' },
        { id: 'old-maximum', text: 'The doubled score is 100 because the new numerator should still be divided by 16; label the candidate top 1%.' },
      ],
    },
    {
      id: 'availability', type: 'choice', title: 'The route fits and the profile still does not', skill: 'Separate plan feasibility from changed-case fidelity',
      scenario: 'In a separate availability stress test, the window becomes Friday 5–6:40 pm: 100 minutes. Keep the Week 5 library itinerary of 100 minutes and $14, and the frozen public wording “Meet Friday 5-7 pm: bus-friendly, $20 total.” A teammate argues that exact itinerary fit makes the unchanged profile ready to release for this changed case.',
      prompt: 'Which decision respects the changed case and the frozen evaluation?',
      options: [
        { id: 'route-only', text: 'Release the unchanged profile because the route exactly fits the new window.' },
        { id: 'strict-limit', text: 'Reject the itinerary because a 100-minute plan must be strictly shorter than a 100-minute window.' },
        { id: 'invent-controls', text: 'Silently shorten the frozen wording and invent new availability ratings for all 99 controls, even though their source bios are missing.' },
        { id: 'fidelity', text: 'The itinerary passes with zero time slack, but the 5–7 pm claim contradicts the new window. Preserve the original result; any revised text needs a new version and review.' },
      ],
    },
    {
      id: 'release', type: 'choice', title: 'The checksum cannot see the page', skill: 'Distinguish byte identity from a usable release',
      scenario: 'Two clean builds of a separate fictional release have identical output bytes and matching manifest checksums. The HTML contains the exact frozen candidate paragraph, but a stylesheet sets #candidate-text to display: none. The evaluation link still works. The developer marks “candidate text visible on phone” as passed without opening the page.',
      prompt: 'Which release review is justified?',
      options: [
        { id: 'hash-proof', text: 'Accept the visibility claim: a matching checksum proves that the frozen text is readable.' },
        { id: 'rendered', text: 'Byte reproduction passes; visible-text review fails. Fix the presentation, retain the frozen candidate and evaluation, then record actual browser checks and reproduce the revised release.' },
        { id: 'rewrite-freeze', text: 'Replace the frozen candidate with a shorter profile and regenerate its digest under the old version so the original evaluation remains valid.' },
        { id: 'link-only', text: 'Mark the whole release accessible because its evaluation link works; the candidate paragraph does not need inspection.' },
      ],
    },
  ],
};
