# Second tutorial: an interactive Photo asset quiz

The second tutorial is Week 3, `/sessions/03-photo-assets/`. “The photo desk
needs receipts” adds six application cases to the page, using the same
interaction as the first tutorial. A jump link in the preparation section
opens the quiz. Week 1 remains lecture-only.

The cases apply the photo manifest and calculation rules:

- Preserve an incomplete permission record and its blocking reason.
- Correct a key-to-fill claim using isolated readings of 300 and 75.
- Calculate retained area from a new 800×600 source and 400×300 crop.
- Separate mock face presence from identity, relationship history and consent.
- Compare eight rows of invented reviewer labels, including matching passes.
- Freeze the image treatment before Week 4's bio comparison.

The crop case has a labelled, proportional SVG diagram, a text equivalent
and the calculation rule. The reviewer case includes the full table. These
are separate authored fixtures, with different values from the worksheet;
they add no biography or observations about real people. Worked feedback
explains both the calculation and its limits: retained area does not establish
useful content, and equal failure totals do not establish label agreement.

The last 25-minute tutorial block allocates fifteen minutes to selection,
validation and freezing, followed by eight minutes of quiz responses and two
of review. The lecture's tutorial summary matches. The full tutorial remains
90 minutes; the complete lecture pack and independent-work allocation remain
available.

Every case needs a valid response, including incorrect attempts. Completing
the last case only enables “Reveal answers”; submission is required to show
any score, answer or explanation. Navigation preserves responses. Retry and
reload clear the attempt. A failed explanation request keeps the responses
and offers another submission. Without JavaScript, all prompts remain readable
and the reveal control stays disabled.

The shared component now takes its introduction and fixture note from each
quiz's data, and supports an optional illustration. The first tutorial retains
its original copy. Each quiz has a separate static solution resource, requested
only after a complete submission, with no responses sent. As with the first
quiz, this is a static practice interface; its solution URL is discoverable
through source inspection, not protected exam content.

Verification:

- `pnpm check` passed: 114 tests in 21 files; zero type diagnostics, build
  accessibility violations, broken internal links or deck structural failures.
- The new publication test failed against the earlier build without the
  second quiz, then passed after building it. Tests cover each possible missing
  response, numeric validation, the literal 25% crop result, four matching
  reviewer rows, and mixed 2/6, perfect 6/6 and zero 0/6 attempts.
- Both quizzes passed the Chromium interaction audit: forced empty and
  five-response submissions expose no solutions and make no solution request;
  a complete attempt still needs submission. Keyboard selection, invalid
  input, navigation, 2/6 and 6/6 results, request failure/retry, reset, reload
  and the no-JavaScript fallback passed. All six cases passed axe and layout
  checks at 1920×1080, 390×844, 375×667 and 844×390. The crop image loads and
  stays inside the viewport. Error and feedback states also passed at the two
  marking sizes, with controls measuring at least 44×44 CSS pixels.
- The full `pnpm check:browser` run passed: 52 pages at both marking sizes,
  the existing navigation/search/toolkit interactions, both quizzes and all
  559 slides at five viewport sizes.
- Desktop and phone captures of the crop case, the phone reviewer table and
  the worked feedback were visually inspected. Saved screenshots are below.
- The separate evidence gate still flags the existing `PROCESS.md` template
  comment and nonexistent placeholder citations `a1b2c3d` and `e4f5a6b`.
  The student's account was not edited.

[Desktop crop case](screenshots/tutorial-02-quiz-desktop.png) ·
[Phone crop case](screenshots/tutorial-02-quiz-phone.png) ·
[Phone feedback](screenshots/tutorial-02-quiz-feedback-phone.png)
