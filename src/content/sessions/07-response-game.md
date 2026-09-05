---
title: "Game theory of \"ghosting\" & optimal response times"
description: "Model silence as incomplete information. Compare response policies without pretending a delay has one universal meaning."
week: 7
date: 2027-04-22
teachers: [eli-brooks]
phase: Model
output: "Response policy"
buildsOn: ["sessions/06-stable-matching"]
related: ["lectures/week-07","sessions/06-stable-matching"]
spec:
  - "The modified clarification utility is 7q−5; explicit refusal is terminal and timing is not identifiable from this table."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Break one assumption from the Matching trace

Week 6 gave you complete preferences. Replace a missing preference with an unknown state, not a fabricated ranking.

## 90-minute lab

Use 20 minutes to reproduce the expected utilities in [week 7](/lectures/week-07/). Spend 25 minutes changing the clarification cost in the not-interested state from −2 to −5 and finding when clarification can beat stopping. Use 20 minutes to add a recipient action and a second payoff, explaining why this changes the mathematical object. Reserve 25 minutes for a closed-notes midterm rehearsal.

For the modified clarification policy, EU = 7q−5; it beats stopping only when q > 5/7. That alone does not prove it beats waiting—compare both.

## Deliverable: Response policy

Save a payoff table, sensitivity plot, state-transition diagram and explicit absorbing refusal state. Include a paragraph explaining why the table cannot identify an optimal response time.

No student sends a message for this exercise. [The exam](/assessments/matchmaking-exam/) is **23 April, 11 am–12.30 pm, Systems Lab 2**.
