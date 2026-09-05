// Literal arithmetic oracles protect the teaching examples. They do not prove
// external validity, random assignment, good prose or browser layout.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { compareBios, conservativeRank, dateLogistics, dateTransitions, eloUpdate, poissonSilence, qualityScore } from '../src/lib/romance-models';

const csv = (path: string) => readFileSync(path, 'utf8').trim().split('\n').slice(1).map(line => line.split(','));

describe('reproducible course calculations', () => {
  it('calculates the stated Poisson zero-count example without prescribing a reply delay', () => {
    expect(poissonSilence(0.4, 2)).toBeCloseTo(0.4493289641, 9);
    expect(poissonSilence(0, 2)).toBe(1);
    expect(poissonSilence(0.4, 0)).toBe(1);
    expect(() => poissonSilence(-0.4, 2)).toThrow();
    expect(() => poissonSilence(0.4, Infinity)).toThrow();
  });
  it('matches literal one- and two-step conversation distributions', () => {
    expect(dateTransitions(0)).toEqual([1, 0, 0, 0]);
    expect(dateTransitions(1)).toEqual([0.5, 0.2, 0.2, 0.1]);
    const expected = [0.31, 0.16, 0.32, 0.21];
    dateTransitions(2).forEach((p, index) => expect(p).toBeCloseTo(expected[index], 12));
    expect(dateTransitions(100).reduce((sum, p) => sum + p, 0)).toBeCloseTo(1, 12);
  });
  it('keeps agreed and ended states absorbing, validates inputs and preserves the starting vector', () => {
    expect(dateTransitions(20, [0, 0, 1, 0])).toEqual([0, 0, 1, 0]);
    expect(dateTransitions(20, [0, 0, 0, 1])).toEqual([0, 0, 0, 1]);
    const initial = [0, 1, 0, 0];
    expect(dateTransitions(1, initial)).toEqual([0.3, 0.3, 0.1, 0.3]);
    expect(initial).toEqual([0, 1, 0, 0]);
    for (const invalid of [-1, 1.5, Infinity, 10001]) expect(() => dateTransitions(invalid)).toThrow();
    for (const invalid of [[1, 0], [1, 1, 0, 0], [-1, 1, 1, 0], [NaN, 0, 0, 0]]) {
      expect(() => dateTransitions(2, invalid)).toThrow();
    }
  });
  it('updates the toy Elo model, not a purported app algorithm', () => {
    expect(eloUpdate(1200, 1200, 1)).toBe(1216);
    expect(eloUpdate(1200, 1200, 0)).toBe(1184);
    expect(eloUpdate(1200, 1200, 1, 64)).toBe(1232);
    expect(() => eloUpdate(1200, 1200, 1, -32)).toThrow();
  });
  it('separates positive counts, denominators and statistical interpretation', () => {
    const balanced = compareBios(120, 1000, 140, 1000);
    expect(balanced.difference).toBeCloseTo(0.02, 10);
    expect(balanced.z).toBeCloseTo(1.3298, 3);
    expect(balanced.conclusion).toContain('No clear difference');
    expect(compareBios(120, 1000, 300, 1000).conclusion).toContain('Difference detected');
    expect(compareBios(2, 8, 4, 8).z).toBeNull();
    expect(compareBios(0, 100, 0, 100).z).toBeNull();
    expect(() => compareBios(101, 100, 20, 100)).toThrow();
    expect(() => compareBios(1, 0, 2, 100)).toThrow();
    expect(() => compareBios(1.5, 100, 2, 100)).toThrow();
  });
  it('preserves the market and exposure-reversal fixtures', () => {
    const market = csv('public/data/null-island-market.csv');
    expect(market.map(row => row.slice(1).map(Number))).toEqual([[80,40,12],[120,60,18],[100,50,10]]);
    const totals = [1,2,3].map(col => market.reduce((sum, row) => sum + Number(row[col]), 0));
    expect(totals).toEqual([300,150,40]);
    const exposure = csv('public/data/bio-exposures.csv');
    expect(exposure).toEqual([
      ['North','A','80','24'], ['North','B','20','7'],
      ['South','A','20','2'], ['South','B','80','12'],
    ]);
    expect(26/100).toBeGreaterThan(19/100);
    expect(7/20).toBeGreaterThan(24/80);
    expect(12/80).toBeGreaterThan(2/20);
  });
  it('keeps 99 synthetic controls and an honest 100-entry rank', () => {
    const rows = csv('public/data/null-island-controls.csv');
    expect(rows).toHaveLength(99);
    expect(new Set(rows.map(row => row[0])).size).toBe(99);
    const scores = rows.map(row => qualityScore(row.slice(1).map(Number)));
    expect(Math.max(...scores)).toBe(93.75);
    expect(qualityScore([4,4,4,4])).toBe(100);
    expect(conservativeRank(100, scores)).toBe(1);
    expect(conservativeRank(93.75, scores)).toBeGreaterThan(1);
    expect(conservativeRank(50, Array(99).fill(50))).toBe(100);
    expect(conservativeRank(50, [51,50,...Array(97).fill(49)])).toBe(3);
    expect(() => conservativeRank(100, Array(100).fill(50))).toThrow();
    expect(() => qualityScore([4,4,5,4])).toThrow();
    expect(() => qualityScore([4,4,4])).toThrow();
  });
  it('changes the denominator when feasibility receives double weight', () => {
    expect(qualityScore([4,4,1,4])).toBe(81.25);
    expect(qualityScore([4,4,1,4], 2)).toBe(70);
  });
  it('exposes a changed logistics tail even when the marginals and means stay fixed', () => {
    const independent = dateLogistics();
    const dependent = dateLogistics(0.4, 0);
    expect(independent.states.map(state => state.minutes)).toEqual([90,100,110,120]);
    expect(independent.states.reduce((sum, state) => sum + state.probability, 0)).toBeCloseTo(1);
    expect(independent.expectedCost).toBeCloseTo(14.6);
    expect(independent.expectedMinutes).toBeCloseTo(96);
    expect(dependent.expectedMinutes).toBeCloseTo(96);
    expect(dependent.expectedCost).toBeCloseTo(14.6);
    expect(independent.failureProbability).toBeCloseTo(0.025);
    expect(dependent.failureProbability).toBeCloseTo(0.1);
    expect(dateLogistics(0.1, 0.1, 120).failureProbability).toBe(0);
    expect(() => dateLogistics(2, 0)).toThrow();
  });
});
