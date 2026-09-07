import type { TutorialQuiz } from '../../lib/tutorial-quiz';

export const dateAuditQuiz: TutorialQuiz = {
  id: 'date-audit',
  title: 'The simulator has booked a second date',
  intro: 'Six debugging tickets. Nobody told the simulator it cannot make plans.',
  context: 'All matrices, bills and observations are fictional teaching inputs. Cases 1–4 share a new matrix, with a different starting state specified in Case 4. C means conversation continues; A is the supplied “awkward silence” label; N and E freeze the first model endpoint: next date agreed or meeting ended. Steps are not minutes. Cases 5–6 use separate observation records, not simulated outcomes.',
  questions: [
    {
      id: 'orientation', type: 'choice', title: 'The columns apply for a promotion', skill: 'Check matrix orientation and conservation',
      scenario: 'A teammate stores source states in rows and destinations in columns, but uses next[j] = sum_i current[i] × P[j,i]. Starting at C, their first update returns (0.375, 0.25, 0, 0). They suggest dividing by its sum to hide the missing mass.',
      evidence: {
        caption: 'New authored matrix · C/A/N/E order on both axes',
        columns: ['From / to', 'C', 'A', 'N', 'E'],
        rows: [['C', '0.375', '0.25', '0.25', '0.125'], ['A', '0.25', '0.25', '0.125', '0.375'], ['N', '0', '0', '1', '0'], ['E', '0', '0', '0', '1']],
      },
      prompt: 'Which repair preserves the supplied model?',
      options: [
        { id: 'normalise', text: 'Normalise the returned vector. Any result summing to one represents the same transition rule.' },
        { id: 'row-update', text: 'Use P[i,j] with the row vector and a fresh output vector. Check the one-step result against the C row; keep N and E absorbing.' },
        { id: 'columns', text: 'Divide every column by its sum, then keep the transposed update.' },
        { id: 'revive', text: 'Add N→C and E→C transitions so missing mass can return on the next update.' },
      ],
    },
    {
      id: 'sampler', type: 'choice', title: 'The random draw sits on the fence', skill: 'Apply half-open categorical intervals',
      scenario: 'Use the new C row (0.375, 0.25, 0.25, 0.125). One path has draw u = 0.625 at C. On its next step, sample the selected state with u = 0. A teammate changes the sampler from < to <= because “boundaries should count”.',
      illustration: {
        src: '/data/quizzes/date-sampling-intervals.svg', width: 640, height: 420,
        alt: 'Half-open intervals for the new C row: C from 0 inclusive to 0.375 exclusive; A from 0.375 inclusive to 0.625 exclusive; N from 0.625 inclusive to 0.875 exclusive; E from 0.875 inclusive to 1 exclusive.',
        caption: 'Input intervals for one C transition. A left endpoint belongs to its interval; a right endpoint does not.',
      },
      tool: 'Scan destinations in C/A/N/E order, accumulating probability. Select the first destination for which u is strictly less than the cumulative total. N has row (0, 0, 1, 0); E has row (0, 0, 0, 1).',
      prompt: 'Which two-step trace and boundary rule are correct?',
      options: [
        { id: 'left-cell', text: 'C→A→C: u = 0.625 belongs to A’s right endpoint.' },
        { id: 'zero-cell', text: 'C→N→C: a zero draw can select the first destination even when it has zero mass.' },
        { id: 'reject-edge', text: 'Reject u = 0.625 and redraw because cumulative boundaries are invalid inputs.' },
        { id: 'half-open', text: 'C→N→N: keep the strict comparison, include left endpoints and skip zero-mass destinations.' },
      ],
    },
    {
      id: 'endpoint', type: 'number', title: 'The endpoint forgets everyone already there', skill: 'Sum all two-step paths into an absorbing state',
      scenario: 'Start a fresh distribution at C and use the same new matrix. A draft report counts only paths entering N for the first time on step two, dropping paths that reached N on step one. You need the unconditional probability of being in N after exactly two updates.',
      evidence: {
        caption: 'Same authored matrix · source rows, destination columns',
        columns: ['From / to', 'C', 'A', 'N', 'E'],
        rows: [['C', '0.375', '0.25', '0.25', '0.125'], ['A', '0.25', '0.25', '0.125', '0.375'], ['N', '0', '0', '1', '0'], ['E', '0', '0', '0', '1']],
      },
      tool: 'Partition by the intermediate state: C→C→N, C→A→N, C→N→N and C→E→N. Multiply along each path and add. Keep all initial paths in the denominator, including those still in C or A.',
      prompt: 'What is the probability of being in N after two steps, as a percentage? Enter the number only, without a % sign.',
      inputLabel: 'Two-step N probability (%)',
    },
    {
      id: 'simulation', type: 'choice', title: 'More paths demand a better mark', skill: 'Compare reproducible counts with an exact oracle',
      scenario: 'This separate run resets every path to A, using the same matrix for two steps. Its exact N probability is 0.21875. Both runs restart the workbook’s unsigned LCG at seed 202710, consuming two draws per path even after absorption. The teammate claims doubling paths must reduce every cell’s error.',
      evidence: {
        caption: 'Reproducible synthetic counts · C/A/N/E order',
        columns: ['Paths', 'C / A / N / E counts'],
        rows: [['800', '120 / 97 / 177 / 406'], ['1,600', '243 / 208 / 345 / 804']],
      },
      tool: 'Estimate N as its count divided by all paths. Absolute error in percentage points is 100 × |estimate − 0.21875|. A calculator is welcome.',
      prompt: 'Which interpretation matches both the arithmetic and the draw contract?',
      options: [
        { id: 'guaranteed', text: 'Every cell must improve; any larger error proves the sampler is broken.' },
        { id: 'independent', text: 'Treat these as independent replications because the path counts differ.' },
        { id: 'prefix', text: 'N’s error grows from 0.25 to 0.3125 percentage points. The 800 paths are a prefix of the 1,600; neither run supplies observations of real agreement.' },
        { id: 'zero-error', text: 'Rounding both estimates to 22% makes their exact errors zero and validates the model’s real-world assumptions.' },
      ],
    },
    {
      id: 'bill', type: 'choice', title: 'The café adds a line item to the agreement', skill: 'Review changed costs without blocking departure',
      scenario: 'A separate confirmed split-drinks plan, quiz-date-v2, specifies two $8 drinks and $2 of Alex’s bus travel. Counterpart transport is unknown. Both arrivals are recorded at 17:20. After two waits, an ask-bill event names quiz-date-v2 but reports an $18 café bill. Alex wants to leave before any revised terms are agreed.',
      prompt: 'What should the bill check and meeting record do?',
      options: [
        { id: 'review-bill', text: 'Compare $18 with the agreed $16 drink total and enter review. Changed terms need separate renewed agreement; Alex can leave while the bill remains in review.' },
        { id: 'outing-total', text: 'Compare the café bill with Alex’s $10 outing total, then charge the counterpart the difference.' },
        { id: 'auto-split', text: 'Silently change each drink contribution to $9 because split-drinks already authorises any bill.' },
        { id: 'hold-exit', text: 'Keep Alex’s departure blocked until both actors acknowledge the new amount.' },
      ],
    },
    {
      id: 'observations', type: 'choice', title: 'The absorbing state refuses to hear a withdrawal', skill: 'Export observations without reviving an ended meeting',
      scenario: 'Each independent branch begins with the same confirmed cost version and both arrivals already recorded at 17:20. All listed observations have distinct IDs and chronological times. The simulation team also reports N, but no simulation state is an observation event.',
      evidence: {
        caption: 'Three authored branches · agreements name the responding actor',
        columns: ['Branch', 'Recorded sequence'],
        rows: [
          ['A', 'Alex agrees 17:35; counterpart agrees 17:36, then withdraws 17:37; Alex leaves 17:40.'],
          ['B', 'No next-date response; counterpart leaves 17:40.'],
          ['C', 'Alex agrees 17:35; counterpart leaves 17:40; queued counterpart agreement arrives 17:41.'],
        ],
      },
      prompt: 'Which Week 11 export preserves the observed outcomes and stop boundaries?',
      options: [
        { id: 'absorbing-agreement', text: 'All three are agreed: simulated N is absorbing and therefore supplies a permanent agreement.' },
        { id: 'silence-decline', text: 'All three are declined: an ended meeting or a missing response always means an explicit no.' },
        { id: 'queued-update', text: 'A is declined, B unobserved and C agreed; apply C’s queued response after departure.' },
        { id: 'withdrawal', text: 'All meetings are ended. Next-date status is A declined, B unobserved and C pending; C’s complete ended snapshot stays unchanged.' },
      ],
    },
  ],
};
