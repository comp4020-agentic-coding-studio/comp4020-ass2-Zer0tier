// New student-directed course contract. These assertions are intentionally red
// against the previous, working communication course; not regression claims.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { courseMeta } from '../src/course-config';
const { nodes } = JSON.parse(readFileSync('dist/api/index.json', 'utf8'));

describe('the algorithmic romance pivot', () => {
  it('uses the requested CS title and level without losing the allocated suffix', () => {
    expect(courseMeta.code).toBe('SLOP4276');
    expect(courseMeta.title).toBe('Applied Algorithmic Romance & Profile Optimization');
    expect(courseMeta.level).toBe(4);
  });
  it('keeps the four specific weekly anchors', () => {
    for (const [week, topic] of [[1, 'Elo'], [3, 'A/B'], [7, 'ghosting'], [10, 'Stochastic']] as const) {
      const lecture = nodes.find((n: any) => n.type === 'lectures' && n.meta.week === week);
      expect(lecture?.title).toContain(topic);
    }
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
