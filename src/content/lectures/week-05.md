---
title: "The Mathematics of the \"Match\""
description: "Calculate mutual-selection probabilities, constrain the travel radius and separate peak Sunday exposure from a higher match rate."
week: 5
date: 2027-03-22
teachers: [mira-chen]
keyConcept: "Peak system load: Sunday evening swiping"
related: [sessions/05-match-probability]
---

## A match is a joint event

Define A as one fictional participant selecting another, and B as the reverse selection. Then P(A and B) = P(A) × P(B given A). Replacing the conditional term with P(B) requires independence; mutual preferences make that a substantial assumption.

In a **toy pool**, P(A) = 0.30 and P(B given A) = 0.20, so mutual selection has probability **0.06**. Twenty comparable exposures have an expected 1.2 matches. Only if events are independent with the same probability does the chance of at least one become 1 − 0.94²⁰ ≈ **70.99%**. Expectation is not a guaranteed booking.

## Radius is a transport constraint

Alex's bus journey matters more than a straight-line circle. Define an acceptable venue as one reachable within the stated time and $20 total budget. A larger radius can add candidates and remove feasible meetings. More rows is not automatically a better query result.

Model a swipe cap as a supplied parameter, not a claimed live platform limit. Compare two strategies with the same cap and eligible pool; otherwise the experiment has quietly purchased extra exposure.

## Key concept: peak system load

“Sunday evening swiping” is our synthetic peak-load scenario, not an established universal best time. Suppose Sunday produces 8 matches from 40 exposures, while Tuesday produces 3 from 10. Sunday has more matches; Tuesday has the higher rate, **30% versus 20%**. Neither count identifies the effect of the clock.

Bring the platform denominators and frozen photo/bio candidate to the lab. Compute the joint event, state the independence assumptions, then freeze the [final project's](/assessments/profile-deployment/) primary quality score, controls version and conservative tie rule. Keep reciprocal-match probability separate from that rubric score. A top-1% rubric result is not a 99% chance of a date.

[Continue to the week 5 tutorial](/sessions/05-match-probability/).
