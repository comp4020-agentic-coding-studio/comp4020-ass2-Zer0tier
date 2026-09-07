import type { AnswerKey } from '../../lib/tutorial-quiz';

export const bioAuditAnswers: AnswerKey = {
  budget: {
    answer: 'codepoints',
    explanation: '148 letters + 1 supplementary code point + 1 space = 150 code points, so the original string meets the ceiling. JavaScript text.length reports 151 UTF-16 code units because U+1F680 uses two. Counting [...text].length follows this exercise’s rule. Trimming first would count a different string. Passing a length check supplies no evidence that a bio is useful or true.',
  },
  revision: {
    answer: 'supported',
    explanation: 'The supported revision retains Friday 5–7 pm, bus travel, the $20 total, board games, puns and relationship possibility. “Fine to pass” gives explicit exit wording. The alternatives invent a car, change the budget to $20 each or move the meeting to Saturday. A clean dictionary score cannot fix those changes. “Bus-friendly” states a constraint; no actual venue or journey has been verified.',
  },
  coverage: {
    answer: 75,
    explanation: 'The four tokens are partner, in, crime, tonight. The matches cover positions {0, 1, 2} and {1, 2}; their union is {0, 1, 2}. Thus 100 × 3/4 = 75%. Adding match lengths gives 5/4 = 125% by counting in and crime twice. This exact matcher measures dictionary coverage, not the meaning or quality of the fragment. With no tokens, the share would be undefined, not zero.',
  },
  exposure: {
    answer: 'weighted',
    explanation: 'North gives A = 60% and B = 70%; South gives A = 10% and B = 20%. B leads by ten points in each zone, yet pooling gives A = 38/80 = 47.5% and B = 26/80 = 32.5%. A gets 75% of its exposures in North; B gets 25%. Shared 50/50 weights give A = 35% and B = 45%. Standardisation does not recover missing randomisation or link these unknown wordings to our authored bios.',
  },
  uncertainty: {
    answer: 'units',
    explanation: '6/50 = 12% and 9/50 = 18%. B − A is 0.06, or 6 percentage points; relative to A it is 0.06/0.12 = 50%. There are 6 and 9 positives, both below the course guard of ten; the 44 and 41 negatives do not repair that. Report the counts and withhold this normal approximation pending a suitable analysis. No exact test was performed, and withholding a calculation does not establish equivalence or a causal text effect.',
  },
  protocol: {
    answer: 'prespecified',
    explanation: 'Use one assignment per unique simulated viewer, randomised within each zone; repeated views retain that assignment and add no denominator row. Freeze the text versions and the photo bytes, crop, alt text and display treatment. Prespecify the generator, seed, outcome, complete observation window, sample cap, analysis weights and uncertainty plan. Stop for repair when required records are missing. A missing log is not an observed zero; extending the run until B wins changes the stopping rule. No outcomes exist yet.',
  },
};
