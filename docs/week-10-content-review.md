# Week 10 content review

## Sufficiency and pacing

Week 10 previously contained the four-state matrix, the original two-step
answer, a short metaphor critique and four tutorial tasks. It now has 50 slides,
16 figure slides, expanded worked notes and a 180-minute route: state/matrix
definition (30), exact propagation and absorption (35), break (10), seeded
simulation (35), sensitivity and assumptions (35), and bill/evidence review
(35). The tutorial retains its 20/30/20/20-minute allocation. Completed lecture
calculations can be discussed rather than repeated.

Exercises include a row-sum repair, a transposition error, all two-step path
contributions, a denominator audit, first-step absorption equations, categorical
boundary draws, non-monotonic sampling errors, one-row sensitivity, a history
counterexample and a changed/unknown bill. Each has a debrief. The route is a
facilitation estimate, not a duration guarantee inferred from slide count.
Optional extensions add 15–20 minutes without adding assessment requirements.
Solo implementation and review remain accepted.

## Visuals and reproducibility

Fourteen native DateFigure variants show the earlier handoff, state definitions,
matrix axes, path products, transient/absorbed mass, categorical intervals,
counts, errors, sensitivity, collapsed histories, repeated waits, cost object,
acknowledgement trace and observation labels. Two existing DeckBars figures
show one- and two-step probabilities with a common 0–1 scale. All values have
visible labels; no colour, hover or animation carries unique information.

The slides and UI/UX skills informed the teaching route and figure treatment.
A first chart search returned radar guidance, which did not fit the exact
category comparison. A narrower search returned bars with direct labels. The
existing bar component was reused; tables retain exact counts and small errors.
C/A/N/E order takes precedence over a generic recommendation to sort bars by
value. The existing course palette, Public Sans and institutional tokens remain.

The offline workbook adds three files and uses eight unchanged dependencies.
It actually constructs the Week 7 conversation, replays Week 8's authored
review/clearance branch, confirms Week 9's proposal through its real reducer,
and calls handoverForDate. The clearance is an assumed reviewer decision, not
identity proof. Earlier candidate, recipient evidence and invitation references
remain attached. Week 5's feasibility function remains a transitive dependency.

The meeting starts awaiting-arrival and requires a separate authored event
recording both arrivals at 17:20 on 7 May. This continues the existing fictional
Friday proposal; it does not report an actual date. The program uses the actual
cost object for the bill discussion, not a duplicated total or a bare confirmed
flag. The numerical model also cross-checks the existing generated
dateTransitions reference. No earlier fixture or reference implementation was
edited to manufacture agreement with the new workbook.

## Literal numerical checks

- Baseline source rows remain C=(.50,.20,.20,.10), A=(.30,.30,.10,.30),
  N=(0,0,1,0), E=(0,0,0,1). Initial C gives one-step (.50,.20,.20,.10) and
  two-step (.31,.16,.32,.21). Initial A gives (.24,.15,.19,.42) after two.
- Two-step N includes .10 from C→C→N, .02 from C→A→N and .20 from C→N→N.
  Transient mass is .47. N among endpoints is .32/.53≈.603774, distinct from
  the unconditional .32. The horizon and denominator are explicit.
- The transient submatrix has row sums .70 and .60, giving a .70^k bound
  on remaining transient. Eventual N from C/A is 16/29 and 11/29; eventual E
  is 13/29 and 18/29. Expected absorption steps are 90/29 and 80/29. A closed
  C/A class is rejected by this bounded nonsingular solver.
- The sampler uses half-open cumulative intervals, u in [0,1), and zero-mass
  boundary tests. Input rows allow sum error at most 1e-12; a final numerical
  remainder goes to the last positive cell. N/E rows must be exactly absorbing.
- The specified unsigned LCG advances before returning a draw. Seed 402010
  gives first words 154701297, 426061468, 1684044107, 2650537518, 2080321461.
  Each path resets to C and consumes two draws, including after absorption.
- Baseline counts are (310,167,297,226) for 1,000 paths and
  (3108,1606,3182,2104) for 10,000. Absolute errors are
  (0,.007,.023,.016) and (.0008,.0006,.0018,.0004). C's error grows in the
  larger run. N's larger-run error is .18 percentage points.
- Moving .10 from C→N to C→E gives exact (.31,.16,.17,.36) and changed
  10,000-path counts (3108,1606,1711,3575). The two-step N change is −.15,
  explained by −.05 and −.10 on separate paths. Eventual N from C becomes
  9/29; the unchanged transient submatrix preserves expected absorption steps.

An independent Python check used Fraction arithmetic for all two-step products
and integer cross-multiplication for categorical thresholds against a modulo
2^32 random stream. It reproduced the exact vectors and all displayed counts.
The first PRNG words were also checked independently with BigInt arithmetic.
These checks support implementation correctness, not a real-world probability
interpretation or a claim of high-quality randomness.

## Event checks and important boundaries

- A genuine confirmed Week 9 record can initialise awaiting-arrival; draft
  and cancelled records cannot. The inherited exporter also excludes held
  or expired records. The new tests exercise the actual constructors/reducers.
- Cover-both retains Alex's $12 drinks, counterpart's $0 drinks, Alex's $2
  transport and $14 outing total. Counterpart transport is unknown. The bill
  is checked against the $12 drink allocation, not Alex's outing total.
- Two waits do not progress billing. The current-version $12 question gives
  asked, one acknowledgement stays asked, and two distinct actors give
  acknowledged. No money moves and no question is sent by the program.
- A changed $14 bill or a null amount enters review; stale-version and
  repeated-actor acknowledgements fail. This bounded exercise requires a
  separate renewed agreement rather than silently allocating changed costs.
- Leaving is possible before arrival and at every bill status. The complete
  ended snapshot is retained despite later meeting events. Ending the meeting
  preserves an unresolved bill instead of pretending it was settled.
- Next-date labels are unobserved, pending, agreed and declined. Two actor
  agreements are needed; an explicit withdrawal can replace agreed with
  declined while retaining the events. A declined invitation cannot be
  retried. Free text such as “nice time” cannot supply a coded agreement.
- Events check IDs, chronology, actors and current cost versions. Exact JSON
  serialization defines a duplicate, including property order. Conflicting
  IDs fail. Snapshots are constructed local teaching records, not hostile-input
  validators, tamper-proof logs, live subscriptions or identity proofs.

N/E absorb in the probability model because it freezes the first endpoint.
The separate observation workflow can retain a later withdrawal and the end of
the meeting. Treating absorbing N as irrevocable consent would contradict the
lesson and the real event behaviour. No simulation draw supplies an observation.

## Coherence and limits

| Connection | Concrete use |
| --- | --- |
| Weeks 6–8 → Week 10 | Execute the actual earlier classifier, conversation and review functions; retain candidate/invitation evidence and closure boundaries. |
| Week 9 → Week 10 | Consume the confirmed cost version and both confirmations; distinguish agreement from a separately recorded arrival. |
| Week 10 numerical contract | Preserve the literal two-step oracle, compare fixed seeded counts, and change exactly one source row. |
| Week 10 key concept | Resolve repeated waits through an explicit cost question, with a review branch and an independently available exit. |
| Week 10 → Week 11 | Export observation labels and versioned evidence separately from simulation distributions. |
| Final project | Keep the exact/seeded Markov comparison in the existing validation appendix; add no assessment or personal experiment. |

The Markov and constant-transition assumptions omit history and context.
The authored A label does not license an emotion classifier. Topics, silence,
eye-contact duration, disability and cultural difference do not establish
agreement or anomaly scores. Adding states cannot provide missing data.

The ideal sampling model assumes independent paths. The deterministic teaching
generator approximates it; repeatability is not proof of independence. Restarting
the same seed makes the smaller run a prefix of the larger run, and using the
same draws across matrices couples the sensitivity comparison. Neither pair is
an independent replication. The exact scenario difference is not a causal
effect of a tactic on people. Sampling variation is distinct from model error.

Model steps have no minute duration. Week 9's 90-minute itinerary, its
50-minute meeting and Week 11's separate 115-minute time-allocation fixture
remain distinct. The lecture/tutorial dates remain 10/13 May 2027. The final
project stays 50%, due 28 May at 5 pm. All twelve titles and key concepts,
eleven tutorials, assessment weights, fixed Alex facts, schemas and generated
API conventions remain. PROCESS.md remains the student's own account.

## Sources

Primary sources checked on 6 September 2026:

- [MIT: finite-state Markov chains, matrix approach](https://ocw.mit.edu/courses/6-262-discrete-stochastic-processes-spring-2011/2fdbd4633466ba1429e7cc24bce37514_MIT6_262S11_lec07.pdf), slides 3–4 for matrix powers and intermediate-state sums.
- [MIT: absorption probabilities](https://ocw.mit.edu/courses/res-6-012-introduction-to-probability-spring-2018/0b73394616a1df985f43adfe64810bed_vEsUsaK1HBk.pdf), for absorbing boundaries and first-step equations.
- [OSTEP: common concurrency problems](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-bugs.pdf), §32.3 for resource deadlock conditions. The bill exercise is explicitly a limited analogy, not a demonstrated instance of all four conditions.

The assignment brief and assessment/marking environment were rechecked.
MIT PDF text was available, but its screenshot endpoint returned cache misses;
claims use the inspected text and independently derived course arithmetic.
OSTEP text and its conditions page were accessible. No dating probability or
authored cost is attributed to these sources. Readings and toolkit link the
completed pack and identify what students should obtain from each source.

## Verification

`pnpm check` passes 85 tests in sixteen files, with zero type errors, warnings
or hints. The build emits 50 pages and ten structurally valid decks, with no
broken internal links or build accessibility findings. Eleven new tests cover
exact vectors, absorbing states, invalid inputs, categorical boundaries,
literal random words/counts/errors, sensitivity, absorption, inherited handover,
arrival, billing, withdrawal, terminal histories and isolated offline execution.
The eleven downloads run from a new temporary directory; changing the copied
matrix makes the workbook fail its literal assertions.

Two single-match deliberate mutations were caught: transposing the source-row
update failed the literal vector test; making the categorical comparison
non-strict failed the zero-mass boundary test. Each mutation was restored in a
finally block. The restored focused suite passes all eleven tests. An initial
restoration run encountered a sandbox EPERM launching the offline child Node
process; rerunning outside the sandbox passed. Astro's font server and Chromium
also required the existing outside-sandbox execution path.

The targeted Week 10 browser audit passes all 50 slides at 1920×1080, 390×844,
375×667, 844×390 and 1024×768, including A/D, arrows, wheel, direct links and
Esc return. All 16 figure slides pass axe and fit checks at both marking widths.
Visual inspection covered the matrix, path products, error table, bill trace,
observation labels and lecture prose/tables at desktop and phone widths.
Document width equals viewport width at 1920 and 390; browser JavaScript errors
are empty. Retained evidence: [desktop path derivation](screenshots/week-10-paths-desktop.png)
and [phone error comparison](screenshots/week-10-errors-phone.png).

The final `pnpm check:browser` passes all 50 pages at both marking viewports,
with zero findings and browser JavaScript errors. All 459 slides across ten
decks pass five viewport sizes and navigation checks. Menu, search, keyboard,
calculator, no-JS content and cold-cache checks also pass.

`git diff --check` passes. This is a local content change, with no deployment
or student-authored process statement included.
