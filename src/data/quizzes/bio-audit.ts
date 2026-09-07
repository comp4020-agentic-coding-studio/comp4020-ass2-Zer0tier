import type { TutorialQuiz } from '../../lib/tutorial-quiz';

export const bioAuditQuiz: TutorialQuiz = {
  id: 'bio-audit',
  title: 'The bio lab has a premature winner',
  intro: 'Someone has written the victory headline. The experiment has some corrections.',
  context: 'All text fragments and counts are authored teaching fixtures. The numerical cases are separate from the candidate bios and have no real-user outcomes.',
  questions: [
    {
      id: 'budget', type: 'choice', title: 'The counter has two opinions', skill: 'Count the original Unicode code points',
      scenario: 'A test string contains 148 ASCII letters, followed by U+1F680 (one supplementary Unicode code point), followed by one ASCII space. The course ceiling is 150 code points in the original string, including spaces. A teammate uses JavaScript text.length and rejects it.',
      prompt: 'Which budget check follows the course rule?',
      options: [
        { id: 'utf16', text: 'Reject it: 151 UTF-16 code units must mean 151 code points.' },
        { id: 'codepoints', text: 'Accept it at 150 code points, retaining the trailing space in the count.' },
        { id: 'trimmed', text: 'Accept it at 149 code points: remove the trailing space before checking the original.' },
        { id: 'letters-only', text: 'Accept it at 148: only letters spend the course budget.' },
      ],
    },
    {
      id: 'revision', type: 'choice', title: 'The optimiser buys Alex a car', skill: 'Revise with evidence, not inventions',
      scenario: 'Alex likes board games and bad puns, is free Friday 5–7 pm, travels by bus, has $20 total and is open to a relationship. No car or Saturday availability is supplied. All four proposed bios fit the 150-code-point ceiling; a low cliché score cannot resolve their factual differences.',
      prompt: 'Which revision preserves the supplied facts and explicitly allows a pass?',
      options: [
        { id: 'car', text: "Board games Friday 5-7 pm? I'll drive us, $20 total. Bad puns welcome; maybe a relationship. Fine to pass." },
        { id: 'per-person', text: 'Board games Friday 5-7 pm? Bus-friendly, $20 each. Bad puns welcome; maybe a relationship. Fine to pass.' },
        { id: 'supported', text: 'Board games Friday 5-7 pm? Bus-friendly, $20 total. Bad puns welcome; maybe a relationship. Fine to pass.' },
        { id: 'saturday', text: 'Board games Saturday 5-7 pm? Bus-friendly, $20 total. Bad puns welcome; maybe a relationship. Fine to pass.' },
      ],
    },
    {
      id: 'coverage', type: 'number', title: 'The cliché meter reaches 125%', skill: 'Union overlapping token positions',
      scenario: 'The separate pipeline test fragment is “partner-in-crime tonight”. Lowercase and split using maximal [a-z0-9]+ runs. For this case, the exact dictionary contains both “partner in crime” and “in crime”. A teammate adds the lengths of both matches, counting some positions twice.',
      illustration: {
        src: '/data/quizzes/bio-tokens.svg', width: 640, height: 240,
        alt: 'Four tokens in order: position 0 partner, position 1 in, position 2 crime, position 3 tonight. No match positions are marked.',
        caption: 'The tokenizer output is supplied. Find both dictionary matches, then count each covered position once.',
      },
      tool: 'Coverage (%) = 100 × number of distinct covered token positions / total number of tokens.',
      prompt: 'What percentage of token positions is covered? Enter the percentage as a number, without the % sign.',
      inputLabel: 'Covered token positions (%)',
    },
    {
      id: 'exposure', type: 'choice', title: 'The dashboard orders confetti', skill: 'Audit audience weights before pooling',
      scenario: 'A new invented observational table records at most one positive per exposure. Its A/B labels identify unknown wordings, not the revisions above. There is no randomisation log. The manager sees equal total exposures and prepares a causal victory claim for A.',
      evidence: {
        caption: 'Separate synthetic exposure fixture · positives / exposures',
        columns: ['Zone', 'A', 'B'],
        rows: [['North', '36 / 60', '14 / 20'], ['South', '2 / 20', '12 / 60']],
      },
      prompt: 'Which report survives the zone and shared-weight checks?',
      options: [
        { id: 'pooled-cause', text: 'A’s pooled 47.5% beats B’s 32.5%, proving that A’s wording caused more positives.' },
        { id: 'equal-totals', text: 'There are 80 exposures per arm, so their audience mixes must be comparable.' },
        { id: 'attach-bios', text: 'Use these A/B rates as measured outcomes for the candidate bios in case 2.' },
        { id: 'weighted', text: 'B leads in both zones. Shared 50/50 rates are A = 35% and B = 45%; this remains descriptive.' },
      ],
    },
    {
      id: 'uncertainty', type: 'choice', title: 'Six points put on a percent costume', skill: 'Keep units and approximation limits visible',
      scenario: 'A separate sparse fixture has A = 6 positives from 50 observations and B = 9 from 50. The course calculator requires at least ten positives and ten negatives in each arm before using its normal approximation.',
      prompt: 'Which calculation and uncertainty decision are supported?',
      options: [
        { id: 'units', text: 'B is 6 percentage points higher, or 50% relative to A. Withhold the approximation: both positive cells are below ten.' },
        { id: 'relative-six', text: 'B is 6% higher relative to A; 50 observations in each arm satisfy the approximation guard.' },
        { id: 'large-denominator', text: 'B is 6 percentage points higher; use the approximation because each denominator exceeds ten.' },
        { id: 'equivalent', text: 'The approximation is unavailable, so the two wordings have been shown equivalent.' },
      ],
    },
    {
      id: 'protocol', type: 'choice', title: 'The experiment that stops when it wins', skill: 'Pre-register the unit, controls and stopping rule',
      scenario: 'Before generating any outcomes, a team proposes counting every profile reopening as a new trial, treating missing logs as negative responses and adding simulated viewers until bio B wins. Week 3’s frozen photo and fixed case facts are available.',
      prompt: 'Which repair belongs in the protocol before the simulation runs?',
      options: [
        { id: 'repeat-views', text: 'Keep each reopening as a fresh independent viewer, but fix the photo and total view count.' },
        { id: 'prespecified', text: 'Randomly assign each unique simulated viewer once within their zone; freeze input versions, fix the sample cap and window, and repair missing records before analysis.' },
        { id: 'missing-zero', text: 'Fix the sample cap and image, but count every missing log as a completed negative outcome.' },
        { id: 'optional-stop', text: 'Keep unique viewers and complete records, then add more viewers whenever the current result does not favour B.' },
      ],
    },
  ],
};
