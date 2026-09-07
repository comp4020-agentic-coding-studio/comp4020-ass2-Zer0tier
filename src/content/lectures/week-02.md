---
title: "Platform Architecture and the Elo Hierarchy"
description: "Inspect Tinder, Bumble and Hinge disclosures, implement toy Elo and distinguish a visibility hierarchy from an observed measure of attractiveness."
week: 2
date: 2027-03-01
teachers: [mira-chen]
keyConcept: "The rich-get-richer dynamics of algorithmically enforced attractiveness"
slides: /decks/week-02/
related: [sessions/02-platforms]
---

## Who gets seen?

Week 1 separated supplied facts, observations and hidden state. This week puts a recommendation system around that boundary. An ordered profile can remain unseen; an unseen profile cannot receive a like from that viewer. Our question is how a visibility hierarchy could emerge, and which parts we can actually measure.

By the end, you should be able to trace retrieval, filtering, ordering and exposure; audit a platform claim; reproduce a toy Elo update; and explain an exposure rate using a named population. Use probability, arithmetic and pseudocode. All profiles, scores, counts and response probabilities in the exercises are **synthetic**.

## Scheduled teaching and independent work

### 60-minute lecture

Monday, **11 am–12 pm**. Use only these selections from the [complete deck](/decks/week-02/), in order. The timings include explanation, brief working and questions; full exercise timers elsewhere belong to the complete resource route.

| Lecture time | Slides | Focus |
| --- | --- | --- |
| 0–10 min | 4–5, 7, 11 | Trace retrieval through exposure and demonstrate the source/claim/unknown distinction. |
| 10–25 min | 17–20, 22 | Derive toy Elo and work through equal- and unequal-rating updates. |
| 25–40 min | 29–31, 33–34 | Compare counts with rates and explain how an assumed allocator preserves an advantage. |
| 40–55 min | 37–38, 40–41 | Name census populations; work through missing counts and invalid rows. |
| 55–60 min | 45–46 | Check understanding and identify the Platform audit handoff. |

### 90-minute tutorial

Thursday, **2–3.30 pm**. Follow the [Week 2 tutorial](/sessions/02-platforms/): **20 minutes pipeline/source audit; 25 minutes Elo implementation; 25 minutes census audit; 20 minutes feedback and claim repair**. These four blocks fill the whole session. Bring lecture working for checking and refinement; complete each exercise once. Solo work and review are accepted.

### Independent work · about 210 minutes

- **30 minutes — before Monday:** Read the three platform descriptions (slides 12–14), revisit Week 1’s boundary example and open the census.
- **90 minutes — between Monday and Thursday:** Review the remaining pack, especially event logging, the stateful Elo trace and synthesis (slides 10, 23–27 and 42–44). Prepare questions and download the four workbook files; the tutorial performs the four practical tasks.
- **90 minutes — consolidation and assessment:** Finish and check the Platform audit, record source limitations and carry its population definitions into the data report.

Together this is about **six hours: 60 + 90 + 210 minutes**. Slides and full-length exercises outside the lecture selection are independent study unless assigned in the tutorial’s four blocks. Use the worked answers to check an attempt; optional extensions can use consolidation time. The complete route below reuses this material and adds no scheduled meeting or extra three-hour study requirement.

<span id="using-the-46-slide-teaching-pack"></span>

## Complete teaching pack

The full **46-slide pack** and all worked notes remain the complete resource. This **180-minute reference route includes a ten-minute break** for someone facilitating the whole pack in one sitting. It is separate from the scheduled selections above: the break slide is skipped in the 60-minute lecture and the tutorial keeps its own 90-minute plan. These are facilitation estimates, including practical work and debriefs.

| Elapsed time | Slides | Work and evidence produced |
| --- | --- | --- |
| 0–30 min | 1–10 | 15 min case and pipeline, 8 min boundary drawing, 7 min debrief and logging |
| 30–55 min | 11–16 | 12 min primary-source reading, 6 min claim classification, 7 min evidence-table review |
| 55–100 min | 17–27 | 20 min equations and traces, 12 min implementation, 8 min test review, 5 min event definitions |
| 100–110 min | 28 | Break |
| 110–135 min | 29–36 | 12 min rates and feedback, 6 min allocator exercise, 7 min debrief |
| 135–160 min | 37–41 | 10 min population definitions, 8 min census audit, 7 min validation and answers |
| 160–180 min | 42–46 | 8 min claim repair, 5 min review, 4 min artefact assembly/handoff, 3 min exit check |

If the group finishes early, spend another 15–25 minutes testing a zero-exposure row, comparing two K values over the same event sequence, or explaining what changes when repeated viewers are counted once. Add the assumption and result to the audit; do not invent new facts about an app.

## Architecture before folklore · slides 4–10

The [fixed Alex case](/toolkit/#benchmark) remains an adult CS student who likes board games and terrible puns, is free Friday 5–7 pm, has a $20 total outing budget and travels by bus. Alex wants to meet someone, with the possibility of a relationship.

For this exercise only, retrieve three invented adult candidate profiles with proposed outings. Scores are arbitrary ordering inputs, not attractiveness measurements. The time and budget checks are classroom rules, not claimed app features.

| Candidate | Proposed Friday outing | Total cost | Invented score |
| --- | --- | --- | --- |
| P1 | 6–6.30 pm | $12 | 8 |
| P2 | 8–8.30 pm | $12 | 9 |
| P3 | 5.30–6 pm | $18 | 6 |

**Exercise:** draw retrieval → filtering → ordering → exposure → mutual selection. Annotate where availability, the score, a displayed profile and interest in Alex belong. Distinguish supplied, assumed, observed and hidden information.

**Worked trace:** retrieve P1/P2/P3. Reject P2 because its proposed time is outside Alex's window. P1 and P3 pass time and budget checks. Sort them by the assumed score: P1 then P3. Under an invented one-profile display limit, only P1 receives exposure. Bus travel is still unchecked. Eligibility and exposure establish neither mutual interest nor a relationship. Mutual selection would require both choices to be recorded.

A toy event log can store anonymous fictional viewer/profile IDs, an event ID, timestamp, exposure and explicit choice. Specify a window and what counts as “shown”; deduplicate repeated event IDs. A retrieval record is not an exposure record. Missing replies remain missing, not secretly negative labels.

## Source audit · slides 11–16

These are primary **company descriptions**, not independent verification or source code. Pages checked **6 September 2026**; check them again before teaching in 2027. Keep the title, URL, checked date, feature scope and unanswered question in the audit.

| Source | Supported description and scope | What it does not disclose here |
| --- | --- | --- |
| [Tinder: Powering Tinder](https://www.tinderpressroom.com/powering-tinder-r-the-method-behind-our-matching), page updated 11 July 2022 | Says it no longer relies on Elo; describes activity, profile information and Likes/Nopes as signals | Production weights or a numerical mass-swipe penalty |
| [Hinge: What is Most Compatible?](https://help.hinge.co/hc/en-us/articles/360011233073-What-is-Most-Compatible), updated 27 July 2026 | Describes that feature using mutual preferences, activity and liking patterns | A scoring equation or an individual's connection probability |
| [Bumble: Using the Discover tab](https://support.bumble.com/hc/en-us/articles/28423668110621-Using-the-Discover-tab), updated 31 March 2026 | Describes highlighted recommendations using profile information and previous matches | Coefficients or an Elo-style update |

**Exercise:** classify “Tinder says it no longer relies on Elo”, “our simulator subtracts eight points” and “all three apps use an eight-point mass-swipe penalty”.

**Worked answer:** the first is a disclosure supported by its primary page; the second is a model assumption supported by our rule and trace; the third is unsupported by these sources. Name an unknown instead of reverse-engineering confidence from a marketing paragraph.

## An Elo hierarchy we can inspect · slides 17–27

Our model deliberately makes the update inspectable. Let R be the current artificial rating, Q the comparison rating, S an explicit simulated binary result, and K a positive update size. E is the expected result **within this model**, not a probability of romance.

```text
E = 1 / (1 + 10^((Q - R) / 400))
R_next = R + K * (S - E)
```

At rating gaps R − Q of −400, −200, 0, +200 and +400, E is approximately 9.09%, 24.03%, 50%, 75.97% and 90.91%. The slide chart samples this equation; it is not fitted to app data.

| Reset example | Expectation E | Updated R |
| --- | --- | --- |
| R = Q = 1200, S = 1, K = 32 | 0.5 | 1216 |
| R = Q = 1200, S = 0, K = 32 | 0.5 | 1184 |
| R = Q = 1200, S = 1, K = 64 | 0.5 | 1232 |
| R = 1200, Q = 1600, S = 1, K = 32 | 1/11 | ≈ 1229.09 |
| R = 1200, Q = 1600, S = 0, K = 32 | 1/11 | ≈ 1197.09 |

For the equal-rating win, the change is 32 × (1 − 0.5) = 16. For the unequal win, the lower expectation makes the positive surprise larger: 32 × (1 − 1/11) ≈ 29.09. K changes responsiveness, not evidence quality.

**Stateful trace:** start at 1200, win against 1200, then lose against 1200. The intermediate rating is 1216, so the second expectation is about 0.52301. The final rating is **1199.263693206478**, not 1200. Recompute E from the updated state; round only the displayed answer.

**Implementation exercise:** implement the two equations; reject non-finite ratings, non-positive K and any S other than 0 or 1. Test the reset cases and the sequence with a numerical tolerance. Record R, Q, S, K, E and R_next, so someone can inspect a failure.

An assumed penalty of 8 after the equal win gives **1208**. Keep `rating_after_elo` and `assumed_penalty` separate. You changed your implementation, not Tinder. An unseen profile or an unanswered message supplies no explicit binary result under this exercise's event definition.

## Key concept: rich-get-richer dynamics · slides 29–36

The syllabus phrase “algorithmically enforced attractiveness” is the claim to interrogate. A system can enforce an exposure hierarchy that looks like a hierarchy of appeal while partly measuring its own allocation decisions. Popularity is doing its own performance review.

The [exposure CSV](/data/week-02-exposures.csv) contains two independent synthetic scenarios, each within one invented observation window. Each exposure is one distinct fictional viewer seeing that profile once; at most one like is recorded per exposure. Do not combine the scenarios or treat them as randomised trials.

| Scenario | Profile | Exposures | Likes | Likes / exposures |
| --- | --- | --- | --- | --- |
| equal_counts | A | 1,000 | 20 | 2% |
| equal_counts | B | 100 | 20 | 20% |
| rank_reversal | A | 1,000 | 80 | 8% |
| rank_reversal | B | 100 | 20 | 20% |

**Worked interpretation:** equal counts can hide unequal rates. In the second scenario A leads on counts while B leads on rates. These comparisons do not isolate a bio effect: audience selection, observation windows and measurement rules would need to be examined. Week 4 develops experiment design; this week establishes the denominator problem.

**Feedback model:** assume A and B start with 6 and 4 recorded likes. Allocate 1,000 new exposures in proportion to those counts, giving 600 and 400. Assume the same 10% probability of a like for both profiles. Expected new likes are 60 and 40; cumulative totals become **66 and 44**. A's share remains 60%. This is an expected-value calculation, not one sampled simulation. It preserves the seed advantage; it does not demonstrate an ever-widening share gap.

**Allocator exercise and answer:** keep the seed counts and probabilities, but allocate 500 exposures to each. Expected new likes become 50 each; cumulative totals become **56 and 54**. A's share is 56/110 ≈ **50.9%**. The response probabilities stayed fixed, so the changed allocation explains this model difference. Neither allocator has been validated for a real platform. With zero seed likes, the proportional rule also needs an explicit initialisation policy.

## Census and denominator audit · slides 37–41

The [Null Island census](/data/null-island-market.csv) is a complete fixture of three invented zones in one observation week. Active profiles form the outer group; available profiles satisfy the case's availability constraint; reciprocal profiles also satisfy both sides' stated-intention filters. **Reciprocal eligibility is not mutual attraction or an observed match.**

| Zone | Active | Available | Reciprocal |
| --- | --- | --- | --- |
| North | 80 | 40 | 12 |
| South | 120 | 60 | 18 |
| East | 100 | 50 | 10 |
| Total | **300** | **150** | **40** |

**Exercise:** sum the rows; validate whole non-negative counts, unique zone names and `reciprocal ≤ available ≤ active`. Compute reciprocal eligibility among available profiles and among active profiles. Then add 50 **active-only** profiles to East in a separate scenario.

**Worked answer:** 40/150 ≈ **26.7%** and 40/300 ≈ **13.3%** answer different questions. East becomes 150/50/10; totals become 350/150/40. Reciprocal-to-active changes to 40/350 ≈ **11.4%**, while reciprocal-to-available stays 26.7%. This is a sensitivity scenario, not evidence that the baseline census is wrong or that Alex has an 11.4% date probability.

Reject a row with 12 active and 15 available: it violates the nesting definition. A zero denominator makes a rate undefined; report that explicitly instead of replacing it with 0%.

## Run the worked calculations

Save these four files together: [worked examples](/data/week-02-worked-examples.mjs), [model module](/data/romance-models.mjs), [census CSV](/data/null-island-market.csv) and [exposure CSV](/data/week-02-exposures.csv). With Node available, run:

```sh
node week-02-worked-examples.mjs
```

The file asserts the numerical answers above, validates the supplied counts and prints a JSON calculation log. It imports the same model module used by the toolkit. No packages or app accounts are needed. Read the worked answers after your own attempt; the script is an oracle for these fixtures, not evidence that the model describes people. A calculator or an implementation in another language is equally suitable.

## Synthesis, exit check and handoff · slides 42–46

Repair this paragraph: “Alex has an Elo of 1216, so Tinder considers Alex attractive. Profile A gets more likes, so its bio is better. There is a 13.3% chance of a date.”

**Worked rewrite:** 1216 is our equal-rating simulated-win result. In the reversal fixture A has more likes, but B has a higher observed rate, 20% versus 8%. The 13.3% describes reciprocal eligibility among 300 active synthetic profiles. No platform score, causal bio effect or date probability was measured.

Your platform audit contains the annotated boundary map, scoped source/claim/unknown table, tested Elo trace and exposure/census log. The [90-minute tutorial](/sessions/02-platforms/) uses these same exercises; it creates the first tutorial artefact of the course, with solo work accepted.

**Exit answers:** ranked-but-unseen means exposure is missing; an equal-rating K = 64 win gives 1232; reciprocal eligibility does not establish mutual attraction. Carry the audit's source, permission, purpose and missing-information rules into [week 3's photo assets](/lectures/week-03/). Keep the census definitions for the [data report](/assessments/market-report/).
