---
title: "Stable matching, unstable expectations"
description: "Trace deferred acceptance, find blocking pairs and separate stability from happiness or fairness."
week: 6
date: 2027-03-29
teachers: [mira-chen]
related: [sessions/06-stable-matching]
---

## Nobody asked the leaderboard to dinner

A high individual profile score does not specify mutual preferences. We now leave the single-profile benchmark and use a different object: a two-sided matching instance.

[Gale and Shapley's original paper](https://www.or.mist.i.u-tokyo.ac.jp/takeda/FreshmanCourse/GaleShapley.pdf) defines stability in terms of pairs that would prefer each other to their assigned partners. For the classical equal-size, complete, strict-preference setting, deferred acceptance yields a stable matching. That is a mathematical result under stated assumptions, not an empirical theory of romance.

## A complete trace you can audit

Our two groups are arbitrary labels, not genders:

| Participant | Preference order |
| --- | --- |
| Proposer A | X, Y |
| Proposer B | X, Y |
| Receiver X | B, A |
| Receiver Y | A, B |

Both propose to X. X holds B and rejects A. A proposes to Y; Y holds A. The result is A–Y and B–X. A prefers X, but X prefers B, so A–X is not a blocking pair.

Each proposer visits each receiver at most once, giving at most n² proposals in the square case. Explain why a receiver's held proposal can only improve according to that receiver's fixed ordering. Those two observations underpin termination and stability.

## Change the contract

Now A considers Y unacceptable and prefers remaining unmatched. Do not force A into Y to keep the diagram tidy. With incomplete acceptable lists, leave A unmatched when its list is exhausted. Document the changed assumptions instead of invoking the complete-list result without qualification.

Compare this with week 5's independent profile ranking: which information needed by the matching algorithm is absent from a scalar quality score?

## Before the lab

Hand-trace the table, then implement deferred acceptance. Bring one failing greedy alternative and its blocking pair. The lab provides a [midterm practice question](/assessments/matchmaking-exam/). Teaching pauses after Thursday until 19 April.
