---
title: "Threat Modeling and Anomaly Detection"
description: "Detect bots, financial scams and identity inconsistencies in synthetic cases. Calculate the cost of false alarms before trusting a flag."
week: 8
date: 2027-04-29
teachers: [eli-brooks]
phase: Ship
output: "Threat model"
buildsOn: ["sessions/02-platforms","sessions/07-communication"]
related: ["lectures/week-08","sessions/02-platforms","sessions/07-communication"]
spec:
  - "TP 8, FN 2, FP 18 and TN 72 yield precision 8/26; a flag is evidence for review, not proof of malice."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Inputs

Bring the **Communication state machine** and the boundary map from your week 2 **Platform audit**. Retain the candidate and invitation versions, G1's supplied quote, event IDs, two-hour observation window and closure reason. Work with invented case cards, never real identities. Solo implementation and review are accepted.

Open the [lecture's six-file offline workbook](/lectures/week-08/#run-the-worked-calculations). Its 100 scored rows and seven triage cards are separate authored fixtures. Scores are arbitrary points, not probabilities; M/B row IDs reveal answer labels and must not become predictor features. No reverse-image search or third-party image upload is part of this exercise.

## 90-minute tutorial

1. **20 minutes — map threats.** Spend five minutes recovering the Week 2 boundaries, ten drawing the path from a fictional message to a proposed address/payment form, and five reviewing the controls. Name assets, crossings and actor opportunities for automation, a financial scam and identity misrepresentation. Keep observations separate from accusations. Output one labelled flow and a control for each asset.
2. **25 minutes — calculate the detector.** Spend eight minutes filling the original matrix and denominators, eight recounting thresholds 50 and 75, and nine comparing losses and assumptions. Verify TP = 8, FN = 2, FP = 18, TN = 72 at score ≥ 50. Calculate precision 8/26, recall 8/10 and false-positive rate 18/90. Compare L = 5FN + FP, then change the missed-threat cost to 10. Record which tested threshold wins and why the answer changes.
3. **20 minutes — challenge heuristics.** Spend eight minutes classifying the seven authored cards, seven writing evidence/uncertainty/action records for two contrasting cases, and five reviewing the weakest inference. Compare typo-only with transfer plus identity conflict. Explain why an image match, a non-match, syntax and a timeout remain uncertain. Run `screenCase` on supplied codes; do not present it as a free-text classifier or treat disclosed automation as malice.
4. **25 minutes — extend the protocol.** Spend twelve minutes replaying the three review histories, eight checking literal assertions and five exchanging a critique or writing a solo review. Put review around the existing Week 7 snapshot. Require all finding IDs and a note to clear a hold; retain incoming replies and observation expiry; preserve closed as terminal. Run the contact/payment release checks. Record a failing assertion from one deliberate mutation, restore it and verify the restored result.

## Worked checkpoints

| Check | Expected result |
| --- | --- |
| Threshold 50 | 26 flags; precision ≈ 30.8%, recall 80%, false-positive rate 20%, accuracy 80%. |
| Threshold 75 | TP 6, FN 4, FP 5, TN 85; 11 flags; precision ≈ 54.5%, recall 60%. |
| Loss at cFN = 5, cFP = 1 | Threshold 50 costs 28; threshold 75 costs 25. |
| Loss at cFN = 10, cFP = 1 | Threshold 50 costs 38; threshold 75 costs 45. |
| Triage | Transfer, template and image-conflict trigger review; the other four add no flag. None assigns a malicious verdict. |
| Assess → reply → resolution | Review → review → replied. Clearance reveals the latest communication phase. |
| Assess → decline → resolution | Review → closed → closed. The complete closed snapshot remains fixed. |
| Assess → timeout → image non-match | Review throughout; underlying pending/no-reply. Existing evidence remains. |

The cost formula omits ordinary review overhead, so retain flag counts beside loss. Comparing two thresholds does not find a global optimum. If time remains, compute the 50/75 tie at cFN = 6.5 or the lecture's 1%-prevalence projection: TP 8, FN 2, FP 198, TN 792 in 1,000 hypothetical cases.

## Literal checks before polish

Assert the four original cells and a score exactly equal to the cutoff. Assert that no flags produces undefined precision (`null`), rather than perfect precision. Reject missing numeric labels instead of treating them as benign.

For the event machine, assert the complete refused snapshot stays unchanged after clearance or a late reply. A review hold must reject a first send even if the underlying phase is ready. A no-match card and a read receipt must not remove an earlier finding. Incomplete finding IDs, empty review notes, conflicting IDs and old timestamps must fail.

Temporarily change ≥ to >, or remove the closed guard. Confirm the intended edit matched, observe the corresponding literal assertion fail, restore the code, and run again. Use the [worked lecture debrief](/lectures/week-08/#test-the-claims-that-matter) to explain what the failure establishes. These checks validate the fixture's behaviour, not detector quality on real people.

Include a test rejecting a request to collect real contact details or payments:

```text
checkReleasePlan({ ...releasePlan, collectsRealContact: true }).allowed === false
checkReleasePlan({ ...releasePlan, acceptsPayments: true }).allowed === false
```

Turn these expected expressions into assertions in your implementation. Also inspect the actual release: a correctly declared object cannot prove that a separate form or network call follows it. Keep third-party image uploads, app integration and published accusations out of the fictional release.

## Deliverable: Threat model

Save the asset/boundary diagram, original confusion matrix, at least two threshold choices with explicit error costs, two evidence/uncertainty/action records, and state-machine changes with the three literal traces. Include the contact/payment rejection tests and one documented mutation/restoration result. Carry the unchanged version references and closure reason. These artefacts form one **Threat model**, not a new essay or extra assessment.

[Week 9](/sessions/09-offline-handover/) uses these boundaries to decide what information a proposed offline meeting actually needs. Hand over a proposal and its unresolved conditions; review clearance is neither acceptance nor a safety certificate. Alex's Friday 5–7 pm, bus and $20 constraints remain fixed, and recipient availability remains unknown.
