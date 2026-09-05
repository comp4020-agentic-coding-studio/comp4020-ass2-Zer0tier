---
title: "Feature engineering without inventing a personality"
description: "Turn a fictional profile into an auditable feature contract. Missing information is not a zero-valued person."
week: 4
date: 2027-03-18
teachers: [eli-brooks]
phase: Model
output: "Feature contract"
buildsOn: ["sessions/01-system-boundary","sessions/02-market"]
related: ["lectures/week-04","sessions/01-system-boundary","sessions/02-market"]
spec:
  - "Every feature score has a case fact and textual evidence; missing statements and contradictions remain distinguishable."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Inputs

Bring the **System boundary map**, **Sampling notebook**, and two Alex profiles. Keep the fictional facts in [week 4](/lectures/week-04/) unchanged.

## 90-minute lab

Spend 20 minutes defining the four quality features with the [shared anchors](/toolkit/#benchmark). For 25 minutes, score both profiles with evidence quotes. Use 20 minutes to introduce one missing statement and one contradiction, recording them separately. Use the final 25 minutes for a report preflight: do the dictionary, denominator and uncertainty claims agree?

Solo review is valid. If a classmate reviews your scores, retain both ratings and explain disagreements rather than taking an unexplained average.

## Deliverable: Feature contract

Save a schema, two profile versions and eight evidence records. Add a test that rejects scores outside 0–4 and an example showing why missingness is not a false claim.

[The market report](/assessments/market-report/) is due **19 March, 5 pm Canberra time**. Week 5 consumes this contract to define its optimization target.
