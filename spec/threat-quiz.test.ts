// Literal authored cases and publication checks. Browser geometry, keyboard
// focus and solution-request timing live in audit-tutorial-quiz.mjs.
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { gradeQuiz, unansweredQuestions } from '../src/lib/tutorial-quiz';
import { threatAuditQuiz as quiz } from '../src/data/quizzes/threat-audit';
import { threatAuditAnswers as key } from '../src/data/quizzes/threat-audit-answers';
import cases from '../public/data/week-08-cases.json';
import { startConversation, stepConversation } from '../public/data/week-07-models.mjs';
import { evaluateDetector, errorCost, projectedPrecision, screenCase, startReview, stepReview, checkReleasePlan } from '../public/data/week-08-models.mjs';

const complete = { boundary: 'remove', triage: 'coded', precision: '37.5', cost: 'cost-aware', prevalence: 'projected', review: 'retain' };
const cards = [
  { id: 'A', observations: [{ id: 'a1', kind: 'disclosed-automation', quote: 'Automated rules helper.' }, { id: 'a2', kind: 'syntax-only', quote: 'I enjyo co-op games.' }] },
  { id: 'B', observations: [{ id: 'b1', kind: 'image-no-match', quote: 'No item for IMG-Q8 in the supplied fictional index.' }] },
  { id: 'C', observations: [{ id: 'c1', kind: 'money-request', quote: 'Transfer $6 to reserve the game table.' }] },
];
const imageCard = { id: 'image', observations: [{ id: 'i1', kind: 'image-match', quote: 'Fictional index: IMG-Q9 appears under two different names.' }] };
const pending = () => [
  { id: 's-quiz', type: 'send', at: 4 }, { id: 'w-quiz', type: 'wait', at: 4.1 },
].reduce((state, event) => stepConversation(state, event).state, startConversation(cases.handoff, 2));
const held = () => [
  { id: 'f-pay', type: 'assess', at: 4.2, card: cards[2] },
  { id: 'f-image', type: 'assess', at: 4.3, card: imageCard },
].reduce((state, event) => stepReview(state, event).state, startReview(pending()));
const clear = { id: 'clear-quiz', type: 'resolve-review', at: 6.4, findingIds: ['f-pay', 'f-image'], note: 'Authored reviewer decision for this transition exercise.' };

describe('the seventh tutorial threat quiz', () => {
  it('withholds feedback until every case has a valid response', () => {
    for (const question of quiz.questions) {
      expect(gradeQuiz(quiz, { ...complete, [question.id]: '' }, key))
        .toEqual({ status: 'incomplete', missing: [question.id] });
    }
    expect(unansweredQuestions(quiz, { ...complete, precision: '37.5%' })).toEqual(['precision']);
    expect(unansweredQuestions(quiz, { ...complete, triage: 'invented' })).toEqual(['triage']);
    expect(unansweredQuestions(quiz, { ...complete, precision: '0' })).toEqual([]);
  });

  it('checks the new matrices, inclusive cutoff, error-cost tie and prevalence projection', () => {
    const group = (name: string, n: number, malicious: boolean, score: number) =>
      Array.from({ length: n }, (_, index) => ({ id: `${name}-${index}`, malicious, score }));
    const rows = [...group('q1', 4, true, 80), ...group('q2', 2, true, 55), ...group('q3', 2, true, 20),
      ...group('q4', 2, false, 80), ...group('q5', 8, false, 55), ...group('q6', 82, false, 20)];
    const low = evaluateDetector(rows, 55);
    const high = evaluateDetector(rows, 75);
    expect(low).toMatchObject({ total: 100, counts: { tp: 6, fn: 2, fp: 10, tn: 82 }, precision: 0.375, recall: 0.75, accuracy: 0.88 });
    expect(high.counts).toEqual({ tp: 4, fn: 4, fp: 2, tn: 90 });
    expect([low.flaggedIds.length, high.flaggedIds.length]).toEqual([16, 6]);
    expect(quiz.questions.find(q => q.id === 'precision')!.evidence!.rows)
      .toEqual([['Malicious', '6', '2'], ['Benign', '10', '82']]);
    expect(quiz.questions.find(q => q.id === 'cost')!.evidence!.rows)
      .toEqual([['55', '2', '10'], ['75', '4', '2']]);
    expect(key.precision.answer).toBe(37.5);
    expect([low, high].map(result => errorCost(result.counts, 4, 1))).toEqual([18, 18]);
    expect([low, high].map(result => errorCost(result.counts, 6, 1))).toEqual([22, 26]);
    expect(evaluateDetector(rows, 100)).toMatchObject({ precision: null, recall: 0, accuracy: 0.92 });
    expect(projectedPrecision(0.02, 0.6, 0.05)).toBeCloseTo(12 / 61, 12);
    expect([20 * 0.6, 20 * 0.4, 980 * 0.05, 980 * 0.95]).toEqual([12, 8, 49, 931]);
  });

  it('retains the new coded evidence and checks declared release capabilities', () => {
    const displayed = quiz.questions.find(q => q.id === 'triage')!.evidence!.rows.flat().join(' ');
    for (const card of cards) for (const observation of card.observations) expect(displayed).toContain(observation.quote);
    expect(cards.map(card => screenCase(card).action)).toEqual(['no-additional-flag', 'no-additional-flag', 'review']);
    expect(screenCase(cards[2]).evidence).toEqual(cards[2].observations);
    expect(checkReleasePlan(cases.releasePlan)).toEqual({ allowed: true, failed: [] });
    expect(checkReleasePlan({ ...cases.releasePlan, acceptsPayments: true, uploadsThirdPartyImages: true }))
      .toEqual({ allowed: false, failed: ['acceptsPayments', 'uploadsThirdPartyImages'] });
    // These declarations cannot prove a separate page's links follow them;
    // the quiz requires inspecting and repairing the actual proposed flow.
  });

  it('replays two findings, late clearance, refusal and no-match without rewriting history', () => {
    const state = held();
    const before = structuredClone(state);
    expect(state.holds.map((hold: { eventId: string }) => hold.eventId)).toEqual(['f-pay', 'f-image']);
    const reply = stepReview(state, { id: 'reply-quiz', type: 'reply', at: 6.2 });
    expect(reply).toMatchObject({ phase: 'review', sendsMessage: false, publishesAccusation: false,
      state: { conversation: { phase: 'replied', observation: 'no-reply', sentAt: 4 } } });
    expect(() => stepReview(reply.state, { ...clear, findingIds: ['f-pay'] })).toThrow('every open finding');
    expect(() => stepReview(reply.state, { ...clear, note: '' })).toThrow('review note');
    const cleared = stepReview(reply.state, clear);
    expect(cleared).toMatchObject({ phase: 'replied', action: 'review-cleared', sendsMessage: false, publishesAccusation: false,
      state: { holds: [], conversation: { phase: 'replied', observation: 'no-reply', sentAt: 4 } } });
    expect(cleared.state.resolutions[0].findings.map((hold: { eventId: string }) => hold.eventId)).toEqual(['f-pay', 'f-image']);

    const closed = stepReview(state, { id: 'decline-quiz', type: 'decline', at: 5 });
    expect(closed.state.conversation).toMatchObject({ phase: 'closed', closure: 'decline', observation: 'reply' });
    for (const event of [clear, { id: 'late-quiz', type: 'reply', at: 6.5 }]) {
      expect(stepReview(closed.state, event)).toMatchObject({ phase: 'closed', action: 'stop', state: closed.state, sendsMessage: false, publishesAccusation: false });
    }
    const noMatch = stepReview(state, { id: 'no-match-quiz', type: 'assess', at: 6.1, card: cards[1] });
    expect(noMatch).toMatchObject({ phase: 'review', action: 'hold-for-review', sendsMessage: false, publishesAccusation: false,
      state: { holds: before.holds, conversation: { phase: 'pending', observation: 'no-reply', sentAt: 4 } } });
    expect(state).toEqual(before);
  });

  it('grades wrong but valid attempts and equivalent decimal notation', () => {
    expect(gradeQuiz(quiz, { ...complete, precision: ' 37.50 ' }, key)).toMatchObject({ status: 'complete', score: 6, total: 6 });
    expect(gradeQuiz(quiz, { boundary: 'declaration', triage: 'coded', precision: '75', cost: 'always-high', prevalence: 'recall', review: 'retain' }, key))
      .toMatchObject({ status: 'complete', score: 2, total: 6 });
    expect(gradeQuiz(quiz, { boundary: 'declaration', triage: 'all-flags', precision: '0', cost: 'always-high', prevalence: 'recall', review: 'reset-window' }, key))
      .toMatchObject({ status: 'complete', score: 0, total: 6 });
  });

  it('publishes the seventh quiz and diagram without worked solutions in the page', () => {
    const html = readFileSync('dist/sessions/08-threat-model/index.html', 'utf8');
    expect(html).toContain('id="threat-audit-quiz"');
    expect(html).toContain('The flag factory requests a verdict button');
    expect(html).toContain('/data/quizzes/threat-population.svg');
    for (const entry of Object.values(key)) expect(html).not.toContain(entry.explanation);
    expect(JSON.parse(readFileSync('dist/data/quizzes/threat-audit.json', 'utf8'))).toEqual(key);
    for (const slug of ['02-platforms', '03-photo-assets', '04-bio-experiment', '05-match-probability', '06-message-tree', '07-communication', '09-offline-handover']) {
      expect(readFileSync(`dist/sessions/${slug}/index.html`, 'utf8')).not.toContain('id="threat-audit-quiz"');
    }
  });
});
