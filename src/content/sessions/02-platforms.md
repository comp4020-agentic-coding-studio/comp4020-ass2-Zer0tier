---
title: "Platform Architecture and the Elo Hierarchy"
description: "Inspect Tinder, Bumble and Hinge disclosures, implement toy Elo and distinguish a visibility hierarchy from an observed measure of attractiveness."
week: 2
date: 2027-03-04
teachers: [eli-brooks]
phase: Measure
output: "Platform audit"
buildsOn: ["lectures/week-01"]
related: ["lectures/week-02","lectures/week-01"]
spec:
  - "Equal-rating win is 1216; totals are 300 active, 150 available and 40 reciprocal; proprietary weights remain unknown."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Inputs

This is the first tutorial; week 1 is lecture-only. Review the boundary example in [lecture 1](/lectures/week-01/), read the three primary platform descriptions linked in [week 2](/lectures/week-02/) and open the synthetic census. No completed week 1 lab work is required.

## 90-minute tutorial

1. **20 minutes — draw the boundary and pipeline.** Use lecture 1's input/observable/hidden distinction, then mark retrieval, filters, ordering, exposure and mutual selection. Put proprietary weights in the unknown column.
2. **25 minutes — implement toy Elo.** Test equal-rating win 1216, loss 1184 and K = 64 win 1232 from starting ratings of 1200. Add an assumed penalty separately; do not attribute it to a platform.
3. **25 minutes — audit denominators.** Reproduce active/available/reciprocal totals 300/150/40. Validate row inequalities and recompute reciprocal-to-active after adding 50 missing active profiles to East.
4. **20 minutes — test the hierarchy story.** Construct two exposure counts giving the same likes but different like rates. Say which rich-get-richer mechanism your example assumes.

## Deliverable: Platform audit

Save the boundary map made in this tutorial, a source/claim/unknown table, tested updater and census calculation log. Annotate changes to the map rather than replacing its uncertainty with confidence.

This audit supplies the report's population definitions. Week 3 extends its input-provenance rules to photographs.
