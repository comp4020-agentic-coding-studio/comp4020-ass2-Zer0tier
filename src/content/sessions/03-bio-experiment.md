---
title: "A/B testing Tinder bios: a statistical approach"
description: "Preregister a bio comparison, calculate uncertainty and watch a pooled winner lose inside every stratum."
week: 3
date: 2027-03-11
teachers: [eli-brooks]
phase: Measure
output: "Experiment protocol"
buildsOn: ["sessions/02-market"]
related: ["lectures/week-03","sessions/02-market"]
spec:
  - "Aggregate A wins 26% to 19%, but B wins within both zones; the balanced example has z about 1.33."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Use the Sampling notebook

Keep the zone definitions from week 2. Download [bio-exposures.csv](/data/bio-exposures.csv); this is a second, synthetic experiment fixture, not extra rows in the market census.

## 90-minute lab

Use 20 minutes to reproduce aggregate and within-zone rates. Spend 20 minutes explaining why averaging the two zone percentages answers a different question from pooling counts. In 25 minutes, draft an experiment with random assignment *within* zones and a fixed observation window. Use the final 25 minutes to compute the balanced example's z statistic and challenge a “ship B now” memo.

Use the [sandbox](/toolkit/#experiment) to check your arithmetic, not to shop for a threshold.

## Deliverable: Experiment protocol

Keep the two bio texts, named primary outcome, exposure unit, sample/stopping rule, stratification plan and a 200-word interpretation of the reversal. Include one reason a statistically detectable difference might not be useful.

This protocol supplies the experiment section of the report. Week 5 must keep its primary outcome; changing the objective after seeing a result requires a declared new experiment.
