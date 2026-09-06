# Week 8 content review

## Sufficiency and pacing

Week 8 previously had a short outline, the original 8/2/18/72 confusion matrix
and four tutorial tasks. It now has 50 slides, expanded notes and a 180-minute
route: assets (30), signals (30), metrics (25), break (10), thresholds/costs/
prevalence (40), and state implementation/review/handoff (45). The existing
90-minute tutorial retains its 20/25/20/25 allocation, with intermediate
outputs and worked checkpoints. Previously completed tasks can be debriefed
instead of repeated. Duration is a facilitation estimate; optional extensions
add 15–20 minutes rather than new submission requirements.

Exercises trace an address/payment boundary, distinguish coded observations
from verdicts, calculate four denominators, compare a never-flag baseline,
recount a threshold, solve an error-cost tie, project a changed base rate,
replay competing review events and minimise an offline proposal. Each has an
explicit answer or debrief. Solo work is accepted throughout.

## Visuals and offline workbook

Twelve figure slides cover the asset flow, evidence/interpretation/action,
image-result limitations, confusion matrix, thresholds, cost table, projected
precision bars, review wrapper, timed replay, terminal refusal, release scope
and Week 9 handoff. Native HTML/CSS reuses the course palette and typography.
Semantic table headers and visible values carry the four-cell matrix and cost
comparison; readers do not need hover or colour to interpret them. The slides
and UI/UX skills informed the route and figure design. A chart search confirmed
that a heatmap would add little to four exact labelled cells.

The six-file download contains four new files and the unchanged Week 7 and
Week 6 modules. It uses the actual earlier constructor, classifier and reducer,
retaining the candidate/invitation versions, G1 quote and pending event record.
The CLI uses built-in Node modules and a synchronous stdout write, following
the environment workaround verified in Week 7. It performs no network call,
image search, third-party upload, payment or message delivery.

The 100 CSV rows have authored labels and arbitrary uncalibrated point scores.
M/B IDs expose the answer class; both IDs and labels are explicitly excluded
from proposed predictor features. The seven triage cards are separate coded
observations, with concrete fictional quotes and written image-result cards.
They do not generate or validate the numeric scores. Neither fixture measures
detection quality on actual people.

## Literal numerical and state checks

- Inclusive thresholds 25, 50 and 75 yield TP/FN/FP/TN of 9/1/36/54,
  8/2/18/72 and 6/4/5/85. Their flag counts are 45, 26 and 11.
- At 50, precision is 8/26, recall 8/10, false-positive rate 18/90 and
  accuracy 80/100. Never flag gives accuracy 90%, recall 0% and undefined
  precision; zero denominators return null. Missing labels are rejected.
- With false-positive cost 1, missed-case costs 5, 10 and 20 yield losses
  [41,28,25], [46,38,45] and [56,58,85] across the tested thresholds.
  Thresholds 50/75 tie at missed-case cost 6.5, both at loss 31; 25/50
  tie at 18, both at 54. Ordinary review overhead is omitted from this loss.
- Transporting recall 0.8 and false-positive rate 0.2 to prevalence 1%
  gives projected precision 8/206, about 3.88%. The 1,000-case projection
  has TP 8, FN 2, FP 198 and TN 792. This is not measured prevalence.
- Transfer, repeated-template and image-conflict observations trigger review.
  Typo, image non-match, latency and disclosed automation add no flag.
  No additional flag means neither verified safety nor clearance of old evidence.
- Assess/reply/clear ends replied/reply, while assess/decline/clear stays
  closed/reply. Assess/timeout/image non-match stays review with underlying
  pending/no-reply. Review neither resets the original clock nor sends a message.
- Resolution requires every open finding ID and a non-empty note. The clear
  trace assumes a reviewer decision; the cards alone do not prove authenticity.
  Ready plus review rejects a send record; the inherited reducer rejects a
  second opener. Decline, block and local close all keep the full closed snapshot
  unchanged against clearance, late replies and later send attempts.
- Exact serialized events are duplicates; conflicting IDs and stale new events
  are rejected. IDs cannot collide with the earlier ledger or the reserved
  review-clock/ checkpoint namespace. Input snapshots remain unchanged.
- All required release flags must be explicit Booleans. Real-contact collection,
  payments, third-party image uploads, app integration and public accusations
  each cause rejection. This checks a declaration, not arbitrary application code.

## Coherence and limits

| Connection | Concrete use |
| --- | --- |
| Week 2 → Week 8 | Recover the Platform audit's asset flows and trust boundaries before naming controls. |
| Weeks 4–6 → Week 8 | Preserve the candidate, Library invitation and G1 evidence through the actual Week 7 snapshot. |
| Week 7 → Week 8 | Wrap the existing state with review, retain replies/receipts/window results, and keep closure terminal. |
| Week 8 key concept | Compare both false positives and false negatives using literal counts, costs and declared denominators. |
| Week 8 → Week 9 | Carry versions, unresolved findings and closure into a minimal proposed public meeting; clearance is not acceptance. |
| Final project | Keep the Threat model as existing validation-appendix evidence, not a new essay or assessment. |

The implementation consumes supplied observation codes rather than classifying
free text. It does not validate reviewer judgement, fit a model or certify
identity. Threshold exploration on these rows is sensitivity analysis, with
independent unseen evaluation described as a separate future requirement.
Projected precision assumes conditional rates transfer to the new population.

Snapshots must come from the constructors/reducers; this is an in-memory
teaching ledger, not a durable queue or a hostile-snapshot validator. Duplicate
recognition uses exact JSON serialization, including property order. Derived
wait events advance the original observation window once per assessment or
resolution; no background timer or feedback loop runs. Closed takes priority
before all later event processing. A reviewer note cannot reopen it.

All twelve titles/key concepts, eleven tutorials, assessment weights, schemas
and generated API conventions remain. Alex's Friday 5–7 pm, bus and $20 facts
remain fixed, with recipient availability unknown. Lecture and tutorial stay
on 26 and 29 April 2027. The final project remains 50%, due 28 May at 5 pm.
Week 8 follows the midterm and does not retroactively add an exam task.
PROCESS.md remains the student's own account.

## Sources

Primary references checked on 6 September 2026:

- [FTC: romance scams](https://consumer.ftc.gov/articles/what-know-about-romance-scams), for fabricated identity, money requests and image-identity inconsistencies as scenarios rather than a verdict rule.
- [OWASP: threat modeling](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html), for decomposition, flows, boundaries, threats and controls.
- [Google: classification metrics](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall), for metric definitions, zero denominators and imbalance limitations.
- [Google: thresholding](https://developers.google.com/machine-learning/crash-course/classification/thresholding), for converting scores to decisions and recounting errors. The course chooses its own inclusive boundary rule.
- [scikit-learn: data leakage](https://scikit-learn.org/stable/common_pitfalls.html#data-leakage), for separating test data from model choices and information unavailable at prediction time.

The assignment brief and marking page were also rechecked. No external source
is presented as evidence for the invented numeric fixture or actual dating
outcomes. Readings and toolkit pages link the sources and all six downloads.

## Verification

`pnpm check` passes all 64 tests in fourteen files, with zero type diagnostics.
The final build produces 48 pages and eight structurally valid decks, with no
internal-link or build accessibility failures. Ten new tests cover literal
matrices/metrics, invalid inputs, cost ties, base rates, triage, inherited state,
review resolution, complete terminal snapshots, event identities and the
isolated six-file download. Changing a copied score causes the offline CLI's
literal fixture assertion to fail.

Two deliberate mutations each asserted a unique source match before editing:
changing score ≥ cutoff to > failed the original matrix test; removing the
closed guard failed the complete refused-snapshot test after clearance. Each
mutation failed the intended test, was restored in a finally block and was
followed by a passing focused ten-test run. The final full check also passes.

The focused browser audit passes all 50 slides at 1920×1080, 390×844,
375×667, 844×390 and 1024×768, including keyboard, wheel, direct links and
Esc return. Figure slides pass axe and fit checks at both marking widths.
Desktop/phone visual review includes the matrix, cost table, asset flow,
review wrapper, timed replay and prevalence bars. The lecture's arrival and
metrics sections were also inspected at both marking widths; measured document
width equals viewport width at 1920 and 390. The browser requires the existing
temporary ALSA library path and execution outside the filesystem sandbox.

The first site-wide browser pass found a desktop contrast failure in four
syntax-highlighted tokens in the tutorial's new two-line example. Rendering
those expressions as plain code text fixed the contrast without changing the
example. A direct rebuild initially hit the sandbox's socket restriction in
Astro's font server; the approved build outside that sandbox passed.

The final `pnpm check:browser` passes all 48 pages at both marking viewports,
with zero findings or browser JavaScript errors. All 359 slides across eight
decks pass the five viewport sizes and navigation checks. Menu, search,
keyboard, calculator, no-JS content and cold-cache checks also pass. The
[desktop matrix](screenshots/week-08-matrix-desktop.png) and
[phone review wrapper](screenshots/week-08-review-phone.png) are retained.

`git diff --check` passes. This is a local content commit; no deployment or
student-authored process statement is included.
