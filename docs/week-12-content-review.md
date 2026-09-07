# Week 12 content review

## Sufficiency and pacing

Week 12 now has 50 slides, 16 native figures, expanded worked notes and an
executable maintenance workbook. Its 180-minute route allocates 30 minutes to
scope and versioned agreements, 35 to stale writes/expiry/endings, 10 to a break,
30 to routines/dependencies/retention, 40 to reproduction/fault/restoration and
35 to the evidence chain and final defence. The tutorial preserves its existing
20/20/30/20-minute allocation. Completed lecture exercises become evidence
review in the tutorial rather than duplicated work.

Exercises include explicit acceptance traces, a stale local copy, the tick-10
boundary, ending during partial acceptance, a monitoring proposal, a borrowed
item after an ending, a missed backup, missing/changed/extra outputs, misleading
repairs, rendered-page inspection and a concrete handover dependency. Each has
a debrief. Optional 15–20-minute extensions use the three-participant example,
a changed manifest byte or a genuinely separate reproduction machine. Timings
are facilitation estimates, not a duration claim based only on slide count.

The final-week connection is explicit: the manual, reproduction log, rollback
evidence and eleven-row index support the existing release record and validation
appendix. There is no additional assessment or personal disclosure task. Solo
implementation and review remain accepted.

## Visual treatment

The previously applied slides and UI/UX skills informed the teaching structure
and native MaintenanceFigure component. Eleven labelled tables and five ordered
process diagrams show the agreement record, distinct acknowledgements, stale
writes, expiry, retention scope, byte comparisons and release handoff. Captions,
row headers and notes carry the meaning without colour, hover or animation.

The UI data's Sankey/process-mining suggestions were unsuitable for exact event
traces and file comparisons. Native tables and ordered steps fit those tasks.
The component uses the existing course palette and Public Sans, including
explicit list-item margins and bounded layouts at narrow/short viewports. No
new dependencies, image generation, global theme changes or external runtime
services were introduced. The unchanged generated Week 11 HTML uses a local
system font and can be inspected offline.

Visual inspection covered the desktop stale-write table, phone retention and
file-difference tables, phone reproduction flow, desktop lecture opening,
phone lecture prose and restored phone release with visible keyboard focus.
Retained screenshots: [stale-write table](screenshots/week-12-stale-desktop.png),
[phone retention](screenshots/week-12-retention-phone.png), and
[restored release](screenshots/week-12-restored-phone.png).

## Actual dependencies and scope

The nineteen-file download adds three Week 12 files beside the sixteen unchanged
Week 11 inputs. The runner reads the received Week 11 manifest and evaluation,
validates its flat source names before reading them, checks all sixteen input
digests and both original output digests, and verifies the frozen candidate.
It copies exactly those sixteen sources into a new clean-source directory and
executes the unchanged Week 11 generator with the same Node executable.

The automatic route deliberately accepts the published Week 11 reference
release. With --release-dir it reads an existing unchanged example without
modification; otherwise it labels the received example as a reconstruction.
Students reproduce their own candidates using their own documented inputs,
build and declared outputs. The reference program does not claim to reproduce
an arbitrary submission, recover a student's prior freeze or supply their
browser/feedback evidence.

Actual earlier calls check Week 6 routing after a declined boundary, Week 7's
closed conversation, Week 8's closed review, Week 9's cancelled handover and
blocked date export, Week 10's ended meeting, Week 11's retained declined
observation and Week 12's ended agreement. Week 8's actual release-plan checker
also rejects deliberately changed contact-collection and payment flags. These
checks preserve the meanings of earlier functions rather than merely printing
desired labels. Weeks 2–5 supply data, assets and stateless models; the notes
explicitly avoid inventing lifecycle transitions for those functions.

The A/B and P/Q/R agreements are separate authored classroom scenarios, not
new biography for Alex. Monogamy and ethical non-monogamy are scoped examples,
with the limits of the lock/concurrent-process metaphors stated. No participant
is a resource and no shared record grants control over unrelated relationships
or access to another dyad's information. The active phase records the last
adopted terms; it cannot certify continuing human agreement.

## Literal conventions and checks

- The initial v1 requires acknowledgements from every distinct listed adult.
  Proposal creation counts as zero responses. Propose/A/B yields current
  versions 1, 1, 2; A alone leaves the exact proposed terms pending. The separate
  P/Q/R trace is 1, 1, 1, 2. No majority substitutes for the missing participant.
- Acceptances target the exact proposal and current base. A stale v1 proposal
  after adoption of v2 fails. Reusing rejected terms under a new proposal ID
  fails. The code cannot recognise paraphrased pressure or decide whether a
  changed proposal is welcome; the lecture states that limit.
- The window is [1,10). A final acceptance at tick 9 adopts v2; tick 10 archives
  expired, retains v1 and stays in review. A clock at 10 supplies no answer.
  Rejecting the proposed change differs from ending the agreement; recorded
  old terms are not automatically imposed during review.
- Either listed participant can end immediately, including from a stale base
  version. A partially accepted proposal becomes cancelled-by-ending. Complete
  ended snapshots remain unchanged under later acceptance, clock and proposal
  events. Practical task completion is separate from the agreement phase.
- Exact JSON serialization defines duplicate-event equality, including property
  order. Duplicate delivery cannot add another acknowledgement. Conflicting IDs,
  unknown actors/types and backwards chronology fail before ordinary updates.
  The terminal guard precedes all later-event interpretation. These are local
  snapshots, not authenticated or tamper-proof logs.
- Day 14 plans removal of raw-events and scratch-drafts: two records covering
  three own copies. Source and boundary-summary remain for their stated
  purposes; another person's copy is outside control. At day 30 the two release
  dependencies require review. The planner performs no listed-file deletion or
  outgoing request. All 7/14/30-day periods are invented teaching values.
- The flat manifest comparator distinguishes missing, changed and extra names,
  rejects duplicate/path-traversal entries and uses SHA-256. Its standard `abc`
  digest is checked against a literal. Trust in the retained manifest is an
  input assumption; replacing both files and hashes can preserve self-consistency.

## Reproduction and restoration evidence

The final retained drill consumed the existing Week 11 example and wrote a new
work directory. Primary 93.75/rank 2, sensitivity 90/rank 2 and the separate
changed-availability failure all remain. Reproduction compares four files:
index.html, evaluation.json, manifest.json and README.txt. Week 12's additional
trusted manifest covers all four; it does not edit Week 11's two-output manifest.

The fault removes exactly one “Fine to pass.” from a disposable HTML copy and
adds obsolete.txt. The comparison reports changed index.html, extra obsolete.txt
and no missing file. The old evaluation deliberately remains visible, exposing
the mismatch between a printed rank and the rendered candidate. Restoration
validates the archive, copies the complete baseline to a new directory and
excludes the extra file. The faulty copy remains available for inspection.

An independent Python/hashlib check verified four trusted digests and eight
direct byte comparisons: each of four reproduced and four restored files equals
the received file. It also verified the single removed/restored exit phrase,
the two-record/three-copy retention count and the named day-30 dependencies.
The ordinary no-argument mode also completed successfully. Its cleanup targets
only the run's own newly created temporary directory; --work-dir retains the
evidence and refuses to overwrite an existing directory.

This is same-host, clean-directory reproduction with Node built-ins. It is not
independent-machine replication, a hermetic environment or provenance proof.
Runtime details are recorded separately from the unchanged declared outputs.
The local current-release.json pointer does not switch a server or deploy a
site. Software restoration performs no writes to the human-agreement records.
The handover template leaves eleven cells “To record” and asks for actual paths,
versions, checks and later uses. It supplies no invented student evidence.

## Sources and preserved course contract

Primary sources checked on 7 September 2026:

- [RFC 9110, §13.1.1: If-Match](https://www.rfc-editor.org/rfc/rfc9110.html#name-if-match), for the conditional-update analogy and prevention of lost updates. The local reducer implements neither HTTP nor an atomic distributed service.
- [W3C: data minimization](https://www.w3.org/TR/privacy-principles/#data-minimization), for limiting transfers to the user's goals. The source does not prescribe the exercise's retention periods.
- [Reproducible Builds: definition](https://reproducible-builds.org/docs/definition/), for specified source, environment, instructions and byte-identical declared outputs.
- [Git: git-revert](https://git-scm.com/docs/git-revert), for reversing changes through a new commit. The workbook uses file snapshots and runs no Git restoration command.
- [W3C: Easy Checks](https://www.w3.org/WAI/test-evaluate/preliminary/), previously checked for Week 11 and reused for initial keyboard, focus and text inspection with its explicit incomplete-conformance limitation.

The assignment brief and marking environment were rechecked. The course's
lecture/tutorial dates remain 24/27 May 2027. The final stays 50%, due 28 May
at 5 pm Canberra time, with a 1,200–1,600-word model card and separate 300-word
defence. All twelve titles/key concepts, eleven tutorials, assessment weights,
fixed branding, four schemas, generated API and Alex's facts remain. Readings
and toolkit provide source purposes and the complete download route.

## Verification and remaining submission gate

`pnpm check` passes all 104 tests in eighteen files with zero type errors,
warnings or hints. Eleven new tests cover the literal agreement, expiry,
ending, ownership, manifest and restoration conventions, plus isolated offline
execution of the actual downloaded pack. The end-to-end check preserves the
received release, compares all four output files, tests failure for altered
received bytes and source inputs, and verifies refusal to overwrite a directory.
The build emits 52 pages and twelve structurally valid decks, with no broken
internal links or build accessibility findings.

Two single-match source mutations produced the intended assertion failures:
removing the ended guard changes a supposedly fixed snapshot, and changing
the expiry comparison from >= to > adopts at the excluded tick 10. Each source
was restored in a finally block. The restored focused suite passes all eleven
tests, and the subsequent full check passes. Astro's local socket, Chromium and
child Node execution required the established outside-sandbox workflow. An
early run from public/data also lacked the generated scorer, which is supplied
by the built download endpoint; the isolated pack and built-data runs passed.

The targeted browser audit passes all 50 slides at 1920×1080, 390×844, 375×667,
844×390 and 1024×768, including A/D, arrows, wheel, direct links and Esc return.
All sixteen figure slides fit and pass axe at both marking widths. The lecture,
tutorial, readings and toolkit have no horizontal document overflow or axe
findings at 1920 and 390. The faulty page visibly lacks the exit phrase. The
restored page matches the frozen rendered text and passes Tab/Shift+Tab,
visible focus, Enter activation of its evaluation link, axe and doubled-body-text
checks at both marking viewports. That text-resize stress check does not claim
every browser's zoom behaviour was tested.

The full `pnpm check:browser` passes all 52 pages at both marking viewports,
with zero findings and browser JavaScript errors. All 559 slides in twelve
decks pass five viewport sizes and navigation checks. Menu, search, target-size,
keyboard, calculator recovery, no-JS, resizing and cold-cache checks pass.
The final caption clarification was rebuilt and the affected deck rechecked.
Verification used Node 24.18.1 and Chromium 151.0.7922.34 on Linux x64.

`pnpm check:evidence` still fails for pre-existing student-statement placeholders:
PROCESS.md contains its template comment and cites nonexistent a1b2c3d/e4f5a6b
commits. PROCESS.md was not changed or filled with invented student experiences.
This separate submission gate remains to be completed by the student. The
Week 12 content/build/tests/browser checks pass; no public deployment was made.
