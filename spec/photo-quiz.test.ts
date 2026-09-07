import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { gradeQuiz, unansweredQuestions } from '../src/lib/tutorial-quiz';
import { photoAuditQuiz as quiz } from '../src/data/quizzes/photo-audit';
import { photoAuditAnswers as key } from '../src/data/quizzes/photo-audit-answers';

const complete = { provenance: 'blocked', lighting: 'isolated', crop: '25', identity: 'unresolved', agreement: 'rowwise', freeze: 'freeze' };

describe('the second tutorial photo quiz', () => {
  it('withholds all feedback when any one case is unanswered', () => {
    for (const question of quiz.questions) {
      expect(gradeQuiz(quiz, { ...complete, [question.id]: '' }, key))
        .toEqual({ status: 'incomplete', missing: [question.id] });
    }
    expect(unansweredQuestions(quiz, { ...complete, crop: '25%' })).toEqual(['crop']);
    expect(unansweredQuestions(quiz, { ...complete, crop: '0' })).toEqual([]);
  });

  it('checks new crop arithmetic and row-wise agreement against literal results', () => {
    expect(key.crop.answer).toBe(25);
    const labels = quiz.questions.find(question => question.id === 'agreement')!.evidence!.rows;
    expect(labels.filter(row => row[1] === '1')).toHaveLength(4);
    expect(labels.filter(row => row[2] === '1')).toHaveLength(4);
    expect(labels.filter(row => row[1] === row[2]).map(row => row[0])).toEqual(['T1', 'T4', 'T7', 'T8']);
    expect(key.lighting.answer).toBe('isolated');
    expect(key.agreement.answer).toBe('rowwise');
    expect(gradeQuiz(quiz, { ...complete, crop: ' 25.0 ' }, key)).toMatchObject({ status: 'complete', score: 6, total: 6 });
    expect(gradeQuiz(quiz, { provenance: 'looks', lighting: 'isolated', crop: '50', identity: 'recognised', agreement: 'totals', freeze: 'freeze' }, key))
      .toMatchObject({ status: 'complete', score: 2, total: 6 });
    expect(gradeQuiz(quiz, { provenance: 'looks', lighting: 'combined', crop: '0', identity: 'recognised', agreement: 'totals', freeze: 'filename' }, key))
      .toMatchObject({ status: 'complete', score: 0, total: 6 });
  });

  it('uses the correct quiz and illustration on the second tutorial without exposing solutions', () => {
    const html = readFileSync('dist/sessions/03-photo-assets/index.html', 'utf8');
    expect(html).toContain('id="photo-audit-quiz"');
    expect(html).toContain('The photo desk needs receipts');
    expect(html).toContain('/data/quizzes/photo-crop.svg');
    expect(html).not.toContain('The dashboard wants a victory lap');
    for (const entry of Object.values(key)) expect(html).not.toContain(entry.explanation);
    expect(JSON.parse(readFileSync('dist/data/quizzes/photo-audit.json', 'utf8'))).toEqual(key);
    expect(readFileSync('dist/sessions/02-platforms/index.html', 'utf8')).not.toContain('id="photo-audit-quiz"');
    expect(readFileSync('dist/sessions/04-bio-experiment/index.html', 'utf8')).not.toContain('data-tutorial-quiz');
  });
});
