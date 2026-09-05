---
title: "Midterm: Theoretical Matchmaking"
description: "An individual, 90-minute exam on measurement, bio experiments, mutual-selection probability and asynchronous decisions under incomplete information."
week: 7
due: 2027-04-23T12:30:00+10:00
weight: 30
practiceMode: synthetic-data
preparation: ["sessions/02-platforms","sessions/04-bio-experiment","sessions/05-match-probability","sessions/06-message-tree","sessions/07-communication"]
related: ["sessions/02-platforms","sessions/04-bio-experiment","sessions/05-match-probability","sessions/06-message-tree","sessions/07-communication"]
marking:
  mode: weighted
  criteria:
    - name: "Measurement and identification · Question 1"
      weight: 20
    - name: "Bio experiments and statistical interpretation · Question 2"
      weight: 20
    - name: "Mutual selection and message protocols · Question 3"
      weight: 30
    - name: "Poisson arrivals, response games and sensitivity · Question 4"
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
- **30 marks — mutual selection and protocols.** Calculate a joint selection probability and a repeated-exposure result under stated assumptions. Trace an opening-message decision tree with missing information and a refusal.
- **30 marks — asynchronous decisions.** Calculate a Poisson zero-arrival probability, locate a utility threshold and trace best responses in a supplied two-player payoff table. Explain why no calculation establishes a universal reply time.

Show your working. Unsupported numerical answers cannot receive the marks allocated to reasoning. Arithmetic slips can receive method credit if the setup is correct. No question asks you to infer a real person's feelings.

## Practice, with a worked check

Try these before opening the answers:

1. A synthetic frame has 200 active profiles, 80 available and 16 reciprocally eligible. State the reciprocal-to-active and reciprocal-to-available rates.
2. In the week 4 balanced example, B leads by two percentage points and z ≈ 1.33. What does a two-sided 5% normal test establish?
3. P(A) = 0.30 and P(B given A) = 0.20. Calculate mutual selection and the expected number across twenty equivalent exposures. Which extra assumption allows a chance-of-at-least-one calculation? What does the week 6 tree do with an explicit refusal?
4. With a Poisson rate of 0.4/hour, calculate no arrivals in two hours. With clarification utility 7q−5 and waiting utility 2q−1, when does clarification beat both waiting and stopping? In week 7's Ask/Wait game, identify each player's best response.

<details>
<summary>Open the practice answers</summary>

1. 16/200 = 8%; 16/80 = 20%. The denominators answer different questions.
2. It does not reject equal probabilities under the assumed independent randomised model. This is not evidence of equivalence, and it does not repair a confounded design.
3. The joint probability is 0.06; expected count is 1.2. Independent events with the same probability permit 1 − 0.94²⁰ ≈ 70.99%. An explicit refusal selects stop before any optimisation branch.
4. exp(−0.8) ≈ 0.4493. Clarification beats stopping at q > 5/7 and waiting at q > 4/5: it beats both only at q > 0.8. At 0.8 it ties waiting. Ask is a best response to either action in the supplied game, so (Ask, Ask) is its equilibrium. These conclusions depend on invented rates, utilities and payoffs.

</details>

The [bio lab](/sessions/04-bio-experiment/), [match-probability lab](/sessions/05-match-probability/), [message-tree lab](/sessions/06-message-tree/) and [communication lab](/sessions/07-communication/) provide practice. The question shapes are fixed; the exam uses different counts, branches and payoffs. Markov chains and threat detection occur later and are not examined here.

## Access, absence and feedback

Arrange a documented access need or an alternative sitting with Mira before the exam where possible. If illness prevents attendance, contact Mira through the fictional consultation arrangement for a deferred sitting; do not submit someone else's answers.

Feedback and marked scripts return within seven days. The four section marks sum to 100, scaled to **30%** of the course. [Policies](/policies/) explain reviews and the difference between this exam's rules and tool use on projects.
