---
title: "Transitioning to Offline Environments"
description: "Plan the digital-to-physical handshake: public venues, transport, accessible exits, confirmation and an agreed approach to the bill."
week: 9
date: 2027-05-03
teachers: [casimir-beng]
keyConcept: "Reducing the friction of the digital-to-physical handshake"
related: [sessions/09-offline-handover]
slides: /decks/week-09/
---

## Alex's story · The café plan changes version

*Fictional course story · Week 9.*

In the supplied reply-and-clearance branch, Alex can finally draft an offline proposal. The workbook introduces Atrium as a new option beside the earlier Library plan. Its two drinks, bus journey and meeting window fit the stated limits. Then the cost-sharing exercise changes who would pay. A previous “yes” is suddenly attached to a plan nobody is proposing anymore.

**Investigate this week:** Check the complete itinerary, then replay proposal revisions and confirmations. Which version has each person actually agreed to?

## Migrating to the physical server

An offline meeting has transport constraints, opening times and people who can change their minds. The engineering task is to make a proposal understandable and revisable without treating a favourable score as agreement. Your output is an **Offline handover plan**: venue decisions, explicit proposed costs, versioned confirmation records, a cancel branch and an exact contingency table.

By the end, you should be able to filter venues before ranking preferences, account for both travel legs, distinguish cost arithmetic from a cost agreement, enumerate four joint outcomes, compare means with tail risk, and preserve cancellation when a late confirmation arrives. Every venue, price, route, probability and event in this pack is **authored fictional teaching data**. There is no venue recommendation, booking, payment or actual recipient experiment.

## Scheduled teaching and independent work

### 60-minute lecture

Monday, **11 am–12 pm**. Use only these selections from the [complete deck](/decks/week-09/), in order. The timings include explanation, brief working and questions; full exercise timers elsewhere belong to the complete resource route.

| Lecture time | Slides | Focus |
| --- | --- | --- |
| 0–10 min | 5–7, 10 | Reject infeasible venues before applying preferences and explain access assumptions. |
| 10–25 min | 12, 15–18, 20 | Trace costs, version-specific confirmations, revised terms and cancellation. |
| 25–40 min | 22–24, 27–28 | Enumerate joint contingencies and calculate expectation and strict exceedance. |
| 40–55 min | 32–33, 36, 42 | Change dependence while preserving marginals and explain fallback limits. |
| 55–60 min | 48, 50 | Check the Offline handover plan and the Week 10 boundary. |

### 90-minute tutorial

Thursday, **2–3.30 pm**. Follow the [Week 9 tutorial](/sessions/09-offline-handover/): **20 minutes venue filtering; 20 minutes handshake; 30 minutes contingencies; 20 minutes dependence review and quiz**. The last block includes ten minutes for the interactive quiz and its debrief. These four blocks fill the whole session. Bring lecture working for checking and refinement; complete each exercise once. Solo work and review are accepted.

### Independent work · about 210 minutes

- **30 minutes — before Monday:** Bring the Threat model and Match probability model; inspect the venue cards and the separate Atrium proposal.
- **90 minutes — between Monday and Thursday:** Review remaining worked answers, especially joint-probability bounds and fallback state changes (slides 37–41 and 43–46). Open the ten-file workbook and prepare the version/cost records, dependence calculation and one mutation/restoration result for Thursday's review.
- **90 minutes — consolidation and assessment:** Check the Offline handover plan, rejection reasons and cancellation traces. Preserve the versions and assumptions needed by the final project.

Together this is about **six hours: 60 + 90 + 210 minutes**. Slides and full-length exercises outside the lecture selection are independent study unless assigned in the tutorial’s four blocks. Use the worked answers to check an attempt; optional extensions can use consolidation time. The complete route below reuses this material and adds no scheduled meeting or extra three-hour study requirement.

<span id="three-hour-teaching-route"></span>

## Complete teaching pack

The full **50-slide pack** and all worked notes remain the complete resource. This **180-minute reference route includes a ten-minute break** for someone facilitating the whole pack in one sitting. It is separate from the scheduled selections above: the break slide is skipped in the 60-minute lecture and the tutorial keeps its own 90-minute plan. These are facilitation estimates, including practical work and debriefs.

| Elapsed time | Slides | Work and evidence |
| --- | --- | --- |
| 0–35 min | 1–10 | Reconnect earlier versions, trace the route and reject unsuitable venues. |
| 35–65 min | 11–20 | Compare preferences, split costs and trace a versioned proposal. |
| 65–75 min | 21 | Break. |
| 75–110 min | 22–31 | Enumerate independent outcomes; calculate means and strict exceedance. |
| 110–145 min | 32–41 | Change dependence, derive tail bounds and change the baseline. |
| 145–180 min | 42–50 | Review fallback assumptions, test the state machine and hand over to Week 10. |

Duration is a facilitation estimate, not a promise implied by slide count. A faster group can spend another 15–20 minutes on a changed return route, the complete coupling bounds, or a deadline/revision event trace. These are optional extensions, not new assessments.

## Reconnect the actual earlier artefacts

Alex remains an adult CS student who likes board games and terrible puns and may want a relationship. Keep **Friday 5–7 pm, bus travel and $20 total** fixed. The [Week 5 Match probability model](/lectures/week-05/) included a Library proposal taking **100 minutes and $14**. The workbook recalculates that result from the unchanged Week 5 file and retains its invitation version through the [Week 8 Threat model](/lectures/week-08/).

This week's Atrium proposal is a **different authored option**, taking **90 minutes and $14**. It does not quietly shorten the Library visit. Its version names Atrium and its cost mode; it also records `priorInvitationVersion: week-05-v1:library` so the change is visible. The earlier supported bio, frozen photo and G1 quote remain attached through the actual Week 7/8 snapshots.

A Week 8 review clearance does not accept either invitation. The handover constructor requires an unheld **replied** record; pending, review and closed records cannot initialise a fresh proposal. The downloadable report demonstrates a supplied reply and an assumed reviewer clearance using the actual earlier functions. That authored branch demonstrates program behaviour, not identity verification or recipient willingness to meet.

## Hard constraints before preferences

Use a two-stage algorithm. First reject any venue with a failed or unknown required observation. Then rank the remaining venues using stated preference weights. A score cannot compensate for a missing exit or a journey that ends after Alex's window.

The course's hard checks are: public setting, access appropriate to the supplied fictional route requirements, an independently usable exit, bus compatibility, an open venue throughout the meeting, all travel and meeting time within 17:00–19:00, and Alex's total within $20. These are explicit exercise constraints, not a guarantee of real-world safety.

For this exercise, access requires a continuous step-free route from bus stop to table and exit. The exit check requires being able to leave without depending on the counterpart's transport or permission. `access: true` records that this supplied requirement was checked; it is not a diagnosis or a universal accessibility certificate. An unknown field fails the check. Describe the route and unresolved requirement without inferring a disability, preference or limitation from Alex's biography. The cards supply fictional observations for this specific audit.

The [eSafety online-dating guide](https://www.esafety.gov.au/key-topics/staying-safe/online-dating) discusses preparing before meeting, sharing plans with a trusted person where possible, and choosing whether and when to meet. Apply those planning principles to the fictional case. The classroom artefact needs no real phone number, home address, identity-document image or live location stream. A checklist cannot guarantee an outcome.

### Trace the whole journey

For Atrium, depart at **17:00**, travel 20 minutes, meet from **17:20 to 18:10**, and return in 20 minutes, reaching home at **18:30**. Total = 20 + 50 + 20 = **90 minutes**, leaving 30 minutes in Alex's window. Each travel leg already includes its authored walking, bus and waiting allowance. Counting only the outbound leg would manufacture spare time.

The venue opens at 16:00 and closes at 19:00. Check the meeting interval against those times. Reaching a place before it opens is not repaired by excellent lighting. Equality is allowed at the hard finish and budget limits: home at 19:00 or cost exactly $20 passes this model. Anything later or dearer fails.

| Authored venue | Time / Alex cost, cover both | Hard result | Preference result at weights 3:1 |
| --- | --- | --- | --- |
| Atrium café | 90 min / $14 | Pass | 15 |
| Private loft | 90 min / $14 | Reject: private setting and failed exit | Excluded |
| Gallery café | 130 min / $22 | Reject: arrival before opening, time and budget | Excluded |
| Annex kiosk, alternative | 100 min / $20 | Pass | 14 |

**Exercise — six minutes.** Reconstruct each rejection from the cards. The Gallery arrival is 17:30, opening is 17:40, meeting lasts 70 minutes and the return takes 30. Would moving the Gallery departure ten minutes later fix the complete plan?

**Debrief.** Gallery initially reaches home at 19:10, after arriving ten minutes before opening. A later departure repairs the opening mismatch but reaches home at 19:20; cost also remains $22. Loft fails public and exit checks even with perfect preference scores. Annex fits at $20 exactly. Report every failed hard constraint rather than stopping at the first and concealing the others.

### Rank only the eligible set

Use the toy score **w × quiet + lighting**, with authored quiet/light values on a 0–5 scale. Atrium has (4,3), Annex (3,5). At w = 3, scores are 15 and 14. At w = 1, scores are 7 and 8. They tie when **4w + 3 = 3w + 5**, giving **w = 2**, both at 11.

The weights express a planning assumption, not a newly invented fact about Alex. Retain ties and the underlying attributes. Their purpose is to make a trade-off discussable. Do not multiply a failed access check by a small penalty and let enough lighting points cancel it.

## Cost sharing is a protocol

The Atrium fixture supplies **two $6 drinks and $2 of Alex's round-trip transport**. If Alex offers to cover both drinks, Alex's proposed total is 6 + 6 + 2 = **$14**, and the counterpart's drink contribution is $0. If each covers one drink, Alex's proposed total is 6 + 2 = **$8**, and the counterpart contributes $6 for their drink. The counterpart's transport cost is **unknown**, so the program returns `null` for it rather than inventing a zero.

**Exercise — four minutes.** Write both contributions under each arrangement. Which number belongs to Alex's $20 constraint? Does a correct split calculation establish agreement?

**Debrief.** Apply the budget to Alex's complete total, including transport. The two drink contributions sum to $12 in either mode. The numerical split is a proposal until both fictional parties explicitly confirm that version. Paying for a drink does not create an obligation to stay, reply or agree to another activity. Either cost proposal may be declined.

Store money as whole cents, with two equal-priced drinks in this fixture. Reject an unknown cost mode or a half-cent result. Actual unequal orders, service charges and changed prices would require another specification; they are not silently assumed to fit this two-drink function.

## Key concept: the digital-to-physical handshake

A useful handover names a proposed public place and date, a time window, proposed contributions, a confirmation point, a checked alternative and a way to cancel. Minimal information reduces avoidable back-and-forth; it does not reduce anyone's ability to decline.

An **authored draft**, not a sent message: “Would you like to meet at the fictional Atrium café on Friday 7 May, 17:20–18:10? I can cover our two $6 drinks. We can confirm by 16:30. Either of us can cancel; if the venue changes, let's agree on a revised plan first.” The accessible Annex is a candidate alternative, not permission to move there automatically. The record also retains Alex's departure and return calculation, which need not all be repeated in the invitation text.

The strict proposal fields are `version`, `priorInvitationVersion`, `venueId`, `alternativeId`, `date`, `departMinute`, `confirmBy`, `costMode` and `cancelText`. The venue ID points to the supplied public-place card. Extra fields are rejected in this small workbook, including a proposed home-address field. This is a narrow data contract, not an inspection of arbitrary application forms or network calls.

### Confirm a version, not just “yes”

The local state path is **draft → proposed → confirmed**. Recording a proposal creates no acceptance. Each confirmation specifies the actor (`alex` or `counterpart`) and the exact current `planVersion`. One confirmation leaves proposed; two distinct actors confirming the same version yield confirmed. This consumes supplied event codes, not a classifier's interpretation of ambiguous prose.

Changing place, time or cost creates a new version and clears both confirmations. The old version remains in the history. A confirmation for the old version is rejected. A fresh Week 8 review update also clears confirmations: before the confirmation deadline, an open finding holds the workflow in review and a later clear update returns to draft so the proposal must be recorded and confirmed again. An unfinished agreement at or after the deadline expires. A closed upstream conversation cancels the handover.

**Exercise — six minutes.** At 16:00 record the cover-both proposal. Alex confirms at 16:10 and the counterpart at 16:20. At 16:22 revise the cost to split-drinks. At 16:24 receive a confirmation referring to the original version. Trace the phase and proposed cost.

**Debrief.** The first three events give proposed, proposed, confirmed. Revision gives proposed with zero confirmations and Alex's new proposed total $8. The old-version confirmation fails; it cannot establish the new $6 counterpart contribution. Both actors must explicitly confirm the new version. Nothing in this reducer sends a message, books a table or collects money.

### Cancellation and the confirmation point

Either cancel or decline makes the local plan **cancelled**, with no outgoing transition. A late confirmation cannot revive it. Confirmed means agreement to that authored plan at that point, not irrevocable permission for the rest of an evening or proof of arrival.

Events use observation minutes since midnight on the proposal's Friday: 16:00 = 960, 16:30 = 990, 17:00 = 1020. This is a separate clock from Week 7/8's hours since an opener. The confirmation window excludes its endpoint: an unfinished proposal observed at **time ≥ 16:30** becomes **expired**. A final confirmation at 16:29 is within the window; one at 16:30 is late. Expiry stops this attempt rather than scheduling a reminder.

A revision of an already confirmed plan can set a new future confirmation point before departure. An expired or cancelled attempt cannot be revived by changing its date or deadline. This teaching ledger has no background timer; callers must supply a clock or other event to observe expiry. Exact serialized duplicates are no-ops, conflicting IDs are errors, and new events must remain chronological. Use retained snapshots from the constructors and reducers; this is not a durable queue or a validator for arbitrary hostile snapshot objects.

## Enumerate four contingencies before simulating

Keep the original Week 9 numerical case: base **$14 and 90 minutes**, a late bus adding **20 minutes** with probability **0.25**, and a venue closure adding **$6 and 10 minutes** with marginal probability **0.10**. These are assumed probabilities and additive consequences, not live bus or venue statistics.

Let L mean late and C mean closed. First assume independence: P(C | L) = P(C | not L) = 0.10. The multiplication rule gives P(L and C) = P(L) × P(C | L) = 0.25 × 0.10. Independence lets the conditional equal the marginal; it is not a licence to multiply arbitrary marginals. [MacEwan's probability text](https://openbooks.macewan.ca/introstats/chapter/3-5-conditional-probability-and-independence/) explains that distinction.

| Outcome | Joint probability | Alex cost | Duration |
| --- | --- | --- | --- |
| On time, open | 0.75 × 0.90 = 0.675 | $14 | 90 min |
| On time, closed | 0.75 × 0.10 = 0.075 | $20 | 100 min |
| Late, open | 0.25 × 0.90 = 0.225 | $14 | 110 min |
| Late, closed | 0.25 × 0.10 = 0.025 | $20 | 120 min |

**Exercise — seven minutes.** Check that the four probabilities sum to one. Multiply each cost and duration by its probability, then add. Which rows exceed 110 minutes? Which exceed Alex's 120-minute hard window or $20 budget?

**Debrief.** Expected cost is **$14.60**, expected duration **96 minutes**. Only late-and-closed exceeds 110 minutes, with probability **0.025 = 2.5%**. No supplied outcome exceeds 120 minutes or $20: equality passes those limits. The strict 110-minute working target reserves ten minutes inside the 120-minute hard window. Missing a target and violating Alex's availability are different events.

The [existing reference function](/toolkit/#reference-models), `dateLogistics()`, returns the four states and the probability of duration > the supplied target **or** cost > $20. In this fixture cost never exceeds $20, so its combined failure probability equals the >110-minute tail. The new workbook keeps target, hard-window and budget exceedance outputs separate and cross-checks the original function.

### Means do not describe the worst case

Write cost K = 14 + 6I(C), where I(C) is 1 when closed and 0 otherwise. Write duration T = 90 + 20I(L) + 10I(C). Taking expectations gives **E(K) = 14 + 6P(C)** and **E(T) = 90 + 20P(L) + 10P(C)**. Additivity makes the means depend on the marginals; this step does not require independence between L and C.

Expected 96 minutes is an average across the assumed outcomes. It does not mean every plan finishes in 96 minutes, nor that 96% of attempts fit. A result that meets the mean target can still have a consequential tail. State the event whose probability you care about before calculating it.

**Exercise — four minutes.** Compare strict targets 109, 110 and 120 minutes under independence. What error would changing > to ≥ introduce at 110?

**Debrief.** The tail probabilities are **25%, 2.5% and 0%**. At 110, using ≥ incorrectly includes the 110-minute late/open row and reports 25%. Cost exactly $20 is allowed as well. Keep these equality conventions explicit in literal tests.

## Challenge independence while preserving both marginals

Now set **P(C | L) = 0.4** and **P(C | not L) = 0**. Keep P(L) = 0.25. The closure marginal remains **0.25 × 0.4 + 0.75 × 0 = 0.10**. Closure is now concentrated in the late branch; this is an authored dependency scenario, not a claim that lateness causes a café to close.

| Outcome | Independent | Dependent | Duration |
| --- | --- | --- | --- |
| On time, open | 0.675 | 0.750 | 90 min |
| On time, closed | 0.075 | 0 | 100 min |
| Late, open | 0.225 | 0.150 | 110 min |
| Late, closed | 0.025 | 0.100 | 120 min |

**Exercise — six minutes.** Recalculate the closure marginal, expected cost, expected duration and >110-minute probability. Identify which result changes and explain why.

**Debrief.** Marginal closure stays 10%; means stay **$14.60 and 96 minutes**. The tail becomes **10%**, four times the independent tail and **7.5 percentage points** larger. A joint event can change while marginal means stay fixed. The omitted dependence is exactly what the original mean summary could not reveal.

### Bound what the marginals alone allow

Let q = P(L and C). With P(L) = 0.25 and P(C) = 0.10, the four joint cells are **0.65 + q**, **0.10 − q**, **0.25 − q**, and **q**, in the table's order. Requiring every cell to be non-negative gives **0 ≤ q ≤ 0.10**. Thus the >110-minute tail could be anywhere from 0% to 10% while these marginals and additive consequences remain fixed.

**Exercise — five minutes.** Write the conditionals that realise q = 0 and q = 0.10. Locate independence within that interval.

**Debrief.** Use P(C | L) = q/0.25 and P(C | not L) = (0.10 − q)/0.75. At q = 0 they are **0 and 2/15**; at q = 0.10 they are **0.4 and 0**. Independence has q = **0.025**, giving both conditionals 0.10. The interval describes the supplied binary model, not all possible travel disruptions.

## Change the baseline deliberately

If you deliberately substitute the earlier Library duration of 100 minutes while retaining these hypothetical increments, durations become **100, 110, 120 and 130**. The >110-minute event is now every late case: probability **25%** in either dependence scenario. The mean becomes **106 minutes**. The >120-minute hard-window tail becomes 2.5% or 10%. These are new calculations under changed assumptions, not evidence that the old Library proposal had those disruption rates.

If the Atrium drink split changes Alex's base to $8 while the authored $6 closure surcharge remains Alex's responsibility, expected cost becomes **$8.60**. Duration and its tail stay unchanged. State that surcharge assumption: changing the bill agreement could also change who bears a fallback expense. A cheaper base does not prove the revised arrangement was accepted.

## A fallback needs its own conditions

The closure model assumes the checked alternative can be used, adds $6 and ten minutes in every closed branch, and keeps the 50-minute meeting. The Annex card illustrates those increments on the ordinary route. A late-plus-closed route reaches home at 19:00. Delays beyond the supplied 20 minutes, a second closure, missed last transport or changing access conditions are absent from the four-state model.

**Exercise — five minutes.** The proposed fallback adds 25 minutes instead of ten, or its public entrance is unavailable. Which parts need a new calculation or decision? Can the system silently move two confirmed people to it?

**Debrief.** Recalculate durations with the new increment and rerun the hard checks. The late-and-closed duration becomes 135 minutes, outside Alex's window. A failed entrance requirement excludes that fallback regardless of its score. Changing venue or cost requires a revised proposal and fresh agreement; if the conditions cannot be met, use the cancel branch. The numeric consequence table is not an automatic switching policy.

An accessible alternative is useful only when its actual route, opening interval, budget and exit also pass. Do not treat “backup” as an exemption from the original constraints or assume a counterpart can wait indefinitely. Changed circumstances remain reasons to reconsider the plan, even after a recorded confirmation.

## Run and challenge the workbook

Save these **ten files together**, retaining their names:

- [Week 9 venue cards, proposal and assumptions](/data/week-09-cases.json)
- [Week 9 planning and event functions](/data/week-09-models.mjs)
- [Week 9 worked report](/data/week-09-worked-examples.mjs)
- [Week 8 authored cases](/data/week-08-cases.json)
- [Week 8 review functions](/data/week-08-models.mjs)
- [Week 7 conversation functions](/data/week-07-models.mjs)
- [Week 6 decision functions](/data/week-06-models.mjs)
- [Week 5 venue cases](/data/week-05-cases.json)
- [Week 5 feasibility functions](/data/week-05-models.mjs)
- [Existing reference model module](/data/romance-models.mjs)

Run `node week-09-worked-examples.mjs`. The report recalculates the prior Library result, builds the Week 8 handoff with the actual reducers, filters four venue cards, compares independent/dependent outcomes, and replays confirmed, cancelled, revised, expired and newly held plans. It uses local files and built-in Node modules. The reused files are dependencies, not copies of a new interpretation of the previous weeks.

Write literal expected answers before running it: 90/100/110/120 minutes; joint probabilities 0.675/0.075/0.225/0.025; $14.60/96 minutes/2.5%; the dependent 10% tail; and proposed/proposed/confirmed after two actors' records. Also assert that a revision removes both confirmations and that a cancelled snapshot remains unchanged after a late event.

Deliberately change the strict target comparison from > to ≥. The 110-minute tail test must fail. Restore it. Then change the two-confirmation condition to accept one; the phase trace must fail. Assert each edit matched before trusting the result, restore both changes and rerun. Arithmetic checks do not certify a real venue, interpret a person's words or establish the safety of a plan.

## Hand over to Week 10

Save one **Offline handover plan** containing the venue rejections, itinerary, minimal invitation, proposed and recorded-agreed costs, version history, cancellation rule, exact outcome tables and assumptions. Include at least one failed hard constraint and one dependence sensitivity result. This supports the existing final project's linked validation appendix; it adds no essay or assessment. The [final project](/assessments/profile-deployment/) remains **50%, due 28 May 2027 at 5 pm**.

The export function accepts only a currently confirmed, unheld plan. It carries the exact proposal version, both confirmation actors, proposed cost arrangement and prior evidence references. It does **not** establish arrival or continuing agreement. [Week 10](/lectures/week-10/) uses that explicit cost agreement when examining the “Who pays?” deadlock, and models conversation after arrival as a separate authored exercise. It must preserve the ability to end the interaction.

**Exit ticket.** Repair three claims: “Good lighting outweighs an inaccessible exit”; “96 expected minutes means the tail is small”; “The earlier confirmation covers a changed bill.” Give the hard constraint, the joint-event calculation and the version-specific agreement rule.

## What Alex discovers

Alex's worked Atrium plan takes 90 minutes and $14 under the cover-both arrangement. Changing its terms clears the confirmations; agreement belongs to a specific version. The confirmed branch can now pass its plan to the meeting exercise. It cannot report that anyone arrived. Next week starts at that gap between a confirmed plan and an observed event.

[Carry Alex's confirmed plan into Week 10](/lectures/week-10/).
