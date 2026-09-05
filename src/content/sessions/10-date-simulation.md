---
title: "Stochastic modeling of the first date"
description: "Simulate cost, timing and fallback choices. The output is a distribution of logistics, not a probability of love."
week: 10
date: 2027-05-13
teachers: [eli-brooks]
phase: Ship
output: "Date simulation"
buildsOn: ["sessions/04-features","sessions/09-validation"]
related: ["lectures/week-10","sessions/04-features","sessions/09-validation"]
spec:
  - "The exact independent and conditional failure probabilities are 0.025 and 0.10 at a 110-minute limit."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Use the Feature contract and Validation report

Take the invitation actually present in your candidate profile. First reproduce the supplied Alex case; then state any changes needed for your own truthful wording.

## 90-minute lab

Spend 20 minutes enumerating the four independent states. Use 25 minutes running 10,000 trials with seed 4276 and calculating Monte Carlo error. Spend 20 minutes changing to the conditional-closure model. Use the last 25 minutes proposing and testing a fallback, such as shortening the planned visit by ten minutes.

For the supplied case, check exact baseline failure is **0.025** at a 110-minute limit and **0.10** under conditional closure. The simulator should approach those values, not match them perfectly on every seed.

## Deliverable: Date simulation

Keep assumptions with units, exact-state calculation, seed, code, empirical result, uncertainty and fallback comparison. Explain why the output measures logistics rather than romantic success.

Week 11 will attach this feasibility evidence to the release. If the invitation fails the case constraints, revise it visibly instead of replacing the inconvenient simulation.
