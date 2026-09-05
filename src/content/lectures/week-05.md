---
title: "Multi-objective romance & the top-1% problem"
description: "Freeze a scoring rule and a comparison set. Optimizing the metric is easy; defending the metric is the assessed part."
week: 5
date: 2027-03-22
teachers: [mira-chen]
related: [sessions/05-objectives]
---

## Top 1% of what, exactly?

A percentile needs a population, a direction and a tie rule. “Top profile” supplies none of them.

The course's **Null Island v1** benchmark contains 99 fabricated control feature vectors plus your one candidate: **100 entries**. Its score is 100 × (clarity + specificity + feasibility + exit) / 16. The four inputs are the 0–4 quality features from week 4. All controls and the scoring source are [downloadable](/toolkit/#benchmark).

Use the conservative rank: **1 + the number of controls whose score is greater than or equal to yours**. Ties therefore count against the candidate. Only rank 1/100 supports the course's “top 1%” label. It supports no claim about Tinder, Hinge or a real population.

## Congratulations, you optimized the checklist

A candidate scoring 4 on every feature gets 100. The controls deliberately stop below 100. Getting first place is consequently possible and unremarkable. A profile that pastes the rubric into its bio might score well while being unreadable. The project asks you to expose that failure, not conceal it.

Use the **Experiment protocol** to distinguish an observed response outcome from a rubric score. You cannot substitute one for the other because the second produces a prettier graph.

## Constraints before weights

An infeasible invitation should not become acceptable because it mentions an impressive hobby. Treat case fidelity as a hard constraint, then compare quality scores. Plot two objectives—for example brevity and specificity—and identify non-dominated candidates. Do not force every trade-off into a single number.

## Before the lab

Score both week 4 profiles, compute their conservative ranks, and propose a one-sentence adversarial profile. Freeze a primary objective and a second, shifted evaluation rule for week 9. The [final assessment](/assessments/profile-deployment/) grades the validity of this chain, not whether you win your own leaderboard.
