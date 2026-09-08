// Literal expectations for new teaching cases. Real browser checks cover the
// completion gate and layout; these checks do not certify human agreement.
import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { gradeQuiz, unansweredQuestions } from '../src/lib/tutorial-quiz';
import { maintenanceAuditQuiz as quiz } from '../src/data/quizzes/maintenance-audit';
import { maintenanceAuditAnswers as key } from '../src/data/quizzes/maintenance-audit-answers';
import { startAgreement, stepAgreement, retentionPlan, checkManifest, restoreSnapshot, sha256 } from '../public/data/week-12-models.mjs';

const complete = { acknowledgements: 'distinct', expiry: 'half-open', copies: '5', ending: 'terminal', restore: 'snapshot', handover: 'scoped-evidence' };
const terms = { architecture: 'Independently agreed fictional shared planning scope',
  routine: 'An optional board-game plan; each meeting confirmed separately.', privacy: 'Share needed planning details only.' };
const changedTerms = { ...terms, routine: 'Offer optional activity choices; each participant can pass.' };
const start = (participants: string[]) => startAgreement({ id: 'quiz-agreement', version: 1, participants, acknowledgedBy: participants, terms });
const proposal = (actor: string, at: number, expiresAt: number, baseVersion = 1) => ({
  id: `p-${at}`, type: 'propose', at, actor, baseVersion, proposalId: `choices-${at}`, expiresAt, terms: changedTerms,
});
const accept = (actor: string, at: number, proposalAt: number, baseVersion = 1) => ({
  id: `${actor}-ack`, type: 'accept', at, actor, baseVersion, proposalId: `choices-${proposalAt}`,
});
const inventory = [
  { id: 'raw', owner: 'student', synthetic: true, purpose: 'Review synthetic trace', copies: ['notebook', 'export', 'backup'], retainUntil: 21, releaseDependency: false },
  { id: 'scratch', owner: 'student', synthetic: true, purpose: 'Temporary writing', copies: ['draft', 'backup'], retainUntil: 7, releaseDependency: false },
  { id: 'source', owner: 'student', synthetic: true, purpose: 'Reproduce release', copies: ['archive', 'backup'], retainUntil: 21, releaseDependency: true },
  { id: 'review', owner: 'student', synthetic: true, purpose: 'Review result', copies: ['review folder'], retainUntil: 22, releaseDependency: false },
  { id: 'other', owner: 'other', synthetic: true, purpose: 'Independently held record', copies: ['outside a', 'outside b'], retainUntil: 10, releaseDependency: false },
];

describe('the eleventh tutorial maintenance quiz', () => {
  it('withholds feedback for each missing case and rejects malformed responses', () => {
    for (const q of quiz.questions) expect(gradeQuiz(quiz, { ...complete, [q.id]: '' }, key))
      .toEqual({ status: 'incomplete', missing: [q.id] });
    for (const value of ['five', '5 copies', 'NaN', 'Infinity', '0x5']) {
      expect(unansweredQuestions(quiz, { ...complete, copies: value })).toEqual(['copies']);
    }
    expect(unansweredQuestions(quiz, { ...complete, ending: 'reopen' })).toEqual(['ending']);
    expect(unansweredQuestions(quiz, { ...complete, copies: '0' })).toEqual([]);
  });

  it('counts three distinct acknowledgements, ignores exact delivery duplicates and rejects the stale proposal', () => {
    const original = start(['M', 'N', 'O']), saved = structuredClone(original);
    const m = accept('M', 5, 4);
    let state = original;
    const versions: number[] = [];
    for (const event of [proposal('M', 4, 12), m, m, accept('N', 6, 4), accept('O', 8, 4)]) {
      state = stepAgreement(state, event).state;
      versions.push(state.current.version);
    }
    expect(versions).toEqual([1, 1, 1, 1, 2]);
    expect(state).toMatchObject({ phase: 'active', current: { version: 2, terms: changedTerms, acknowledgedBy: ['M', 'N', 'O'] }, pending: null });
    expect(state.events).toHaveLength(4);
    expect(state.history[0]).toMatchObject({ status: 'adopted', acceptedBy: ['M', 'N', 'O'] });
    expect(() => stepAgreement(state, { ...proposal('N', 9, 15), terms })).toThrow('Stale base version');
    const first = stepAgreement(stepAgreement(original, proposal('M', 4, 12)).state, m).state;
    expect(stepAgreement(first, m)).toMatchObject({ action: 'duplicate', state: first, sendsMessage: false });
    expect(() => stepAgreement(first, { ...m, id: 'another-id', at: 6 })).toThrow('once');
    expect(() => stepAgreement(first, { ...m, at: 6 })).toThrow('Conflicting');
    expect(() => stepAgreement(first, { ...accept('outsider', 6, 4) })).toThrow('participant');
    expect(original).toEqual(saved);
    expect(quiz.questions[0].evidence!.rows).toEqual([
      ['4', 'M proposes choices-v1'], ['5', 'M accepts · m-ack'], ['5', 'Exact duplicate of m-ack'], ['6', 'N accepts · n-ack'], ['8', 'O accepts · o-ack'],
    ]);
  });

  it('adopts at 27 but expires at exactly 28 without manufacturing refusal', () => {
    const pending = stepAgreement(stepAgreement(start(['U', 'V']), proposal('U', 20, 28)).state, accept('U', 21, 20)).state;
    const saved = structuredClone(pending);
    const before = stepAgreement(pending, accept('V', 27, 20));
    expect(before.state).toMatchObject({ phase: 'active', current: { version: 2, acknowledgedBy: ['U', 'V'] }, pending: null });
    for (const event of [accept('V', 28, 20), { id: 'clock', type: 'clock', at: 28 }]) {
      const result = stepAgreement(pending, event);
      expect(result).toMatchObject({ action: 'expired-without-adoption', sendsMessage: false,
        state: { phase: 'review', current: { version: 1, terms }, pending: null, endedBy: null, lastAt: 28 } });
      expect(result.state.history).toHaveLength(1);
      expect(result.state.history[0]).toMatchObject({ status: 'expired', acceptedBy: ['U'], closedAt: 28 });
      expect(result.state.events.at(-1)).toEqual(event);
    }
    const rejected = stepAgreement(pending, { ...accept('V', 27, 20), type: 'reject' }).state;
    expect(rejected.history[0].status).toBe('rejected');
    expect(() => stepAgreement(rejected, proposal('U', 28, 35))).toThrow('retry rejected terms');
    expect(pending).toEqual(saved);
    const svg = readFileSync('public/data/quizzes/maintenance-expiry.svg', 'utf8');
    expect(svg).toContain('Proposal window [20, 28)');
    expect(svg).toContain('A · V responds at 27');
    expect(svg).toContain('B · V responds at 28');
    expect(svg).toContain('Both branches: U accepts at 21');
  });

  it('counts five due own copies at day 21 and preserves dependency review and outside ownership', () => {
    const saved = structuredClone(inventory), plan = retentionPlan(inventory, 21);
    expect(plan.map((r: any) => r.action)).toEqual(['plan-delete-own-copies', 'plan-delete-own-copies', 'review-release-dependency', 'retain-for-purpose', 'outside-control']);
    const due = plan.filter((r: any) => r.action === 'plan-delete-own-copies');
    expect(due).toHaveLength(2);
    expect(due.reduce((sum: number, row: any) => sum + row.copies.length, 0)).toBe(5);
    expect(key.copies.answer).toBe(5);
    expect(plan.every((r: any) => !r.deletesFiles && !r.sendsRequest)).toBe(true);
    expect(retentionPlan(inventory, 20).map((r: any) => r.action)).toEqual(['retain-for-purpose', 'plan-delete-own-copies', 'retain-for-purpose', 'retain-for-purpose', 'outside-control']);
    expect(retentionPlan(inventory, 22)[3].action).toBe('plan-delete-own-copies');
    expect(inventory).toEqual(saved);
    expect(quiz.questions[2].evidence!.rows).toEqual([
      ['Raw traces / student', '3: notebook, export, backup', 'Day 21 / no'],
      ['Scratch notes / student', '2: draft, backup', 'Day 7 / no'],
      ['Source archive / student', '2: archive, backup', 'Day 21 / yes'],
      ['Review notes / student', '1: review folder', 'Day 22 / no'],
      ['Other copy / other', '2: outside workspace', 'Day 10 / no'],
    ]);
  });

  it('ends a partially accepted v2 change from a stale v1 screen and preserves the complete snapshot', () => {
    let state = start(['J', 'K']);
    for (const event of [proposal('J', 30, 40), accept('J', 31, 30), accept('K', 32, 30),
      { ...proposal('J', 33, 45, 2), terms }, { ...accept('J', 33, 33, 2), id: 'j-next' }]) {
      state = stepAgreement(state, event).state;
    }
    expect(state).toMatchObject({ current: { version: 2 }, pending: { acceptedBy: ['J'] } });
    const before = structuredClone(state);
    const ended = stepAgreement(state, { id: 'end', type: 'end', actor: 'K', at: 34, baseVersion: 1 }).state;
    expect(ended).toMatchObject({ phase: 'ended', endedBy: 'K', current: { version: 2, terms: changedTerms }, pending: null });
    expect(ended.history.at(-1)).toMatchObject({ status: 'cancelled-by-ending', acceptedBy: ['J'] });
    for (const event of [{ ...accept('K', 35, 33, 2), id: 'queued-k' }, { id: 'tick', type: 'clock', at: 36 },
      { id: 'restore-v1', type: 'restore', at: 37, actor: 'J', baseVersion: 1, terms }]) {
      expect(stepAgreement(ended, event)).toEqual({ state: ended, action: 'stop', sendsMessage: false });
    }
    expect(state).toEqual(before);
  });

  it('detects the new four-file fault in an actual Week 11 release and restores the unchanged evaluation', () => {
    const folder = mkdtempSync(join(tmpdir(), 'maintenance-quiz-'));
    try {
      const release = join(folder, 'trusted');
      execFileSync(process.execPath, ['dist/data/week-11-worked-examples.mjs', '--release-dir', release], { stdio: 'pipe' });
      const names = ['index.html', 'evaluation.json', 'manifest.json', 'README.txt'];
      const archive = Object.fromEntries(names.map(name => [name, readFileSync(join(release, name))]));
      const trusted = names.map(file => ({ file, sha256: sha256(archive[file]) }));
      const faultyReport = JSON.parse(archive['evaluation.json'].toString());
      faultyReport.primary.rank = 1;
      const working = { 'index.html': Buffer.from(archive['index.html']), 'evaluation.json': Buffer.from(JSON.stringify(faultyReport)), 'draft.txt': Buffer.from('stale draft') };
      expect(checkManifest(trusted, working)).toEqual({ ok: false, missing: ['manifest.json', 'README.txt'], changed: ['evaluation.json'], extra: ['draft.txt'] });
      expect(checkManifest(trusted, { ...working, ...archive })).toEqual({ ok: false, missing: [], changed: [], extra: ['draft.txt'] });
      const restored = restoreSnapshot(trusted, archive, working);
      expect(restored.after).toEqual({ ok: true, missing: [], changed: [], extra: [] });
      expect(Object.keys(restored.restored)).toEqual(names);
      for (const name of names) expect(restored.restored[name]).toEqual(readFileSync(join(release, name)));
      expect(restored.restored['index.html'].toString()).toContain('Fine to pass.');
      expect(restored.restored['index.html'].toString()).toContain('rank 2/100');
      const report = JSON.parse(restored.restored['evaluation.json'].toString());
      expect(report.primary).toMatchObject({ score: 93.75, rank: 2 });
      expect(report.sensitivity).toMatchObject({ score: 90, rank: 2 });
      expect(report.changedAvailability.releaseAllowed).toBe(false);
      expect(() => restoreSnapshot(trusted, { ...archive, 'evaluation.json': working['evaluation.json'] }, working)).toThrow('archive');
      expect(JSON.parse(working['evaluation.json'].toString()).primary.rank).toBe(1);
    } finally { rmSync(folder, { recursive: true, force: true }); }
  });

  it('grades full, mixed and entirely wrong valid attempts with equivalent numeric notation', () => {
    expect(gradeQuiz(quiz, { ...complete, copies: ' 5.0 ' }, key)).toMatchObject({ status: 'complete', score: 6, total: 6 });
    expect(gradeQuiz(quiz, { acknowledgements: 'deliveries', expiry: 'half-open', copies: '2', ending: 'version-gate', restore: 'copy-over', handover: 'scoped-evidence' }, key))
      .toMatchObject({ status: 'complete', score: 2, total: 6 });
    expect(gradeQuiz(quiz, { acknowledgements: 'deliveries', expiry: 'inclusive', copies: '0', ending: 'label-only', restore: 'new-baseline', handover: 'hash-browser' }, key))
      .toMatchObject({ status: 'complete', score: 0, total: 6 });
  });

  it('publishes one quiz on each of eleven tutorials and keeps new worked answers out of HTML', () => {
    const html = readFileSync('dist/sessions/12-maintenance/index.html', 'utf8');
    expect(html.includes('id="maintenance-audit-quiz"')).toBe(true);
    expect(html).toContain('The rollback restores too much');
    expect(html).toContain('/data/quizzes/maintenance-expiry.svg');
    for (const entry of Object.values(key)) expect(html).not.toContain(entry.explanation);
    expect(JSON.parse(readFileSync('dist/data/quizzes/maintenance-audit.json', 'utf8'))).toEqual(key);
    const tutorials = readdirSync('dist/sessions', { withFileTypes: true }).filter(entry => entry.isDirectory());
    expect(tutorials).toHaveLength(11);
    for (const entry of tutorials) {
      const page = readFileSync(`dist/sessions/${entry.name}/index.html`, 'utf8');
      expect([...page.matchAll(/id="[a-z-]+-audit-quiz"/g)], entry.name).toHaveLength(1);
      if (entry.name !== '12-maintenance') expect(page).not.toContain('id="maintenance-audit-quiz"');
    }
  });
});
