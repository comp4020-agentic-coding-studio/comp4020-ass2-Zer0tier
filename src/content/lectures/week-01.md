---
title: "The Hinge algorithm & Elo score manipulation"
description: "Reverse-engineer the claim before the system. Implement a toy Elo update and separate observed behaviour from proprietary internals."
week: 1
date: 2027-02-22
teachers: [mira-chen]
slides: /decks/week-01/
related: [sessions/01-system-boundary]
---

## Your algorithm does not know that you are charming

A profile goes in; a recommendation comes out. That does not make the intervening system observable. This week separates three objects: a platform's public description, a mathematical model, and a story someone tells about an unexplained result.

[Hinge's Most Compatible documentation](https://help.hinge.co/hc/en-us/articles/360011233073-What-is-Most-Compatible) names mutual dealbreakers, recent activity and patterns of likes. It does not publish the weights or an Elo equation. [Tinder's matching explainer](https://www.tinderpressroom.com/powering-tinder-r-the-method-behind-our-matching), updated 11 July 2022, says Tinder no longer relies on Elo. These are platform statements, not an independent code audit.

## A system we can actually inspect

For our **toy model**, let an artificial profile's rating be R, its comparison profile's rating Q, and its simulated result S be 0 or 1:

```text
E = 1 / (1 + 10^((Q - R) / 400))
R_next = R + 32 * (S - E)
```

With R = Q = 1200 and S = 1, E = 0.5 and R_next = 1216. Resetting the initial rating or changing K changes the trajectory. It does not establish that you have manipulated Hinge. We are scoring artificial events, not a person's worth.

Draw the boundary around inputs you control, outputs you observe and state you cannot see. Ten extra likes after editing a bio could reflect the bio, exposure, timing or a platform change. A ranking story needs an identification strategy, not a confident voice-over.

## Before the lab

Read the two short platform sources and [the data contract](/toolkit/). Implement the update in any language. Test equal ratings, a loss, and an extreme rating gap. Bring one falsifiable hypothesis and one claim your available observations cannot establish.

[Week 1 slides](/decks/week-01/) contain the worked update. The [system-boundary lab](/sessions/01-system-boundary/) starts the engineering notebook used throughout the semester.
