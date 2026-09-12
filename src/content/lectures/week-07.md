---
title: "Game Theory and Asynchronous Communication"
description: "Model reply arrivals, response games and ghosting as an observation timeout. A refusal remains terminal even when expected utility disagrees."
week: 7
date: 2027-04-19
teachers: [mira-chen]
keyConcept: "Managing latency and read-receipt strategy"
slides: /decks/week-07/
related: [sessions/07-communication]
---

## Alex's story · The read receipt says very little

*Fictional course story · Week 7.*

The authored message traces now let Alex record a send and wait. One records a read receipt; it does not record a reason for the silence that follows. The dashboard would like to fill the gap with a story. Alex has to build a state machine that can retain an observation without inventing the recipient's next decision.

**Investigate this week:** Replay the timed events and compare the arrival, utility and game models. Which conclusions come from observations, and which depend on assumptions?

## Nobody owes your queue a service-level agreement

Texting is asynchronous. Sending, delivery, reading and replying are different events; an observed read receipt does not explain the next event. This week adds time and retained state to Week 6's tree, compares three mathematical models, and makes each model state what it cannot infer.

[Open the 50-slide teaching deck](/decks/week-07/). **A/D** or the scroll wheel changes slides; **Esc** returns here. Your output is a **Communication state machine**, with a transition table, reproducible event traces and calculations you can explain on paper.

## Scheduled teaching and independent work

### 60-minute lecture

Monday, **11 am–12 pm**. Use only these selections from the [complete deck](/decks/week-07/), in order. The timings include explanation, brief working and questions; full exercise timers elsewhere belong to the complete resource route.

| Lecture time | Slides | Focus |
| --- | --- | --- |
| 0–15 min | 5, 9–12, 15 | Distinguish event observations and derive the Poisson zero-arrival probability with its assumptions. |
| 15–30 min | 18–20, 24–25 | Compare clarification, waiting and stopping; keep admissibility outside utility. |
| 30–45 min | 26, 28–30, 33 | Read both payoff coordinates, trace best responses and demonstrate mixed-strategy indifference in the changed matrix. |
| 45–55 min | 35–39 | Trace timeout and refusal through the state machine; distinguish phase from observation result. |
| 55–60 min | 49–50 | Check paper working and name the remaining midterm revision tasks. |

### 90-minute tutorial

Thursday, **2–3.30 pm**. Follow the [Week 7 tutorial](/sessions/07-communication/): **20 minutes Poisson arrivals; 25 minutes utility; 20 minutes game analysis; 25 minutes event replay, handoff and quiz**. The last block includes ten minutes for the interactive quiz and its debrief. These four blocks fill the whole session. Bring lecture working for checking and refinement; complete each exercise once. Solo work and review are accepted.

### Independent work · about 210 minutes

- **30 minutes — before Monday:** Reconnect the Week 6 tree and Week 5 model after the teaching pause; read the event definitions and Poisson assumptions.
- **90 minutes — between Monday and Thursday:** Review remaining derivations, especially the rate mixture, changed-game best responses and exact event boundary (slides 16, 31–32, 34 and 40–46). Open the five-file workbook and attempt paper calculations before Thursday.
- **90 minutes — consolidation and assessment:** Reserve 90 minutes for midterm revision before Friday 23 April’s 11 am exam: start earlier in the week and use Thursday’s tutorial to resolve questions. Save the Communication state machine and review the weeks 1–7 assumptions; this estimate excludes the separately timetabled exam itself.

Together this is about **six hours: 60 + 90 + 210 minutes**. Slides and full-length exercises outside the lecture selection are independent study unless assigned in the tutorial’s four blocks. Use the worked answers to check an attempt; optional extensions can use consolidation time. The complete route below reuses this material and adds no scheduled meeting or extra three-hour study requirement.

<span id="a-180-minute-teaching-route"></span>

## Complete teaching pack

The full **50-slide pack** and all worked notes remain the complete resource. This **180-minute reference route includes a ten-minute break** for someone facilitating the whole pack in one sitting. It is separate from the scheduled selections above: the break slide is skipped in the 60-minute lecture and the tutorial keeps its own 90-minute plan. These are facilitation estimates, including practical work and debriefs.

| Elapsed time | Slides | Activity and evidence produced |
| --- | --- | --- |
| 0–30 min | 1–8 | Reconnect the Week 6 handoff; separate send, delivery, read and reply observations; repair an inference from a receipt in five minutes. |
| 30–60 min | 9–16 | Derive zero/one-arrival probabilities; complete a six-minute calculation; compare rates and a mixture with the same expected count. |
| 60–70 min | 17 | Break. |
| 70–105 min | 18–25 | Solve the whole decision policy, including stop and ties; change a cost in seven minutes; keep admissibility outside the numeric threshold. |
| 105–140 min | 26–34 | Read both payoff coordinates; trace best responses; repair dominance after a payoff change in seven minutes; derive a symmetric mixed equilibrium. |
| 140–180 min | 35–50 | Implement events and observation windows; trace late arrivals and duplicates; complete deadline and refusal tests; review the Week 8 handoff and exam working. |

Optional extensions below can use 15–25 minutes of independent consolidation time.

## Carry the previous artefacts across the break

Alex remains a fictional adult CS student who likes **board games and terrible puns**, travels by **bus**, is available **Friday 5–7 pm**, has **$20 total**, and wants to meet someone with the possibility of a relationship. Keep Week 4's supported bio and frozen **A-portrait-v1** photo, Week 5's checked invitation, and Week 6's recipient evidence and refusal-first tree.

The supplied handoff names `week-05-v1:library`: the invented Library itinerary takes **100 minutes and $14**, with a 17:20–18:20 meeting. Neither elapsed time nor a reply makes that invitation agreed. Recipient availability remains unknown. The candidate and invitation versions are separate artefacts.

Recipient G1's authored quote, **“I like board games,”** supports Week 6's contextual draft. `startConversation` actually calls the downloaded Week 6 classifier. It accepts a fresh plain/contextual draft and retains the returned evidence; stop, review, pending or respond cannot initialise a new opener. Importing an already active conversation's historical timestamps is outside this version's scope.

The replay starts before a fictional send record. It does not send the opener, run a messaging account or decide that contact is appropriate. The candidate facts, recipient quote and event labels still require human review.

## Events are not interchangeable

| Observation | What the authored log can say | What it cannot establish |
| --- | --- | --- |
| Send recorded | An outbound opener is recorded at this time. | Delivery, reading or a reply. |
| Delivery receipt observed | A supplied delivery event was observed. | Reading or agreement. |
| Read receipt observed | A supplied read event was observed. | A motive, available attention or permission for another message. |
| Reply observed | Inbound content was observed; review its meaning. | Agreement to the invitation. |
| Decline observed | The case explicitly labels a refusal. | A reason you are entitled to challenge. |

**Five-minute exercise:** a log has send at 0 h, read at 0.5 h and no reply by 2 h. Repair “the recipient read it, so they want a reminder.”

**Worked answer:** retain the three observations and remove the motive and reminder inference. Missing delivery telemetry is not proof of non-delivery. In this workbook, read and delivery timestamps are independent *recorded fields*: observing read does not fabricate a missing delivery timestamp. They are not assumed statistically independent events.

Our event `at` is the time the fictional observer records the event, measured in hours from a common synthetic origin. It is not a recovered server timestamp. A delayed receipt can make this differ from the underlying event time. We use ordered observation times, not a claim about any real app's receipt semantics.

## Poisson counts, not a stopwatch for affection

Keep the original **toy homogeneous Poisson arrival model**: λ = **0.4 inbound events/hour** and a two-hour interval. Count inbound messages, including declines; exclude send records and delivery/read receipts. This mathematical fixture is separate from the small authored state traces below, which do not fit or validate λ.

[SciPy's Poisson reference](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.poisson.html) gives the count probability mass function. Here μ = λt is the expected count:

```text
N(t) ~ Poisson(λt)
P(N(t) = k) = exp(−λt) × (λt)^k / k!
μ = 0.4 events/hour × 2 hours = 0.8 events
P(N(2) = 0) = exp(−0.8) ≈ 0.449329
P(N(2) ≥ 1) = 1 − exp(−0.8) ≈ 0.550671
P(N(2) = 1) = 0.8 × exp(−0.8) ≈ 0.359463
```

An expected count of **0.8** is not an 80% chance of a reply. The count model permits multiple inbound messages; the state machine's observation outcome below records only whether any reply occurred within one window. Those are different summaries.

**Six-minute exercise:** reproduce zero and exactly one arrival. Keep t = 2 hours but try λ = 0.2 and 0.8. What happens at λ = 0 or t = 0?

**Worked answer:**

| Assumed λ, events/hour | Expected count over 2 h | Zero-arrival probability |
| --- | --- | --- |
| 0.2 | 0.4 | 0.670320 |
| 0.4 | 0.8 | 0.449329 |
| 0.8 | 1.6 | 0.201897 |

At zero rate or zero duration, the zero-count probability is 1. Negative rates/durations and non-finite inputs are invalid. A larger assumed rate lowers the model's zero-count probability; it does not prove that a particular person should have replied.

### Challenge the process assumptions

[MIT's probability notes, §§4-5–4-6](https://ocw.mit.edu/courses/6-041-probabilistic-systems-analysis-and-applied-probability-spring-2006/8c03011e0c589bdc9c302dd6d49df162_chapter4.pdf) develop the homogeneous process and its independent, stationary increments. In this exercise, the rate stays constant and disjoint intervals have independent counts. Work, sleep, notifications and clustered conversation turns are possible omitted structure; the file supplies no evidence that one person's replies obey the model.

Construct a **different assumed model**: half the windows have rate 0, half rate 0.8/hour, with a homogeneous process inside each selected regime. The average rate is still 0.4/hour, and the expected two-hour count is still 0.8. Yet:

```text
P(zero in mixture) = 0.5 × 1 + 0.5 × exp(−1.6)
                   ≈ 0.600948
```

That is about 60.1%, versus 44.9% in the single-rate model. Do not average rates and silently replace a mixture with one homogeneous process. The two regimes are invented mathematical inputs, not inferred labels for G1's activity or feelings.

An optional calculation uses independent increments: under the homogeneous model, after zero arrivals in the first two hours, the probability of zero in the **next** two hours is still exp(−0.8). Zero over all four hours has probability exp(−1.6). The conditional result belongs to the assumed process; it does not justify waiting exactly two hours before contacting someone.

## A decision against uncertainty

Keep the original hypothetical utilities:

```text
Clarify: U(C) = 7q − 5
Wait:    U(W) = 2q − 1
Stop:    U(S) = 0
q ∈ [0,1]: assumed probability that one clarification would be welcome
```

The coefficients and costs are arbitrary utility units. q is supplied as a thought-experiment assumption; it is neither inferred from a read receipt nor equal to 1 − P(zero arrivals). “Would welcome clarification” and “an inbound message arrives” are different events. No person's feelings are estimated in the download.

This is one decision maker comparing fixed expected utilities. It becomes a two-player game only when both players have choices and payoffs that depend on the pair of choices.

### Compare all three options

Clarification beats stop when **q > 5/7**. It beats wait when **7q − 5 > 2q − 1**, hence **q > 4/5**. Both must hold, so clarification strictly beats both alternatives only at **q > 0.8**.

At q = 0.75, clarification is positive (0.25) but waiting is larger (0.50). Merely checking whether a message has positive utility misses the competing option.

| q | Clarify | Wait | Stop | Numerical maximum, if clarification is admissible |
| --- | --- | --- | --- | --- |
| 0.3 | −2.9 | −0.4 | 0 | Stop |
| 0.5 | −1.5 | 0 | 0 | Stop / wait tie |
| 0.8 | 0.6 | 0.6 | 0 | Wait / clarify tie |
| 0.9 | 1.3 | 0.8 | 0 | Clarify |

The full policy is stop below 0.5, a stop/wait tie at 0.5, wait between 0.5 and 0.8, a wait/clarify tie at 0.8, and clarify above 0.8. The workbook keeps all maximisers within an absolute **1e−10 utility-unit** tolerance. This is an arithmetic convention, not a measured indifference threshold.

### Price a second-message penalty explicitly

**Seven-minute exercise:** replace clarification's cost 5 with **6**. Check q = 0.9 and 1. Then lower the cost to 4 and locate its crossover with waiting.

**Worked answer:** at cost 6 and q = 0.9, clarify = 0.3 while wait = 0.8. At q = 1, both equal 1. Clarification never strictly beats waiting for valid q. At cost 4, its crossing with waiting is q = 0.6; both score 0.2, above stop.

An assumed “double-texting penalty” d ≥ 0 gives U(C) = 7q − 5 − d. The pairwise threshold against waiting becomes q > **0.8 + d/5**. With d = 1, strict preference is impossible on [0,1]. This is sensitivity to an invented cost, not a measured social law or a universal messaging strategy.

### Apply the earlier boundary before arithmetic

The base comparison assumes a separately reviewed admissible clarification in an open fictional conversation. `compareResponses` requires an explicit Boolean `clarificationAllowed`; false excludes clarification before ranking. A q of 0.9 cannot change that flag. Waiting and stopping remain available in this separate open-conversation exercise.

Week 6's pending branch does not automatically become a clarification opportunity. The event reducer below has **no second-send transition** and does not call this optimiser. A refusal or closed conversation selects stop before considering a utility game. To add any future clarification workflow, specify a separate review, supported context and tests; elapsed time and a high q do not supply those inputs.

## A two-player game you can change

Two fictional players, A (rows) and B (columns), simultaneously choose **Ask** or **Wait** in an isolated, admissible one-shot exercise. Each cell contains **(A's utility, B's utility)**. These actions and payoffs are authored, not a reconstruction of private conversations.

| A \ B | Ask | Wait |
| --- | --- | --- |
| Ask | (1, 1) | (2, 0) |
| Wait | (0, 2) | (0, 0) |

A best response maximises a player's own payoff for a fixed choice of the other player. In a Nash equilibrium, both choices are best responses; neither player improves by changing alone. [MIT's game-theory recitation](https://ocw.mit.edu/courses/14-75-political-economy-and-economic-development-fall-2012/bf65c969a9bfd655e50589ba7283cda8_MIT14_75F12_Recitation8.pdf) explains these concepts and mixed strategies.

For A, if B asks, Ask gives 1 versus Wait's 0; if B waits, Ask gives 2 versus 0. Ask **strictly dominates** Wait: it is better against every opposing pure action. Read the second payoff coordinate for B and obtain the same comparisons. The unique equilibrium is **(Ask, Ask)**. The conclusion follows from this particular matrix, not from the word “Ask.”

### Change one cell and recompute

**Seven-minute exercise:** replace Ask/Ask with **(−1, −1)**, keeping the other three cells. Mark both players' best responses. Does Ask still strictly dominate? Which cells are pure equilibria?

**Worked answer:** against Ask, Wait now gives 0 rather than −1. Against Wait, Ask still gives 2 rather than 0. Neither pure action strictly dominates. The two pure equilibria are **(Ask, Wait)** and **(Wait, Ask)**. At Ask/Ask either player benefits from switching to Wait; at Wait/Wait either benefits from switching to Ask.

The code enumerates both players' best responses and checks their intersection. It does not select an equilibrium for the players, predict behaviour or prove a socially desirable outcome. Payoff ties can create several best responses; keep all of them.

### A mixed equilibrium is another model result

Let r be the probability the **other player** chooses Ask in the changed game. An Ask yields −r + 2(1 − r) = **2 − 3r**; a Wait yields zero. Indifference requires **r = 2/3**. By symmetry, both mixing with Ask probability 2/3 is a mixed equilibrium. At that point both pure actions give expected utility zero, so neither player gains from any unilateral mixture.

r is a strategy probability inside this game. It is not the earlier q, the Poisson arrival rate λ, or the chance a recipient consents. The calculation is not an instruction to randomise real messages. The two pure equilibria also remain; changing the solution concept has not removed the matrix's assumptions.

## Key concept: latency and read-receipt strategy

Extend the Week 6 tree with an explicit transition function and stored snapshots. [W3C's SCXML basic concepts](https://www.w3.org/TR/scxml/#Basic) provide a reference for states, event/condition transitions and precedence. We borrow those ideas, not an interpreter: this workbook uses a small pure JavaScript reducer, with no real clock, background queue, network or durable storage.

Use two distinct pieces of state:

- **Conversation phase:** ready → sent → pending → replied, with a terminal closed branch. A refusal passes through **declined → closed in one step**; declined appears in the trace and `closure: decline` retains the reason. There is no interval in which another event may reopen it.
- **Observation result:** not-started, open, reply, no-reply or ended. This says what was recorded inside a declared window; it is not the conversation's permission state.

Define “ghosting” operationally here as an unresolved conversation reaching its observation deadline. The recorded label is **no-reply within the window**, not a diagnosis of intention. Ending this observation window does not by itself close the conversation or authorise repeated contact. Choosing to close the conversation is a separate terminal event.

### Specify the event contract

Events contain `{ id, type, at }`. `type` is send, wait, delivered, read, reply, decline, block, close or timeout. Hours must be finite, non-negative and non-decreasing for new events. Retain the returned state before processing the next event. Names such as send describe authored **records**, never commands to a messaging service.

| Event or condition | State update | Local result |
| --- | --- | --- |
| Send record while ready | sent; save time; open observation window | Record only. |
| Wait after sent | pending | Record only. |
| Delivery/read receipt | Save that receipt's first observed time | No reply inference or send. |
| Reply before deadline | replied; observation = reply | Review reply content. |
| Deadline reached with no reply | Freeze observation = no-reply | No resend; pending may remain pending. |
| Reply at/after deadline, conversation open | replied; retain no-reply observation result | Review late reply. |
| Decline | declined → closed; retain refusal reason | Stop. |
| Block or local close | closed; retain closure reason | Stop. |
| Any later event after closed | Return the same closed snapshot | Stop. |

A decline is also an inbound reply: before the deadline it sets observation = reply while closing the conversation. A local close/block before the deadline without a reply sets **ended**, not a completed no-reply window. The external replay report retains ignored events; a closed snapshot itself is unchanged. Unknown event types and inconsistent records raise errors for review without changing the input or sending anything.

### Make the window boundary explicit

The trace fixture uses **two hours** for compact arithmetic, not Week 6's separate **48-hour** aggregate reply-count fixture and not a recommended human response deadline. Its window is half-open: **[send time, send time + 2 h)**. A reply exactly at the upper endpoint is outside it.

The reducer checks expiry when processing any new event, before classifying a reply. Therefore a late reply is late even if no timeout event was previously supplied. A timeout event before the deadline is rejected. Nothing wakes up automatically when time passes: a caller must supply an observation event; this is deterministic replay, not a running scheduler.

**Trace exercise:** send at 0, wait at 0.1, timeout at 2, reply at 3. Then replace timeout with a decline at 1. Compare both final states.

**Worked answer:** the first trace becomes replied with observation **no-reply** and action `review-late-reply`; it does not rewrite the completed two-hour outcome. The second becomes **closed, closure = decline**; the late reply returns stop and leaves the closed snapshot unchanged. Both emit zero messages.

**Deadline exercise:** compare replies at 1.999 and 2 hours. Process timeout and reply at exactly 2 in both orders.

**Worked answer:** 1.999 gives observation reply; 2 gives no-reply with late review. Both equal-time orders end replied/no-reply because expiry uses **≥**, not >. Event traces can have different order while agreeing on the window result. This is a declared course convention, not a statement about an app's delivery guarantees.

### Duplicates and broken histories

Replaying the same ID with the same type/time is a no-op, even if its original timestamp precedes the current state. Reusing an ID with different content is a conflict for review. A distinct second send record is rejected; a reply before a recorded opener or a new event with an older observation time is also rejected.

This small in-memory ledger offers deduplication only when the caller retains its state and identifiers. It does not promise exactly-once delivery, survive restarts or reconcile multiple observers. Do not silently sort or renumber a conflicting ledger. Preserve it for review; invalid input is not a reason to generate a fresh opener.

**Mutation exercise:** temporarily remove the closed-state guard. The refusal-then-late-reply test must fail because the phase changes to replied. Restore it. Separately change deadline ≥ to > and show that the exact-deadline test fails. Use literal expected states rather than a test that asks the same implementation what its answer should be.

## Run the worked calculations

Save these **five files in one folder**:

1. [week-07-cases.json](/data/week-07-cases.json) — versioned handoff, separate numeric fixtures and six event traces.
2. [week-07-models.mjs](/data/week-07-models.mjs) — event reducer, utility comparison and two-player best responses.
3. [week-07-worked-examples.mjs](/data/week-07-worked-examples.mjs) — executable calculations and trace assertions.
4. [week-06-models.mjs](/data/week-06-models.mjs) — the unchanged opening-message classifier actually used by the constructor.
5. [romance-models.mjs](/data/romance-models.mjs) — the unchanged generated module supplying the existing Poisson zero-count function.

```sh
node week-07-worked-examples.mjs
```

With Node installed, the download runs offline without third-party packages, a website or a messaging account. A spreadsheet or another implementation is accepted. The log prints count probabilities, the equal-mean mixture, utility ties and cost sensitivity, both payoff analyses, the mixed-strategy calculation and six state traces. Duplicate fixture IDs and conflicting event IDs are checked at different levels.

Passing tests shows consistency with these declared rules. It cannot establish a true recipient quote, infer a refusal from ambiguous prose, validate λ or q, or convert a game equilibrium into consent. Those gaps belong in the model's limitations, not in invented data.

## Handoff to Week 8 and the midterm

Save the **Communication state machine** with earlier candidate/invitation versions, the Week 6 decision and evidence, the transition table, timestamps/units, window convention, duplicate rule, literal tests and separate utility/payoff working. Retain uncertainty: missing telemetry and a late reply are not accusations.

Week 8 adds threat review to this same machine. Its review transition must be triggered by explicit case evidence and preserve terminal closure. A suspicious flag is not a verdict, and an unknown receipt or timeout is not by itself a threat label. Hand over the transition requirements; the Week 7 module does not implement a threat detector or a resume-from-review workflow.

The [midterm](/assessments/matchmaking-exam/) is **23 April 2027, 11 am–12.30 pm**. Question 4 asks for a Poisson zero-count calculation, a utility threshold and best responses in supplied payoffs. Practise on paper with a non-programmable calculator; the exam permits one double-sided A4 page of your own notes, and no executable code or AI tools. The changed matrix and numerical values are practice, not a prediction of exam inputs.

**Exit ticket:** explain why 0.8 expected arrivals is not an 80% reply chance; why q = 0.75 does not make clarification the best option; and why a late reply after refusal does not reopen the conversation. The answers are the count distribution, comparison with waiting, and the terminal guard.

For an optional **15–25-minute extension**, sweep q from 0 to 1 and locate intervals where each option is maximal, then verify both ties algebraically. Alternatively, add a delayed-receipt fixture and distinguish observation time from asserted event time without inventing either. State what additional persistence and ordering rules a real system would need.

[Continue to the Week 7 tutorial](/sessions/07-communication/) with your **Communication state machine** and its reproducible evidence.

## What Alex discovers

Alex can distinguish sending, reading, replying and closing. A timeout supplies no motive, and the toy models supply no universal reply time. That becomes useful when the next review exercise places an unanswered message beside a deposit request and conflicting identity claims. Those are separate authored cases: the investigation must distinguish a missing reply from evidence that warrants a hold.

[Review the warning signs with Alex in Week 8](/lectures/week-08/).
