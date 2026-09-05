---
title: "Natural Language Processing in Profile Bios"
description: "Tokenise clichés, hold the photo constant and A/B test fictional bios. Explain why a pooled winner can lose in both exposure groups."
week: 4
date: 2027-03-15
teachers: [mira-chen]
keyConcept: "Avoiding string redundancy and cliché overflow"
related: [sessions/04-bio-experiment]
---

## A bio is a very small language model input

This week introduces Natural Language Processing in profile bios: tokenisation, a declared character budget, cliché detection and A/B testing. Our lab limit is **150 Unicode code points**; it is not a current limit claimed for Tinder, Bumble or Hinge.

Lowercase and split text into word tokens for the toy trope counter. Count exact sequences such as “must love dogs” and “partner in crime,” then divide their matched tokens by all tokens. Publish how punctuation and overlapping phrases are handled. Keyword density measures repetition, not a personality defect.

## Key concept: string redundancy and cliché overflow

Alex is an adult CS student who likes board games and bad puns, can meet Friday 5–7 pm, travels by bus, has a $20 budget and wants a relationship. These [case facts](/toolkit/#benchmark) are immutable. An exciting invented hobby is a data-integrity failure.

Compare “Looking for a partner in crime” with “Board games or bad puns? Coffee on Friday before seven works for me.” Keep the photo manifest and case facts fixed. Score clarity, specificity, feasibility and exit using the toolkit's 0–4 anchors. Engagement remains a separate outcome.

## The pooled winner loses both zones

In the supplied synthetic exposure file, A has 26 positives/100 exposures and B has 19/100. Yet B leads within North (35% versus 30%) and South (15% versus 10%). Unequal exposure mixes reverse the aggregate ranking. This observational comparison does not establish a bio effect.

Design a stratified randomised experiment with a fixed stopping rule and one primary outcome. In the **separate balanced fixture**, A = 120/1000 and B = 140/1000 gives a two-percentage-point difference and pooled z ≈ **1.33**. The [NIST two-proportion method](https://itl.nist.gov/div898/handbook/prc/section3/prc33.htm) supplies the calculation; non-rejection is not equivalence.

Use the [calculator and data](/toolkit/) in Thursday's lab. The market report is due Friday **19 March, 5 pm**: include denominators, the reversal and a testable follow-up, not a victory announcement.

[Continue to the week 4 tutorial](/sessions/04-bio-experiment/).
