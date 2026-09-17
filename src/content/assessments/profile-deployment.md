---
title: "Final Project: Deploying a Top 1% Dating Profile"
description: "Release a fictional profile with a reproducible benchmark, a distribution-shift test and an honest account of what the rank cannot mean."
week: 12
due: 2027-05-28T17:00:00+10:00
weight: 50
practiceMode: synthetic-data
benchmark: Null Island v1
benchmarkSize: 100
rankIsGraded: false
preparation: ["sessions/05-match-probability","sessions/08-threat-model","sessions/09-offline-handover","sessions/10-date-simulation","sessions/11-follow-up","sessions/12-maintenance"]
related: ["sessions/05-match-probability","sessions/08-threat-model","sessions/09-offline-handover","sessions/10-date-simulation","sessions/11-follow-up","sessions/12-maintenance"]
marking:
  mode: weighted
  criteria:
    - name: "Reproducible model and evidence chain"
      weight: 30
    - name: "Evaluation, sensitivity and limitations"
      weight: 30
    - name: "Working accessible release and rollback"
      weight: 25
    - name: "Technical defence and use of feedback"
      weight: 15
spec:
  - "Use only fictional cases and synthetic data; no real romantic outcome is graded."
  - "Include reproducible working and source attribution under the assessment's stated tool rules."
---

## The brief

Build, evaluate and deploy a **labelled fictional profile for Alex**, the case introduced in [week 1](/lectures/week-01/) and fixed in the [toolkit](/toolkit/#benchmark). Your target is rank 1 in the **Null Island v1** profile-quality benchmark. Your actual result—including a failure to reach that target—must remain visible.

The joke is in the promise. The engineering is in the denominator.

## Exactly what “top 1%” means here

One submitted candidate is compared with **99 supplied synthetic controls**, giving **100 entries**. The primary score is 100 × (clarity + specificity + feasibility + exit) / 16, using four evidence-backed 0–4 feature ratings. The [toolkit](/toolkit/#benchmark) publishes the controls, anchors and executable scorer.

Rank = **1 + count of controls scoring greater than or equal to the candidate**. Ties count against you. Only rank 1/100 qualifies under this rule. A tie with the best control does not. Neither the inputs nor the score estimate a real person's attractiveness or a real-app percentile.

**Rank is not a marking criterion.** A reproducible, well-analysed failed target can earn full marks. Inflated evidence cannot. Do not fabricate ratings, results or deployment evidence to reach the title.

## What you submit

Submit one source/build bundle containing:

1. **The release.** One static fictional profile, with no real contact collection or app integration. Supply a public static URL, or a self-contained local build plus a two-minute recorded demonstration if public hosting is unsuitable.
2. **The model card, 1,200–1,600 words.** State intended use and non-use, Alex's case facts, feature evidence, primary score, conservative rank, denominator, controls version, assumptions and limitations.
3. **Reproduction files.** Candidate text, feature evidence, the unchanged 99 controls, scoring code, dependency versions, checks and a README with a single run command or precise manual procedure.
4. **A validation appendix.** The frozen week 5 objective; week 11 reranking under doubled feasibility weight; a changed-availability case; and the week 10 exact/seeded Markov comparison. Include the photo manifest, message-state boundaries, threat model and offline handover as linked notebook artefacts, not extra essays. Separate exploratory revisions from evaluation of a frozen candidate.
5. **A release record.** Keyboard and viewport checks at 1920×1080 and 390×844, a version tag, software rollback demonstration, week 12 clean-run log and maintenance/exit manual. Relationship agreements are fictional scenarios, not personal disclosures.
6. **A 300-word defence.** Explain one revision prompted by report or exam feedback, one rejected candidate, and the result that most limits your claim. This sits outside the model-card word count.

Figures, tables, code and source/tool notes are outside the word count. Use the [Match probability model](/sessions/05-match-probability/), [Threat model](/sessions/08-threat-model/), [Offline handover plan](/sessions/09-offline-handover/), [Date transition model](/sessions/10-date-simulation/), [Follow-up evaluation](/sessions/11-follow-up/) and [Maintenance and exit manual](/sessions/12-maintenance/) as the evidence chain.

## Acceptance versus quality

[Release Day](/release-day/) lets you rehearse a review using the evidence note from Week 4. Its trace can accompany the maintenance manual, but its supplied faults and simulated acceptance are practice: they do not validate your own files, supply feedback on your project or replace any required submission evidence.

The page must open, identify itself as fictional and correspond to the evaluated text. The scorer must reproduce your published result from the provided inputs. Those are acceptance checks. The rubric separately rewards your judgement about leakage, exposure, metric gaming and failed assumptions.

Using a local build for this fictional assessment does not change the public GitHub Pages requirement for the actual website assignment.

## Submission and feedback

Due **28 May 2027, 5 pm Canberra time**. Bring the bundle to Casimir on removable media or arrange an accessible digital handover at consultation; there is no upload service on this site. Feedback returns within fourteen days. This project contributes **50%** of the course. See [policies](/policies/) for extensions, tool use and review.
