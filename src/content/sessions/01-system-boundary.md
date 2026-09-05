---
title: "The Hinge algorithm & Elo score manipulation"
description: "Reverse-engineer the claim before the system. Implement a toy Elo update and separate observed behaviour from proprietary internals."
week: 1
date: 2027-02-25
teachers: [eli-brooks]
phase: Measure
output: "System boundary map"
buildsOn: []
related: ["lectures/week-01"]
spec:
  - "The first equal-rating win is 1216; proprietary platform internals remain explicitly unknown."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Inputs

Bring your toy Elo function and the two platform descriptions from [week 1](/lectures/week-01/). No account, profile screenshot or real swipe history is required.

## 90-minute lab

1. **15 minutes — draw the system.** Mark each variable controllable, observable or hidden. Separate recommendation exposure from a response after exposure.
2. **25 minutes — implement and test.** Starting at 1200, calculate a win and a loss against an unchanged 1200 comparison rating. Log the expected result before each update. Check the first win is 1216.
3. **25 minutes — attempt manipulation.** Replay the same simulated results with K = 16 and K = 64. Explain why a faster rating change says nothing about additional mutual interest.
4. **25 minutes — write the boundary.** Add a claim/source/unknown table. Label the Elo experiment as a toy model, not recovered Hinge code.

## Deliverable: System boundary map

Commit your diagram, function, three tests and a 150-word identification note to your own lab notebook. Solo work is the default; optional pair review examines the code, not anyone's dating history.

Next week's sampling notebook must use your distinction between being shown and being available. Keep that boundary in version control.
