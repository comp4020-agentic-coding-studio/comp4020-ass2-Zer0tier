// Decorative semantics belong here; pointer access and geometry need a browser.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('decoration without a reading or interaction burden', () => {
  it('keeps blossoms decorative on home, teaching and support pages', () => {
    for (const route of ['', 'lectures/week-03/', 'toolkit/', 'policies/']) {
      const html = readFileSync(`dist/${route}index.html`, 'utf8');
      const decorations = [...html.matchAll(/<div\b[^>]*data-course-decoration="(?:background|sprig)"[^>]*>/g)].map(match => match[0]);
      expect(decorations, route).toHaveLength(2);
      for (const decoration of decorations) {
        expect(decoration).toContain('aria-hidden="true"');
        expect(decoration).toMatch(/\binert(?:\s|=|>)/);
        expect(decoration).not.toMatch(/\btabindex=/);
      }
    }
  });
});
