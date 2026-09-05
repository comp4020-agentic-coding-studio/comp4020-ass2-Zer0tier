---
title: "Feedback loops: rich profiles get richer"
description: "Separate profile quality from exposure. Simulate how a ranking policy can manufacture its own evidence."
week: 8
date: 2027-04-29
teachers: [eli-brooks]
phase: Ship
output: "Exposure simulator"
buildsOn: ["sessions/03-bio-experiment","sessions/07-response-game"]
related: ["lectures/week-08","sessions/03-bio-experiment","sessions/07-response-game"]
spec:
  - "Each round allocates exactly 100 impressions and the stopping-state branch emits none to unavailable participants."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Retrieve the Experiment protocol and Response policy

Use the same named outcome as week 3. Preserve the terminal state from week 7; do not re-open it because the allocator needs more samples.

## 90-minute lab

Spend 20 minutes implementing the two allocation policies. Spend 25 minutes running seeds 1–20 under equal probabilities. Use 20 minutes repeating under pA = 0.2 and pB = 0.3. In the last 25 minutes, disable a synthetic participant after round 3 and inspect the eligibility filter.

At every round assert total impressions = 100, positives ≤ impressions, and no impressions for an unavailable participant in the separate stopping-state branch.

## Deliverable: Exposure simulator

Keep executable code, seeds, event schema, invariants and paired policy summaries. Show at least one seed where your intuition was wrong; if none exists, document the search rather than inventing one.

Week 9 will use these logs to test whether your profile decision survives a changed exposure mix.
