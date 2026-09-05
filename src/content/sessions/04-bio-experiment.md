---
title: "Natural Language Processing in Profile Bios"
description: "Tokenise clichés, hold the photo constant and A/B test fictional bios. Explain why a pooled winner can lose in both exposure groups."
week: 4
date: 2027-03-18
teachers: [eli-brooks]
phase: Model
output: "Bio experiment protocol"
buildsOn: ["sessions/02-platforms","sessions/03-photo-assets"]
related: ["lectures/week-04","sessions/02-platforms","sessions/03-photo-assets"]
spec:
  - "Both zone comparisons and the pooled reversal are reproduced; the photo and case facts are held constant."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Inputs

Bring the **Platform audit**, **Photo asset manifest** and two bios based only on Alex's fixed facts.

## 90-minute tutorial

1. **20 minutes — define the text pipeline.** Declare the 150-code-point budget and tokenisation rules. Count exact cliché phrases and log their token share. Score the two bios against the toolkit's four evidence anchors.
2. **25 minutes — reproduce the reversal.** From bio-exposures.csv, calculate each zone and the pooled comparison. Explain why A's 26% versus B's 19% is not a causal victory.
3. **20 minutes — check uncertainty.** Use the separate 120/1000 versus 140/1000 fixture in the [calculator](/toolkit/). Verify a two-point difference, z ≈ 1.33 and no claim of equivalence.
4. **25 minutes — pre-register and preflight.** Write a stratified allocation plan, primary outcome, worthwhile effect and stopping rule. Freeze photo and case facts. Check the report's three claims against your calculations.

## Deliverable: Bio experiment protocol

Save candidate texts, feature evidence, calculations and the proposed protocol. No experiment on real app users is permitted.

The [market report](/assessments/market-report/) is due **19 March, 5 pm**. Week 5 uses your supported bio candidate and denominator definitions to model mutual selection.
