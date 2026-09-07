// Literal classroom results and publication checks. Browser layout, focus and
// request timing are exercised separately in audit-tutorial-quiz.mjs.
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { gradeQuiz, unansweredQuestions } from '../src/lib/tutorial-quiz';
import { poissonSilence } from '../src/lib/romance-models';
import { communicationAuditQuiz as quiz } from '../src/data/quizzes/communication-audit';
import { communicationAuditAnswers as key } from '../src/data/quizzes/communication-audit-answers';
import cases from '../public/data/week-07-cases.json';
import { analyseGame, compareResponses, startConversation, stepConversation } from '../public/data/week-07-models.mjs';

const complete = { receipt: 'fields', arrivals: 'complement', threshold: '0.7', game: 'best-responses', deadline: 'late', ledger: 'preserve' };
const event = (id: string, type: string, at: number) => ({ id, type, at });
const start = () => startConversation(cases.handoff, 3);
const readSnapshot = () => [event('s', 'send', 5), event('w', 'wait', 5.1), event('r7', 'read', 6)]
  .reduce((state, record) => stepConversation(state, record).state, start());

describe('the sixth tutorial communication quiz', () => {
  it('withholds feedback for every missing or malformed response', () => {
    for (const question of quiz.questions) {
      expect(gradeQuiz(quiz, { ...complete, [question.id]: '' }, key))
        .toEqual({ status: 'incomplete', missing: [question.id] });
    }
    expect(unansweredQuestions(quiz, { ...complete, threshold: '70%' })).toEqual(['threshold']);
    expect(unansweredQuestions(quiz, { ...complete, receipt: 'invented' })).toEqual(['receipt']);
    expect(unansweredQuestions(quiz, { ...complete, threshold: '0' })).toEqual([]);
  });

  it('checks the new count probability, utility tie and changed payoff matrix', () => {
    expect(poissonSilence(0.3, 4)).toBeCloseTo(0.301194211912, 11);
    expect(1 - poissonSilence(0.3, 4)).toBeCloseTo(0.698805788088, 11);
    expect(1.2 * poissonSilence(0.3, 4)).toBeCloseTo(0.361433054295, 11);
    const options = { clarificationAllowed: true, clarificationCost: 4.5 };
    const tie = compareResponses(0.7, options);
    expect(key.threshold.answer).toBe(0.7);
    expect(tie.winners).toEqual(['wait', 'clarify']);
    expect(tie.maximum).toBeCloseTo(0.4, 12);
    expect(compareResponses(0.65, options).winners).toEqual(['wait']);
    expect(compareResponses(0.9, { ...options, clarificationAllowed: false }))
      .toMatchObject({ excluded: ['clarify'], winners: ['wait'] });

    const rows = quiz.questions.find(question => question.id === 'game')!.evidence!.rows;
    const payoffs = rows.map(row => row.slice(1).map(cell => cell.replaceAll('−', '-').slice(1, -1).split(',').map(Number)));
    expect(payoffs).toEqual([[[-2, -2], [3, 0]], [[0, 3], [0, 0]]]);
    expect(analyseGame(payoffs)).toEqual({
      rowBest: [['Wait'], ['Ask']], columnBest: [['Wait'], ['Ask']],
      equilibria: [['Ask', 'Wait'], ['Wait', 'Ask']], rowDominant: [], columnDominant: [],
    });
    expect(-2 * 0.6 + 3 * (1 - 0.6)).toBeCloseTo(0, 12);
    expect(-2 * (2 / 3) + 3 * (1 - 2 / 3)).toBeCloseTo(-1 / 3, 12);
  });

  it('replays the shifted deadline and independent ledger branches without mutating inputs', () => {
    const read = readSnapshot();
    expect(read).toMatchObject({ phase: 'pending', observation: 'open', readAt: 6, deliveredAt: null });
    const before = structuredClone(read);
    const atDeadline = stepConversation(read, event('reply', 'reply', 8));
    expect(atDeadline).toMatchObject({ action: 'review-late-reply', sendsMessage: false,
      state: { phase: 'replied', observation: 'no-reply', closure: null } });
    expect(stepConversation(read, event('reply', 'reply', 7.999)).state.observation).toBe('reply');
    expect(read).toEqual(before);
    const timeoutFirst = stepConversation(stepConversation(read, event('t', 'timeout', 8)).state, event('a', 'reply', 8));
    expect(timeoutFirst.state).toMatchObject({ phase: 'replied', observation: 'no-reply' });

    const retained = stepConversation(read, event('w2', 'wait', 7)).state;
    const original = structuredClone(retained);
    expect(stepConversation(retained, event('r7', 'read', 6)))
      .toMatchObject({ action: 'duplicate', state: original, sendsMessage: false });
    expect(() => stepConversation(retained, event('r7', 'read', 6.5))).toThrow('Conflicting event ID');
    expect(() => stepConversation(retained, event('new-id', 'read', 6.5))).toThrow('observation-time order');
    const decline = stepConversation(retained, event('decline', 'decline', 7.5));
    expect(decline).toMatchObject({ trace: ['pending', 'declined', 'closed'], sendsMessage: false,
      state: { phase: 'closed', closure: 'decline', observation: 'reply' } });
    expect(stepConversation(decline.state, event('late', 'reply', 8.5)))
      .toMatchObject({ action: 'stop', state: decline.state, sendsMessage: false });
    expect(retained).toEqual(original);
  });

  it('grades wrong but valid attempts and equivalent decimal notation', () => {
    expect(gradeQuiz(quiz, { ...complete, threshold: ' .70 ' }, key)).toMatchObject({ status: 'complete', score: 6, total: 6 });
    expect(gradeQuiz(quiz, { receipt: 'delivered', arrivals: 'complement', threshold: '0.9', game: 'dominant', deadline: 'extend', ledger: 'preserve' }, key))
      .toMatchObject({ status: 'complete', score: 2, total: 6 });
    expect(gradeQuiz(quiz, { receipt: 'delivered', arrivals: 'cap', threshold: '0', game: 'dominant', deadline: 'extend', ledger: 'overwrite' }, key))
      .toMatchObject({ status: 'complete', score: 0, total: 6 });
  });

  it('publishes the sixth quiz and timeline without worked solutions in the page', () => {
    const html = readFileSync('dist/sessions/07-communication/index.html', 'utf8');
    expect(html).toContain('id="communication-audit-quiz"');
    expect(html).toContain('The scheduler files a patience bug');
    expect(html).toContain('/data/quizzes/communication-timeline.svg');
    for (const entry of Object.values(key)) expect(html).not.toContain(entry.explanation);
    expect(JSON.parse(readFileSync('dist/data/quizzes/communication-audit.json', 'utf8'))).toEqual(key);
    for (const slug of ['02-platforms', '03-photo-assets', '04-bio-experiment', '05-match-probability', '06-message-tree', '08-threat-model']) {
      expect(readFileSync(`dist/sessions/${slug}/index.html`, 'utf8')).not.toContain('id="communication-audit-quiz"');
    }
  });
});
