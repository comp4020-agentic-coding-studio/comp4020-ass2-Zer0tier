---
title: "The Mathematics of the \"Match\""
description: "Calculate mutual-selection probabilities, constrain the travel radius and separate peak Sunday exposure from a higher match rate."
week: 5
date: 2027-03-25
teachers: [eli-brooks]
phase: Model
output: "Match probability model"
buildsOn: ["sessions/02-platforms","sessions/04-bio-experiment"]
related: ["lectures/week-05","sessions/02-platforms","sessions/04-bio-experiment"]
spec:
  - "The joint event is 0.06 under stated conditional probabilities; quality score is not a match probability."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Inputs

Bring the **Platform audit** and **Bio experiment protocol**, including the frozen photo and candidate text.

## 90-minute tutorial

1. **25 minutes — calculate the joint event.** Use P(A) = 0.30 and P(B given A) = 0.20. Derive 0.06 per exposure, expected 1.2 across twenty, and 1 − 0.94²⁰ only under independent repeated events.
2. **20 minutes — constrain geography.** Give three invented venues travel times and total costs. Reject any violating Alex's Friday window or $20 budget before ranking preferences.
3. **20 minutes — compare time windows.** Analyse Sunday 8/40 and Tuesday 3/10. Separate total matches, match rate and exposure; neither identifies a time-of-day effect.
4. **25 minutes — freeze the project target.** Record candidate version, four feature ratings with evidence, controls version, denominator and conservative tie rule from the [benchmark](/toolkit/#benchmark).

## Deliverable: Match probability model

Commit the equations, assumptions, venue decisions and a dated primary-objective record. Include a test showing that a high quality score does not get interpreted as a match probability.

Week 6 needs the same supported candidate and feasible invitation; week 11 will evaluate this frozen version before making revisions.
