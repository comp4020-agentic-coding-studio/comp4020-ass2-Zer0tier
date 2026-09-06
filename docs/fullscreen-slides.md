# Fullscreen lecture slides

The existing week 1 deck has nine slides. Its shared theme fills the browser
viewport with slide content alone. There is no navigation bar, fullscreen
button, page counter, progress bar or first-visit hint, and no reserved footer
space. The lecture page explains the navigation before the slides are opened.

`DeckTools.astro` adds A for previous, D for next, and vertical wheel navigation.
One wheel gesture advances one page; a quiet interval allows another turn.
Editable fields, browser zoom and scrollable content keep their normal input
handling. Arrow keys remain available. Esc returns directly to the week 1
lecture, even from an overlay or a slide opened through a direct link. It runs
before the slide library's own Escape handler, which would otherwise open an
overview. Reveal's built-in announcements remain available to screen readers.

`scripts/audit-decks.mjs` checks visible slides rather than just the URL: Reveal
defers URL updates after arrow navigation, so the two can temporarily differ.
Navigation uses the visible slide and explicitly signals an unchanged
destination hash. The check also simulates a normal first visit so automation
cannot hide an unwanted startup hint.

The browser check covers A/D (including uppercase), arrows, wheel bursts and
direction, browser shortcuts, editable input, reload, and Esc returning to the
lecture from both normal navigation and direct slide links. It checks all nine
slides at 1920×1080, 390×844, 375×667, 844×390 and 1024×768. This check is also
included in `pnpm check:browser` and discovers each built deck.

Validation passed: `pnpm check` (28 tests) and the complete browser audit of
41 pages at both marking viewports, plus all nine slides at five screen sizes.
There were no accessibility findings or browser JavaScript errors.
