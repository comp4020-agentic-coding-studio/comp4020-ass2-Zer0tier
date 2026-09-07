---
title: "Game Theory and Asynchronous Communication"
description: "Model reply arrivals, response games and ghosting as an observation timeout. A refusal remains terminal even when expected utility disagrees."
week: 7
date: 2027-04-22
teachers: [eli-brooks]
phase: Model
output: "Communication state machine"
buildsOn: ["sessions/05-match-probability","sessions/06-message-tree"]
related: ["lectures/week-07","sessions/05-match-probability","sessions/06-message-tree"]
spec:
  - "The model includes a terminal refusal state and distinguishes a Poisson assumption from an optimal reply time."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Inputs

Bring the **Message decision tree** and **Match probability model**, including the supported candidate/photo versions, checked invitation and recipient quote. The previous invitation does not gain permission merely because time passes. Save the [five-file Week 7 workbook](/lectures/week-07/#run-the-worked-calculations), or implement the supplied tables in a spreadsheet or your preferred language. Events, rates, q values, costs and payoffs are separate authored fixtures; no real messages or profiles are required.

Follow the [60-minute lecture selection and independent-work plan](/lectures/week-07/#scheduled-teaching-and-independent-work). Complete the preparation and open the workbook before Thursday. The four blocks below are the entire **90-minute tutorial**; use existing lecture or study working for review and refinement. Remaining pack material belongs to the week’s independent study allocation.

## 90-minute tutorial

1. **20 minutes — model arrivals.** Reproduce exp(−0.4 × 2) ≈ 0.4493, its complement and the exactly-one probability. Write the homogeneous Poisson assumptions and one reason a conversation may violate them. Compare the half-zero/half-0.8 rate mixture with the same expected count, and distinguish observation time from an underlying event time.
2. **25 minutes — compare decisions.** Solve clarification 7q−5 versus waiting 2q−1 versus stopping 0. Test q = 0.5, 0.8 and 0.9, including ties; check why a positive clarification score at 0.75 still loses. Change the cost to 6 and then 4. Record q as an assumption and show that prior exclusion cannot be overturned by its value.
3. **20 minutes — inspect the game.** Trace both players' best responses in the Ask/Wait matrix. Change Ask/Ask to (−1,−1), explain why strict dominance disappears, and list both pure equilibria. Derive the symmetric 2/3 Ask mixture by indifference; explain why this is neither q nor a prescription for real messages.
4. **25 minutes — implement latency and review the handoff.** Reuse Week 6's decision in the constructor, retain state after each event, and distinguish phase from observation result. Replay timeout/late-reply and refusal/late-reply cases. Test the exact deadline, duplicate and conflicting IDs, and a second-send record. Remove the closed guard to make a literal test fail, restore it, and retain evidence for Week 8.

## Deliverable: Communication state machine

Save the transition table and earlier artefact versions, ordered event log, utility working with its admissibility assumption, and both payoff comparisons. Declare the observation clock, half-open window, no-reply versus ended distinction, duplicate rule and any assumed double-text penalty.

Include literal tests for refusal followed by a reply, timeout followed by a reply, a reply exactly at the deadline and a repeated event ID. Refusal passes through declined to closed in one step; no later event reopens it. A read receipt only updates its observed field. The reducer has no second-send transition and emits no messages.

The worked download provides six traces, not evidence that the Poisson assumptions or utilities fit real people. It does not interpret free text, provide durable storage or run a background scheduler. Review the record yourself or with a peer using the same checks.

The [midterm](/assessments/matchmaking-exam/) is **23 April, 11 am–12.30 pm**. Practise the probability, threshold and best-response working on paper under its stated tool rules. Week 8 adds evidence-based threat review to this machine while preserving terminal closure; a timeout alone is not a threat verdict.
