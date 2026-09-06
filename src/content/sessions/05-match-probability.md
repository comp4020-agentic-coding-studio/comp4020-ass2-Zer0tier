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

Bring the **Platform audit** and **Bio experiment protocol**, including the frozen **A-portrait-v1** photo and supported candidate text. Preserve the exposure definitions: a Week 4 positive response is not a mutual match. Download the [five-file Week 5 workbook](/lectures/week-05/#run-the-worked-calculations), or use its tables in a spreadsheet or your preferred language. No app account or real profiles are needed.

## 90-minute tutorial

1. **25 minutes — calculate and break the model.** Use the 100-pair table to derive joint 0.06, marginal P(B) = 0.13, and reverse conditional 6/13. For twenty new opportunities, reproduce expected 1.2 and 1 − 0.94²⁰ ≈ 70.99%. Test zero opportunities and probabilities 0 and 1. Replace independence with one shared draw: preserve expectation but obtain 6% chance of any. Explain both independence assumptions.
2. **20 minutes — constrain geography.** Audit the three supplied invented routes using whole-outing time and Alex's total cost. Library is 100 minutes/$14 and feasible; Arcade is 130 minutes/$16 and fails time; Riverside is 90 minutes/$22 and fails budget. Trace the itinerary and test exactly 120 minutes/$20, then 122 minutes/$20.01. Keep an explicit reason for each failed constraint and compare the two twenty-opportunity strategies.
3. **20 minutes — compare time windows.** Reproduce Sunday 8/40 and Tuesday 3/10, including count and rate ratios. Repair the misleading Sunday headline and the confounded time-experiment proposal. Declare frozen inputs, simulated allocation, complete outcome windows, fixed stop and the generator still needed. Do not treat the supplied counts as trial outcomes for that proposal.
4. **25 minutes — freeze the project target.** Attach evidence to your candidate's four feature ratings. Run the unchanged 99 controls with the primary score and conservative tie rule from the [benchmark](/toolkit/#benchmark). Verify illustrative ranks 2/100 at score 93.75 and 1/100 at score 100. Save the dated objective record, then exchange or self-review it for reproducibility and unsupported claims.

The lecture's [180-minute route](/lectures/week-05/#a-180-minute-teaching-route) includes explanations, debriefs and a break around these practical tasks. Bring work already completed in the lecture for review instead of doing the exercise twice. Solo implementation and review are accepted.

## Deliverable: Match probability model

Commit one notebook or equivalent bundle containing the pair-table trace, repeated-model calculations, boundary checks, dependence counterexample, venue decisions and corrected Sunday claim. Include the checked invitation and a dated primary-objective record: exact candidate and photo versions, input/control fingerprints, four evidence-backed ratings, score formula, 100-entry denominator and `>=` tie rule. Preserve the Week 11 sensitivity plan and the baseline before revision.

Keep `qualityScore` and `jointMatchProbability` as separately labelled outputs. A literal example should retain **93.75** for the illustrative rubric vector and **0.06** for the assumed joint event; there is no conversion between them. Test invalid probabilities, missing conditioning denominators, exact time/budget boundaries and 0/0 exposure rates. Attach expected answers, actual results and a brief explanation of what a passing check cannot validate.

Worked answers are in the [lecture notes](/lectures/week-05/) and executable workbook. Correct arithmetic does not certify independence, source validity, venue reliability or the quality of your rating evidence.

Week 6 needs the same supported candidate and feasible invitation, with recipient availability still unknown and refusal terminal. Week 11 will evaluate this frozen version before making revisions.
