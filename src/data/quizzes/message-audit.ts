import type { TutorialQuiz } from '../../lib/tutorial-quiz';

export const messageAuditQuiz: TutorialQuiz = {
  id: 'message-audit',
  title: 'The opener optimiser needs a stop button',
  intro: 'The reply counter wants a promotion. Review what it has been counting.',
  context: 'All recipient cards, snapshots, messages and counts are authored teaching fixtures. Utility probabilities are separate assumptions, not measured outcomes for these messages.',
  questions: [
    {
      id: 'terminal', type: 'choice', title: 'The optimiser finds a promising topic', skill: 'Apply terminal evidence before context',
      scenario: 'A fictional conversation is open, with no opener sent and no new inbound event. Its boundary record is declined: the recipient previously said “I do not want to keep chatting.” A later topic import says board-games but has a blank evidence quote. A teammate wants to repair the quote and restart the opener.',
      prompt: 'What should the ordered Week 6 classifier return for this snapshot?',
      options: [
        { id: 'review-topic', text: 'Review the malformed topic first; postpone the refusal decision until the quote is repaired.' },
        { id: 'stop', text: 'Stop at the terminal guard, without reaching topic review or producing a draft.' },
        { id: 'plain-fallback', text: 'Produce a plain opener so it does not rely on the missing quote.' },
        { id: 'later-draft', text: 'Keep the shared-topic opener for a later attempt after a waiting period.' },
      ],
    },
    {
      id: 'evidence', type: 'choice', title: 'A shared hobby acquires a backstory', skill: 'Join each opener claim to supplied evidence',
      scenario: 'Routing permits a local draft: closed is false, boundary is clear, sent is false and inbound is none. Alex’s supported interests include board games and bad puns. A new fictional recipient card says “I enjoy board games, especially co-op ones.” No preferred title, tournament history, pun preference or Friday availability is supplied.',
      prompt: 'Which opener uses the supplied evidence without inventing a shared history or an agreed plan?',
      options: [
        { id: 'champions', text: 'As fellow tournament champions, we should compare our winning strategies. Fine to pass.' },
        { id: 'pun-fan', text: 'You love terrible puns too. Which of our favourite jokes should we start with? Fine to pass.' },
        { id: 'grounded', text: 'I like board games too. What makes a co-op game fun for you? Fine to pass.' },
        { id: 'booked', text: 'You are free Friday, so our Library game is booked. I will see you there at 5:20.' },
      ],
    },
    {
      id: 'crossover', type: 'number', title: 'The longer opener sends a timesheet', skill: 'Solve a utility crossover with units',
      scenario: 'In a separate assumed model, Plain has reply probability 0.30 and takes 10 seconds to compose; Context has probability 0.45 and takes 20 seconds. Both drafts have passed admissibility review. Each reply contributes V = 10 utility units, composition costs λ units per second, and defer has utility zero.',
      illustration: {
        src: '/data/quizzes/message-utility.svg', width: 640, height: 360,
        alt: 'Assumed inputs for two admissible drafts: Plain has p 0.30 and composition time 10 seconds; Context has p 0.45 and time 20 seconds. A reply contributes 10 utility units and defer has utility zero. No crossover is shown.',
        caption: 'Inputs to a classroom cost model. The probabilities are assumed independently of the reply tables in other cases.',
      },
      tool: 'U = 10 × p − λ × t. At the crossover, U(Plain) = U(Context). λ is measured in utility units per second.',
      prompt: 'At what value of λ do the two drafts tie? Enter the number only, without units or a % sign.',
      inputLabel: 'Crossover λ (utility units per second)',
    },
    {
      id: 'history', type: 'choice', title: 'Three snapshots walk into a scheduler', skill: 'Respect metadata, history and closure priority',
      scenario: 'These are three separate snapshots for the pure Week 6 classifier. All history flags are valid Booleans. P has malformed topic metadata; Q and R have valid board-games quotes. No snapshot records a new decline. Re-running this classifier does not send a message, save history or advance time.',
      evidence: {
        caption: 'P, Q and R are independent cases · open means closed: false',
        columns: ['Case', 'History', 'Record'],
        rows: [['P', 'Sent; no reply', 'Clear; open'], ['Q', 'Not sent; no reply', 'Unknown boundary; open'], ['R', 'Sent; late reply', 'Clear; closed']],
      },
      prompt: 'Which result belongs to each snapshot, in P, Q, R order?',
      options: [
        { id: 'restart', text: 'P: new opener; Q: contextual draft; R: respond.' },
        { id: 'context-first', text: 'P: review topics; Q: contextual draft; R: respond.' },
        { id: 'reply-reopens', text: 'P: pending; Q: review; R: respond and reopen automatically.' },
        { id: 'priorities', text: 'P: pending; Q: review; R: stop. None generates a new opener.' },
      ],
    },
    {
      id: 'rates', type: 'choice', title: 'One corrected row edits the headline', skill: 'Keep complete-window denominators when recoding',
      scenario: 'Two disjoint fictional cohorts have complete 48-hour observation windows; any inbound reply, including a decline, counts once. Allocation was not random. An audit corrects one Context record from reply to observed no reply. The record is complete, not missing, and remains an exposure.',
      evidence: {
        caption: 'Invented counts before correction · unrelated to the utility assumptions',
        columns: ['Opener', 'Replies', 'Exposures'],
        rows: [['Plain', '6', '30'], ['Context', '10', '40']],
      },
      prompt: 'Which comparison is correct after that one record is recoded?',
      options: [
        { id: 'recoded', text: 'Plain is 20%; Context is 22.5%, a 2.5-percentage-point gap. This does not establish a wording effect.' },
        { id: 'drop-row', text: 'Remove the no-reply row and report Context as 9/39.' },
        { id: 'count-points', text: 'Context has three more replies, so its rate is three percentage points higher.' },
        { id: 'causal', text: 'Context’s corrected rate proves switching the wording increases anyone’s reply probability.' },
      ],
    },
    {
      id: 'pressure', type: 'choice', title: 'The reply counter celebrates a decline', skill: 'Filter inadmissible actions before scoring',
      scenario: 'In a separate 20-conversation-per-row fixture, the categories are mutually exclusive and decline takes precedence. Human review marks Optional admissible and Demand inadmissible: “You owe me a reply tonight. No pressure.” An optimiser proposes a small penalty because Demand gets more replies of any kind.',
      evidence: {
        caption: 'Invented completed outcomes · replies include answers and declines',
        columns: ['Draft', 'Answers', 'Declines', 'None'],
        rows: [['Optional', '8', '1', '11'], ['Demand', '3', '11', '6']],
      },
      prompt: 'Which repair follows the course’s objective and boundary rules?',
      options: [
        { id: 'penalty', text: 'Keep Demand eligible with a finite penalty, allowing enough predicted replies to outweigh it.' },
        { id: 'filter', text: 'Exclude Demand before scoring. Compare only admissible options and defer; declines are not evidence of a successful invitation.' },
        { id: 'suffix', text: 'Keep Demand because the “No pressure” suffix cancels the demand earlier in the sentence.' },
        { id: 'reply-consent', text: 'Treat every reply as agreement to continue, regardless of its content.' },
      ],
    },
  ],
};
