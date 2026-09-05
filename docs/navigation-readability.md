# Navigation and readability update

Agent-maintained factual notes, not the student's PROCESS.md.

The student supplied [COMP4130](https://comp.anu.edu.au/courses/comp4130/) as
the reference for top-level sections and requested an easier-to-read font.
Its menu was checked directly: Home, Lectures, Tutorials, Assignments, People,
Readings, Timetable, Help, FAQ, Policies. The instruction concerns the section
structure, not adopting ANU branding or its student services.

## Direction and implementation

[dee73e9](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/dee73e9)
records the direction in CLAUDE.md and adds two navigation assertions. The
existing 19 tests passed first; both new tests failed against the old menu and
missing pages. This checkpoint was committed with unmet tests, contrary to the
harness's “Never commit a red state” rule. That was an agent workflow error;
future red demonstrations should remain local until the implementation passes.

[4020c2e](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/4020c2e)
implements the menu and adds Readings, Help and FAQ pages. Tutorials still use
`/sessions/`, Assignments use `/assessments/`, and Timetable uses `/weeks/`.
The toolkit remains linked from Readings and Tutorials. New support copy points
to the fictional teaching arrangements and existing policies, not a pretend
upload or messaging service. The curriculum, schemas and generated API are unchanged.

The UI/UX skill informed whole-label navigation, responsive wrapping and static
Astro implementation. Its broad decorative-style suggestion did not suit this
reading-heavy site and was not adopted. Public Sans was already bundled, so the
change needs no new font service. Main prose is 18px with 1.65 line height and a
66ch maximum width; headings use the same family. The ten desktop links occupy
their own row; the existing phone menu expands vertically. Pink/blue course
accents and the fixed SlopU marks and palette remain.

## What verification changed

The first font assertion failed because it checked Astro's entire family list,
including an unavailable local Arial fallback. Browser inspection showed the
primary Public Sans face was loaded. The assertion now checks that actual face,
computed prose size, leading and width.

Screenshot review caught menu evidence taken midway through expansion: links
reported visible while the wrapper still clipped them. The audit now waits for
the complete list to fit and checks each link against the wrapper bounds. These
two lessons are encoded in CLAUDE.md; neither is claimed as a curriculum insight.

Final local results: `pnpm check` passes 21 tests and builds 42 pages with no type,
internal-link or build-accessibility findings. `pnpm check:browser` passes all
42 pages at 1920×1080 and 390×844, plus intermediate-width navigation, keyboard
FAQ operation, search, calculator recovery, slow loading and all nine phone
slides. The browser report contains zero findings and JavaScript errors.

[Desktop](screenshots/navigation-home-desktop.png) ·
[Phone](screenshots/navigation-home-phone.png) ·
[Expanded phone menu](screenshots/navigation-menu-phone.png) ·
[Long-form phone reading](screenshots/navigation-lecture-phone.png)

`pnpm check:evidence` still fails on the unchanged student PROCESS.md template
and its two example commit citations. No student narrative was written, and no
push or public deployment was performed during this update.
