# Sixth tutorial: an interactive Asynchronous communication quiz

The sixth tutorial is Week 7, `/sessions/07-communication/`. “The scheduler
files a patience bug” adds six application cases using the existing quiz
component. Preparation links directly to the quiz. Week 1 remains lecture-only.

The cases apply the week's models to new authored inputs:

- Repair an inference from a read receipt while retaining separate recorded
  fields: a missing delivery timestamp stays unknown.
- Replace a supposed 120% probability with the Poisson complement for an
  assumed rate of 0.3 inbound messages/hour over four hours.
- Solve a changed clarification cost of 4.5 units, including the comparison
  with waiting and stopping rather than only testing for positive utility.
- Recompute both players' best responses and symmetric mixed indifference in
  a changed matrix, with Ask/Ask payoffs −2/−2 and unilateral Ask payoff 3.
- Replay a reply exactly at the endpoint of a shifted three-hour window,
  without a preceding timeout event.
- Compare an exact duplicate, an ID conflict and a refusal followed by a late
  reply in three independent branches from one retained snapshot.

The payoff matrix, branch table and event timeline supply the problem inputs.
The diagram has readable timestamp labels and an equivalent text alternative;
it does not label the resulting state. The recipient handoff, event fixtures,
Poisson model, utility scores and game remain distinct examples, without
inferred feelings, real messaging or a prescribed human response deadline.

Worked explanations show the new 69.88% arrival probability, q = 0.7 utility
tie above stopping, r = 3/5 mixed strategy and the [5, 8) observation window.
They explain why a late reply can change phase without changing a completed
window outcome, why a decline closes the conversation, and why retained event
IDs offer only local deduplication. The quiz does not change the workbook's
state machine or add a send transition.

The last 25-minute block reserves fifteen minutes to review the prepared
implementation, replay its tests and save the Week 8 handoff. It then uses
about eight minutes for quiz responses and two for the unlocked explanations.
The lecture summary matches. The 20 + 25 + 20 + 25 = 90-minute tutorial,
60-minute lecture, full 50-slide resource and 210-minute independent allocation
remain consistent.

Every case needs a valid response, including an incorrect attempt. Completion
enables Reveal answers; explicit submission then fetches the separate solution
resource and shows scores, answers and explanations. No responses accompany
that request. Navigation retains choices, retry and reload clear the attempt,
and failed solution requests preserve it. Without JavaScript, all prompts are
readable and submission stays disabled. This static practice gate does not
prevent deliberate inspection of the solution URL.

The shared component, script, grading logic and styles are unchanged. The
focused browser audit now includes all six quizzes. No dependency was added.

Verification:

- `pnpm check` passed: 131 tests in 25 files, zero type diagnostics, broken
  internal links or build accessibility/deck structural violations.
- The publication test first failed against the earlier build without the
  sixth quiz, then passed after building it. Unit checks cover all missing
  cases, malformed responses, decimal equivalence, 0/6, 2/6 and 6/6 attempts,
  the new probability and payoff arithmetic, exact-boundary events, duplicate
  and conflict precedence, retained closure and unchanged input snapshots.
- `node scripts/audit-tutorial-quiz.mjs` passed for all six quizzes against
  the built site on the existing preview server. It checked completion and
  answer-request gates, keyboard controls, partial/mixed/full attempts, numeric
  validation, failed solution loading and retry, reset, no-JavaScript fallback
  and axe. All six cases fit at 1920×1080, 390×844, 375×667 and 844×390 without
  horizontal overflow. The full site-wide browser audit was not rerun.
- Visually inspected the event timeline on desktop and phone, the payoff and
  branch tables on phone, and the unlocked explanations. Timestamp labels,
  table cells, answers and controls fit their containers.
- The separate evidence gate still flags the existing `PROCESS.md` template
  comment and placeholder citations `a1b2c3d` and `e4f5a6b`. The student's own
  account was not edited.

Screenshots:

- [Desktop event timeline](screenshots/tutorial-06-quiz-desktop.png)
- [Phone event timeline](screenshots/tutorial-06-quiz-phone.png)
- [Phone feedback after all six responses](screenshots/tutorial-06-quiz-feedback-phone.png)
