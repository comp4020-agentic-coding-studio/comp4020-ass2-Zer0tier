// Literal text/arithmetic oracles, not prose-quality or layout assertions.
// The built download is run independently of the website and its working dir.
import { readFileSync, mkdtempSync, cpSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';
import { analyseBio } from '../public/data/week-04-text.mjs';

describe('Week 4 reproducible bio exercises', () => {
  it('counts original code points at the boundary without trimming or normalising', () => {
    expect(analyseBio('a'.repeat(150)).withinBudget).toBe(true);
    expect(analyseBio('a'.repeat(150) + ' ').withinBudget).toBe(false);
    const astral = analyseBio('a'.repeat(149) + '\u{1F600}');
    expect(astral.codePoints).toBe(150);
    expect(astral.withinBudget).toBe(true);
    expect(analyseBio('\u00E9').codePoints).toBe(1);
    expect(analyseBio('e\u0301').codePoints).toBe(2);
  });

  it('traces exact phrase coverage, overlap, missed meaning and empty denominators', () => {
    const result = analyseBio('Looking for a partner in crime');
    expect(result.tokens).toEqual(['looking', 'for', 'a', 'partner', 'in', 'crime']);
    expect(result.matchedIndices).toEqual([3, 4, 5]);
    expect(result.tokenShare).toBe(0.5);
    expect(analyseBio('Must love dogs; partner-in-crime.').tokenShare).toBe(1);
    expect(analyseBio('partner in crime', ['partner in crime', 'in crime', 'in crime']).matchedTokens).toBe(3);
    expect(analyseBio('partner in crime partner in crime').matchedTokens).toBe(6);
    expect(analyseBio('No partner in crime').matchedTokens).toBe(3);
    expect(analyseBio('partners in crime').matchedTokens).toBe(0);
    expect(analyseBio("Let's meet 5-7").tokens).toEqual(['let', 's', 'meet', '5', '7']);
    expect(analyseBio('東京').tokens).toEqual([]); // Explicit ASCII scope, not multilingual segmentation.
    expect(analyseBio('!!!').tokenShare).toBeNull();
    expect(analyseBio('').withinBudget).toBe(true);
    expect(analyseBio('').tokenShare).toBeNull();
    expect(() => analyseBio('text', ['!!!'])).toThrow();
  });

  it('reproduces the published texts, reversal, weighting and separate uncertainty examples', () => {
    const report = JSON.parse(execFileSync(process.execPath, ['dist/data/week-04-worked-examples.mjs'], { encoding: 'utf8' }));
    expect([report.texts.A.codePoints, report.texts.B.codePoints, report.repair.codePoints]).toEqual([80, 101, 103]);
    expect(report.texts.A.tokenShare).toBeCloseTo(0.214285714286, 10);
    expect(report.reversal.rows.map((row: { rate: number }) => row.rate)).toEqual([0.3, 0.35, 0.1, 0.15]);
    expect(report.reversal.pooled.A.rate).toBe(0.26);
    expect(report.reversal.pooled.B.rate).toBe(0.19);
    expect(report.reversal.northShare).toEqual({ A: 0.8, B: 0.2 });
    expect(report.reversal.standardised).toEqual({ A: 0.2, B: 0.25 });
    expect(report.balanced.difference).toBeCloseTo(0.02, 12);
    expect(report.balanced.nullRate).toBe(0.13);
    expect(report.balanced.nullSE).toBeCloseTo(0.0150399468084, 12);
    expect(report.balanced.z).toBeCloseTo(1.329791937084, 10);
    expect(report.balanced.relativeChange).toBeCloseTo(0.166666666667, 10);
    expect(report.largerFixture.z).toBeCloseTo(4.205171335312, 10);
  });

  it('runs the five-file download offline and rejects corrupt or incomplete exposure cells', () => {
    const directory = mkdtempSync(join(tmpdir(), 'slop1276-bio-'));
    try {
      for (const file of ['week-04-bios.json', 'week-04-text.mjs', 'bio-exposures.csv', 'romance-models.mjs', 'week-04-worked-examples.mjs']) {
        cpSync(join('dist/data', file), join(directory, file));
      }
      const run = () => execFileSync(process.execPath, [join(directory, 'week-04-worked-examples.mjs')], { cwd: tmpdir(), encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
      expect(JSON.parse(run()).reversal.pooled.A.positives).toBe(26);
      const original = readFileSync(join(directory, 'bio-exposures.csv'), 'utf8');
      for (const [from, to, reason] of [
        ['South,B,80,12', 'North,A,80,24', 'Duplicate cell'],
        ['South,B,80,12', '', 'Both variants must be present'],
        ['North,A,80,24', 'North,A,80,81', 'positives <= exposures'],
        ['North,A,80,24', 'North,A,80,-1', 'non-negative whole numbers'],
      ]) {
        expect(original).toContain(from);
        writeFileSync(join(directory, 'bio-exposures.csv'), original.replace(from, to));
        expect(run).toThrow(reason);
      }
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
});
