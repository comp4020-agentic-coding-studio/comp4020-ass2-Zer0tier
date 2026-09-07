# The spec

## SLOP1276 prototype checks

`assignment-2.test.ts` protects the allocated code suffix, twelve weeks,
assessment total and authored deck. `course-sequence.test.ts` protects the
literal engineering milestones, earlier-work dependencies, assessment
preparation and the teaching dates across the break. `algorithmic-romance.test.ts`
protects the student's CS title, unchanged SLOP1276 code and matching level-1
metadata, four weekly anchors, assessment types
and synthetic benchmark scope. `quantitative-models.test.ts` uses literal
arithmetic oracles for Elo, the bio experiment, census, control count, conservative
ties and shifted scoring. It also runs the downloadable Week 2 workbook against
the built model and CSV files, checking stateful Elo and exposure allocation.
None judges prose quality, feature-rating honesty or
whether a declared dependency is educationally useful.

`tutorial-quiz.test.ts` checks the first tutorial's six application cases,
complete-attempt grading and absence of solution explanations in the initial
HTML. `photo-quiz.test.ts` covers the second tutorial's distinct photo cases,
literal crop arithmetic and reviewer agreement, and publishing its own quiz
without answer explanations in the initial page. `bio-quiz.test.ts` covers the
third tutorial's Unicode budget, overlapping token matches, candidate length
checks, new exposure reversal and gated grading/publication. `match-quiz.test.ts`
covers the fourth tutorial's conditional probabilities, repeated models,
travel boundaries, time-window rates and a new rating vector against the
unchanged 99 controls, plus gated grading/publication. `message-quiz.test.ts`
covers the fifth tutorial's guard priorities, evidence branch, utility tie,
recoded reply rates, pressure exclusion and gated grading/publication.
`communication-quiz.test.ts` covers the sixth tutorial's receipt fields, new
Poisson and utility calculations, changed game, shifted deadline and ledger
branches, plus gated grading/publication. `threat-quiz.test.ts` covers the
seventh tutorial's coded observations, new confusion matrices, cost tie,
base-rate projection and review branches, plus gated grading/publication.
`handover-quiz.test.ts` covers the eighth tutorial's hard venue limits, changed
bill and version, new joint outcomes, dependence, fallback limits and terminal
confirmation branches, plus gated grading/publication. The first eight quizzes
are on Weeks 2–9 respectively; Week 1 remains lecture-only.
`scripts/audit-tutorial-quiz.mjs`, also called by `pnpm check:browser`,
checks that no answer request or reveal occurs before all six responses and
submission. It covers keyboard navigation, partial/mixed/full attempts,
invalid numeric input, a failed request and retry, reset, no-JS fallback,
contrast and mobile layout for all eight quizzes, with all six cases at four
viewport sizes and image loading/containment checks for the teaching diagrams.
These are practice checks, not course grades.

`photo-kit.test.ts` extracts the exact Week 3 student ZIP, checks it against the
individual downloads, runs its workbook and verifies literal numeric answers.
It changes image bytes and frozen crop metadata in temporary copies to prove
that those changes are rejected. The drawings and labels still need human review.

`bio-workbook.test.ts` protects Week 4's literal code-point boundaries, token
spans, overlap handling and empty denominators. It runs the built five-file
download offline and checks the exposure reversal, reweighting and separate
uncertainty fixtures. Corrupt, duplicate and missing exposure cells must fail.
The original-string boundary oracle was verified with a temporary UTF-16-length
mutation; it rejected the wrong count before the correct implementation passed.

After `pnpm check`, start `pnpm preview --port 4322` and run
`pnpm check:browser`. The browser audit checks every built page at 1920×1080 and
390×844, including rendered contrast and pointer targets, then drives syllabus
filters, search, mobile navigation, resizing and the deck. It also checks that
all twelve weeks remain available without JavaScript, and drives the A/B
calculator's valid/invalid/reset states and imports the downloadable scorer.
It focuses and scrolls a wide Week 2 teaching table using the keyboard.
The deck checks cover slides without controls or first-visit hints, A/D and
wheel navigation, Esc returning to the lecture, keyboard/input conflicts,
and all slides fitting at five viewport sizes. Later figure slides also receive
axe checks, image-loading checks and screenshots at desktop and phone widths.
Run just those checks
against the built preview with `node scripts/audit-decks.mjs`.
Install Playwright's
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
