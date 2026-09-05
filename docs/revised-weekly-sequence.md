# Revised twelve-week lecture sequence

Agent-maintained factual notes, not the student's PROCESS.md.

The student supplied a complete replacement lecture sequence, from **Introduction
to Algorithmic Romance** to **System Maintenance and Graceful Deprecation**.
This supersedes the four-anchor sequence recorded in [the earlier pivot](algorithmic-romance.md).
The replacement is curriculum work; Public Sans, pink/blue accents, cherry
blossoms, navigation, teaching dates and the 20/30/50 assessment split stay intact.

## Direction and implementation

[264b89d](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Zer0tier/commit/264b89d)
records the revised harness, twelve lectures, twelve tutorials and supporting
pages. Lecture titles match the student's list. Each lecture includes its key
concept, a worked example and preparation; each tutorial names the earlier
artefact it actually consumes. The schemas and generated API plumbing are unchanged.

Simply replacing lecture headings would leave the old exam requiring deferred
acceptance after its teaching week had disappeared. The replacement moves bio
experiments to week 4 and changes the midterm to measurement, experiments,
mutual-selection probability, message trees, Poisson arrivals and response games.
The report still follows its preparation on 19 March; the exam remains 23 April.
The final keeps the 100-entry fictional benchmark but now takes a Markov
conversation comparison, threat model, offline plan and maintenance/exit manual.
Linked notebook artefacts avoid turning the revision into six additional essays.

The new profile lifecycle is connected by decisions, not just links: hold the
photo fixed for the bio test; carry the feasible invitation into the message
tree; preserve its stop state in asynchronous communication; apply the threat
boundaries to offline handover; evaluate the frozen candidate before revising;
reproduce that release during maintenance.

Old topic-specific tutorial files were replaced with matching URLs. Their
contents remain recoverable from the preceding commits; the twelve lecture
URLs remain stable. Homepage chapters, readings, policies, assessment preparation
and toolkit references were updated together. The slides skill informed a
nine-slide introduction: thesis, observation versus inference, semester map,
“No Feelings,” Romantic Turing Test, acquisition ethics, assessment and tutorial
handover. Existing deck controls and visual tokens were reused.

## Judgement and source boundaries

The student's technical deadpan is retained, but invented statistics are labelled
as fixtures. “No Feelings” is a restriction on unsupported data labels, not on
people having emotions. “Forcing a response” is examined as a broken objective;
refusal remains terminal. The Romantic Turing Test is a fictional-profile
consistency exercise, not impersonation. These choices are explicit in CLAUDE.md.

Primary sources were checked during the revision:

- [Tinder's matching explainer](https://www.tinderpressroom.com/powering-tinder-r-the-method-behind-our-matching), [Hinge's Most Compatible page](https://help.hinge.co/hc/en-us/articles/360011233073-What-is-Most-Compatible) and [Bumble's Discover guide](https://support.bumble.com/hc/en-us/articles/28423668110621-Using-the-Discover-tab): platform disclosures do not establish the requested hidden Elo formula or numeric swipe penalty. Week 2 keeps Elo as a toy model.
- [NIST two proportions](https://itl.nist.gov/div898/handbook/prc/section3/prc33.htm) and [SciPy Poisson](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.poisson.html): methods, not evidence for a bio effect or optimal texting delay.
- [FTC romance-scam guidance](https://consumer.ftc.gov/articles/what-know-about-romance-scams), [eSafety online dating](https://www.esafety.gov.au/key-topics/staying-safe/online-dating) and [scikit-learn leakage guidance](https://scikit-learn.org/stable/common_pitfalls.html#data-leakage): bounded readings for threats, offline planning and frozen evaluation.

## Verification and limits

The previous build passed 22 tests. Before replacing content, the new literal
title and artefact expectations failed against that working older sequence.
The final `pnpm check` passes 26 tests and builds 42 pages, with no type
diagnostics, internal-link failures or build accessibility findings.

Three temporary model mutations changed the Poisson exponent sign, the first
Markov row and the absorbing ended state. All three new calculation tests failed;
restoring the model returned all nine quantitative tests to green. The built
download was imported separately: two-step probabilities are 0.31/0.16/0.32/0.21,
the zero-arrival probability is approximately 0.4493, and the unchanged perfect
feature vector still scores 100.

The browser audit passes all 42 pages at 1920×1080 and 390×844 with zero recorded
axe, overflow, measured-target or JavaScript findings. Navigation, no-JS content,
filtering, search, calculator recovery, resizing, cold-cache loading and all nine
phone slides pass. Desktop lecture 10, phone lecture 3 and the phone opening
slide were visually inspected. These are local Chromium checks, not evidence
of a public deployment. Tests protect promises and arithmetic, not the quality
of humour, realism of assumed probabilities or coherence by themselves.

[Desktop lecture](screenshots/revised-lecture-desktop.png) ·
[Phone lecture](screenshots/revised-lecture-phone.png) ·
[Phone opening slide](screenshots/revised-intro-deck-phone.png)

`pnpm check:evidence` still fails only on the unchanged PROCESS.md template and
its example commit hashes. The student's personal narrative has not been written
for them. Nothing was pushed or deployed during this revision.
