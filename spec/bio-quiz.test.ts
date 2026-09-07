import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { gradeQuiz, unansweredQuestions } from '../src/lib/tutorial-quiz';
import { bioAuditQuiz as quiz } from '../src/data/quizzes/bio-audit';
import { bioAuditAnswers as key } from '../src/data/quizzes/bio-audit-answers';
import { analyseBio } from '../public/data/week-04-text.mjs';

const complete = { budget: 'codepoints', revision: 'supported', coverage: '75', exposure: 'weighted', uncertainty: 'units', protocol: 'prespecified' };

describe('the third tutorial bio quiz', () => {
  it('withholds every answer when any case lacks a valid response', () => {
    for (const question of quiz.questions) {
      expect(gradeQuiz(quiz, { ...complete, [question.id]: '' }, key))
        .toEqual({ status: 'incomplete', missing: [question.id] });
    }
    expect(unansweredQuestions(quiz, { ...complete, coverage: '75%' })).toEqual(['coverage']);
    expect(unansweredQuestions(quiz, { ...complete, coverage: '0' })).toEqual([]);
  });

  it('agrees with the taught tokenizer and literal exposure calculations for the new cases', () => {
    const boundary = 'a'.repeat(148) + '\u{1F680}' + ' ';
    expect(boundary.length).toBe(151);
    expect(analyseBio(boundary).codePoints).toBe(150);
    const coverage = analyseBio('partner-in-crime tonight', ['partner in crime', 'in crime']);
    expect(coverage.tokens).toEqual(['partner', 'in', 'crime', 'tonight']);
    expect(coverage.matchedIndices).toEqual([0, 1, 2]);
    expect(coverage.tokenShare).toBe(0.75);
    expect(key.coverage.answer).toBe(75);
    const revision = quiz.questions.find(question => question.id === 'revision')!;
    if (revision.type !== 'choice') throw new Error('Revision requires candidate choices');
    for (const option of revision.options) expect(analyseBio(option.text).withinBudget, option.id).toBe(true);

    const rows = quiz.questions.find(question => question.id === 'exposure')!.evidence!.rows;
    const cells = rows.map(row => row.slice(1).map(cell => cell.split('/').map(Number)));
    const rates = cells.map(row => row.map(([positives, exposures]) => positives / exposures));
    expect(rates).toEqual([[0.6, 0.7], [0.1, 0.2]]);
    expect(cells.map(row => row[0][0]).reduce((a, b) => a + b, 0)).toBe(38);
    expect(cells.map(row => row[1][0]).reduce((a, b) => a + b, 0)).toBe(26);
    for (const arm of [0, 1]) expect(cells.reduce((sum, row) => sum + row[arm][1], 0)).toBe(80);
    expect(0.5 * rates[0][0] + 0.5 * rates[1][0]).toBeCloseTo(0.35, 12);
    expect(0.5 * rates[0][1] + 0.5 * rates[1][1]).toBeCloseTo(0.45, 12);
    expect(key.exposure.answer).toBe('weighted');
    expect(key.uncertainty.answer).toBe('units');
  });

  it('grades wrong but valid attempts and accepts equivalent numeric notation', () => {
    expect(gradeQuiz(quiz, { ...complete, coverage: ' 75.0 ' }, key)).toMatchObject({ status: 'complete', score: 6, total: 6 });
    expect(gradeQuiz(quiz, { budget: 'utf16', revision: 'supported', coverage: '125', exposure: 'pooled-cause', uncertainty: 'relative-six', protocol: 'prespecified' }, key))
      .toMatchObject({ status: 'complete', score: 2, total: 6 });
    expect(gradeQuiz(quiz, { budget: 'utf16', revision: 'car', coverage: '0', exposure: 'pooled-cause', uncertainty: 'relative-six', protocol: 'repeat-views' }, key))
      .toMatchObject({ status: 'complete', score: 0, total: 6 });
  });

  it('publishes the third quiz with its own examples and no worked solutions in the page', () => {
    const html = readFileSync('dist/sessions/04-bio-experiment/index.html', 'utf8');
    expect(html).toContain('id="bio-audit-quiz"');
    expect(html).toContain('The bio lab has a premature winner');
    expect(html).toContain('/data/quizzes/bio-tokens.svg');
    expect(html).not.toContain('The crop looks good. The metadata would like a word.');
    for (const entry of Object.values(key)) expect(html).not.toContain(entry.explanation);
    expect(JSON.parse(readFileSync('dist/data/quizzes/bio-audit.json', 'utf8'))).toEqual(key);
    for (const slug of ['02-platforms', '03-photo-assets', '05-match-probability']) {
      expect(readFileSync(`dist/sessions/${slug}/index.html`, 'utf8')).not.toContain('id="bio-audit-quiz"');
    }
  });
});
