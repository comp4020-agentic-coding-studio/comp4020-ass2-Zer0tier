---
title: "System Maintenance and Graceful Deprecation"
description: "Design explicit relationship agreements, change requests and respectful endings. Reproduce the final release and document its maintenance."
week: 12
date: 2027-05-27
teachers: [eli-brooks]
phase: Ship
output: "Maintenance and exit manual"
buildsOn: ["sessions/08-threat-model","sessions/11-follow-up"]
related: ["lectures/week-12","sessions/08-threat-model","sessions/11-follow-up"]
spec:
  - "A clean run reproduces the release; software rollback is not permission to restore a person's prior agreement."
  - "Use synthetic data; solo implementation and review are accepted."
---

## Inputs

Bring the **[Follow-up evaluation](/sessions/11-follow-up/)**, **[Threat model](/sessions/08-threat-model/)** and all versioned inputs. Keep the frozen candidate text, ratings, controls version, primary/sensitivity results, changed-case result, build instructions and actual browser evidence together. Do not begin with a new undocumented candidate.

Download the [nineteen-file Week 12 workbook](/lectures/week-12/#run-the-nineteen-file-workbook) before the session. The three new files sit beside the sixteen unchanged Week 11 downloads. Node runs the reference drill offline without additional packages. Use the [worked lecture](/lectures/week-12/) and [50-slide deck](/decks/week-12/) for the traces and debriefs; review completed lecture work instead of repeating it.

Follow the [60-minute lecture selection and independent-work plan](/lectures/week-12/#scheduled-teaching-and-independent-work). Complete the preparation and open the workbook before Thursday. The four blocks below are the entire **90-minute tutorial**; use existing lecture or study working for review and refinement. Remaining pack material belongs to the week’s independent study allocation.

## 90-minute tutorial

1. **20 minutes — design maintenance.** Write a separate fictional agreement-change scenario for monogamy or ethical non-monogamy; add no biography to Alex. Name the affected participants, current terms/version, proposed terms, exact acknowledgements and expiry. Trace propose/A/B as versions **1, 1, 2**, with the proposal separate until adoption. Reject a stale v1 proposal after v2. Compare a last acceptance at tick **9** with one at **10** in the authored **[1, 10)** window. Explain why expiry supplies neither agreement nor refusal. Solo implementation and review are accepted.
2. **20 minutes — deprecate gracefully.** End during a partially accepted change, then deliver a late acceptance and clock event. The **whole ended record** must remain unchanged; either participant can end even from a stale version. Keep unresolved practical tasks separate from the ending. Inventory purpose, owner, every copy, expiry and release dependency. At day 14 the reference plan covers **two records / three own copies**; another person's copy stays outside control. At day 30 two reproduction dependencies require review. The planner deletes no listed files, and these invented periods are not a retention policy.
3. **30 minutes — reproduce and roll back.** Run the drill below against the unchanged Week 11 teaching example, or reproduce your own release using its own documented build. Preserve the received directory. Compare all **four declared output files**, exact candidate text, score and rank. Inspect the disposable faulty page, then the restored one. Record actual keyboard, focus, narrow-screen and text checks alongside the byte comparison. Explain why editing a manifest to match a fault, or restoring only HTML while leaving stale files, is insufficient.
4. **20 minutes — defend the limits.** Inspect the actual Week 6–12 terminal checks and the Week 8 release-boundary result. Complete the eleven-row handover index with your own local paths, versions, check results and concrete later uses. Identify an actual rejected candidate, a revision prompted by actual report or exam feedback, and a remaining limitation. Mark absent evidence as a gap; neither the example nor the template supplies student feedback or a completed submission.

## Run, inspect and challenge

From the directory containing the nineteen downloads:

```sh
node week-12-worked-examples.mjs --release-dir ./example-rc1 --work-dir ./maintenance-lab
```

`example-rc1` must be an existing, unchanged **Week 11 reference release**. Omit `--release-dir ./example-rc1` to reconstruct that example automatically. `maintenance-lab` must be a **new** directory; the drill refuses to overwrite one. With no arguments, it prints a report and removes only its own temporary drill directory, so use `--work-dir` when retaining browser evidence.

| Output | Inspect and record |
| --- | --- |
| `report.json` | Node/platform/architecture, source checks, reproduction result, agreement traces and seven actual terminal checks. |
| `reproduced/` | All four outputs match the received HTML, evaluation, manifest and README byte for byte. |
| `faulty/` | `index.html` loses “Fine to pass.” and `obsolete.txt` is extra. The retained manifest comparison must fail. |
| `restored/` | All four trusted files match again; the extra file is absent. Open `index.html` and follow its evaluation link. |
| `trusted-release-manifest.json` | The retained four-file comparison baseline; hashes compare bytes, not identity or agreement. |
| `current-release.json` | A local pointer to `restored/`; no hosting change or deployment occurred. |
| `handover-template.md` | Eleven uncompleted rows to fill with your own artefacts and evidence. |

The example keeps primary **93.75 / rank 2**, sensitivity **90 / rank 2**, and the separate changed-availability failure. It must not acquire a better score during restoration. The clean-copy run uses the same host and Node executable; it does not establish independent-machine reproducibility. For your own build, declare its outputs and environment before comparison rather than editing the reference inputs to make its checks pass.

**Challenge and debrief.** Explain what should fail if the final acceptance at tick 10 adopts v2, a late event changes an ended history, or the restored directory retains `obsolete.txt`. Test one in a disposable copy, inspect the literal failed expectation, restore the source and rerun. Keep software restoration separate from the agreement state: no previous release restores permission to continue.

## Deliverable: Maintenance and exit manual

Save the manual, clean-run log, rollback evidence and a one-page handover index linking your eleven tutorial artefacts. The manual names the change/expiry/ending procedures, practical dependencies, retention scope and release reproduction/restore steps. Include an actual before/after file comparison and rendered-page check; a generated “passed” field alone is insufficient. No workflow may interpret a refusal as a transient error.

These records support the existing final project's release record and validation appendix; they add no assessment. Submit the [final project](/assessments/profile-deployment/) by **28 May 2027, 5 pm Canberra time**. Its **50%** weight, **1,200–1,600-word** model card, **300-word** defence and accepted local-build route remain as specified. A reproducible missed rank target is acceptable; an invented success is not.
