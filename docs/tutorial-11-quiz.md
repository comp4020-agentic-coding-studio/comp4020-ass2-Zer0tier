# Eleventh tutorial: an interactive Maintenance and endings quiz

The eleventh tutorial is Week 12, `/sessions/12-maintenance/`. “The rollback
restores too much” adds six new application cases using the existing quiz
component. Preparation links directly to it. Every tutorial in weeks 2–12 now
has one quiz; Week 1 remains lecture-only.

The cases apply the maintenance workbook's contracts:

- Replay a new three-participant proposal with an exact duplicate delivery,
  require distinct acknowledgements, and reject a later stale-base proposal.
- Compare a final acceptance at tick 27 with one at 28 under a new [20, 28)
  window, including the separate clock-only expiry branch.
- Count copies in a new five-record inventory at day 21, respecting ownership,
  inclusive expiry and reproduction dependencies.
- End a partially accepted v2 change from a stale v1 screen, preserving the
  entire ended record after late events while keeping a borrowed game separate.
- Diagnose one changed, two missing and one extra file in a four-file release,
  then restore the full trusted snapshot without improving its evaluation.
- Replace an unsupported generated handover claim with actual artefact paths,
  scoped reproduction evidence, browser checks and explicitly missing feedback.

These are separate authored exercises with fictional adult participants. They
add no biography to Alex. The acknowledgement trace is 1, 1, 1, 1, 2; an exact
duplicate changes neither the state nor its event history. At expiry, the
late event is retained as the trigger but does not join the accepted list.
The SVG supplies both input branches and an equivalent text alternative;
it does not mark either resulting state.

At day 21, three raw-trace copies and two scratch copies enter planned removal:
five copies across two records. Two source copies need dependency review,
one review copy remains within its period, and two other-owned copies remain
outside control. The planner deletes nothing. The periods are invented.

The new restore test creates the actual Week 11 reference release, changes
its evaluation's primary rank to 1 in a disposable in-memory copy, omits its
manifest and README, and adds `draft.txt`. Full restoration preserves all
four original files, primary 93.75/rank 2, sensitivity 90/rank 2, the exact
candidate including its exit wording, and the changed-availability failure.
Copying the archive over the working snapshot still fails on the extra file.
The original nineteen-file workbook and its own fault drill are unchanged.

The final 20-minute block uses ten minutes to review the prepared handover
and actual terminal checks, eight to answer the quiz and two to review the
explanations. Preparing the index and locating actual feedback/revision
evidence is explicit in the existing 90-minute pre-tutorial study block.
The session stays 20 + 20 + 30 + 20 = 90 minutes, alongside the 60-minute
lecture, full 50-slide resource and 210-minute independent allocation.

Every case requires a valid response; an incorrect attempt counts. Only
explicit submission after completion fetches the separate answer key and
reveals scores, answers and worked explanations. Responses are not sent with
that request. Navigation preserves an attempt; retry and reload clear it;
a failed solution request allows resubmission with the responses retained.
Without JavaScript, all prompts remain readable and submission stays disabled.
This static practice gate does not prevent deliberate inspection of the
solution URL. The shared component, interaction script, grader and styles
are unchanged; no dependency was added.

The UI/UX skill's focused text-alternative and Astro component guidance
supported a native SVG and the existing static component. There is no new
visual system. The assignment brief and marking environment were rechecked.
Primary sources rechecked on 8 September 2026: [Reproducible Builds' definition](https://reproducible-builds.org/docs/definition/)
for declared source, environment, instructions and output-byte scope;
[RFC 9110, If-Match](https://www.rfc-editor.org/rfc/rfc9110.html#name-if-match)
for the lecture's bounded stale-update analogy; and [W3C Easy Checks](https://www.w3.org/WAI/test-evaluate/preliminary/)
for actual keyboard, text and initial accessibility review and its limits.
The fictional event and retention rules come from the course workbook,
not those external sources.

Verification:

- `pnpm check` passed: 168 tests in 30 files, zero type diagnostics, broken
  internal links or build accessibility/deck structural violations.
- Before building, the publication check failed against the previous build
  without the eleventh quiz. The other seven new checks passed. The first
  test draft incorrectly invoked the unbuilt source workbook; it was corrected
  to use the built downloads, which include the generated reference scorer.
  After building, publication and all existing checks passed.
- Literal tests cover every missing case, malformed responses, equivalent
  decimal input, 0/6, 2/6 and 6/6 grading, displayed event/inventory inputs,
  duplicate and stale events, exact expiry, distinct rejection, complete
  terminal snapshots, copy counts at adjacent days, source retention and the
  actual Week 11 four-file restore. These do not assert browser geometry.
- `node scripts/audit-tutorial-quiz.mjs` passed against the built preview for
  all eleven quizzes. It checked missing and invalid responses, completion
  without submission, Enter submission, keyboard navigation, mixed/full
  grading, retry and reload, and recovery from a failed solution request.
  No solution request or worked-answer markup appeared before submission.
- Every case was checked at 1920 × 1080, 390 × 844, 375 × 667 and 844 × 390,
  including image loading and containment, horizontal overflow, 44-pixel
  targets, axe accessibility checks and JavaScript errors. Without JavaScript,
  all prompts remained readable and submission stayed disabled.
- Visual inspection covered the desktop and phone expiry diagram, phone
  inventory and file-comparison tables, and submitted phone feedback. These
  fit the reading column. The full site and deck browser audit was not rerun
  for this quiz addition.
- Chromium needed its missing audio library extracted under `/tmp`, and its
  launch required execution outside the sandbox. No system package was
  installed. The successful audit used the built preview on port 4322;
  the existing development server remains on port 4321.
- The separate evidence gate still flags the existing `PROCESS.md` template
  comment and placeholder commit citations `a1b2c3d` and `e4f5a6b`. The
  student's own account was not edited.

Screenshots from the built preview:

- [Desktop expiry case](screenshots/tutorial-11-quiz-desktop.png)
- [Phone expiry case](screenshots/tutorial-11-quiz-phone.png)
- [Phone retention inventory](screenshots/tutorial-11-retention-phone.png)
- [Phone submitted feedback](screenshots/tutorial-11-quiz-feedback-phone.png)
