---
title: "Game theory of \"ghosting\" & optimal response times"
description: "Model silence as incomplete information. Compare response policies without pretending a delay has one universal meaning."
week: 7
date: 2027-04-19
teachers: [mira-chen]
related: [sessions/07-response-game]
---

## Your unread message is not a distributed consensus protocol

The title promises an optimal response time. The model asks: optimal for which objective, under what information? Silence may mean busy, uncertain, uninterested, offline or something absent from your model. A missing event is not a reliable psychological label.

Week 6 assumed known, fixed preference lists. This week removes that convenience. Define two possible hidden states for an invented recipient: busy with probability q, and not interested with probability 1−q. These are **assumed states**, not estimates of real people.

## A toy decision table

The sender can wait, send one low-pressure clarification, or stop. Use these invented utility values:

| Action | Busy | Not interested |
| --- | --- | --- |
| Wait | 1 | −1 |
| Clarify once | 2 | −2 |
| Stop | 0 | 0 |

Expected utilities are 2q−1, 4q−2 and 0. At q = 0.75, clarification wins this *particular* table with utility 1. At q = 0.25, stopping wins. At q = 0.5, all tie. Changing the assumed cost of unwanted contact can change the selected policy.

This is initially a decision problem against an uncertain state, **not yet a strategic game**. To make it a game, specify a recipient action and the recipient's payoffs too. “Nash equilibrium” is not a decorative synonym for best guess.

## The state your optimizer must not ignore

An explicit refusal terminates the model. It is not an invitation to adjust the waiting parameter and retry. Silence is not agreement. No timing model gives anyone an obligation to reply.

A response-time recommendation also needs a time-dependent observation model. Our table has none, so it cannot derive a magic number of hours. Identifying that non-identifiability is the correct result, not a missing feature.

## Before the lab

Bring your matching assumptions and calculate the three policies at q = 0.25, 0.5 and 0.75. Then add a recipient payoff and defend it as a modelling choice. The [midterm](/assessments/matchmaking-exam/) follows on Friday; all required practice is on the site.
