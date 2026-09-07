import type { TutorialQuiz } from '../../lib/tutorial-quiz';

export const threatAuditQuiz: TutorialQuiz = {
  id: 'threat-audit',
  title: 'The flag factory requests a verdict button',
  intro: 'Six review tickets. The dashboard is already writing its victory speech.',
  context: 'All requests, labels and observations are authored teaching fixtures. Cases 3–4 share a new 100-row detector sample; the cards, population projection and review log are separate exercises. Scores are arbitrary points, not probabilities.',
  questions: [
    {
      id: 'boundary', type: 'choice', title: 'The reservation form collects souvenirs', skill: 'Trace assets and test the actual release',
      scenario: 'A fictional reservation mock-up says “Upload a student-card photo and pay a $6 deposit to hold the game table.” Its release-plan object declares no image uploads and no payments, so checkReleasePlan returns allowed. Page review nevertheless finds working links to an external upload form and checkout. No upload or payment has been made.',
      prompt: 'Which repair addresses the actual boundary crossing?',
      options: [
        { id: 'declaration', text: 'Keep the links because the release-plan object passed; the declared Booleans certify the page.' },
        { id: 'remove', text: 'Remove the external upload/payment paths and use written fictional cards. Record which assets would leave the prototype and check the page again.' },
        { id: 'accuse', text: 'Keep the links for testing and publish the counterpart’s name as a confirmed scammer.' },
        { id: 'small-payment', text: 'Keep only checkout: a $6 payment is small enough to fall outside the course’s release rule.' },
      ],
    },
    {
      id: 'triage', type: 'choice', title: 'A typo joins the threat committee', skill: 'Use supplied observation codes without inventing intent',
      scenario: 'A reviewer manually codes these three new cards. Feed the supplied codes and quotes to screenCase; it does not classify free text. None of the cards has an earlier finding or a refusal.',
      evidence: {
        caption: 'New authored cards · observation code followed by its evidence',
        columns: ['Card', 'Supplied observations'],
        rows: [
          ['A', 'disclosed-automation: “Automated rules helper.” syntax-only: “I enjyo co-op games.”'],
          ['B', 'image-no-match: “No item for IMG-Q8 in the supplied fictional index.”'],
          ['C', 'money-request: “Transfer $6 to reserve the game table.”'],
        ],
      },
      prompt: 'Which triage result follows the declared rule?',
      options: [
        { id: 'all-flags', text: 'Review all three: automation, a typo and an absent image result are each proof of deception.' },
        { id: 'verified', text: 'Review C; certify A and B as safe because neither activates a review code.' },
        { id: 'coded', text: 'Only C adds a review finding. A and B add no flag; that result certifies neither authenticity nor safety.' },
        { id: 'verdict', text: 'Label C malicious and discard its evidence quote because a money request settles intent.' },
      ],
    },
    {
      id: 'precision', type: 'number', title: 'Six correct flags borrow the wrong denominator', skill: 'Calculate precision from the flagged population',
      scenario: 'This new 100-row authored sample uses flag when score ≥ 55. The rows below are its label counts after prediction, separate from the lecture’s original 100 cases. A dashboard claims “75% of our flags are correct” by dividing six by eight.',
      evidence: {
        caption: 'Authored label versus prediction · counts, not detector scores',
        columns: ['Label', 'Flag', 'No flag'],
        rows: [['Malicious', '6', '2'], ['Benign', '10', '82']],
      },
      tool: 'Precision = TP / (TP + FP). For a percentage, multiply by 100. The denominator includes every flagged row.',
      prompt: 'What percentage of flags have the authored malicious label? Enter the percentage as a number, without a % sign.',
      inputLabel: 'Precision (%)',
    },
    {
      id: 'cost', type: 'choice', title: 'The quieter queue submits an expense claim', skill: 'Compare thresholds under explicit error costs',
      scenario: 'Raise the threshold from 55 to 75 on the same fixed rows as Case 3. The error counts become those below. Only these two thresholds are being compared; the loss model omits ordinary review overhead.',
      evidence: {
        caption: 'Same authored sample · FN means missed malicious label; FP means benign flag',
        columns: ['Threshold', 'FN', 'FP'],
        rows: [['55', '2', '10'], ['75', '4', '2']],
      },
      tool: 'L = cFN × FN + cFP × FP. Keep cFP = 1 error unit. Compare cFN = 4, then cFN = 6.',
      prompt: 'Which cost comparison should replace “the higher threshold is always better”?',
      options: [
        { id: 'always-high', text: '75 wins at both costs because it always produces fewer false alarms.' },
        { id: 'always-low', text: '55 wins at both costs because missing a malicious label always dominates any number of false alarms.' },
        { id: 'fixed-tie', text: 'Both thresholds tie at both costs; changing an error cost cannot change the ranking.' },
        { id: 'cost-aware', text: 'At cFN = 4 both cost 18. At cFN = 6, 55 costs 22 and 75 costs 26, so 55 wins among the two tested choices.' },
      ],
    },
    {
      id: 'prevalence', type: 'choice', title: 'The detector moves to a quieter neighbourhood', skill: 'Project precision under a changed base rate',
      scenario: 'In a separate hypothetical population of 1,000 cases, malicious-label prevalence is 2%. Assume recall stays at 60% and the false-positive rate stays at 5%. These conditional rates are supplied assumptions, not estimates from Cases 3–4.',
      illustration: {
        src: '/data/quizzes/threat-population.svg', width: 640, height: 360,
        alt: 'Assumed population of 1,000 cases: 20 with the malicious label, with recall 60%; 980 with the benign label, with false-positive rate 5%. Flag counts and precision are not supplied.',
        caption: 'Population and conditional-rate inputs only. Both rates are assumed to carry across to this population.',
      },
      tool: 'True flags = malicious cases × recall. False flags = benign cases × false-positive rate. Precision uses both types of flag.',
      prompt: 'Which projected report uses the right denominator?',
      options: [
        { id: 'projected', text: '12 true flags and 49 false flags: precision 12/61 ≈ 19.67%, under the fixed-rate assumptions.' },
        { id: 'recall', text: '12 true flags out of 20 malicious cases: precision is 60% in the new population.' },
        { id: 'false-rate', text: '49 false flags out of 980 benign cases: precision is 5% in the new population.' },
        { id: 'accuracy', text: '943 correct predictions out of 1,000 cases: precision is 94.3% in the new population.' },
      ],
    },
    {
      id: 'review', type: 'choice', title: 'The clearance stamp meets a closed file', skill: 'Retain findings, observation history and terminal closure',
      scenario: 'Retain a Week 7 snapshot with send at 4 h, wait at 4.1 h and a two-hour window. Assess a money-request card at 4.2 (finding f-pay) and an image-match card at 4.3 (finding f-image). Both findings are open. Each row is a separate continuation from that held snapshot. Every resolution below names both finding IDs and supplies a non-empty authored review note.',
      evidence: {
        caption: 'Independent branches · new event IDs and chronological observation hours',
        columns: ['Branch', 'Next events'],
        rows: [['A', 'Reply 6.2; resolve review 6.4'], ['B', 'Decline 5; resolve review 6.4'], ['C', 'Assess image-no-match card 6.1']],
      },
      prompt: 'Which summary preserves the review and communication contracts?',
      options: [
        { id: 'reset-window', text: 'A clears to replied/reply by restarting the observation window at clearance; B and C also resume normally.' },
        { id: 'retain', text: 'A clears to replied/no-reply. B stays completely unchanged after closing on decline. C stays in review with underlying pending/no-reply.' },
        { id: 'partial-clear', text: 'A can clear using f-pay alone; B’s full clearance reopens it; C’s non-match erases f-image.' },
        { id: 'freeze-all', text: 'Review freezes all incoming events and observation time, so A, B and C remain pending/open until clearance.' },
      ],
    },
  ],
};
