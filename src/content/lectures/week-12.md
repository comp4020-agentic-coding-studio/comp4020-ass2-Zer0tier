---
title: "System Maintenance and Graceful Deprecation"
description: "Design explicit relationship agreements, change requests and respectful endings. Reproduce the final release and document its maintenance."
week: 12
date: 2027-05-24
teachers: [mira-chen]
keyConcept: "Long-term relationship architecture and avoiding the “comfortable rut” system crash"
related: [sessions/12-maintenance]
slides: /decks/week-12/
---

## Alex's story · The handover includes an ending

*Fictional course story · Week 12.*

Alex's reference profile is ready for handover, including the rank-2 result. A fresh run must reproduce it; an injected software fault must be recoverable. Alongside that release, separate fictional maintenance scenarios ask what happens when terms change, confirmation expires or someone ends an agreement. The rollback command is useful in exactly one of those systems.

**Investigate this week:** Reproduce and restore the release, then trace the separate agreement scenarios. Which state may return to an earlier version, and which must stay ended?

## Acquisition was only the first subsystem

A relationship is not a successfully acquired user. Maintenance means making changing agreements legible, allowing disagreement and preserving an exit. A static site has a previous version you can restore. A person does not.

This week produces a **Maintenance and exit manual**, a clean reproduction log, a demonstrated software rollback and a one-page index of the eleven tutorial artefacts. By the end, you should be able to trace a versioned change, reject a stale write, distinguish expiry from refusal, preserve an ending, inventory the records you control and reproduce the exact release evaluated in Week 11.

All agreements, participant IDs, event ticks, retention days and injected faults below are **authored classroom fixtures**. They are separate scenarios, not new biography for Alex or observations about anyone's relationship. No personal disclosure is required. The semester ends with a reproducible record, not a better-looking score.

## Scheduled teaching and independent work

### 60-minute lecture

Monday, **11 am–12 pm**. Use only these selections from the [complete deck](/decks/week-12/), in order. The timings include explanation, brief working and questions; full exercise timers elsewhere belong to the complete resource route.

| Lecture time | Slides | Focus |
| --- | --- | --- |
| 0–10 min | 4–7, 9 | Take receipt of the release and define scoped agreements and explicit acceptance. |
| 10–25 min | 11, 14–15, 17, 20 | Demonstrate stale-write rejection, expiry and a terminal ending. |
| 25–40 min | 22, 24–25, 28–29 | Distinguish optional routine changes, practical dependencies and copies under your control. |
| 40–55 min | 31–34, 37 | Identify the exact build, reproduce it and demonstrate software restoration. |
| 55–60 min | 44, 48–50 | Check the artefact index and rehearse the final defence. |

### 90-minute tutorial

Thursday, **2–3.30 pm**. Follow the [Week 12 tutorial](/sessions/12-maintenance/): **20 minutes maintenance agreement; 20 minutes endings and retention; 30 minutes reproduction and rollback; 20 minutes defence**. These four blocks fill the whole session. Bring lecture working for checking and refinement; complete each exercise once. Solo work and review are accepted.

### Independent work · about 210 minutes

- **30 minutes — before Monday:** Inventory the Week 11 release, Threat model and all eleven tutorial artefacts. Read the agreement and retention fixtures.
- **90 minutes — between Monday and Thursday:** Review remaining traces and answers, especially acceptance boundaries, manifest checking and earlier terminal states (slides 8, 10, 12–13, 16, 18–19, 30, 35–36 and 38–43). Download the nineteen-file workbook and check that the unchanged release and build instructions are available before Thursday. Draft the eleven-row handover index with actual paths, versions, check results and later uses; locate the rejected candidate, feedback/revision evidence and limitation, marking anything missing as a gap. Bring it for the tutorial’s ten-minute review before the maintenance quiz.
- **90 minutes — consolidation and assessment:** Use Thursday’s feedback to finish the Maintenance and exit manual, reproduction log and artefact index. Reserve this time before the Friday 28 May, 5 pm project deadline; extensions are optional.

Together this is about **six hours: 60 + 90 + 210 minutes**. Slides and full-length exercises outside the lecture selection are independent study unless assigned in the tutorial’s four blocks. Use the worked answers to check an attempt; optional extensions can use consolidation time. The complete route below reuses this material and adds no scheduled meeting or extra three-hour study requirement.

<span id="three-hour-teaching-route"></span>

## Complete teaching pack

The full **50-slide pack** and all worked notes remain the complete resource. This **180-minute reference route includes a ten-minute break** for someone facilitating the whole pack in one sitting. It is separate from the scheduled selections above: the break slide is skipped in the 60-minute lecture and the tutorial keeps its own 90-minute plan. These are facilitation estimates, including practical work and debriefs.

| Time | Slides | Activity |
| --- | --- | --- |
| 0–30 min | 1–10 | Inspect the Week 11 handoff, define scope and trace explicit change acceptance. |
| 30–65 min | 11–20 | Reject stale versions, compare expiry/refusal and test immediate endings. |
| 65–75 min | 21 | Break. |
| 75–105 min | 22–30 | Audit the comfortable-rut scenario, practical dependencies and retention. |
| 105–145 min | 31–40 | Reproduce the release, inject a fault, restore and inspect the rendered result. |
| 145–180 min | 41–50 | Check earlier terminal boundaries, assemble the handover and defend limitations. |

These are facilitation estimates, not a guarantee derived from slide count. Optional 15–20-minute extensions compare a three-participant agreement, change one manifest byte, or repeat the documented build on a genuinely separate machine. A second machine is useful evidence but not an added assessment requirement.

## Take receipt of the release you actually evaluated

Bring the [Week 11 Follow-up evaluation](/sessions/11-follow-up/), [Week 8 Threat model](/sessions/08-threat-model/) and all versioned inputs. Keep exact candidate text, evidence-backed ratings, controls version, primary and sensitivity results, changed-case failure, browser evidence and build instructions together. Do not start with a new undocumented candidate.

The reference release remains **week-11-example-rc1**, with vector **(4,4,3,4)**, primary **93.75, rank 2/100**, and doubled-feasibility **90, rank 2/100**. Its separate 90-minute availability case fails the 100-minute library itinerary even though the candidate still ranks second. Those results survive reproduction and rollback. Nothing in maintenance supplies evidence for raising a rating.

The workbook calls the unchanged Week 11 generator, which actually consumes the earlier bio, plan, conversation, review and meeting artefacts. You can supply an existing unchanged Week 11 example directory, or let the drill create a clearly labelled reconstruction. The automated path is a reference exercise, not a claim that an arbitrary student's release has been reproduced. For your own candidate, follow your own documented build and compare the artefacts it names.

## Version the agreement, not the person

An **exclusive lock** is our deliberately limited metaphor for a mutually agreed monogamous arrangement. In a computer system, a lock restricts access to a resource. No participant is another person's resource, and no one obtains a lock on someone else.

**Concurrent processes** are a similarly bounded analogy for ethical non-monogamy when the people involved knowingly agree to the relevant boundaries. Neither architecture is this course's default, ranking criterion or optimisation target. A shared record covers only the commitments within its stated scope; it grants no access to other dyads' private information and no control over unrelated relationships.

The first fictional record names adults **A and B**, version **1**, and explicit initial acknowledgements from both. Its routine is board games as an optional default, with each meeting confirmed separately. Its privacy term limits sharing to needed planning details and gives no account or location access. The separate P/Q/R example concerns three adults' shared planning commitments in an independently agreed non-monogamous scenario. It is not a claim that every non-monogamous arrangement requires three-way approval for every decision.

| Agreement field | Why it matters |
| --- | --- |
| Agreement ID and current version | Identify the exact shared record under review. |
| Named affected participants | State whose commitments this change affects. |
| Current terms and acknowledgements | Preserve what was explicitly recorded. |
| Proposed terms and base version | Distinguish a request from the adopted record. |
| Expiry and response records | Bound the exercise's reporting window without inventing an answer. |
| Ending actor and terminal state | Allow an ending independently of change adoption. |

A version number is not proof of continuing agreement. The `active` state means “the last explicitly adopted record in this classroom replay”; it cannot certify that a person currently wants to continue. A change in circumstances calls for review, not enforcement of a stale routine.

## A proposed change is not already adopted

At tick **1**, A proposes replacing the default with a choice of two activities at an optional check-in. The base is v1 and the proposal is `routine-options`, expiring at tick **10**. Ticks are ordered exercise units, not real hours or a recommended response deadline.

**Exercise — 6 minutes.** Start with no proposal responses. A explicitly accepts at tick 2; B explicitly accepts at tick 3. Trace the current version, pending acceptance count and eventual terms. Does authoring the proposal count as an acceptance?

| Event | Pending responses | Current version |
| --- | --- | --- |
| Propose at 1 | 0 of 2 | 1 |
| A accepts at 2 | 1 of 2 | 1 |
| B accepts at 3 | Proposal archived as adopted | **2** |

**Debrief.** Proposal creation and acceptance are separate coded events. Both distinct participants must acknowledge these exact proposed terms before the version increments. The old terms remain separate from the proposal until adoption. A repeated event ID with exactly the same JSON is a duplicate delivery; it cannot count twice. A new acceptance ID from the same actor is rejected. An outsider cannot supply the missing acknowledgement.

In the separate three-participant case, versions after propose/P/Q/R are **1, 1, 1, 2**. Two of three is not enough for this scoped shared change. Majority voting cannot replace an affected participant's agreement. Changing membership is outside the bounded reducer; old acknowledgements cannot be copied to manufacture a new person's participation.

## Reject the stale write

Two local copies read v1. The first change is explicitly adopted, producing v2. The second copy then sends a proposal whose `baseVersion` is still 1.

**Exercise — 5 minutes.** Decide whether to overwrite v2, silently change the incoming base to 2, or reject the stale proposal. Explain which evidence would be lost in the first two choices.

**Debrief.** Reject the stale proposal. Read the current terms, inspect the difference and only then consider a new, separately reviewed request. Silently rebasing the proposal would claim that its author reviewed terms they may never have seen.

The software analogue is a conditional update. [RFC 9110, §13.1.1](https://www.rfc-editor.org/rfc/rfc9110.html#name-if-match) describes `If-Match` as a precondition used to prevent lost updates. Our in-memory base-version comparison borrows that idea; it implements neither HTTP nor an authenticated distributed service. A real concurrent system needs atomic comparison and update at its authority, not a client-side check followed by an unguarded write.

```text
if incoming.baseVersion != current.version:
    reject stale proposal
record proposed terms separately
adopt only after all named responses match this proposal
```

**An ending does not require a current base version.** If B ends after v2 while holding a stale v1 screen, the record still ends. A correctness check for adopting a change must never become a permission barrier to leaving.

## Expiry, rejection and ending are different events

The proposal's acceptance window is **[1, 10)**. After A accepts at tick 2, a valid final acceptance at tick 9 adopts v2; one at **tick 10** is outside the window. The proposal is archived as **expired**, its current version remains 1, and its phase stays **review**. A clock event at 10 with no response produces the same expiry status. Expiry supplies no refusal or agreement.

**Exercise — 5 minutes.** Compare (a) no final acceptance by tick 10, (b) B explicitly rejects the changed routine at tick 3, and (c) B ends the agreement at tick 3. State what is terminal in each case.

**Debrief.** (a) expires this proposal without adopting it. (b) rejects this proposed change; the last adopted terms remain recorded, but review is still required and no old activity is automatically imposed. (c) ends the whole scoped agreement record. Practical work can remain without keeping that agreement active.

A rejected proposal cannot be retried by changing its ID. The reducer also rejects the same rejected terms under a new ID. A genuinely different proposal still needs an appropriate, wanted discussion; the code's term comparison cannot recognise paraphrased pressure or decide whether contact is welcome. A response arriving after the exercise's expiry is recorded as the event that triggered expiry, not silently accepted. Revisit the situation separately without interpreting the timeout as an invitation to keep asking.

## The terminal state must win

Either participant can issue `end` from active, review, partially accepted or newly adopted states. One actor is sufficient; there is no two-person ending quorum. A pending proposal is archived as `cancelled-by-ending`. The record retains the ending actor and last adopted version.

**Exercise — 5 minutes.** End while only A has accepted a pending change. Then deliver a late acceptance, a clock tick and an attempted old-version restoration. Compare the entire state before and after each attempt.

**Debrief.** All three later inputs leave the complete ended snapshot unchanged. Check the whole record, not merely `phase === ended`; otherwise terms or history could change behind an unchanged label. This course record has no reopen operation. Creating another identifier is not a way to bypass its ending.

IDs, actors, versions and chronology are checked before ordinary updates. Unknown types and conflicting IDs fail. Within an ended record the terminal guard takes priority and returns the same state. Exact JSON serialization defines duplicate equality, including property order. These are local classroom snapshots, not tamper-proof logs, identity proofs or live consent subscriptions.

## Key concept: the comfortable rut

**Long-term relationship architecture and avoiding the “comfortable rut” system crash** means detecting that a routine no longer suits a participant and making a change discussable. The signal in this exercise is an explicit statement: “I want more choice than the same activity each time.” We do not infer it from reply latency, facial expression, fewer emojis or a personal mood score.

**Exercise — 5 minutes.** Compare two proposed responses: collect daily location, read-receipt and mood records to score compliance; or offer an optional check-in about activity choices. Identify the objective and the information each response actually needs.

**Debrief.** The stated need concerns choosing activities. An optional check-in can ask about that need directly while allowing “no,” “not now,” or an ending. Surveillance adds data and pressure without supplying agreement. The proposed new routine should name its scope, participating people, relevant constraints and what happens if it is unwanted. More monitoring is not automatically better maintenance.

An example check-in prompt is: “Would you like to discuss changing our usual activity? Fine to leave it for now or say no.” It is an authored writing example, not a message the workbook sends or a universally appropriate script. Review tone and context separately from the reducer's coded events.

## Graceful deprecation and practical dependencies

A clear ending should state the boundary and avoid a persuasion loop. It can acknowledge practical dependencies without making them a precondition to leave. No algorithm guarantees zero emotional pain or prevents “catastrophic emotional data loss.” The metaphor cannot promise that outcome.

**Exercise — 5 minutes.** A fictional shared plan ends while a borrowed game and an unresolved expense remain. Someone proposes “keep the relationship active until both are settled.” Repair the state model and write one bounded task record.

**Debrief.** Keep **agreement: ended** and separate practical records such as `task: return borrowed game; owner: current holder; method: separately acceptable handover; status: unresolved`. An unsettled expense needs its own factual review. Neither task authorises renewed persuasion or requires an in-person meeting. Do not invent a payment, receipt or delivery to turn the practical status green.

For the software release, deprecation might mean marking an old version superseded and directing readers to the maintained version. Preserve the release's scope and limitations. The local drill restores static files into a new folder; it does not unpublish a real site, alter accounts or contact another person.

## Inventory purpose, ownership and every copy

The [Week 8 release boundary](/lectures/week-08/) still requires a fictional release without real contact collection, payments, third-party image uploads, app integration or published accusations. The workbook calls that actual checker and deliberately challenges its contact/payment flags. A declared object is not proof that the rendered release obeys it; inspect the page too.

[W3C's data-minimization principles](https://www.w3.org/TR/privacy-principles/#data-minimization) support limiting data transfer to what serves the user's goal. Our exercise applies that principle to a small synthetic inventory: name the purpose, owner, copies, expiry and reproduction dependency. The **7/14/30-day** values below are invented teaching choices, not university policy or legal retention periods.

| Record | Owner / copies | Retain until day | Day-14 plan |
| --- | --- | --- | --- |
| Source bundle | Student / archive and backup | 30 | Retain for reproduction. |
| Raw event exercise | Student / notebook and backup | 14 | Plan deletion of both own copies. |
| Scratch drafts | Student / scratch folder | 7 | Plan deletion of the own copy. |
| Another person's copy | Other / outside workspace | 7 | Outside the student's control. |
| Minimal boundary summary | Student / review record | 30 | Retain for the exercise's terminal check. |

Expiry is **day ≥ retainUntil**. At day 14, two records covering **three own copies** are due for planned removal. Two records remain for their stated purposes; one is outside control. At day 30, the source bundle and boundary summary enter **review-release-dependency**, rather than being silently erased while still required. Reassess the purpose and applicable requirements; “keep forever” is not the automatic answer.

**Exercise — 5 minutes.** Explain why deleting only the notebook copy does not complete the raw-event task. Then separate your ability to remove your own copy from another person's decision about theirs.

**Debrief.** The inventory also lists a backup. A deletion plan must cover each controlled copy and describe what remains outside that scope. The planner emits actions only: **it deletes no listed file and sends no request**. It does not claim to erase remote copies or securely sanitise storage. Retaining a minimal terminal marker for a bounded exercise does not require storing full conversations indefinitely. Students document their own synthetic artefacts; no one needs access to a partner's devices or accounts.

## A release label, an agreement version and a digest are different

An agreement version identifies recorded terms. A release label names a software snapshot. A content digest supports comparison of exact bytes against a retained value. None can stand in for another: restoring `week-11-example-rc1` has no operation on the agreement reducer's ended state.

[Reproducible Builds' definition](https://reproducible-builds.org/docs/definition/) ties reproducibility to specified source, environment, instructions and byte-identical output artefacts. Name those inputs and outputs before claiming success. This workbook uses Node built-ins and copied downloads; record the Node version, platform and architecture in its run log.

The original Week 11 manifest hashes sixteen source files and two outputs (`index.html` and `evaluation.json`). Week 12 verifies those records, then retains an additional **four-file manifest** covering the HTML, evaluation JSON, original manifest and README. This makes the set being compared explicit. The extra manifest is a new verification record, not an edit to Week 11's files.

## Run the nineteen-file workbook

Save the **three new files**—[Week 12 cases](/data/week-12-cases.json), [maintenance and comparison functions](/data/week-12-models.mjs), and [executable drill](/data/week-12-worked-examples.mjs)—alongside the **sixteen unchanged Week 11 downloads**:

- [Week 11 cases](/data/week-11-cases.json), [Week 11 functions](/data/week-11-models.mjs), [Week 11 generator](/data/week-11-worked-examples.mjs).
- [Week 4 bios](/data/week-04-bios.json), [Week 5 cases](/data/week-05-cases.json), [Week 5 functions](/data/week-05-models.mjs).
- [Week 6 routing](/data/week-06-models.mjs), [Week 7 functions](/data/week-07-models.mjs), [Week 8 cases](/data/week-08-cases.json), [Week 8 functions](/data/week-08-models.mjs).
- [Week 9 cases](/data/week-09-cases.json), [Week 9 functions](/data/week-09-models.mjs), [Week 10 cases](/data/week-10-cases.json), [Week 10 functions](/data/week-10-models.mjs).
- [99 controls](/data/null-island-controls.csv), [generated reference scorer](/data/romance-models.mjs).

```sh
node week-12-worked-examples.mjs
node week-12-worked-examples.mjs --work-dir ./maintenance-lab
```

The first command prints a report and removes only its own temporary drill directory. The second retains the outputs in a **new** directory; it refuses to overwrite an existing one. After download, the drill needs no network or installed packages. It launches the original Week 11 generator with the same Node executable.

To consume an existing **unchanged Week 11 teaching example**, add its path:

```sh
node week-12-worked-examples.mjs --release-dir ./example-rc1 --work-dir ./maintenance-existing
```

Without `--release-dir`, the program explicitly labels its received copy as a reconstruction. With it, the supplied release is read without modification. The reference runner deliberately requires Week 11's published fixture answers. For a different student candidate or language, use your documented build and a precise equivalent comparison; do not replace your earlier results with the reference's numbers.

## Rebuild from a clean directory

The drill checks the received source and output digests, verifies the frozen candidate, and copies **exactly sixteen** source files into `clean-source/`. It calls Week 11's actual generator there to create `reproduced/`, then compares all four named output files with the received release. All four must match byte for byte, including the failed rank target and changed-case failure.

This is **same-host, clean-directory reproduction**. The process still uses the host's Node executable and environment; it is not a hermetic sandbox or independent-machine replication. Report that limit. A second person following the recorded instructions on another machine can strengthen the evidence, but record their actual outcome rather than inferring it from your own run.

**Exercise — 5 minutes.** An extra file appears in the output directory, one expected file is missing, and a third has different bytes. Design a comparison report that distinguishes all three. Would “the HTML opens” or “the rank is still 2” establish reproduction?

**Debrief.** Report **extra**, **missing** and **changed** names separately. Neither opening nor a matching rank proves byte equality or that the candidate text is unchanged. The manifest checker also rejects duplicate entries and path traversal in the flat teaching bundle. These guards make the exercise inspectable; they do not establish that an untrusted manifest or downloaded program is authentic.

## Inject the fault, then restore the whole snapshot

The drill first retains the four-file baseline manifest. In a **disposable local copy**, it removes exactly one occurrence of **“Fine to pass.”** from `index.html` and adds `obsolete.txt`. It asserts that the removal matched once, so a no-op edit cannot masquerade as a tested fault. The evaluation JSON is left unchanged on purpose.

| Stage | Changed | Extra | Missing |
| --- | --- | --- | --- |
| Reproduced | None | None | None |
| Faulty | **index.html** | **obsolete.txt** | None |
| Restored | None | None | None |

The faulty page still prints **93.75, rank 2/100**, but no longer contains the exit wording used to justify its rating. A nice-looking number cannot repair an evidence mismatch. The restore validates the archive against the retained manifest and creates a **complete** restored snapshot, excluding stale extras. All four restored files match the baseline on disk. A changed rollback archive is rejected.

The directories `faulty/` and `restored/` remain available for inspection when `--work-dir` is used. `current-release.json` identifies the restored folder for this local drill; it does not switch a web server or deploy anything. In a repository workflow, [Git's revert documentation](https://git-scm.com/docs/git-revert) explains how reversing a commit can be recorded in a new commit. The workbook uses file snapshots, not Git history manipulation.

**Exercise — 5 minutes.** A colleague fixes the failing check by recalculating the baseline manifest from the damaged files. Another copies only `index.html` back while leaving `obsolete.txt`. Explain why both miss the stated restore contract.

**Debrief.** The first changes the expected answer to match the fault. The second restores only part of the declared snapshot. Keep the expected digest from before the change and compare the complete intended output set. A digest is useful only relative to a trusted retained record; replacing both the files and their digests can preserve self-consistency while losing provenance. Run logs may contain different paths or timestamps while specified build artefacts remain identical; declare which bytes the reproduction claim covers.

## Inspect the actual restored page

**Exercise — 10 minutes plus debrief.** Open `faulty/index.html` and `restored/index.html`. Compare the rendered candidate with the frozen text. In the restored page, verify the exit wording and the link to its unchanged evaluation. Tab and Shift+Tab, check visible focus, and activate the link. Inspect **1920×1080** and **390×844**, then resize and enlarge the text.

**Debrief.** The restored text must equal the frozen candidate, including punctuation and the exit. The evaluation must still show the failed primary target. A hash check cannot establish that CSS makes the text visible or that keyboard users can reach a link; rendered checks cannot establish byte equality. Retain both kinds of evidence. Use [W3C's initial accessibility checks](https://www.w3.org/WAI/test-evaluate/preliminary/) as a starting point, with its stated limitation that passing them is not a complete conformance assessment.

Record the actual browser/version, viewport, release identifier, action and result. The generator writes **no fabricated browser pass**, feedback story or completed student manual. Its `report.json` records calculations, comparisons and runtime details; its `handover-template.md` deliberately leaves your artefact paths and evidence to fill in.

## Check the semester's stopping rules

The workbook calls the actual earlier functions, rather than merely printing the desired labels:

| Week | Attempt after a boundary | Expected result |
| --- | --- | --- |
| 6 | Incoming reply with a declined boundary | `routeMessage` still returns stop. |
| 7 | Late reply after explicit decline | Complete closed conversation stays fixed. |
| 8 | Review clearance after decline | Hold clearance cannot reopen the closed conversation. |
| 9 | Confirmation after cancelled proposal | Cancelled state stays fixed and date export fails. |
| 10 | Next-date event after meeting ended | Complete ended meeting stays fixed. |
| 11 | Reconstruct a later view of a declined observation | Declined remains in the retained history. |
| 12 | Clock or new proposal after ending | Complete ended agreement stays fixed. |

Weeks 2–5 supply observations, assets, experiments and probability/feasibility models rather than a relationship lifecycle reducer. Audit their data and evidence boundaries using the earlier work; do not invent terminal transitions for a score function. Week 10's absorbing N/E probability states remain distinct from observed agreement and withdrawal. The software rollback writes none of these human-agreement records.

**Challenge.** In a disposable source copy, remove the Week 12 ended guard or accept the final response exactly at tick 10. State the literal answer that should fail, run the check, inspect the failure, restore the source and rerun. A test that only checks its own computed expected result cannot establish the convention is right.

## One handover index, eleven artefacts

The index is a navigation aid for your actual source/build bundle, not an additional essay. For each row record **local path, version, a reproduction/check result, and the later use**. Course tutorial links explain the requirement; they do not prove your artefact exists.

| Week | Artefact | Concrete use in the release |
| --- | --- | --- |
| 2 | [Platform audit](/sessions/02-platforms/) | Bound platform and denominator claims. |
| 3 | [Photo asset manifest](/sessions/03-photo-assets/) | Locate approved synthetic assets and evidence. |
| 4 | [Bio experiment protocol](/sessions/04-bio-experiment/) | Distinguish supported wording from invented effects. |
| 5 | [Match probability model](/sessions/05-match-probability/) | Locate the frozen objective, candidate and feasible invitation. |
| 6 | [Message decision tree](/sessions/06-message-tree/) | Preserve contextual evidence and refusal boundaries. |
| 7 | [Communication state machine](/sessions/07-communication/) | Trace observations, deadlines and terminal closure. |
| 8 | [Threat model](/sessions/08-threat-model/) | Check what is collected, retained and excluded. |
| 9 | [Offline handover plan](/sessions/09-offline-handover/) | Retain versioned costs, confirmations and cancellation. |
| 10 | [Date transition model](/sessions/10-date-simulation/) | Locate exact/seeded comparison and separate observations. |
| 11 | [Follow-up evaluation](/sessions/11-follow-up/) | Preserve primary, sensitivity and changed-case results. |
| 12 | [Maintenance and exit manual](/sessions/12-maintenance/) | Reproduce, restore and explain change/ending procedures. |

**Exercise — 5 minutes.** Pick one index row whose later use is merely “see this link.” Replace it with a specific file, version and value or state that the later step consumes. If the artefact is missing, record the gap and the work needed; do not write a successful check that never happened.

## Defend the result that remains inconvenient

The existing final project asks for one rejected candidate, one revision prompted by actual report or exam feedback, and one limiting result. Locate those records before drafting the defence. If feedback or a revision is missing, name that gap and use the course's support route; do not invent a tutor comment or first-person experience. The reference rank-2 result demonstrates how to preserve a limitation, not what a student must claim to have experienced.

Acceptance and quality remain separate. The page must be fictional, open correctly and correspond to the evaluated text. The scorer/build must reproduce the published result. The quality of your explanation depends on whether the model's scope, evidence and failed assumptions are honestly assessed. No romantic outcome or achieved rank is graded.

Submit the [final project](/assessments/profile-deployment/) by **28 May 2027, 5 pm Canberra time**, worth **50%**. Its model card stays **1,200–1,600 words** and its separate defence **300 words**. The maintenance manual, clean-run log, software rollback and handover index support the existing release record and validation appendix; they add no new assessment. Preserve the available static URL or accepted local-build/demonstration route described in the brief.

The final invariant is simple enough to test: the software can return to an earlier release; an ended agreement stays ended. Keep the failed target, the boundaries and the evidence needed for someone else to understand both.

[Continue to the Week 12 tutorial](/sessions/12-maintenance/).

## Alex's final handover

Alex's journey closes with a profile another person can inspect, reproduce and maintain, including the missed benchmark target. The separate agreement exercises preserve changes and endings without rewriting anyone's answer. The opening blank profile has become an evidence trail. The course's final handover is that trail: what the system knows, what remains unknown and how to stop using it.

[Take the evidence trail into the final project](/assessments/profile-deployment/).
