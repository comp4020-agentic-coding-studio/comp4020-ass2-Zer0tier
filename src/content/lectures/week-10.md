---
title: "Stochastic Modeling of the First Date"
description: "Propagate a fictional conversation through a Markov chain, check a simulation against exact probabilities and resolve the Who pays deadlock."
week: 10
date: 2027-05-10
teachers: [mira-chen]
keyConcept: "Navigating the “Who pays?” deadlock"
related: [sessions/10-date-simulation]
slides: /decks/week-10/
---

## A first date, represented badly but explicitly

The transition matrix has four states. The people have rather more. This week builds a **Date transition model**: an exact finite-horizon calculation, a seeded Monte Carlo comparison, a sensitivity result and a separate observation record for the bill discussion. A simulator can check an implementation. It cannot provide somebody else's answer.

By the end, you should be able to propagate a row-vector distribution, trace every contribution to a two-step result, sample categorical transitions, explain simulation error, preserve absorbing states and resolve a waiting protocol using explicit prior costs. Every probability, arrival, bill and response below is **authored fictional teaching data**. No real date, private message, profile or payment is needed.

## Scheduled teaching and independent work

### 60-minute lecture

Monday, **11 am–12 pm**. Use only these selections from the [complete deck](/decks/week-10/), in order. The timings include explanation, brief working and questions; full exercise timers elsewhere belong to the complete resource route.

| Lecture time | Slides | Focus |
| --- | --- | --- |
| 0–10 min | 4–8 | Distinguish confirmation from arrival and define matrix orientation and absorbing states. |
| 10–25 min | 11–12, 14–15 | Propagate the two-step distribution and explain the denominator. |
| 25–40 min | 21, 24–27 | Demonstrate categorical sampling, path reset and an exact-versus-seeded comparison. |
| 40–55 min | 30, 33, 35, 40–41 | Explain sensitivity, the memoryless assumption and the bill deadlock through actual costs. |
| 55–60 min | 46, 49–50 | Preserve withdrawal and identify the observation handoff. |

### 90-minute tutorial

Thursday, **2–3.30 pm**. Follow the [Week 10 tutorial](/sessions/10-date-simulation/): **20 minutes exact propagation; 30 minutes simulation; 20 minutes sensitivity; 20 minutes observation review and quiz**. The last block includes ten minutes for the interactive quiz and its debrief. These four blocks fill the whole session. Bring lecture working for checking and refinement; complete each exercise once. Solo work and review are accepted.

### Independent work · about 210 minutes

- **30 minutes — before Monday:** Bring the Offline handover plan and Communication state machine; read the four-state matrix and the sampling convention.
- **90 minutes — between Monday and Thursday:** Review remaining worked derivations, particularly eventual absorption, sampler boundaries and the memory counterexample (slides 16–19, 22–23 and 36–39). Open the eleven-file workbook, check the seed/horizon settings and prepare the arrival/bill trace and a memoryless counterexample for Thursday's review.
- **90 minutes — consolidation and assessment:** Finish the Date transition model, compare errors and preserve the separate observation export. Write the model-limit explanation for the final project.

Together this is about **six hours: 60 + 90 + 210 minutes**. Slides and full-length exercises outside the lecture selection are independent study unless assigned in the tutorial’s four blocks. Use the worked answers to check an attempt; optional extensions can use consolidation time. The complete route below reuses this material and adds no scheduled meeting or extra three-hour study requirement.

<span id="three-hour-teaching-route"></span>

## Complete teaching pack

The full **50-slide pack** and all worked notes remain the complete resource. This **180-minute reference route includes a ten-minute break** for someone facilitating the whole pack in one sitting. It is separate from the scheduled selections above: the break slide is skipped in the 60-minute lecture and the tutorial keeps its own 90-minute plan. These are facilitation estimates, including practical work and debriefs.

| Elapsed time | Slides | Work and evidence |
| --- | --- | --- |
| 0–30 min | 1–10 | Reuse the handover, define states, inspect row sums and orientation. |
| 30–65 min | 11–19 | Derive two-step probabilities, audit denominators and solve an absorption extension. |
| 65–75 min | 20 | Break. |
| 75–110 min | 21–29 | Trace categorical draws, reproduce counts and compare errors. |
| 110–145 min | 30–39 | Change one row, critique memorylessness and challenge the tests. |
| 145–180 min | 40–50 | Resolve the bill exercise, preserve withdrawal and prepare Week 11's evidence. |

This is a facilitation estimate. Faster groups can spend another 15–20 minutes starting from A, deriving expected absorption steps, or repeating the comparison at a different horizon. These are optional extensions, not additional assessment tasks.

## Carry the agreement across, then observe arrival

Bring the [Week 9 Offline handover plan](/lectures/week-09/) and [Week 7 Communication state machine](/lectures/week-07/). Alex's fixed facts still apply: an adult CS student, board games and terrible puns, a possible relationship, Friday 5–7 pm, bus travel and $20 total. No new biography or recipient preference is required.

The workbook constructs the actual earlier conversation and threat-review snapshots, records the authored clearance branch, then replays Week 9's proposal and both confirmations. It calls the existing `handoverForDate` function. An unconfirmed, held, cancelled or expired handover cannot be passed off as accepted. The earlier candidate, invitation and cost version remain attached.

The resulting meeting starts as **awaiting-arrival**. A confirmed plan is evidence of a plan agreement, not arrival. Our separate arrival event explicitly records both fictional actors at **17:20 on Friday 7 May 2027**. This continues the earlier authored scenario; it is not a report of an actual meeting or a new change to the teaching dates. The meeting's event clock is minutes since midnight on that day. A Markov step, by contrast, has **no duration in minutes**.

## Define the state space before using the matrix

| State | Exercise meaning | Important boundary |
| --- | --- | --- |
| C | Conversation continues | No quality, attraction or consent score. |
| A | “Awkward silence”, the original toy label | An authored state, not an inferred emotion or diagnosis. |
| N | Mutually agreed next date | A narrowly defined model endpoint, not a grade or real forecast. |
| E | Meeting ended before reaching N | A legitimate ending, not personal failure. |

N and E are **absorbing**: the simulated path stays there after first entry. This freezes the first endpoint for counting. A real meeting can end after a next-date agreement, and a person can withdraw that agreement. Our observation record can therefore say both “meeting ended” and “next date agreed”, or record a later decline. It is deliberately richer than the four-state calculation.

The Markov assumption is that the distribution of the next state depends only on the current one. We also hold the transition probabilities constant across steps. These are separate simplifications: neither follows from having four labels. [MIT's matrix lecture, slides 3–4](https://ocw.mit.edu/courses/6-262-discrete-stochastic-processes-spring-2011/2fdbd4633466ba1429e7cc24bce37514_MIT6_262S11_lec07.pdf) gives the matrix-power method; the dating labels and every number here are course inventions.

## Read source rows and destination columns

Use C/A/N/E order for **both axes**. Entry P[i,j] is the probability of going from i to j in one step.

| From / to | C | A | N | E |
| --- | --- | --- | --- | --- |
| C | 0.50 | 0.20 | 0.20 | 0.10 |
| A | 0.30 | 0.30 | 0.10 | 0.30 |
| N | 0 | 0 | 1 | 0 |
| E | 0 | 0 | 0 | 1 |

Each **row** is non-negative and sums to one. The columns need not: their sums are 0.80, 0.50, 1.30 and 1.40. A validator that demands stochastic columns would reject this valid row convention. With a row vector v, compute **v(next) = vP**, or component j = sum over i of v[i] × P[i,j]. Do not update v in place while still reading its old components.

**Exercise — 5 minutes.** A proposed C row is (0.50, 0.20, 0.30, 0.10). Explain its error and make one labelled repair. Then identify whether an implementation using P[j,i] has changed the model or only changed notation.

**Debrief.** The row sums to 1.10. Returning N to 0.20 restores the supplied baseline; another repair defines a different scenario and must be named. Using P[j,i] while retaining the row-vector update transposes the transition rule. With initial C it yields (0.50, 0.30, 0, 0), losing mass immediately. A consistently reformulated column-vector convention is possible, but mixing conventions is a bug.

## Derive the two-step oracle

Start at C: **v₀ = (1, 0, 0, 0)**. After one step, **v₁ = (0.50, 0.20, 0.20, 0.10)**. To reach N after two steps, partition by the intermediate state:

| Two-step path ending in N | Contribution |
| --- | --- |
| C → C → N | 0.50 × 0.20 = 0.10 |
| C → A → N | 0.20 × 0.10 = 0.02 |
| C → N → N | 0.20 × 1 = 0.20 |
| C → E → N | 0.10 × 0 = 0 |
| Total | **0.32** |

The 0.20 already in N stays there. Dropping that term counts only new entries on step two, which answers a different question.

**Exercise — 7 minutes.** Calculate C, A and E yourself. Keep the four intermediate-state terms visible, even when some are zero. Check the final sum before comparing with the reference.

**Debrief.** C = 0.50×0.50 + 0.20×0.30 = **0.31**. A = 0.50×0.20 + 0.20×0.30 = **0.16**. E = 0.50×0.10 + 0.20×0.30 + 0.10×1 = **0.21**. Thus **v₂ = (0.31, 0.16, 0.32, 0.21)**, summing to 1. Starting from A instead yields (0.24, 0.15, 0.19, 0.42), a useful independent orientation check.

At step two, N+E = **0.53**, while C+A = **0.47** remains in transient states. Reporting 0.32/0.53 ≈ **60.38%** describes N conditional on having reached either endpoint by this horizon. The unconditional N probability is **32%**. Dropping transient paths changes the denominator. Neither percentage measures real romantic outcomes.

## A finite horizon is not eventual absorption

In this fixture, a path in C has probability 0.70 of remaining in C/A for the next step, and one in A has probability 0.60. Remaining transient for k steps is therefore at most **0.70ᵏ** from either transient start. This tends to zero; eventual absorption follows for this matrix. Merely including an absorbing state would not prove it was reachable from every start.

[MIT's absorption-probability explanation](https://ocw.mit.edu/courses/res-6-012-introduction-to-probability-spring-2018/0b73394616a1df985f43adfe64810bed_vEsUsaK1HBk.pdf) uses first-step equations and boundary values. Apply that method to our fixture. Let x be eventual N probability starting from C and y the same probability starting from A:

```text
x = 0.50x + 0.20y + 0.20
y = 0.30x + 0.30y + 0.10
```

**Exercise — 6 minutes.** Rearrange and solve the two equations. Explain why x need not equal the two-step value.

**Debrief.** The system is 0.50x − 0.20y = 0.20 and −0.30x + 0.70y = 0.10. Its determinant is **0.29**; x = **16/29 ≈ 0.551724**, y = **11/29 ≈ 0.379310**. Starting from C, eventual E probability is **13/29**. The extra N mass arrives after step two. This is not evidence that waiting longer makes a person agree.

An optional extension replaces the terminal reward with one step of elapsed model time: tC = 1 + 0.50tC + 0.20tA and tA = 1 + 0.30tC + 0.30tA. The answers are **90/29** and **80/29 steps**. They are not minutes and must not replace Week 9's 50-minute meeting or travel budget. A closed C/A class makes this particular linear solve singular; the workbook rejects it rather than claiming certain absorption.

## Sample one transition, then reset each path

Partition the unit interval using a row's cumulative probabilities. For C, use **[0,0.50)** for C, **[0.50,0.70)** for A, **[0.70,0.90)** for N and **[0.90,1)** for E. Draw u in [0,1); choose the first cumulative total strictly greater than u. Conditional on a uniform draw, each interval receives its own length in probability mass.

**Exercise — 4 minutes.** Map u = 0, 0.50, 0.70 and 0.90. Then use u = 0 with the N row. Why is `u <= cumulative` an unsafe substitution?

**Debrief.** The C-row destinations are C, A, N and E. The N row must produce N even at u = 0. A non-strict comparison can select its first zero-probability cell, creating an impossible outgoing transition. The implementation validates sums within 10⁻¹² and gives any final floating-point remainder to the last positive cell; it never deliberately draws a zero-mass tail.

For reproducibility, the supplied teaching generator uses an unsigned 32-bit state: advance with **(1664525 × state + 1013904223) modulo 2³²**, then divide by 2³². The seed is **402010**; the first state word is **154701297**. The code uses 32-bit integer multiplication. This small deterministic generator is not cryptographic and a seed is not a guarantee of statistical quality.

Reset every path to C, take exactly two transitions, then count its final state. Use **one draw per step even after absorption**, so each path consumes two draws. Keep the generator running across paths; do not reseed each path or carry the previous path's terminal state into the next. The ideal simulation assumes independent paths; a finite pseudorandom stream approximates that sampling model. Repeatability alone cannot establish independence.

## Compare counts with the exact distribution

Both runs restart seed 402010. Consequently the 1,000-path run is a prefix of the 10,000-path run; these two estimates are not independent replications.

| State | Exact | Count / 1,000 | Count / 10,000 |
| --- | --- | --- | --- |
| C | 0.31 | 310 | 3,108 |
| A | 0.16 | 167 | 1,606 |
| N | 0.32 | 297 | 3,182 |
| E | 0.21 | 226 | 2,104 |

Divide each count by its own run count. Report absolute error **|estimate − exact|** in probability units, not a relative percentage error.

| State | Error at 1,000 | Error at 10,000 |
| --- | --- | --- |
| C | 0 | 0.0008 |
| A | 0.007 | 0.0006 |
| N | 0.023 | 0.0018 |
| E | 0.016 | 0.0004 |

**Exercise — 5 minutes.** Explain why a test requiring every error to shrink would fail on this correct example. Convert N's larger-run error into percentage points, and identify what would happen if every path reused the first two draws.

**Debrief.** C's error increases from zero to 0.0008 while the other three shrink. N's error is **0.18 percentage points**. More paths do not guarantee monotonic improvement for every cell. Reseeding every path would replay one outcome 10,000 times. Verify literal counts and the sampling contract; do not make a flaky test that expects random estimates to equal the exact vector.

Under ideal independent Bernoulli indicators for endpoint N, the variance of its sample proportion is p(1−p)/n: the n indicator variances add and division by n² gives the result. With p = 0.32, the standard deviation is about **0.01475** at 1,000 and **0.004665** at 10,000. This square-root scaling describes sampling variation under the assumed model. It is neither a bound on every seeded error nor uncertainty about a real person's wishes.

## Change one row without losing probability

Move **0.10 from C→N to C→E**. The new C row is (0.50, 0.20, 0.10, 0.20); every other row stays fixed. This is a changed mathematical assumption. We have not established that any conversational tactic causes it.

**Exercise — 7 minutes.** Derive the new one- and two-step vectors before running the simulation. Predict which transient coordinates stay unchanged. Then explain why the N endpoint changes by more than 0.10.

**Debrief.** The new one-step vector is (0.50, 0.20, 0.10, 0.20); the new two-step vector is **(0.31, 0.16, 0.17, 0.36)**. N = 0.50×0.10 + 0.20×0.10 + 0.10×1 = 0.17. Its change is **−0.15**: −0.05 on C→C→N and −0.10 on C→N→N. E gains 0.15; the transient total stays 0.47.

At seed 402010 and 10,000 paths, changed counts are **(3108, 1606, 1711, 3575)**. The same draws couple the baseline and changed runs, so these are not independent samples either. The exact comparison establishes the model difference; a single seeded comparison does not measure a causal effect. The optional eventual-N calculation changes to **9/29 from C**, while expected absorption steps stay fixed because the C/A submatrix is unchanged.

## Topics, eye contact and omitted history

Suppose two histories both end in C: one follows a first board-game question, the other follows a topic somebody already declined to discuss. The four-state model assigns them the same next-step row. An actual protocol must preserve the explicit boundary. Adding state such as “topic declined” could represent that history, but its transition probabilities would still need justification. More states do not manufacture data.

**Exercise — 5 minutes.** Name a second pair of histories collapsed by C or A. State what extra information would distinguish them and whether collecting it is needed for the exercise.

**Debrief.** Time remaining or a newly changed plan can distinguish otherwise identical labels. Use an authored state extension to demonstrate the difference. Do not invent fatigue, attraction or discomfort labels from silence, eye-contact duration, disability or cultural difference. The A label is already supplied in the toy fixture; it is not permission to classify somebody's feelings. Body language can be described without turning it into a consent flag. No course-prescribed eye-contact duration establishes interest or agreement.

## Key concept: the “Who pays?” deadlock

The bill exercise starts with both fictional actors waiting for the other to raise payment. Repeated `wait` events leave bill status at **waiting**. Nothing in that loop clarifies the terms. An explicit question can make progress: “We agreed I would cover the two drinks. The bill is $12; is that still okay?” This wording refers to the authored cover-both proposal. It creates no expectation of another date.

[OSTEP's concurrency chapter, §32.3](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-bugs.pdf) explains resource deadlock and its four conditions: mutual exclusion, hold-and-wait, no preemption and circular wait. Our bill stalemate is a **limited analogy**. We have not identified operating-system locks or proved all four conditions. A person is not a resource to acquire, and forcing a response is not a valid “deadlock recovery” strategy.

Reuse the actual Week 9 cost object. Under `week-09-v1:atrium-cover`, Alex's drinks contribution is **$12**, the counterpart's is **$0**, and Alex's round-trip transport is **$2**, making **$14 total**. Counterpart transport remains unknown. The café bill contains the two drinks, so comparing it with Alex's $14 outing total would be a category error.

| Authored event | Bill status after event |
| --- | --- |
| Wait; wait again | waiting; waiting |
| Ask about the current version and $12 drink bill | asked |
| Alex acknowledges checked terms | asked |
| Counterpart acknowledges checked terms | acknowledged |

Acknowledged means the local record contains both coded acknowledgements. It is not a receipt and performs no payment. The program does not send the question. Actual language is reviewed by the student; coded observations are supplied, never inferred from a nod or silence.

**Exercise — 5 minutes.** The observed drink bill is $14, or its amount is unknown. Can the old $12 cost object allocate it? Can a pending bill prevent either actor from leaving?

**Debrief.** Both cases enter **review**. Do not silently assign the extra cost, switch to splitting, or treat an unknown amount as zero. Clarify changed terms and obtain a separate renewed agreement; this bounded workbook deliberately does not invent one. A prior $6/$6 split would also need its own confirmed version. Leaving remains available with a waiting, asked, acknowledged or review bill. Ending the meeting does not settle the bill; it preserves the unresolved status.

## Keep observation labels separate from simulated endpoints

The event exercise stores meeting status, bill status and next-date status separately. One explicit next-date agreement gives **pending**; two distinct actors agreeing give **agreed**. An explicit decline gives **declined**, including withdrawal after a previous agreement. With no relevant observation, the field stays **unobserved**. “Nice time” is not one of the coded answers.

The observation workflow can withdraw an agreement even though simulated N stays absorbing. They answer different questions: a frozen first endpoint in an assumed chain versus the latest explicit observation in a meeting record. A declined invitation cannot be retried by this reducer. Leaving makes the meeting snapshot terminal and later meeting events cannot revive it. Week 11 handles subsequent follow-up as a separate record and must retain any explicit boundary.

Snapshots are local teaching records from the supplied constructors, not tamper-proof evidence. Unique event IDs, current plan versions and chronological times are checked; an exact serialized duplicate is a no-op, while conflicting IDs fail. JSON property order is part of this simple duplicate convention. There is no live clock, external inbox, identity verification or automatic observation collection.

## Run and challenge the workbook

Save these **eleven files together**, keeping their names:

- [Week 10 cases](/data/week-10-cases.json), [model functions](/data/week-10-models.mjs) and [executable report](/data/week-10-worked-examples.mjs).
- [Week 9 cases](/data/week-09-cases.json) and [handover functions](/data/week-09-models.mjs).
- [Week 8 cases](/data/week-08-cases.json) and [review functions](/data/week-08-models.mjs).
- [Week 7 conversation functions](/data/week-07-models.mjs), [Week 6 classifier](/data/week-06-models.mjs) and [Week 5 feasibility functions](/data/week-05-models.mjs).
- [Existing reference models](/data/romance-models.mjs).

Run `node week-10-worked-examples.mjs` offline. It prints exact/seeded comparisons and six event histories: agreed, unobserved, pending, withdrawn, changed bill and leaving before arrival. It checks literal answers and the existing `dateTransitions(2)` reference. The imports actually execute the earlier workflow; a copied “confirmed: true” flag would not demonstrate the dependency.

Test zero steps, initial A, N/E starts, invalid row sums, negative probabilities, half-open draw boundaries, seed limits, independent path resets and exact counts. In the event model test missing arrival, stale cost versions, duplicate actors, unknown bills, withdrawal and complete terminal snapshots. Tests can establish implementation behaviour, not the plausibility of assumed probabilities.

Make two checks fail deliberately: transpose P[i,j] inside the row-vector update, then separately replace the categorical `<` with `<=`. Assert each edit matched exactly once, observe the specific literal test fail, restore, and rerun. Do not retain either mutation. Keep the finite-horizon oracle even after adding an eventual-absorption solver: agreement between two wrong implementations is insufficient.

## Hand over to Week 11

Save the **Date transition model** with the matrix and state definitions, handwritten two-step contributions, generator/draw contract, seed and counts, absolute-error table, changed-row result, tests and one memoryless counterexample. Include the confirmed cost version, arrival observation, bill trace and separate next-date labels.

The [Week 11 follow-up evaluation](/sessions/11-follow-up/) needs to distinguish agreed, declined, pending and unobserved evidence. C/A mass at a simulation horizon is not an observed person's silence; N counts are not real second dates. Week 11's separate **115-minute** time-allocation fixture must not be replaced with model steps or Week 9's 90-minute itinerary.

These exact and seeded Markov results belong in the final project's existing [validation appendix](/assessments/profile-deployment/), alongside the earlier artefacts. The project remains **50%, due 28 May 2027 at 5 pm**. Evidence and reproducibility are assessed; romantic outcomes are not.

**Exit ticket.** Repair three claims: “absorbing N means agreement cannot change”; “10,000 paths must improve every error”; “acknowledging a bill buys another date.” Keep the mathematical endpoint, the sampling caveat and the explicit human boundary visible in your answers.

[Continue to the Week 10 tutorial](/sessions/10-date-simulation/).
