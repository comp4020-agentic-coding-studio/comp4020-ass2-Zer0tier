# Week 11 content review

## Sufficiency and pacing

Week 11 previously had four short sections and a four-task tutorial, with no
slide deck. It now has 50 slides, 16 figure slides, expanded worked notes and a
180-minute route: observation labels/cutoffs/denominators (30), time and decision
models (30), break (10), frozen evaluation and common-weight sensitivity (40),
changed availability and evaluation history (35), and release/reproduction (35).
The tutorial retains its 20/25/20/25-minute allocation. Calculations already
completed in the lecture can become an evidence review in the tutorial.

Exercises have debriefs: a cutoff exactly on the second agreement, a changed
percentage through denominator selection, overlapping time intervals, benefit
units, utility crossovers, rating evidence, conservative ties, full reranking,
failed availability, leakage classification, deliberate implementation errors
and rendered-release inspection. Optional extensions add 15–20 minutes without
new assessment requirements. The timing is a facilitation estimate, not proof
of duration from slide count. Solo implementation and review remain accepted.

## Visual treatment

The slides and UI/UX skills informed the workshop structure and native figure
components. Fourteen FollowUpFigure variants provide labelled tables and
numbered process diagrams. Two existing DeckBars figures compare time components
and assumed benefit rates with common zero baselines. Values and explanations
are visible without colour discrimination, hover, animation or a chart library.
The existing course palette and Public Sans remain on course pages and decks.

The chart search produced guidance for multivariable radar comparisons, which
was a poor fit for these exact comparisons. A narrower retry still preferred
radar but explicitly excluded precise comparisons and provided a table/grouped
bar fallback. The implementation uses that fallback and the existing bars.
Astro guidance supported static native components. No new visual system, images
or dependencies were introduced. The self-contained generated HTML example uses
a local system font so its reproduction does not fetch a webfont.

A browser check found excess inherited list-item margins in the four-stage
freeze figure at 375×667. Explicitly resetting those margins fixes the figure
within the established type sizes and avoids changing earlier decks.

## Actual dependencies and provenance

The sixteen-file workbook adds three files and uses thirteen unchanged downloads.
It imports the actual Week 4 supported repair and Week 5 library itinerary,
replays the Week 7 conversation, Week 8 review/clearance, Week 9 confirmations
and Week 10 meeting events through their real functions, and consumes the
meetingForFollowUp export. It also reruns the exact/seeded Markov comparison
and checks all weighted control scores against the generated reference scorer.
The new scorer implements the small formula as an independently tested teaching
function; the generated API implementation is unchanged.

The default candidate is a teaching snapshot assembled now, with Week 5's
(4,4,3,4) example vector and Week 4's existing repair. It is explicitly not a
recovered student's earlier frozen candidate or proof of an earlier release.
Students evaluate their actual Week 5 freeze first. The source candidate and
invitation references remain in the report. A retained photo-version reference
does not claim that the minimal generated HTML displays that photo.

The review clearance is an authored assumption, not identity proof. The inherited
agreement retains the actual cost object: Alex's $12 drinks, counterpart's $0
drinks, and Alex's $14 outing total. The alternative meeting branches are not
independent dates and are never counted as a cohort. The eight-record dashboard
is separately labelled, as is the 115-minute time log. No earlier fixture was
modified to make the new arithmetic agree.

## Literal answers and boundaries

- The time intervals are [0,10), [10,100), [100,110), [110,115): total 115,
  elapsed 115 and zero unallocated minutes. Overlaps fail; adjacency succeeds;
  gaps remain explicit. Composition time establishes neither sending nor delivery.
- Benefits 0/5/10/20 yield 0/.043478/.086957/.173913 units per minute.
  10 units over 115 minutes is about 5.217 units/hour, not 8.7%. A zero-time
  ratio is null. This is an assumed benefit/time proxy, not measured viability
  or a net-return calculation that subtracts unlike units.
- The separate eight-record dashboard has two agreed, two declined, three
  pending and one unobserved: 25% among all and 50% among resolved. A zero
  denominator is undefined. The reporting rule is 48 hours, not a delay prescription.
- Week 10's next-a at 1085 is inside [0,1086); next-b at 1086 is outside.
  The cutoff label is pending while the latest completed export is agreed and
  the meeting ended. Withdrawal at 1087 changes the view before 1088 to declined.
  The full source history is retained; no Monte Carlo state supplies an event.
- The generic Week 7 utility function is reused with assumed q, five utility
  units and a separate admissibility flag. The q crossovers are .5 and .8.
  Its numerical maximiser is not a consent decision. A refusal ends the
  invitation before optimisation and excludes continued waiting or clarification.
- Primary (4,4,3,4): score 93.75, zero controls above, one tied, rank 2/100.
  At double feasibility: score 90, one above, zero tied, rank 2. Control 099
  changes from 93.75 to 95. The failed target remains visible.
- Separate (4,4,1,4) probe: 81.25, one above, three tied, rank 5; then 70,
  twelve above, nine tied, rank 22. All 99 controls are rescored under the
  same weight and denominator. No rounding occurs before comparison.
- Original library plan: 100 minutes, $14, 20 minutes spare. The separately
  changed 90-minute case gives −10 minutes spare and a failed time constraint.
  Its unchanged Friday 5–7 pm text contradicts the new 5–6:30 pm window.
  An authored feasibility rating of 2 yields 87.5/rank 2, but case fidelity
  fails and release under that changed case is blocked.
- Controls supply no profile texts, so changed-case evidence review applies
  only to the candidate. This is explicitly not a population-wide availability
  rescore or a measured real-world distribution shift.

An independent Python Fraction calculation reproduced all five score/rank pairs
using rational arithmetic and literal rank expectations. It also checked the
115-minute sum and 10/115 rate. The existing reference scorer cross-checks all
control scores at both weights; literal tests additionally distinguish a shared
implementation error from consistency. The authored ratings remain reviewable
judgments rather than results of a text classifier.

## Release and maintenance connection

The optional --release-dir command creates a new directory and refuses to
overwrite one that exists. It writes index.html, evaluation.json, manifest.json
and README.txt. The HTML escapes the verified frozen text and displays the
primary failed target. The report keeps the changed-case failure, exact/seeded
comparison, earlier costs and all control results. It provides a useful worked
example; it does not claim to produce a student's completed project.

The report hashes all sixteen source downloads. The manifest additionally hashes
the HTML and evaluation JSON. Two separate output directories have identical
bytes for all four output files. Runtime version is recorded separately so it
does not break deterministic output. A digest detects a mismatch against a
retained record, not hostile rewriting of both files, authorship or consent.
The frozen snapshot is a classroom record, not immutable storage or a security
boundary. Observation reconstruction expects the real Week 10 exporter; it is
not a hostile-input event-log validator or live follow-up service.

Week 12 receives the exact candidate, source/build files, checksums and actual
browser evidence for clean reproduction and software rollback. The lecture and
tutorial explicitly distinguish byte identity from visible rendered text, and
software rollback from human agreement. No browser pass is fabricated by the
release generator. Keyboard access and the two marking viewports must be
checked on the student's own release.

The lecture/tutorial dates remain 17/20 May 2027. The final project remains 50%,
due 28 May at 5 pm, with its existing validation appendix and release record.
All twelve titles/key concepts, eleven tutorials, weights, Alex's fixed facts,
four schemas and generated API conventions remain. PROCESS.md is untouched.

## Sources

Primary sources checked on 7 September 2026:

- [scikit-learn: common pitfalls and data leakage](https://scikit-learn.org/stable/common_pitfalls.html#data-leakage), for separation of evaluation information from model choices and learned preprocessing. The course makes its own explicitly bounded analogy to revising a candidate after inspecting a benchmark.
- [W3C: page structure](https://www.w3.org/WAI/tutorials/page-structure/), for meaningful regions and logical headings.
- [W3C: Easy Checks](https://www.w3.org/WAI/test-evaluate/preliminary/), for initial keyboard/focus/text review and its stated limitation as an incomplete accessibility assessment.

The assignment brief and assessment/marking environment were rechecked. No
invented dating effect, benefit, probability or rating is attributed to a source.
Readings and toolkit link the full pack and identify what each reading supports.

## Verification

`pnpm check` passes 93 tests in seventeen files, with no type errors, warnings
or hints. Eight new tests cover time boundaries and gaps, benefit units, undefined
denominators, strict controls, literal primary/weighted ranks, the changed vector,
frozen-input changes, HTML escaping, actual inherited replay, isolated offline
execution, identical release output and refusal to overwrite a prior release.
Changing the copied candidate vector makes the workbook's literal assertions fail.
The build emits 51 pages and eleven structurally valid decks, with no broken
internal links or build accessibility findings.

Two deliberate single-match mutations were caught: excluding ties fails the
literal rank test, and including the cutoff endpoint fails the retained
observation test. Each original source was restored in a finally block. The
restored focused suite passes all eight tests. The first cutoff mutation run
was inconclusive because the sandbox blocked its child Node process with EPERM;
the outside-sandbox rerun produced the intended assertion failure and then passed
after restoration. Astro's font socket and Chromium also required execution
outside the sandbox. Chromium's missing audio library was downloaded and
extracted under /tmp without a system installation.

The targeted Week 11 browser audit passes all 50 slides at 1920×1080, 390×844,
375×667, 844×390 and 1024×768, including A/D, arrow keys, wheel navigation,
direct links and Esc return. All 16 figure slides pass axe and fit checks at
both marking widths. The lecture, tutorial, readings and toolkit have no
horizontal document overflow or axe findings at 1920 and 390. Browser JavaScript
errors are empty.

The generated local HTML example passes exact rendered-text comparison against
the frozen report, Tab/Shift+Tab navigation, visible focus, Enter activation of
the evaluation link, axe, both marking widths and doubled body text at each
width without horizontal overflow. Visual inspection covered the desktop
reranking table, phone availability table, lecture prose at desktop and phone,
and the generated phone release. Retained evidence: [desktop reranking](screenshots/week-11-reranking-desktop.png),
[phone constraint failure](screenshots/week-11-availability-phone.png) and
[phone example release with keyboard focus](screenshots/week-11-release-phone.png).

Verification used Node 24.18.1 and Playwright's Chromium 151.0.7922.34 on this
local Linux environment. The doubled-text check changes the body font size;
it is a text-resize stress check rather than a claim of testing every browser's
zoom behaviour. The evidence supports this local example, not the student's
future release or a public deployment.

The final `pnpm check:browser` passes all 51 pages at both marking viewports,
with zero findings and browser JavaScript errors. All 509 slides across eleven
decks pass five viewport sizes and navigation checks. Menu, search, keyboard,
calculator recovery, no-JS content, resizing and cold-cache checks also pass.
`git diff --check` passes. This is a local content change with no deployment
or student-authored process statement included.
