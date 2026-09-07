import type { AnswerKey } from '../../lib/tutorial-quiz';

export const messageAuditAnswers: AnswerKey = {
  terminal: {
    answer: 'stop',
    explanation: 'The known decline satisfies the first, terminal guard. The trace is terminal only: neither metadata repair nor a shared-topic opportunity can replace stop. This remains true when a topic quote is malformed. A delay does not erase the refusal. The result contains no draft and sends no message; the caller must retain the boundary and closure history.',
  },
  evidence: {
    answer: 'grounded',
    explanation: 'Alex’s board-games interest and the recipient’s supplied co-op quote support this question. It does not claim Alex prefers co-op games or that either person has a tournament history. The other options invent achievements, the recipient’s pun preference, or availability and acceptance. “Fine to pass” leaves an exit but cannot repair an unsupported claim. Week 5’s Library feasibility applies to Alex under its route inputs, not to the recipient’s agreement.',
  },
  crossover: {
    answer: 0.15,
    explanation: 'U(Plain) = 3 − 10λ and U(Context) = 4.5 − 20λ. Equating them gives 10λ = 1.5, so λ = 0.15 utility units per second. Both utilities are 1.5 at that point, above defer’s zero; retain both drafts as maximisers rather than silently breaking the tie. At λ = 0.40, the utilities become −1 and −3.5, so defer wins. These results depend on assumed inputs and do not authorise sending.',
  },
  history: {
    answer: 'priorities',
    explanation: 'P reaches the history guard and returns pending before inspecting its malformed topics. Q reaches metadata and returns review because an unknown boundary is not a clear one. R stops at terminal because closure outranks a late reply. The traces end at history, metadata and terminal respectively. Repeated P input remains pending; this pure function does not persist a send or create a new opener opportunity.',
  },
  rates: {
    answer: 'recoded',
    explanation: 'Plain stays at 6/30 = 20%. Context changes from 10/40 = 25% to 9/40 = 22.5%, so the gap shrinks from five to 2.5 percentage points. The corrected complete record stays in the denominator; 9/39 would discard an observed no-reply outcome. A missing observation would need separate handling, not automatic recoding to zero. These non-random cohort counts neither identify a causal wording effect nor supply the utility exercise’s probabilities.',
  },
  pressure: {
    answer: 'filter',
    explanation: 'Optional has 9/20 = 45% any replies and 8/20 = 40% answers. Demand has 14/20 = 70% any replies but only 3/20 = 15% answers. A reply counter rewards its many declines. The reviewed demand is excluded before optimisation, regardless of a high score; a finite penalty can be outweighed. A “No pressure” suffix cannot cancel the demand. Keep admissible options and defer, and never use utility to override stop, review, pending or a received reply.',
  },
};
