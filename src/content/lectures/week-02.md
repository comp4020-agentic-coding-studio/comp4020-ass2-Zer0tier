---
title: "Platform Architecture and the Elo Hierarchy"
description: "Inspect Tinder, Bumble and Hinge disclosures, implement toy Elo and distinguish a visibility hierarchy from an observed measure of attractiveness."
week: 2
date: 2027-03-01
teachers: [mira-chen]
keyConcept: "The rich-get-richer dynamics of algorithmically enforced attractiveness"
related: [sessions/02-platforms]
---

## Architecture before folklore

Tinder, Bumble and Hinge all mediate who encounters whom. Separate candidate retrieval, filtering, ordering, exposure and mutual selection: a profile cannot receive a like from someone who never sees it.

[Tinder's matching explainer](https://www.tinderpressroom.com/powering-tinder-r-the-method-behind-our-matching) says it no longer relies on Elo. [Hinge describes](https://help.hinge.co/hc/en-us/articles/360011233073-What-is-Most-Compatible) preferences, activity and liking patterns; [Bumble's Discover documentation](https://support.bumble.com/hc/en-us/articles/28423668110621-Using-the-Discover-tab) describes recommendations informed by profile information and previous matches. These accounts do not disclose scoring weights or a numerical “mass-swipe right” penalty.

## An Elo hierarchy we can inspect

Treat internal Elo scores and swipe penalties as **toy-model hypotheses**, not recovered app code. For artificial ratings R and Q, simulated result S in {0,1}, and update factor K:

```text
E = 1 / (1 + 10^((Q - R) / 400))
R_next = R + K * (S - E)
```

R = Q = 1200, K = 32 and S = 1 gives **1216**. A loss from the same starting state gives **1184**. Add an assumed mass-swipe penalty of 8 to the winning update and obtain 1208. You changed your implementation, not Tinder.

## Key concept: rich-get-richer dynamics

If yesterday's likes buy today's exposure, exposure can produce the next round of likes. The system may enforce a hierarchy that looks like “attractiveness” while partly measuring visibility. Compare raw likes with likes per exposure; without that denominator, popularity is doing its own performance review.

The [synthetic census](/toolkit/) has 300 active profiles, 150 available and 40 reciprocally eligible. The rates 40/150 ≈ 26.7% and 40/300 ≈ 13.3% answer different questions. Add 50 missing active profiles without adding eligible profiles: the latter becomes 40/350 ≈ 11.4%.

For the lab, extend your boundary map into a claim/source/unknown audit, implement Elo, and reproduce these denominators. This supplies the population definitions for the report.

[Continue to the week 2 tutorial](/sessions/02-platforms/).
