// Protect the timetable's workload contract. Browser checks cover table layout;
// these checks cannot judge whether a selected example is well taught.
import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const weeks = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const notes = (week: string) => readFileSync(`src/content/lectures/week-${week}.md`, 'utf8');
const deck = (week: string) => readFileSync(`src/decks/week-${week}.deck.mdx`, 'utf8');
const slideNumbers = (cell: string) => cell.split(', ').flatMap(part => {
  const [start, end = start] = part.split('–').map(Number);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});
const rows = (section: string) => [...section.matchAll(/^\| (\d+)–(\d+) min \| ([\d, –]+) \|/gm)];
const slideCounts = [16, 46, 47, 50, 50, 50, 50, 50, 50, 50, 50, 50];

describe('teaching allocations match the published timetable', () => {
  it('gives every Monday a contiguous 60-minute selection of real, non-break slides', () => {
    for (const [i, week] of weeks.entries()) {
      const plan = notes(week).split('### 60-minute lecture')[1]?.split('\n### ')[0];
      expect(plan, week).toBeDefined();
      const selection = rows(plan!);
      expect(selection.length, week).toBeGreaterThan(0);
      let end = 0;
      const selected: number[] = [];
      const slides = deck(week).split(/^---\s*$/m).slice(2);
      expect(slides, week).toHaveLength(slideCounts[i]);
      for (const row of selection) {
        expect(Number(row[1]), week).toBe(end);
        end = Number(row[2]);
        expect(end, week).toBeGreaterThan(Number(row[1]));
        for (const slide of slideNumbers(row[3])) {
          expect(slide, week).toBeGreaterThanOrEqual(1);
          expect(slide, week).toBeLessThanOrEqual(slideCounts[i]);
          expect(slides[slide - 1], `${week}, slide ${slide}`).not.toMatch(/^## (?:Break ·|Pause for the full route)/m);
          selected.push(slide);
        }
      }
      expect(end, week).toBe(60);
      expect(new Set(selected).size, week).toBe(selected.length);
    }
  });

  it('allocates 90 tutorial minutes and 210 independent minutes in weeks 2–12', () => {
    for (const week of weeks.slice(1)) {
      const lecture = notes(week);
      expect(lecture, week).toContain('### 90-minute tutorial');
      const independent = lecture.split('### Independent work · about 210 minutes')[1]?.split('\n## ')[0];
      expect(independent, week).toBeDefined();
      const allocations = [...independent!.matchAll(/^- \*\*(\d+) minutes/gm)].map(m => Number(m[1]));
      expect(allocations.reduce((a, b) => a + b, 0), week).toBe(210);
      const file = readdirSync('src/content/sessions').find(f => f.startsWith(`${week}-`));
      const tutorial = readFileSync(`src/content/sessions/${file}`, 'utf8');
      const tasks = tutorial.split('## 90-minute tutorial')[1].split('\n## ')[0];
      const durations = [...tasks.matchAll(/^\d\. \*\*(\d+) minutes/gm)].map(m => Number(m[1]));
      expect(durations, week).toHaveLength(4);
      expect(durations.reduce((a, b) => a + b, 0), week).toBe(90);
      expect(tutorial, week).toContain(`/lectures/week-${week}/#scheduled-teaching-and-independent-work`);
    }
    expect(notes('01')).toContain('### Tutorial and independent work');
    expect(notes('01')).not.toContain('### 90-minute tutorial');
  });

  it('retains the complete 180-minute routes and all their slide references separately', () => {
    for (const [i, week] of weeks.entries()) {
      if (week === '01') continue;
      const complete = notes(week).split('## Complete teaching pack')[1]?.split('\n## ')[0];
      expect(complete, week).toBeDefined();
      let end = 0;
      const covered: number[] = [];
      for (const row of rows(complete!)) {
        expect(Number(row[1]), week).toBe(end);
        end = Number(row[2]);
        covered.push(...slideNumbers(row[3]));
      }
      expect(end, week).toBe(180);
      expect(covered, week).toEqual(Array.from({ length: slideCounts[i] }, (_, n) => n + 1));
      expect(notes(week), week).not.toContain('80 minutes of explanations');
    }
  });
});
