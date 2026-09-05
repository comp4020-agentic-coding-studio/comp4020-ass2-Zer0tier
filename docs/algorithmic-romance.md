# Course pivot: algorithmic romance

Agent-maintained factual notes, not the student's PROCESS.md.

The student rejected the original topic as too broad and requested **Applied
Algorithmic Romance & Profile Optimization**, a CS/data-science treatment with
technical deadpan humour. Their anchors were Hinge/Elo in week 1, Tinder bio A/B
tests in week 3, ghosting/game theory in week 7, and first-date stochastic models
in week 10. The assessment split stays 20/30/50, now a report, exam and deployment.
This supersedes the curriculum in [the earlier record](course-direction.md);
the pink/blue accents and native system paragraph typography are retained.

## Constraints made explicit before implementation

The requested SLOP4214 conflicts with the fixed suffix 276 documented in README
and `spec/assignment-2.test.ts`. The implementation uses SLOP4276, retaining the
student's level-4 choice. This conflict was explained before edits.

The course's repeated question becomes: **what did you actually optimize?**
The path is measurement (weeks 1–3), modelling (4–7), and validation/deployment
(8–12). Each lab leaves a versioned engineering artefact used later. The technical
work concerns profiles, exposure and model assumptions, not rating actual people.

"Top 1%" is scoped to one candidate plus 99 synthetic controls. Its declared
score and conservative tie rule make the boast falsifiable. Hitting rank 1 is
not itself a marking criterion: an honest failed hypothesis may earn full marks.
Public app experiments and private-message collection are outside the lab.

## Sources checked for the pivot

- [Hinge: Most Compatible](https://help.hinge.co/hc/en-us/articles/360011233073-What-is-Most-Compatible)
  describes dealbreakers, activity and patterns of likes, not a public Elo formula.
- [Tinder: method behind matching](https://www.tinderpressroom.com/powering-tinder-r-the-method-behind-our-matching)
  says its system no longer relies on Elo. The page states an update of 11 July
  2022; it is a platform statement, not independent access to the implementation.
- [NIST: two proportions](https://itl.nist.gov/div898/handbook/prc/section3/prc33.htm)
  supplies the large-sample pooled test used in the bio experiment lab.
- [scikit-learn: common pitfalls](https://scikit-learn.org/stable/common_pitfalls.html)
  supports separating model selection from test evaluation.
- [NumPy: binomial sampling](https://numpy.org/doc/stable/reference/random/generated/numpy.random.Generator.binomial.html)
  provides the stochastic simulation primitive; the course supplies its own
  fictional probabilities rather than presenting them as dating research.

The course-design position retains CS 007's explicit technical audience and the
accumulating practical work of How to Make (Almost) Anything. The student chose
the new angle; decisions about its benchmark, source boundaries and lab sequence
are implementation proposals for their review, not claimed student reflections.

## Implementation and verification record

[72b7d1f](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/72b7d1f)
records the new direction in CLAUDE.md and adds three deliberately unmet course
assertions. The previous prototype passed its nine tests first; all three new
assertions were then observed failing against that working but superseded course.

[fd89196](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/fd89196)
replaces the twelve lecture/lab units, three assessments, policies, team copy,
homepage and nine-slide deck. It adds the three synthetic CSV fixtures, an A/B
calculator, the benchmark contract and a downloadable scorer compiled from the
same TypeScript module that the site tests. The old lab and assessment URLs were
replaced, not left as misleading aliases; their contents remain recoverable in
Git history. Schemas, build configuration and institutional palette are unchanged.

The important design choice is a deliberately inspectable metric. A candidate
can beat the fabricated controls by satisfying the rubric; the advanced work is
defending the measurement, tracing matching assumptions and showing where a
changed objective or event dependence invalidates a comfortable conclusion.
The week 10 review made that concrete: both marginal event probabilities and
expected time stay fixed while deadline risk rises from 0.025 to 0.10. An exact
four-state oracle now protects the calculation. This is not a model of love.

The UI/UX skill informed balanced wrapping of the longer title and readable
mobile layouts without replacing the student's native-system paragraph style.
The slides skill informed a compact worked-calculation sequence: source boundary,
formula, numerical update, changed parameter, then a lab task. The original
pink/blue artwork was reworked into an experiment pipeline rather than app logos.

Local review found three browser findings: calculator legend contrast at both
viewports, and a four-column matching table whose phone scroller was not keyboard
focusable. Explicit ink colour and a two-column participant/preference table
resolved them. A source sweep also found “field-guide piece” in the shared lab
layout. A new built-page identity check was observed failing on that phrase,
then passed after the layout was updated.

The tie test was challenged by temporarily changing `>=` to `>` in the ranker.
It failed because a candidate tied with the best control incorrectly became
rank 1. The mutation was restored, and the test passed; the faulty version was
not committed. These tests protect exact promises, not the honesty of a student's
feature ratings, prose quality or the educational usefulness of a dependency.

Final local verification: `pnpm check` passes **19 tests**, builds **39 pages**,
and reports no type diagnostics, broken internal links or build-accessibility
failures. `pnpm check:browser` passes every page at **1920×1080** and **390×844**
with no axe A/AA findings, horizontal overflow, small measured targets or browser
JavaScript errors. It also checks calculator error/focus recovery, sparse counts,
keyboard submission, resizing with state retained, no-JS syllabus/toolkit content,
search, menu, cold-cache loading and all nine phone slides. Importing the built
download and running the documented example returned score 100, rank 1, entries
100. These are local Chromium checks, not a public-deployment audit.

[Desktop overview](screenshots/algorithmic-home-desktop.png) ·
[Phone overview](screenshots/algorithmic-home-phone.png) ·
[Phone calculator](screenshots/algorithmic-calculator-phone.png)

`pnpm check:evidence` still fails only because PROCESS.md contains the student's
unchanged template and example citations. No first-person reflection was written
for them. The site has not been pushed or publicly shipped in this session.
