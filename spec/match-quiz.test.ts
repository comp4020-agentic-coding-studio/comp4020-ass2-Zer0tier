import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { gradeQuiz, unansweredQuestions } from '../src/lib/tutorial-quiz';
import { matchAuditQuiz as quiz } from '../src/data/quizzes/match-audit';
import { matchAuditAnswers as key } from '../src/data/quizzes/match-audit-answers';
import { pairSummary, mutualProbability, independentOpportunities, venueDecision, windowRate } from '../public/data/week-05-models.mjs';
import { qualityScore, conservativeRank } from '../src/lib/romance-models';

const complete = { conditional: 'reverse', dependence: 'shared-draw', joint: '12', venue: 'studio', windows: 'denominators', benchmark: 'conservative' };

describe('the fourth tutorial match quiz', () => {
  it('withholds all feedback if any case lacks a valid response', () => {
    for (const question of quiz.questions) {
      expect(gradeQuiz(quiz, { ...complete, [question.id]: '' }, key))
        .toEqual({ status: 'incomplete', missing: [question.id] });
    }
    expect(unansweredQuestions(quiz, { ...complete, joint: '12%' })).toEqual(['joint']);
    expect(unansweredQuestions(quiz, { ...complete, joint: '0' })).toEqual([]);
  });

  it('checks new probability, constraint and benchmark fixtures against literal results', () => {
    const rows = quiz.questions.find(question => question.id === 'conditional')!.evidence!.rows;
    const [both, aOnly, bOnly, neither] = rows.flatMap(row => row.slice(1).map(Number));
    expect(pairSummary({ both, aOnly, bOnly, neither })).toMatchObject({ total: 200, pAGivenB: 0.2, pBGivenA: 0.4, joint: 0.1 });
    expect(mutualProbability(0.4, 0.3)).toBe(0.12);
    expect(key.joint.answer).toBe(12);
    const independent = independentOpportunities(Array(10).fill(0.1));
    expect(independent.expected).toBeCloseTo(1, 12);
    expect(independent.atLeastOne).toBeCloseTo(0.6513215599, 12);
    const studio = { outboundMinutes: 25, meetingMinutes: 65, returnMinutes: 30, transportCents: 700, activityCents: 1300 };
    expect(venueDecision(studio)).toMatchObject({ minutes: 120, costCents: 2000, feasible: true, spareMinutes: 0, spareCents: 0 });
    expect(venueDecision({ ...studio, outboundMinutes: 20, returnMinutes: 36, activityCents: 1200 }).reasons).toEqual(['time']);
    expect(venueDecision({ ...studio, outboundMinutes: 15, meetingMinutes: 60, returnMinutes: 20, activityCents: 1301 }).reasons).toEqual(['budget']);
    expect(windowRate(18, 120)).toBe(0.15);
    expect(windowRate(8, 40)).toBe(0.2);
    const score = qualityScore([4, 3, 3, 3]);
    const controls = readFileSync('public/data/null-island-controls.csv', 'utf8').trim().split('\n').slice(1)
      .map(row => qualityScore(row.split(',').slice(1).map(Number)));
    expect(controls).toHaveLength(99);
    expect(score).toBe(81.25);
    expect(controls.filter(value => value > score)).toHaveLength(1);
    expect(controls.filter(value => value === score)).toHaveLength(3);
    expect(controls.filter(value => value < score)).toHaveLength(95);
    expect(conservativeRank(score, controls)).toBe(5);
  });

  it('grades complete attempts without requiring correct responses for completion', () => {
    expect(gradeQuiz(quiz, { ...complete, joint: ' 12.0 ' }, key)).toMatchObject({ status: 'complete', score: 6, total: 6 });
    expect(gradeQuiz(quiz, { conditional: 'forward', dependence: 'shared-draw', joint: '40', venue: 'atrium', windows: 'count-winner', benchmark: 'conservative' }, key))
      .toMatchObject({ status: 'complete', score: 2, total: 6 });
    expect(gradeQuiz(quiz, { conditional: 'forward', dependence: 'guaranteed', joint: '0', venue: 'atrium', windows: 'count-winner', benchmark: 'discard-ties' }, key))
      .toMatchObject({ status: 'complete', score: 0, total: 6 });
  });

  it('publishes the fourth quiz with its own diagram and no worked solutions in the page', () => {
    const html = readFileSync('dist/sessions/05-match-probability/index.html', 'utf8');
    expect(html).toContain('id="match-audit-quiz"');
    expect(html).toContain('The match forecast needs an audit');
    expect(html).toContain('/data/quizzes/match-path.svg');
    for (const entry of Object.values(key)) expect(html).not.toContain(entry.explanation);
    expect(JSON.parse(readFileSync('dist/data/quizzes/match-audit.json', 'utf8'))).toEqual(key);
    for (const slug of ['02-platforms', '03-photo-assets', '04-bio-experiment', '06-message-tree']) {
      expect(readFileSync(`dist/sessions/${slug}/index.html`, 'utf8')).not.toContain('id="match-audit-quiz"');
    }
  });
});
