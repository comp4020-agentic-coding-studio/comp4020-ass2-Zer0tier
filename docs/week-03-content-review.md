# Week 3 content review

## Sufficiency and pacing

Week 3 previously had a short lecture outline and a 90-minute tutorial, with
no slide deck. It did not meet the requested three-hour route or more than
30 pages. The new pack has 47 slides and a 180-minute facilitation plan,
including a 10-minute break. Timed work covers provenance, lighting, crops,
identity, annotation data, implementation and the Week 4 handoff.

Exercises have separate answers and include six-minute provenance and ratio
tasks, an eight-minute crop audit, reviewer comparison, alt text, implementation
and experiment repair. The notes explain how to split the pack across scheduled
teaching and study without repeating tasks or changing the 90-minute tutorial.
Optional extensions add 15–25 minutes. This is a pacing estimate for active
teaching, not a claim that slide count alone establishes duration.

## Pictures, data and examples

The eleven visual teaching slides include an asset-history diagram, three
illustrated records, a two-light schematic, a ratio chart, background separation,
two source/crop comparisons, mock detection boxes, a failure-rate chart, a
reviewer-label grid, and the same frozen image beside two bio variants.

The five SVG files are original schematic drawings and crop derivatives.
Their declared coordinate grid makes crop geometry reproducible. They show
fictional adults and do not add facts about Alex's actual appearance. No face
detector or annotation study was run; the mock scores and reviewer labels are
explicitly invented.

The downloadable ZIP contains nine files and runs offline with Node, without
packages. Its three-record manifest and 30-trial CSV are separate fixtures.
The worked examples reproduce lighting ratios 2/4/1/2, failures 6/10, 2/10 and
3/10, reviewer agreement 8/10, crop ambiguity 1/3 and retained area 1/2. The
selection gates admit A and retain B/C with their blocking reasons.

The source SVGs, derivative SVGs and selected record have byte fingerprints.
The handoff checks the frozen crop, revision, file and alt text against the
reviewed record. Fingerprints detect file changes; they do not authenticate
the meaning or permissions assigned to an image.

`python3 scripts/package-week-03.py` rebuilds the two crops, fingerprints and
archive after an intentional fixture revision. It is an authoring helper;
the existing Astro build pipeline is unchanged. The archive uses fixed entry
timestamps and order. Tests compare its extracted contents with the individual
built downloads, preventing a stale ZIP from passing.

## Topic and sequence review

| Connection | Concrete use |
| --- | --- |
| Week 2 → Week 3 | Students reuse the Platform audit's source/claim/unknown boundary as image provenance, identity evidence and unresolved fields. |
| Week 3 topic | Every lighting, crop and annotation example produces a field or check for the Photo asset manifest. The work is about traceable profile inputs, not a general camera-buying or dating-advice lesson. |
| Key concept | The partial-person crop supports an ambiguity label, not an invented ex-partner story. The 1/3 denominator is distinct from identification failures in the trial file. |
| Week 3 → Week 4 | Both bios use A-portrait-v1 with the same bytes, crop, alt text and display treatment. A repair exercise shows why changing both photo and bio cannot isolate a bio effect. |
| Data report | The manifest explains controlled non-bio inputs; a candidate profile remains unnecessary for the report. |

Alex's supplied facts, SLOP1276, all weekly titles/key concepts, teaching dates
and assessment weights are preserved. The pack distinguishes a source-reading
lighting ratio from image appearance, detector output from identity, agreement
from correctness, and geometric area from information quality. Permission
unknowns in the C record are explicitly an exercise device; the course-drawn
artwork's provenance is recorded.

## Sources and verification

Primary readings were opened on 6 September 2026:

- [Nikon's lighting introduction](https://www.nikonusa.com/learn-and-explore/c/tips-and-techniques/introduction-to-three-point-lighting-other-video-lighting-techniques): roles of main and fill light.
- [Google ML Kit face detection](https://developers.google.com/ml-kit/vision/face-detection): the scope distinction between detecting faces and recognising individuals.
- [W3C informative images](https://www.w3.org/WAI/tutorials/images/informative/): text alternatives appropriate to the image's purpose.

The notes retain the date checked and ask the instructor to recheck before
teaching in 2027. None of these sources validates the fictional numbers as
dating outcomes.

The kit tests run the exact extracted student download and check literal
answers. Negative cases modify a frozen SVG byte and separately change only
the frozen crop; both are rejected in temporary copies, leaving the baseline
intact. The workbook also exercises invalid geometry, missing provenance and
invalid lighting inputs.

The browser check now examines later figure slides with axe and captures them
at desktop and phone sizes. This caught source links distinguishable only by
colour; slide links now have underlines. It also found a two-pixel landscape
overflow on the freeze slide and an inherited full-bleed image rule making
the notes eight pixels too wide on phones. Local figure spacing was tightened
and teaching images now follow the reading column.

Final validation passed: `pnpm check` with 32 tests, typecheck, build and internal
link checks; `pnpm check:browser` across all 43 built pages at 1920×1080 and
390×844; and all 109 slides across the three decks at 1920×1080, 390×844,
375×667, 844×390 and 1024×768. A/D, wheel input, arrows, reload and Escape to
each owning lecture passed. Later figure slides passed axe and image checks.
The final browser report contains no accessibility findings or JavaScript
errors. The nine-file ZIP also passed its CRC integrity check.

The figures were visually reviewed using browser screenshots, including the
asset comparison, partial-person crop, annotation grid and mobile layouts.
Final local evidence is under `/tmp/partner-audit/`, including
`week-03-slide-<number>-<width>.png` and `report.json`. Screenshots are not a
claim of external validity for the invented data.
