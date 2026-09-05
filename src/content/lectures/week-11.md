---
title: "Post-Date Analytics and The \"Second Date\" Metric"
description: "Separate observed agreement from inferred subtext. Audit the time budget, evaluate a frozen profile and prepare a reproducible release."
week: 11
date: 2027-05-17
teachers: [mira-chen]
keyConcept: "Calculating Return on Investment (ROI) of time spent vs. romantic viability"
related: [sessions/11-follow-up]
---

## The dashboard after the date

A first date produces sparse observations, not a labelled training set. “I had a nice time” is text someone said; it does not specify whether they want another date. Ask a clear optional follow-up rather than training a subtext classifier on one sentence.

Our fictional log contains 90 minutes together, 20 minutes of travel and five minutes composing a follow-up: **115 minutes** total. Record a second date only when both explicitly agree. Pending, declined and unobserved are distinct states; an observation window ending does not make pending equal to rejection.

## Key concept: return on investment

ROI here is a critiqueable allocation model for **your own time**, not a price assigned to another person. If an invented benefit is 10 units and the time cost is 115 minutes, 10/115 ≈ **0.087 units/minute**. The arithmetic is defined; the “benefit” is assumed. Change that assumption before announcing romantic viability.

Use week 7's model to compare one clarification, waiting and stopping. No universal follow-up delay follows from the calculation. A refusal is terminal regardless of projected returns. Continuing requires mutual interest, not a sunk-cost argument.

## Evaluate before revising

Freeze the week 5 candidate and run the [100-entry benchmark](/toolkit/#benchmark). Then double feasibility's weight for candidate **and all controls**. A feature vector (4,4,1,4) changes from **81.25** to **70** because the weighted denominator changes from 16 to 20.

Next, change Alex's available time in a clearly separate fictional case and audit which statements break. Report the original result before revising the profile. [scikit-learn's leakage guidance](https://scikit-learn.org/stable/common_pitfalls.html#data-leakage) explains why evaluation data should not quietly steer the supposedly untouched model.

Bring the date-transition model and offline plan. Produce the follow-up evaluation plus a labelled static release candidate, test keyboard access and both marking viewports, and keep one disappointing result. Week 12 needs something reproducible to maintain.

[Continue to the week 11 tutorial](/sessions/11-follow-up/).
