---
title: "Threat Modeling and Anomaly Detection"
description: "Detect bots, financial scams and identity inconsistencies in synthetic cases. Calculate the cost of false alarms before trusting a flag."
week: 8
date: 2027-04-26
teachers: [mira-chen]
keyConcept: "False positives vs. false negatives in romantic threat detection"
related: [sessions/08-threat-model]
---

## Your match may have a business model

Threat modeling asks what must be protected, who might misuse the interaction, and where trust changes. For our fictional profile system, assets include contact details, money, images and the ability to leave. Trust boundaries include a new link, an off-platform payment request and a request for private information.

The [FTC's romance-scam guidance](https://consumer.ftc.gov/articles/what-know-about-romance-scams) describes fabricated identities and requests for money, and suggests checking inconsistent image identities. We use synthetic case cards—not investigations of actual people.

## Signals are not verdicts

Classify a scripted bot, a financial scam and a misrepresented identity separately. Syntax inconsistencies can prompt review; multilingual writing or an unusual sentence is not proof of deception. A reverse-image match can have innocent explanations, and no match does not establish authenticity. Do not upload someone else's face to a service for this exercise.

A case card combining an urgent transfer request and conflicting identity details needs a different response from one containing a typo. Record the observable evidence, uncertainty and least intrusive next step.

## Key concept: false positives versus false negatives

Our **invented 100-case test set** contains ten malicious cases. A detector flags eight correctly, misses two, and wrongly flags eighteen of the ninety benign cases.

Precision = 8/26 ≈ **30.8%**; recall = 8/10 = **80%**; false-positive rate = 18/90 = **20%**. A flag is usually wrong in this fixture. Quoting recall alone would make a very convincing sales slide.

Bring the week 7 communication state machine. Add review and closed states without turning “suspicious” into an automatic accusation. In the lab, change the review threshold, compare missed threats with needless escalations, and prohibit collection of more personal data just to improve your score. The final release must not collect real contact details or payments.

[Continue to the week 8 tutorial](/sessions/08-threat-model/).
