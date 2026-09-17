# Slop University staff alignment

University sources checked on 17 September 2026:

- [Staff directory](https://slop.university/people/).
- [Casimir Beng](https://slop.university/people/casimir-beng/): Associate Professor
  and Lead, Adaptive Metrics Lab, School of Continuous Improvement. His research
  concerns measurement systems and how their measurements affect improvement.
- [Joost Nwosu](https://slop.university/people/joost-nwosu/): Postdoctoral Fellow,
  School of Continuous Improvement. His research follows performance targets
  after they are met and the institutional expectations they leave behind.
- [School of Continuous Improvement](https://slop.university/schools/continuous-improvement/)
  and the [university's schools](https://slop.university/schools/).
- [About the University](https://slop.university/about/) and the university sitemap.

The course now assigns Beng as convenor and Nwosu as tutor. These course duties,
consultation times and Systems Lab 2 remain authored teaching arrangements;
the directory supplies the identities, academic titles and school affiliations.
Their local profiles link to the university profiles and paraphrase the relevant
research interests. The invented Department of Computational Courtship and the
Mira Chen/Eli Brooks identities have been removed from the submitted site.
All twelve lecture teacher references, eleven tutorial references, three
assessment contacts, Help and Policies now use the new staff.

## Dates

The student clarified: “Align university information and any published dates;
keep the course schedule.” The university pages checked do not supply a teaching
calendar, and the sitemap contains no academic-calendar route. The two staff
profiles display a research indicator of “Active since 2026”; this is not a
semester start date. No university historical dates are asserted in the course
profiles, and no current research-output counts are copied into them.

Semester 1, 2027 therefore remains 22 February–28 May, with the existing weekly
meetings, teaching break, assessment deadlines and fictional exercise dates.
The university's 2026 publication dates do not override this course's schedule.
CLAUDE.md records the distinction and the requirement to use the published staff
directory for subsequent edits.

## Verification

`pnpm check` passes: zero type diagnostics, 55 built pages, clean generated
links/accessibility/deck checks, and 186 tests across 32 files.
`pnpm check:evidence` passes with all eleven cited commits resolving.

A focused Chromium audit checked 32 affected pages at 1920×1080 and 390×844
(64 page views): staff cards and profiles, Help, Policies, all lectures,
tutorials and assessments, and the timetable. It found no axe WCAG A/AA
violations, horizontal overflow or browser errors. Profile source links accept
keyboard focus, all teacher references resolve to the correct staff member,
and built HTML, JSON and text contain none of the retired identities or
department. The API still reports the original 2027 teaching period.

Visual review covered the People page at both sizes and Beng's phone profile.
The temporary audit report and screenshots are in `/tmp/comp4020-staff-audit/`.
These are local checks; no public deployment was performed.
