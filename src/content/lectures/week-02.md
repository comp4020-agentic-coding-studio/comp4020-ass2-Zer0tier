---
title: "The local singles market has a denominator"
description: "Define an addressable pool on fictional Null Island. Trace selection bias before announcing a market opportunity."
week: 2
date: 2027-03-01
teachers: [mira-chen]
related: [sessions/02-market]
---

## Total addressable affection

A dashboard says “300 active profiles.” A pitch deck says “300 opportunities.” Only one of those is even a count.

Our [Null Island market CSV](/data/null-island-market.csv) is a completely synthetic three-zone census for one invented week. It contains 300 active profiles, 150 that fit a fictional availability constraint, and 40 with reciprocal eligibility. “Eligible” means meeting the case's scheduling and stated-intention filters. It is not a desirability label.

## Three denominators, three questions

The available share is 150/300 = 50%. Reciprocal eligibility among available profiles is 40/150 ≈ 26.7%. Across the entire active pool it is 40/300 ≈ 13.3%. A number without its denominator is a marketing department waiting to happen.

North has 12 reciprocal cases out of 80 active profiles; South has 18/120; East has 10/100. The pooled rate is not the unweighted mean of arbitrary subgroup percentages. Sum the counts, then divide by the relevant total.

Treat these values as a census of our invented frame, not a random sample from a real city. There is no sampling uncertainty *within that supplied frame*. There is enormous uncertainty about whether the frame represents anything outside it.

## What disappears at the boundary?

An inactive person is outside the active-profile frame, not outside the world. A profile shown to you has survived several selection steps. Reuse the hidden-state boxes from week 1 to draw the funnel: possible population → active pool → available subset → reciprocal subset.

For a sensitivity check, suppose East's active count is under-recorded by 50 while its reciprocal count stays 10. Recompute the pooled rate and say which assumption changed. Do not silently repair a dataset to preserve your headline.

## Before the lab

Download the CSV and read its [dictionary](/toolkit/#market-data). Bring the week 1 map and a script that reproduces all three denominators. This becomes the core of the [20% data report](/assessments/market-report/).
