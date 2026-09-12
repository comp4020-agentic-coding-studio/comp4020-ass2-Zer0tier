---
title: "Interaction Protocols: The Initial Message"
description: "Classify opening messages with a decision tree. Compare context and cost, and expose why forcing a reply is a broken optimisation target."
week: 6
date: 2027-04-01
teachers: [eli-brooks]
phase: Model
output: "Message decision tree"
buildsOn: ["sessions/04-bio-experiment","sessions/05-match-probability"]
related: ["lectures/week-06","sessions/04-bio-experiment","sessions/05-match-probability"]
spec:
  - "A prior refusal selects stop before any message-optimisation branch; missing facts cannot be invented."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Inputs

Bring the **Bio experiment protocol** and **Match probability model**: the supported bio, frozen **A-portrait-v1** photo, and checked invitation with its route assumptions. Recipient availability remains unknown. Save the [four-file Week 6 workbook](/lectures/week-06/#run-the-worked-calculations), or use its tables in a spreadsheet or your preferred language. All recipient cards and counts are authored fixtures; no real profiles, app account or messaging history are required.

Finish with [The opener optimiser needs a stop button: the interactive quiz](#message-audit-quiz). Six new cases include sample openers, routing snapshots, reply tables and a utility diagram. Apply the week's evidence and protocol rules, then submit all six responses to unlock the score and worked explanations. The quiz is practice and carries no course marks.

Follow the [60-minute lecture selection and independent-work plan](/lectures/week-06/#scheduled-teaching-and-independent-work). Complete the preparation and open the workbook before Thursday. The four blocks below are the entire **90-minute tutorial**; use existing lecture or study working for review and refinement. Remaining pack material belongs to the week’s independent study allocation.

## 90-minute tutorial

1. **20 minutes — classify and repair openers.** Compare “Hey,” the campaign/queue joke, the board-games question and the plain introduction. Join each claimed shared detail to an Alex fact and a supplied recipient quote. Repair the U1 and H1 examples without inventing interests, history or availability. Keep the Week 5 invitation optional and separate from the frozen bio.
2. **25 minutes — implement the ordered tree.** Use the first five minutes with the [Romance Debugger](/romance-debugger/), or hand-trace the same cases from the workbook. Inspect one accepted action, one held action and one valid “we don't know yet.” Use the remaining twenty minutes to implement the declared snapshot fields and return stop, review, respond, pending or a local draft. Trace refusal plus a shared topic, sent-without-reply, a reply to an opener and a late reply after closure. Test missing topic evidence, unknown boundaries and malformed Boolean/history values. The function returns a decision; it does not send or store a message. The debugger adds a local record around that function; its downloadable trace can support your pseudocode explanation.
3. **20 minutes — calculate rates and costs.** Reproduce 2/10 and 4/10, the 20-point difference and ratio 2; then recode one reply and explain the changed comparison. Calculate U = 10p − λt with the separate assumed probabilities and ten/thirty-second costs. Verify the crossover at λ = 0.10, the message tie, and defer winning at λ = 0.25.
4. **25 minutes — adversarial review, handoff and quiz.** Use fifteen minutes to move context ahead of refusal and show a literal test failing; restore the order. Compare the separate pressure fixture's any-reply and answer rates, excluding the demand before scoring. Test repeated pending input and unchanged input data. Exchange or self-review the evidence, then save the constraints Week 7's state machine must preserve. Use the final ten minutes for the [six-case quiz](#message-audit-quiz): about eight minutes to respond and two to review the explanations after all cases are answered.

## Deliverable: Message decision tree

Save one notebook or equivalent bundle with the ordered tree or pseudocode, input schema, two supported openers, evidence quotes and the earlier invitation version. Include at least three literal input/output tests covering refusal, missing topic and pending; add unknown-boundary and closed/late-reply cases to defend priority. Preserve both the expected output and executed trace.

Attach the reply-rate working, the cost crossover and tie rule, one changed-probability scenario, and the pressure-objective repair. State that the probability inputs and costs are assumed, admissibility is a supplied review judgement, and the classifier neither understands free text nor persists send history. “Pending” must not imply permission to send again. A green trace cannot establish that a quote is true.

The [lecture notes](/lectures/week-06/) and executable workbook contain worked checks. The [midterm](/assessments/matchmaking-exam/) uses unfamiliar branches on paper, so practise explaining the decision without running the supplied code.

Week 7 converts these branches into states and events, preserving the refusal-first rule. Pass along the closed-state requirement, distinction between no reply and missing data, and the need to record sends separately. Timing, queues and observation timeouts are next week's work.
