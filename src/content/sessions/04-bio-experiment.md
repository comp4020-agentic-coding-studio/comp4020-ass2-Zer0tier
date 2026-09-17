---
title: "Natural Language Processing in Profile Bios"
description: "Tokenise clichés, hold the photo constant and A/B test fictional bios. Explain why a pooled winner can lose in both exposure groups."
week: 4
date: 2027-03-18
teachers: [joost-nwosu]
phase: Model
output: "Bio experiment protocol"
buildsOn: ["sessions/02-platforms","sessions/03-photo-assets"]
related: ["lectures/week-04","sessions/02-platforms","sessions/03-photo-assets"]
spec:
  - "Both zone comparisons and the pooled reversal are reproduced; the photo and case facts are held constant."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Inputs

Bring your **Platform audit**, **Photo asset manifest** and the [Week 4 texts, tokenizer, exposure CSV, model and workbook](/lectures/week-04/#reproduce-the-examples). The five downloads run together with `node week-04-worked-examples.mjs`; a spreadsheet or another language is accepted.

Finish with [The bio lab has a premature winner: the interactive quiz](#bio-audit-quiz). Six new cases include a token diagram, candidate revisions and an exposure table. Apply the week's text and experiment rules, then submit all six responses to unlock the score and worked explanations. The quiz is practice and carries no course marks.

The [50-slide pack](/decks/week-04/) and [worked lecture notes](/lectures/week-04/) supply the prompts and answers. Bring completed lecture exercises for checking and refinement; do not repeat them just to fill time. Solo implementation and review are accepted.

Use the manifest's **A-portrait-v1** for both bio variants: identical bytes, crop, alt text and display treatment. Alex's Friday 5–7 pm window, $20 total budget, bus travel, board games, puns and relationship possibility stay fixed. The authored bios have no measured outcomes; the CSV's A/B labels do not identify those texts.

Follow the [60-minute lecture selection and independent-work plan](/lectures/week-04/#scheduled-teaching-and-independent-work). Complete the preparation and open the workbook before Thursday. The four blocks below are the entire **90-minute tutorial**; use existing lecture or study working for review and refinement. Remaining pack material belongs to the week’s independent study allocation.

## 90-minute tutorial

1. **20 minutes — implement and inspect the text pipeline.** Count original Unicode code points against the 150 ceiling. Follow the declared ASCII tokenizer and exact dictionary; union overlapping token spans. Test the 150/151 boundary, punctuation, overlapping phrases and empty-token input. Reproduce A's 80 code points and 3/14 coverage, and B's 101 code points and 0/20. Quote evidence for clarity, specificity, feasibility and exit using the toolkit's anchors. Repair missing logistics without inventing facts; the notes include a 103-code-point answer.
2. **25 minutes — reproduce and explain the reversal.** Use the first five minutes for [The Experiment That Lied](/experiment-that-lied/): record a prediction, open the totals and reveal the zones. Then validate all four zone/variant rows and their counts. Calculate North's 30%/35%, South's 10%/15% and the pooled 26%/19%. Recover the 80% versus 20% North exposure weights. Reweight both to a declared 50/50 target: 20%/25%. Explain why neither the pooled nor standardised summary proves a text effect.
3. **20 minutes — check uncertainty and units.** Use the separate 120/1000 versus 140/1000 fixture in the [calculator](/toolkit/#experiment). Reproduce a two-percentage-point difference, pooled rate 0.13, SE about 0.01504 and z about 1.33. Reverse the arms; scale the counts by ten; try 2/8 versus 4/8. State what each change preserves and what the calculator cannot conclude. Do not substitute its pooled z for an analysis of the proposed stratified trial.
4. **25 minutes — pre-register, preflight and take the quiz.** Use fifteen minutes to adapt the notes' synthetic protocol: unique simulated viewer IDs, within-zone random allocation, frozen photo and texts, one outcome and observation window, missing-record handling, analysis weights, worthwhile effect, uncertainty plan and fixed stopping rule. Record that no outcomes exist yet and that the sample cap is not a power guarantee. Repair the Monday/photo A versus Sunday/photo B example. Correct the manager's three report claims with explicit denominators and scope. Use the final ten minutes for the [six-case quiz](#bio-audit-quiz): about eight minutes to respond and two to review the explanations after all cases are answered.

## Deliverable: Bio experiment protocol

During the fifteen-minute protocol portion of the final block, use your investigation’s evidence-note form to record the conclusion, limitations and proposed controls. Download the note alongside your existing working; the outline helps organise the full protocol below. [Release Day](/release-day/) will consume this record in Week 12. Both investigations are ungraded exploratory practice with immediate feedback, separate from the six-case quiz and its submission gate.

Save one folder containing:

- Original and revised texts, pipeline version, token trace, budget checks and quoted feature evidence.
- The frozen image revision and metadata from Week 3, plus the declared identical display treatment.
- Validated exposure calculations, the pooled reversal and the shared-weight sensitivity.
- The separate balanced and sparse calculations, assumptions and cautious result sentences.
- Your proposed allocation, outcome, stopping and analysis specification, with one adversarial review and its repair.

No experiment on real app users is permitted. A simulated generator, its assumptions and seed would need to be specified before any later run; the supplied aggregate CSV is not an individual assignment log.

The [market report](/assessments/market-report/) is due **19 March, 5 pm**. It uses the denominator audit, reversal and proposed follow-up; it does not require a finished profile. [Week 5](/lectures/week-05/) uses your supported bio candidate, frozen photo and denominator definitions to model mutual selection.
