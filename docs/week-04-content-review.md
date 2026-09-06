# Week 4 content review

## Sufficiency and pacing

Week 4 previously contained a short lecture outline and a 90-minute tutorial,
with no slide deck. It did not provide a three-hour teaching route or more than
30 slides. The replacement has 50 slides and a 180-minute plan, including a
ten-minute break. Its timed blocks cover text budgets (30), tokenisation and
case evidence (45), exposure reversal (35), protocol design (25), uncertainty
(25), and report/handoff (10), plus the break.

Exercises have separate worked answers: Unicode boundaries, exact and overlapping
matches, adversarial strings, rubric evidence, a constrained bio revision,
within-zone and pooled rates, shared-weight sensitivity, protocol repair,
uncertainty calculations and the report's three claims. The notes explain how
to split explanations and practical work across the scheduled lecture,
90-minute tutorial and guided study without repeating completed exercises.
Optional extensions provide 15–25 minutes. Duration is a facilitation estimate,
not a consequence of having 50 slides.

## Visuals and reproducible examples

Eleven slides contain explanatory figures: the frozen photo beside two text
candidates, a text-processing pipeline, a code-point budget chart, indexed and
labelled token matches, pooled rates, four zone rates, audience composition,
standardised rates, a proposed allocation diagram, balanced response rates,
and a sample-size comparison of z statistics.

Figures use the existing course palette and native HTML/CSS. The picture reuses
Week 3's original fictional Alex drawing and reads its frozen metadata directly.
It adds no appearance or biography to the supplied case. The text candidates
have no observed response outcomes. Their A/B labels do not join them to either
the observational CSV or the separate independent-binomial fixture.

The five-file download includes exact texts, a standalone tokenizer, the existing
exposure CSV, the existing generated model and an executable workbook. It needs
only Node after download; a spreadsheet or another language remains accepted.
The literal worked answers include:

- Original code-point counts 80 and 101; revision 103.
- A's phrase coverage 3/14; B's 0/20; overlapping matches counted by union.
- Zone rates 30/35% and 10/15%; pooled rates 26/19%.
- North exposure shares 80/20%; shared 50/50 summaries 20/25%.
- Balanced difference 0.02, pooled rate 0.13, SE about 0.01504, z about 1.32979.
- Tenfold-count sensitivity with unchanged rates and z about 4.20517.

The tokenizer preserves original code points for the budget and explicitly
limits word segmentation to ASCII a–z/0–9 runs after lowercasing. Punctuation
and apostrophes split tokens, no stemming or stop-word removal occurs, and
zero tokens produce an undefined share. Negation, plural forms and invented
possessions demonstrate why dictionary coverage cannot certify meaning or truth.

## Coherence and methodological review

| Connection | Concrete use |
| --- | --- |
| Week 2 → Week 4 | Platform-audit denominators and allocation unknowns explain the exposure reversal and the report's population claims. |
| Week 3 → Week 4 | Both variants use A-portrait-v1, with the same bytes, crop, alt text and display treatment. |
| Week 4 topic | Text processing produces measurable features; case evidence guides revision; A/B design specifies what outcome could test the wording bundle. |
| Week 4 key concept | Cliché overflow is an exact declared counter, with overlapping-span and missed-meaning examples, rather than a personality judgement. |
| Week 4 → Week 5 | Students carry the supported bio, frozen photo and event denominators into mutual-selection probability. A positive response is not relabelled a match. |
| Report preparation | Worked corrections address all three manager claims before the unchanged Friday 19 March, 5 pm deadline. The report still does not require a finished profile. |

The protocol uses unique simulated viewers, within-zone random assignment,
complete 24-hour windows, fixed 50/50 analysis weights, a declared illustrative
three-point worthwhile effect and a fixed 500-per-arm-per-zone cap. It includes
missing-data checks and a stratified uncertainty specification. The cap is not
presented as a power calculation. The proposed trial has no outcomes; an
explicit generator and assumptions are required before any simulation.

The balanced pooled-z fixture is deliberately separate from that stratified
protocol and the observational CSV. Reweighting is descriptive, non-rejection
is not equivalence, a small point estimate does not exclude a worthwhile effect,
and statistical detection does not establish causality or external validity.
The sparse-cell threshold remains an explicit conservative course choice.

SLOP1276, Alex's fixed facts, all course titles/key concepts, dates, assessment
weights, collection schemas, API and existing data fixtures remain unchanged.

## Sources and verification

Primary readings opened on 6 September 2026:

- [MDN: String length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length), for UTF-16 code units versus code-point iteration.
- [NIST: two proportions](https://itl.nist.gov/div898/handbook/prc/section3/prc33.htm), for the pooled equal-rate normal test.
- [NIST: randomized block designs](https://www.itl.nist.gov/div898/handbook/pri/section3/pri332.htm), for randomisation within known groups.
- [NIST: variance propagation](https://www.itl.nist.gov/div898/handbook/mpc/section5/mpc55.htm), for combining independent input variances with squared weights.

`pnpm check` passes with 36 tests in ten files, 44 built pages, valid internal
links and no type errors. The new tests exercise literal Unicode and token
boundaries, the built workbook's arithmetic, an offline five-file copy and
rejection of duplicate, missing, impossible or negative exposure cells.
Temporarily replacing code-point iteration with UTF-16 length made the boundary
test fail (151 versus 150); restoration passed in the full suite.

The complete `pnpm check:browser` audit passes: 44 pages at 1920×1080 and
390×844, with no accessibility findings or browser JavaScript errors. All 159
slides across four decks pass geometry and navigation checks at 1920×1080,
390×844, 375×667, 844×390 and 1024×768. Figure slides receive additional axe,
image-loading and screenshot checks at desktop and phone widths. A/D, wheel,
arrow keys, direct links and Esc returning to the corresponding lecture pass.

Visual inspection caught a class collision in the new photo/bio figure: its
outer figure accidentally shared the inner card-grid selector, squeezing the
captions and overflowing at 375×667 and 844×390. The inner selector was renamed;
the final full audit passes. Reviewed screenshots include the corrected text
comparison at both marking widths, the token trace, zone-rate chart, allocation
diagram and phone lecture notes. Evidence is under `/tmp/partner-audit`.

The existing submission-evidence gate still requires the student's own
PROCESS.md; this content task does not replace or author that account.
