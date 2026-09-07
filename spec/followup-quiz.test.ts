// New arithmetic oracles were checked independently with exact fractions and
// all 99 CSV rows. The browser audit checks the quiz's gate and rendered layout.
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { gradeQuiz, unansweredQuestions } from '../src/lib/tutorial-quiz';
import { followupAuditQuiz as quiz } from '../src/data/quizzes/followup-audit';
import { followupAuditAnswers as key } from '../src/data/quizzes/followup-audit-answers';
import earlier from '../public/data/week-08-cases.json';
import week9 from '../public/data/week-09-cases.json';
import week5 from '../public/data/week-05-cases.json';
import week11 from '../public/data/week-11-cases.json';
import bio from '../public/data/week-04-bios.json';
import { venueDecision } from '../public/data/week-05-models.mjs';
import { startConversation, stepConversation } from '../public/data/week-07-models.mjs';
import { startReview } from '../public/data/week-08-models.mjs';
import { startHandover, stepHandover } from '../public/data/week-09-models.mjs';
import { startMeeting, stepMeeting, meetingForFollowUp } from '../public/data/week-10-models.mjs';
import { auditTime, benefitRate, dashboardSummary, observationAt, parseControls, evaluateFeatures,
  freezeCandidate, verifyFrozen, releaseHTML, sha256 } from '../public/data/week-11-models.mjs';

const complete = { cutoff: 'history', dashboard: 'denominators', rate: '3', ranking: 'common-weights', availability: 'fidelity', release: 'rendered' };
const controls = parseControls(readFileSync('public/data/null-island-controls.csv', 'utf8'));
const log = [{ id: 'out', start: 0, end: 15 }, { id: 'together', start: 15, end: 75 },
  { id: 'return', start: 85, end: 105 }, { id: 'compose', start: 105, end: 110 }];
const candidate = () => freezeCandidate({ ...week11.candidate, version: 'quiz-rc1', text: bio.repair });
function completedRecord() {
  const pending = earlier.priorEvents.reduce((s, e) => stepConversation(s, e).state, startConversation(earlier.handoff, 2));
  const review = startReview(stepConversation(pending, { id: 'quiz-reply', type: 'reply', at: 1 }).state);
  let handover = startHandover(review, week9.plan, week9.venues);
  for (const event of week9.proposalEvents) handover = stepHandover(handover, event).state;
  let meeting = startMeeting(handover);
  for (const event of [
    { id: 'arrival', type: 'arrive', at: 1040, actors: ['alex', 'counterpart'] },
    { id: 'bill', type: 'ask-bill', at: 1070, planVersion: week9.plan.version, billCents: 1200 },
    { id: 'ack-a', type: 'ack-bill', at: 1071, planVersion: week9.plan.version, actor: 'alex' },
    { id: 'ack-b', type: 'ack-bill', at: 1072, planVersion: week9.plan.version, actor: 'counterpart' },
    { id: 'quiz-a', type: 'next-date', at: 1080, actor: 'alex', response: 'agree' },
    { id: 'quiz-b', type: 'next-date', at: 1082, actor: 'counterpart', response: 'agree' },
    { id: 'quiz-withdraw', type: 'next-date', at: 1084, actor: 'counterpart', response: 'decline' },
    { id: 'leave', type: 'leave', at: 1088, actor: 'alex' },
  ]) meeting = stepMeeting(meeting, event).state;
  return meetingForFollowUp(meeting);
}

describe('the tenth tutorial follow-up quiz', () => {
  it('withholds feedback for every missing or malformed response', () => {
    for (const q of quiz.questions) {
      expect(gradeQuiz(quiz, { ...complete, [q.id]: '' }, key)).toEqual({ status: 'incomplete', missing: [q.id] });
    }
    expect(unansweredQuestions(quiz, { ...complete, rate: '3%' })).toEqual(['rate']);
    expect(unansweredQuestions(quiz, { ...complete, cutoff: 'invented' })).toEqual(['cutoff']);
    expect(unansweredQuestions(quiz, { ...complete, rate: '0' })).toEqual([]);
  });

  it('reconstructs the new exact cutoffs without overwriting withdrawal or source history', () => {
    const record = completedRecord();
    const saved = structuredClone(record);
    expect(record).toMatchObject({ nextDate: 'declined', meeting: 'ended', bill: 'acknowledged' });
    expect(observationAt(record, 1080)).toMatchObject({ label: 'unobserved', evidenceIds: [] });
    expect(observationAt(record, 1082)).toMatchObject({ label: 'pending', evidenceIds: ['quiz-a'], latestLabel: 'declined', source: saved });
    expect(observationAt(record, 1084)).toMatchObject({ label: 'agreed', evidenceIds: ['quiz-a', 'quiz-b'], latestLabel: 'declined', source: saved });
    expect(observationAt(record, 1085)).toMatchObject({ label: 'declined', evidenceIds: ['quiz-a', 'quiz-b', 'quiz-withdraw'] });
    expect(record).toEqual(saved);
    expect(quiz.questions[0].evidence!.rows).toEqual([
      ['1080', 'Alex agrees'], ['1082', 'Counterpart agrees'], ['1084', 'Counterpart withdraws'], ['1088', 'Alex leaves'],
    ]);
  });

  it('keeps all 16 new dashboard records and leaves an empty resolved rate undefined', () => {
    const labels = [...Array(5).fill('agreed'), ...Array(3).fill('declined'), ...Array(6).fill('pending'), ...Array(2).fill('unobserved')];
    const result = dashboardSummary(labels.map((label, i) => ({ id: `quiz-${i}`, label })));
    expect(result).toEqual({ counts: { agreed: 5, declined: 3, pending: 6, unobserved: 2 }, total: 16, resolved: 8,
      agreedAmongAll: 0.3125, agreedAmongResolved: 0.625 });
    expect(quiz.questions[1].evidence!.rows).toEqual([['Agreed', '5'], ['Declined', '3'], ['Pending', '6'], ['Unobserved', '2']]);
    expect(dashboardSummary([{ id: 'p', label: 'pending' }, { id: 'u', label: 'unobserved' }])).toMatchObject({ agreedAmongAll: 0, agreedAmongResolved: null });
  });

  it('separates 100 activity-minutes from a 110-minute elapsed span and converts units', () => {
    const saved = structuredClone(log);
    expect(auditTime(log)).toEqual({ totalMinutes: 100, elapsedMinutes: 110, unallocatedMinutes: 10 });
    expect(benefitRate(5, 100)).toBe(0.05);
    expect(benefitRate(5, 100 / 60)).toBe(3);
    expect(benefitRate(5, 110 / 60)).toBeCloseTo(30 / 11, 12);
    expect(benefitRate(5, 0)).toBeNull();
    expect(() => auditTime([...log, { id: 'overlap', start: 100, end: 105 }])).toThrow('Overlapping');
    expect(log).toEqual(saved);
    expect(key.rate.answer).toBe(3);
  });

  it('scores the new probe and every control on the same scale, including all ties', () => {
    const saved = structuredClone(controls);
    const primary = evaluateFeatures([2, 3, 4, 3], controls);
    const weighted = evaluateFeatures([2, 3, 4, 3], controls, 2);
    expect(primary).toMatchObject({ score: 75, above: 4, tied: 6, rank: 11, entries: 100 });
    expect(weighted).toMatchObject({ score: 80, above: 1, tied: 4, rank: 6, entries: 100 });
    expect(weighted.scoredControls).toHaveLength(99);
    expect(weighted.scoredControls.at(-1)).toEqual({ id: 'control-099', score: 95 });
    expect(1 + primary.scoredControls.filter(c => c.score >= weighted.score).length).toBe(5);
    expect(quiz.questions[3].evidence!.rows).toEqual([['Primary', '4', '6'], ['Double feasibility', '1', '4']]);
    expect(controls).toEqual(saved);
  });

  it('accepts the exact 100-minute route while preserving the contradictory frozen wording', () => {
    const library = week5.venues.find(v => v.id === 'library');
    expect(venueDecision(library, 100)).toMatchObject({ minutes: 100, costCents: 1400, spareMinutes: 0, feasible: true, reasons: [] });
    expect(venueDecision(library, 99)).toMatchObject({ spareMinutes: -1, feasible: false, reasons: ['time'] });
    const frozen = candidate();
    expect(verifyFrozen(frozen).text).toContain('Meet Friday 5-7 pm: bus-friendly, $20 total.');
    const edited = structuredClone(frozen);
    edited.snapshot.text = edited.snapshot.text.replace('5-7 pm', '5-6:40 pm');
    expect(() => verifyFrozen(edited)).toThrow('changed');
    expect(verifyFrozen(frozen).text).toBe(bio.repair);
  });

  it('retains frozen text and evaluation through deterministic release generation', () => {
    const frozen = candidate();
    const result = evaluateFeatures(frozen.snapshot.features, controls);
    const before = structuredClone({ frozen, result });
    const first = releaseHTML(frozen, result), second = releaseHTML(frozen, result);
    expect(first).toBe(second);
    expect(sha256(first)).toBe(sha256(second));
    expect(first).toContain(`<p id="candidate-text">${bio.repair}</p>`);
    expect(first).toContain('Fictional teaching example · quiz-rc1');
    expect(first).toContain('rank 2/100');
    expect({ frozen, result }).toEqual(before);
    const altered = structuredClone(frozen);
    altered.snapshot.features[2] = 4;
    expect(() => releaseHTML(altered, result)).toThrow('changed');
  });

  it('grades wrong but valid attempts and equivalent numeric notation', () => {
    expect(gradeQuiz(quiz, { ...complete, rate: ' 3.0 ' }, key)).toMatchObject({ status: 'complete', score: 6, total: 6 });
    expect(gradeQuiz(quiz, { cutoff: 'include-edge', dashboard: 'denominators', rate: '0.05', ranking: 'drop-ties', availability: 'route-only', release: 'rendered' }, key))
      .toMatchObject({ status: 'complete', score: 2, total: 6 });
    expect(gradeQuiz(quiz, { cutoff: 'include-edge', dashboard: 'recode', rate: '0', ranking: 'drop-ties', availability: 'route-only', release: 'hash-proof' }, key))
      .toMatchObject({ status: 'complete', score: 0, total: 6 });
  });

  it('publishes the tenth quiz and diagram without worked answers in the page', () => {
    const html = readFileSync('dist/sessions/11-follow-up/index.html', 'utf8');
    expect(html.includes('id="followup-audit-quiz"')).toBe(true);
    expect(html).toContain('The dashboard congratulates itself');
    expect(html).toContain('/data/quizzes/followup-time-log.svg');
    for (const entry of Object.values(key)) expect(html).not.toContain(entry.explanation);
    expect(JSON.parse(readFileSync('dist/data/quizzes/followup-audit.json', 'utf8'))).toEqual(key);
    for (const slug of ['02-platforms', '03-photo-assets', '04-bio-experiment', '05-match-probability', '06-message-tree', '07-communication', '08-threat-model', '09-offline-handover', '10-date-simulation', '12-maintenance']) {
      expect(readFileSync(`dist/sessions/${slug}/index.html`, 'utf8')).not.toContain('id="followup-audit-quiz"');
    }
  });
});
