---
title: "Deploy the profile. Keep the rollback."
description: "Package one fictional profile as a static release with provenance, accessible presentation and a reversible change history."
week: 11
date: 2027-05-20
teachers: [eli-brooks]
phase: Ship
output: "Release candidate"
buildsOn: ["sessions/09-validation","sessions/10-date-simulation"]
related: ["lectures/week-11","sessions/09-validation","sessions/10-date-simulation"]
spec:
  - "The fictional release has no real contact collection and a clean build can identify the exact profile and evidence version."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Inputs

Use the frozen candidate, **Validation report** and **Date simulation**. Keep their original filenames or hashes in a manifest.

## 90-minute lab

Spend 25 minutes building the fictional static profile and model card. Use 20 minutes testing keyboard order and the 1920×1080 and 390×844 viewports. Spend 20 minutes deploying to a chosen static host or packaging a self-contained local build. In the final 25 minutes, make one reversible wording change and rehearse rollback.

No real message collection, swipe bot or app integration belongs in this release.

## Deliverable: Release candidate

Keep the page/build, source, evidence manifest, checks, release tag and rollback demonstration. If a link suggests a real action, either implement a clearly labelled local demo or remove the action.

Week 12 asks a fresh reader—or your own clean environment—to reproduce the score from this bundle without your working directory.
