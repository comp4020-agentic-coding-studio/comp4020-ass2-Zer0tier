# The spec

## SLOP1276 prototype checks

`assignment-2.test.ts` protects the allocated code suffix, twelve weeks,
assessment total and authored deck. `partner-course.test.ts` protects the
literal field-guide milestones, earlier-work dependencies, assessment
preparation and the teaching dates across the break. Neither file judges prose
quality or proves that a declared dependency is educationally useful.

After `pnpm check`, start `pnpm preview --port 4322` and run
`pnpm check:browser`. The browser audit checks every built page at 1920×1080 and
390×844, including rendered contrast and pointer targets, then drives syllabus
filters, search, mobile navigation, resizing and the deck. It also checks that
all twelve weeks remain available without JavaScript. Install Playwright's
Chromium if needed with `pnpm exec playwright install chromium`; Linux needs its
browser system libraries. `AUDIT_ORIGIN` can select another preview origin.

Screenshots and the measured report go to `/tmp/partner-audit` by default.
This browser gate is separate because the fixed build uses jsdom, which cannot
measure layout or colour contrast. `pnpm check:evidence` remains the submission
gate, and intentionally still requires the student's own PROCESS.md.

Every deliverable's spec — what the markers consider when they judge whether
your work matches what was required — is published on the course website, and
this repo's name tells you which one applies: the course API maps repo prefixes
to deliverables, and the `start` course skill walks your agent through pulling
the right one. The brief poses the problem; the spec is the fixed contract. Read
both on the site before you plan or build.

One file is supplied here:

## Course coherence (shipped, always on)

`data-integrity.test.ts` checks the one cross-page fact the content schemas and
build cannot: dated material stays inside the course period. The build already
owns compilation, accessibility, internal links, content references, API
generation and deck compilation.

## Your spec tests (yours to write)

Turning the week's published spec into tests is your work, not the template's.
Some spec lines are mechanically checkable — assert those here, in your own test
file alongside the supplied ones (any `spec/*.test.ts` runs with `pnpm check`).
Some lines only a person can judge; leave those to the crit. There is no minimum
count: select the checks that protect your work's real promises, and test the
**contracts** — what the page must do, not how you built it — so the tests
survive a change of approach, or of stack.

A green suite here is backpressure, not a mark: your tutor verifies what you
deployed against the published spec at the crit, and keeping your own tests
green is how you arrive with no surprises.
