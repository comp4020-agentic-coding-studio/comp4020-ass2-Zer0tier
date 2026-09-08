# Process overview

I began with “How to Find a Partner” and requested pink and blue styling. I
then rejected that broad direction and chose **Applied Algorithmic Romance &
Profile Optimization**. This gave the course a specific technical problem:
build a fictional profile, evaluate it and explain what the evaluation cannot
establish. The agent recorded the new direction and failing requirements before
replacing the earlier working course. The change involved its assessments,
models and examples as well as its title
([72b7d1f](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/72b7d1f),
[fd89196](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/fd89196)).

The design centres on cumulative work: each week should produce something
needed later. The agent's course-design review considered the practical
progression in [How to Make (Almost) Anything](https://fab.cba.mit.edu/classes/863.25/)
and [CMU's assessment-alignment guidance](https://www.cmu.edu/teaching/assessment/basics/alignment.html).
In this course, the photo stays fixed during the bio experiment, and the
evaluated candidate carries into the release and maintenance tasks. When I
supplied a revised twelve-week sequence, the exam also needed revision because
its stable-matching topic was no longer taught. `CLAUDE.md` now requires actual
reuse of earlier artefacts, while literal tests protect the sequence,
preparation dates and assessment weights
([264b89d](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/264b89d)).

My correction, “There should not have tutorial at week 1,” exposed another
assumption. The timetable was generated from tutorials, so deleting that
tutorial alone would also hide the first teaching week. The repair generated
the timetable from lectures with optional tutorials. A new contract protects
twelve lectures, eleven tutorials and the absence of stale links
([9276d5b](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/9276d5b)).
Expanding the teaching packs later exposed a related pacing problem: their
three-hour routes did not describe the scheduled one-hour lectures. The
corrected harness separates the complete resource from timed lecture selections,
90-minute tutorials and independent work. Allocation tests check those totals
and actual slide references
([448f876](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/448f876)).

Usability needed equally concrete direction. I supplied
[COMP4130](https://comp.anu.edu.au/courses/comp4130/) as the navigation reference
and requested clearer typography. The result uses familiar course sections and
Public Sans. Browser review found that menu links could report themselves
visible while their expanding wrapper still clipped them. The audit now waits
for the list to fit; that lesson also entered the harness
([4020c2e](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/4020c2e)).

I then worked through the tutorials with the agent, adding application quizzes.
Their contract requires a response to every case and explicit submission before
revealing answers. Incorrect attempts count, and retries preserve the opportunity
to practise. The agent tested missing answers, Enter submission, failed solution
requests and phone layouts. Removing the completion guard deliberately made a
test fail before restoration. The same component now serves all eleven tutorials
([768e67a](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/768e67a),
[05530fa](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/05530fa)).

These checks protect specific promises. The harness leaves humour, clarity of
explanations and the educational value of a dependency to human judgement;
matching titles or passing arithmetic cannot establish those qualities. The
development record contains 168 passing tests and browser checks of 52 pages,
but these are local results. Public deployment still needs verification.
Codex assisted with implementation, testing and drafting this account from the
recorded directions and commit history.
