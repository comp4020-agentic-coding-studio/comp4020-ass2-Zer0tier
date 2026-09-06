---
title: "Threat Modeling and Anomaly Detection"
description: "Detect bots, financial scams and identity inconsistencies in synthetic cases. Calculate the cost of false alarms before trusting a flag."
week: 8
date: 2027-04-26
teachers: [mira-chen]
keyConcept: "False positives vs. false negatives in romantic threat detection"
related: [sessions/08-threat-model]
slides: /decks/week-08/
---

## Your flag is not a verdict

This week turns the [Week 2 Platform audit](/sessions/02-platforms/) and [Week 7 Communication state machine](/lectures/week-07/) into a **Threat model**. The engineering problem is to protect assets, measure errors and choose a proportionate local action while preserving uncertainty. A detector that flags everything has excellent recall and an exhausting review queue.

By the end, you should be able to draw an asset flow across a trust boundary; distinguish a bot, financial scam and identity inconsistency; calculate four detector metrics; compare thresholds under explicit error costs; explain a base-rate change; and replay a review hold without overriding a refusal. All cases, labels and scores in this pack are **authored teaching fixtures**. No classifier is trained and no actual person is investigated.

## Three-hour teaching route

Use the [50-slide deck](/decks/week-08/) with these notes. The route includes explanation, individual working, discussion and debriefs. Run the existing [90-minute tutorial](/sessions/08-threat-model/) in its normal slot; review already completed work instead of repeating each exercise. Solo implementation and review are accepted.

| Elapsed time | Slides | Work and evidence |
| --- | --- | --- |
| 0–30 min | 1–8 | Reconnect the artefacts; draw an asset flow and repair a boundary claim. |
| 30–60 min | 9–14 | Separate observations from verdicts; triage authored case cards. |
| 60–85 min | 15–20 | Populate the confusion matrix and calculate each denominator. |
| 85–95 min | 21 | Break. |
| 95–135 min | 22–34 | Sweep thresholds, change error costs and project a different prevalence. |
| 135–180 min | 35–50 | Extend the actual event machine, test competing events and prepare the release handoff. |

The duration is a facilitation estimate. For a faster group, spend another 15–20 minutes on the cost crossover at 18, an all-negative detector and an unseen-case evaluation design. These are extensions, not additional submission requirements.

## Start with the assets and flows

Alex remains an adult computer-science student who likes board games and terrible puns and may want a relationship. Their constraints remain **Friday 5–7 pm, bus travel and $20 total**. Carry the supported bio, frozen photo, checked Library invitation and the supplied G1 quote from previous weeks. The Library invitation is feasible for Alex; recipient availability and acceptance remain unknown. None of these facts establishes that another party is trustworthy.

Draw three regions: the local fictional prototype, supplied counterpart content, and a proposed external destination. Label each arrow with what crosses it. A displayed message crosses an information boundary. Following a new link could move the interaction into another system. Transferring money or disclosing a private contact detail moves a different asset and needs its own analysis.

| Asset | Proposed crossing | Failure to consider | Course control |
| --- | --- | --- | --- |
| Contact details | Local context → counterpart or external form | Disclosure beyond the intended audience | Do not collect real contact details. |
| Money | Student → requested destination | Payment induced by a fabricated story | No payment facility in the release. |
| Images | Supplied material → search service | Unnecessary disclosure during investigation | Use written fictional search-result cards. |
| Ability to leave | Refusal → later workflow decision | A flag clearance restarts a closed exchange | Closed remains terminal. |

The [OWASP threat-modeling guide](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html) connects system decomposition, data flows and trust boundaries to threats, mitigations and review. Apply that method to a concrete path: name the asset, the actor's opportunity, the crossing and a control you can test. An actor label alone is not a threat model.

**Exercise — five minutes.** A fictional message asks Alex to leave the prototype, enter a home address and transfer a reservation deposit. Mark two assets and their destination. Propose a control that does not require more personal information.

**Debrief.** The address crosses into the proposed form and money crosses to the payment destination. Record the supplied request as evidence, hold the workflow and exclude those collection/payment capabilities. “The person is malicious” goes beyond the observations. A protective action can be justified before a public allegation could be.

## Separate the mechanism from the intent

A **scripted bot** describes automation; a **financial scam** describes a deceptive attempt to obtain money; **identity misrepresentation** describes conflicting or fabricated identity claims. They can overlap, but they are not synonyms. A disclosed automated helper is not malicious merely because it is automated. Human-written content can still support a scam scenario.

The [FTC's romance-scam guidance](https://consumer.ftc.gov/articles/what-know-about-romance-scams) describes fabricated identities, trust-building and money requests. It also discusses checking inconsistent image identities. That supports including these threat scenarios in the model; it does not supply the workbook's scores or error rates. In this classroom, all messages and image-search results are authored text. There is no reverse-image search, third-party image upload or instruction to investigate a classmate.

Keep three columns in a review record:

1. **Observation:** quote the supplied detail and retain its case/observation ID.
2. **Interpretation:** list what it could mean and what remains unresolved.
3. **Action:** record the least intrusive step supported by the evidence.

The workbook's triage rules consume explicit observation codes, not free text. `money-request`, `identity-conflict`, `repeated-template` and `image-match` produce a local **review** finding. They do not assign a malicious label. Coding itself requires judgement; the demonstration does not automate that judgement.

**Exercise — eight minutes.** Compare the seven cards in the download. Which ones support an additional hold under the declared rule? Which observation would you quote? Identify a possible benign explanation without treating it as established fact.

**Debrief.** Transfer, repeated-template and image-conflict cards trigger review. Transfer retains both the money request and conflicting identity observations. The typo, no-image-match, latency and disclosed-helper cards add no flag. A repeated answer could result from a limited scripted assistant; an image associated with another name could have a legitimate reuse explanation. These alternatives preserve uncertainty; they do not erase the supplied inconsistency.

Syntax alone is an especially poor shortcut: a typo, multilingual wording or an unusual sentence does not establish deceptive intent. The typo-only rule therefore adds no flag. A reverse-image match is a lead requiring context; a non-match only says that the supplied fictional index returned no item. Neither result certifies authenticity. A timeout and read receipt retain their Week 7 meanings and do not become threat evidence merely by changing chapters.

`no-additional-flag` means that none of the supplied codes activated this rule. It means neither “safe” nor “verified.” Empty observations also add no flag; they tell us nothing about coverage. Unknown codes and missing evidence text are rejected so they cannot silently become benign observations.

## Key concept: false positives versus false negatives

The separate numeric fixture contains **100 authored cases: 10 malicious labels and 90 benign labels**. Its scores are arbitrary points from 0 to 100, not calibrated probabilities. The prediction rule is **flag when score ≥ threshold**. Equality matters: score 50 is flagged at threshold 50. A flag recommends review; the authored label is the answer used to count errors.

The CSV IDs beginning M or B deliberately make the arithmetic easy to inspect. Those IDs reveal the answer class: exclude **both IDs and labels** from any proposed predictor. This pack supplies scores directly, so there is no training step or performance claim. The seven triage cards are a separate qualitative exercise; they are not the source of the 100 numeric labels or scores.

At threshold 50, keep the original Week 8 matrix:

| Authored label | Flag for review | No flag | Total |
| --- | --- | --- | --- |
| Malicious | TP = 8 | FN = 2 | 10 |
| Benign | FP = 18 | TN = 72 | 90 |
| Total | 26 | 74 | 100 |

**Exercise — six minutes.** Calculate precision, recall, false-positive rate and accuracy. Beside each fraction, write the population in its denominator. Then evaluate a detector that never flags anything.

**Debrief.** Precision is **8/26 ≈ 30.8%**: the fraction of flags whose authored label is malicious. Recall is **8/10 = 80%**: the fraction of malicious cases found. False-positive rate is **18/90 = 20%**: the fraction of benign cases flagged. Accuracy is **(8 + 72)/100 = 80%**. Eighteen of the 26 flags are false alarms in this fixture.

A never-flag detector has accuracy **90%** and recall **0%**, with undefined precision because it has no flags. Accuracy alone would prefer a detector that misses every malicious case. The workbook returns `null` for a zero denominator, rather than manufacturing a zero or perfect precision. These definitions and imbalance limitations follow [Google's classification-metrics lesson](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall).

## Move the threshold, then state the cost

Lower thresholds admit more cases to review. Raising a threshold cannot increase TP or FP for the same fixed rows and an inclusive rule. It can increase misses. Precision does **not** have to increase at every threshold in an arbitrary dataset, because both numerator and denominator change. [Google's thresholding lesson](https://developers.google.com/machine-learning/crash-course/classification/thresholding) explains the relation between a cutoff and the resulting confusion matrix; this workbook explicitly chooses the equality convention.

| Threshold | TP | FN | FP | TN | Flags | Precision | Recall |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 25 | 9 | 1 | 36 | 54 | 45 | 20.0% | 90% |
| 50 | 8 | 2 | 18 | 72 | 26 | 30.8% | 80% |
| 75 | 6 | 4 | 5 | 85 | 11 | 54.5% | 60% |

**Exercise — five minutes.** Recount the CSV at 75. Explain what happened to both kinds of error relative to 50. Do not choose a winner until you name a decision objective.

**Debrief.** At 75, TP = 6, FN = 4, FP = 5 and TN = 85. Two more malicious cases are missed and thirteen fewer benign cases are flagged. Review load falls from 26 to 11 cases, but this alone does not price the harm of misses.

Use the deliberately small loss model **L = cFN × FN + cFP × FP**. Set the false-positive cost cFP to 1 arbitrary error unit and vary cFN. These are assumptions about consequences, not prices on people. This loss counts only errors: it omits the ordinary review cost of true positives, fixed staffing, severity differences and uncertainty in the labels. Keep the total flag count beside it if capacity matters.

| Assumed cFN | L at 25 | L at 50 | L at 75 | Lowest among these three |
| --- | --- | --- | --- | --- |
| 5 | 41 | 28 | 25 | 75 |
| 10 | 46 | 38 | 45 | 50 |
| 20 | 56 | 58 | 85 | 25 |

**Exercise — six minutes.** With cFP = 1, find the cFN at which thresholds 50 and 75 tie. Then choose among the three tested thresholds at cFN = 20.

**Debrief.** Set **2cFN + 18 = 4cFN + 5**, giving **cFN = 6.5**, with loss 31 for both. At cFN = 20, threshold 25 has the lowest tested loss, 56. For the optional second crossover, 25 and 50 tie when **cFN = 18**, both at 54; 75 costs 77. These are comparisons among three declared alternatives, not a global optimum over every possible cutoff.

## Change the base rate without changing the conditional rates

For a hypothetical population with malicious-label prevalence p, assumed recall r and false-positive rate f:

**Projected precision = pr / [pr + (1 − p)f].**

At r = 0.8 and f = 0.2, prevalence 10% gives 30.8% precision. Prevalence 1% gives about **3.88%**, and prevalence 50% gives **80%**. The denominator mixes true and false flags; it does not use recall alone.

**Exercise — five minutes.** In a hypothetical 1,000 cases at 1% prevalence, keep recall 80% and false-positive rate 20%. Populate all four cells and calculate precision.

**Debrief.** Ten cases are malicious: TP = 8 and FN = 2. Of 990 benign cases, FP = 198 and TN = 792. Precision is **8/206 ≈ 3.88%**. This is an expected-count projection under transported conditional rates, not a measured rate of scams on any dating service. A changed population could also change recall and false-positive rate, so the calculation cannot establish deployment performance.

Threshold exploration on the same 100 rows is sensitivity analysis. If you developed a detector, choose the threshold on suitable development data, freeze the procedure, and evaluate independently on future unseen labelled cases. The [scikit-learn data-leakage guide](https://scikit-learn.org/stable/common_pitfalls.html#data-leakage) explains why test data must not influence model choices. Do not call this authored fixture a held-out validation study. Missing or disputed real-world labels would require an explicit evaluation policy; the strict teaching parser rejects missing labels instead of silently dropping them.

## Put review around the existing state machine

The workbook reconstructs the actual Week 7 snapshot using its constructor and reducer. It carries the candidate and invitation versions, G1's evidence, recorded opener, observation clock and event ledger. The incoming demonstration state is pending, with a send at 0 hours and a wait at 0.1 hours. It does not initialise a new opener from that pending record.

The wrapper exposes **review** while one or more findings are open, and keeps the underlying communication phase separately. A reply can change that underlying phase to replied while the wrapper stays in review. A receipt or timeout updates the established observations without clearing a finding. Closed takes precedence over both dimensions.

| Supplied event | Open review effect | Communication effect |
| --- | --- | --- |
| Assess a flagged card | Add a finding with its event ID and quoted evidence | Preserve the state; advance the observation checkpoint. |
| Assess a no-flag card | Keep every existing finding | Preserve the state; advance the checkpoint. |
| Reply or receipt | Keep findings | Delegate to the Week 7 reducer. |
| Resolve review | Require every open finding ID and a non-empty review note | Reveal the latest underlying phase. |
| Decline, block or local close | Closure takes precedence | Enter closed; every later event leaves the snapshot unchanged. |

A review resolution records an authored review decision; the program checks completeness, not whether the reviewer is correct. The clear branch assumes a reviewer decision to demonstrate the transition; the supplied cards alone do not establish authenticity. Clearance establishes neither safety, consent nor meeting confirmation. A closed record cannot be reopened by clearance. A send record is rejected while a ready workflow is held; the inherited machine also rejects a second opener after one is recorded. All outputs explicitly report no message sent and no accusation published.

**Exercise — eight minutes.** Start pending. Assess the transfer card at 0.3 hours. Compare (a) reply at 1, then resolution at 1.5; (b) decline at 1, then the same resolution; and (c) timeout at 2, then an image non-match at 2.1. Predict both the visible phase and underlying observation.

**Debrief.** Trace (a) stays in review through the reply, then reveals replied/reply after resolution. Trace (b) becomes closed/reply at the decline, and clearance leaves the complete snapshot unchanged. Trace (c) stays review with underlying pending/no-reply: the non-match adds no new finding but does not erase the transfer evidence. These are explicit traces, not an instruction to continue any real interaction.

Every external event has a unique ID, type and observation time in hours. New records must be chronological. Replaying an identical serialized event is a no-op; reusing its ID with different serialized content is a conflict. Property order is part of this simple serialization rule, so this is not semantic JSON normalization. Earlier Week 7 event IDs cannot be reused. The reserved `review-clock/` namespace supplies one derived wait checkpoint per assessment or resolution after a recorded send; it preserves the original two-hour window and never resets its start. No clock runs in the background.

Use snapshots returned by the constructor and reducers. This is an in-memory teaching ledger, not a durable queue or a validator for arbitrary hostile snapshot objects. Duplicate handling requires retained state. A local review pause does not create a network action, and numeric detector rows are never passed to the card triage function as if their answer labels were evidence.

## Test the claims that matter

Write literal expected results before running the workbook: the original four counts, undefined precision for zero flags, the 6.5 cost tie, the 1% projection, and the three review histories. Exercise missing findings, a blank review note, conflicting IDs, stale times and a held first send. Check that input snapshots remain unchanged.

Then deliberately change the inclusive threshold from ≥ to >. The score-50 row and original matrix checks must fail. Restore it. Remove the closed guard and replay refusal followed by clearance; the full closed-snapshot assertion must fail even if a superficial phase-only check still says closed. Restore the guard and rerun. A test that only searches for the word “closed” cannot establish this behaviour.

## Run the worked calculations

Save these **six files in one directory**, retaining their names:

- [100-case CSV](/data/week-08-detector.csv)
- [Authored triage cards and handoff](/data/week-08-cases.json)
- [Week 8 detector and review functions](/data/week-08-models.mjs)
- [Worked calculations and event replay](/data/week-08-worked-examples.mjs)
- [Unchanged Week 7 communication functions](/data/week-07-models.mjs)
- [Unchanged Week 6 decision functions](/data/week-06-models.mjs)

Run `node week-08-worked-examples.mjs` in that directory. It prints JSON with the three matrices, cost comparisons, prevalence projections, seven triage results, three event traces and release checks. It uses local files and built-in Node modules, with no service, account or package installation. Inspect the assertion messages if you intentionally edit the fixtures; a changed input may invalidate the worked answers.

## Release and Week 9 handoff

The release plan must explicitly declare fictional content, no real-contact collection, no payments, no third-party image uploads, no app integration and no published accusations. `checkReleasePlan` rejects a missing or contradictory required Boolean. It checks declarations only; review the actual page, forms and network behaviour too. A passing object cannot certify the whole application.

Save the **Threat model** with the asset/boundary diagram, matrix, threshold comparison, assumptions, evidence records and literal state traces. This supplies the threat-model evidence for the existing final project's validation appendix; it does not add a new assessment. The [final project](/assessments/profile-deployment/) remains **50%, due 28 May 2027 at 5 pm**. Week 8 follows the midterm, so this is preparation for the final release rather than a new midterm requirement.

[Week 9](/lectures/week-09/) uses these boundaries to specify the minimum information for a proposed offline meeting: a proposed public place and time, an explicit cost assumption and an easy way to decline or cancel. It does not need a home address, bank credentials or an identity-document upload. Review clearance does not turn an invitation into an accepted plan. Carry the versions, outstanding findings and terminal closure reason alongside the proposal.

**Exit ticket.** Repair three claims: “80% recall means 80% of flags are right”; “no image match proves authenticity”; “cleared review restarts a refused conversation.” Use the correct denominator, the limited observation and the terminal guard in your answers.
