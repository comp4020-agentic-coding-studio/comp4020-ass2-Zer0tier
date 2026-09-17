---
title: "Natural Language Processing in Profile Bios"
description: "Tokenise clichés, hold the photo constant and A/B test fictional bios. Explain why a pooled winner can lose in both exposure groups."
week: 4
date: 2027-03-15
teachers: [casimir-beng]
keyConcept: "Avoiding string redundancy and cliché overflow"
slides: /decks/week-04/
related: [sessions/04-bio-experiment]
---

## Alex's story · The winning bio loses twice

*Fictional course story · Week 4.*

Alex arrives with the frozen portrait and two fictional bio drafts. A separate synthetic exposure dashboard announces “Bio A wins.” Open the zone rows and B leads in both. These counts do not measure Alex's drafts, but the tempting mistake is already on the whiteboard: choose the winning letter and claim the rewrite worked. Alex's experiment needs a better specification than that.

**Investigate this week:** Audit the text against Alex's facts, then explain the pooled reversal. What must a follow-up experiment hold fixed and randomise?

## From strings to a testable comparison

Open [The Experiment That Lied](/experiment-that-lied/) to inspect the dashboard in stages and record a conclusion. Save its evidence note for your Bio experiment protocol; [Release Day](/release-day/) will revisit that same note in Week 12. Use it within Thursday’s existing reversal and protocol blocks. It is exploratory practice, separate from the tutorial quiz.

A profile bio is small enough to inspect and large enough to contain several unsupported claims. This week builds a transparent NLP baseline, audits two fictional texts and asks what an A/B comparison could actually establish. The engineering output is a **Bio experiment protocol**, supported by token traces, case evidence and reproducible calculations.

[Open the 50-slide teaching deck](/decks/week-04/). It opens with slide content alone: **A/D** or the scroll wheel changes pages; **Esc** returns here.

By the end, you should be able to implement a declared text budget and phrase matcher, revise a bio without changing Alex's facts, reproduce the exposure reversal, and distinguish an observed difference from a causal or practical conclusion.

## Scheduled teaching and independent work

### 60-minute lecture

Monday, **11 am–12 pm**. Use only these selections from the [complete deck](/decks/week-04/), in order. The timings include explanation, brief working and questions; full exercise timers elsewhere belong to the complete resource route.

| Lecture time | Slides | Focus |
| --- | --- | --- |
| 0–10 min | 4–6, 9 | Freeze Alex’s case and image, inspect both texts and declare the code-point budget. |
| 10–25 min | 12–13, 16–17, 21 | Demonstrate token coverage, its failure cases and an evidence-supported revision. |
| 25–40 min | 23–26, 29 | Reproduce the pooled reversal and explain its unequal exposure weights. |
| 40–55 min | 33, 35, 39–40, 42 | Connect allocation and outcome definitions to the separate balanced-fixture z calculation. |
| 55–60 min | 48–50 | Repair the report’s conclusions and identify what Thursday must verify. |

### 90-minute tutorial

Thursday, **2–3.30 pm**. Follow the [Week 4 tutorial](/sessions/04-bio-experiment/): **20 minutes text pipeline and revision; 25 minutes reversal; 20 minutes uncertainty; 25 minutes protocol, report and quiz**. The last block includes ten minutes for the interactive quiz and its debrief. These four blocks fill the whole session. Bring lecture working for checking and refinement; complete each exercise once. Solo work and review are accepted.

### Independent work · about 210 minutes

- **30 minutes — before Monday:** Reopen the Platform audit and Photo asset manifest; read the two authored bios and the declared tokenizer rules.
- **90 minutes — between Monday and Thursday:** Work through the remaining explanations, especially standardisation (slides 30–32), stopping (36) and uncertainty limits (44–46). Open the five-file workbook and draft the report before Thursday; bring unresolved calculations to the tutorial.
- **90 minutes — consolidation and assessment:** Use the tutorial feedback to finish the Bio experiment protocol and data report. Reserve this time before the Friday 19 March, 5 pm report deadline.

Together this is about **six hours: 60 + 90 + 210 minutes**. Slides and full-length exercises outside the lecture selection are independent study unless assigned in the tutorial’s four blocks. Use the worked answers to check an attempt; optional extensions can use consolidation time. The complete route below reuses this material and adds no scheduled meeting or extra three-hour study requirement.

<span id="a-180-minute-teaching-route"></span>

## Complete teaching pack

The full **50-slide pack** and all worked notes remain the complete resource. This **180-minute reference route includes a ten-minute break** for someone facilitating the whole pack in one sitting. It is separate from the scheduled selections above: the break slide is skipped in the 60-minute lecture and the tutorial keeps its own 90-minute plan. These are facilitation estimates, including practical work and debriefs.

| Elapsed time | Slides | Activity and evidence produced |
| --- | --- | --- |
| 0–30 min | 1–11 | Set the case and image controls; inspect both texts; run a six-minute Unicode boundary exercise and explain the answers. |
| 30–75 min | 12–21 | Trace the tokenizer and overlapping matches; break the metric; attach rubric evidence; write and count a revision. Exercises take 6, 4, 5 and 6 minutes, with implementation and debriefs between them. |
| 75–85 min | 22 | Break. |
| 85–120 min | 23–32 | Inspect the four exposure rows; reproduce the reversal in seven minutes; explain weights; reweight to a shared target in five minutes and debrief. |
| 120–145 min | 33–38 | Specify allocation, unit, outcome and stopping; repair a broken protocol in seven minutes and compare solutions. |
| 145–170 min | 39–46 | Work through the balanced fixture, units and pooled z; audit the calculation in six minutes; compare larger and sparse fixtures. |
| 170–180 min | 47–50 | Correct the report's three claims in five minutes; debrief and hand the supported candidate to Week 5. |

Optional extensions below can use 15–25 minutes of independent consolidation time.

## Freeze the case before optimising the sentence

Alex is a fictional adult CS student who likes board games and terrible puns, is free **Friday 5–7 pm**, travels by **bus**, has **$20 total** for an outing and wants to meet someone with the possibility of a relationship. These [case facts and rating anchors](/toolkit/#benchmark) remain fixed. There is no supplied dog, car, favourite café or hiking history.

Use Week 2's platform audit to distinguish an input from an observed outcome and an unknown allocation rule. Use Week 3's [photo manifest](/data/week-03/manifest.json) to keep **A-portrait-v1** identical across variants: file bytes, crop, alt text and display treatment. The picture below is the same course-drawn fictional asset, not a photograph or an extra biographical fact.

![Teaching illustration of fictional Alex, labelled on a blue top, behind a table with three game tiles.](/data/week-03/photo-a-crop.svg)

Our authored text candidates are:

- **A:** “Looking for a partner in crime. Board games, bad puns, and maybe a relationship.”
- **B:** “Board games or bad puns? Friday 5-7 pm works. Let's meet, with a relationship possible. Fine to pass.”

The surrounding quotation marks are not part of the stored texts. The [JSON download](/data/week-04-bios.json) preserves the exact punctuation. Neither wording has measured response outcomes. Their A/B labels do **not** identify the unknown wordings behind the exposure CSV or the separate balanced fixture.

## Count the original text, then tokenise a copy

The lab ceiling is **150 Unicode code points**, including spaces and punctuation. This is a course convention, not a current platform limit. Count the stored string before any trimming, lowercasing or normalisation. In JavaScript, `[...text].length` counts code points; `text.length` counts UTF-16 code units. A visible character may contain multiple code points. See [MDN's string-length documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length).

**Boundary exercise:** count 150 ASCII letters and then append a space. Compare `"\u{1F600}"`, `"\u00E9"` and `"e\u0301"` using both approaches. Finally try an empty string.

**Answers:** 150 passes, 151 fails. U+1F600 is one code point but two UTF-16 units. The precomposed accented form has one code point; the letter-plus-combining-mark form has two under our no-normalisation convention. An empty string meets the ceiling but provides no clarity evidence.

Our toy tokenizer deliberately supports the supplied English exercises:

1. Lowercase a copy of the text.
2. Extract maximal runs matching `[a-z0-9]+`. Other characters, including punctuation, apostrophes and hyphens, separate tokens.
3. Retain all tokens: no stemming or stop-word removal. Thus “Let's” becomes `let`, `s`, and “5-7” becomes `5`, `7`.
4. Search for exact token sequences in the declared dictionary: “must love dogs” and “partner in crime.” Match dictionary phrases using the same tokenizer.
5. Take the **union of covered token positions** and divide its size by the number of tokens. If there are no tokens, return an undefined share (`null` in the workbook).

The ASCII rule is transparent, not language-neutral. It discards non-ASCII letters and cannot serve as a general multilingual tokenizer. A different language scope needs a versioned pipeline and new fixtures; it does not justify silently changing today's denominator.

### A trace with literal answers

“Looking for a partner in crime” becomes six tokens: `looking`, `for`, `a`, `partner`, `in`, `crime`. Zero-based positions **3, 4, 5** match, so coverage is **3/6 = 50%**.

“Must love dogs; partner-in-crime.” produces six tokens and covers all six. If the dictionary contains both “partner in crime” and “in crime,” the three-token input still covers **3/3**, not 5/3. Each position counts once.

| Authored candidate | Code points | Tokens | Covered tokens | Share |
| --- | --- | --- | --- | --- |
| A | 80 | 14 | 3 | 3/14 ≈ 21.4% |
| B | 101 | 20 | 0 | 0/20 = 0% |

**Break the metric:** “No partner in crime; I prefer board games” still matches despite negation. “Looking for partners in crime” misses the exact singular phrase. “I own three dogs and a sports car” has no dictionary match but invents Alex's possessions. Cliché coverage does not measure truth, personality, originality or compatibility.

## Key concept: string redundancy and cliché overflow

Removing clichés is useful only when the replacement communicates supported information. Attach a quote and a reason to each of the toolkit's four feature ratings. The following is a worked reading, not a representative panel's measurement.

| Feature | A: evidence and suggested anchor | B: evidence and suggested anchor |
| --- | --- | --- |
| Clarity | “Looking for…” and “maybe a relationship”: explicit, case-supported intent, **4**. | “Let's meet, with a relationship possible”: explicit, supported intent, **4**. |
| Specificity | “Board games, bad puns”: concrete case details, **4**. | “Board games or bad puns?”: concrete case details, **4**. |
| Feasibility | No concrete meeting invitation or logistics: absent, **0**. | “Friday 5-7 pm”: usable time, but bus and budget missing, **3**. |
| Exit | No wording explicitly allowing a pass: absent, **0**. | “Fine to pass”: explicit permission not to engage, **4**. |

Disagreement is resolved through the anchors and evidence, not by selecting the vector that wins the benchmark. A contradiction fails case fidelity regardless of its numerical rating. The exit feature assesses words; it predicts no person's feelings or behaviour.

**Revision exercise:** add the missing constraints within the budget, preserving the originals. One possible answer is:

> Board games, bad puns, maybe a relationship? Meet Friday 5-7 pm: bus-friendly, $20 total. Fine to pass.

This is **103 code points**. It declares a bus and budget constraint without inventing a venue or claiming a journey has been checked. A concrete venue would still need a feasibility audit. Several text features changed, so a future comparison would estimate the effect of the **whole wording bundle**, not “the effect of saying Friday.”

## The pooled winner loses both zones

The supplied [bio-exposures.csv](/data/bio-exposures.csv) is an **invented observational fixture**, separate from the authored texts. An exposure contributes at most one binary positive response. The file records no actual wording, viewer IDs or randomisation log. A positive response is not automatically a reciprocal match.

| Zone | A positives / exposures | B positives / exposures | B − A |
| --- | --- | --- | --- |
| North | 24/80 = 30% | 7/20 = 35% | +5 percentage points |
| South | 2/20 = 10% | 12/80 = 15% | +5 percentage points |
| Pooled | 26/100 = 26% | 19/100 = 19% | −7 percentage points |

Check non-negative integer counts, positive exposure denominators, positives no greater than exposures, unique zone/variant cells and both variants in both zones. Then reproduce every entry before looking at the chart in the slides.

The pooled rates use different weights:

```text
A = 0.8 × 30% + 0.2 × 10% = 26%
B = 0.2 × 35% + 0.8 × 15% = 19%
```

A receives 80% of its exposures in North; B receives 20%. North has the higher observed response rate for both variants. Equal total exposures do not make the audience mixes comparable. This constructed aggregation reversal is often called Simpson's paradox.

**Sensitivity exercise:** declare a hypothetical 50% North / 50% South target. Reweight the existing zone rates:

```text
A = 0.5 × 30% + 0.5 × 10% = 20%
B = 0.5 × 35% + 0.5 × 15% = 25%
```

The standardised difference is **+5 points**, a descriptive summary under the chosen target. It is neither a new observation nor proof of a bio effect. Unknown selection within zones remains possible; arithmetic cannot recover randomisation that was never recorded.

## A proposed synthetic experiment protocol

[NIST's randomized-block design guidance](https://www.itl.nist.gov/div898/handbook/pri/section3/pri332.htm) motivates randomising within groups when a known grouping variable matters. Our following design is a classroom proposal, with **no trial outcomes yet**. It does not authorise experiments on real app users.

| Field | Example prespecification |
| --- | --- |
| Question | Does switching from frozen text A to frozen text B change the simulated positive-response probability under a declared 50/50 zone target? |
| Unit | One unique simulated viewer, assigned once. A repeated view retains its assignment and adds no new denominator row. |
| Allocation | Within each zone, randomly shuffle a list with 500 A and 500 B labels, then assign it to 1,000 unique viewer IDs. Record the method, seed and assignment log. |
| Controls | Same fictional case and A-portrait-v1 bytes, crop, alt text and display treatment; fixed text versions; same outcome rule and observation window. |
| Primary outcome | Binary positive within 24 simulated hours of first exposure. Every assigned viewer belongs in the denominator. A complete window with no positive is 0. |
| Data integrity | Require unique assignments, complete windows and valid binary outcomes. Missing observations are not silently coded 0. This classroom run stops for repair if any required record is missing or inconsistent. |
| Primary estimate | Calculate B − A within each zone, then average those two differences with fixed 50/50 weights. Retain the zone counts. |
| Worthwhile effect | Illustrative minimum **+3 percentage points** for B; a teaching decision threshold, not a dating research result. |
| Stopping rule | Allocate exactly 500 viewers per arm per zone, then finish all observation windows. Analyse once after the data check. Do not keep adding trials until a preferred result appears. |
| Uncertainty plan | Prespecify the independent-binomial approximation below for the stratified estimate. Report its interval and assumptions; withhold it for sparse or invalid cells. The separate pooled-z calculator below is not a substitute. |

The 2,000-viewer cap is an exercise parameter, **not a power calculation or guarantee** of detecting three points. A simulation's generator, assumed probabilities and seed would also need to be specified before running it. The existing CSV cannot supply missing individual assignments.

For the proposed analysis, let each cell rate be p̂ = positives/exposures and estimate its variance as v = p̂(1 − p̂)/n. Assuming independent binary outcomes with stable probabilities within each zone/variant cell, our weighted difference has estimated standard error:

```text
delta = 0.5 × (pBN − pAN) + 0.5 × (pBS − pAS)
SE = sqrt(0.25 × (vBN + vAN + vBS + vAS))
approximate 95% interval = delta ± 1.96 × SE
```

The squared weights follow [variance propagation for independent inputs](https://www.itl.nist.gov/div898/handbook/mpc/section5/mpc55.htm); the Bernoulli cell model and normal interval are explicit classroom analysis choices. Require at least ten positives and ten negatives in **each** cell before using this approximation. Otherwise report the cell counts and withhold this interval pending a suitable analysis. Read its bounds against zero and the declared +0.03 threshold; do not announce a worthwhile gain merely because the point estimate exceeds +0.03. No interval can be calculated for this protocol until outcomes exist.

**Repair exercise:** “A on Monday with photo A, B on Sunday with photo B; check until B wins.” It changes time and image, confounds allocation and moves the stop. A repaired design uses the fixed inputs and within-zone random assignment above, one outcome definition, complete windows and the fixed cap. Preserve the protocol before seeing any generated outcomes.

## Work through the separate balanced fixture

Now use **A = 120/1,000 and B = 140/1,000**, invented for independent-binomial arithmetic. These are not totals from the CSV, measurements of our sentences or outcomes of the proposed stratified trial.

The rates are 12% and 14%. **B − A = 0.02**, or two percentage points. Relative to A, the change is **0.02/0.12 ≈ 16.7%**. Keep the baseline and units beside the result.

For the [NIST two-proportion normal test](https://itl.nist.gov/div898/handbook/prc/section3/prc33.htm), use an equal-rate null and the pooled rate. Our sign convention is B minus A:

```text
H0: pA = pB
pooled rate = (120 + 140) / (1000 + 1000) = 0.13
SE0 = sqrt(0.13 × 0.87 × (1/1000 + 1/1000)) ≈ 0.01504
z = (0.14 − 0.12) / SE0 ≈ 1.32979
```

The SE is in proportion units, about **1.504 percentage points**; z is dimensionless. The model assumes independent binary observations and a stable probability within each arm. Compare |z| with about **1.96** for a two-sided 5% test. Here the calculator reports no clear difference. Swapping the arms reverses the signs of the difference and z while preserving the pooled rate and SE.

Non-rejection does not establish equivalence. The point estimate is below the illustrative three-point worthwhile threshold, but its point value alone cannot exclude worthwhile effects. This calculator supplies neither an equivalence test nor a power calculation.

**Sensitivity:** in a separate fixture, multiply every positive and exposure count by ten. A = 1,200/10,000 and B = 1,400/10,000 retain the same two-point difference, but z ≈ **4.20517**. More precise estimation under a model does not enlarge the effect, fix confounding or validate synthetic data externally.

**Sparse case:** 2/8 versus 4/8 triggers the course calculator's conservative guard: every positive/negative cell must contain at least ten observations. It withholds the approximation and performs no exact test. Large counts alone do not establish the assumptions either.

## Reproduce the examples

Download these **five files into one directory**. With Node.js installed, run `node week-04-worked-examples.mjs`. No package installation or network access is needed after downloading. A spreadsheet or equivalent implementation in another language is also accepted.

- [Exact fictional texts: week-04-bios.json](/data/week-04-bios.json)
- [Declared tokenizer: week-04-text.mjs](/data/week-04-text.mjs)
- [Four-row exposure fixture: bio-exposures.csv](/data/bio-exposures.csv)
- [Shared model: romance-models.mjs](/data/romance-models.mjs)
- [Worked calculations and assertions: week-04-worked-examples.mjs](/data/week-04-worked-examples.mjs)

The output includes both token traces, the revision count, each zone rate, pooled rates, North's exposure shares, 50/50 summaries, the balanced calculation and the larger fixture. Literal assertions make an altered baseline fail rather than quietly publish a different worked answer. Make separate copies for sensitivity experiments.

Use the [interactive calculator](/toolkit/#experiment) for the balanced and sparse fixtures. Try the confounded CSV's aggregate counts too: a z value cannot establish random assignment. The photo and its frozen metadata remain available in the [Week 3 kit](/data/week-03-photo-kit.zip).

## Report preflight and Week 5 handoff

The fictional manager says: “Half the local singles are available, one in four is a match, and bio A is the winner. Scale immediately.” Correct each claim using its population and evidence:

- **150/300 = 50%** describes availability among invented active profiles, not all local people.
- **40/150 ≈ 26.7%** describes reciprocal criteria among available profiles; **40/300 ≈ 13.3%** uses active profiles. These finite fixture counts do not establish an individual's match probability.
- **26% versus 19%** favours A only in the pooled exposure summary. B leads within both zones, and neither observational comparison identifies a text effect.

The [market report brief](/assessments/market-report/) remains **1,000–1,400 words**, at most three figures, with reproducible calculations and a proposed follow-up. It is due **Friday 19 March, 5 pm**. Distinguish sampling uncertainty under a model, uncertainty about the model and the fixture's lack of external validity. An interval around an invented census does not turn it into field research.

Save your **Bio experiment protocol**, candidate versions and quoted evidence. The photo manifest supplies the controlled input; the report still does not require a finished candidate profile. [Week 5](/lectures/week-05/) uses the supported photo/bio candidate and denominator definitions to distinguish a positive response from the joint event of mutual selection.

## Optional extensions · 15–25 minutes

1. **Tokenizer comparison, 10 minutes:** specify how a revised tokenizer handles apostrophes and non-ASCII letters. Add explicit fixtures, then compare token denominators with version 1. Keep the original code-point budget unchanged. Explain why results from two tokenizer versions cannot be compared without the rules.
2. **Shared-weight sensitivity, 5 minutes:** use a common North weight w from 0 to 1. A's rate is 0.10 + 0.20w; B's is 0.15 + 0.20w. Their descriptive gap stays 0.05 for every common weight. Letting each arm choose a different weight restores the possibility of reversal.
3. **Protocol review, 10 minutes:** exchange proposed protocols or review your own. Find an ambiguity in IDs, missing observations, stopping, uncertainty analysis or the simulated generator. Write an adversarial example and a concrete repair before producing outcomes.

[Continue to the Week 4 tutorial](/sessions/04-bio-experiment/).

## What Alex discovers

Alex's repaired bio states supported details, and the protocol separates wording from audience allocation. The pooled winner was an exposure-mix result; it did not establish a causal winner. Even a well-defined positive response would leave another question unanswered: what counts as mutual selection? Alex takes the supported candidate into next week's probability model.

[Define a match with Alex in Week 5](/lectures/week-05/).
