---
title: "Stochastic Modeling of the First Date"
description: "Propagate a fictional conversation through a Markov chain, check a simulation against exact probabilities and resolve the Who pays deadlock."
week: 10
date: 2027-05-10
teachers: [mira-chen]
keyConcept: "Navigating the “Who pays?” deadlock"
related: [sessions/10-date-simulation]
---

## A first date, represented badly but explicitly

Model conversation as a Markov chain: the next state depends only on the current state. That memoryless assumption is a limitation to investigate, not a discovery about people.

Use four **fictional states**: C = conversation, A = awkward silence, N = mutually agreed next date, E = meeting ended. In this exercise N is the narrowly defined “success” state; E is a legitimate ending, not a personal failure. Both are absorbing.

Our invented transition probabilities are:

- From C: C 0.50, A 0.20, N 0.20, E 0.10.
- From A: C 0.30, A 0.30, N 0.10, E 0.30.
- From N: N 1.00.
- From E: E 1.00.

Starting in C, one step gives (0.50, 0.20, 0.20, 0.10). After two, the exact distribution is **(0.31, 0.16, 0.32, 0.21)**. Simulate the same two steps and compare with this oracle before increasing the run count.

## Topics, eye contact and omitted state

Assign a conversational topic to a proposed transition rule, then explain what disappears: history, context, fatigue and changing preferences. Body language and eye-contact duration can be described as observations; there is no course-prescribed duration that establishes interest or consent. Avoid turning disability or cultural difference into an anomaly score.

## Key concept: the “Who pays?” deadlock

Two silent processes waiting for the other to commit can remain blocked. Resolve the bill with an explicit question and the cost-sharing proposal from week 9—not a hidden test of generosity. End the interaction if either person wants to leave.

In the lab, implement exact propagation and seeded Monte Carlo, report the error at two steps, and change one transition row while preserving its sum. Keep N and E absorbing. A model that retries a declined invitation has failed its boundary condition, even if its simulated success rate rises.

[Continue to the week 10 tutorial](/sessions/10-date-simulation/).
