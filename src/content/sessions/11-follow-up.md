---
title: "Post-Date Analytics and The \"Second Date\" Metric"
description: "Separate observed agreement from inferred subtext. Audit the time budget, evaluate a frozen profile and prepare a reproducible release."
week: 11
date: 2027-05-20
teachers: [eli-brooks]
phase: Ship
output: "Follow-up evaluation"
buildsOn: ["sessions/05-match-probability","sessions/09-offline-handover","sessions/10-date-simulation"]
related: ["lectures/week-11","sessions/05-match-probability","sessions/09-offline-handover","sessions/10-date-simulation"]
spec:
  - "The original candidate is evaluated before revision, and feasibility reweighting applies to all 100 entries."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Inputs

Bring the frozen **Match probability model** candidate, **Date transition model** and **Offline handover plan**.

## 90-minute tutorial

1. **20 minutes — audit the log.** Account for 115 minutes in the lecture fixture. Label a clear agreement, a decline and a pending reply separately; do not classify “nice time” as agreement.
2. **25 minutes — evaluate frozen work.** Run the primary score and conservative rank against all 99 controls. Save this result before inspecting alternatives.
3. **20 minutes — change the conditions.** Double feasibility's weight for every entry, then test a separately labelled changed-availability case. Keep exploratory revisions distinct from the frozen evaluation.
4. **25 minutes — prepare the release.** Build a labelled fictional static page without contact collection. Check keyboard use, 1920×1080 and 390×844, and verify that its text is the text you evaluated.

## Deliverable: Follow-up evaluation

Save the observation labels, time-allocation critique, primary and sensitivity results, and a release candidate. Explain one disappointing number without editing it away.

Week 12 starts from this exact candidate to perform clean reproduction, maintenance and software rollback.
