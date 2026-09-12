# From experiment to release

The requested pair is implemented at `/experiment-that-lied/` and
`/release-day/`. Both are linked from the homepage and toolkit, their lecture
and tutorial pages, and the existing assessment they prepare. They extend
Alex's course story with a concrete evidence handoff.

## Teaching decisions

The Experiment That Lied uses the unchanged `bio-exposures.csv`. The opening
prediction is retained when the student revises a later conclusion. Pooled
A 26/100 versus B 19/100 gives way to the North 30%/35% and South 10%/15%
comparisons. A disclosure shows the hypothetical 50/50 weighting, 20%/25%.
Neither comparison establishes a causal text effect. The note explicitly
distinguishes missing randomisation/independence records and the absent mapping
between exposure labels and Alex's separate authored texts. An invented photo
change is rejected as an observation; freezing the photo is a proposed control.

Students select a conclusion, limitations and allocation/photo/stopping controls.
Feedback identifies gaps without requiring a perfect answer to export a draft.
The resulting `alex-experiment-v1` JSON contains the actual selected choices and
four original observation cells. The continuation link carries that same record
in its fragment; a saved file can also be read locally in Release Day. Neither
route needs an account, a backend or an uploaded profile. Inputs are bounded,
schema-checked and compared with the supplied observation cells. Imported records
cannot supply release checks or executable state.

Release Day keeps the received note separate from the evolving current note.
Its authored `release-day-v1` candidate adds three faults: a causal release claim,
a stale photo reference and a $24 plan against Alex's fixed $20 limit. Source
inspection links to Week 4, the actual Week 3 manifest and Week 9. Switching the
causal winner, renaming a stale reference or raising Alex's draft budget leaves
the corresponding check held. Valid repairs record an explicit source-conclusion
revision, restore the complete frozen reference, or use the separate $14/90-minute
Atrium proposal. Agreement is never inferred.

Each edit invalidates both the check and the decision. A ready decision requires
a run on the current revision and three passing checks; holding remains available.
The downloadable review retains received/current notes, repairs, check runs,
decision and any outstanding protocol gaps. Correcting a release note does not
silently complete the Week 4 trial specification.

This is a record-consistency rehearsal, not a filesystem inspector or deployment
service. The Week 11 reference release, its rank-2 result and the Week 12 actual
byte-comparison/rollback workbook stay separate. Students still need their own
project artefacts and rendered-page evidence. The activities use five minutes
within the Week 4 reversal block and five within the Week 12 reproduction block;
the Week 4 evidence form organises the existing protocol work. The course retains
its 60/90-minute contact pattern, twelve lectures, eleven tutorials and 20/30/50
assessment weights. Exploratory feedback stays separate from quiz submission gates.

## Interface and verification

The UI/UX skill's design-system suggestion classified the work as children's
education and proposed different fonts and colours. That category did not fit
this university course. The implementation retains Public Sans, course tokens,
native controls and static paper fallbacks; the Astro search supported keeping
interaction code local to the relevant components.

The first browser pass completed the handoff and all repair paths at both marking
viewports, but found low contrast on a legend and a source link. Visual inspection
also found the global prose rule overriding the component's desktop width and
theme colours leaking into the data table. Scoped course colours and more specific
width rules corrected those issues. The audit now measures the laboratory width
against available main-content width, instead of checking only for overflow.

`spec/evidence-journey.test.ts` adds ten behaviour tests for literal arithmetic,
uncertainty, malformed data/imports, immutable handoff, cosmetic repairs, current
checks, stale approval and earlier source references. Temporarily replacing the
readiness condition with `true` caused the required-current-run test to fail
(`ready` instead of `held`); restoring it returned all ten tests to green.

The focused browser audit is `scripts/audit-evidence-journey.mjs`, also wired into
`pnpm check:browser`. It exercises keyboard operation, focus after transitions,
form validation, imperfect and supported exports, link/file handoff, corrupt and
oversized input, reload of a file-selected note, all repairs, stale-check refusal,
reset, re-entry to the experiment, no-JavaScript paper tasks and cold-cache loading.
It checks both 1920×1080 and 390×844 plus intermediate widths around 640, 850 and
1440, 375px and short landscape. Eight changed entry pages are inspected at both
marking widths. The report retains findings even when an assertion fails.

Final checks: `pnpm check` passed with zero type diagnostics, **186 tests across
32 files**, 55 built pages and clean link/deck/build accessibility checks.
`pnpm check:evidence` passed with all eight existing process citations resolving.
The focused Chromium audit passed **30 inspected states** with no axe, clipping,
target-size, JavaScript-error or network-write findings. The cold-cache checks
used 150ms latency and 200kB/s download. The targeted audit was run directly;
unrelated deck and quiz interactions were not repeated. Chromium used the
existing temporary ALSA library and sandbox escalation. These are local checks;
this task did not push or publicly deploy the new pages.

[Desktop reversal](screenshots/experiment-reversal-desktop.png) ·
[Phone evidence note](screenshots/experiment-note-phone.png) ·
[Desktop release review](screenshots/release-review-desktop.png) ·
[Phone release decision](screenshots/release-decision-phone.png)
