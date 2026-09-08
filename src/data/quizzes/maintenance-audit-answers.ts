import type { AnswerKey } from '../../lib/tutorial-quiz';

export const maintenanceAuditAnswers: AnswerKey = {
  acknowledgements: {
    answer: 'distinct',
    explanation: 'The five versions are 1, 1, 1, 1, 2. Proposal creation supplies zero acceptances. M’s exact duplicate changes neither the state nor its event history; after N there are still only two distinct acknowledgements. O supplies the third and adopts v2. A new event ID from an already accepting actor would be rejected, rather than supplying another person’s response. The later base-v1 proposal is stale: reject it and inspect the current terms before any separately reviewed new request. Silently rebasing would invent review of v2. These local records do not prove anyone’s continuing agreement.',
  },
  expiry: {
    answer: 'half-open',
    explanation: 'Tick 27 is inside [20, 28), so the second distinct acceptance adopts v2. Tick 28 is outside: archive the proposal as expired, keep current version 1, clear the pending proposal and stay in review. The stored acceptance list contains only U. The late event is retained as the event that triggered expiry, not counted as adoption or recoded as refusal. A clock at 28 also expires without adoption. Neither timeout supplies permission to keep asking or automatically imposes an old routine.',
  },
  copies: {
    answer: 5,
    explanation: 'At day 21, raw traces reach expiry and contribute three own copies; scratch notes contribute two. Thus 3 + 2 = 5 own copies enter the planned removal action, across two records. The two source copies instead require release-dependency review at this exact boundary. The review folder remains within its stated purpose until day 22, and the other owner’s two copies remain outside control. The planner deletes zero files and sends zero requests: a plan is not evidence of completed removal, remote erasure or secure storage sanitisation. These invented days are not a real retention policy.',
  },
  ending: {
    answer: 'terminal',
    explanation: 'One participant can end without a current base version or a second acknowledgement. K’s ending retains last adopted v2 and archives the partially accepted proposal as cancelled-by-ending. The queued acceptance, clock and attempted v1 restoration all return the complete ended snapshot unchanged, including terms, history, events and ending actor. Checking only phase would miss a hidden rewrite. The borrowed game remains an unresolved practical task under a separately acceptable method; it cannot require continued agreement, renewed persuasion or an in-person meeting. Software restoration has no operation that restores permission.',
  },
  restore: {
    answer: 'snapshot',
    explanation: 'Changed: evaluation.json. Missing: manifest.json and README.txt. Extra: draft.txt. Matching HTML alone does not satisfy the declared four-file comparison. Validate the archive against the retained baseline, then restore the complete snapshot so the extra file is absent. Copying over the working folder leaves draft.txt; recalculating the baseline from the fault merely changes the expected answer. The restored reference keeps primary 93.75/rank 2, sensitivity 90/rank 2 and its separate changed-availability failure. Inspect the actual candidate text, evaluation link, keyboard focus and both marking widths as separate evidence. Neither byte identity nor a release label reopens an ended agreement.',
  },
  handover: {
    answer: 'scoped-evidence',
    explanation: 'A course link describes an artefact requirement; it does not locate the student’s actual file. Each handover row needs its local path, version, actual check result and concrete later use. The recorded build supports same-host clean-directory reproduction of the declared outputs, not independent-machine replication. Browser claims need recorded actions and results on the actual release at 1920×1080 and 390×844, including keyboard, visible text and resize checks. Keep absent feedback or revision evidence visible as a gap and use the course support route; neither the reference workbook nor a generated summary supplies a tutor comment or a completed defence.',
  },
};
