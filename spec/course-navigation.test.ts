// A literal navigation contract from the student's COMP4130 reference.
// Responsive visibility, focus and computed fonts belong in the browser audit.
import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const sections = [
  ['Home', ''], ['Lectures', 'lectures/'], ['Tutorials', 'sessions/'],
  ['Assignments', 'assessments/'], ['People', 'people/'], ['Readings', 'readings/'],
  ['Timetable', 'weeks/'], ['Help', 'help/'], ['FAQ', 'faq/'], ['Policies', 'policies/'],
];

describe('familiar course navigation', () => {
  it('uses the reference menu order while preserving collection URLs', () => {
    const html = readFileSync('dist/index.html', 'utf8');
    const list = html.match(/<ul[^>]*class="at-nav-links"[^>]*>([\s\S]*?)<\/ul>/)?.[1];
    expect(list).toBeDefined();
    const links = [...list!.matchAll(/<a\s[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gs)]
      .map(match => [match[2].trim(), match[1]]);
    expect(links.map(([label]) => label)).toEqual(sections.map(([label]) => label));
    const base = links[0][1];
    expect(links).toEqual(sections.map(([label, path]) => [label, base + path]));
  });
  it('gives the new sections real pages and keeps the toolkit discoverable', () => {
    for (const section of ['readings', 'help', 'faq']) {
      expect(existsSync(`dist/${section}/index.html`), section).toBe(true);
    }
    const readings = readFileSync('dist/readings/index.html', 'utf8');
    const tutorials = readFileSync('dist/sessions/index.html', 'utf8');
    expect(readings).toMatch(/href="[^"]*\/toolkit\/"/);
    expect(tutorials).toMatch(/href="[^"]*\/toolkit\/"/);
  });
});
