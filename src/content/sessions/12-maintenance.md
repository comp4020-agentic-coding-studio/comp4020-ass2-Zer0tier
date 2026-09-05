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

Bring the **Follow-up evaluation**, **Threat model** and all versioned inputs. Do not begin with a new undocumented candidate.

## 90-minute tutorial

1. **20 minutes — design maintenance.** Write a fictional agreement-change scenario for monogamy or ethical non-monogamy. State who must agree and what happens when a change is not accepted.
2. **20 minutes — deprecate gracefully.** Define a clear ending, practical dependencies and a no-retry rule after refusal. Separate removing your own synthetic logs from claiming control of someone else's records.
3. **30 minutes — reproduce and roll back.** From a clean directory, run the documented build and scorer using the recorded versions. Compare text, score and rank. Restore a previous software release and record the result.
4. **20 minutes — defend the limits.** Trace the evidence chain from boundary map to deployed page. Identify one rejected candidate, one revision prompted by feedback and one assumption that still fails.

## Deliverable: Maintenance and exit manual

Save the manual, clean-run log, rollback evidence and a one-page handover index linking your twelve artefacts. No workflow may interpret a refusal as a transient error.

Submit the [final project](/assessments/profile-deployment/) by **28 May, 5 pm**. A reproducible missed rank target is acceptable; an invented success is not.
