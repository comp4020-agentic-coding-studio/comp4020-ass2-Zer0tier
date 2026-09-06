# Fullscreen lecture slides

The week 1 deck has sixteen slides. Its shared theme fills the browser
viewport with slide content alone. There is no navigation bar, fullscreen
button, page counter, progress bar or first-visit hint, and no reserved footer
space. The lecture page explains the navigation before the slides are opened.

Following the content review, the deck now states three learning outcomes,
introduces Alex using the toolkit's fixed case, and works through two invented
invitations against time and budget constraints. Separate question and answer
slides classify an input, a recorded reply and an inference about hidden state.
The Romantic Turing Test now asks for case evidence and includes a debrief.
The lecture notes contain the same facts, assumptions and worked answers.

The opening claim is explicitly a provocation to test. The supplied $20 budget
and Friday 5–7 pm availability stay fixed; $12 outing costs and proposed times
are labelled exercise assumptions. The HTTP 200 explanation was checked against
[RFC 9110, section 15.3.1](https://www.rfc-editor.org/rfc/rfc9110.html#section-15.3.1).

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
lecture from both normal navigation and direct slide links. It checks all sixteen
slides at 1920×1080, 390×844, 375×667, 844×390 and 1024×768. This check is also
included in `pnpm check:browser` and discovers each built deck.

Validation passed: `pnpm check` (28 tests) and the complete browser audit of
41 pages at both marking viewports, plus all sixteen slides at five screen sizes.
There were no accessibility findings or browser JavaScript errors.
