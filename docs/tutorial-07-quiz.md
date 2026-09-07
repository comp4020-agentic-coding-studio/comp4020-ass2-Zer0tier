# Seventh tutorial: an interactive Threat modelling quiz

The seventh tutorial is Week 8, `/sessions/08-threat-model/`. “The flag factory
requests a verdict button” adds six application cases using the existing quiz
component. Preparation links directly to it. Week 1 remains lecture-only.

The cases apply the week's evidence and error-cost rules:

- Repair a fictional upload/payment flow even though its declaration object
  passes the release check. Identify the actual assets and destinations.
- Triage new manually coded cards: disclosed automation plus a typo, an image
  non-match, and a deposit request. Keep a finding separate from a verdict.
- Calculate precision from a new matrix: TP 6, FN 2, FP 10 and TN 82 at an
  inclusive threshold of 55. Contrast the flagged and malicious populations.
- Compare thresholds 55 and 75 on that same sample. Preserve their loss tie
  at missed-case cost 4, then recompute the winner when that cost rises to 6.
- Project a different population with 2% prevalence, 60% recall and 5% false-
  positive rate, while stating the conditional-rate assumptions.
- Replay three continuations from a shifted communication snapshot with two
  open findings: late reply and clearance, refusal and clearance, or a new
  image non-match after the observation window expires.

The coded cards, confusion matrix, cost table and branch table supply concrete
inputs. The population diagram shows only the assumed counts and conditional
rates, with an equivalent text alternative. Cases 3–4 share one new authored
sample; the triage cards, population projection and protocol branches remain
separate fixtures. No real image search, upload, payment or accusation occurs.

Worked explanations show precision 37.5%, the 18/18 cost tie changing to 22/26,
and projected precision 12/61 ≈ 19.67%. The event explanation preserves the
[4, 6) window, both finding IDs and terminal closure. A complete resolution
reveals the latest underlying phase; it does not certify safety or consent.
The existing detector and review workbook functions remain unchanged.

The last 25-minute tutorial block reserves fifteen minutes for reviewing the
prepared wrapper, its event traces, literal checks and a peer or solo critique.
It then uses about eight minutes for quiz responses and two for the unlocked
explanations. The lecture summary matches, and the existing pre-tutorial study
block now explicitly includes preparing the review wrapper. The tutorial
remains 20 + 25 + 20 + 25 = 90 minutes, alongside the 60-minute lecture, full
50-slide resource and 210-minute independent allocation.

Every case needs a valid response, including an incorrect attempt. Completion
enables Reveal answers; explicit submission fetches the separate solution
resource and displays the score, answers and explanations. No responses are
sent with that request. Navigation retains responses, retry and reload clear
the attempt, and a failed solution load preserves it. Without JavaScript, all
prompts remain readable and submission is disabled. This static practice gate
does not prevent deliberate inspection of the solution URL.

The shared component, script, grading logic and styles are unchanged. The
focused browser audit now covers all seven quizzes. No dependency was added.

Verification:

- `pnpm check` passed: 137 tests in 26 files, zero type diagnostics, broken
  internal links or build accessibility/deck structural violations.
- The publication test first failed against the earlier build without the
  seventh quiz, then passed after building it. Unit checks cover every missing
  case, malformed responses, decimal equivalence, 0/6, 2/6 and 6/6 attempts,
  literal matrices, inclusive equality, undefined precision, new error costs,
  projected counts, supplied triage evidence and release declarations.
- The new protocol tests compare full closed snapshots, require both finding
  IDs and a note, preserve holds through a no-match assessment, retain late
  reply observations, and verify that input state is unchanged.
- `node scripts/audit-tutorial-quiz.mjs` passed for all seven quizzes against
  the built site on the existing preview server. It checked completion and
  answer-request gates, keyboard controls, partial/mixed/full attempts,
  numeric validation, failed solution loading and retry, reset, no-JavaScript
  fallback and axe. All six cases fit at 1920×1080, 390×844, 375×667 and 844×390
  without horizontal overflow. The full site-wide browser audit was not rerun.
- Visually inspected the population diagram on desktop and phone, the triage,
  precision and review tables on phone, and the unlocked explanations. Labels,
  codes, table cells and controls fit their containers.
- The separate evidence gate still flags the existing `PROCESS.md` template
  comment and placeholder citations `a1b2c3d` and `e4f5a6b`. The student's own
  account was not edited.

Screenshots:

- [Desktop population case](screenshots/tutorial-07-quiz-desktop.png)
- [Phone population case](screenshots/tutorial-07-quiz-phone.png)
- [Phone feedback after all six responses](screenshots/tutorial-07-quiz-feedback-phone.png)
