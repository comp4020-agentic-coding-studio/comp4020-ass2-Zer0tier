// Literal behaviour checks for the interactive conversation. Browser checks
// separately cover focus, visible feedback, layout and the download control.
import { describe, expect, it } from 'vitest';
import { startDebugger, chooseAction, advanceDebugger, retryAction, inspectSnapshot, exportTrace } from '../src/lib/romance-debugger';

const actAndAdvance = (state: ReturnType<typeof startDebugger>, action: string) => advanceDebugger(chooseAction(state, action));

describe('Romance Debugger', () => {
  it('records one supported opener and keeps repeated clicks idempotent', () => {
    const initial = startDebugger('shared');
    const original = structuredClone(initial);
    expect(inspectSnapshot(initial).action).toBe('draft-context');
    const sent = chooseAction(initial, 'context');
    expect(sent.snapshot.sent).toBe(true);
    expect(sent.latest?.before.action).toBe('draft-context');
    expect(sent.latest?.after.action).toBe('pending');
    expect(sent.latest?.after.trace).toEqual(['terminal', 'metadata', 'history']);
    expect(sent.messages.at(-1)?.text).toBe('Board games and terrible puns here. Which co-op game would you recommend?');
    expect(chooseAction(sent, 'context')).toEqual(sent);
    expect(initial).toEqual(original);
  });

  it('accepts a plain opener too and blocks fabricated common ground', () => {
    expect(chooseAction(startDebugger('shared'), 'plain').latest?.accepted).toBe(true);
    const initial = startDebugger('missing');
    expect(inspectSnapshot(initial).action).toBe('draft-plain');
    const held = chooseAction(initial, 'invent');
    expect(held.latest?.accepted).toBe(false);
    expect(held.snapshot).toEqual(initial.snapshot);
    expect(held.messages).toEqual(initial.messages);
    expect(advanceDebugger(held)).toEqual(held);
    const repaired = chooseAction(retryAction(held), 'plain');
    expect(repaired.latest?.accepted).toBe(true);
    expect(repaired.snapshot.sent).toBe(true);
    expect(repaired.history.map(row => row.accepted)).toEqual([false, true]);
  });

  it('preserves uncertainty after a read receipt and forbids another opener', () => {
    const waiting = actAndAdvance(startDebugger('shared'), 'context');
    expect(waiting.sceneId).toBe('shared-wait');
    expect(waiting.messages.at(-1)?.text).toContain('read receipt');
    const blocked = chooseAction(waiting, 'resend');
    expect(blocked.latest?.accepted).toBe(false);
    expect(blocked.snapshot.sent).toBe(true);
    expect(blocked.messages).toEqual(waiting.messages);
    const unknown = chooseAction(retryAction(blocked), 'unknown');
    expect(unknown.latest?.accepted).toBe(true);
    expect(unknown.latest?.before.action).toBe('pending');
    expect(unknown.latest?.after.action).toBe('pending');
    expect(unknown.snapshot).toEqual(waiting.snapshot);
    expect(unknown.latest?.unknowns).toContain('Why no reply has been recorded.');
    expect(unknown.messages).toEqual(waiting.messages);
  });

  it('never turns a tentative reply into a confirmed meeting', () => {
    let state = actAndAdvance(startDebugger('shared'), 'context');
    state = actAndAdvance(state, 'unknown');
    expect(state.sceneId).toBe('shared-reply');
    expect(inspectSnapshot(state).action).toBe('respond');
    const assumed = chooseAction(state, 'assume');
    expect(assumed.latest?.accepted).toBe(false);
    const clarified = chooseAction(retryAction(assumed), 'clarify');
    expect(clarified.latest?.accepted).toBe(true);
    expect(clarified.messages.at(-1)?.kind).toBe('draft');
    expect(clarified.latest?.after.action).toBe('respond');
    expect(clarified.latest?.unknowns).toContain('Whether Friday is available or any meeting is agreed.');
  });

  it('puts refusal before shared context and never revives closure after a late reply', () => {
    let state = actAndAdvance(startDebugger('shared'), 'context');
    state = actAndAdvance(state, 'unknown');
    state = actAndAdvance(state, 'clarify');
    expect(inspectSnapshot(state).action).toBe('stop');
    const attempt = chooseAction(state, 'context');
    expect(attempt.latest?.accepted).toBe(false);
    expect(attempt.latest?.after.trace).toEqual(['terminal']);
    state = actAndAdvance(retryAction(attempt), 'close');
    expect(state.sceneId).toBe('shared-late');
    expect(state.snapshot.inbound).toBe('reply');
    expect(state.snapshot.closed).toBe(true);
    expect(chooseAction(state, 'reopen').latest?.accepted).toBe(false);
    const ended = chooseAction(state, 'keep-closed');
    expect(ended.latest?.after.action).toBe('stop');
    expect(ended.latest?.next).toBeNull();
    expect(ended.latest?.after.trace).toEqual(['terminal']);
    expect(ended.messages).toEqual(state.messages);
  });

  it('holds unknown history for review; recovering a refusal selects stop', () => {
    const state = startDebugger('history');
    expect(inspectSnapshot(state).action).toBe('review');
    expect(chooseAction(state, 'context').latest?.accepted).toBe(false);
    const reviewed = chooseAction(state, 'review');
    expect(reviewed.latest?.accepted).toBe(true);
    expect(reviewed.snapshot).toEqual(state.snapshot);
    const refusal = advanceDebugger(reviewed);
    expect(inspectSnapshot(refusal).action).toBe('stop');
    expect(chooseAction(refusal, 'context').latest?.accepted).toBe(false);
    expect(chooseAction(refusal, 'close').snapshot.closed).toBe(true);
  });

  it('allows a local ending without inferring the reason for silence', () => {
    const state = actAndAdvance(startDebugger('missing'), 'plain');
    const ended = chooseAction(state, 'close');
    expect(ended.latest?.accepted).toBe(true);
    expect(ended.snapshot.closed).toBe(true);
    expect(ended.snapshot.boundary).toBe('clear');
    expect(ended.snapshot.inbound).toBe('none');
    expect(ended.latest?.next).toBeNull();
  });

  it('exports an independent trace, resets cleanly and rejects unknown controls', () => {
    const state = chooseAction(startDebugger('missing'), 'plain');
    const trace = exportTrace(state);
    expect(trace.version).toBe('romance-debugger-v1');
    expect(trace.fictional).toBe(true);
    expect(trace.history.map(row => row.choiceId)).toEqual(['plain']);
    trace.history.length = 0;
    expect(state.history).toHaveLength(1);
    expect(startDebugger('missing').history).toEqual([]);
    expect(startDebugger('missing').snapshot.sent).toBe(false);
    expect(() => startDebugger('not-a-case')).toThrow();
    expect(() => chooseAction(startDebugger('shared'), 'not-an-action')).toThrow();
    expect(advanceDebugger(startDebugger('shared'))).toEqual(startDebugger('shared'));
  });
});
