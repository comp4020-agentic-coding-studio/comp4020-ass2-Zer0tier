# First tutorial: an interactive Platform audit quiz

The first tutorial is Week 2, `/sessions/02-platforms/`; Week 1 remains
lecture-only. “Your shift at Null Island” adds six fictional application
cases to that page, with a jump link in its preparation section.

Students filter a recommendation queue, audit an invented platform
disclosure, calculate a new Elo update, repair a census denominator,
challenge a response-rate headline and test an exposure allocator. The
cases use different names and numbers from the worksheet, so its printed
answers cannot be copied into the quiz. The arithmetic and source-scope
reasoning stay within the Week 2 teaching material.

The quiz occupies the final ten minutes of the existing 90-minute tutorial:
about eight minutes of responses and two of debrief. The final 20-minute
block now allocates ten minutes to the earlier exposure exercise and claim
repair, then ten to the quiz. The lecture's tutorial summary agrees. No
course marks, additional meeting, account or real-user data are introduced.

The interface presents one case at a time, with a response counter, numbered
case navigation, large selectable options and a numeric calculation. Moving
between cases preserves responses. Every case must have a valid response;
an incorrect response still counts. Answering the sixth case enables
“Reveal answers” without automatically revealing anything. Submission then
shows the score, each selected response, the answer and its worked reasoning.
“Try again” clears the attempt and all feedback. Reloading also starts fresh.

Public questions and solutions are separate resources. Neither answer-key
explanations nor grading results appear in the initial HTML. The client
checks completion before requesting the solution JSON, then grades the
submitted snapshot locally. No responses are sent with that request. If the
request fails, responses remain available and the student can retry. This
is a practice-quiz interface gate on a static site, not secure exam access
control: someone inspecting the source can find the solution resource.

Native radio groups, labels and buttons provide keyboard access. Progress is
announced without correctness hints. Incomplete submissions have a focused
error summary with links to the missing cases. Results receive focus after
submission. Without JavaScript, all six prompts remain readable and the
reveal control stays disabled; solutions remain hidden.

The Astro component, typed question model and browser behaviour support
later tutorial quizzes. The [second tutorial](tutorial-02-quiz.md) now uses it
with a separate photo-audit question set and a crop diagram. The
UI/UX skill supplied the error-summary and focus guidance; existing Astro
scripts and course colour tokens were used without adding a UI framework.

Verification:

- `pnpm check` passed: 111 tests in 20 files; no type diagnostics, broken
  internal links, build accessibility violations or deck structural failures.
  The final error-message clearing adjustment was rebuilt, and the quiz and
  teaching-allocation tests passed again (seven tests).
- The publication test initially failed before the widget existed. A
  deliberate removal of the grading completion guard then made the
  incomplete-attempt test fail; the original guard was restored and passed.
- Unit tests cover every possible missing case, invalid numeric strings,
  wrong but valid responses, literal 1412, mixed 2/6, perfect 6/6 and zero 0/6.
- The focused Chromium audit passed at 1920×1080 and 390×844, plus all six
  cases at 375×667 and 844×390. It checks forced empty/five-answer submits,
  absence of early solution requests and hidden solution markup, keyboard
  selection, preserved responses, a failed request followed by retry,
  complete feedback, fresh retries, reload and the no-JavaScript fallback.
  Axe passed in the initial, error and feedback states; targets and horizontal
  overflow were measured. The audit also runs within `pnpm check:browser`.
- The full `pnpm check:browser` run passed with the quiz included: 52 pages
  at both marking widths, all 559 slides at five sizes, and the existing
  navigation, search and toolkit interactions.
- The desktop and phone quiz, and phone worked feedback, were visually
  inspected. Screenshots are linked below.
- The separate evidence gate still reports the existing `PROCESS.md`
  template comment and nonexistent placeholder commit citations. That
  student-authored file was not edited.

[Desktop quiz](screenshots/tutorial-01-quiz-desktop.png) ·
[Phone quiz](screenshots/tutorial-01-quiz-phone.png) ·
[Phone feedback](screenshots/tutorial-01-quiz-feedback-phone.png)
