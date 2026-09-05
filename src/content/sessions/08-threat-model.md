---
title: "Threat Modeling and Anomaly Detection"
description: "Detect bots, financial scams and identity inconsistencies in synthetic cases. Calculate the cost of false alarms before trusting a flag."
week: 8
date: 2027-04-29
teachers: [eli-brooks]
phase: Ship
output: "Threat model"
buildsOn: ["sessions/01-system-boundary","sessions/07-communication"]
related: ["lectures/week-08","sessions/01-system-boundary","sessions/07-communication"]
spec:
  - "TP 8, FN 2, FP 18 and TN 72 yield precision 8/26; a flag is evidence for review, not proof of malice."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Inputs

Bring the **Communication state machine** and **System boundary map**. Work with invented case cards, never real identities.

## 90-minute tutorial

1. **20 minutes — map threats.** List assets, trust boundaries and adversaries for a bot, financial scam and misrepresented identity. Distinguish an observation from an accusation.
2. **25 minutes — calculate the detector.** Use TP = 8, FN = 2, FP = 18, TN = 72. Verify precision 8/26, recall 8/10 and false-positive rate 18/90.
3. **20 minutes — challenge heuristics.** Compare a typo-only case with an urgent transfer request plus conflicting identity facts. Explain why an image match, an image non-match and syntax each remain uncertain.
4. **25 minutes — extend the protocol.** Add review and closed states with explicit transitions. Review can stop a risky interaction without publishing an accusation or collecting extra private data.

## Deliverable: Threat model

Save the asset/boundary diagram, confusion matrix, two threshold choices and state-machine changes. Include a test rejecting a request to collect real contact details or payments in the course release.

Week 9 uses these boundaries to decide what information a proposed offline meeting actually needs.
