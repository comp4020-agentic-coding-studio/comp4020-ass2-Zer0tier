# Romance Debugger

The requested interactive conversation is available at `/romance-debugger/`,
linked from the homepage, toolkit, Week 6 lecture and Week 6 tutorial. It uses
the existing `routeMessage` classifier from the downloadable Week 6 model.
The new wrapper retains a local transcript and choice history and reveals
authored observations only when the student chooses to continue.

Three cases cover supported shared context, missing profile topics and missing
boundary history. Students can choose a contextual or plain opener, preserve
uncertainty, draft a clarification to an actual reply, review missing evidence,
or close a conversation. Unsupported premises, a second unanswered opener and
attempts to bypass refusal are held without changing the snapshot or transcript.
The final shared-context scene tests a late reply after closure; it cannot
revive the conversation. Restarting starts a fresh classroom case.

The inspector shows the routes before and after a choice, visited and skipped
tree checks, concrete evidence, remaining unknowns and the current snapshot.
The decision trail includes held attempts and downloads as versioned JSON.
The supplied replies are scripted branches, not rewards or predictions. Alex's
case facts stay fixed, and the clarification remains a local draft. No actual
messages, model service, accounts or storage service are involved.

This is exploratory, ungraded practice with immediate per-action feedback.
The existing tutorial quiz and its all-answers-before-feedback gate are separate.
The tutorial can use five minutes of its existing 25-minute tree block for the
debugger, with the workbook hand trace retained as an alternative. No tutorial
time or assessment was added.

## Interface review

The UI/UX skill's design-system searches returned entertainment and children's
learning patterns, which did not fit this university teaching tool. No generated
design system was persisted. The implementation uses the existing Public Sans,
pink/blue tokens and native controls. Focused guidance on visible focus and
clear feedback, together with [W3C's notification guidance](https://www.w3.org/WAI/tutorials/forms/notifications/),
informed the state announcement and deliberate focus movement after actions.

Desktop uses adjacent conversation and inspection panels; smaller screens stack
them. Browser visual review exposed an inherited prose-width limit that cramped
the desktop panels. The debugger now uses the available content width, and its
audit asserts that relationship. A static paper exercise remains available
when JavaScript is disabled. The fallback link reaches the actual rule section.

## Verification

`pnpm check` passed with zero type diagnostics, 53 built pages, clean generated
links/accessibility/deck checks, and **176 tests across 31 files**. Eight new
behaviour tests cover supported alternatives, blocked attempts, uncertainty,
tentative replies, refusal priority, terminal late replies, local endings,
reset, immutable inputs, export and duplicate actions. The suite initially
could not load its missing implementation. After implementation, a temporary
mutation bypassing the action guards caused three behavioural tests to fail;
restoring the guard returned all eight to green.

`scripts/audit-romance-debugger.mjs` passed all three cases at 1920×1080 and
390×844, checking **38 rendered states**, focus after actions/retries/reveals,
Enter/Space operation, selected case states, snapshot disclosure, reset and
the downloaded JSON contents. Axe and target/overflow checks recorded no
findings. The homepage, toolkit and both Week 6 entry links were exercised
and checked with axe at both sizes. Resize checks covered 375, 639, 640, 849,
850, 1024, 1439, 1440, 1920 and 390px, plus 844×390 landscape. The no-JavaScript
paper exercise remained usable. No browser JavaScript errors or network writes
were recorded.

The new audit is also called by `pnpm check:browser`. This task ran the targeted
audit directly, rather than repeating every unrelated deck and quiz interaction.
Chromium required the temporary ALSA library and permission to run outside the
sandbox. These are local checks; the feature was not publicly deployed here.

[Desktop conversation](screenshots/romance-debugger-desktop.png) ·
[Phone uncertainty result](screenshots/romance-debugger-unknown-phone.png) ·
[Phone homepage entry](screenshots/romance-debugger-home-phone.png)
