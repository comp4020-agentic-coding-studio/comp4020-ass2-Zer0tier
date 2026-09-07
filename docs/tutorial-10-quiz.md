# Tenth tutorial: an interactive Follow-up evaluation quiz

The tenth tutorial is Week 11, `/sessions/11-follow-up/`. “The dashboard
congratulates itself” adds six application cases using the existing quiz
component. Preparation links directly to it. Week 1 remains lecture-only.

The cases apply the week's reporting, accounting and evaluation contracts:

- Reconstruct pending and agreed labels at exact half-open cutoffs, while
  preserving the latest withdrawal, completed meeting and full source history.
- Distinguish the all-record and resolved-only agreement fractions for a new
  16-record dashboard under a common 36-hour reporting rule.
- Audit four new activity intervals, expose a ten-minute gap and convert an
  arbitrary benefit rate into units per recorded activity-hour.
- Score a new (2,3,4,3) arithmetic probe, count conservative ties and reweight
  all 99 controls on the same scale as the candidate.
- Apply a separate 100-minute availability stress test: the library route
  fits exactly, but the frozen 5–7 pm public claim contradicts the changed case.
- Reject an invented visibility claim based only on identical build bytes:
  frozen text in HTML can still be hidden by CSS.

The six cases are separate authored exercises, not a joined dataset. The new
meeting history includes agreements at 1080 and 1082, withdrawal at 1084 and
departure at 1088. The dashboard has five agreed, three declined, six pending
and two unobserved records: 31.25% among all and 62.5% among resolved records.
The activity diagram provides intervals, an explicit unrecorded gap and an
equivalent text alternative, without giving the requested rate. Its four rows
are labelled as not to scale.

Recorded durations sum to 100 minutes; the elapsed span is 110 minutes. Five
arbitrary benefit units give 3 units per activity-hour. The primary arithmetic
probe scores 75 with four controls above and six tied: rank 11/100. Doubling
feasibility gives 80 with one above and four tied: rank 6/100. The original
workbook's 115-minute log, eight-record dashboard, frozen teaching candidate,
90-minute stress case and unchanged controls are retained.

The last 25-minute tutorial block now uses fifteen minutes to inspect a
prepared release and reproduce it, then about eight minutes for quiz responses
and two for explanations. Generating the worked-example release is explicit
within the existing 90-minute pre-tutorial study block. The session remains
20 + 25 + 20 + 25 = 90 minutes alongside the 60-minute lecture, full 50-slide
resource and 210-minute independent allocation. Students still retain their
own frozen candidate and evaluate it before revision.

Every case needs a valid response; an incorrect attempt counts. Only explicit
submission after completion fetches the separate answer key and reveals
answers, scores and worked explanations. Responses are not sent with that
request. Navigation preserves the attempt; retry and reload clear it; a failed
solution load preserves it for resubmission. Without JavaScript, prompts remain
readable and submission stays disabled. This static practice gate does not
prevent deliberate inspection of the solution URL.

The shared quiz component, interaction script, grading logic, styles and
workbook functions are unchanged. No dependency was added.

Verification:

- `pnpm check` passed: 160 tests in 29 files, zero type diagnostics, broken
  internal links or build accessibility/deck structural violations.
- Before building, the new publication test failed against the previous build
  without the tenth quiz; the other eight new checks passed. After building,
  publication and all existing tests passed.
- An independent Python calculation using exact fractions and all 99 CSV
  rows matched the two scores, greater/tied counts and ranks. Exact duration
  and rate arithmetic also matched the workbook functions.
- Unit checks cover every missing case, malformed responses, decimal
  equivalence, 0/6, 2/6 and 6/6 grading, displayed counts, actual inherited
  meeting exports, exact cutoffs, source retention, undefined denominators,
  overlap rejection, common-weight scoring, the inclusive time boundary,
  frozen input changes and deterministic release text. The hidden-CSS release
  example is an authored review scenario, not a generated student release.
- `node scripts/audit-tutorial-quiz.mjs` passed against the built preview for
  all ten quizzes. It checked missing and invalid responses, completion
  without submission, Enter submission, keyboard navigation, mixed/full
  grading, retry and reload, and recovery from a failed solution request.
  No solution request or worked answer markup appeared before submission.
- Every case was checked at 1920 × 1080, 390 × 844, 375 × 667 and 844 × 390,
  including image loading and containment, horizontal overflow, 44-pixel
  targets, axe accessibility checks and JavaScript errors. Without JavaScript,
  all prompts remained readable and submission stayed disabled.
- Visual inspection confirmed that the time diagram fits at desktop and phone
  widths, the event and ranking tables remain readable on phones, and feedback
  stays within the reading column. The full site and deck browser audit was
  not rerun for this quiz addition.
- The separate evidence gate still flags the existing `PROCESS.md` template
  comment and placeholder commit citations `a1b2c3d` and `e4f5a6b`. The
  student's own account was not edited.

Screenshots from the built preview:

- [Desktop time-accounting case](screenshots/tutorial-10-quiz-desktop.png)
- [Phone time-accounting case](screenshots/tutorial-10-quiz-phone.png)
- [Phone submitted feedback](screenshots/tutorial-10-quiz-feedback-phone.png)
