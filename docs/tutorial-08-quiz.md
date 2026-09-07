# Eighth tutorial: an interactive Offline handover quiz

The eighth tutorial is Week 9, `/sessions/09-offline-handover/`. “The itinerary
mistakes itself for an agreement” adds six application cases using the existing
quiz component. Preparation links directly to it. Week 1 remains lecture-only.

The new cases apply the week's planning and agreement rules:

- Filter Nook, Den and Arcade before ranking their preference scores. Unknown
  exit evidence and a private setting fail; exact time and budget limits pass.
- Recalculate two $7.50 drinks plus $3 transport after a split-drinks revision,
  preserving unknown counterpart transport and clearing both old confirmations.
- Enumerate a new 85-minute, $18 contingency model with independent lateness
  probability 0.20 and closure probability 0.15. Apply strict >110 exceedance.
- Change the closure conditionals to 0.50 given late and 0.0625 given on time.
  Show why fixed marginals preserve additive means but allow a changed tail.
- Recheck a fallback whose added time changes from ten to 25 minutes and whose
  exit becomes unverified. Require a feasible revised agreement or cancellation.
- Compare confirmations just before and exactly at 16:40, cancellation followed
  by confirmation, and review clearance that returns a plan to draft.

The venue cards, contingency diagram and four-branch event table supply the
problem inputs. The diagram includes the assumptions and limits but no joint
probabilities or answer. Its text alternative supplies equivalent information.
Cases 3–5 explicitly share one new numerical scenario and stated changes to it;
other plans remain separate. The earlier Library and Atrium resource examples
and Alex's Friday 5–7 pm, bus and $20 constraints are unchanged.

Worked explanations derive a 3% independent tail, then a 10% dependent tail
with the same $18.30 and 91.5-minute means. They distinguish the 110-minute
target from the 120-minute hard window, identify the changed 135-minute
fallback, and retain version-specific agreement. Export represents only a
currently confirmed plan, never arrival or continuing agreement. No messages,
bookings, payments or real venue searches are performed.

The final 20-minute tutorial block now uses ten minutes to review the prepared
dependence calculation and mutation/restoration evidence, then about eight for
quiz responses and two for worked explanations. The lecture summary matches,
and the existing pre-tutorial study block explicitly includes that preparation.
The tutorial remains 20 + 20 + 30 + 20 = 90 minutes alongside the 60-minute
lecture, full 50-slide teaching resource and 210-minute independent allocation.

Every case needs a valid response, including an incorrect attempt. Completion
enables Reveal answers; explicit submission fetches the separate solution
resource and displays scores, answers and explanations. No responses accompany
that request. Navigation preserves responses, retry and reload clear the
attempt, and failed solution loads preserve it. Without JavaScript, prompts
remain readable and submission stays disabled. This static practice gate does
not prevent deliberate inspection of the solution URL.

The shared component, script, grading logic, styles and workbook functions are
unchanged. The focused audit now covers all eight quizzes. No dependency was
added.

Verification:

- `pnpm check` passed: 143 tests in 27 files, zero type diagnostics, broken
  internal links or build accessibility/deck structural violations.
- The publication test first failed against the earlier build without the
  eighth quiz, then passed after building it. Unit checks cover all missing
  cases, malformed responses, decimal equivalence, 0/6, 2/6 and 6/6 attempts,
  literal venue decisions, inclusive limits, changed costs, joint probabilities,
  expected values and fallback hard-window failure.
- Event tests check revision history, stale-version rejection, both distinct
  confirming actors, the exact deadline, full cancelled/expired snapshots,
  review clearance, export eligibility and unchanged input snapshots.
- `node scripts/audit-tutorial-quiz.mjs` passed for all eight quizzes against
  the built preview. It checked missing and invalid responses, completion
  without submission, Enter submission, keyboard navigation, 2/6 and 6/6
  attempts, retry and reload, and recovery from a failed solution request.
  No solution request or answer markup appeared before valid submission.
- The browser audit checked all six cases at 1920 × 1080, 390 × 844,
  375 × 667 and 844 × 390, including contained images, horizontal overflow,
  44-pixel targets, axe accessibility checks and JavaScript errors. The
  no-JavaScript check retained readable prompts and disabled submission.
- Visual inspection confirmed that the venue and deadline tables wrap on
  phones, the probability diagram fits at desktop and phone widths, and
  submitted feedback remains in the reading column. The full site and deck
  browser audit was not rerun for this quiz addition.
- The separate evidence gate still flags the existing `PROCESS.md` template
  comment and placeholder citations `a1b2c3d` and `e4f5a6b`. The student's own
  account was not edited.

Screenshots from the built preview:

- [Desktop probability case](screenshots/tutorial-08-quiz-desktop.png)
- [Phone probability case](screenshots/tutorial-08-quiz-phone.png)
- [Phone submitted feedback](screenshots/tutorial-08-quiz-feedback-phone.png)
