---
title: "Interaction Protocols: The Initial Message"
description: "Classify opening messages with a decision tree. Compare context and cost, and expose why forcing a reply is a broken optimisation target."
week: 6
date: 2027-04-01
teachers: [eli-brooks]
phase: Model
output: "Message decision tree"
buildsOn: ["sessions/04-bio-experiment","sessions/05-match-probability"]
related: ["lectures/week-06","sessions/04-bio-experiment","sessions/05-match-probability"]
spec:
  - "A prior refusal selects stop before any message-optimisation branch; missing facts cannot be invented."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Inputs

Bring the **Bio experiment protocol** and **Match probability model**. Keep the invitation within the same fictional facts and constraints.

## 90-minute tutorial

1. **20 minutes — classify openers.** Compare “hey,” a niche joke and a specific question. State the supported context each requires.
2. **25 minutes — build the tree.** Implement the lecture's branches for prior refusal, shared topic, unknown topic, reply and pending. A refusal check runs before optimisation.
3. **20 minutes — count without overclaiming.** Reproduce invented reply rates 2/10 and 4/10. Give one cost assumption that changes which message your toy objective prefers.
4. **25 minutes — adversarial cases.** Test a recipient who declines, a missing hobby field and a message demanding an answer. Show why a higher pressured-reply count fails the objective's intended use.

## Deliverable: Message decision tree

Save the tree or pseudocode, two supported openers and at least three literal input/output tests. “Pending” must not imply permission to send again.

Week 7 converts these branches into states and events, preserving the refusal-first rule.
