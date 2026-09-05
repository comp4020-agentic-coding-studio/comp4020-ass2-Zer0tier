---
title: "The local singles market has a denominator"
description: "Define an addressable pool on fictional Null Island. Trace selection bias before announcing a market opportunity."
week: 2
date: 2027-03-04
teachers: [eli-brooks]
phase: Measure
output: "Sampling notebook"
buildsOn: ["sessions/01-system-boundary"]
related: ["lectures/week-02","sessions/01-system-boundary"]
spec:
  - "The baseline is 40/300 and the stated missing-count scenario is 40/350; no real-location estimate is claimed."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Start from last week's boundary

Open your **System boundary map**. Turn its exposure/availability distinction into three named quantities in a notebook. Use only the [supplied synthetic census](/data/null-island-market.csv).

## 90-minute lab

Spend 20 minutes validating non-negative integer counts and reciprocal ≤ available ≤ active in each row. Use 25 minutes to compute the three pooled rates and a labelled funnel. Spend 20 minutes adding 50 unobserved active profiles to East as a sensitivity scenario. Use the last 25 minutes to critique the claim “one in four local singles is a match.”

The baseline reciprocal-to-active result must be **40/300**; the sensitivity result must be **40/350**. Record exact fractions before rounding.

## Deliverable: Sampling notebook

Submit to your notebook a data dictionary, executable calculation, one funnel and a 200-word account of who the frame excludes. Distinguish a fictional census from an estimate of a real population.

Week 3 will show why different exposure mixes can reverse a bio comparison. Your report must use this notebook's denominator choices rather than invent a new population.
