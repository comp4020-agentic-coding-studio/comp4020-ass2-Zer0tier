# Week 9 content review

## Sufficiency and pacing

Week 9 previously had a short outline and four tutorial tasks, including the
original $14.60/96-minute contingency example. It now has 50 slides, expanded
notes and a 180-minute route: venue/route constraints (35), costs and agreement
(30), break (10), independent outcomes (35), dependence/sensitivity (35), and
implementation/handoff (35). The tutorial retains its 20/20/30/20 allocation,
with intermediate outputs and literal checkpoints. Completed tasks can be
debriefed instead of repeated. Duration is a facilitation estimate; optional
extensions add 15–20 minutes without adding an assessment.

Worked exercises repair a venue's opening mismatch, show why that repair still
fails return time and budget, change a preference weight, calculate both cost
contributions, invalidate agreement after revision, enumerate four outcomes,
distinguish a working target from a hard window, change dependence, derive
joint-probability bounds and reject a failed fallback. Each has a debrief.
Solo implementation and review remain accepted.

## Visuals and reproducibility

Thirteen figure slides show the old/new proposal bridge, complete itinerary,
hard-filter results, preference weights, cost sharing, minimal proposal fields,
two-actor confirmation path, probability branches, outcome table, target versus
hard limit, changed joint cells, tail comparison and Week 10 handoff.
Native HTML/CSS and the existing bar component retain the course palette and
typography. Tables use visible row/column labels; values do not depend on
colour or hover. The slides and UI/UX skills informed the route and figures.
A focused chart search supported direct category/value labels for the tail
comparison; exact joint cells remain in semantic tables.

The ten-file offline download adds three new files and uses seven unchanged
dependencies. The report recalculates the Week 5 Library result with its actual
feasibility function, constructs the prior conversation with Week 6/7 logic,
and replays Week 8's review using its real reducer and authored evidence card.
The clear branch assumes a reviewer decision rather than asserting identity
proof. Candidate/invitation references and G1's quote remain attached.

Library stays a 100-minute/$14 proposal. Atrium is a new 90-minute/$14 version,
with a checked Annex alternative. The CLI checks that the numerical baseline
agrees with the Atrium route and cost before calculating contingencies. This
avoids silently replacing the earlier fixture's duration. It cross-checks the
existing generated dateLogistics reference module as well as literal values.

All venue observations, access requirements, prices, times, preferences,
probabilities and event records are authored. The exercise states the access
requirement explicitly: a continuous step-free route from bus stop to table
and exit. The exit must not depend on the counterpart's transport or permission.
These are scenario constraints, not a diagnosis or claims about a real venue.
No booking, real-recipient interaction, payment or location tracking occurs.

## Literal checks and important distinctions

- Atrium uses 20 + 50 + 20 = 90 minutes, departing 17:00 and returning 18:30.
  Loft fails public/exit; Gallery fails opening/time/budget; Annex passes at
  $20 exactly. Unknown required observations fail; scores cannot rescue a
  rejected venue. All failures remain visible.
- With quiet weight 3 and lighting weight 1, Atrium scores 15 and Annex 14.
  Equal weights reverse the order, 7 versus 8. Quiet weight 2 gives a tie at
  11. Weights are planning assumptions, not new Alex preferences.
- Cover-both gives Alex $14, including round-trip transport. Split-drinks
  gives Alex $8 and a $6 counterpart drink contribution. Counterpart transport
  is unknown, not zero. Numerical contributions do not establish agreement.
- Independent joint probabilities are 0.675, 0.075, 0.225, 0.025 in on/open,
  on/closed, late/open, late/closed order. Costs are $14/$20/$14/$20 and
  durations 90/100/110/120 minutes. Means are $14.60 and 96 minutes.
- Strict >110-minute probability is 2.5%; neither hard >120-minute nor >$20
  exceedance occurs in the supplied baseline. Targets 109, 110 and 120 have
  tails 25%, 2.5% and 0%. Equality is allowed at the hard limits.
- Conditional closure rates 0.4 when late and 0 when on time give joint
  probabilities 0.75/0/0.15/0.10. Marginal closure remains 0.10 and means
  remain $14.60/96 minutes, while the >110-minute tail rises to 10%.
- Fixed marginals allow joint late/closed probability q from 0 to 0.10.
  Conditional rates are q/0.25 and (0.10 − q)/0.75. Independence sits at
  q = 0.025. This is a binary-model bound, not a real-world risk interval.
- Deliberately changing base duration to 100 yields a 106-minute mean and
  a 25% >110-minute tail. Changing base cost to $8 gives $8.60 expected cost
  only under the explicit assumption that Alex still bears the $6 surcharge.
- Genuine unheld replied Week 8 snapshots can initialise a draft. Pending,
  held and closed records cannot. The proposal schema rejects extra fields,
  stale prior-invitation references, invalid dates and unsuitable alternatives.
- Proposal plus one confirmation remains proposed; two distinct actors naming
  the current version give confirmed. Revision keeps the old plan in history,
  clears both confirmations and rejects old-version confirmations.
- Fresh review updates clear agreement. Before the confirmation deadline,
  an open finding gives review and a clear update gives draft. The proposal
  must then be recorded and confirmed again. A closed upstream state cancels.
- Cancelled and expired snapshots are terminal. Final confirmation at 16:29
  is within the window, while 16:30 is late. Exact serialized duplicates are
  no-ops; conflicting IDs, repeated actors and stale new events fail.
- Only currently confirmed unheld plans can be exported for Week 10. The
  export records agreement to the specific proposal and costs, not arrival,
  continuing agreement or permission for any other activity.

## Coherence and limits

| Connection | Concrete use |
| --- | --- |
| Week 5 → Week 9 | Recalculate the original venue arithmetic, retain the Library version, and use its feasibility function for new route/cost checks. |
| Weeks 6–8 → Week 9 | Consume the actual evidence/state functions, exclude held or closed starts, and invalidate agreement when a new review arrives. |
| Week 9 key concept | Reduce avoidable ambiguity through minimal fields, proposed costs, confirmation points, versions and a cancel branch. |
| Week 9 numerical contract | Preserve the original mean/tail result, then show exactly which dependence assumption changes the tail. |
| Week 9 → Week 10 | Export the current version and explicit cost agreement for the bill discussion; preserve the ability to end the interaction. |
| Final project | Keep the Offline handover plan as linked validation-appendix evidence, not a new essay or assessment. |

The four-state logistics model assumes additive delays/costs and a usable
alternative; it omits a second closure and further disruptions. Numeric
fallback consequences do not automatically change the agreed venue. A changed
plan needs new checks and explicit agreement; infeasible options can be cancelled.
Marginal means are insufficient to identify the joint exceedance event.

The protocol consumes supplied actor/version events, not free-text consent
inference. It uses a separate minutes-since-midnight clock for the proposal day,
not the earlier opener's hours. There is no background timer, durable queue,
booking API or payment system. Snapshots must come from the constructors and
reducers; arbitrary hostile snapshots are outside the validator's scope.
Exact JSON serialization defines duplicates, including property order. Retained
state is necessary; a local record makes no delivery or safety guarantee.

All twelve titles/key concepts, eleven tutorials, assessment weights, schemas,
API conventions and fixed Alex facts remain. The lecture and tutorial stay on
3 and 6 May 2027. The authored proposal uses Friday 7 May; the final project
remains 50%, due 28 May at 5 pm. PROCESS.md remains the student's own account.

## Sources

Primary sources checked on 6 September 2026:

- [eSafety: online dating](https://www.esafety.gov.au/key-topics/staying-safe/online-dating), specifically preparing before meeting, choosing whether/when to meet, and sharing plans with a trusted person where possible. Public setting, route access and the exact venue checklist are declared course controls, not attributed as a verbatim eSafety checklist.
- [MacEwan: conditional probability and independence](https://openbooks.macewan.ca/introstats/chapter/3-5-conditional-probability-and-independence/), for conditional probabilities and the multiplication rule. The four-cell consequences and all numerical inputs are authored.

The assignment brief and marking environment were rechecked. A Penn State
lesson URL returned an error; the working primary university probability text
above was used instead. No inaccessible page is presented as supporting evidence.
Readings and toolkit pages link the completed workbook and sources.

## Verification

The final `pnpm check` passes 74 tests in fifteen files with zero type errors,
warnings or hints. The build emits 49 pages and nine structurally valid decks,
with no broken internal links or build accessibility findings. Ten new tests
cover costs, hard filters, minimal fields, exact probabilities, sensitivity,
inherited review state, two-actor agreement, revision, terminal events and the
ten-file download run from an independent temporary directory. A changed
baseline in the copied fixture causes the CLI to fail.

Two deliberate single-match mutations were caught: changing > to ≥ increased
the strict 110-minute tail and failed its literal test; accepting one actor
instead of two failed proposed/proposed/confirmed. Each source edit was checked
for exactly one match, restored in a finally block and followed by a passing
focused ten-test run. The final full check also passes.

The targeted browser audit passes all 50 Week 9 slides at 1920×1080, 390×844,
375×667, 844×390 and 1024×768, including navigation, direct links and Esc return.
Figure slides pass axe and fit checks at both marking widths. Visual review
includes the itinerary, independent/dependent tables, costs, confirmation path
and lecture arrival/probability sections. Document width equals viewport width
at both 1920 and 390. The existing temporary ALSA path and execution outside
the sandbox are required for Chromium.

The final `pnpm check:browser` passes all 49 pages at both marking viewports,
with zero findings and browser JavaScript errors. All 409 slides across nine
decks pass the five viewport sizes and navigation checks. Menu, search,
keyboard, calculator, no-JS content and cold-cache checks also pass. The
[desktop itinerary](screenshots/week-09-route-desktop.png) and
[phone dependence table](screenshots/week-09-dependence-phone.png) are retained.

`git diff --check` passes. This is a local content commit, with no deployment
or student-authored process statement included.
