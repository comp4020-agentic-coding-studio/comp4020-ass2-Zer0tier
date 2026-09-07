# Third tutorial: an interactive Bio experiment quiz

The third tutorial is Week 4, `/sessions/04-bio-experiment/`. “The bio lab
has a premature winner” uses the same six-case interaction as the first two
tutorials, with its own text, diagram and numerical fixtures. The preparation
section includes a jump link.

The cases apply the week's knowledge:

- Count an original string containing 148 ASCII letters, a supplementary
  code point and a trailing space, distinguishing code points from UTF-16 units.
- Choose among four complete bio revisions that differ in case fidelity.
- Union two overlapping dictionary matches in a four-token fragment.
- Reproduce an exposure reversal and compare shared 50/50 weights.
- Distinguish percentage points from relative change and apply the course's
  sparse-cell guard before using its normal approximation.
- Repair a proposed simulation's unit, missing-data and stopping rules.

The token diagram supplies positions without marking any matches. Students
identify both spans and calculate coverage themselves. The exposure table uses
new counts and unknown wordings; its labels do not identify the candidate bios.
Alex's established case facts and frozen photo remain the controls. The quiz
adds no measured outcomes or real-user experiment.

Worked feedback gives the token union, zone and pooled arithmetic, shared
weights, rate units and reasons for rejecting the distractors. It also explains
the limits of the metrics: a text budget cannot establish truth, weighting
cannot reconstruct randomisation, and withholding an approximation cannot
establish equivalence.

The final 25-minute tutorial block now allocates fifteen minutes to the
prepared protocol/report review and ten to the quiz: about eight minutes of
responses and two of debrief. The lecture summary agrees. The existing
20 + 25 + 20 + 25 = 90-minute tutorial, 60-minute lecture, complete 50-slide
pack and independent-work allocation are retained.

Every case needs a valid response, including incorrect attempts. The sixth
response enables submission without revealing anything automatically.
Submission then fetches the separate static answer resource and displays the
score and all worked explanations. No responses are sent with that request.
Navigation, retry, reload, request-failure recovery and the no-JavaScript
fallback use the existing shared component without changing its behaviour.
This is a practice interface; the static solution URL remains discoverable
through source inspection.

Verification:

- `pnpm check` passed: 118 tests in 22 files, zero type diagnostics, no broken
  internal links or build accessibility/deck structural violations.
- The new publication test failed against the earlier build without this
  quiz, then passed after building it. Literal checks cover the new Unicode
  boundary, token union and exposure calculations. Grading checks cover every
  missing case, malformed numbers, equivalent decimal notation and 0/6, 2/6
  and 6/6 attempts.
- The focused Chromium audit passed for all three quizzes. It checks forced
  empty/five-response submission, no early solution requests or hidden worked
  answers, no automatic reveal on the sixth response, keyboard selection and
  submission, navigation, mixed/perfect scores, load failure and recovery,
  reset, reload and the no-JavaScript fallback. All six cases pass axe and
  layout checks at 1920×1080, 390×844, 375×667 and 844×390; image loading and
  containment are checked too. Error and feedback states pass at both marking
  sizes, with quiz controls at least 44×44 CSS pixels.
- The diagram, candidate options, exposure table and feedback were visually
  inspected. One heading was changed to avoid hinting at the exposure result;
  the final wording was rebuilt and verified. Saved captures are linked below.
- This change reuses the existing quiz component and behaviour. The focused
  audit covers all three tutorial pages; the full course/deck browser audit
  was not rerun for this content addition.
- The separate evidence gate still flags the existing `PROCESS.md` template
  comment and placeholder citations `a1b2c3d` and `e4f5a6b`. The student's
  account was not edited.

[Desktop token case](screenshots/tutorial-03-quiz-desktop.png) ·
[Phone token case](screenshots/tutorial-03-quiz-phone.png) ·
[Phone feedback](screenshots/tutorial-03-quiz-feedback-phone.png)
