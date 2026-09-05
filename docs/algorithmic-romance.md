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
