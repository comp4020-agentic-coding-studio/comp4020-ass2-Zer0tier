---
title: "Validation after the leaderboard honeymoon"
description: "Freeze the candidate, change the evaluation conditions and keep the result even when the rank gets worse."
week: 9
date: 2027-05-03
teachers: [mira-chen]
related: [sessions/09-validation]
---

## The test set would like a little privacy

You have a candidate profile, a primary score and 99 controls. You also know the rubric. That makes Null Island v1 a transparent teaching benchmark, not a hidden test of generalisation. Calling its score “out-of-sample performance” would be incorrect.

Return to the **Objective specification** frozen in week 5. Preserve the primary leaderboard and evaluate a second rule: double feasibility's weight. Its score is 100 × (clarity + specificity + 2×feasibility + exit) / 20. Recompute *every control* under that same rule before ranking the candidate.

## A shift must change something meaningful

A candidate vector (4, 4, 1, 4) gets 81.25 under the primary score but 70 under the feasibility-weighted score. That is not a bug in arithmetic. The objective moved.

Now change Alex's Friday availability to Saturday morning. The wording is frozen, so its feasibility evidence may no longer support its previous score. Record a rescore against the changed facts; changing weights and changing evidence are two separate interventions.

The [scikit-learn guidance on leakage](https://scikit-learn.org/stable/common_pitfalls.html#data-leakage) explains the selection/evaluation boundary. Our transparent fixture cannot create independence by naming a variable `test`. If you revise after seeing the shift, label the result a new development iteration and preserve the failed evaluation.

## Rates are not rubric points

Use week 8's simulator logs to compare response rates under changed exposure allocation. Keep that result in a separate table from the profile quality scores. A model-generated response and a human-assigned feature score are different measurements.

## Before the lab

Bring the frozen objective, candidate text and simulator logs. Write the failure criterion before the run: what result would cause you to revise, postpone or reject release? The final project must include the least flattering valid result, not just a screenshot of rank 1.
