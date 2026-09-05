---
title: "A/B testing Tinder bios: a statistical approach"
description: "Preregister a bio comparison, calculate uncertainty and watch a pooled winner lose inside every stratum."
week: 3
date: 2027-03-08
teachers: [mira-chen]
related: [sessions/03-bio-experiment]
---

## Congratulations on your seven extra observations

Bio A: “Coffee, code, repeat.” Bio B: “Friday coffee, a terrible pun, and a walk if the weather cooperates.” Both describe an invented profile. Neither is being tested on Tinder users.

Our balanced toy experiment records A = 120 positive responses from 1,000 exposures and B = 140/1,000. B leads by **2 percentage points**, not “2% more compatible.” The relative lift is about 16.7%; the absolute difference is still 0.02.

## An estimate is not a deployment decision

Under independent, randomised exposures, test equal response probabilities using the [NIST pooled two-proportion statistic](https://itl.nist.gov/div898/handbook/prc/section3/prc33.htm):

```text
p_pool = (xA + xB) / (nA + nB)
z = (xB/nB - xA/nA) /
    sqrt(p_pool * (1-p_pool) * (1/nA + 1/nB))
```

Here z ≈ 1.33. It does not cross the two-sided 5% normal threshold of 1.96. This is insufficient evidence to reject equal rates under the model, not proof that the bios are equivalent. The [experiment sandbox](/toolkit/#experiment) exposes the calculation and refuses a normal-test conclusion for sparse cells.

## The city changed while you were editing

In the separate [bio-exposure CSV](/data/bio-exposures.csv), A gets mostly North exposures and B mostly South. A wins in aggregate, 26/100 versus 19/100. Yet B has the higher rate in both zones: 35% versus 30% in North, 15% versus 10% in South. The exposure mix reversed the ranking.

A sequential before/after edit is not random assignment. More repetitions do not remove that confounder. Reuse week 2's sampling frame to specify who could receive each variant and when.

## Before the lab

Try the balanced and confounded examples in the sandbox. Write your outcome, randomisation unit, fixed sample size, stopping rule and minimum worthwhile effect **before** looking for a winner. Carry the protocol into the report; carry its frozen objective into week 5.
