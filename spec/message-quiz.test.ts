import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { gradeQuiz, unansweredQuestions } from '../src/lib/tutorial-quiz';
import { messageAuditQuiz as quiz } from '../src/data/quizzes/message-audit';
import { messageAuditAnswers as key } from '../src/data/quizzes/message-audit-answers';
import { routeMessage, replyRate, compareDrafts } from '../public/data/week-06-models.mjs';

const complete = { terminal: 'stop', evidence: 'grounded', crossover: '0.15', history: 'priorities', rates: 'recoded', pressure: 'filter' };

describe('the fifth tutorial message quiz', () => {
  it('withholds all feedback if any case lacks a valid response', () => {
    for (const question of quiz.questions) {
      expect(gradeQuiz(quiz, { ...complete, [question.id]: '' }, key))
        .toEqual({ status: 'incomplete', missing: [question.id] });
    }
    expect(unansweredQuestions(quiz, { ...complete, crossover: '0.15 units' })).toEqual(['crossover']);
    expect(unansweredQuestions(quiz, { ...complete, crossover: '0' })).toEqual([]);
  });

  it('agrees with the taught routing priorities and literal arithmetic for the new cases', () => {
    const recipient = { id: 'quiz-recipient', topics: [{ topic: 'board-games', quote: 'I enjoy board games, especially co-op ones.' }] };
    const initial = { closed: false, boundary: 'clear', sent: false, inbound: 'none', recipient };
    const broken = { id: 'quiz-recipient', topics: [{ topic: 'board-games', quote: '' }] };
    expect(routeMessage({ ...initial, boundary: 'declined', recipient: broken }))
      .toMatchObject({ action: 'stop', trace: ['terminal'], evidence: [], sendsMessage: false });
    expect(routeMessage(initial).action).toBe('draft-context');
    const pending = { ...initial, sent: true, recipient: broken };
    const before = structuredClone(pending);
    expect(routeMessage(pending)).toMatchObject({ action: 'pending', trace: ['terminal', 'metadata', 'history'], sendsMessage: false });
    expect(routeMessage(pending)).toEqual(routeMessage(pending));
    expect(pending).toEqual(before);
    expect(routeMessage({ ...initial, boundary: 'unknown' })).toMatchObject({ action: 'review', trace: ['terminal', 'metadata'] });
    expect(routeMessage({ ...initial, closed: true, sent: true, inbound: 'reply' })).toMatchObject({ action: 'stop', trace: ['terminal'] });

    const drafts = [
      { id: 'plain', probability: 0.3, seconds: 10, admissible: true },
      { id: 'context', probability: 0.45, seconds: 20, admissible: true },
    ];
    const tie = compareDrafts(drafts, 10, 0.15);
    expect(key.crossover.answer).toBe(0.15);
    expect(tie.scores).toEqual([{ id: 'defer', utility: 0 }, { id: 'plain', utility: 1.5 }, { id: 'context', utility: 1.5 }]);
    expect(tie.winners).toEqual(['plain', 'context']);
    expect(compareDrafts(drafts, 10, 0.4).winners).toEqual(['defer']);
    expect(compareDrafts([...drafts, { id: 'demand', probability: 1, seconds: 0, admissible: false }], 10, 0.15))
      .toMatchObject({ excluded: ['demand'], winners: ['plain', 'context'] });

    const rateRows = quiz.questions.find(question => question.id === 'rates')!.evidence!.rows;
    const rates = rateRows.map(row => row.slice(1).map(Number));
    expect(replyRate(rates[0][0], rates[0][1])).toBe(0.2);
    const corrected = replyRate(rates[1][0] - 1, rates[1][1]);
    expect(corrected).toBe(0.225);
    if (corrected === null) throw new Error('The corrected fixture must have a non-empty exposure denominator');
    expect(100 * (corrected - 0.2)).toBeCloseTo(2.5, 12);
    const pressureRows = quiz.questions.find(question => question.id === 'pressure')!.evidence!.rows;
    expect(pressureRows.map(row => {
      const [answers, declines, none] = row.slice(1).map(Number);
      const total = answers + declines + none;
      return { total, anyReply: replyRate(answers + declines, total), answer: replyRate(answers, total) };
    })).toEqual([{ total: 20, anyReply: 0.45, answer: 0.4 }, { total: 20, anyReply: 0.7, answer: 0.15 }]);
  });

  it('grades wrong but valid attempts and accepts equivalent decimal notation', () => {
    expect(gradeQuiz(quiz, { ...complete, crossover: ' 0.150 ' }, key)).toMatchObject({ status: 'complete', score: 6, total: 6 });
    expect(gradeQuiz(quiz, { terminal: 'review-topic', evidence: 'grounded', crossover: '0.10', history: 'restart', rates: 'drop-row', pressure: 'filter' }, key))
      .toMatchObject({ status: 'complete', score: 2, total: 6 });
    expect(gradeQuiz(quiz, { terminal: 'review-topic', evidence: 'champions', crossover: '0', history: 'restart', rates: 'drop-row', pressure: 'penalty' }, key))
      .toMatchObject({ status: 'complete', score: 0, total: 6 });
  });

  it('publishes the fifth quiz with its diagram and no worked solutions in the page', () => {
    const html = readFileSync('dist/sessions/06-message-tree/index.html', 'utf8');
    expect(html).toContain('id="message-audit-quiz"');
    expect(html).toContain('The opener optimiser needs a stop button');
    expect(html).toContain('/data/quizzes/message-utility.svg');
    for (const entry of Object.values(key)) expect(html).not.toContain(entry.explanation);
    expect(JSON.parse(readFileSync('dist/data/quizzes/message-audit.json', 'utf8'))).toEqual(key);
    for (const slug of ['02-platforms', '03-photo-assets', '04-bio-experiment', '05-match-probability', '07-communication']) {
      expect(readFileSync(`dist/sessions/${slug}/index.html`, 'utf8')).not.toContain('id="message-audit-quiz"');
    }
  });
});
