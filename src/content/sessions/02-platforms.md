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

Finish with [Your shift at Null Island: the interactive quiz](#platform-audit-quiz). Six new cases ask you to apply the audit, not copy the worksheet's numbers. Answer every case before revealing the score and worked explanations. The quiz is practice and carries no course marks.

Follow the [60-minute lecture selection and independent-work plan](/lectures/week-02/#scheduled-teaching-and-independent-work). Complete the preparation and open the workbook before Thursday. The four blocks below are the entire **90-minute tutorial**; use existing lecture or study working for review and refinement. Remaining pack material belongs to the week’s independent study allocation.

## 90-minute tutorial

1. **20 minutes — draw the boundary and pipeline (slides 4–16).** Trace P1/P2/P3 through Alex's constraints, then mark retrieval, filters, ordering, exposure and mutual selection. Use lecture 1's input/observable/hidden distinction. Classify the three source claims and put proprietary weights in the unknown column.
2. **25 minutes — implement toy Elo (slides 17–27).** Test equal-rating win 1216, loss 1184 and K = 64 win 1232 from starting ratings of 1200. Trace a win then loss against 1200 to approximately 1199.26, recomputing the expectation. Add an assumed penalty separately; do not attribute it to a platform.
3. **25 minutes — audit denominators (slides 37–41).** Reproduce active/available/reciprocal totals 300/150/40. Validate row inequalities and recompute reciprocal-to-active after adding 50 missing active profiles to East. State why reciprocal-to-available stays unchanged. Handle a zero denominator explicitly.
4. **20 minutes — test the hierarchy story and take the quiz (slides 29–36 and 42–43).** Use ten minutes with the [synthetic exposure cases](/data/week-02-exposures.csv) to compare counts with rates. Change the 600/400 allocation to 500/500 while holding response probabilities fixed. Explain why the first rule preserves a seed advantage, then repair one unsupported claim from the synthesis paragraph. Use the final ten minutes for the [six-case quiz](#platform-audit-quiz): about eight minutes to respond and two to review the explanations after all cases are answered.

## Deliverable: Platform audit

Save the boundary map made in this tutorial, a source/claim/unknown table, tested updater and exposure/census calculation log. Annotate changes to the map rather than replacing its uncertainty with confidence. Label the data synthetic and record event definitions, denominator, observation window and allocation assumptions. Use the lecture's worked answers to review the artefact individually or with a partner.

This audit supplies the report's population definitions. Week 3 extends its input-provenance rules to photographs.
