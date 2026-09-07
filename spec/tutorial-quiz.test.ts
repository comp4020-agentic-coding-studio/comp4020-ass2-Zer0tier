import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { gradeQuiz, unansweredQuestions } from '../src/lib/tutorial-quiz';
import { platformAuditQuiz as quiz } from '../src/data/quizzes/platform-audit';
import { platformAuditAnswers as key } from '../src/data/quizzes/platform-audit-answers';

const complete = { queue: 'filtered', disclosure: 'scoped', elo: '1412', census: 'corrected', dashboard: 'bounded', feedback: 'allocation' };

describe('the first tutorial quiz', () => {
  it('withholds every score and explanation if any single case is unanswered', () => {
    for (const question of quiz.questions) {
      const attempt = { ...complete, [question.id]: '' };
      expect(gradeQuiz(quiz, attempt, key)).toEqual({ status: 'incomplete', missing: [question.id] });
    }
  });

  it('counts only valid responses, accepting a wrong number as an attempted answer', () => {
    for (const value of [' ', 'NaN', 'Infinity', '1412 points', '0x584', '1e999']) {
      expect(unansweredQuestions(quiz, { ...complete, elo: value })).toEqual(['elo']);
    }
    expect(unansweredQuestions(quiz, { ...complete, queue: 'made-up' })).toEqual(['queue']);
    expect(unansweredQuestions(quiz, { ...complete, elo: '0' })).toEqual([]);
  });

  it('grades new application examples against literal arithmetic and interpretations', () => {
    expect(key.elo.answer).toBe(1412);
    expect(gradeQuiz(quiz, { ...complete, elo: ' 1412.0 ' }, key)).toMatchObject({ status: 'complete', score: 6, total: 6 });
    expect(gradeQuiz(quiz, { queue: 'highest', disclosure: 'confirmed', elo: '0', census: 'old', dashboard: 'count', feedback: 'certain' }, key))
      .toMatchObject({ status: 'complete', score: 0, total: 6 });
    const result = gradeQuiz(quiz, { ...complete, queue: 'highest', elo: '1424', census: 'old', dashboard: 'causal' }, key);
    expect(result).toMatchObject({ status: 'complete', score: 2, total: 6 });
    if (result.status === 'complete') {
      expect(result.feedback.map(item => item.correct)).toEqual([false, true, false, false, false, true]);
      expect(result.feedback[2].answer).toBe('1412');
      expect(result.feedback.every(item => item.explanation.length > 60)).toBe(true);
    }
  });

  it('publishes the quiz on the first tutorial without publishing its solution explanations in HTML', () => {
    const html = readFileSync('dist/sessions/02-platforms/index.html', 'utf8');
    expect(html).toContain('id="platform-audit-quiz"');
    expect(html).toContain('Your shift at Null Island');
    expect(html).toContain('Reveal answers');
    for (const entry of Object.values(key)) expect(html).not.toContain(entry.explanation);
    expect(readFileSync('dist/sessions/03-photo-assets/index.html', 'utf8')).not.toContain('id="platform-audit-quiz"');
  });
});
