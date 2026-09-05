// Literal arithmetic oracles protect the teaching examples. They do not prove
// external validity, random assignment, good prose or browser layout.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { compareBios, conservativeRank, dateLogistics, eloUpdate, qualityScore } from '../src/lib/romance-models';

const csv = (path: string) => readFileSync(path, 'utf8').trim().split('\n').slice(1).map(line => line.split(','));

describe('reproducible course calculations', () => {
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
