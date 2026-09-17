---
title: "Data Acquisition: Photography as a Quantitative Asset"
description: "Treat profile photos as traceable information assets. Test lighting, identity ambiguity and detection confidence using fictional image records."
week: 3
date: 2027-03-11
teachers: [joost-nwosu]
phase: Measure
output: "Photo asset manifest"
buildsOn: ["sessions/02-platforms"]
related: ["lectures/week-03","sessions/02-platforms"]
spec:
  - "Three fictional assets retain provenance; detection confidence does not stand in for subject identity or consent."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Inputs

Bring the **Platform audit** and the [Week 3 photo kit](/data/week-03-photo-kit.zip), or three equivalent fictional asset descriptions/drawings. Use the audit's source/claim/unknown fields to start the manifest; keep unknowns instead of filling them from appearance. No identifiable real people are needed.

Finish with [The photo desk needs receipts: the interactive quiz](#photo-audit-quiz). Six new cases include a crop diagram, lighting readings and a reviewer table. Apply the manifest rules and calculations, then submit all six responses to unlock the score and worked explanations. The quiz is practice and carries no course marks.

Follow the [60-minute lecture selection and independent-work plan](/lectures/week-03/#scheduled-teaching-and-independent-work). Complete the preparation and open the workbook before Thursday. The four blocks below are the entire **90-minute tutorial**; use existing lecture or study working for review and refinement. Remaining pack material belongs to the week’s independent study allocation.

## 90-minute tutorial

1. **20 minutes — define fields (slides 4–9 and 36–39).** Record asset ID, provenance, exercise permission, intended subject, source size, crop rectangle, revision, ambiguity and alt text. A has a supplied Alex label; B's identity is unresolved; C's exercise permission is unknown. Keep mock detection confidence separate from identity evidence.
2. **20 minutes — calculate (slides 10–21 and 28–35).** Reproduce 200/100 = 2:1 and the synthetic 6/10, 2/10 and 3/10 failure rates. Verify that A's 300×400 crop retains half a 600×400 source. Compare the two group-reviewer columns: six failures each, but only 8/10 label agreement. Name every denominator.
3. **25 minutes — challenge the metric (slides 22–26 and 30).** Inspect B's source and partial-person crop. Explain why the mock 0.98 detection score does not resolve subject identity. Flag one ambiguous crop among three records without inventing a relationship. State why 1/3 crop ambiguity does not imply that the other two assets pass every check.
4. **25 minutes — select, freeze and take the quiz (slides 40–47).** Use fifteen minutes to implement pass/block with reasons; test a blank source and an out-of-bounds rectangle. Select A-portrait-v1 in the supplied fixture, preserve B and C with their reasons, and record file, crop, revision, alt text and byte fingerprint. Repair the proposed bio comparison that changes both photo and text. Use the final ten minutes for the [six-case quiz](#photo-audit-quiz): about eight minutes to respond and two to review the explanations after all cases are answered.

## Deliverable: Photo asset manifest

Save three records with sources and derivatives, the selected revision, calculations and a reason for each rejection. Use `worked-examples.mjs` from the extracted kit to review the reference calculations, or show equivalent working in another language. Solo work and review are accepted. A text-only placeholder with informative alt text remains sufficient; artistic skill is not assessed.

Week 4 must hold file bytes, crop, alt text and display treatment constant while comparing bios. That dependency prevents a photo change from masquerading as a bio effect. The manifest also prepares the data report's explanation of controlled non-bio inputs.
