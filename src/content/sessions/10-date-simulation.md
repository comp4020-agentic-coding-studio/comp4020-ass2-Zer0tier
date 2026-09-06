---
title: "Stochastic Modeling of the First Date"
description: "Propagate a fictional conversation through a Markov chain, check a simulation against exact probabilities and resolve the Who pays deadlock."
week: 10
date: 2027-05-13
teachers: [eli-brooks]
phase: Ship
output: "Date transition model"
buildsOn: ["sessions/07-communication","sessions/09-offline-handover"]
related: ["lectures/week-10","sessions/07-communication","sessions/09-offline-handover"]
spec:
  - "Two-step C/A/N/E probabilities are 0.31, 0.16, 0.32, 0.21; agreed and ended states remain absorbing."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Inputs

Bring the **Offline handover plan** and **Communication state machine**, including the current cost version and explicit stop boundaries. Use the [Week 10 notes and eleven-file offline workbook](/lectures/week-10/#run-and-challenge-the-workbook). The report constructs the actual earlier snapshots and confirms Week 9's authored Atrium proposal; it then records arrival separately. A confirmed plan does not prove arrival, and arrival does not remove the stop state.

All transition probabilities, bills and responses are authored. No real meeting, private messages, payment or personal disclosure is needed. The event fixture continues Friday 7 May's fictional plan; the tutorial remains Thursday 13 May. Model steps have no duration in minutes.

## 90-minute tutorial

1. **20 minutes — propagate exactly.** Spend five minutes defining source rows and destination columns, ten deriving all two-step contributions, and five checking conservation. Starting at C, verify (0.31, 0.16, 0.32, 0.21) with the [reference model](/toolkit/#reference-models). Keep already-absorbed mass in N/E. Explain why discarding C/A gives a different denominator.
2. **30 minutes — simulate.** Spend ten minutes tracing half-open categorical intervals, twelve implementing 1,000 and 10,000 two-step paths, and eight comparing errors. Reset each path to C; the ideal model assumes independent paths. Use seed 402010 and the supplied unsigned LCG for the literal checkpoint. Consume two draws per path, including after absorption. Record seed, generator, horizon, counts and absolute errors. Restarting the same seed makes the small run a prefix of the large run, not an independent replication.
3. **20 minutes — test sensitivity.** Spend eight minutes moving 0.10 from C→N to C→E and recomputing exactly, six comparing changed simulation counts, and six testing a deliberate mutation and restoration. Preserve row sums and absorbing states. Explain the 0.15 change in two-step N using separate paths. A matrix change is an assumption, not evidence that a topic causes better outcomes.
4. **20 minutes — review the metaphor.** Spend six minutes constructing the confirmed handover and arrival record, seven resolving the “Who pays?” case through its actual costs, and seven comparing observation labels and a memoryless counterexample. Test leaving with an unresolved bill and withdrawing a previous next-date agreement. Explain why eye contact cannot be a consent flag and why bill acknowledgement is not payment or an obligation to meet again.

## Worked checkpoints

Use C/A/N/E order consistently. Errors below are absolute differences in probability units.

| Check | Literal expected result |
| --- | --- |
| One step from C | (0.50, 0.20, 0.20, 0.10) |
| Two steps from C | (0.31, 0.16, 0.32, 0.21) |
| Two steps from A | (0.24, 0.15, 0.19, 0.42) |
| 1,000 paths, seed 402010 | Counts (310, 167, 297, 226); errors (0, 0.007, 0.023, 0.016). |
| 10,000 paths, same seed | Counts (3108, 1606, 3182, 2104); errors (0.0008, 0.0006, 0.0018, 0.0004). |
| Changed two-step vector | (0.31, 0.16, 0.17, 0.36) |
| Changed 10,000-path counts | (3108, 1606, 1711, 3575) |
| Transient mass at step two | 0.47 in both scenarios. |
| Bill trace | waiting → waiting → asked → asked → acknowledged. |

C's simulation error grows from zero to 0.0008 in the larger run. A correct sampler need not improve every cell on every seed. N's larger-run baseline error is 0.18 percentage points. Keep the counts as well as rounded estimates so another student can reproduce the table.

## Review the bill and observation record

Call the existing Week 9 export on a currently confirmed handover. The meeting initially remains **awaiting-arrival**; record both authored arrivals before proceeding. Keep `week-09-v1:atrium-cover`: Alex covers $12 in drinks and $2 transport, $14 total. Counterpart drinks are $0; counterpart transport is unknown. The café bill should be compared with $12, not Alex's whole outing cost.

Replay the two waits, the explicit question about $12 and the two actor/version acknowledgements. Acknowledged records the supplied answers; it does not take payment. Change the drink bill to $14 or unknown: status becomes **review**. Do not allocate the difference using stale terms. Clarify and obtain a separate renewed agreement; either actor can leave while the bill remains unresolved.

Keep meeting status separate from next-date status: no relevant observation gives **unobserved**, one agreement **pending**, two distinct agreements **agreed**, and an explicit decline or withdrawal **declined**. “Nice time”, eye contact and simulated N are not agreement events. A decline cannot be retried. Leaving keeps the complete meeting snapshot terminal.

The absorbing N/E convention freezes the first endpoint in the probability exercise. It does not make a person's agreement irrevocable. Discuss two histories mapped to C that need different next actions, such as a topic being new versus explicitly declined. Use authored examples; adding a state does not justify inventing its probabilities.

## Make one check fail

Temporarily transpose P[i,j] in the row-vector update, asserting the edit matched. The literal one-step result must fail: initial C would become (0.50, 0.30, 0, 0). Restore and verify the passing result.

Alternatively replace categorical `<` with `<=`. A draw of zero from (0, 0, 1, 0) must still choose N; the mutation incorrectly selects a zero-mass destination. Restore it and retain the failure and passing output. Also test zero steps, invalid probabilities, N/E starts, missing arrival, stale versions, duplicate actors and terminal snapshots.

If you finish early, solve the first-step absorption equations. Eventual N from C is **16/29**, changing to **9/29** in the sensitivity case. Expected absorption from C is **90/29 steps**, not minutes. Explain why the finite-horizon vector answers a different question.

## Deliverable: Date transition model

Save the state definitions and matrix, handwritten exact calculation, seeded code with draw contract, both count/error tables, sensitivity result, conservation and absorbing-state tests, one mutation/restoration result and one memorylessness critique. Include the actual cost version, arrival observation and bill/next-date trace. These form one **Date transition model**, not an extra essay or assessment.

[Week 11](/sessions/11-follow-up/) uses the distinction between mutually agreed, declined, pending and unobserved outcomes while retaining the fact that the meeting ended. It does not treat your simulated distribution as measured romantic evidence. Its separate 115-minute time log must not be replaced by model steps or the earlier 90-minute itinerary. Keep this exact/seeded comparison for the final project's existing [validation appendix](/assessments/profile-deployment/).
