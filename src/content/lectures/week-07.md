---
title: "Game Theory and Asynchronous Communication"
description: "Model reply arrivals, response games and ghosting as an observation timeout. A refusal remains terminal even when expected utility disagrees."
week: 7
date: 2027-04-19
teachers: [mira-chen]
keyConcept: "Managing latency and read-receipt strategy"
related: [sessions/07-communication]
---

## Nobody owes your queue a service-level agreement

Texting is asynchronous. Sending, delivery, reading and replying are different events; a read receipt exposes one event, not the reason for the next. Define “ghosting” operationally as an unresolved conversation passing a declared observation window—a silent connection timeout, not a diagnosed intention.

## Poisson counts, not a stopwatch for affection

Under a **toy homogeneous Poisson arrival model**, with rate λ = 0.4 events/hour, the probability of zero arrivals in two hours is exp(−0.8) ≈ **0.4493**. [SciPy's Poisson documentation](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.poisson.html) states the count distribution. Constant rate and independent increments are assumptions; one person's replies need not satisfy them.

The number does not identify an optimal response time. Sleep, work and notification settings are omitted state. Treat any “double-texting penalty” as an explicit model parameter, not a measured social law.

## A response game you can change

Start with hypothetical utility functions: one clarification has utility 7q − 5, waiting 2q − 1, and stopping 0. Here q is an **assumed** probability that clarification would be welcome. Clarification beats both alternatives only when **q > 0.8**. Change its cost and the threshold moves.

This is a decision against uncertainty, not yet a two-player game. For the game extension, two fictional players choose Ask or Wait. Use payoffs Ask/Ask = (1,1), Ask/Wait = (2,0), Wait/Ask = (0,2), Wait/Wait = (0,0). Ask strictly dominates Wait in this invented game. The conclusion comes from the payoffs, not a universal texting rule.

## Key concept: latency and read-receipt strategy

Extend week 6's tree into pending, replied, declined and closed states. A refusal moves directly to closed; no utility score overrides it. A timeout closes our observation log without authorising repeated contact.

The lab compares models and boundary cases. The [midterm](/assessments/matchmaking-exam/) follows on **23 April, 11 am**; bring assumptions as well as arithmetic.

[Continue to the week 7 tutorial](/sessions/07-communication/).
