// Literal routing and arithmetic oracles, not judgements of message quality.
// Browser geometry and the truth of authored evidence require separate review.
import { readFileSync, mkdtempSync, cpSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';
import { routeMessage, replyRate, compareDrafts } from '../public/data/week-06-models.mjs';

const games = { id: 'G1', topics: [{ topic: 'board-games', quote: 'I like board games.' }] };
const initial = { closed: false, boundary: 'clear', sent: false, inbound: 'none', recipient: games };
const options = [
  { id: 'hey', probability: 0.2, seconds: 10, admissible: true },
  { id: 'games', probability: 0.4, seconds: 30, admissible: true },
];

describe('Week 6 reproducible message protocol', () => {
  it('stops before shared context and preserves terminal evidence despite broken topics', () => {
    for (const override of [{ boundary: 'declined' }, { boundary: 'blocked' }, { inbound: 'decline' }, { closed: true, sent: true, inbound: 'reply' }]) {
      const result = routeMessage({ ...initial, ...override });
      expect(result.action).toBe('stop');
      expect(result.trace).toEqual(['terminal']);
      expect(result.evidence).toEqual([]);
      expect(result.sendsMessage).toBe(false);
    }
    expect(routeMessage({ boundary: 'declined', recipient: 'broken' }).action).toBe('stop');
    expect(routeMessage(initial).action).toBe('draft-context');
    expect(routeMessage(initial).evidence).toEqual([{ source: 'G1', quote: 'I like board games.' }]);
  });

  it('distinguishes missing topics, unknown boundaries, pending and replies without mutating inputs', () => {
    for (const recipient of [null, { id: 'U1', topics: null }, { id: 'U1', topics: [] }, { id: 'H1', topics: [{ topic: 'hiking', quote: 'I like hiking.' }] }]) {
      expect(routeMessage({ ...initial, recipient }).action).toBe('draft-plain');
    }
    for (const snapshot of [null, {}, { ...initial, sent: 'false' }, { ...initial, boundary: 'unknown' }, { ...initial, inbound: 'reply' },
      { ...initial, recipient: { id: 'G1', topics: [{ topic: 'board-games', quote: '' }] } },
      { ...initial, recipient: { id: 'G1', topics: Array(1) } }]) {
      expect(routeMessage(snapshot).action).toBe('review');
    }
    const pending = { ...initial, sent: true };
    const before = structuredClone(pending);
    expect(routeMessage(pending).action).toBe('pending');
    expect(routeMessage(pending).trace).toEqual(['terminal', 'metadata', 'history']);
    expect(routeMessage(pending)).toEqual(routeMessage(pending));
    expect(pending).toEqual(before);
    expect(routeMessage({ ...pending, inbound: 'reply' }).action).toBe('respond');
  });

  it('reproduces the utility crossover, both ties, abstention and a changed probability', () => {
    expect(compareDrafts(options).scores).toEqual([{ id: 'defer', utility: 0 }, { id: 'hey', utility: 1.5 }, { id: 'games', utility: 2.5 }]);
    expect(compareDrafts(options).winners).toEqual(['games']);
    expect(compareDrafts(options, 10, 0.1).winners).toEqual(['hey', 'games']);
    expect(compareDrafts(options, 10, 0.15).winners).toEqual(['hey']);
    expect(compareDrafts(options, 10, 0.2).winners).toEqual(['defer', 'hey']);
    expect(compareDrafts(options, 10, 0.25).winners).toEqual(['defer']);
    expect(compareDrafts([options[0], { ...options[1], probability: 0.25 }]).winners).toEqual(['hey']);
  });

  it('excludes inadmissible options before arithmetic and rejects invalid eligible inputs', () => {
    const forbidden = { id: 'demand', admissible: false, probability: Infinity, seconds: -1 };
    expect(compareDrafts([forbidden])).toEqual({ scores: [{ id: 'defer', utility: 0 }], excluded: ['demand'], winners: ['defer'], maximum: 0 });
    expect(compareDrafts([]).winners).toEqual(['defer']);
    expect(compareDrafts([...options, { ...forbidden, probability: 1, seconds: 0 }]).winners).toEqual(['games']);
    for (const extra of [{ probability: -0.1 }, { probability: 1.1 }, { probability: NaN }, { seconds: -1 }, { seconds: Infinity }, { admissible: 'true' }, { id: 'defer' }]) {
      expect(() => compareDrafts([{ ...options[0], ...extra }])).toThrow();
    }
    expect(() => compareDrafts([options[0], options[0]])).toThrow('unique IDs');
    expect(() => compareDrafts(options, 10, -1)).toThrow();
    expect(() => compareDrafts(options, Infinity, 0.05)).toThrow();
    expect(() => compareDrafts(options, 10, Number.MAX_VALUE)).toThrow('finite');
  });

  it('keeps the reply denominator and its empty/invalid cases explicit', () => {
    expect(replyRate(2, 10)).toBe(0.2);
    expect(replyRate(4, 10)).toBe(0.4);
    expect(replyRate(3, 10)).toBe(0.3);
    expect(replyRate(0, 10)).toBe(0);
    expect(replyRate(0, 0)).toBeNull();
    for (const [x, n] of [[11, 10], [-1, 10], [0.5, 10], [1, 0], [1, Infinity]]) expect(() => replyRate(x, n)).toThrow();
  });

  it('runs all four built files offline and rejects duplicate IDs or unresolved recipients', () => {
    const directory = mkdtempSync(join(tmpdir(), 'slop1276-message-'));
    try {
      for (const file of ['week-06-cases.json', 'week-06-models.mjs', 'week-06-worked-examples.mjs', 'romance-models.mjs']) cpSync(join('dist/data', file), join(directory, file));
      const run = () => execFileSync(process.execPath, [join(directory, 'week-06-worked-examples.mjs')], { cwd: tmpdir(), encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
      const report = JSON.parse(run());
      expect(report.routes.map((r: { action: string }) => r.action)).toEqual(['draft-context', 'draft-plain', 'draft-plain', 'stop', 'stop', 'pending', 'respond', 'stop', 'stop', 'review']);
      expect(report.difference).toBe(0.2);
      expect(report.ratio).toBe(2);
      expect(report.sparseCheck.z).toBeNull();
      expect(report.pressure.map((r: { replyRate: number; answerRate: number }) => [r.replyRate, r.answerRate])).toEqual([[0.4, 0.3], [0.6, 0.1]]);
      expect(report.constrained.excluded).toEqual(['demand']);
      const path = join(directory, 'week-06-cases.json');
      const original = JSON.parse(readFileSync(path, 'utf8'));
      const duplicate = structuredClone(original);
      duplicate.recipients.push(duplicate.recipients[0]);
      writeFileSync(path, JSON.stringify(duplicate));
      expect(run).toThrow('Duplicate fixture ID');
      original.routingCases[0].snapshot.recipientId = 'missing';
      writeFileSync(path, JSON.stringify(original));
      expect(run).toThrow('Unknown recipient reference');
    } finally { rmSync(directory, { recursive: true, force: true }); }
  });
});
