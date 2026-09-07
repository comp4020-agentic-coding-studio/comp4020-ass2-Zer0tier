---
title: "Transitioning to Offline Environments"
description: "Plan the digital-to-physical handshake: public venues, transport, accessible exits, confirmation and an agreed approach to the bill."
week: 9
date: 2027-05-06
teachers: [eli-brooks]
phase: Ship
output: "Offline handover plan"
buildsOn: ["sessions/05-match-probability","sessions/08-threat-model"]
related: ["lectures/week-09","sessions/05-match-probability","sessions/08-threat-model"]
spec:
  - "Hard venue constraints precede preferences; exact contingency means remain distinct from tail risk."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Inputs

Bring the **Threat model**, **Match probability model** and Alex's fixed **Friday 5–7 pm, bus and $20 total** constraints. Retain the earlier candidate and invitation versions, unresolved findings and closure reason. Work solo or review with a partner; both modes are accepted.

Open the [ten-file offline workbook](/lectures/week-09/#run-and-challenge-the-workbook). It recalculates the unchanged Week 5 Library plan (100 minutes, $14) and constructs the actual Week 8 review snapshot. Week 9's new Atrium proposal is a separate 90-minute, $14 fixture. Do not merge the two durations or infer acceptance from review clearance. Venue observations, prices, events and probabilities are authored; no actual venue search, booking or payment is required.

Follow the [60-minute lecture selection and independent-work plan](/lectures/week-09/#scheduled-teaching-and-independent-work). Complete the preparation and open the workbook before Thursday. The four blocks below are the entire **90-minute tutorial**; use existing lecture or study working for review and refinement. Remaining pack material belongs to the week’s independent study allocation.

## 90-minute tutorial

1. **20 minutes — filter venues.** Spend eight minutes tracing the three primary cards, seven listing every rejection and five reviewing the checked Annex alternative. Use public/private setting, opening times, route access, noise, lighting, transport and exits. Apply hard checks before preference scores. Explain why delaying the Gallery departure repairs its opening mismatch but worsens its late return. Save one route timeline and the rejection table.
2. **20 minutes — specify the handshake.** Spend six minutes drafting a minimal optional invitation, six comparing cover-both and split-drinks costs, and eight replaying version-specific confirmations and cancellation. Record a confirmation point before departure and a cancel branch. Use the report's supplied events, not another student's messages. Revise the cost arrangement and show both confirmations being cleared. A confirmation can be withdrawn; an earlier one cannot cover changed terms.
3. **30 minutes — enumerate contingencies.** Spend ten minutes listing late/on-time × open/closed, ten calculating means and strict exceedance, and ten checking the model's assumptions. Verify expected $14.60, 96 minutes and 2.5% beyond 110 minutes. Check against [dateLogistics](/toolkit/#reference-models). Explain why no supplied row exceeds Alex's 120-minute hard window or $20 budget even though one misses the 110-minute working target.
4. **20 minutes — challenge independence.** Spend eight minutes replacing the conditional probabilities, six checking marginals and means, and six testing the changed tail and a deliberate mutation. Set closure given lateness to 0.4 and closure given on-time to 0. Keep marginal closure at 0.1; show that the late-and-closed tail rises to 10% although both means stay unchanged. Restore the mutated rule and record the passing result.

## Worked checkpoints

| Check | Literal expected result |
| --- | --- |
| Atrium route | Depart 17:00 → arrive 17:20 → meeting ends 18:10 → home 18:30. Total 90 min. |
| Hard filter | Atrium passes; Loft fails public and exit; Gallery fails opening, time and budget; Annex passes at $20. |
| Soft weights | At quiet:light = 3:1, Atrium 15 and Annex 14. At 1:1, Atrium 7 and Annex 8. Rejected venues stay excluded. |
| Bill proposal | Cover both: Alex $14 including transport. Split drinks: Alex $8, counterpart drinks $6; counterpart transport unknown. |
| Original joint cells | On/open 0.675; on/closed 0.075; late/open 0.225; late/closed 0.025. |
| Original consequences | Costs $14/$20/$14/$20; durations 90/100/110/120 min. |
| Dependent cells | 0.75, 0, 0.15, 0.10 in the same order. |
| Means and tail | Both cases: $14.60 and 96 min. Strict >110-minute tail: 2.5% versus 10%. |

The closure branch assumes a usable alternative adds $6 and ten minutes. This assumption does not authorise an automatic venue switch. A changed place, time or cost needs fresh agreement; a failed hard constraint requires revision or cancellation. The numerical fixture omits further delays and a second closure.

## Protocol checks

Start from a genuine unheld replied Week 8 record; held, pending or closed records cannot start a new proposal. Record the proposal and two explicit actor/version confirmations. Assert phases **proposed → proposed → confirmed**. One actor's event is insufficient.

After a split-drinks revision, assert zero confirmations and a new version with Alex's proposed total $8. A confirmation for the previous version must fail. After cancellation, assert that the complete snapshot remains unchanged even if a later confirmation arrives. A fresh threat-review update clears the agreement; before the confirmation deadline, an eventual clear update returns to draft rather than restoring acceptance.

At the 16:30 confirmation point, an unfinished plan expires. A final confirmation at 16:29 can complete it; at 16:30 it is late. New event IDs must be chronological, exact serialized duplicates are no-ops, and conflicting IDs fail. The workbook records local states and performs no messaging, booking or payment.

## Make one check fail

Predict the original >110-minute tail as the literal value **0.025**. Temporarily change the strict > comparison to ≥, asserting the edit matched. The test must fail because the 110-minute row is now incorrectly counted. Restore it and verify the passing result.

Alternatively, change the two-confirmation condition to accept one actor; the literal phase trace must fail. Preserve the failed assertion and restored output. Searching the source for the word “confirmed” would not check the behaviour.

If you finish early, derive the joint late/closed bounds **0 to 0.10** from the fixed marginals. Or deliberately change the base duration to 100 minutes: the mean becomes 106 minutes and the >110-minute tail becomes 25%. Label that as a changed scenario, not an unannounced repair to the original fixture.

## Deliverable: Offline handover plan

Save the venue decisions and route timeline, minimal-information invitation, versioned cost arrangement, confirmation/cancel traces, original and dependent contingency tables, and one mutation/restoration result. State the independence and fallback assumptions. Record why a failed hard constraint cannot be compensated by good lighting. These artefacts form one **Offline handover plan**, not a new essay or extra assessment.

[Week 10](/sessions/10-date-simulation/) consumes the currently confirmed plan and its explicit cost agreement when modelling conversation and the bill. Export the version and unresolved conditions as well. Confirmation does not prove arrival or continuing agreement; a cancelled, expired or held plan cannot be exported as accepted.
