---
title: "The Mathematics of the \"Match\""
description: "Calculate mutual-selection probabilities, constrain the travel radius and separate peak Sunday exposure from a higher match rate."
week: 5
date: 2027-03-22
teachers: [mira-chen]
keyConcept: "Peak system load: Sunday evening swiping"
slides: /decks/week-05/
related: [sessions/05-match-probability]
---

## Alex's story · The calculator offers 1.2 matches

*Fictional course story · Week 5.*

Alex puts the repaired bio beside the supplied probability model. Across twenty equivalent exposures, the assumed inputs give an expected 1.2 mutual selections. The calendar does not accept fractional bookings. Alex also has a practical question: can a proposed meeting fit Friday's two-hour window, the bus journey and a $20 budget? The percentage and the itinerary need different checks.

**Investigate this week:** Calculate mutual selection and repeated exposure, then audit the venue options. What makes an invitation feasible without making it accepted?

## Your expected date is not a booking

A match requires two selection events. This week makes their denominator explicit, builds a repeated-opportunity model, checks whether Alex can reach the proposed meeting, and freezes the project's quality benchmark. Each calculation has a different job. Putting a percent sign on all of them does not make them interchangeable.

[Open the 50-slide teaching deck](/decks/week-05/). **A/D** or the scroll wheel changes slides; **Esc** returns to these notes.

By the end, you should be able to trace conditional probabilities, distinguish expectation from a chance of at least one event, stress-test independence, implement travel and budget constraints, and defend a benchmark score without describing it as a dating forecast.

## Scheduled teaching and independent work

### 60-minute lecture

Monday, **11 am–12 pm**. Use only these selections from the [complete deck](/decks/week-05/), in order. The timings include explanation, brief working and questions; full exercise timers elsewhere belong to the complete resource route.

| Lecture time | Slides | Focus |
| --- | --- | --- |
| 0–10 min | 5–8 | Define a reciprocal opportunity and derive the joint and conditional probabilities. |
| 10–25 min | 11–13, 16, 20 | Compare expected counts with the chance of any match; show what dependence changes. |
| 25–40 min | 22–24, 26–27 | Apply whole-outing time and cost checks to the supplied routes. |
| 40–55 min | 33–34, 37, 41, 44 | Compare time-window rates and explain the frozen benchmark objective and tie rule. |
| 55–60 min | 46, 50 | Check the freeze record and the model’s limits. |

### 90-minute tutorial

Thursday, **2–3.30 pm**. Follow the [Week 5 tutorial](/sessions/05-match-probability/): **25 minutes probability; 20 minutes geography; 20 minutes time windows; 25 minutes benchmark freeze and quiz**. The last block includes ten minutes for the interactive quiz and its debrief. These four blocks fill the whole session. Bring lecture working for checking and refinement; complete each exercise once. Solo work and review are accepted.

### Independent work · about 210 minutes

- **30 minutes — before Monday:** Bring the supported bio, frozen photo and Platform audit; read the opportunity table and three invented routes.
- **90 minutes — between Monday and Thursday:** Review remaining derivations and worked answers, particularly heterogeneous probabilities, cap eligibility and the time-window protocol (slides 17–19, 28–31 and 38–40). Open the workbook and prepare a candidate evidence sheet for Thursday.
- **90 minutes — consolidation and assessment:** Check and save the Match probability model, dated objective and unchanged controls. Practise explaining both independence assumptions for the midterm.

Together this is about **six hours: 60 + 90 + 210 minutes**. Slides and full-length exercises outside the lecture selection are independent study unless assigned in the tutorial’s four blocks. Use the worked answers to check an attempt; optional extensions can use consolidation time. The complete route below reuses this material and adds no scheduled meeting or extra three-hour study requirement.

<span id="a-180-minute-teaching-route"></span>

## Complete teaching pack

The full **50-slide pack** and all worked notes remain the complete resource. This **180-minute reference route includes a ten-minute break** for someone facilitating the whole pack in one sitting. It is separate from the scheduled selections above: the break slide is skipped in the 60-minute lecture and the tutorial keeps its own 90-minute plan. These are facilitation estimates, including practical work and debriefs.

| Elapsed time | Slides | Activity and evidence produced |
| --- | --- | --- |
| 0–30 min | 1–10 | Define the pair and outcome window; trace the tree and table; spend six minutes changing denominators, then debrief conditional direction and independence. |
| 30–65 min | 11–20 | Derive expectation and the complement; implement boundary cases in seven minutes; compare a shared-draw model, heterogeneous probabilities and sensitivity. |
| 65–75 min | 21 | Break. |
| 75–110 min | 22–31 | Inspect the full journey; audit three venues in eight minutes; test time/cost boundaries in four minutes; compare caps and eligibility denominators. |
| 110–145 min | 32–40 | Contrast Sunday counts and rates; repair a headline in six minutes; repair a proposed time experiment in eight minutes and discuss what a generator would establish. |
| 145–180 min | 41–50 | Apply rating evidence; reproduce both ranks in seven minutes; freeze the target; spend six minutes reviewing records and finish with the invitation and exit ticket. |

Optional extensions below can use 15–25 minutes of independent consolidation time.

## Bring the earlier artefacts into the model

From Week 2's **Platform audit**, bring the definitions of exposure, observed response and unknown allocation. From Week 4's **Bio experiment protocol**, bring the supported candidate and the frozen **A-portrait-v1** image, with unchanged bytes, crop, alt text and display treatment. A positive bio response has not suddenly become a reciprocal match.

Alex remains a fictional adult CS student who likes board games and terrible puns, wants to meet someone with the possibility of a relationship, is free **Friday 5–7 pm**, takes the **bus** and has **$20 total** for an outing. The [case and rating anchors](/toolkit/#benchmark) are fixed. Routes and venues below are invented options supplied for this exercise, not additional biography.

All Week 5 inputs are [authored teaching fixtures](/data/week-05-cases.json). The pair table, repeated model, venue options, time windows and strategy comparison are separate scenarios. They are not app logs, outcomes for the Week 4 texts, or records to join with the market census.

## A match is a joint event

For the pair table, one exposure is **one eligible fictional pair offered both selection directions during a complete invented 24-hour outcome window**. Both decisions are supplied even when the first is no. Each pair contributes at most one mutual match. Define A as selection in one direction, B as selection in the reverse direction and M = A ∩ B. Neither a match nor a missing reply establishes agreement to meet.

| First direction | B selects | B does not select | Total |
| --- | --- | --- | --- |
| A selects | 6 | 24 | 30 |
| A does not select | 7 | 63 | 70 |
| Total | 13 | 87 | 100 |

The [conditional product rule in MIT's Mathematics for Computer Science, §17.4](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/mit6_042js15_textbook.pdf) gives:

```text
P(A and B) = P(A) × P(B given A)
           = (30 / 100) × (6 / 30)
           = 0.30 × 0.20 = 0.06
```

Read the tree's other leaves as 0.30 × 0.80 = 0.24, 0.70 × 0.10 = 0.07, and 0.70 × 0.90 = 0.63. They sum to one. The second-stage probability always uses its own branch's denominator.

**Denominator exercise:** calculate P(B), P(B | A), P(A | B), and P(A or B). Check independence and consider a zero conditioning count.

**Worked answer:** P(B) = 13/100 = 0.13; P(B | A) = 6/30 = 0.20; P(A | B) = 6/13 ≈ 0.4615. The union contains 6 + 24 + 7 = 37 pairs: 30 + 13 − 6 = 37, with the intersection counted once. Multiplying marginal probabilities gives 0.30 × 0.13 = 0.039, which is not 0.06. Thus A and B are dependent in this finite fixture. If the A count were zero, the joint count would be zero but P(B | A) would be undefined; do not divide by zero or report an observed conditional rate of 0%.

In a real log where B's selection is hidden whenever A does not select, the B-only count would be unknown. The complete classroom table must not suggest that an app necessarily exposes those decisions.

## Twenty opportunities: expectation and the complement

The repeated model describes **new eligible pair opportunities**, using supplied P(A) = 0.30 and P(B | A) = 0.20. It is not sampling the 100 table rows without replacement. The joint probability is p = 0.06 in each opportunity.

Let Iᵢ be 1 when opportunity i yields a mutual match and 0 otherwise. Then X = ΣIᵢ counts matches. By [linearity of expectation, MIT §18.5](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/mit6_042js15_textbook.pdf):

```text
E[X] = Σ P(Mᵢ) = 20 × 0.06 = 1.2
```

Adding these expectations **does not require independence**. It does require the twenty stated marginal probabilities. An expected 1.2 is a mean over repetitions of this model, not a possible realised count or a meeting reservation.

For a [binomial model](https://www.itl.nist.gov/div898/handbook/eda/section3/eda366i.htm), additionally assume a fixed number of trials, independent binary match indicators and a common p. Then:

```text
P(X = 0) = (1 − p)^20 = 0.94^20 ≈ 0.29010624
P(X ≥ 1) = 1 − P(X = 0) ≈ 0.70989376 = 70.99%
P(X = 1) = 20 × 0.06 × 0.94^19 ≈ 0.37034839
P(X ≥ 2) = 1 − P(X = 0) − P(X = 1) ≈ 0.33954537
```

The leading 20 in P(X = 1) counts the possible locations of the single match. The mutually exclusive categories zero, one, and two-or-more sum to one. Expectation and P(X ≥ 1) answer different questions.

**Implementation exercise:** reproduce the mean and complement, then test no opportunities, p = 0, and p = 1. Next let one Bernoulli draw with success probability 0.06 control all twenty outcomes.

**Worked answer:** no opportunities gives expected count 0 and P(any) = 0; twenty at p = 0 gives 0 and 0; twenty at p = 1 gives 20 and 1. In the shared-draw model, X = 20 with probability 0.06 and X = 0 otherwise. E[X] remains 1.2, while P(any) becomes **6%**. This deliberately extreme joint model shows why a product of complements requires independence. It is not a measured account of people behaving alike.

There are two separate independence questions: whether A and B are independent **within one pair**, and whether the match indicators are mutually independent **across opportunities**. Our main calculation uses conditional dependence within pairs and assumes independence across them.

### Unequal probabilities and sensitivity

For independent opportunities with different pᵢ, use **1 − ∏(1 − pᵢ)**. Ten at 0.02 and ten at 0.10 have expected count 1.2 and chance of at least one **71.51%**. Substituting the mean p = 0.06 changes that probability to 70.99%; preserve the individual inputs when they are known.

Hold P(A) = 0.30 and twenty independent opportunities fixed:

| Assumed P(B given A) | Joint p | Expected matches | Chance of at least one |
| --- | --- | --- | --- |
| 0.10 | 0.03 | 0.6 | 45.62% |
| 0.20 | 0.06 | 1.2 | 70.99% |
| 0.40 | 0.12 | 2.4 | 92.24% |

These are sensitivity scenarios, not a confidence interval or fitted predictions. The download names the routine `independentOpportunities` to keep its assumption visible. It sums probabilities for expectation and uses a product of complements, evaluated with logarithms for numerical stability, for the independent chance. It does not infer independence from its inputs.

## Radius is a transport constraint

A short straight-line distance can hide a slow bus route. Treat each row below as a fictional option with a 60-minute meeting. Outbound and return times each include walking, waiting and bus travel. The transport price covers **both legs**; the activity price is Alex's full additional cost. Start at 17:00 and complete the whole outing by 19:00.

| Invented option | Straight-line distance | Outbound / meeting / return | Transport + activity | Decision |
| --- | --- | --- | --- | --- |
| Library games table | 2 km | 20 + 60 + 20 = 100 min | $6 + $8 = $14 | Feasible; 20 minutes and $6 spare. |
| Arcade table | 1 km | 35 + 60 + 35 = 130 min | $6 + $10 = $16 | Reject: ten minutes over the window. |
| Riverside games room | 6 km | 15 + 60 + 15 = 90 min | $6 + $16 = $22 | Reject: $2 over budget. |

**Venue exercise:** reproduce every total before choosing. Implement `feasible = minutes <= 120 AND costCents <= 2000`. Return reasons for each rejection and retain both margins. Apply constraints before ranking preferences; a low price does not cancel a time violation.

**Worked answer:** only Library passes both checks. Leave at 17:00, arrive 17:20, meet until 18:20 and return by 18:40 under the supplied inputs. This establishes Alex's deterministic feasibility only; recipient availability and agreement are not supplied.

**Boundary exercise:** add ten minutes to each Library travel leg, then eleven. Try costs of exactly $20 and $20.01.

**Answers:** 120 minutes passes with no reserve; 122 fails. $20 passes; $20.01 fails. Use integer cents to express the price boundary. A desired reserve is a separate, declared decision rule, not a hidden change to Alex's available time. The baseline's reserve is not a probability of on-time arrival. Week 9 will add uncertainty and contingencies.

Increasing a radius adds possibilities but need not add usable ones. Do not invent a preferred venue in Alex's biography just because the option passes this exercise.

## A cap has its own denominator

The lab cap is **20 offered pair opportunities**, not a claimed current platform swipe limit. Both strategy rows below use twenty eligible opportunities from the same declared pool. Probabilities are assumptions chosen to expose the objective's behaviour.

| Strategy | P(A) | P(B given A) | Joint p | Expected count |
| --- | --- | --- | --- | --- |
| Baseline selection | 0.30 | 0.20 | 0.06 | 1.2 |
| Broader selection | 0.60 | 0.10 | 0.06 | 1.2 |

More outgoing selections do not improve this particular expected-match objective under these inputs. This does not establish a universal penalty for broad selection. If only ten of twenty offered opportunities pass the declared eligibility filter, p = 0.06 **per eligible opportunity** yields 0.6 expected eligible matches. Record offered, eligible, selected and mutual counts separately. Holding an offered cap constant does not guarantee the eligible denominator or population stayed constant.

## Key concept: peak system load

“Sunday evening swiping” is the synthetic peak-load scenario for this week, **not an established universal best time**. Here an exposure is one distinct eligible fictional pair offered both directions, with a complete 24-hour outcome window and at most one mutual match. The windows use separate disjoint pools, and time was not randomly assigned. These counts are not derived from the earlier pair table or the Week 4 CSV.

| Window | Mutual matches | Exposures | Observed rate |
| --- | --- | --- | --- |
| Sunday evening | 8 | 40 | 20% |
| Tuesday evening | 3 | 10 | 30% |

**Headline exercise:** audit “Sunday is 2.67 times better, so move every session there.”

**Worked answer:** 8/3 ≈ 2.67 is the **match-count ratio**. Sunday has four times the exposures, ten percentage points lower observed rate, and a rate ratio of 0.20/0.30 ≈ 0.67. The table supports “Sunday had more matches and a lower match rate in this fixture.” It cannot identify what would happen if the same eligible population moved to Sunday.

If both windows supplied twenty eligible exposures and the observed rates transferred unchanged, plug-in expected counts would be **4 and 6**. These are hypothetical projections, not observed matches or evidence of a time effect. Audience composition, selection and incomplete measurement could matter. The download returns `null` for 0/0 and rejects matches exceeding exposures. A completed window with no mutual match is zero; missing outcomes need repair, not silent conversion to zero.

### Repair a simulation-only proposal

**Exercise:** “Old bio A on Sunday, new bio B on Tuesday; reuse viewers and stop when Tuesday wins.” Repair the unit, allocation, controls, outcome and stop. State what is missing before execution.

One defensible classroom protocol is:

| Field | Proposed rule |
| --- | --- |
| Question | Under an explicitly supplied generator, does assignment to Sunday versus Tuesday change mutual-match probability in the same eligible pool? |
| Unit and allocation | 400 distinct simulated pairs. Randomly shuffle 200 Sunday and 200 Tuesday labels, assigning each pair once. Record the seed and assignments. |
| Controls | Same supported photo/bio versions, eligibility, display and non-time settings. Both directions offered once to each pair. |
| Outcome | One binary mutual match within 24 simulated hours; retain every assigned pair in the denominator. Require complete outcome windows, unique IDs and valid binary records before analysis. |
| Estimate and stop | Sunday rate minus Tuesday rate. Allocate exactly 200 pairs per window and finish all windows; analyse once. No stopping when a preferred window leads. |
| Before execution | Supply the generator's selection probabilities and how, if at all, time changes them. Prespecify the simulation seed, independence/dependence structure and uncertainty method. |

This is a design exercise with **no trial outcomes yet**. Its cap is a teaching choice, not a power calculation. The existing 8/40 and 3/10 observations do not supply a valid causal generator. A completed simulation would show behaviour under its assumptions, not validate a real scheduling recommendation. Week 4's conservative normal-test guardrail withholds z for these sparse observational counts; a different statistical method would still not recover missing random assignment.

## Freeze the benchmark without changing its meaning

The [final project](/assessments/profile-deployment/) has a **quality rubric**, independent of the reciprocal-match probability model. Quote evidence for clarity, specificity, feasibility and exit using the [toolkit's 0–4 anchors](/toolkit/#benchmark). Contradictions fail case fidelity even if the numerical score is high.

**Ranking exercise:** compute the scores and ranks of the illustrative vectors [4, 4, 3, 4] and [4, 4, 4, 4]. Use all [99 synthetic controls](/data/null-island-controls.csv).

```text
score = 100 × (clarity + specificity + feasibility + exit) / 16
rank = 1 + count(control score >= candidate score)
entries = 99 controls + 1 candidate = 100
```

**Worked answer:** [4, 4, 3, 4] scores 93.75 and ranks **2/100**, because one control ties at 93.75. [4, 4, 4, 4] scores 100 and ranks **1/100**. Using `>` instead of `>=` would incorrectly award first place to the tied candidate. These vectors are arithmetic examples, not mandatory ratings for your text.

The control generator intentionally excludes [4, 4, 4, 4]; the best control is 93.75. That designed ceiling is a benchmark limitation. Only rank 1/100 receives the course's **top-1% label**. A score of 100 is neither a 100% match probability nor a claim of external validity. Gradeable work is evidence and engineering; winning the fixture is not the assessment criterion.

### The primary-objective record

Save a dated record before later evaluation influences the candidate:

- Exact candidate text and version; the supported case; the frozen photo version, fingerprint and display treatment.
- The chosen invitation and venue-input version, with time/cost checks and all unknown recipient constraints.
- Four feature ratings, each with an evidence quote and anchor explanation. Keep fidelity failures explicit.
- Primary score formula, Null Island v1 control file and fingerprint, the 100-entry denominator and the conservative `>=` tie rule.
- Separate fields for the assumed match probability and its eligibility/window definition. No formula converts the quality score into this probability.
- Week 11's prespecified double-feasibility weighting, rescoring **all** controls under the same changed rule; separately record the availability-change scenario when supplied. Preserve the baseline and label exploratory revisions.

Week 11 evaluates this frozen baseline before revisions. A fingerprint only establishes file identity; it does not establish that a feature rating is justified. **Review exercise:** exchange records or inspect your own. Reproduce the inputs, locate the evidence, and report one correction with a reason. A useful literal check places score 93.75 beside joint p = 0.06 and verifies that the output names different quantities.

## Run the worked calculations

Save these **five files in the same folder**:

1. [week-05-cases.json](/data/week-05-cases.json) — separate authored scenarios and units.
2. [week-05-models.mjs](/data/week-05-models.mjs) — conditional, independent-opportunity, venue and rate functions.
3. [week-05-worked-examples.mjs](/data/week-05-worked-examples.mjs) — executable calculation log.
4. [romance-models.mjs](/data/romance-models.mjs) — the existing quality scorer and conservative rank.
5. [null-island-controls.csv](/data/null-island-controls.csv) — the unchanged 99 comparator vectors.

With Node installed, run from that folder:

```sh
node week-05-worked-examples.mjs
```

After downloading, this runs offline without the website or third-party packages. A spreadsheet or another language is equally acceptable. The JSON log reproduces the 0.06 joint, 1.2 mean, 70.99% independent chance, 6% shared-draw chance, 71.51% heterogeneous chance, venue decisions, 20/30% window rates, and ranks 2 and 1. The workbook checks literal answers and control-file integrity. It does not score your candidate automatically from prose; supply your evidence-backed ratings.

For a direct boundary check in JavaScript:

```text
import { independentOpportunities, windowRate } from './week-05-models.mjs';
console.log(independentOpportunities([]));
// { expected: 0, none: 1, atLeastOne: 0 }
console.log(windowRate(0, 0)); // null: undefined rate
```

## Handoff to Week 6

One optional invitation under the **invented Library inputs** is:

> Library games table Friday 17:20–18:20? My bus trip and activity fit $14 total. Fine to pass.

It specifies Alex's feasible plan without inventing the recipient's availability, transport, preferences or acceptance. Keep the bio and photo frozen; store the invitation as a separate planning artefact. Week 6's [message decision tree](/sessions/06-message-tree/) uses this plan and the supported bio. A supplied recipient hobby is still needed before claiming shared context, and prior refusal selects stop even after a match.

**Exit ticket:** correct three statements: “1.2 expected means a booking,” “Sunday's larger count proves a clock effect,” and “top 1% means a 99% chance of a date.” The repairs are a model mean, an observational count/rate distinction, and a named 100-entry rubric rank.

For an optional **15–25-minute extension**, implement a seeded independent simulation of the twenty-opportunity model and compare its mean and at-least-one frequency with the exact answers. Declare the seed, number of batches and Monte Carlo error rule before running. Then replace the twenty draws per batch with one shared draw and explain the changed distribution. A second extension enumerates feasible subsets under a separately declared time reserve; it must not move Alex's hard constraints.

[Continue to the Week 5 tutorial](/sessions/05-match-probability/) with your **Match probability model**, checked invitation and primary-objective record.

## What Alex discovers

The Library option fits Alex's supplied limits at 100 minutes and $14. The probability result remains an expectation under assumptions, and the invitation remains a proposal. Alex saves it separately from the frozen profile. Next comes the first message: a board-games question could fit, but only if there is evidence that the recipient shares the topic.

[Draft Alex's opening message in Week 6](/lectures/week-06/).
