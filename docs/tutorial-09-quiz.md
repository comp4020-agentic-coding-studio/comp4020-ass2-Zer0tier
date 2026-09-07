# Ninth tutorial: an interactive First date modeling quiz

The ninth tutorial is Week 10, `/sessions/10-date-simulation/`. “The simulator
has booked a second date” adds six application cases using the existing quiz
component. Preparation links directly to it. Week 1 remains lecture-only.

The new cases apply the week's numerical and observation contracts:

- Diagnose a transposed row-vector update that loses probability mass; repair
  orientation without normalising away the bug or changing absorbing states.
- Trace the exact 0.625 boundary and a subsequent zero draw using half-open
  categorical intervals. A zero-mass destination must remain unselectable.
- Derive the unconditional two-step N probability, retaining paths already
  absorbed after step one and retaining transient paths in the denominator.
- Compare new 800- and 1,600-path counts from A, interpreting percentage-point
  errors and recognising the smaller run as a prefix of the larger run.
- Check an $18 café bill against a newly confirmed $16 split-drinks agreement,
  preserving unknown transport and the ability to leave during bill review.
- Export separate declined, unobserved and pending observation branches,
  respecting withdrawal and a complete ended snapshot despite a queued event.

Cases 1–4 share a new matrix with C row (0.375, 0.25, 0.25, 0.125) and A row
(0.25, 0.25, 0.125, 0.375); N and E retain their absorbing rows. The matrix is
shown in both cases that require it, so arithmetic does not require keeping
another panel open. The sampling diagram supplies input intervals and an
equivalent text alternative, without marking either requested destination.
Case 4 explicitly changes the initial state to A. Cases 5–6 use separate
authored observation records under `quiz-date-v2`, rather than treating a
simulation state as evidence about a person. The workbook's original matrix,
seed, counts and Atrium cover-both example are unchanged.

Worked explanations derive N = 37.5% from C after two updates. From A, exact
N is 0.21875; seed 202710 gives counts (120, 97, 177, 406) at 800 paths and
(243, 208, 345, 804) at 1,600. N's absolute error grows from 0.25 to 0.3125
percentage points. Both runs use the workbook's unsigned LCG, reset each path
to A and consume two draws per path, including after absorption. The bill
comparison separates the $16 drinks from Alex's $10 outing contribution.
Acknowledgement records answers, not payment or another date.

The last tutorial block now reviews prepared arrival, bill and memorylessness
records for ten minutes, then allows about eight minutes to answer the quiz
and two to review explanations. Preparation is explicit within the existing
90-minute pre-tutorial independent block. The session remains
20 + 30 + 20 + 20 = 90 minutes, alongside the 60-minute lecture, full 50-slide
resource and 210-minute independent allocation. The sensitivity exercise and
mutation/restoration work remain in their existing tutorial block.

Every case needs a valid response; an incorrect response counts as an attempt.
Only explicit submission after completion fetches the separate answer key and
reveals answers, scores and explanations. Responses are not sent with that
request. Navigation preserves the attempt; retry and reload clear it; a failed
solution load preserves it for resubmission. Without JavaScript, prompts stay
readable and submission stays disabled. This static practice gate does not
prevent deliberate inspection of the solution URL.

The shared quiz component, interaction script, grading logic, styles and
workbook functions are unchanged. No dependency was added.

Verification:

- `pnpm check` passed: 151 tests in 28 files, zero type diagnostics, broken
  internal links or build accessibility/deck structural violations.
- Before building, the new publication test failed against the previous build
  without the ninth quiz; the other seven new checks passed. After building,
  publication and all existing tests passed.
- Independently calculated exact fractions and a Python integer/fraction
  implementation of the generator and sampler matched both two-step vectors
  and both new count tables.
- Unit checks cover every missing case, malformed responses, decimal
  equivalence, 0/6, 2/6 and 6/6 grading, displayed matrix/count inputs, exact
  boundaries, absorbing mass, bill comparison, distinct acknowledgements,
  separate arrival, withdrawal, exports and unchanged input/terminal snapshots.
- `node scripts/audit-tutorial-quiz.mjs` passed against the built preview for
  all nine quizzes. It checked missing and invalid responses, completion
  without submission, Enter submission, keyboard navigation, mixed/full
  grading, retry and reload, and recovery from a failed solution request.
  No solution request or worked answer markup appeared before submission.
- The audit checked every case at 1920 × 1080, 390 × 844, 375 × 667 and
  844 × 390, including image loading and containment, horizontal overflow,
  44-pixel targets, axe accessibility checks and JavaScript errors. The
  no-JavaScript check retained all prompts and disabled submission.
- Visual inspection confirmed that the matrix, count and event tables fit
  phones, the interval diagram remains readable at desktop and phone widths,
  and submitted feedback stays within the reading column. The full site and
  deck browser audit was not rerun for this quiz addition.
- The separate evidence gate still flags the existing `PROCESS.md` template
  comment and placeholder commit citations `a1b2c3d` and `e4f5a6b`. The
  student's own account was not edited.

Screenshots from the built preview:

- [Desktop sampling case](screenshots/tutorial-09-quiz-desktop.png)
- [Phone sampling case](screenshots/tutorial-09-quiz-phone.png)
- [Phone submitted feedback](screenshots/tutorial-09-quiz-feedback-phone.png)
