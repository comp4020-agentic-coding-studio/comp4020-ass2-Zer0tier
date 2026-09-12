---
title: "Interaction Protocols: The Initial Message"
description: "Classify opening messages with a decision tree. Compare context and cost, and expose why forcing a reply is a broken optimisation target."
week: 6
date: 2027-03-29
teachers: [mira-chen]
keyConcept: "Bypassing the conversational firewall"
slides: /decks/week-06/
related: [sessions/06-message-tree]
---

## Alex's story · A shared hobby is not a send button

*Fictional course story · Week 6.*

Alex has a checked Library proposal and an empty message box in the fictional exercise. G1's supplied card says “I like board games.” For once, a shared-interest opener has evidence on both sides. Other cards have missing context or a refusal. A template that inserts “board games” everywhere would be efficient at making exactly the wrong assumption.

**Investigate this week:** Use the recipient cards to justify a draft and trace the ordered tree. Which evidence changes the action before you calculate utility?

## Your opener needs a stop condition

After a match, communication becomes a protocol with another operator. An opener can offer context and a manageable question; it cannot require an answer. This week turns that distinction into an ordered **Message decision tree**, tests conflicting inputs, and asks what a reply-rate objective leaves out.

[Open the 50-slide teaching deck](/decks/week-06/). **A/D** or the scroll wheel changes slides; **Esc** returns here.

By the end, you should be able to justify an opener with case evidence, implement refusal-first routing, preserve pending and closed decisions, compare invented reply rates and costs, and pass an explicit behavioural contract to Week 7's asynchronous model.

## Scheduled teaching and independent work

### 60-minute lecture

Monday, **11 am–12 pm**. Use only these selections from the [complete deck](/decks/week-06/), in order. The timings include explanation, brief working and questions; full exercise timers elsewhere belong to the complete resource route.

| Lecture time | Slides | Focus |
| --- | --- | --- |
| 0–10 min | 4–6, 9 | Join each opener claim to supplied evidence and preserve the boundary before scoring. |
| 10–25 min | 11–13, 16–17 | Trace the ordered snapshot decision and explain pending input and a pure function. |
| 25–40 min | 22–23, 27, 29, 32 | Calculate reply rates, introduce time cost and derive the utility crossover. |
| 40–55 min | 36–38, 41–42 | Exclude pressure before optimisation and specify adversarial tests. |
| 55–60 min | 46, 50 | Identify the asynchronous handoff and check one exam-style explanation. |

### 90-minute tutorial

Thursday, **2–3.30 pm**. Follow the [Week 6 tutorial](/sessions/06-message-tree/): **20 minutes opener evidence; 25 minutes ordered tree; 20 minutes rates and utility; 25 minutes tests, handoff and quiz**. The last block includes ten minutes for the interactive quiz and its debrief. These four blocks fill the whole session. Bring lecture working for checking and refinement; complete each exercise once. Solo work and review are accepted.

### Independent work · about 210 minutes

- **30 minutes — before Monday:** Bring the Bio experiment protocol and Match probability model; inspect the supplied recipient evidence and snapshot fields.
- **90 minutes — between Monday and Thursday:** Review remaining worked cases, especially malformed inputs, cost ties and the limits of the tests (slides 18–20, 33–35 and 43–45). Open the four-file workbook and annotate the cases to test on Thursday.
- **90 minutes — consolidation and assessment:** Finish the tested Message decision tree and handoff. Use the remaining study time for paper explanations of rates, utility and guard order before the midterm.

Together this is about **six hours: 60 + 90 + 210 minutes**. Slides and full-length exercises outside the lecture selection are independent study unless assigned in the tutorial’s four blocks. Use the worked answers to check an attempt; optional extensions can use consolidation time. The complete route below reuses this material and adds no scheduled meeting or extra three-hour study requirement.

<span id="a-180-minute-teaching-route"></span>

## Complete teaching pack

The full **50-slide pack** and all worked notes remain the complete resource. This **180-minute reference route includes a ten-minute break** for someone facilitating the whole pack in one sitting. It is separate from the scheduled selections above: the break slide is skipped in the 60-minute lecture and the tutorial keeps its own 90-minute plan. These are facilitation estimates, including practical work and debriefs.

| Elapsed time | Slides | Activity and evidence produced |
| --- | --- | --- |
| 0–30 min | 1–9 | Audit the fixed case and recipient evidence; repair two unsupported openers in five minutes; compare plain questions and niche humour. |
| 30–65 min | 10–20 | Specify routing fields and guard order; trace conflicting cases in seven minutes; implement the pure classifier; audit broken inputs in five minutes. |
| 65–75 min | 21 | Break. |
| 75–110 min | 22–31 | Define a reply exposure; recode a count in five minutes; inspect missing windows; price composition time and calculate utilities in seven minutes. |
| 110–145 min | 32–41 | Derive the cost crossover; solve ties and abstention in five minutes; inspect the pressure counterexample and repair its optimiser in six minutes. |
| 145–180 min | 42–50 | Break the guard order in seven minutes; review what tests cannot prove; prepare a six-minute handoff review and an exam-style exit ticket. |

Optional extensions below can use 15–25 minutes of independent consolidation time.

## Reuse the supported candidate and feasible plan

Alex remains a fictional adult CS student who likes **board games and terrible puns**, travels by **bus**, is free **Friday 5–7 pm**, has **$20 total** for an outing, and wants to meet someone with the possibility of a relationship. Those [case facts](/toolkit/#benchmark) remain fixed.

Bring Week 4's supported bio and frozen **A-portrait-v1** photo, including its unchanged bytes, crop, alt text and display treatment. Bring Week 5's checked invitation as a separate planning artefact; do not rewrite the frozen benchmark candidate merely to fit an opener. In the supplied Library example, Alex's invented itinerary takes 100 minutes and costs $14, with a 17:20–18:20 meeting. This establishes Alex's feasibility under the route inputs, not another person's availability, travel cost or acceptance.

The [Week 6 case file](/data/week-06-cases.json) provides three independent fictional recipient cards:

| Card | Supplied topic evidence | What remains unknown |
| --- | --- | --- |
| G1 | “I like board games.” | Preferred games, humour, Friday availability and interest in this invitation. |
| U1 | No topic field supplied. | Any shared hobby; missing information is not evidence of dislike. |
| H1 | “I like hiking.” | Favourite trail and whether any interests overlap with Alex's supported facts. |

These cards are teaching inputs, not profiles to find or contact. The routing examples assume an existing fictional match. Matching is not permission to disregard a boundary.

## Context is an evidence join

For each proposed shared detail, write the Alex fact and the recipient quote that support it. **Alex likes board games + G1 says “I like board games”** supports a board-games question. Alex's own interest does not establish that U1 shares it, and H1's hiking interest does not create a hiking history for Alex.

Compare the exact authored messages in the download:

| Candidate | Text | Review question |
| --- | --- | --- |
| Minimal | “Hey.” | What can someone answer besides another greeting? |
| Contextual | “You mentioned board games. Co-op or competitive? No pressure to reply.” | Is the recipient's board-games quote actually supplied? |
| Plain | “Hi, I'm Alex. I'd like to get to know you. Fine to pass.” | Does the text avoid inventing recipient interests? |
| Niche joke | “Is this a co-op campaign or a competitive matchmaking queue? Fine to pass.” | Does a board-games interest establish understanding of this campaign/queue reference? |

The last answer is no. The joke is a design option to review, not an empirically superior line. The contextual question reduces the reference burden by stating the topic, but it still supplies no reply probability by itself.

**Repair exercise:** for U1, audit “You love board games, so let's play Friday.” For H1, audit “As a fellow hiker, I know your favourite trail.” Write a plain introduction and a G1-specific question.

**Worked answer:** use the plain and contextual examples above. U1 has no supplied hobby or Friday availability. Alex has no hiking history in the case, and H1's favourite trail is unknown. The repair removes unsupported premises instead of replacing them with different invented facts. The optional Library plan may be offered as a question after appropriate context; never describe it as an agreed meeting.

## Key concept: the conversational firewall

“Bypassing the conversational firewall” means removing avoidable ambiguity, not bypassing a person's boundary. “Format a message that **forces a response**” is a deliberately broken objective. A reply counter can reward pressure, including replies asking for contact to stop.

The course rule is to review admissibility before optimisation: supported claims, an optional invitation, and no known refusal or block. A “no pressure” suffix does not cancel a demand elsewhere in a message. This rule is a declared design constraint; it is not a sentiment classifier or a prediction of anyone's feelings.

## A tree with an exit, a history and an unknown state

Use a structured snapshot. The classroom labels are supplied by the case author or human review; the code does not extract them from private messages.

| Input | Meaning in this workbook |
| --- | --- |
| `closed` | A Boolean recording whether this conversation is already closed. Closure is retained by the caller. |
| `boundary` | `clear`, `declined`, `blocked` or `unknown`. Clear means the supplied record contains no known refusal/block; it is not general consent. |
| `sent` | A Boolean recording whether Alex's opener was sent in this conversation. The classifier never changes it. |
| `inbound` | `none`, `reply` or `decline`. A decline takes priority; a reply means a response to the recorded opener, not a receipt or inferred mood. |
| `recipient` | A case ID with topic/quote pairs, or missing topic evidence. Malformed evidence is reviewed rather than trusted. |

The decision order is:

1. **Terminal evidence:** if closed, declined, blocked, or a new decline is recorded, return `stop`. This takes priority even when unrelated topic metadata is broken.
2. **Routing metadata:** require `closed: false`, `boundary: clear`, a Boolean `sent`, and `inbound` of none or reply. Unknown or invalid values return `review`, with no draft.
3. **History:** a reply with no recorded opener is inconsistent in this fixture and returns `review`. A reply to a recorded opener returns `respond`; sent with no reply returns `pending`.
4. **Context:** with no opener sent, use `draft-context` only when a board-games quote is supplied for the recipient. Missing, empty or unrelated topic evidence gives `draft-plain`. Malformed topic records return `review`.

The contextual branch intentionally supports **board games only** in version 1. A future puns or other-topic branch needs its own evidence rule, draft and tests; absence from this small branch set does not mean the people have no other interests.

[MDN's ordered if…else description](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) explains why a chain skips later alternatives once a condition matches. Our implementation uses early returns for the same one-result control flow:

```text
if terminal evidence: return stop
if routing metadata is unknown or invalid: return review
if a reply is inconsistent with send history: return review
if reply to a recorded opener: return respond
if opener already sent: return pending
if recipient evidence is malformed: return review
if supported board-games context: return draft-context
return draft-plain
```

Do not use independent assignments such as “if declined, set stop; if shared topic, set draft.” The later assignment could overwrite the stop. A guard's position is part of the policy, not just a formatting choice.

### Trace the conflicting conditions

**Exercise:** give G1's shared-topic evidence to each snapshot. Predict both the output and which stages are reached.

| Case | Expected action | Stages reached |
| --- | --- | --- |
| Prior refusal, no opener sent | `stop` | terminal |
| Clear boundary, opener sent, no reply | `pending` | terminal → metadata → history |
| Clear boundary, opener sent, reply received | `respond` | terminal → metadata → history |
| Closed conversation, late reply appears | `stop` | terminal |
| Clear boundary, no opener, no inbound event | `draft-context` | terminal → metadata → history → context |

The first four never inspect the tempting shared topic. `respond` asks the student to review and respond to the actual content; it does not generate another opener or treat every reply as agreement. If a reply includes an explicit refusal, the supplied label must be `decline`, and the terminal guard wins.

### Unknown, false and pending are different

**Broken-input exercise:** combine a refusal with malformed recipient data; an unknown boundary with a good topic quote; a reply with `sent: false`; and an empty topic list with otherwise valid metadata.

**Answers:** stop, review, review, and plain draft, respectively. `sent: "false"` is a string rather than a Boolean and also returns review. A missing hobby can be handled without inventing one; a missing boundary record cannot be treated as a known-clear history.

Pending means an opener is already recorded and no inbound reply has been observed in the snapshot. It does not label a person uninterested, busy or manipulative. Re-running the same pending input returns pending. A read receipt or elapsed time is not an inbound reply and does not supply a new opener opportunity.

The classifier is a **pure function**, with `sendsMessage: false` on every result. It does not mutate inputs, send, persist history, interpret free text or advance a clock. Repeated calls on an unsent snapshot can still return a draft: the caller has to record any subsequent send. This is not an exactly-once delivery system. Week 7 adds event-driven state and timing; this week defines its required behaviour.

## Count replies without inventing an effect

The original comparison remains **2/10 for “Hey” versus 4/10 for the board-game opener**. These are authored counts for two disjoint groups, not measurements of messages actually sent. One exposure is one fictional matched conversation assigned one opener and observed through a complete **48-hour window**. Any inbound reply, including a decline, counts once. No random allocation is supplied.

| Opener | Replies | Exposures | Observed rate |
| --- | --- | --- | --- |
| Hey | 2 | 10 | 20% |
| Games | 4 | 10 | 40% |

The count difference is two replies, the rate difference is **20 percentage points**, and the rate ratio is **2**. These descriptions do not establish that switching wording doubles a person's reply probability. Recipient context, allocation and other inputs might differ; the fixture contains no record that identifies a causal effect.

**Sensitivity exercise:** recode one Games reply as no reply. Its rate becomes 3/10 = 30%, and the difference falls to ten points. One row moves a ten-exposure rate by ten percentage points. Now discover an incomplete observation window: do not silently code it zero. Finish observation or apply a prespecified missing-data method; the aggregate file cannot recover absent individual records.

The rate routine returns an undefined value (`null`) for 0/0, zero for 0/10, and rejects 11/10 or negative/fractional counts. “No reply within the complete window” is different from “we do not have the outcome.” Neither says a reply can never arrive.

The [NIST two-proportion normal method](https://itl.nist.gov/div898/handbook/prc/section3/prc33.htm) requires suitable statistical assumptions. Week 4's existing calculator withholds z for 2/10 versus 4/10 because the counts fail its conservative ten-per-cell guardrail. Withholding an approximation is not evidence of equality. A different method would still not manufacture random assignment or validate the case's dating probabilities.

## A cost model can change the preferred opener

Start a **separate utility exercise** with assumed reply probabilities 0.20 and 0.40. Their numerical agreement with the observed rates above does not make those tiny counts validated estimates. Composition times of ten and thirty seconds are invented inputs, not recorded writer timings.

Expected replies per composition second would be 0.20/10 = **0.020** for Hey and 0.40/30 ≈ **0.0133** for Games. This ratio favours the cheaper opener while per-opportunity probability favours Games. Recipient effort, future conversation and reply content are absent from both summaries.

Define an explicit utility for admissible options:

```text
U = V × p − λ × t
V = 10 utility units per reply
p = assumed reply probability
t = composition seconds
λ = utility units per second
defer = 0 utility units
```

Both terms have utility units. They are a classroom accounting device, not a value placed on a person. Defer is available even when a draft passes the content review; an admissible message need not be sent.

**Calculation exercise:** at λ = 0.05, Hey scores 10 × 0.20 − 0.05 × 10 = **1.5**. Games scores 10 × 0.40 − 0.05 × 30 = **2.5**. Games has the larger utility under these specific inputs.

### Derive the crossover and include ties

```text
U(Games) − U(Hey) = (4 − 30λ) − (2 − 10λ)
                  = 2 − 20λ
```

Games beats Hey when λ < **0.10**, they tie at 0.10, and Hey beats Games above 0.10. That pairwise comparison still needs to include defer's zero.

| λ, units/second | Hey | Games | Highest utility among admissible options and defer |
| --- | --- | --- | --- |
| 0.05 | 1.5 | 2.5 | Games |
| 0.10 | 1.0 | 1.0 | Tie: Hey and Games |
| 0.15 | 0.5 | −0.5 | Hey |
| 0.20 | 0.0 | −2.0 | Tie: Hey and defer |
| 0.25 | −0.5 | −3.5 | Defer |

**Sensitivity exercise:** retain λ = 0.05 but reduce assumed p(Games) to 0.25. Its utility becomes **1.0**, below Hey's 1.5. This is a changed-input scenario, not a confidence bound. Under the original probabilities, the complete policy is Games below 0.10, a message tie at 0.10, Hey between 0.10 and 0.20, a Hey/defer tie at 0.20, and defer above 0.20, for non-negative λ.

The workbook retains every maximiser within a declared absolute arithmetic tolerance of **1e−10 utility units**, leaving ties for review. That tolerance handles floating-point representation in this exercise; it is not a measured indifference threshold. Invalid probabilities, costs, duplicate option IDs and non-finite utility arithmetic are rejected. The function does not fit p or infer whether a message is admissible.

## Repair the objective before optimising it

The following is a **separate pressure counterexample**, not the two-group opener data. It invents ten conversations per row. “Answers” means response content that answers the posed question; “declines” means explicit refusal; “none” means no reply within the complete window. The categories are mutually exclusive for this fixture, with refusal taking precedence over other content. No emotion is inferred.

| Candidate | Answers | Declines | None | Any-reply rate | Answer rate |
| --- | --- | --- | --- | --- | --- |
| Optional wording | 3 | 1 | 6 | 4/10 = 40% | 3/10 = 30% |
| Demand for a response | 1 | 5 | 4 | 6/10 = 60% | 1/10 = 10% |

The demand wins the any-reply counter while producing fewer answers and violating the optional-contact rule. Even an answer would not establish agreement to meet. These fabricated numbers illustrate an objective mismatch; they are not evidence about the size of a real pressure effect.

**Repair exercise:** an optimiser subtracts a small pressure penalty but still chooses the demand if its score wins. Explain the failure and replace the rule.

**Worked answer:** a finite penalty can be outweighed by the score. Use a hard admissibility filter **before** comparing utility. The demand is excluded regardless of its predicted replies; the optional candidate and defer remain. If both messages are excluded, defer is the only option. Changing the probability or composition cost must not change whether a prior refusal selects stop.

`compareDrafts` takes an explicit Boolean `admissible` for each option. That is a supplied human/policy judgement, not a classifier output inferred from words. The teaching separation is deliberate: `routeMessage` determines whether an opener draft is even relevant; only then may a student compare reviewed candidate wordings. Never call the utility optimiser to override stop, review, pending or a received reply. No function sends messages.

## Adversarial tests and their limits

Use cases that make two conditions compete. A test with only a shared topic never checks whether refusal actually takes priority.

| Test input | Literal expected behaviour |
| --- | --- |
| G1's topic plus an explicit refusal | Stop, with no context branch in the trace. |
| Closed history plus a late reply | Stop; do not automatically reopen the conversation. |
| Sent opener, no reply, strong topic evidence | Pending; no new opener. |
| U1's missing topic with clear routing metadata | Plain draft; no invented shared hobby. |
| Good topic plus unknown boundary | Review; no draft. |
| Malformed topic data plus refusal | Stop; unrelated parsing must not bypass terminal evidence. |
| `sent: "false"` or reply without a recorded opener | Review the malformed or inconsistent snapshot. |
| Pressure marked inadmissible, even with a high supplied probability | Exclude it before calculating its utility. |

**Mutation exercise:** move the topic branch ahead of the terminal guard and run the G1-refusal test. It should fail by producing a draft. Restore the order and show that the test passes. Re-run a pending snapshot twice and compare its input before/after; this classifier must not mutate it. Persist the expected action, actual action and trace, rather than merely asserting that the source contains the word “stop.”

Passing these checks does not establish that a quote is faithful to its source. The code checks evidence shape and the exact `board-games` tag; a human must check whether the tag is supported by its quote. It does not understand sarcasm, extract consent, resolve ambiguous refusals or guarantee reliable state storage. Ambiguous routing information goes to review, and a good-looking utility cannot fill the gap.

## Run the worked calculations

Save these **four files in the same folder**:

1. [week-06-cases.json](/data/week-06-cases.json) — recipient cards, authored messages, ten routing cases and separate count/cost fixtures.
2. [week-06-models.mjs](/data/week-06-models.mjs) — snapshot routing, reply rates and admissible-draft utilities.
3. [week-06-worked-examples.mjs](/data/week-06-worked-examples.mjs) — executable traces and literal arithmetic checks.
4. [romance-models.mjs](/data/romance-models.mjs) — the existing comparison method, reused to demonstrate the sparse-cell guardrail.

With Node installed, run:

```sh
node week-06-worked-examples.mjs
```

The download runs offline without third-party packages, a website or a messaging account. A spreadsheet or another implementation is accepted. The log prints ten routing traces, 20%/40% observed rates, a 0.20 difference and ratio 2, the withheld z, utilities at four cost settings, and the excluded demand. No message is sent and no human response is simulated by executing the decision tree.

The fixture loader rejects duplicate case/recipient IDs and unresolved recipient references. To experiment, copy and version the inputs rather than overwriting the supplied baseline; updating an expected answer to match a broken implementation is not a repair.

## Handoff to Week 7

Save the supported bio/photo versions, checked invitation, recipient quotes, ordered tree, input schema, literal traces, utility assumptions and admissibility review in one **Message decision tree** notebook. Include a contextual opener and a plain alternative; preserve the unknowns in each. Review another student's record or audit your own using the same questions.

Week 7 converts the decisions into sent, pending, replied, declined and closed states. [W3C's SCXML introduction](https://www.w3.org/TR/scxml/#Basic) illustrates named states and event/condition-based transitions; its ordered-transition examples show why precedence needs a specification. We borrow the notation idea, not its full interpreter: this week's workbook is a snapshot classifier and implements no SCXML, clock, queue or state persistence.

The handoff must preserve these requirements: a refusal moves to closed; a late reply does not automatically reopen a closed conversation; elapsed time and read receipts do not authorise another opener; missing routing data requires review. Week 7 supplies the timing and observation-timeout rules. Its utility game must operate within these boundaries rather than replacing them.

The [midterm](/assessments/matchmaking-exam/) is **23 April, 11 am–12.30 pm**. Question 3 includes tracing an unfamiliar message tree with missing information and refusal. Practise the trace on paper: executable code is not permitted during that exam.

**Exit ticket:** repair “missing hobby means invent context,” “no reply means send again,” and “more pressured replies means a better opener.” The repairs are a plain draft, pending, and an admissibility constraint before scoring.

For an optional **15–25-minute extension**, enumerate every valid combination of boundary, closed, sent and inbound values, then group results by which guard wins. Include conflicting terminal evidence and verify that no terminal combination produces a draft. Alternatively, add a puns branch with a new authored recipient quote, a supported message and literal tests. Explain why branch coverage still cannot certify the truth of a quote or the quality of a message.

[Continue to the Week 6 tutorial](/sessions/06-message-tree/) with the **Message decision tree** and its reproducible evidence.

## What Alex discovers

Alex's tree can produce a supported draft, preserve a refusal and leave an unanswered opener pending. Running it again does not create permission to send again. The next exercise finally records a send, then a wait. The draft has become a sequence of events, and the tree alone cannot tell Alex what happened between them.

[Follow Alex's message timeline in Week 7](/lectures/week-07/).
