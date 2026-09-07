# Fifth tutorial: an interactive Opening message quiz

The fifth tutorial is Week 6, `/sessions/06-message-tree/`. “The opener
optimiser needs a stop button” adds six application cases with the existing
quiz component. The preparation section links directly to it. Week 1 remains
lecture-only.

The cases apply the week's evidence, routing and optimisation rules:

- Prioritise a known refusal even when unrelated topic evidence is malformed.
- Choose an opener supported by Alex's facts and a new fictional recipient quote.
- Derive the crossover between two admissible drafts with assumed reply
  probabilities 0.30/0.45 and composition times of ten/twenty seconds.
- Trace pending, unknown-boundary and closed/late-reply snapshots, including
  a pending case whose malformed topic metadata must not override history.
- Recode one complete reply record without discarding its exposure denominator.
- Exclude a reviewed demand before scoring, despite its higher any-reply count.

The utility diagram shows the assumed inputs without revealing the crossover.
The other cases include actual candidate wording and small routing/reply tables.
The cost model, observed-count examples and recipient cards are separate
authored fixtures; neither the probabilities nor the outcomes are measurements
of messages sent to real people. The supported bio, frozen photo and earlier
invitation remain unchanged.

The worked explanations show the guard traces, evidence joins, utility
equations, corrected rates and pressure counterexample. The new crossover is
0.15 utility units per second; both drafts tie above defer at that value.
An admissible draft need not be sent. Refusal, unknown routing metadata and
pending history cannot be overridden by a utility result, and the pure
classifier neither sends a message nor persists history.

The last 25-minute tutorial block allocates fifteen minutes to the prepared
adversarial review and Week 7 handoff, followed by about eight minutes of quiz
responses and two of debrief. The lecture summary matches. The 20 + 25 + 20 + 25
= 90-minute tutorial, 60-minute lecture, complete 50-slide pack and independent
work allocation remain intact.

Each case needs a valid response, including an incorrect attempt. Answering
the sixth case enables submission without automatically revealing anything.
Only submission fetches the separate solution resource and displays the score,
answers and explanations. No responses are sent with that request. Navigation
preserves responses; retry and reload clear them. Failed requests retain the
attempt, and the no-JavaScript fallback keeps prompts readable with submission
disabled. This static practice interface does not hide the solution URL from
deliberate source inspection.

The shared component and behaviour are unchanged. The focused audit now
includes all five quiz pages and captures the new message, utility and routing
examples. No dependencies or additional UI framework were introduced.

Verification:

- `pnpm check` passed: 126 tests in 24 files, zero type diagnostics, broken
  internal links or build accessibility/deck structural violations.
- The publication test failed against the previous build without the fifth
  quiz, then passed after building it. Unit checks cover every missing case,
  numeric validation and decimal equivalence, 0/6, 2/6 and 6/6 attempts, literal
  guard traces, unchanged pending input, the utility tie/defer case, pressure
  exclusion, and new reply arithmetic.
- `node scripts/audit-tutorial-quiz.mjs` passed for all five quizzes against
  the built site on the existing preview server. It checked completion and answer-request
  gates, keyboard controls, partial/mixed/full attempts, numeric validation,
  failed solution loading and retry, reset, no-JavaScript fallback and axe.
  All six cases fit at 1920×1080, 390×844, 375×667 and 844×390 without horizontal
  overflow. The full site-wide browser audit was not rerun for this addition.
- Visually inspected the utility diagram on desktop and phone, the routing
  and pressure tables on phone, and the unlocked explanations. Labels, table
  cells and controls fit, and the diagram contains only the supplied inputs.
- The separate evidence gate still flags the existing `PROCESS.md` template
  comment and placeholder citations `a1b2c3d` and `e4f5a6b`. The student's own
  account was not edited.

Screenshots:

- [Desktop utility case](screenshots/tutorial-05-quiz-desktop.png)
- [Phone utility case](screenshots/tutorial-05-quiz-phone.png)
- [Phone feedback after all six responses](screenshots/tutorial-05-quiz-feedback-phone.png)
