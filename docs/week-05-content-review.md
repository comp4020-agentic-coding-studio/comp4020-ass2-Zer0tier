# Week 5 content review

## Sufficiency and pacing

Week 5 previously supplied a short lecture outline, four tutorial tasks and no
deck. The replacement has 50 slides and a 180-minute route: joint events (30),
repeated opportunities (35), break (10), feasibility and caps (35), peak exposure
(35), and benchmark/handoff (35). The notes explain how to distribute this pack
across explanations, the existing 90-minute tutorial and guided study without
repeating completed exercises. Duration remains a facilitation estimate.

Separate exercises and worked answers cover conditional direction, union and
intersection, a zero conditioning denominator, independent complements, endpoint
cases, an explicit dependence counterexample, bus itineraries, exact time and
cost boundaries, a misleading Sunday headline, a simulation-only protocol,
conservative ranking and a reproducibility review. Optional seeded-simulation
and reserve-rule extensions provide another 15–25 minutes.

## Visuals and reproducible examples

Eleven slides contain explanatory figures: a conditional tree, 100-pair grid,
binomial count categories, dependence comparison, sensitivity comparison,
whole-outing itinerary, time and cost charts, Sunday counts, Sunday rates and
the separate probability/quality outputs. Native HTML/CSS reuses the established
pink/blue palette, with labelled values and text summaries. No new photo or
biographical detail was needed.

The five-file workbook runs offline with Node, independently of the website.
Three new files contain authored cases, probability/constraint functions and
the calculation log. The other two are the existing generated scorer and the
unchanged 99 controls. Spreadsheet and alternative-language solutions remain
accepted. Literal answers include:

- Pair-table joint 0.06, marginal P(B) = 0.13, conditional P(B | A) = 0.20,
  and reverse conditional 6/13. Marginal multiplication would give 0.039.
- Twenty equal independent opportunities: expected count 1.2, zero probability
  0.290106241131, and at-least-one probability 0.709893758869.
- A single shared draw: the same marginal probabilities and expectation, but
  at-least-one probability 0.06. Ten independent probabilities of 0.02 and ten
  of 0.10 retain the mean but give at-least-one probability 0.715104328246.
- Library 100 minutes/$14 passes; Arcade 130 minutes/$16 fails time; Riverside
  90 minutes/$22 fails budget. Exact 120-minute/$20 boundaries pass.
- Sunday 8/40 = 20%, Tuesday 3/10 = 30%; count ratio 8/3, exposure ratio 4,
  Sunday-minus-Tuesday difference −10 percentage points and rate ratio 2/3.
- Rubric score 93.75 ranks 2/100; score 100 ranks 1/100. A tie counts against
  the candidate and no score-to-match-probability conversion exists.

## Coherence and assumptions

| Connection | Concrete use |
| --- | --- |
| Week 2 → Week 5 | The platform audit supplies exposure definitions and allocation unknowns for the pair, cap and Sunday comparisons. |
| Week 4 → Week 5 | The supported candidate and frozen A-portrait-v1 remain inputs. A bio positive response is not relabelled a mutual match. |
| Week 5 topic | Conditional selection, repeated-event distributions and feasibility predicates implement the mathematics of a match. |
| Week 5 key concept | The original Sunday 8/40 and Tuesday 3/10 fixture now has separate count/rate figures, worked headline repair and a proposed time comparison. |
| Week 5 → Week 6 | The checked Library invitation and supported bio enter the existing message tree; recipient availability remains unknown and prior refusal is terminal. |
| Week 5 → Weeks 9/11 | Deterministic travel checks prepare for later logistics uncertainty. The versioned primary objective and conservative rank prepare the frozen baseline for shifted evaluation. |

Each authored scenario has an explicit scope and is separate from the Week 4
outcomes, market census and other Week 5 cases. Both decisions are supplied in
the pair table, including when A is no; the notes identify this as information
an actual app log might not expose. The repeated model generates new eligible
opportunities rather than sampling the table without replacement.

Independence within a pair and mutual independence across match indicators are
different assumptions. Expectation does not require the latter, while the
product of complements does. Sensitivity inputs are scenarios, not interval
bounds. Missing outcomes and zero denominators are not silently counted as
negative outcomes. Counts, rates, probability, quality score and benchmark rank
retain separate names and meanings.

The Sunday protocol is a simulation-only proposal with no trial outcomes. Its
400-pair cap is an exercise choice, not a power calculation; its generator,
time mechanism, seed and uncertainty method must be supplied before execution.
The invented routes establish only Alex's deterministic feasibility and do not
establish recipient agreement or a reliability probability. The control
generator's designed ceiling remains explicit.

SLOP1276, all twelve titles and key concepts, eleven tutorials, teaching dates,
assessment weights, the case facts, collection schemas and generated API
plumbing remain unchanged. PROCESS.md remains the student's own account.

## Sources

Primary sources opened on 6 September 2026:

- [MIT: Mathematics for Computer Science](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/mit6_042js15_textbook.pdf), §17.4 for conditional products, §17.7–17.8 for independence, and §18.5 for linearity of expectation.
- [NIST: binomial distribution](https://www.itl.nist.gov/div898/handbook/eda/section3/eda366i.htm), for fixed-p count probabilities and the mean.

These sources support mathematical methods, not the authored probabilities,
venue prices or a dating recommendation. The assignment brief and assessment
requirements were also checked. The slides skill supplied the teaching-deck
workflow. Two UI/UX chart searches returned unsuitable radar/waterfall matches;
the implementation retained the existing labelled bar component and used
general accessibility guidance rather than adopting those chart suggestions.

## Verification

The initial `pnpm check` passed all 40 tests in eleven files, with 45 built
pages, valid links and no type errors. Four new tests cover directional
denominators, independent probability endpoints and numerical stability, full
travel/cost boundaries, undefined rates and a five-file offline copy. The
offline test also rejects duplicated IDs and a missing comparator row.

A temporary mutation replaced the strict time-overrun check with an inclusive
one. The literal test failed because a 120-minute outing was incorrectly
rejected. Restoring the implementation returned all four workbook tests to
green. This checks a boundary rather than repeating the implementation's rule.

The first full browser audit passed all 209 slides across five decks at
1920×1080, 390×844, 375×667, 844×390 and 1024×768. Its page audit found a
low-contrast syntax colour in the new lecture's small JavaScript example at
both marking widths. The example was switched to the existing plain code
presentation, preserving the runnable text.

After that correction, the final `pnpm check` passes all 40 tests, and the
complete `pnpm check:browser` audit passes: 45 pages at 1920×1080 and 390×844,
zero recorded accessibility/target findings or browser JavaScript errors, and
all 209 slides at the five viewport sizes above. Figure slides also receive
axe and geometry checks. A/D, arrows, wheel, direct links and Esc returning to
the corresponding lecture pass across all five decks. The final report is
under `/tmp/partner-audit/report.json`.

Visual review covered the conditional tree, 100-pair grid, itinerary,
probability/quality comparison and the lecture page at both marking widths,
plus the phone sensitivity chart. The saved examples show the
[phone conditional tree](screenshots/week-05-tree-phone.png) and
[desktop itinerary](screenshots/week-05-itinerary-desktop.png).

Chromium initially lacked libasound; the library was extracted into a temporary
directory for the local audit, without a project dependency change. A separate
screenshot command needed execution outside the sandbox after Chromium's
launch was blocked. These checks describe local builds, not a deployment.
The unchanged submission-evidence template still requires the student's own
PROCESS.md account; this content task does not author that account.
