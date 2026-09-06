// Literal numerical and boundary oracles. Browser geometry and the validity
// of modelling assumptions require separate review, not source-text matches.
import { readFileSync, mkdtempSync, cpSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';
import { mutualProbability, pairSummary, independentOpportunities, venueDecision, windowRate } from '../public/data/week-05-models.mjs';

describe('Week 5 reproducible match model', () => {
  it('keeps joint, marginal and directional conditional denominators distinct', () => {
    const result = pairSummary({ both: 6, aOnly: 24, bOnly: 7, neither: 63 });
    expect(result.total).toBe(100);
    expect(result.pA).toBe(0.3);
    expect(result.pB).toBe(0.13);
    expect(result.pBGivenA).toBe(0.2);
    expect(result.pAGivenB).toBeCloseTo(0.461538461538, 11);
    expect(result.joint).toBe(0.06);
    expect(mutualProbability(0.3, 0.2)).toBe(0.06);
    expect(pairSummary({ both: 0, aOnly: 0, bOnly: 2, neither: 8 }).pBGivenA).toBeNull();
    expect(pairSummary({ both: 0, aOnly: 2, bOnly: 0, neither: 8 }).pAGivenB).toBeNull();
    expect(() => pairSummary({ both: 0, aOnly: 0, bOnly: 0, neither: 0 })).toThrow();
    for (const value of [-1, 0.5, NaN, Infinity, Number.MAX_SAFE_INTEGER]) {
      expect(() => pairSummary({ both: value, aOnly: 1, bOnly: 0, neither: 0 })).toThrow();
    }
  });

  it('reproduces independent complements, unequal probabilities and empty/endpoint cases', () => {
    const result = independentOpportunities(Array(20).fill(0.06));
    expect(result.expected).toBeCloseTo(1.2, 12);
    expect(result.none).toBeCloseTo(0.290106241131, 11);
    expect(result.atLeastOne).toBeCloseTo(0.709893758869, 11);
    const unequal = independentOpportunities([...Array(10).fill(0.02), ...Array(10).fill(0.1)]);
    expect(unequal.expected).toBeCloseTo(1.2, 12);
    expect(unequal.atLeastOne).toBeCloseTo(0.715104328246, 11);
    expect(independentOpportunities([])).toEqual({ expected: 0, none: 1, atLeastOne: 0 });
    expect(independentOpportunities([0, 0])).toEqual({ expected: 0, none: 1, atLeastOne: 0 });
    expect(independentOpportunities([1, 1])).toEqual({ expected: 2, none: 0, atLeastOne: 1 });
    expect(independentOpportunities([0, 1])).toEqual({ expected: 1, none: 0, atLeastOne: 1 });
    expect(independentOpportunities([1e-20]).atLeastOne).toBeCloseTo(1e-20, 30);
    for (const value of [-0.01, 1.01, NaN, Infinity, '0.5']) {
      expect(() => mutualProbability(value, 0.2)).toThrow();
      expect(() => mutualProbability(0.3, value)).toThrow();
      expect(() => independentOpportunities([value])).toThrow();
    }
    expect(() => independentOpportunities(Array(2))).toThrow();
  });

  it('includes return travel, compares both constraints and accepts exact boundaries', () => {
    const boundary = { outboundMinutes: 30, meetingMinutes: 60, returnMinutes: 30, transportCents: 600, activityCents: 1400 };
    expect(venueDecision(boundary)).toEqual({ minutes: 120, costCents: 2000, spareMinutes: 0, spareCents: 0, feasible: true, reasons: [] });
    expect(venueDecision({ ...boundary, returnMinutes: 31 }).reasons).toEqual(['time']);
    expect(venueDecision({ ...boundary, activityCents: 1401 }).reasons).toEqual(['budget']);
    expect(venueDecision({ ...boundary, returnMinutes: 31, activityCents: 1401 }).reasons).toEqual(['time', 'budget']);
    expect(() => venueDecision({ ...boundary, outboundMinutes: -1 })).toThrow();
    expect(() => venueDecision({ ...boundary, activityCents: 1400.1 })).toThrow();
    expect(windowRate(8, 40)).toBe(0.2);
    expect(windowRate(3, 10)).toBe(0.3);
    expect(windowRate(0, 10)).toBe(0);
    expect(windowRate(0, 0)).toBeNull();
    for (const [matches, exposures] of [[1, 0], [11, 10], [-1, 10], [1.5, 10], [1, Infinity]]) {
      expect(() => windowRate(matches, exposures)).toThrow();
    }
  });

  it('runs the complete built download offline, including the unchanged control scorer', () => {
    const directory = mkdtempSync(join(tmpdir(), 'slop1276-match-'));
    try {
      for (const file of ['week-05-cases.json', 'week-05-models.mjs', 'week-05-worked-examples.mjs', 'romance-models.mjs', 'null-island-controls.csv']) {
        cpSync(join('dist/data', file), join(directory, file));
      }
      const run = () => execFileSync(process.execPath, [join(directory, 'week-05-worked-examples.mjs')], { cwd: tmpdir(), encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
      const report = JSON.parse(run());
      expect(report.pair.joint).toBe(0.06);
      expect(report.sharedShock).toEqual({ expected: 1.2, atLeastOne: 0.06, none: 0.94 });
      expect(report.venues.map((v: { feasible: boolean }) => v.feasible)).toEqual([true, false, false]);
      expect(report.windows.map((w: { rate: number }) => w.rate)).toEqual([0.2, 0.3]);
      expect(report.sensitivity.map((s: { joint: number }) => s.joint)).toEqual([0.03, 0.06, 0.12]);
      expect(report.benchmark.entries).toBe(100);
      expect(report.benchmark.examples.map((e: { score: number; rank: number }) => [e.score, e.rank])).toEqual([[93.75, 2], [100, 1]]);
      const path = join(directory, 'null-island-controls.csv');
      const original = readFileSync(path, 'utf8');
      const lines = original.trim().split('\n');
      writeFileSync(path, [...lines.slice(0, -1), lines[1]].join('\n'));
      expect(run).toThrow('unique ID');
      writeFileSync(path, lines.slice(0, -1).join('\n'));
      expect(run).toThrow('99 controls');
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
});
