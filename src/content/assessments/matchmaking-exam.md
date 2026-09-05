---
title: "Midterm: Theoretical Matchmaking"
description: "An individual, 90-minute exam on measurement, experiments, deferred acceptance and decisions under incomplete information."
week: 7
due: 2027-04-23T12:30:00+10:00
weight: 30
practiceMode: synthetic-data
preparation: ["sessions/03-bio-experiment","sessions/06-stable-matching","sessions/07-response-game"]
related: ["sessions/03-bio-experiment","sessions/06-stable-matching","sessions/07-response-game"]
marking:
  mode: weighted
  criteria:
    - name: "Measurement and identification · Question 1"
      weight: 20
    - name: "Bio experiments and statistical interpretation · Question 2"
      weight: 20
    - name: "Matching algorithm and proof · Question 3"
      weight: 30
    - name: "Response game and sensitivity · Question 4"
      weight: 30
spec:
  - "Use only fictional cases and synthetic data; no real romantic outcome is graded."
  - "Include reproducible working and source attribution under the assessment's stated tool rules."
---

## When and where

**23 April 2027, 11 am–12.30 pm, Systems Lab 2.** Arrive ten minutes before the start. This is the invented course's in-room exam, not an online quiz; the website has no exam submission service.

The exam covers weeks **1–7**. It is individual and closed internet. Bring a non-programmable calculator and one double-sided A4 page of your own notes. No AI tools, messaging, shared notes or executable code are permitted during the exam. Pseudocode is accepted for algorithms.

## Four questions · 100 marks

- **20 marks — measurement.** Identify a population, denominator and confounder from a small unfamiliar dataset.
- **20 marks — experiments.** Compute a two-proportion statistic from supplied counts, check the model assumptions and interpret a non-rejection correctly.
- **30 marks — matching.** Trace deferred acceptance, find a blocking pair in a proposed alternative and justify termination/stability under the stated preference assumptions.
- **30 marks — response decisions.** Calculate expected utilities, locate a policy-change threshold and distinguish a decision against a hidden state from a two-player game.

Show your working. Unsupported numerical answers cannot receive the marks allocated to reasoning. Arithmetic slips can receive method credit if the setup is correct. No question asks you to infer a real person's feelings.

## Practice, with a worked check

Try these before opening the answers:

1. A synthetic frame has 200 active profiles, 80 available and 16 reciprocally eligible. State the reciprocal-to-active and reciprocal-to-available rates.
2. In the week 3 balanced example, B leads by two percentage points and z ≈ 1.33. What does a two-sided 5% normal test establish?
3. Trace the complete two-by-two preferences in [week 6](/lectures/week-06/), then remove Y from A's acceptable list.
4. With clarification utility 7q−5 and waiting utility 2q−1, when does clarification beat both waiting and stopping?

<details>
<summary>Open the practice answers</summary>

1. 16/200 = 8%; 16/80 = 20%. The denominators answer different questions.
2. It does not reject equal probabilities under the assumed independent randomised model. This is not evidence of equivalence, and it does not repair a confounded design.
3. Complete lists give A–Y and B–X. With A accepting only X, B remains with X and A remains unmatched.
4. Clarification beats stopping at q > 5/7 and waiting at q > 4/5. It beats both only at q > 0.8; at 0.8 it ties waiting. The utilities and prior are assumptions.

</details>

The [bio lab](/sessions/03-bio-experiment/), [matching lab](/sessions/06-stable-matching/) and [response-policy lab](/sessions/07-response-game/) provide the corresponding practice. The question shapes are fixed; the exam uses different counts, preferences and payoffs.

## Access, absence and feedback

Arrange a documented access need or an alternative sitting with Mira before the exam where possible. If illness prevents attendance, contact Mira through the fictional consultation arrangement for a deferred sitting; do not submit someone else's answers.

Feedback and marked scripts return within seven days. The four section marks sum to 100, scaled to **30%** of the course. [Policies](/policies/) explain reviews and the difference between this exam's rules and tool use on projects.
