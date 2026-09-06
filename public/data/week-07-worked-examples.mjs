// Save the five files linked in Week 7 together. Run with Node, offline.
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { poissonSilence } from './romance-models.mjs';
import { analyseGame, compareResponses, startConversation, stepConversation } from './week-07-models.mjs';

const cases = JSON.parse(readFileSync(new URL('week-07-cases.json', import.meta.url), 'utf8'));
assert.equal(cases.version, 'week-07-v1');
for (const rows of [cases.games, cases.traces]) {
  assert(rows.every(row => typeof row.id === 'string' && row.id.length));
  assert.equal(new Set(rows.map(row => row.id)).size, rows.length, 'Duplicate fixture ID');
}
const { ratePerHour, hours, mixture } = cases.arrivals;
const mean = ratePerHour * hours;
assert(Number.isFinite(mean));
const zero = poissonSilence(ratePerHour, hours);
const arrivals = { mean, zero, atLeastOne: 1 - zero, exactlyOne: mean * zero,
  sensitivity: cases.arrivals.rateAlternatives.map(rate => ({ rate, zero: poissonSilence(rate, hours) })) };
assert(Math.abs(zero - 0.44932896411722156) < 1e-12);
assert(mixture.every(row => Number.isFinite(row.weight) && row.weight >= 0));
assert.equal(mixture.reduce((sum, row) => sum + row.weight, 0), 1);
arrivals.mixtureZero = mixture.reduce((sum, row) => sum + row.weight * poissonSilence(row.ratePerHour, hours), 0);
arrivals.mixtureMean = hours * mixture.reduce((sum, row) => sum + row.weight * row.ratePerHour, 0);
const decisions = cases.decision.qValues.map(q => ({ q, ...compareResponses(q, cases.decision) }));
assert.deepEqual(decisions.map(row => row.winners), [['stop'], ['stop', 'wait'], ['wait', 'clarify'], ['clarify']]);
const penalty = compareResponses(0.9, { clarificationCost: 6, clarificationAllowed: true });
assert.deepEqual(penalty.winners, ['wait']);
const excluded = compareResponses(0.9, { clarificationAllowed: false });
assert.deepEqual(excluded.excluded, ['clarify']);
const games = cases.games.map(game => ({ id: game.id, ...analyseGame(game.payoffs) }));
assert.deepEqual(games.map(game => game.equilibria), [[['Ask', 'Ask']], [['Ask', 'Wait'], ['Wait', 'Ask']]]);
const mixedAsk = 2 / 3;
const mixedExpected = { ask: -mixedAsk + 2 * (1 - mixedAsk), wait: 0 };
assert(Math.abs(mixedExpected.ask) < 1e-12);
const traces = cases.traces.map(test => {
  let state = startConversation(cases.handoff, cases.windowHours);
  const log = test.events.map(event => {
    const output = stepConversation(state, event);
    state = output.state;
    assert.equal(output.sendsMessage, false);
    return { event, action: output.action, trace: output.trace, phase: state.phase, observation: state.observation };
  });
  assert.deepEqual({ phase: state.phase, observation: state.observation, closure: state.closure }, test.expected, `Unexpected final state: ${test.id}`);
  return { id: test.id, log, final: test.expected };
});
// Keep the complete machine-readable report when stdout is captured by a runner.
writeFileSync(1, JSON.stringify({ scope: cases.scope, arrivals, decisions, penalty, excluded, games, mixedAsk, mixedExpected, traces }, null, 2) + '\n');
