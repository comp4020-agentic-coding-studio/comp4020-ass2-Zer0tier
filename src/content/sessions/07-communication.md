---
title: "Game Theory and Asynchronous Communication"
description: "Model reply arrivals, response games and ghosting as an observation timeout. A refusal remains terminal even when expected utility disagrees."
week: 7
date: 2027-04-22
teachers: [eli-brooks]
phase: Model
output: "Communication state machine"
buildsOn: ["sessions/05-match-probability","sessions/06-message-tree"]
related: ["lectures/week-07","sessions/05-match-probability","sessions/06-message-tree"]
spec:
  - "The model includes a terminal refusal state and distinguishes a Poisson assumption from an optimal reply time."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Inputs

Bring the **Message decision tree** and **Match probability model**. The previous invitation does not gain permission merely because time passes.

## 90-minute tutorial

1. **20 minutes — model arrivals.** Calculate exp(−0.4 × 2) ≈ 0.4493. Write the homogeneous Poisson assumptions and one reason a conversation may violate them.
2. **25 minutes — compare decisions.** Solve clarification 7q−5 versus waiting 2q−1 versus stopping 0. Test q = 0.5, 0.8 and 0.9, including ties.
3. **20 minutes — inspect the game.** Trace best responses in the lecture's Ask/Wait payoff table. Change Ask/Ask to (−1,−1) and explain why Ask no longer strictly dominates.
4. **25 minutes — implement latency.** Use sent, pending, replied, declined and closed states. Test late arrival, timeout and refusal. A read receipt changes observed delivery state, not the permission to contact.

## Deliverable: Communication state machine

Save a transition table, utility working, payoff comparison and tests that a refusal stays terminal. Declare your observation window and any assumed double-text penalty.

The [midterm](/assessments/matchmaking-exam/) is **23 April, 11 am–12.30 pm**. Week 8 adds threat review to this machine, rather than creating a second incompatible messaging policy.
