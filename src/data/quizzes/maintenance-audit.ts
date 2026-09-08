import type { TutorialQuiz } from '../../lib/tutorial-quiz';

export const maintenanceAuditQuiz: TutorialQuiz = {
  id: 'maintenance-audit',
  title: 'The rollback restores too much',
  intro: 'Six maintenance tickets. Restoring a folder is the easy one.',
  context: 'All participants are fictional adults; events, retention days and release faults are authored teaching fixtures. These are separate exercises, not new biography for Alex or rules for real relationships. Retention periods are invented. The software examples preserve the Week 11 teaching result.',
  questions: [
    {
      id: 'acknowledgements', type: 'choice', title: 'The queue counts deliveries as people', skill: 'Count distinct acknowledgements and reject stale writes',
      scenario: 'M, N and O have explicitly acknowledged v1 of a shared planning record. At tick 4, M proposes optional activity choices under proposal choices-v1, base v1, expiring at 12. Creating a proposal is separate from accepting it. Replay the deliveries below in order; the duplicate has exactly the same event ID and JSON. All three participants must explicitly accept the same proposal before adoption.',
      evidence: {
        caption: 'A separate three-adult agreement · event ticks',
        columns: ['Tick', 'Delivery'],
        rows: [['4', 'M proposes choices-v1'], ['5', 'M accepts · m-ack'], ['5', 'Exact duplicate of m-ack'], ['6', 'N accepts · n-ack'], ['8', 'O accepts · o-ack']],
      },
      prompt: 'After these five deliveries, a different proposal arrives at tick 9 with base v1. Which trace and decision are correct?',
      options: [
        { id: 'deliveries', text: 'Versions 1, 1, 1, 2, 2: the duplicate supplies the third acknowledgement. Accept the later v1 proposal.' },
        { id: 'distinct', text: 'Versions 1, 1, 1, 1, 2: only O completes the distinct acknowledgements. Reject the later proposal’s stale base v1.' },
        { id: 'author-counts', text: 'Versions 1, 1, 1, 2, 2: proposing already counts as M’s first acceptance, so O is unnecessary.' },
        { id: 'silent-rebase', text: 'Versions 1, 1, 1, 1, 2. Silently replace the later proposal’s base v1 with v2 and continue.' },
      ],
    },
    {
      id: 'expiry', type: 'choice', title: 'The last tick wants an exception', skill: 'Apply the acceptance window without inventing a response',
      scenario: 'In a separate U/V agreement, U proposes an optional routine change at tick 20, base v1, expiring at 28. U explicitly accepts at 21. Compare two independent branches: V accepts at 27, or V accepts at 28. Both events name the exact proposal and current base. The acceptance window is [20, 28).',
      illustration: {
        src: '/data/quizzes/maintenance-expiry.svg', width: 640, height: 390,
        alt: 'Two separate branches share proposal window [20, 28) and U’s acceptance at tick 21. Branch A has V’s response at 27; Branch B has V’s response at 28. The start at 20 is closed and the endpoint at 28 is open.',
        caption: 'Authored event ticks, not a recommended response deadline. Each branch starts from the same v1 record.',
      },
      prompt: 'Which result follows the window? A third branch has only a clock event at 28 after U’s acceptance.',
      options: [
        { id: 'inclusive', text: 'Both response branches adopt v2; tick 28 counts because it is printed as the deadline.' },
        { id: 'refusal', text: 'At 27 adopt v2. At 28 record V’s refusal and end the agreement; silence has the same meaning.' },
        { id: 'half-open', text: 'At 27 adopt v2. At 28 expire the proposal, retain v1 in review, and infer neither agreement nor refusal. The clock-only branch also expires.' },
        { id: 'extend', text: 'At 28 extend the window and accept V’s response so a missing acknowledgement never blocks adoption.' },
      ],
    },
    {
      id: 'copies', type: 'number', title: 'One deleted shortcut claims every backup', skill: 'Count controlled copies after ownership, expiry and dependency checks',
      scenario: 'At day 21 after a fictional submission, inspect this new inventory. Every counted copy is a distinct location. The source archive is still required to reproduce the release. Decide which copies belong in the planned removal action; the planner itself deletes no files and sends no requests.',
      evidence: {
        caption: 'Synthetic inventory · invented elapsed days',
        columns: ['Record / owner', 'Copies', 'Retain until / dependency'],
        rows: [
          ['Raw traces / student', '3: notebook, export, backup', 'Day 21 / no'],
          ['Scratch notes / student', '2: draft, backup', 'Day 7 / no'],
          ['Source archive / student', '2: archive, backup', 'Day 21 / yes'],
          ['Review notes / student', '1: review folder', 'Day 22 / no'],
          ['Other copy / other', '2: outside workspace', 'Day 10 / no'],
        ],
      },
      tool: 'First exclude copies owned by someone else. For your own records, day ≥ retainUntil reaches expiry. Expired release dependencies need review; other expired records enter plan-delete-own-copies. Count copies, not inventory rows.',
      prompt: 'How many own copies enter the planned removal action at day 21? Enter the number only.',
      inputLabel: 'Own copies planned for removal',
    },
    {
      id: 'ending', type: 'choice', title: 'An unresolved parcel blocks the exit button', skill: 'Preserve the whole ended snapshot independently of practical tasks',
      scenario: 'A separate J/K record is at v2. A new proposal is pending and only J has accepted it. At tick 34, K ends the agreement from an old screen that sends baseVersion 1. A borrowed game is still unreturned. Later, a queued K acceptance, a clock tick and an attempted restoration of v1 arrive.',
      prompt: 'Which implementation preserves the ending and the practical record?',
      options: [
        { id: 'version-gate', text: 'Reject K’s ending because baseVersion 1 is stale; K must review v2 before leaving.' },
        { id: 'task-gate', text: 'Keep the agreement active until the game is returned and both participants acknowledge the ending.' },
        { id: 'label-only', text: 'Keep phase ended but append the late acceptance and restore v1 terms underneath that label.' },
        { id: 'terminal', text: 'End immediately, cancel the pending proposal and retain v2 as the last adopted record. Later inputs leave the entire ended snapshot unchanged; track the game separately.' },
      ],
    },
    {
      id: 'restore', type: 'choice', title: 'The page opens and two files disappear', skill: 'Compare the complete declared bundle with its retained baseline',
      scenario: 'A new fault drill starts from a verified four-file Week 11 reference release. Its retained trusted manifest covers index.html, evaluation.json, manifest.json and README.txt. The working folder below still opens in a browser. The archive has been checked against the retained baseline.',
      evidence: {
        caption: 'Working folder compared with the trusted release',
        columns: ['File', 'Observed state'],
        rows: [['index.html', 'Exact trusted bytes'], ['evaluation.json', 'Different bytes: rank changed to 1'], ['manifest.json', 'Absent'], ['README.txt', 'Absent'], ['draft.txt', 'Extra file']],
      },
      prompt: 'Which repair establishes the stated software restore, followed by an actual rendered-page check?',
      options: [
        { id: 'html-only', text: 'Keep this folder because index.html matches; the evaluation, manifest, README and extra file are outside reproduction.' },
        { id: 'snapshot', text: 'Report one changed, two missing and one extra file. Restore all four trusted files into a complete snapshot without draft.txt; retain primary 93.75/rank 2 and sensitivity 90/rank 2.' },
        { id: 'new-baseline', text: 'Recalculate the expected manifest from this working folder, so its rank-1 result becomes the trusted baseline.' },
        { id: 'copy-over', text: 'Copy the four archive files over the working folder but keep draft.txt; declare the full output set byte-identical.' },
      ],
    },
    {
      id: 'handover', type: 'choice', title: 'The template awards itself a passing grade', skill: 'Distinguish actual handover evidence from a generated claim',
      scenario: 'A fictional handover has eleven rows containing only course tutorial links. Its clean-directory build matched on the same host and Node executable. No keyboard or phone inspection was recorded, and there is no located report/exam feedback or resulting revision. A generated summary nevertheless says “independently reproduced, browser passed, feedback applied.”',
      prompt: 'Which replacement account can a reviewer verify?',
      options: [
        { id: 'template-proof', text: 'Accept the eleven links as proof of eleven completed artefacts, and keep the generated summary.' },
        { id: 'invent-feedback', text: 'Write a plausible tutor comment and revision so the defence has every requested element.' },
        { id: 'scoped-evidence', text: 'Report same-host byte reproduction only. Add actual local paths, versions, check results and later uses; perform browser checks, mark missing feedback evidence as a gap, and use the support route.' },
        { id: 'hash-browser', text: 'Remove only the feedback claim. Matching bytes already prove keyboard access, phone readability and independent-machine reproduction.' },
      ],
    },
  ],
};
