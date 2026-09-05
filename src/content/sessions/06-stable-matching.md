---
title: "Stable matching, unstable expectations"
description: "Trace deferred acceptance, find blocking pairs and separate stability from happiness or fairness."
week: 6
date: 2027-04-01
teachers: [eli-brooks]
phase: Model
output: "Matching trace"
buildsOn: ["sessions/05-objectives"]
related: ["lectures/week-06","sessions/05-objectives"]
spec:
  - "The complete instance returns A–Y and B–X; an exhausted acceptable list leaves A unmatched."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Start with the Objective specification

Identify what your profile score does **not** encode: another participant's preference order and their option to remain unmatched.

## 90-minute lab

Spend 20 minutes tracing the two-by-two instance from [week 6](/lectures/week-06/). Use 25 minutes to implement proposal queues and test termination. Spend 20 minutes enumerating unmatched pairs to check stability. Use the last 25 minutes for an exam rehearsal: change A's acceptable list to X only and explain the resulting unmatched participant.

For a counterexample, try the greedy allocation A–X, B–Y. B–X blocks it because B prefers X and X prefers B.

## Deliverable: Matching trace

Keep the proposal log, final assignment, blocking-pair checker, incomplete-list test and a short argument for the n² proposal bound. You may hand-trace before coding; code without a trace is not enough.

The midterm covers weeks 1–7, including the response-game lab after the break. Keep this algorithm and its assumptions ready for that exam.
