// Literal authored planning results. Browser geometry, focus and solution
// requests are checked separately in audit-tutorial-quiz.mjs.
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { gradeQuiz, unansweredQuestions } from '../src/lib/tutorial-quiz';
import { handoverAuditQuiz as quiz } from '../src/data/quizzes/handover-audit';
import { handoverAuditAnswers as key } from '../src/data/quizzes/handover-audit-answers';
import cases from '../public/data/week-09-cases.json';
import earlier from '../public/data/week-08-cases.json';
import { startConversation, stepConversation } from '../public/data/week-07-models.mjs';
import { startReview, stepReview } from '../public/data/week-08-models.mjs';
import { costSharing, filterVenue, enumerateLogistics, startHandover, stepHandover, handoverForDate } from '../public/data/week-09-models.mjs';

const complete = { venues: 'screened', bill: 'new-version', tail: '3', dependence: 'dependent', fallback: 'revise', deadline: 'terminal' };
const logistics = { baseCostCents: 1800, baseMinutes: 85, lateProbability: 0.2, lateMinutes: 25,
  closureCostCents: 200, closureMinutes: 10, closureGivenLate: 0.15, closureGivenOnTime: 0.15,
  timeLimit: 110, budgetCents: 2000, availableMinutes: 120 };
const review = () => {
  const pending = earlier.priorEvents.reduce((state, event) => stepConversation(state, event).state, startConversation(earlier.handoff, 2));
  return startReview(stepConversation(pending, { id: 'quiz-reply', type: 'reply', at: 1 }).state);
};
const venues = cases.venues.map(venue => venue.id === 'atrium' ? { ...venue, activityCents: 1500, transportCents: 300 } : venue);
const initial = (version = 'q1') => startHandover(review(), { ...cases.plan, version, confirmBy: 1000 }, venues);
const proposed = (version = 'q1') => stepHandover(initial(version), { id: 'quiz-proposal', type: 'propose', at: 960 }).state;
const one = () => stepHandover(proposed(), { id: 'quiz-alex', type: 'confirm', actor: 'alex', planVersion: 'q1', at: 980 }).state;

describe('the eighth tutorial handover quiz', () => {
  it('withholds feedback for every missing or malformed response', () => {
    for (const question of quiz.questions) {
      expect(gradeQuiz(quiz, { ...complete, [question.id]: '' }, key))
        .toEqual({ status: 'incomplete', missing: [question.id] });
    }
    expect(unansweredQuestions(quiz, { ...complete, tail: '3%' })).toEqual(['tail']);
    expect(unansweredQuestions(quiz, { ...complete, venues: 'invented' })).toEqual(['venues']);
    expect(unansweredQuestions(quiz, { ...complete, tail: '0' })).toEqual([]);
  });

  it('checks the new venue cards, exact hard limits and proposed bill contributions', () => {
    const common = cases.venues[0];
    const nook = { ...common, id: 'nook', exit: null, outboundMinutes: 25, meetingMinutes: 65, returnMinutes: 25,
      activityCents: 1400, transportCents: 300, quiet: 5, lighting: 4 };
    const den = { ...common, id: 'den', public: false, quiet: 5, lighting: 5 };
    const arcade = { ...common, id: 'arcade', outboundMinutes: 30, meetingMinutes: 60, returnMinutes: 30,
      activityCents: 1400, transportCents: 600, quiet: 3, lighting: 3 };
    expect([nook, den, arcade].map(venue => {
      const result = filterVenue(venue);
      return [result.id, result.reasons, result.score];
    })).toEqual([['nook', ['exit'], null], ['den', ['public'], null], ['arcade', [], 12]]);
    expect(filterVenue(arcade)).toMatchObject({ home: 1140, minutes: 120, costs: { alexTotal: 2000 } });
    expect(filterVenue({ ...arcade, returnMinutes: 31 }).reasons).toContain('time');
    expect(filterVenue({ ...arcade, transportCents: 601 }).reasons).toContain('budget');
    expect(quiz.questions[0].evidence!.rows).toEqual([
      ['Nook', 'Public; exit unknown', '19'], ['Den', 'Private; exit checked', '20'], ['Arcade', 'All pass; home 19:00; total $20', '12'],
    ]);
    expect(costSharing(1500, 300, 'cover-both').alexTotal).toBe(1800);
    expect(costSharing(1500, 300, 'split-drinks')).toEqual({ mode: 'split-drinks', alexDrinks: 750, counterpartDrinks: 750,
      alexTransport: 300, alexTotal: 1050, counterpartTransport: null });
  });

  it('distinguishes the new strict tail, unchanged means and failed fallback', () => {
    const independent = enumerateLogistics(logistics);
    expect(independent.states.map(row => [row.minutes, row.costCents])).toEqual([[85, 1800], [95, 2000], [110, 1800], [120, 2000]]);
    independent.states.forEach((row, i) => expect(row.probability).toBeCloseTo([0.68, 0.12, 0.17, 0.03][i], 12));
    expect(key.tail.answer).toBe(3);
    expect(independent.targetMissProbability).toBeCloseTo(0.03, 12);
    expect(independent.hardWindowMissProbability).toBe(0);
    expect(independent.budgetMissProbability).toBe(0);
    expect(enumerateLogistics({ ...logistics, timeLimit: 109 }).targetMissProbability).toBeCloseTo(0.2, 12);
    const dependent = enumerateLogistics({ ...logistics, closureGivenLate: 0.5, closureGivenOnTime: 0.0625 });
    dependent.states.forEach((row, i) => expect(row.probability).toBeCloseTo([0.75, 0.05, 0.10, 0.10][i], 12));
    for (const result of [independent, dependent]) {
      expect(result.closureProbability).toBeCloseTo(0.15, 12);
      expect(result.expectedCostCents).toBeCloseTo(1830, 10);
      expect(result.expectedMinutes).toBeCloseTo(91.5, 12);
    }
    expect(dependent.targetMissProbability).toBeCloseTo(0.1, 12);
    const changedFallback = enumerateLogistics({ ...logistics, closureMinutes: 25 });
    expect(changedFallback.states.at(-1)?.minutes).toBe(135);
    expect(changedFallback.hardWindowMissProbability).toBeCloseTo(0.03, 12);
    expect(filterVenue({ ...cases.venues[3], exit: null }).reasons).toContain('exit');
  });

  it('clears revised agreement and replays all four new confirmation branches', () => {
    let bill = proposed('v1');
    for (const [actor, at] of [['alex', 965], ['counterpart', 970]] as const) {
      bill = stepHandover(bill, { id: `bill-${actor}`, type: 'confirm', actor, at, planVersion: 'v1' }).state;
    }
    const savedBill = structuredClone(bill);
    const revised = stepHandover(bill, { id: 'bill-revision', type: 'revise', at: 972,
      plan: { ...bill.plan, version: 'v2', costMode: 'split-drinks' } }).state;
    expect(revised).toMatchObject({ phase: 'proposed', confirmations: [], plan: { version: 'v2' }, decision: { primary: { costs: { alexTotal: 1050 } } } });
    expect(revised.priorPlans[0].version).toBe('v1');
    expect(() => stepHandover(revised, { id: 'old-bill', type: 'confirm', at: 973, actor: 'counterpart', planVersion: 'v1' })).toThrow('current proposed');
    expect(bill).toEqual(savedBill);

    const state = one();
    const before = structuredClone(state);
    const confirmation = { id: 'quiz-counterpart', type: 'confirm', actor: 'counterpart', planVersion: 'q1' };
    const a = stepHandover(state, { ...confirmation, at: 999 });
    expect(a).toMatchObject({ state: { phase: 'confirmed' }, sendsMessage: false, booksVenue: false, takesPayment: false });
    expect(handoverForDate(a.state)).toMatchObject({ plan: { version: 'q1' }, confirmations: ['alex', 'counterpart'] });
    const b = stepHandover(state, { ...confirmation, at: 1000 }).state;
    expect(b.phase).toBe('expired');
    expect(stepHandover(b, { id: 'later', type: 'clock', at: 1001 }).state).toEqual(b);
    const c = stepHandover(state, { id: 'quiz-cancel', type: 'cancel', at: 990 }).state;
    expect(c.phase).toBe('cancelled');
    expect(stepHandover(c, { ...confirmation, at: 995 }).state).toEqual(c);

    const heldReview = stepReview(state.review, { id: 'quiz-hold', type: 'assess', at: 2, card: earlier.cards[1] }).state;
    const held = stepHandover(state, { id: 'quiz-review-update', type: 'review', at: 990, review: heldReview }).state;
    expect(held).toMatchObject({ phase: 'review', confirmations: [] });
    const clearedReview = stepReview(heldReview, { id: 'quiz-clear', type: 'resolve-review', at: 2.5,
      findingIds: ['quiz-hold'], note: 'Authored clearance for this transition exercise.' }).state;
    const d = stepHandover(held, { id: 'quiz-clear-update', type: 'review', at: 995, review: clearedReview }).state;
    expect(d).toMatchObject({ phase: 'draft', confirmations: [] });
    for (const ineligible of [revised, b, c, d]) expect(() => handoverForDate(ineligible)).toThrow('currently confirmed');
    expect(state).toEqual(before);
  });

  it('grades wrong but valid attempts and equivalent decimal notation', () => {
    expect(gradeQuiz(quiz, { ...complete, tail: ' 3.0 ' }, key)).toMatchObject({ status: 'complete', score: 6, total: 6 });
    expect(gradeQuiz(quiz, { venues: 'penalty', bill: 'new-version', tail: '20', dependence: 'same-tail', fallback: 'auto-switch', deadline: 'terminal' }, key))
      .toMatchObject({ status: 'complete', score: 2, total: 6 });
    expect(gradeQuiz(quiz, { venues: 'penalty', bill: 'carry-signatures', tail: '0', dependence: 'same-tail', fallback: 'auto-switch', deadline: 'inclusive' }, key))
      .toMatchObject({ status: 'complete', score: 0, total: 6 });
  });

  it('publishes the eighth quiz and diagram without worked solutions in the page', () => {
    const html = readFileSync('dist/sessions/09-offline-handover/index.html', 'utf8');
    expect(html.includes('id="handover-audit-quiz"')).toBe(true);
    expect(html).toContain('The itinerary mistakes itself for an agreement');
    expect(html).toContain('/data/quizzes/handover-contingencies.svg');
    for (const entry of Object.values(key)) expect(html).not.toContain(entry.explanation);
    expect(JSON.parse(readFileSync('dist/data/quizzes/handover-audit.json', 'utf8'))).toEqual(key);
    for (const slug of ['02-platforms', '03-photo-assets', '04-bio-experiment', '05-match-probability', '06-message-tree', '07-communication', '08-threat-model', '10-date-simulation']) {
      expect(readFileSync(`dist/sessions/${slug}/index.html`, 'utf8')).not.toContain('id="handover-audit-quiz"');
    }
  });
});
