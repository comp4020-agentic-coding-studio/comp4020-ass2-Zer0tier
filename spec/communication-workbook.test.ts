// Literal event, payoff and utility oracles. These do not certify recipient
// evidence, model fit, reliable delivery or browser geometry.
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import cases from '../public/data/week-07-cases.json';
import { analyseGame, compareResponses, startConversation, stepConversation } from '../public/data/week-07-models.mjs';

const initial = () => startConversation(cases.handoff, 2);
const sent = () => stepConversation(initial(), { id: 's', type: 'send', at: 0 }).state;
const step = (state: any, type: string, at: number, id = type) => stepConversation(state, { id, type, at });
const score = (q: number, cost = 5, allowed = true) => compareResponses(q, { clarificationCost: cost, clarificationAllowed: allowed });

describe('Week 7 communication workbook', () => {
  it('consumes the Week 6 decision and retains the candidate and invitation versions', () => {
    const state = initial();
    expect(state.phase).toBe('ready');
    expect(state.decision.action).toBe('draft-context');
    expect(state.decision.evidence).toEqual([{ source: 'G1', quote: 'I like board games.' }]);
    expect(state.handoff.invitationVersion).toBe('week-05-v1:library');
    for (const override of [{ boundary: 'declined' }, { boundary: 'unknown' }, { sent: true }]) {
      expect(() => startConversation({ ...cases.handoff, snapshot: { ...cases.handoff.snapshot, ...override } })).toThrow('cannot initialise');
    }
    for (const window of [0, -1, Infinity, NaN]) expect(() => startConversation(cases.handoff, window)).toThrow();
  });

  it('keeps receipts separate from replies and changes only returned snapshots', () => {
    const state = sent();
    const before = structuredClone(state);
    const pending = step(state, 'wait', 0.1).state;
    const read = step(pending, 'read', 0.5);
    expect(read.state.phase).toBe('pending');
    expect(read.state.observation).toBe('open');
    expect(read.state.readAt).toBe(0.5);
    expect(read.state.deliveredAt).toBeNull();
    expect(read.sendsMessage).toBe(false);
    expect(step(read.state, 'reply', 1.5).state.observation).toBe('reply');
    expect(state).toEqual(before);
  });

  it('keeps refusal terminal even when a late reply or second send competes', () => {
    const declined = step(sent(), 'decline', 1);
    expect(declined.trace).toEqual(['sent', 'declined', 'closed']);
    expect(declined.state.closure).toBe('decline');
    expect(declined.state.observation).toBe('reply');
    for (const event of ['reply', 'send', 'read', 'timeout']) {
      const result = step(declined.state, event, 3);
      expect(result.state).toEqual(declined.state);
      expect(result.action).toBe('stop');
      expect(result.sendsMessage).toBe(false);
    }
    expect(step(initial(), 'decline', 0).state.phase).toBe('closed');
    expect(step(sent(), 'block', 1).state.closure).toBe('block');
    expect(step(sent(), 'close', 1).state.observation).toBe('ended');
  });

  it('freezes the half-open window while distinguishing a late reply from closure', () => {
    expect(step(sent(), 'reply', 1.999).state.observation).toBe('reply');
    const atDeadline = step(sent(), 'reply', 2);
    expect(atDeadline.state.phase).toBe('replied');
    expect(atDeadline.state.observation).toBe('no-reply');
    expect(atDeadline.action).toBe('review-late-reply');
    const timeout = step(step(sent(), 'wait', 1).state, 'timeout', 2).state;
    expect(timeout.phase).toBe('pending');
    expect(timeout.observation).toBe('no-reply');
    const late = step(timeout, 'reply', 3);
    expect(late.state.phase).toBe('replied');
    expect(late.state.observation).toBe('no-reply');
    const replyFirst = step(step(sent(), 'reply', 2).state, 'timeout', 2).state;
    const timerFirst = step(step(sent(), 'timeout', 2).state, 'reply', 2).state;
    expect([replyFirst.phase, replyFirst.observation]).toEqual([timerFirst.phase, timerFirst.observation]);
    expect(step(timeout, 'decline', 3).state.phase).toBe('closed');
    expect(() => step(sent(), 'timeout', 1.99)).toThrow('not ended');
  });

  it('deduplicates exact IDs but rejects conflicting, stale and invalid event records', () => {
    const state = step(sent(), 'wait', 1).state;
    expect(step(state, 'send', 0, 's').action).toBe('duplicate');
    expect(step(state, 'send', 0, 's').state).toEqual(state);
    expect(() => step(state, 'reply', 1, 's')).toThrow('Conflicting event ID');
    expect(() => step(state, 'reply', 0.5)).toThrow('observation-time order');
    expect(() => step(state, 'send', 2, 'another-send')).toThrow('no second send');
    expect(() => step(initial(), 'reply', 0)).toThrow('recorded opener');
    for (const at of [-1, Infinity, NaN]) expect(() => step(state, 'read', at)).toThrow();
    expect(() => step(state, 'guess-emotion', 2)).toThrow('known type');
    expect(() => step(startConversation(cases.handoff, Number.MAX_VALUE), 'send', Number.MAX_VALUE)).toThrow('finite');
  });

  it('finds the complete utility policy, ties, changed cost and prior exclusion', () => {
    expect(score(0.3).winners).toEqual(['stop']);
    expect(score(0.5).winners).toEqual(['stop', 'wait']);
    expect(score(0.75).winners).toEqual(['wait']);
    expect(score(0.8).winners).toEqual(['wait', 'clarify']);
    expect(score(0.9).winners).toEqual(['clarify']);
    expect(score(0.9, 6).winners).toEqual(['wait']);
    expect(score(1, 6).winners).toEqual(['wait', 'clarify']);
    expect(score(0.6, 4).winners).toEqual(['wait', 'clarify']);
    expect(score(0.9, 5, false).excluded).toEqual(['clarify']);
    expect(score(0.9, 5, false).winners).toEqual(['wait']);
    for (const q of [-1, 1.1, NaN]) expect(() => score(q)).toThrow();
    expect(() => score(0.5, -1)).toThrow();
    // @ts-expect-error Deliberately exercise runtime validation of external data.
    expect(() => compareResponses(0.9, { clarificationAllowed: 'true' })).toThrow();
  });

  it('checks both players, strict dominance and equilibrium after the payoff change', () => {
    expect(analyseGame(cases.games[0].payoffs)).toEqual({ rowBest: [['Ask'], ['Ask']], columnBest: [['Ask'], ['Ask']],
      equilibria: [['Ask', 'Ask']], rowDominant: ['Ask'], columnDominant: ['Ask'] });
    expect(analyseGame(cases.games[1].payoffs)).toEqual({ rowBest: [['Wait'], ['Ask']], columnBest: [['Wait'], ['Ask']],
      equilibria: [['Ask', 'Wait'], ['Wait', 'Ask']], rowDominant: [], columnDominant: [] });
    const asymmetric = analyseGame([[[3, 0], [1, 2]], [[0, 3], [2, 1]]]);
    expect(asymmetric.equilibria).toEqual([]);
    expect(analyseGame([[[0,0],[0,0]],[[0,0],[0,0]]]).equilibria).toHaveLength(4);
    expect(() => analyseGame([[[NaN,0],[0,0]],[[0,0],[0,0]]])).toThrow();
    expect(() => analyseGame(Array(2))).toThrow();
  });

  it('runs the five downloaded files offline with literal calculations and traces', () => {
    const directory = mkdtempSync(join(tmpdir(), 'slop1276-communication-'));
    try {
      for (const file of ['week-07-cases.json', 'week-07-models.mjs', 'week-07-worked-examples.mjs', 'week-06-models.mjs', 'romance-models.mjs']) cpSync(join('dist/data', file), join(directory, file));
      const run = () => execFileSync(process.execPath, [join(directory, 'week-07-worked-examples.mjs')], { cwd: tmpdir(), encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
      const report = JSON.parse(run());
      expect(report.arrivals.zero).toBeCloseTo(0.449328964117, 11);
      expect(report.arrivals.exactlyOne).toBeCloseTo(0.359463171294, 11);
      expect(report.arrivals.mixtureZero).toBeCloseTo(0.600948258997, 11);
      expect(report.arrivals.mixtureMean).toBe(0.8);
      expect(report.mixedAsk).toBeCloseTo(2 / 3, 12);
      expect(report.mixedExpected.ask).toBeCloseTo(0, 12);
      expect(report.traces.map((row: any) => [row.final.phase, row.final.observation])).toEqual([
        ['replied','reply'], ['replied','no-reply'], ['closed','reply'], ['replied','no-reply'], ['pending','open'], ['closed','ended'],
      ]);
      const file = join(directory, 'week-07-cases.json');
      const broken = JSON.parse(readFileSync(file, 'utf8'));
      broken.traces.push(broken.traces[0]);
      writeFileSync(file, JSON.stringify(broken));
      expect(run).toThrow('Duplicate fixture ID');
    } finally { rmSync(directory, { recursive: true, force: true }); }
  });
});
