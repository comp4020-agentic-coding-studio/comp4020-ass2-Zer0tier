---
title: "Stochastic modeling of the first date"
description: "Simulate cost, timing and fallback choices. The output is a distribution of logistics, not a probability of love."
week: 10
date: 2027-05-10
teachers: [mira-chen]
related: [sessions/10-date-simulation]
---

## Love is not a Bernoulli variable. A late bus can be.

Alex's proposed Friday coffee must fit 5–7 pm and $20. We can model logistics without claiming to model chemistry.

Use these **fictional assumptions**: each bus leg costs $3; coffee costs $8; a regular trip takes 15 minutes each way; a late outbound bus adds 20 minutes with probability 0.25; a closed café requires a nearby alternative adding $6 and 10 minutes with probability 0.10; the visit itself takes 60 minutes. Assume the two events are independent for the first model.

## Enumerate before you simulate

Base cost is $14 and base elapsed time is 90 minutes. The late-only case takes 110 minutes. The closed-only case costs $20 and takes 100 minutes. Both events give $20 and 120 minutes. All four cases fit the original limits, including equality at the boundary.

Now change the time budget to **110 minutes**. Only the joint event exceeds it, so the model's exact failure probability is 0.25 × 0.10 = **0.025**. Expected cost is $14.60; expected time is 96 minutes. Report the threshold and the independence assumption alongside each number.

## A simulation needs an oracle

Generate 10,000 trials using a fixed seed. Compare the empirical failure rate with 0.025. For independent trials its estimated standard error is sqrt(p_hat × (1−p_hat) / N). An approximate interval describes Monte Carlo noise conditional on this model; it does not validate the invented probabilities.

Next, keep P(late) = 0.25 but make café closure conditional on a late bus: P(closed | late) = 0.4 and P(closed | on time) = 0. The marginal closure probability is still 0.10, but the events are no longer independent. The joint failure probability becomes 0.25 × 0.4 = **0.10**. Expected time remains 96 minutes; the chance of exceeding 110 minutes quadruples. A mean can hide a changed tail.

## Before the lab

Retrieve the profile's feasibility evidence and week 9 failure threshold. Bring an exact four-state table, a [binomial/random sampler](https://numpy.org/doc/stable/reference/random/generated/numpy.random.Generator.binomial.html) and one fallback that reduces a specific failure. “Be more spontaneous” is not executable pseudocode.
