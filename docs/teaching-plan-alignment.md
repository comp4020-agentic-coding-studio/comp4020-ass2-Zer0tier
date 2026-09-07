# Teaching plans aligned with the timetable

The timetable provides a 60-minute Monday lecture and, in weeks 2–12, a
90-minute Thursday tutorial. The expanded teaching packs previously mixed
180-minute facilitation routes with those meetings; weeks 4–7 even suggested
80 minutes of explanation plus a ten-minute break before the practical work.

Every lecture now opens its teaching plan with a timed, numbered slide
selection ending at minute 60. Week 1 uses its complete 16-slide introduction
and retains its lecture-only status with no separate deliverable. Weeks 2–12
name the existing tutorial's four practical blocks and allocate about 210
minutes of independent work: 30 minutes of preparation, 90 minutes before
Thursday and 90 minutes of consolidation or assessment work. This makes the
FAQ's existing six-hour estimate explicit, rather than increasing it.

The independent tasks identify remaining examples, workbook preparation and
the artefact or assessment to consolidate. Report and project consolidation
is explicitly before the Friday deadlines. Week 7 revision is before the
Friday midterm; the separately timetabled exam is outside the ordinary
six-hour estimate. These remain planning estimates, not measured completion
times or a promise that every student will finish in exactly six hours.

All 12 decks and 559 slides remain. Only the route guide and break slide in
each expanded deck changed; the teaching examples, figures, prompts and
answers are unchanged. All eleven original 180-minute tables remain under
“Complete teaching pack”, with the break identified as belonging to a full
sitting. Existing route anchors are retained. The tutorial bridges, lecture
index, timetable and FAQ all explain the same allocation. The full route
reuses the week's material and adds no meeting or extra required three hours.

Verification:

- Three new allocation tests failed against the previous content, then passed.
  They check contiguous lecture timings ending at 60, valid slide references
  excluding the break, unchanged deck counts, 90-minute tutorial totals,
  210-minute independent allocations and complete 180-minute resource routes.
- `pnpm check`: 107 tests in 19 files passed, with no Astro diagnostics,
  broken internal links or build accessibility violations; 52 pages built.
- `pnpm check:browser`: all 52 pages passed at 1920×1080 and 390×844;
  all 559 slides passed at five viewport sizes. Navigation, search, keyboard
  controls and the existing course interactions passed.
- Focused browser review covered weeks 1, 4, 7, 11 and 12 at both marking
  widths, including the lecture/tutorial return links and the new deck-guide
  link. Axe passed. Screenshots are in `/tmp/teaching-plan-audit/`; the Week 4
  desktop and phone plans and the phone deck guide were visually inspected.
- `pnpm check:evidence` still fails on the pre-existing student-authored
  `PROCESS.md` template comment and nonexistent placeholder citations
  `a1b2c3d` and `e4f5a6b`. That file was not changed by this task.

The earlier week-by-week content-review notes describe the original pack
expansions. This allocation record supersedes their pacing descriptions.
