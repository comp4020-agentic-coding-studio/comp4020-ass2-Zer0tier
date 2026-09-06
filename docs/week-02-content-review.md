# Week 2 content review

## Sufficiency

Before this change, Week 2 had short lecture notes and a 90-minute tutorial,
with no slide deck. That did not support the requested three-hour route or
more than 30 pages. It now has 46 slides and a 180-minute facilitation plan,
including a 10-minute break. The lecture notes allocate time to explanation,
source reading, calculations, implementation, discussion and debriefs. This
is a teaching estimate, not a duration inferred from slide count.

The pack can be split across lecture, tutorial and guided study. The existing
dates and 90-minute tutorial remain intact, and students carry their work
forward instead of repeating the exercises. Optional sensitivity tasks add
15–25 minutes for a group that finishes early.

## Added material

- Three original visual explanations: the recommendation pipeline, illustrated
  fictional candidate cards, and an exposure feedback loop.
- Six labelled bar charts: toy Elo expectations, exposure counts, like rates,
  proportional allocation, census populations, and denominator sensitivity.
- Exercises with separate worked answers for the boundary, platform claims,
  Elo state updates, allocation, census validation and unsupported inference.
- A downloadable synthetic exposure CSV and executable workbook importing the
  same model as the toolkit. It reproduces the arithmetic and validates inputs.
- Updated lecture notes and tutorial references, including a scoped primary
  source table and a three-question exit check.

All figures are code-native HTML/CSS/SVG with readable text. Candidate images
are schematic silhouettes; they do not depict real people. Numerical data and
probabilities are explicitly synthetic. Bars use stated zero-based scales and
display the values, units and denominators in text.

## Coherence review

| Connection | Concrete use |
| --- | --- |
| Week 1 → Week 2 | Alex's exact time, budget, interests, transport and aim remain fixed. Students extend the input/observation/hidden-state distinction into a five-stage recommendation trace. |
| Week 2 topic | Architecture, public disclosures, toy Elo, exposure allocation and denominator auditing form one platform audit. |
| Key concept | The feedback example demonstrates a preserved seed advantage under proportional exposure, rather than claiming every loop widens relative inequality. |
| Week 2 → Week 3 | The platform audit carries sources, assumptions and unknowns into the photo asset manifest's provenance and identity checks. |
| Assessment preparation | The census defines active, available and reciprocally eligible populations; the trace and rate interpretation prepare the report and exam. |

The pack distinguishes simulated Elo from proprietary implementations,
eligibility from mutual attraction, rates from causal effects, and model
expectations from real-world probabilities. It introduces the measurement
problem for Week 4 without replacing that week's bio experiment lesson.
SLOP1276, assessment weights and teaching dates remain unchanged.

Primary pages were opened and checked on 6 September 2026: the
[Tinder matching explainer](https://www.tinderpressroom.com/powering-tinder-r-the-method-behind-our-matching),
[Hinge Most Compatible documentation](https://help.hinge.co/hc/en-us/articles/360011233073-What-is-Most-Compatible),
and [Bumble Discover documentation](https://support.bumble.com/hc/en-us/articles/28423668110621-Using-the-Discover-tab).
The notes retain their scope and updated dates, and ask the instructor to
recheck the pages before teaching in 2027.

## Implementation and checks

The shared deck controller now returns to the lecture with the matching week
slug, preserving the deployment base. The old Week 1-only Escape destination
would have returned Week 2 students to the wrong lecture. Screenshot filenames
now include the deck slug so one deck cannot overwrite another's evidence.

The first browser pass found a pipeline that exceeded 375×667 by 13 pixels
and an expectation chart that exceeded 844×390 by 6 pixels. Local diagram
spacing was tightened; text sizes were preserved. The full site pass also
found undersized source links and inaccessible horizontal table scrolling in
the new notes. Table links now meet the measured target minimum, and overflowing
table wrappers become labelled keyboard stops with a visible focus outline.
Resize observation removes the extra stops when the tables fit.

The downloadable workbook's oracle was challenged in a temporary copy: changing
one synthetic count from 20 to 21 likes caused an assertion failure. Restoring
the fixture passed. No tracked source or baseline dataset was changed by this
probe.

Final validation passed: `pnpm check` (typecheck, build, internal links and
29 tests), plus `pnpm check:browser` over 42 pages at 1920×1080 and 390×844.
Both decks passed navigation and all-slide geometry checks at 1920×1080,
390×844, 375×667, 844×390 and 1024×768. The browser audit also verifies that
the Week 2 notes' wide table receives focus and scrolls with ArrowRight.
There were no accessibility findings or browser JavaScript errors.

An additional visual pass inspected all nine Week 2 diagram/chart slides with
axe at desktop and phone sizes, with no violations, and captured screenshots
for visual review. That pass also measured every Week 2 slide at the five
sizes. Local evidence is in `/tmp/partner-audit/` and `/tmp/week02-visual-*.png`;
`/tmp/week02-visual-report.json` is empty after the layout fixes.
