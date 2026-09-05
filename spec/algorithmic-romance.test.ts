// Student-directed course contracts: built metadata, not a judgement of prose.
import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { courseMeta } from '../src/course-config';
const { nodes } = JSON.parse(readFileSync('dist/api/index.json', 'utf8'));

describe('the algorithmic romance pivot', () => {
  it('removes the superseded course identity from built pages, including shared layout copy', () => {
    const pages = readdirSync('dist', { recursive: true, encoding: 'utf8' }).filter(path => path.endsWith('.html'));
    expect(pages.length).toBeGreaterThan(30);
    for (const path of pages) {
      const obsolete = readFileSync(`dist/${path}`, 'utf8').match(/SLOP1276|How to Find a Partner|dating field guide|field-guide piece/i)?.[0] ?? null;
      expect(obsolete, path).toBeNull();
    }
  });
  it('uses the requested CS title and level without losing the allocated suffix', () => {
    expect(courseMeta.code).toBe('SLOP4276');
    expect(courseMeta.title).toBe('Applied Algorithmic Romance & Profile Optimization');
    expect(courseMeta.level).toBe(4);
  });
  it('teaches the twelve requested lecture titles and key concepts in order', () => {
    const lectures = nodes.filter((n: any) => n.type === 'lectures').sort((a: any, b: any) => a.meta.week - b.meta.week);
    expect(lectures.map((n: any) => n.title)).toEqual([
      "Introduction to Algorithmic Romance",
      "Platform Architecture and the Elo Hierarchy",
      "Data Acquisition: Photography as a Quantitative Asset",
      "Natural Language Processing in Profile Bios",
      "The Mathematics of the \"Match\"",
      "Interaction Protocols: The Initial Message",
      "Game Theory and Asynchronous Communication",
      "Threat Modeling and Anomaly Detection",
      "Transitioning to Offline Environments",
      "Stochastic Modeling of the First Date",
      "Post-Date Analytics and The \"Second Date\" Metric",
      "System Maintenance and Graceful Deprecation"
]);
    expect(lectures.map((n: any) => n.meta.keyConcept)).toEqual([
      "The Romantic Turing Test",
      "The rich-get-richer dynamics of algorithmically enforced attractiveness",
      "Minimizing the “Is that their ex cropped out?” uncertainty variable",
      "Avoiding string redundancy and cliché overflow",
      "Peak system load: Sunday evening swiping",
      "Bypassing the conversational firewall",
      "Managing latency and read-receipt strategy",
      "False positives vs. false negatives in romantic threat detection",
      "Reducing the friction of the digital-to-physical handshake",
      "Navigating the “Who pays?” deadlock",
      "Calculating Return on Investment (ROI) of time spent vs. romantic viability",
      "Long-term relationship architecture and avoiding the “comfortable rut” system crash"
]);
  });
  it('assesses a synthetic data report, exam and benchmarked profile release', () => {
    const work = nodes.filter((n: any) => n.type === 'assessments').sort((a: any, b: any) => a.meta.week - b.meta.week);
    expect(work.map((n: any) => [n.id, n.meta.week, n.meta.weight])).toEqual([
      ['assessments/market-report', 4, 20],
      ['assessments/matchmaking-exam', 7, 30],
      ['assessments/profile-deployment', 12, 50],
    ]);
    expect(work.every((n: any) => n.meta.practiceMode === 'synthetic-data')).toBe(true);
    expect(work[2].meta.benchmark).toBe('Null Island v1');
    expect(work[2].meta.benchmarkSize).toBe(100);
    expect(work[2].meta.rankIsGraded).toBe(false);
  });
});
