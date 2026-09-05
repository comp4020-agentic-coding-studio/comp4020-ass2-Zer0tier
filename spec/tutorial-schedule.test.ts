// Lecture weeks and tutorial meetings are different schedules. These checks
// protect the published absence of a week 1 tutorial, not browser geometry.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const { nodes } = JSON.parse(readFileSync('dist/api/index.json', 'utf8'));

describe('a lecture-only first week', () => {
  it('keeps twelve lectures but only eleven tutorials, starting in week 2', () => {
    const weeks = (type: string) => nodes.filter((n: any) => n.type === type)
      .map((n: any) => n.meta.week).sort((a: number, b: number) => a - b);
    expect(weeks('lectures')).toEqual([1,2,3,4,5,6,7,8,9,10,11,12]);
    expect(weeks('sessions')).toEqual([2,3,4,5,6,7,8,9,10,11,12]);
    expect(existsSync('dist/sessions/01-system-boundary/index.html')).toBe(false);
    expect(nodes.find((n: any) => n.id === 'sessions/02-platforms').meta.buildsOn)
      .toEqual(['lectures/week-01']);
  });

  it('keeps week 1 in the timetable without a tutorial link or stale references', () => {
    const timetable = readFileSync('dist/weeks/index.html', 'utf8');
    expect([...timetable.matchAll(/class="week-row"/g)]).toHaveLength(12);
    const firstWeek = timetable.match(/<li[^>]*data-week="1"[^>]*>([\s\S]*?)<\/li>/)?.[1];
    expect(firstWeek).toBeDefined();
    expect(firstWeek).toContain('No tutorial in week 1');
    expect(firstWeek).toContain('/lectures/week-01/');
    expect(firstWeek).not.toMatch(/href="[^"]*\/sessions\//);
    for (const route of ['sessions', 'lectures/week-01', 'decks/week-01']) {
      expect(readFileSync(`dist/${route}/index.html`, 'utf8')).toContain('No tutorial in week 1');
    }
    for (const path of readdirSync('dist', { recursive: true, encoding: 'utf8' }).filter(p => /\.(html|json)$/.test(p))) {
      expect(readFileSync(`dist/${path}`, 'utf8'), path).not.toContain('sessions/01-system-boundary');
    }
  });
});
