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

Bring the **Offline handover plan** and **Communication state machine**. Arrival does not remove the stop state.

## 90-minute tutorial

1. **20 minutes — propagate exactly.** Build the lecture's C/A/N/E matrix. Starting at C, verify the two-step distribution (0.31, 0.16, 0.32, 0.21) with the [reference model](/toolkit/#reference-models).
2. **30 minutes — simulate.** Implement seeded categorical transitions for 1,000 and 10,000 independent two-step runs. Record seed, counts and absolute errors against the exact distribution. A larger run need not reduce every error on every seed.
3. **20 minutes — test sensitivity.** Move 0.10 probability from C→N to C→E. Preserve row sums and absorbing states; recompute before simulating.
4. **20 minutes — review the metaphor.** Resolve the “Who pays?” case through the prior cost agreement. Give an example where memorylessness fails, and explain why eye contact cannot be a consent flag.

## Deliverable: Date transition model

Save the matrix, exact calculation, seeded code and error table. Include tests for probability conservation and no outgoing transition from N or E.

Week 11 uses the distinction between mutually agreed, ended and merely unobserved outcomes; it does not treat your simulated distribution as measured romantic evidence.
