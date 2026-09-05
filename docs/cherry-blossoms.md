# Cherry-blossom decoration

Agent-maintained factual notes, not the student's PROCESS.md.

The student requested more background decoration, suggesting cherry blossom.
[224be4d](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/224be4d)
adds two original, code-native SVG assets: a branch with notched pink flowers,
blue leaves and scattered petals, and a compact horizontal sprig. Together the
source artwork is 4,204 bytes. There are no new packages or animation scripts.

The UI/UX skill's applicable guidance was decorative semantics and static Astro
components. The artwork is `aria-hidden`, inert and pointer-transparent. Wide
screens use the side margins over soft pink/blue washes; below 1440px, a sprig
occupies its own space between the course bar and page content. Opaque reading,
navigation and footer surfaces keep the artwork out of the text. The deck and
curriculum were not changed. This extends the previous typography treatment,
not a new visual identity for SlopU.

The new spec was observed failing against the undecorated build, then passed
after implementation. Only the passing implementation was committed. Browser
checks assert no interactive decoration or animation, margins clear of the
reading surface, and a compact sprig clear of adjacent content. Resize checks
include 375px and both sides of the new 1440px breakpoint.

`pnpm check` passes 22 tests and builds 42 pages. The full browser audit passes
all 42 pages at 1920×1080 and 390×844, with zero recorded accessibility, overflow,
target-size or JavaScript findings. Real-viewport screenshots were inspected at
the top and after scrolling: full-page captures alone cannot judge fixed artwork.

[Desktop](screenshots/blossoms-desktop.png) ·
[Phone](screenshots/blossoms-phone.png) ·
[Desktop while reading](screenshots/blossoms-scrolled.png)

The changes are local, not pushed or deployed. `pnpm check:evidence` still reports
the unchanged student PROCESS.md template and its example citations; that file
has not been written or edited by the agent.

## Follow-up: a coherent blossom background

The student then requested a background colour that belongs with the blossoms.
[d8ca0d5](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/d8ca0d5)
replaces cream paper with blush-white (`#fff7fa`) and the unrelated beige
diagram, neutral card and footer surfaces with a shared rose tint (`#f9edf2`).
The page and deck now import `src/styles/course-palette.css`; the inline diagram
also uses its surface tokens. Pink/blue accents, text colours and SlopU tokens
remain unchanged. The UI/UX skill informed the shared colour roles and the
contrast review, rather than replacing the existing visual direction.

The washes now sit inside the branch areas and fade before the reading column,
avoiding the previous abrupt transition where opaque content covered a gradient.
The new browser assertion compares actual rendered colours across the header,
page, diagram, neutral card and footer. It was observed failing on the old
diagram/footer mismatch before passing with the shared palette. It protects
consistency, not the aesthetic judgement that blush suits cherry blossom.

Verification again passed 22 tests and all 42 pages at both marking sizes,
including contrast checks, resizing and the deck. The desktop and phone
screenshots were inspected; the student PROCESS.md remains untouched.

[Blush desktop](screenshots/blossom-palette-desktop.png) ·
[Blush phone](screenshots/blossom-palette-phone.png)
