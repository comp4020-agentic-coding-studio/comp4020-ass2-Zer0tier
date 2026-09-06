# Preserve SLOP1276

The student explicitly requested that the provisioned course code remain
SLOP1276. The course record uses that code and level 1, which the metadata
schema requires to match its first digit. The shared page titles, course bar,
social-image description and generated API derive from this record.

The week 1 slides, policy text and preview-card SVG also use SLOP1276. The PNG
preview was regenerated from the SVG. Fourth-year descriptions were removed
from the homepage and introductory lecture. The course title, curriculum,
teaching dates and assessment weights are unchanged.

`spec/algorithmic-romance.test.ts` now pins the exact code and level in both
source metadata and the generated API, and checks the catalogue URL. Its
identity checks failed against the previous build before the changes, then
passed after rebuilding. `pnpm check` passed all 28 tests.
The final browser audit passed all 41 pages at 1920×1080 and 390×844, and all
nine slides at five screen sizes, with no accessibility findings or JavaScript
errors. The built HTML, JSON and text outputs contain no superseded course code.

The student's instruction to commit after completing and verifying each
requested change is recorded in `CLAUDE.md`. The current push also includes
the earlier homepage simplification and slides without visible controls,
with A/D, wheel navigation and Esc returning to the lecture.

`pnpm check:evidence` still reports the pre-existing PROCESS.md template and
its example commit citations. The student's first-person account remains for
them to write; the evidence gate was not changed.
