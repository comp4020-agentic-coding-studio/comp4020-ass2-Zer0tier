---
title: "Feedback loops: rich profiles get richer"
description: "Separate profile quality from exposure. Simulate how a ranking policy can manufacture its own evidence."
week: 8
date: 2027-04-26
teachers: [mira-chen]
related: [sessions/08-feedback]
---

## The winner received all the traffic. What a coincidence.

A recommender does more than predict observations: it helps decide which observations can happen. Our next model allocates 100 synthetic impressions between two profile variants, then treats the resulting positive-response counts as a reason to allocate the next batch.

Reuse week 3's distinction between rate and count. If both variants have the same assumed response probability, 80 exposures versus 20 still creates different expected counts. A count-based recommender can mistake its own allocation for quality.

## Two allocation policies

Start with 50 impressions per variant. For the next ten rounds compare:

- **Greedy counts:** allocate 90 impressions to the variant with the larger cumulative positive count and 10 to the other; break a tie evenly.
- **Balanced exploration:** allocate 50 to each every round.

In both models, sample independent Bernoulli responses with assumed p = 0.2 for each variant. Record the random seed, per-round exposure and cumulative rate. [NumPy's binomial sampler](https://numpy.org/doc/stable/reference/random/generated/numpy.random.Generator.binomial.html) can draw the number of positives in each batch. This probability is invented for the exercise.

Repeat with unequal response probabilities, 0.2 and 0.3. A policy that locks in on an early count leader can look different across seeds. Report that variation; one attractive trajectory is not the experiment.

## Add a stopping state

Your **Response policy** contains a terminal refusal. In a separate simulator branch, make one artificial participant unavailable after round 3. Remove that participant from eligible exposure rather than charging their later nonresponses to the bio. An event that never could occur should not become a negative training example.

## Before the lab

Bring your week 3 protocol and week 7 state diagram. Define an exposure log with variant, round, impressions, positives and eligibility. The simulator will generate a distribution shift for week 9, not evidence about a live app's recommender.
