---
title: "Introduction to Algorithmic Romance"
description: "Meet Alex, check two invitations and distinguish observations from hidden state. Use supplied facts to test each claim in a fictional bio."
week: 1
date: 2027-02-22
teachers: [mira-chen]
keyConcept: "The Romantic Turing Test"
slides: /decks/week-01/
related: [sessions/02-platforms]
---

## The syllabus drop

The opening provocation is a **claim to test**: “Love is an inefficient market problem solvable through data structures.” A system can store availability and reject an invitation that conflicts with it. Whether a recipient feels interested is a different question. This week we work through what a small model can establish and where its evidence runs out.

A recommendation, a reply and a relationship are three different outputs. HTTP 200 means the request succeeded; it is not evidence of affection.

This course is for students comfortable with probability and pseudocode. Work on **Null Island**, our fictional market, using [supplied synthetic data](/toolkit/). No dating account, partner or disclosure of your own life is required.

## By the end of today

- Identify supplied inputs and constraints.
- Separate an observation from an inference about hidden state.
- Justify a profile claim using a case fact.

The examples below practise those three tasks during the lecture. They are not a separate tutorial or assessed submission.

## Scheduled teaching and independent work

### 60-minute lecture

Monday, **11 am–12 pm**. Use the complete [16-slide deck](/decks/week-01/) in the following order.

| Lecture time | Slides | Focus |
| --- | --- | --- |
| 0–10 min | 1–4 | Introduce the course question and distinguish recommendations, replies and relationships. |
| 10–25 min | 5–7 | Work through Alex’s constraints and the two invitation checks. |
| 25–40 min | 8–9 | Classify supplied facts, observations and hidden state; discuss the boundary example. |
| 40–55 min | 10–13 | Check bio claims against case evidence and explain participation and tool-use rules. |
| 55–60 min | 14–16 | Connect the semester sequence, questions and Week 2 preparation. |

### Tutorial and independent work

**No tutorial in week 1.** The examples are completed during the lecture; there is no separate deliverable. Optional independent review: revisit the boundary example and course policies. Week 2’s preparation is allocated in its own teaching plan. All 16 slides and the worked notes remain available as the complete Week 1 resource.

## Meet Alex

The [toolkit's fixed case](/toolkit/#benchmark) describes Alex as an adult CS student who likes board games and terrible puns. Alex is free **Friday 5–7 pm**, has a **$20 outing budget**, travels by **bus**, and wants to meet someone with the possibility of a relationship. These facts are supplied inputs. Do not invent an extra interest, skill or possession to make a profile sound better.

## Test two invitations

For this exercise, assume that each proposed outing costs **$12 in total**. These are invented options, not real venue recommendations; bus times are unknown.

| Option | Proposed time | Time and budget checks |
| --- | --- | --- |
| A | Friday 6–6.30 pm | Passes: inside 5–7 pm and $12 ≤ $20 |
| B | Friday 8–8.30 pm | Fails: outside 5–7 pm |

The rule keeps an option only if its proposed time falls entirely inside Alex's availability and its total cost is at most $20. Option A passes both checks. Option B fails even though its assumed cost is within budget.

**What is still missing?** Option A remains provisional because travel to and from the outing must also fit the available time. Knowing that Alex uses the bus does not supply a route or timetable. Passing the two checks also gives no evidence about whether a recipient will reply or want a relationship.

## A boundary example from the lecture

Classify these statements before reading the explanation:

1. Alex is free Friday 5–7 pm.
2. A reply is recorded in a synthetic message log.
3. “The recipient wants a relationship with Alex.”

**Worked answer:** the first is a supplied **input**. The second is an **observation** within the fictional exercise. The third is an **inference about hidden state**: the recipient's actual motivation. The log records that a reply occurred, but does not distinguish a polite reply from an interested one. Keep the recorded event and the explanation you might assign to it separate.

Week 2 develops this distinction into a platform audit: add retrieval, ranking and exposure to the map, and identify which parts are supplied, observed or unknown.

## Key concept: the Romantic Turing Test

This course exercise asks whether a fictional bio describes Alex in natural language while remaining faithful to the supplied case. It does not measure romantic appeal or predict replies.

**A:** “Seeking synergistic engagement.”

**B:** “Board games, bad puns. Free Friday 5–7 pm to meet someone.”

**Your check:** quote two phrases in B and match each to a case fact. Then identify what a concrete invitation would still need.

**Worked answer:** “board games” and “bad puns” match Alex's supplied interests; “Friday 5–7 pm” matches the availability; “meet someone” matches the stated aim. A supplies no concrete case detail to check. B gives a reader specific information, but an actual invitation would still need a place, total cost and workable bus travel. Natural wording earns no exemption from evidence.

## One system, twelve weeks

Start with platform architecture and photo assets. Move through bio experiments, mutual-selection probability, opening messages and asynchronous communication. Then examine threats, offline logistics, Markov first dates, follow-up decisions and maintenance. From week 2, each Thursday tutorial adds one artefact to the same fictional profile release.

**No tutorial in week 1.** This week is lecture-only. The first tutorial is **Thursday 4 March, 2–3.30 pm**, in week 2.

The [data report](/assessments/market-report/) is **20%**, due 19 March. The [midterm](/assessments/matchmaking-exam/) is **30%**, on 23 April. The [final profile deployment](/assessments/profile-deployment/) is **50%**, due 28 May. Evidence earns marks; romantic outcomes and benchmark rank do not.

## The strict “No Feelings” policy

A dataset may contain “reply observed.” It may not silently convert that into “likes Alex.” This is a restriction on unsupported labels, not on having feelings. People can change their minds without filing a bug report.

Our scraping ethics begin with provenance, permission, purpose and minimisation. Public visibility is not permission to harvest a neighbourhood. Parse the course's synthetic CSVs; do not scrape apps, private messages or classmates. The [policies](/policies/) define the boundary.

The [lecture deck](/decks/week-01/) presents the case, questions, worked answers and semester map. Continue to [week 2's lecture](/lectures/week-02/) and the [first tutorial](/sessions/02-platforms/). Bring the worked example; build the boundary map during that tutorial.
