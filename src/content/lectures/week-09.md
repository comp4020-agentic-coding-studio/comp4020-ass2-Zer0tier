---
title: "Transitioning to Offline Environments"
description: "Plan the digital-to-physical handshake: public venues, transport, accessible exits, confirmation and an agreed approach to the bill."
week: 9
date: 2027-05-03
teachers: [mira-chen]
keyConcept: "Reducing the friction of the digital-to-physical handshake"
related: [sessions/09-offline-handover]
---

## Migrating to the physical server

An offline meeting has transport constraints, an opening time and people who can change their minds. There is no atomic transaction covering all three.

Build a venue-selection algorithm using hard constraints first: a public setting, an accessible route appropriate to the fictional case, Alex's Friday 5–7 pm window, the bus connection and a $20 total budget. Then compare softer preferences such as ambient noise and lighting. An attractive weighted score must not cancel a failed exit route.

The [eSafety online-dating guide](https://www.esafety.gov.au/key-topics/staying-safe/online-dating) covers planning for meeting offline. Apply it to fictional scenarios; a course checklist cannot guarantee safety.

## Cost sharing is a protocol

State each person's proposed contribution and obtain agreement before assuming a split. In our worked plan, two $6 drinks and $2 of Alex's transport total $14 if Alex offers to cover both drinks. Splitting the drinks changes Alex's total to $8. Either proposal can be declined. The price is an invented fixture, not a venue recommendation.

## Key concept: the digital-to-physical handshake

A complete handover contains a proposed place and time, an agreed cost arrangement, a confirmation point, an accessible alternative and a way to cancel. Confirmation is not irrevocable permission for the rest of the evening.

For a contingency exercise, assume a base $14 cost and 90 minutes, a late bus adding 20 minutes with probability 0.25, and a closed venue adding $6 and 10 minutes with probability 0.10. Under independence, expected cost is **$14.60**, duration **96 minutes**, and exceeding 110 minutes has probability **2.5%**. These assumed events are enumerated by the [reference model](/toolkit/#reference-models).

Bring week 8's trust boundaries. Produce a handover plan with a cancel branch and show which constraint rejects each unsuitable venue. Next week models the conversation after arrival, not another bus journey.

[Continue to the week 9 tutorial](/sessions/09-offline-handover/).
