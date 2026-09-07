# Fourth tutorial: an interactive Match probability quiz

The fourth tutorial is Week 5, `/sessions/05-match-probability/`. “The match
forecast needs an audit” adds six application cases using the existing quiz
component. The preparation section includes a jump link. Week 1 remains
lecture-only.

Students apply the week's models to new examples:

- Change the conditioning denominator in a complete 200-pair table.
- Compare ten independent opportunities with a shared-draw counterexample.
- Calculate a joint probability from two conditional-path inputs.
- Check three invented routes against both whole-outing limits.
- Repair a Sunday headline using separate match and exposure counts.
- Calculate a new rubric vector's score and conservative rank against the
  unchanged 99 course controls.

The conditional-path SVG shows the supplied inputs without the product. The
pair, route and time-window tables provide enough evidence to check the claims
on the page. These are separate fixtures, not observations of the supported
bio or additions to Alex's biography. The benchmark case uses the actual
control file: the illustrative [4, 3, 3, 3] vector scores 81.25, with one higher
control and three ties, giving rank 5/100.

The explanations distinguish joint and conditional events, expected counts
and chances of any event, inclusive constraints and reserves, counts and rates,
and rubric scores and probabilities. Feasibility for Alex leaves recipient
availability and agreement unknown. A mutual match is not a confirmed meeting.

The last 25-minute tutorial block uses fifteen minutes for the prepared
benchmark freeze and review, then about eight minutes of quiz responses and
two of debrief. The lecture summary matches. The whole tutorial remains
25 + 20 + 20 + 25 = 90 minutes; the 60-minute lecture, complete 50-slide pack
and independent-work allocation remain intact.

All six cases need valid responses, including incorrect attempts. The sixth
response enables “Reveal answers” without revealing anything automatically.
Only submission fetches the separate solution resource and shows the score,
answers and worked explanations. Responses are not sent with that request.
Navigation preserves them; retries and reload clear the attempt. Failed
requests retain responses. Without JavaScript, prompts remain readable and
submission is disabled. This static practice gate does not protect the solution
URL from deliberate source inspection.

The shared component and browser behaviour are unchanged. The audit now
includes the fourth quiz, alongside the first three, and captures its diagram
and tables. No new dependency or UI framework is required.

Verification:

- `pnpm check` passed: 122 tests in 23 files; zero type diagnostics, broken
  internal links or build accessibility/deck structural violations.
- The publication test failed against the earlier build without the fourth
  quiz, then passed after building it. Unit checks cover each missing case,
  malformed numeric responses,
  equivalent decimal notation, 0/6, 2/6 and 6/6 attempts, literal probability
  and constraint results, and the actual control counts and rank.
- The focused Chromium audit passed for all four quizzes. It checks forced
  empty/five-response submissions, no early solution fetch or hidden worked
  answers, no automatic reveal after the sixth response, keyboard selection
  and submission, preserved responses, mixed/perfect scores, load failure
  and recovery, reset, reload and the no-JavaScript fallback. All six cases
  pass axe and layout checks at 1920×1080, 390×844, 375×667 and 844×390;
  images load and fit. Error and feedback states also pass at both marking
  sizes, with quiz controls at least 44×44 CSS pixels.
- The new diagram, pair table, phone route table and feedback were visually
  inspected. Saved captures are linked below. The focused audit covers all
  four quiz pages; the full course/deck browser audit was not rerun for this
  content addition.
- The separate evidence gate still flags the existing `PROCESS.md` template
  comment and placeholder citations `a1b2c3d` and `e4f5a6b`. The student's
  account was not edited.

[Desktop probability case](screenshots/tutorial-04-quiz-desktop.png) ·
[Phone probability case](screenshots/tutorial-04-quiz-phone.png) ·
[Phone feedback](screenshots/tutorial-04-quiz-feedback-phone.png)
