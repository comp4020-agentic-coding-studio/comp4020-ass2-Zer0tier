// Literal teaching and state-transition oracles. Browser audits separately test
// visible stages, keyboard focus, imports/exports and layout. These checks do
// not establish causal inference, actual release integrity or teaching quality.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { comparison, parseExposures, initialChoices, experimentFeedback, makeExperimentRecord, readExperimentRecord, recordFragment, recordFromFragment, startRelease, sampleRecord, repairRelease, auditRelease, decideRelease, checkRelease, frozenPhoto, atrium, type Repair } from '../src/lib/evidence-journey';

const supported = () => ({ ...sampleRecord().choices, conclusion: 'unknown' as const });
const repaired = () => (['limit-claim', 'restore-photo', 'restore-plan'] as Repair[]).reduce(repairRelease, startRelease());

describe('the evidence that travels from Week 4 to Week 12', () => {
  it('reproduces the reversal and separates the hypothetical shared weighting', () => {
    expect(comparison()).toEqual([
      { variant: 'A', exposures: 100, positives: 26, rate: .26, northShare: .8, standardised: .2 },
      { variant: 'B', exposures: 100, positives: 19, rate: .19, northShare: .2, standardised: .25 },
    ]);
    const csv = readFileSync('public/data/bio-exposures.csv', 'utf8');
    expect(parseExposures(csv).map(row => row.rate)).toEqual([.3, .35, .1, .15]);
    for (const bad of [csv.replace('South,B,80,12', 'North,A,80,12'), csv.replace('South,B,80,12', ''), csv.replace('80,24', '0,24'), csv.replace('80,24', '80,81'), csv.replace('80,24', '80,-1'), csv.replace('80,24', '8e1,24')]) expect(() => parseExposures(bad)).toThrow();
  });

  it('accepts uncertainty and keeps hypothetical photo changes out of observed evidence', () => {
    expect(experimentFeedback(supported())).toEqual([]);
    for (const conclusion of ['causal-a', 'causal-b'] as const) expect(experimentFeedback({ ...supported(), conclusion })[0]).toContain('does not establish a text effect');
    expect(experimentFeedback({ ...supported(), risks: ['mix', 'allocation', 'identity', 'photo'] })).toEqual(['Remove the invented photo-change observation. The CSV does not record photos.']);
    expect(experimentFeedback(initialChoices())).toHaveLength(7);
  });

  it('carries an imperfect note without promoting it into a verified conclusion', () => {
    const choices = initialChoices(), record = makeExperimentRecord(choices);
    expect(recordFromFragment(recordFragment(record))).toEqual(record);
    expect(readExperimentRecord(JSON.stringify(record))).toEqual(record);
    expect(record.choices).toMatchObject({ prediction: 'unknown', conclusion: 'causal-a', risks: [] });
    choices.risks.push('mix');
    expect(record.choices.risks).toEqual([]);
    const release = startRelease(record);
    expect(checkRelease(release).map(check => [check.id, check.ok])).toEqual([['claim', false], ['photo', false], ['plan', false]]);
  });

  it('rejects changed evidence, extra executable state, unknown choices and oversized imports', () => {
    const raw = JSON.stringify(sampleRecord());
    for (const edit of [
      (r: any) => { r.schema = 'other'; }, (r: any) => { r.fictional = false; },
      (r: any) => { r.observations[0].positives = 25; }, (r: any) => { r.observations.pop(); },
      (r: any) => { r.audit = { ok: true }; }, (r: any) => { r.choices.conclusion = '<script>'; },
      (r: any) => { r.choices.risks = ['mix', 'mix']; }, (r: any) => { r.choices.photo = null; },
      (r: any) => { r.choices = null; }, (r: any) => { r.choices.prediction = 'C'; },
    ]) { const value = JSON.parse(raw); edit(value); expect(() => readExperimentRecord(JSON.stringify(value))).toThrow(); }
    for (const invalid of ['not JSON', 'null', '[]', '{}', ' '.repeat(10001)]) expect(() => readExperimentRecord(invalid)).toThrow();
    expect(recordFromFragment('')).toBeNull();
    for (const fragment of ['#anything', '#experiment=%E0%A4%A', '#experiment=' + 'x'.repeat(30001)]) expect(() => recordFromFragment(fragment)).toThrow();
  });

  it('preserves received evidence and prediction when the later conclusion is corrected', () => {
    const received = sampleRecord();
    const before = startRelease(received), next = repairRelease(before, 'limit-claim');
    expect(received.choices.conclusion).toBe('causal-a');
    expect(before.record.choices.conclusion).toBe('causal-a');
    expect(next.record.choices).toEqual({ ...received.choices, conclusion: 'unknown' });
    expect(checkRelease(next).map(check => check.ok)).toEqual([true, false, false]);
    expect(next.history[1]).toContain('Revised the source conclusion to unknown');
  });

  it('holds cosmetic and unsupported repairs, including changing the causal winner', () => {
    let state = startRelease();
    for (const action of ['swap-winner', 'rename-photo', 'raise-budget'] as Repair[]) state = repairRelease(state, action);
    expect(checkRelease(state).map(check => check.ok)).toEqual([false, false, false]);
    expect(decideRelease(auditRelease(state), 'ready').decision).toBe('held');
    expect(() => repairRelease(state, 'invent' as Repair)).toThrow();
  });

  it('requires all repairs and an actual current run before marking the rehearsal ready', () => {
    expect(decideRelease(startRelease(), 'ready').decision).toBe('held');
    expect(checkRelease(repaired()).map(check => check.ok)).toEqual([true, true, true]);
    expect(decideRelease(repaired(), 'ready').decision).toBe('held');
    const checked = auditRelease(repaired());
    expect(checked.audit?.revision).toBe(3);
    expect(decideRelease(checked, 'ready').decision).toBe('ready');
    expect(decideRelease(checked, 'hold').decision).toBe('held');
  });

  it('expires the check and decision after any edit and rejects forged stale approval', () => {
    const green = decideRelease(auditRelease(repaired()), 'ready');
    const changed = repairRelease(green, 'raise-budget');
    expect(changed).toMatchObject({ revision: 4, audit: null, decision: 'unreviewed' });
    expect(decideRelease(changed, 'ready').decision).toBe('held');
    expect(green.decision).toBe('ready');
    const forged = { ...changed, audit: { ...green.audit!, revision: 4 } };
    expect(decideRelease(forged, 'ready').decision).toBe('held');
    expect(decideRelease({ ...green, revision: 100 }, 'ready').decision).toBe('held');
  });

  it('keeps the exact earlier references and distinguishes proposal from confirmation', () => {
    expect(frozenPhoto).toMatchObject({ revision: 'A-portrait-v1', file: 'photo-a-crop.svg', crop: { x: 150, y: 0, width: 300, height: 400 }, sha256: 'e210d94c86f7ca5195b36d364df32f19b927a768563de6a674b64f318c1e8d33' });
    expect(atrium.transportCents + atrium.activityCents).toBe(1400);
    expect(atrium.outboundMinutes + atrium.meetingMinutes + atrium.returnMinutes).toBe(90);
    expect(checkRelease(repaired())[2].evidence).toContain('requiring its own confirmation');
    const state = repaired(); state.record.choices.photo = 'change';
    expect(experimentFeedback(state.record.choices)).toHaveLength(1);
    // Fixing the release's references does not fabricate a completed trial.
    expect(state.record.choices.photo).toBe('change');
  });

  it('links both investigations into their taught preparation and existing assessments', () => {
    for (const [path, target] of [
      ['src/content/sessions/04-bio-experiment.md', '/experiment-that-lied/'],
      ['src/content/sessions/12-maintenance.md', '/release-day/'],
      ['src/content/assessments/market-report.md', '/experiment-that-lied/'],
      ['src/content/assessments/profile-deployment.md', '/release-day/'],
    ]) expect(readFileSync(path, 'utf8')).toContain(target);
    const experiment = readFileSync('dist/experiment-that-lied/index.html', 'utf8');
    const release = readFileSync('dist/release-day/index.html', 'utf8');
    expect(experiment).toContain('Investigate on paper');
    expect(release).toContain('Review the release on paper');
    expect(release).toContain('It does not hash, change or deploy');
  });
});
