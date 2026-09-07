import type { TutorialQuiz } from '../../lib/tutorial-quiz';

export const communicationAuditQuiz: TutorialQuiz = {
  id: 'communication-audit',
  title: 'The scheduler files a patience bug',
  intro: 'The event log has timestamps. The product team has theories.',
  context: 'All logs, rates, utilities and payoffs are authored teaching fixtures. Each event case starts from an admissible Week 6 handoff; cases and branches are independent. The numerical models do not estimate anyone’s intentions.',
  questions: [
    {
      id: 'receipt', type: 'choice', title: 'A read receipt applies for a promotion', skill: 'Separate observed fields from inferred meaning',
      scenario: 'The Week 7 reducer starts ready with a three-hour observation window. You retain each returned snapshot after send at 5 h, wait at 5.1 h and read at 6 h. There is no delivery record or inbound reply. A teammate promotes the read receipt to “delivered, interested and ready for a reminder.”',
      prompt: 'Which snapshot and interpretation follow the supplied event contract?',
      options: [
        { id: 'delivered', text: 'Set both readAt and deliveredAt to 6; a read receipt supplies the missing delivery time.' },
        { id: 'fields', text: 'Keep phase pending and observation open; readAt is 6 and deliveredAt stays null. No motive or permission follows.' },
        { id: 'reply', text: 'Change phase to replied and observation to reply because a read is an inbound response.' },
        { id: 'reminder', text: 'Keep the read time and emit a reminder because the recipient has seen the opener.' },
      ],
    },
    {
      id: 'arrivals', type: 'choice', title: 'The dashboard reports a 120% chance', skill: 'Convert an expected count to an arrival probability',
      scenario: 'A separate homogeneous Poisson model assumes λ = 0.3 inbound messages per hour over four hours. Inbound messages include declines; delivery and read receipts are excluded. The dashboard multiplies 0.3 by 4 and labels the result “120% chance of an agreed invitation.”',
      tool: 'P(N = 0) = exp(−λt). At least one arrival is the complement of zero arrivals. Assume a constant rate and independent counts in disjoint intervals.',
      prompt: 'Which replacement correctly reports the model result and its limits?',
      options: [
        { id: 'cap', text: 'Cap 120% at 100%; at least one message is guaranteed.' },
        { id: 'zero', text: 'About 30.12% for at least one arrival; every arrival agrees to the invitation.' },
        { id: 'complement', text: 'About 69.88% for at least one inbound message. The expected count is 1.2; neither figure gives an agreement probability.' },
        { id: 'exactly-one', text: 'About 36.14% for at least one arrival; send a reminder after four hours if none arrives.' },
      ],
    },
    {
      id: 'threshold', type: 'number', title: 'Clarification submits a cheaper invoice', skill: 'Compare all admissible utility options',
      scenario: 'In an isolated decision exercise, clarification has already passed a separate admissibility review. Its assumed cost falls to 4.5 utility units. The scores are U(C) = 7q − 4.5, U(W) = 2q − 1 and U(S) = 0. Here q is an assumed probability that clarification would be welcome, not the arrival probability from Case 2.',
      tool: 'Solve U(C) = U(W), then check their common score against stop. Keep every maximiser at a tie. This comparison adds no send transition to the event reducer.',
      prompt: 'At what q do clarification and waiting tie above stopping? Enter q as a decimal from 0 to 1, without a % sign.',
      inputLabel: 'Tie probability q (decimal)',
    },
    {
      id: 'game', type: 'choice', title: 'Both players edit the same cell', skill: 'Recompute best responses and mixed indifference',
      scenario: 'Two fictional players choose Ask or Wait in a separate admissible one-shot game. A is the row player; B is the column player. Their revised utilities are below. A teammate copies the lecture’s equilibrium without checking the new numbers.',
      evidence: {
        caption: 'Authored utilities · each pair is (A, B)',
        columns: ['A / B', 'Ask', 'Wait'],
        rows: [['Ask', '(−2, −2)', '(3, 0)'], ['Wait', '(0, 3)', '(0, 0)']],
      },
      tool: 'For a fixed opposing action, maximise your own coordinate. For symmetric mixing, let r be the other player’s Ask probability and equate your expected Ask and Wait utilities.',
      prompt: 'Which analysis fits this revised matrix?',
      options: [
        { id: 'dominant', text: 'Ask strictly dominates Wait for both players; Ask/Ask is the unique equilibrium.' },
        { id: 'old-mixture', text: 'The pure equilibria are Ask/Wait and Wait/Ask; the symmetric Ask probability is still 2/3.' },
        { id: 'wait-both', text: 'Wait/Wait is an equilibrium because both players avoid the negative Ask/Ask payoff.' },
        { id: 'best-responses', text: 'The pure equilibria are Ask/Wait and Wait/Ask. Neither action strictly dominates; the symmetric Ask probability is 3/5.' },
      ],
    },
    {
      id: 'deadline', type: 'choice', title: 'The timeout event misses its own deadline', skill: 'Apply a half-open observation window during replay',
      scenario: 'Replay these new records in order, retaining state each time. The observation window lasts three hours from send and is half-open. The conversation stays open and has no decline. No timeout event is supplied before the reply at 8 h.',
      illustration: {
        src: '/data/quizzes/communication-timeline.svg', width: 640, height: 480,
        alt: 'Authored event log in observation hours: send at 5, wait at 5.1, read at 6, reply at 8. The window length is three hours. No timeout event is supplied.',
        caption: 'Observation timestamps from a shared synthetic origin; the diagram supplies events, not the resulting state.',
      },
      prompt: 'What does processing the reply at 8 h return?',
      options: [
        { id: 'late', text: 'Phase replied, observation no-reply, action review-late-reply. Expiry is checked while processing the reply.' },
        { id: 'extend', text: 'Phase replied, observation reply; without a timeout event, the window remains open indefinitely.' },
        { id: 'inclusive', text: 'Phase replied, observation reply; a reply exactly at the endpoint is inside the window.' },
        { id: 'closed', text: 'Phase closed with a refusal reason; reaching the observation deadline proves a decline.' },
      ],
    },
    {
      id: 'ledger', type: 'choice', title: 'One receipt returns with three passports', skill: 'Distinguish duplicates, conflicts and terminal closure',
      scenario: 'Start each branch from the same retained snapshot: send at 5 h, wait at 5.1 h, read with ID r7 at 6 h, then wait at 7 h. The three-hour observation window is still open and the phase is pending. Each row below is an independent continuation. New events have distinct IDs unless r7 is shown.',
      evidence: {
        caption: 'Apply each branch separately · times are observation hours',
        columns: ['Branch', 'Next records'],
        rows: [['A', 'Replay r7: read at 6'], ['B', 'Reuse r7: read at 6.5'], ['C', 'Decline at 7.5, then reply at 8.5']],
      },
      prompt: 'Which handling preserves the Week 7 contract?',
      options: [
        { id: 'reject-all', text: 'Reject A and B as old timestamps; let C reopen because a newer reply supersedes the decline.' },
        { id: 'preserve', text: 'A is an unchanged duplicate. B raises an ID conflict for review. C closes on decline and stays unchanged when the reply arrives.' },
        { id: 'overwrite', text: 'Record A again, overwrite r7’s timestamp in B, and let C reopen on its latest event.' },
        { id: 'resend', text: 'Keep A unchanged, assign B a fresh ID automatically, and issue another opener in C to resolve the contradiction.' },
      ],
    },
  ],
};
