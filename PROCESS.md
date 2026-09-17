# Process overview

Finding a niche course topic took me longer than expected. Meeting and dating people
feels difficult today, and, as a computer science student, I was curious about the
algorithms behind dating apps. That led me to Applied Algorithmic Romance & Profile
Optimization. A good university course should give students substantial material each
week, with explanations they can understand and apply. I wanted students to explore how
dating apps work while thinking more carefully about meeting, communicating with and
dating people
([fd89196](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/fd89196)).

I initially used COMP2300 as inspiration because its course page felt interesting and
easy to navigate, asking Codex's Sol model for a rough template. The first attempt
worked, but I found the background plain, the teaching material thin and the topic
insufficiently distinctive
([ddb52ca](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/ddb52ca)).
Specifying dating and algorithms gave the content a clearer purpose. I then worked week
by week, requesting explanations, examples and exercises, while making my prompts
stricter about preserving the agreed colours and weekly topics
([ddfdf0f...765cad9](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/compare/ddfdf0f...765cad9)).

That demand for depth exposed a problem: the expanded packs described three hours of
activity alongside a scheduled one-hour lecture. More material alone did not make a
usable course. I kept the complete packs for exploration and separated out timed lecture
selections, tutorials and independent work. This preserved useful examples while giving
students a manageable route through them. `CLAUDE.md` now requires that distinction. In
`spec/teaching-allocation.test.ts`, checks protect 60-minute lecture selections and,
from Week 2, 90-minute tutorials and 210-minute independent allocations, as well as
valid slide references. The agent recorded those tests failing against the old plans and
passing after the correction, alongside browser review. That supported accepting the
scheduling repair; the allocations remain estimates, not measured student completion
times
([448f876](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/448f876)).

The next decision made my idea of cumulative learning more concrete. The harness already
required later tutorials to use earlier work, but links between weeks could not
demonstrate that use
([264b89d](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/264b89d)).
I chose to connect The Experiment That Lied in Week 4 with Release Day in Week 12
through the student's actual evidence note. This lets a conclusion have consequences
later: students revisit an unsupported claim and repair the release using its source
evidence. `CLAUDE.md` requires the original prediction and received note to survive
revisions, and any repair must invalidate the previous check. Tests reject superficial
repairs and approval based on an outdated check. The agent deliberately bypassed the
readiness condition and observed a test fail, then restored it; browser checks exercised
the handoff and repairs. This supported accepting the evidence handoff and review rules
([e566aad](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/e566aad)).

These decisions changed what I accepted from the agent. A finished page needed a clear
place in the learning sequence, and an interaction needed to help students investigate
an assumption. I deliberately left readability, humour and educational value to human
judgement. A passing test can establish that a note survives the handoff; it cannot
establish that students understand why the apparent winning bio changes. That still
needs reading and learner feedback.

My breakthrough was choosing the course idea and turning twelve topics into a connected
investigation. Alex's continuing story gave each week a question and a discovery leading
into the next
([2b50c37](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/2b50c37)).
The stronger acceptance criterion became whether students could carry their reasoning
forward and explain its limits.

Codex helped edit my notes into this account and verify the commit references.
