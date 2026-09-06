# Week 6 content review

## Sufficiency and pacing

Week 6 previously provided a short outline, four tutorial tasks and no slide
deck. The replacement has 50 slides and a 180-minute teaching route: context
(30), routing (35), break (10), reply rates and costs (35), objectives (35),
and adversarial review/handoff (35). The notes map these to explanations,
guided study and the existing 90-minute tutorial. Completed exercises are
reviewed rather than repeated. Duration is a facilitation estimate.

Worked exercises cover unsupported openers, evidence joins, competing routing
conditions, malformed metadata, a changed reply count, cost units and utility,
the cost crossover, ties and abstention, a pressure-objective repair and a
versioned handoff. Optional 15–25-minute extensions enumerate guard combinations
or add an explicitly supported new-topic branch.

## Visuals and reproducible examples

Ten slides include figures: the two-sided evidence join, ordered guards,
contrasting refusal/pending traces, repeated pending snapshots, observed reply
rates, composition times, the utility sensitivity table, pressure reply rates,
pressure answer rates and the Week 7 handoff. Native HTML/CSS uses the course
palette and existing bar-chart component, with semantic labels and visible
values. The utility comparison uses a table so negative scores and ties remain
legible. No photo or additional Alex biography is introduced.

Four downloadable files run offline with Node and no third-party packages.
Three new files contain authored cases, pure routing/rate/utility functions and
the executable log; the fourth is the unchanged generated model module, reused
for its sparse-cell check. A spreadsheet or other language remains accepted.
The literal answers include:

- Ten routing cases: contextual draft, plain draft, plain draft, stop, stop,
  pending, respond, stop, stop and review.
- A prior refusal reaches only the terminal guard, even with shared-topic
  evidence. A pending case reaches terminal, metadata and history, never context.
- Original reply rates 2/10 and 4/10, difference 0.20 and ratio 2. Recoding one
  Games reply gives 3/10 and a ten-point difference. The normal z is withheld.
- At V = 10 and λ = 0.05, utilities 1.5 and 2.5 for ten/thirty-second costs.
  Message tie at λ = 0.10, Hey preferred at 0.15, Hey/defer tie at 0.20 and
  defer preferred at 0.25. Reducing assumed p(Games) to 0.25 changes its utility
  to 1.0 at λ = 0.05.
- Separate pressure fixture: any-reply rates 40/60%, answer rates 30/10%.
  The demand is excluded before utility calculation, regardless of its score.

## Coherence and methodological review

| Connection | Concrete use |
| --- | --- |
| Week 4 → Week 6 | The supported bio and frozen A-portrait-v1 supply the candidate facts, while recipient quotes must independently support shared context. |
| Week 5 → Week 6 | The checked invitation retains Alex's route/time/budget constraints and unknown recipient availability. It stays separate from the frozen benchmark candidate. |
| Week 6 topic | Ordered conditional branches, structured inputs, execution traces and adversarial tests implement an opening-message protocol. |
| Week 6 key concept | “Bypassing the conversational firewall” is made concrete as reducing ambiguity; the pressure counterexample exposes why a forced-response objective fails. |
| Week 6 → Week 7 | The tree hands over send history, pending/response distinctions and terminal closure requirements. Week 7 adds clocks, events and utility games. |
| Midterm preparation | Exercises trace unfamiliar refusals and missing fields on paper, matching the unchanged exam's Question 3 preparation. |

The routing, reply-count, utility and pressure cases are separate authored
fixtures. No messages were sent and no real response probabilities were fitted.
The original 2/10 and 4/10 counts remain; they lack random allocation. The utility
probabilities deliberately share their numeric values but are explicitly
assumptions rather than validated estimates. Every outcome definition retains
its denominator and observation window.

The snapshot classifier performs no NLP, sending, scheduling or persistence.
Closed/refused/blocked evidence takes priority over malformed unrelated topic
metadata. Unknown boundary information goes to review, while missing topic
information can support a plain draft. Strict Booleans avoid treating the
string “false” as valid history. Reply-without-opener is an inconsistent record
within the declared fixture. All outputs carry `sendsMessage: false`.

The contextual branch intentionally recognises only a reviewed board-games tag
in version 1. Non-empty quotes and tags are not semantic proof; a human must
verify the evidence. A pure classifier cannot guarantee duplicate prevention
if a caller fails to record sends. Elapsed time and read receipts cannot create
a reply or reopen a terminal state. These limitations prepare the next week's
state work without pretending it is already implemented.

Admissibility is a supplied policy judgement before numerical ranking, not a
soft utility penalty or an automatic detector of coercion. Defer remains
available. A 1e−10 arithmetic tolerance retains ties for review; it is not an
empirical indifference threshold. Response categories concern authored content
and do not assign feelings or imply agreement to meet.

All course titles, key concepts, dates, the twelve-lecture/eleven-tutorial
schedule, assessment weights, fixed case facts, collection schemas and generated
API plumbing remain unchanged. PROCESS.md remains the student's own account.

## Sources

Primary references checked on 6 September 2026:

- [MDN: if…else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else), for ordered conditions, skipped alternatives and Boolean/truthiness distinctions.
- [NIST: comparing two proportions](https://itl.nist.gov/div898/handbook/prc/section3/prc33.htm), for the bounded reuse of Week 4's normal-comparison method.
- [W3C: SCXML basic concepts](https://www.w3.org/TR/scxml/#Basic), for event/condition transition notation and why precedence must be specified. The workbook does not implement SCXML.

These support programming/statistical methods and notation, not a superior
opener or real dating-effect claim. The assignment brief and assessment pages
were rechecked. Existing slides and UI/UX skill guidance informed the teaching
route and static, labelled diagrams; the established design system was reused.

## Verification

The initial `pnpm check` passes 46 tests in twelve files and builds 46 pages
with no type diagnostics, internal-link failures or build accessibility
findings. Six new tests cover terminal priority, missing/malformed metadata,
unchanged input, literal utility crossovers, inadmissible options, invalid
probabilities/costs, reply denominators and the four-file offline download.
The offline test rejects duplicate fixture IDs and unresolved recipient refs.

A temporary mutation inserted the shared-topic branch before the terminal
guard. The refusal test failed with `draft-context` where its literal expected
action was `stop`. The mutation script asserted its replacement matched and
restored the original source in a finally block.

The restored six-test workbook suite and subsequent complete checks passed.
One isolated focused rerun returned empty workbook output; direct execution,
the next focused run and complete suite reruns passed. Its cause was not
established; no source fix is attributed to that transient result.

Browser review found two presentation defects: utility-table headings inherited
a low-contrast colour, and the guard diagram exceeded the 375×667 slide height.
Explicit paired table colours, removal of inherited list margins and smaller
phone row padding address them without reducing the diagram's text size.

Final verification:

- `pnpm check`: 46 tests in twelve files pass; 46 pages build with zero type
  diagnostics, broken internal links or build accessibility findings.
- `LD_LIBRARY_PATH=/tmp/comp4020-alsa/extracted/usr/lib/x86_64-linux-gnu pnpm check:browser`:
  all 46 pages pass at 1920×1080 and 390×844, including keyboard, menu, search,
  calculator and cold-cache checks. The report contains no page findings or
  browser JavaScript errors.
- All 259 slides across six decks pass navigation and geometry checks at
  1920×1080, 390×844, 375×667, 844×390 and 1024×768. Figure slides also pass
  axe and fit checks at the two marking viewports.
- Visual inspection covers the lecture at desktop and phone widths and the
  evidence, guard, trace, timeline, utility and handoff figures. The corrected
  [phone guards](screenshots/week-06-guards-phone.png) and
  [desktop utility table](screenshots/week-06-utility-desktop.png) are retained.
- `git diff --check` passes. This is a local content commit; no deployment or
  student-authored process statement is included.
