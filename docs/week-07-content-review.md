# Week 7 content review

## Sufficiency and pacing

Week 7 previously had a short outline and four tutorial tasks, with no slide
deck. It now has 50 slides and a 180-minute route: events/handoff (30), arrivals
(30), break (10), decisions (35), games (35) and state implementation/review
(40). The notes map explanations and debriefs around the existing 90-minute
tutorial; already completed exercises are reviewed rather than repeated.
Duration is a facilitation estimate. Optional extensions add 15–25 minutes.

Worked exercises repair a read-receipt inference, calculate zero/one arrivals,
challenge a homogeneous model with a mixture, solve three-option utility
thresholds and ties, change a clarification cost, trace both players' best
responses, derive mixed-strategy indifference, and replay timeout, refusal,
duplicate and exact-deadline events. These require probability, pseudocode and
explicit assumptions rather than personal disclosures.

## Visuals and reproducibility

Eleven slides include figures: event observations, zero-count rate comparison,
equal-mean mixture, utility table, two payoff matrices, a state path, phase
versus observation outcomes, a timed replay, competing late-reply histories
and the Week 8 handoff. Native HTML/CSS and the existing bar component reuse
the course palette and typography. Values, labels and table headers remain
visible without hover or colour interpretation. Negative payoffs and ties
use tables rather than misleading positive-only bars.

The five-file offline download contains three new files and two unchanged
modules. Its constructor calls Week 6's classifier on the earlier snapshot,
retains the returned evidence, and preserves candidate and invitation versions.
The generated model module supplies the established Poisson zero-count function.
The report contains six authored event traces and separate numeric fixtures.
No timer, network, messaging account or real-person experiment is used.

Literal checks include:

- λ = 0.4/hour and t = 2 give zero probability 0.4493289641, at-least-one
  probability 0.5506710359 and exactly-one probability 0.3594631713.
- A half-zero/half-0.8-per-hour mixture has the same expected count 0.8 but
  zero-count probability 0.6009482590. Its regimes are authored assumptions.
- The baseline response decision changes at q = 0.5 and 0.8, retaining both
  ties. At q = 0.75 clarification is positive but waiting wins. Cost 6 moves
  the clarify/wait crossing to q = 1; cost 4 moves it to 0.6.
- Ask strictly dominates for both players in the original matrix, with sole
  equilibrium (Ask, Ask). Changing Ask/Ask to (−1, −1) removes strict dominance
  and yields (Ask, Wait), (Wait, Ask), plus the symmetric 2/3 Ask mixture.
- A timeout followed by reply ends replied/no-reply; refusal followed by reply
  stays closed/reply. A decline counts as an inbound reply before the deadline.
- The half-open window excludes an arrival exactly at its endpoint. Both
  timeout/reply orders at that endpoint agree on replied/no-reply.
- Exact duplicate IDs are no-ops. Conflicting IDs, a distinct second send,
  old observation times and events requiring an absent opener are rejected.

## Coherence and limitations

| Connection | Concrete use |
| --- | --- |
| Weeks 4–5 → Week 7 | Supported bio/frozen photo and the Library invitation version are carried into the saved state; Alex's Friday, bus and $20 constraints and unknown recipient availability remain. |
| Week 6 → Week 7 | The constructor executes the prior classifier, keeps G1's quote, and refuses to initialise a fresh opener from stop, review, pending or respond. |
| Week 7 topic | Arrival counts, one-person decisions, two-player games and event transitions are implemented as distinct models. |
| Week 7 key concept | Latency/read-receipt strategy becomes an explicit observation clock, window, event order and terminal guard, without inferring motives. |
| Week 7 → Week 8 | The state record and closure requirements constrain the next week's evidence-based threat review. Missing telemetry or timeout alone supplies no accusation. |
| Midterm | The pack rehearses the unchanged Question 4 calculation, utility threshold and best-response working under the exam's paper/tool rules. |

λ is an assumed arrival rate, q a separate welcome-probability assumption and r
a strategy probability inside an invented game. None supplies another, and none
is fitted to an actual recipient. Payoffs do not establish real behaviour.
Admissibility precedes numerical ranking; the event reducer never calls the
optimiser and has no second-send transition.

The two-hour replay window is separate from Week 6's 48-hour aggregate fixture.
Observation expiry freezes a measurement result; conversation closure is a
different terminal decision. Declined is an intermediate state within the same
step that returns closed, with a retained reason. A local close before a full
window without a reply gives ended rather than a fabricated no-reply outcome.

Snapshots must come from the constructor/reducer; this is a small in-memory
ledger, not a durable queue, free-text interpreter or SCXML implementation.
Observed times need not be underlying event times. Duplicate suppression needs
retained state and IDs; it makes no exactly-once delivery guarantee. Ignored
events remain in the outer replay report, while a closed snapshot stays fixed.
Week 8's threat detector and review/resume workflow are not implemented here.

All twelve titles/key concepts, fixed case facts, existing dates, eleven
tutorials, assessment weights, collection schemas and generated API remain.
The lecture stays on 19 April, tutorial on 22 April and midterm on 23 April
2027, 11 am–12.30 pm. PROCESS.md remains the student's own account.

## Sources

Primary references checked on 6 September 2026:

- [SciPy: Poisson distribution](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.poisson.html), for the count PMF and zero-mean case.
- [MIT: probability notes](https://ocw.mit.edu/courses/6-041-probabilistic-systems-analysis-and-applied-probability-spring-2006/8c03011e0c589bdc9c302dd6d49df162_chapter4.pdf), §§4-5–4-6, for the homogeneous process and independent increments. The actual section headings were checked and an initial incorrect §4.2 reference corrected before verification.
- [MIT: game-theory recitation](https://ocw.mit.edu/courses/14-75-political-economy-and-economic-development-fall-2012/bf65c969a9bfd655e50589ba7283cda8_MIT14_75F12_Recitation8.pdf), slides 11–16, for best responses, Nash equilibrium and mixed-strategy indifference.
- [W3C: SCXML basic concepts](https://www.w3.org/TR/scxml/#Basic), for states, events, conditions and specified transition precedence; the course reducer supplies its own window and closure rules.

The assignment brief and marking page were also rechecked. These references
support methods and notation, not dating-effect claims. The slides and UI/UX
skills informed the teaching route, visible labels and responsive figures;
the existing design system was retained.

## Verification

`pnpm check` passes 54 tests in thirteen files and builds 47 pages, with no
type diagnostics, internal-link failures or build accessibility findings.
Eight new tests cover the earlier-classifier handoff, receipt semantics,
terminal refusal, exact deadlines, duplicate/conflicting events, utilities,
both players' payoffs and the five-file download in an independent temporary
directory. An initial JavaScript parameter-inference error was fixed with
an explicit JSDoc option type; runtime invalid-input testing remains.

Two asserted single-match mutations were caught: removing the closed guard
changed a refused conversation to replied, and changing expiry ≥ to > counted
an endpoint reply inside the window. Both changes were restored in a finally
block. The restored function tests pass.

The focused offline rerun exposed intermittent empty console output. A small
Node v24.18.1 subprocess probe reproduced empty output even for a short console
message, while a synchronous stdout write was captured. The Week 7 report now
writes its complete JSON synchronously. After rebuilding, twenty consecutive
captured executions each parsed successfully with 10,796 characters. This is
an observed workaround for this environment, not a claim about all Node hosts.

The targeted browser audit passes all 50 Week 7 slides at 1920×1080, 390×844,
375×667, 844×390 and 1024×768, including navigation and figure accessibility.
Visual inspection covers the lecture at both marking widths, the changed
payoff matrix, utility table, state path, observation outcomes and replay table.

The final site-wide `pnpm check:browser` run (using the existing temporary ALSA
library path) passes all 47 pages at both marking viewports, with no page
findings or browser JavaScript errors. It also passes all 309 slides across
seven decks at the five viewport sizes, plus keyboard, menu, search, calculator
and cold-cache checks. Figure slides pass axe and fit checks at desktop/phone
widths. The [phone observation figure](screenshots/week-07-observation-phone.png)
and [desktop changed game](screenshots/week-07-game-desktop.png) are retained.

`git diff --check` passes. This is a local content commit, with no deployment
or student-authored process statement included.
