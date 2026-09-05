---
title: "Feature engineering without inventing a personality"
description: "Turn a fictional profile into an auditable feature contract. Missing information is not a zero-valued person."
week: 4
date: 2027-03-15
teachers: [mira-chen]
related: [sessions/04-features]
---

## The schema cannot make you interesting

The semester's release subject is **Alex**, an invented adult CS student. Alex likes board games and terrible puns, is free Friday 5–7 pm, has a $20 outing budget, uses the bus, and wants to meet someone with the possibility of a relationship. These are all the case facts. A yacht is not an admissible feature-engineering technique.

Your profile is an interface to those facts. This week defines four quality features: clarity of intention, specificity, feasibility, and room to decline. Each receives an anchored score from 0 to 4 under the [Null Island v1 contract](/toolkit/#benchmark). They measure the submitted artefact against a case, not an individual's romantic value.

## Missing, false and unobserved

“Friday evening” is an observed availability statement. No availability statement is missing data. “Every night” contradicts the case. Encoding all three as zero makes downstream interpretation impossible.

Use a separate evidence record for each score: feature, exact supporting text, case fact, score and reviewer explanation. A numerical column without that record is an opinion with a type annotation.

## A leaky feature can look impressively predictive

Suppose you label a bio “good” using its observed replies, then include reply count as a feature when predicting that same label. Your evaluation has already seen the answer. The [scikit-learn leakage guidance](https://scikit-learn.org/stable/common_pitfalls.html#data-leakage) explains why preprocessing and selection must respect the training/test boundary.

In this course, the toy quality score is explicitly a design rubric. It is **not** trained to predict replies, and must not be described as one. Record that limitation in the feature contract.

## Before the lab

Bring your week 1 boundary map and week 2 data dictionary. Write two truthful profiles for Alex, and list the evidence needed to score them. The data report is due Friday; this lab supplies its data-quality review, not an extra assessed profile.
