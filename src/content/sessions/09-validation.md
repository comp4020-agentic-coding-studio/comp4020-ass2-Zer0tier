---
title: "Validation after the leaderboard honeymoon"
description: "Freeze the candidate, change the evaluation conditions and keep the result even when the rank gets worse."
week: 9
date: 2027-05-06
teachers: [eli-brooks]
phase: Ship
output: "Validation report"
buildsOn: ["sessions/05-objectives","sessions/08-feedback"]
related: ["lectures/week-09","sessions/05-objectives","sessions/08-feedback"]
spec:
  - "Primary and shifted scores are 81.25 and 70 for (4,4,1,4); all controls are rescored under the same rule."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Use the Objective specification and Exposure simulator

Check the week 5 commit before calculating anything. If the counter-rule was not frozen, declare this exploratory analysis; do not backdate it.

## 90-minute lab

Use 20 minutes to recompute candidate and controls with doubled feasibility. Spend 25 minutes rescoring the unchanged text after Alex's availability moves to Saturday. Use 20 minutes comparing balanced and greedy response logs from week 8. Spend the final 25 minutes writing a release decision with a concrete failure threshold.

Confirm (4,4,1,4) scores **81.25** under the primary rule and **70** under the shifted one. Keep both results.

## Deliverable: Validation report

Save the original candidate hash, both ranking tables, the changed-case evidence records and a decision. Include one paragraph distinguishing exploratory revision from untouched evaluation.

Week 10 tests whether your candidate's proposed date is logistically feasible; a high rubric score does not reserve a bus seat.
