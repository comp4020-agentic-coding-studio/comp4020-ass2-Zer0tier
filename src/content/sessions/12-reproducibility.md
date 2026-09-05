---
title: "The top-1% defence & reproducibility audit"
description: "Rebuild the release, audit the percentile and defend the gap between a better score and a better match."
week: 12
date: 2027-05-27
teachers: [eli-brooks]
phase: Ship
output: "Reproducibility dossier"
buildsOn: ["sessions/05-objectives","sessions/11-deploy"]
related: ["lectures/week-12","sessions/05-objectives","sessions/11-deploy"]
spec:
  - "The clean run reproduces score, 100-entry denominator and conservative rank without access to the student's working directory."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Reproduce the Release candidate

Compare it to the week 5 **Objective specification**. Do not silently repair a primary metric or change the comparator set during the audit.

## 90-minute lab

Use 25 minutes rebuilding from a clean directory. Spend 20 minutes recomputing score, denominator and tie-aware rank. Use 20 minutes checking one shifted result and the date simulation against its exact oracle. In the last 25 minutes, repair missing instructions and record every discrepancy.

Work alone in a fresh environment or exchange fictional builds with a willing classmate. Keep review limited to the released artefact.

## Deliverable: Reproducibility dossier

Save the clean-run log, expected outputs, discrepancy log and a 300-word defence answering the lecture's three questions. If nothing disagreed, say exactly what was checked.

[The final project](/assessments/profile-deployment/) is due **28 May, 5 pm Canberra time**. Include earlier failed candidates and their reasons for rejection; the highest score is not the whole process.
