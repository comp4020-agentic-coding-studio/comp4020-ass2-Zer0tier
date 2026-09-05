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

Bring the **Threat model**, **Match probability model** and Alex's fixed Friday, bus and budget constraints.

## 90-minute tutorial

1. **20 minutes — filter venues.** Make three fictional cards with public/private setting, opening times, access, noise, lighting, transport and exits. Apply hard constraints before preference scores.
2. **20 minutes — specify the handshake.** Write one optional invitation, a confirmation point, an agreed cost proposal and a cancel branch. Confirmations can be withdrawn.
3. **30 minutes — enumerate contingencies.** List late/on-time × open/closed states from the lecture. Verify expected $14.60, 96 minutes and 2.5% beyond 110 minutes. Use [dateLogistics](/toolkit/#reference-models) to check.
4. **20 minutes — challenge independence.** Set closure given lateness to 0.4 and closure given on-time to 0. Keep marginal closure at 0.1; show that the late-and-closed tail rises to 10% although means stay unchanged.

## Deliverable: Offline handover plan

Save the venue decisions, minimal-information invitation, cost arrangement and exact contingency table. Record why a failed hard constraint cannot be compensated by good lighting.

Week 10 consumes the accepted plan and its cost agreement when modelling conversation and the bill.
