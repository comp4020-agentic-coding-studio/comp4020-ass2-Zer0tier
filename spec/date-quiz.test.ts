// New matrix/count oracles were independently checked with exact fractions and
// integer LCG arithmetic. Browser checks cover rendering, focus and answer fetches.
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { gradeQuiz, unansweredQuestions } from '../src/lib/tutorial-quiz';
import { dateAuditQuiz as quiz } from '../src/data/quizzes/date-audit';
import { dateAuditAnswers as key } from '../src/data/quizzes/date-audit-answers';
import earlier from '../public/data/week-08-cases.json';
import week9 from '../public/data/week-09-cases.json';
import { startConversation, stepConversation } from '../public/data/week-07-models.mjs';
import { startReview } from '../public/data/week-08-models.mjs';
import { startHandover, stepHandover } from '../public/data/week-09-models.mjs';
import { propagate, categorical, simulate, startMeeting, stepMeeting, meetingForFollowUp } from '../public/data/week-10-models.mjs';

const matrix = [[0.375, 0.25, 0.25, 0.125], [0.25, 0.25, 0.125, 0.375], [0, 0, 1, 0], [0, 0, 0, 1]];
const complete = { orientation: 'row-update', sampler: 'half-open', endpoint: '37.5', simulation: 'prefix', bill: 'review-bill', observations: 'withdrawal' };
const arrival = { id: 'quiz-arrival', type: 'arrive', at: 1040, actors: ['alex', 'counterpart'] };
const leave = { id: 'quiz-leave', type: 'leave', at: 1060, actor: 'alex' };
const next = (id: string, actor: string, at: number, response = 'agree') => ({ id, type: 'next-date', actor, at, response });
function meeting() {
  const pending = earlier.priorEvents.reduce((s, e) => stepConversation(s, e).state, startConversation(earlier.handoff, 2));
  const review = startReview(stepConversation(pending, { id: 'quiz-reply', type: 'reply', at: 1 }).state);
  const venues = week9.venues.map(v => v.id === 'atrium' ? { ...v, activityCents: 1600 } : v);
  let handover = startHandover(review, { ...week9.plan, version: 'quiz-date-v2', costMode: 'split-drinks' }, venues);
  for (const e of week9.proposalEvents) handover = stepHandover(handover, { ...e, planVersion: 'quiz-date-v2' }).state;
  return startMeeting(handover);
}

describe('the ninth tutorial date quiz', () => {
  it('withholds feedback for every missing or malformed response', () => {
    for (const q of quiz.questions) {
      expect(gradeQuiz(quiz, { ...complete, [q.id]: '' }, key)).toEqual({ status: 'incomplete', missing: [q.id] });
    }
    expect(unansweredQuestions(quiz, { ...complete, endpoint: '37.5%' })).toEqual(['endpoint']);
    expect(unansweredQuestions(quiz, { ...complete, orientation: 'invented' })).toEqual(['orientation']);
    expect(unansweredQuestions(quiz, { ...complete, endpoint: '0' })).toEqual([]);
  });

  it('checks the displayed new matrix, orientation and unconditional two-step result', () => {
    for (const index of [0, 2]) expect(quiz.questions[index].evidence!.rows.map(row => row.slice(1).map(Number))).toEqual(matrix);
    expect(propagate(matrix, 1)).toEqual([0.375, 0.25, 0.25, 0.125]);
    expect(matrix.map(row => row[0])).toEqual([0.375, 0.25, 0, 0]);
    expect(matrix.reduce((sum, row) => sum + row[0], 0)).toBe(0.625);
    const result = propagate(matrix, 2);
    expect(result).toEqual([13 / 64, 5 / 32, 3 / 8, 17 / 64]);
    expect(result.reduce((a, b) => a + b, 0)).toBe(1);
    expect(100 * result[2]).toBe(37.5);
    expect(key.endpoint.answer).toBe(37.5);
    expect(0.375 * 0.25 + 0.25 * 0.125).toBe(0.125);
    expect(result[2] / (result[2] + result[3])).toBeCloseTo(24 / 41, 12);
    for (const initial of [[0, 0, 1, 0], [0, 0, 0, 1]]) expect(propagate(matrix, 20, initial)).toEqual(initial);
  });

  it('places exact new boundaries in the right interval and skips zero mass', () => {
    expect([0, 0.3749, 0.375, 0.6249, 0.625, 0.8749, 0.875, 0.999].map(u => categorical(matrix[0], u)))
      .toEqual([0, 0, 1, 1, 2, 2, 3, 3]);
    const first = categorical(matrix[0], 0.625);
    expect([first, categorical(matrix[first], 0)]).toEqual([2, 2]);
    expect(categorical(matrix[3], 0)).toBe(3);
    expect(() => categorical(matrix[0], 1)).toThrow();
  });

  it('reproduces new A-start counts and the increased N error in percentage points', () => {
    expect(propagate(matrix, 2, [0, 1, 0, 0])).toEqual([5 / 32, 1 / 8, 7 / 32, 1 / 2]);
    const small = simulate(matrix, { seed: 202710, runs: 800, steps: 2, start: 1 });
    const large = simulate(matrix, { seed: 202710, runs: 1600, steps: 2, start: 1 });
    expect(small.counts).toEqual([120, 97, 177, 406]);
    expect(large.counts).toEqual([243, 208, 345, 804]);
    expect(quiz.questions[3].evidence!.rows).toEqual([
      ['800', '120 / 97 / 177 / 406'], ['1,600', '243 / 208 / 345 / 804'],
    ]);
    expect(small.absoluteErrors[2] * 100).toBeCloseTo(0.25, 12);
    expect(large.absoluteErrors[2] * 100).toBeCloseTo(0.3125, 12);
    expect(large.absoluteErrors[2]).toBeGreaterThan(small.absoluteErrors[2]);
  });

  it('compares the changed café bill with drink costs and permits leaving in review', () => {
    const initial = meeting();
    expect(initial).toMatchObject({ phase: 'awaiting-arrival', agreement: { plan: { version: 'quiz-date-v2' },
      costs: { alexDrinks: 800, counterpartDrinks: 800, alexTransport: 200, alexTotal: 1000, counterpartTransport: null } } });
    const ask = { id: 'quiz-ask', type: 'ask-bill', at: 1052, planVersion: 'quiz-date-v2', billCents: 1800 };
    expect(() => stepMeeting(initial, ask)).toThrow('Arrival');
    let active = stepMeeting(initial, arrival).state;
    for (const at of [1050, 1051]) active = stepMeeting(active, { id: `quiz-wait-${at}`, type: 'wait', at }).state;
    expect(active.bill).toBe('waiting');
    const saved = structuredClone(active);
    const reviewed = stepMeeting(active, ask);
    expect(reviewed).toMatchObject({ state: { bill: 'review', billActors: [] }, sendsMessage: false, takesPayment: false });
    expect(() => stepMeeting(reviewed.state, { id: 'old-ack', type: 'ack-bill', at: 1053, actor: 'alex', planVersion: 'quiz-date-v2' })).toThrow();
    const ended = stepMeeting(reviewed.state, leave).state;
    expect(meetingForFollowUp(ended)).toMatchObject({ planVersion: 'quiz-date-v2', meeting: 'ended', bill: 'review', nextDate: 'unobserved' });
    expect(stepMeeting(ended, { ...ask, id: 'late-bill', at: 1061 }).state).toEqual(ended);
    expect(active).toEqual(saved);

    const matching = stepMeeting(active, { ...ask, billCents: 1600 }).state;
    const once = stepMeeting(matching, { id: 'ack-alex', type: 'ack-bill', at: 1053, actor: 'alex', planVersion: 'quiz-date-v2' }).state;
    expect(() => stepMeeting(once, { id: 'ack-again', type: 'ack-bill', at: 1054, actor: 'alex', planVersion: 'quiz-date-v2' })).toThrow();
    const checked = stepMeeting(once, { id: 'ack-counterpart', type: 'ack-bill', at: 1054, actor: 'counterpart', planVersion: 'quiz-date-v2' });
    expect(checked).toMatchObject({ state: { bill: 'acknowledged', nextDate: 'unobserved' }, takesPayment: false });
  });

  it('preserves withdrawal, absent observations and the entire ended snapshot', () => {
    const active = stepMeeting(meeting(), arrival).state;
    const saved = structuredClone(active);
    const aPending = stepMeeting(active, next('a-alex', 'alex', 1055)).state;
    expect(aPending.nextDate).toBe('pending');
    const aAgreed = stepMeeting(aPending, next('a-counterpart', 'counterpart', 1056)).state;
    expect(aAgreed.nextDate).toBe('agreed');
    const aWithdrawn = stepMeeting(aAgreed, next('a-withdraw', 'counterpart', 1057, 'decline')).state;
    expect(aWithdrawn).toMatchObject({ nextDate: 'declined', nextActors: [] });
    expect(() => stepMeeting(aWithdrawn, next('a-retry', 'alex', 1058))).toThrow('retry');
    const a = stepMeeting(aWithdrawn, leave).state;
    const b = stepMeeting(active, { ...leave, actor: 'counterpart' }).state;
    const cPending = stepMeeting(active, next('c-alex', 'alex', 1055)).state;
    const cEnded = stepMeeting(cPending, { ...leave, actor: 'counterpart' }).state;
    const c = stepMeeting(cEnded, next('c-queued', 'counterpart', 1061)).state;
    expect(c).toEqual(cEnded);
    expect([a, b, c].map(s => {
      const output = meetingForFollowUp(s);
      return [output.meeting, output.nextDate, output.planVersion];
    })).toEqual([['ended', 'declined', 'quiz-date-v2'], ['ended', 'unobserved', 'quiz-date-v2'], ['ended', 'pending', 'quiz-date-v2']]);
    expect(() => stepMeeting(active, { id: 'simulation', type: 'N', at: 1055 })).toThrow('Unknown');
    expect(active).toEqual(saved);
  });

  it('grades wrong attempts and decimal equivalents only after completion', () => {
    expect(gradeQuiz(quiz, { ...complete, endpoint: ' 37.50 ' }, key)).toMatchObject({ status: 'complete', score: 6, total: 6 });
    expect(gradeQuiz(quiz, { orientation: 'normalise', sampler: 'half-open', endpoint: '12.5', simulation: 'guaranteed', bill: 'auto-split', observations: 'withdrawal' }, key))
      .toMatchObject({ status: 'complete', score: 2, total: 6 });
    expect(gradeQuiz(quiz, { orientation: 'normalise', sampler: 'left-cell', endpoint: '0', simulation: 'guaranteed', bill: 'auto-split', observations: 'queued-update' }, key))
      .toMatchObject({ status: 'complete', score: 0, total: 6 });
  });

  it('publishes the ninth quiz and diagram without worked solutions in the page', () => {
    const html = readFileSync('dist/sessions/10-date-simulation/index.html', 'utf8');
    expect(html.includes('id="date-audit-quiz"')).toBe(true);
    expect(html).toContain('The simulator has booked a second date');
    expect(html).toContain('/data/quizzes/date-sampling-intervals.svg');
    for (const entry of Object.values(key)) expect(html).not.toContain(entry.explanation);
    expect(JSON.parse(readFileSync('dist/data/quizzes/date-audit.json', 'utf8'))).toEqual(key);
    for (const slug of ['02-platforms', '03-photo-assets', '04-bio-experiment', '05-match-probability', '06-message-tree', '07-communication', '08-threat-model', '09-offline-handover', '11-follow-up']) {
      expect(readFileSync(`dist/sessions/${slug}/index.html`, 'utf8')).not.toContain('id="date-audit-quiz"');
    }
  });
});
