# Process overview

Finding a niche course topic took me longer than expected. Meeting and dating people
feels difficult today, and, as a computer science student, I was curious about the
algorithms behind dating apps. That led me to Applied Algorithmic Romance & Profile
Optimization. A good university course should give students substantial material each
week, with explanations they can understand and apply. I wanted students to explore how
dating apps work while thinking more carefully about meeting, communicating with and
dating people.
([fd89196](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/fd89196))

I initially used COMP2300 as inspiration because its course page felt interesting and
easy to navigate, asking Codex's Sol model for a rough template. The first attempt
worked, but I found the background too plain, the teaching material too thin and the
topic insufficiently distinctive
([ddb52ca](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/ddb52ca)).
Giving the agent the clearer dating-and-algorithms direction helped me ask for more
purposeful content. I also refined the presentation through clearer wording, Public Sans
typography and a blossom background with coordinated colours.
([4020c2e](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/4020c2e),
[d8ca0d5](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/d8ca0d5))

I then prompted the agent week by week, from Week 1 through Week 12, asking for
explanations, worked examples and exercises that students could understand and explore
further
([ddfdf0f...765cad9](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/compare/ddfdf0f...765cad9)).
This changed what I accepted: having twelve pages was no longer enough. Each week needed
substance and a place in the course's progression. My prompts became stricter about
preserving decisions I had already made, especially the theme colours and weekly topics.

Those decisions gradually became part of the harness. The inherited `CLAUDE.md`
concentrated on general habits such as reading specifications, checking rendered pages
and verifying changes
([a5a0169](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/a5a0169)).
I added course-specific rules: preserve the agreed visual design, protect all twelve
topics and require later tutorials to use earlier work. In `spec/`, sequence checks
protect the promised milestones and ensure assessment preparation comes before
deadlines. These rules made my idea of a coherent course harder for later edits to undo
([264b89d](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/264b89d)).
My demand for richer content also needed limits: the harness distinguishes complete
teaching packs from scheduled 60-minute lectures, 90-minute tutorials and independent
work. Teaching-allocation tests check those timings and slide references. This
translated “enough content” into a planned workload, while leaving whether the
explanations actually teach well to my review.
([448f876](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/448f876))

That boundary mattered when attempts to improve interaction did not always match what I
imagined. Even with the Romance Debugger, functioning controls could not tell me whether
the experience was engaging
([d4383af](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/d4383af)).
I deliberately left judgements about readability, humour and educational value outside
automated acceptance. The unusual combination of dating and computer science made it
difficult to decide what belonged in each lesson. I needed to read the material and
judge its relevance; AI could suggest content, but passing checks could not settle that
decision.

I also noticed differences between models. In my trials, Claude often made smaller
visual changes than I wanted, while a newer Codex model responded to similar prompts
with more substantial changes that felt closer to my intended aesthetic. This encouraged
me to compare outputs while keeping my own acceptance criteria. My biggest breakthrough
was choosing the course idea and creatively allocating its content across twelve weeks.
Connecting those weeks through Alex's continuing story made the progression more
tangible: each lesson could raise a question that the next helped students investigate.
([2b50c37](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/2b50c37))

Codex helped edit my notes into this account and verify the commit references.
