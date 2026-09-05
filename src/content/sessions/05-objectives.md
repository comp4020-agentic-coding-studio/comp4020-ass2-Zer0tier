---
title: "Multi-objective romance & the top-1% problem"
description: "Freeze a scoring rule and a comparison set. Optimizing the metric is easy; defending the metric is the assessed part."
week: 5
date: 2027-03-25
teachers: [eli-brooks]
phase: Model
output: "Objective specification"
buildsOn: ["sessions/03-bio-experiment","sessions/04-features"]
related: ["lectures/week-05","sessions/03-bio-experiment","sessions/04-features"]
spec:
  - "Ranking uses 99 controls plus one candidate and counts ties against the candidate; the shifted rule is frozen before validation."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Use the Feature contract and Experiment protocol

Do not rewrite your features to fit whichever profile just won. Retrieve the [99 controls and scorer](/toolkit/#benchmark), and preserve the data version.

## 90-minute lab

Spend 20 minutes reproducing both profile scores and ranks. Spend 25 minutes finding a tie and showing the difference between optimistic and conservative rank. Use 20 minutes to draw a brevity/specificity Pareto comparison for three truthful candidate texts. In the final 25 minutes, freeze a primary rule and a counter-rule that doubles feasibility's weight.

## Deliverable: Objective specification

Save the formula, denominator, tie policy, two ranked candidates, one adversarial example and the preregistered shifted rule. Hash or commit the artefacts so a later change is visible.

The matching lab will ask whether independently high-scoring profiles form a compatible pair. The final project must report rank even when the target fails; rank itself carries no marks.
