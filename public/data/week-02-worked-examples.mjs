// SLOP1276 Week 2. All data and allocation rules below are synthetic.
// Save this file, romance-models.mjs and both named CSVs in one directory.
// Run: node week-02-worked-examples.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { eloUpdate } from './romance-models.mjs';

function readCounts(filename, columns, keyColumns) {
  const [header, ...lines] = readFileSync(new URL(filename, import.meta.url), 'utf8').trim().split(/\r?\n/);
  assert.equal(header, columns.join(','), `Unexpected columns in ${filename}`);
  const keys = new Set();
  return lines.map(line => {
    const fields = line.split(',');
    assert.equal(fields.length, columns.length, 'Unexpected number of fields');
    const key = fields.slice(0, keyColumns).join('/');
    assert(!keys.has(key), `Duplicate row: ${key}`);
    keys.add(key);
    const counts = fields.slice(keyColumns).map(value => {
      assert(/^\d+$/.test(value), 'Counts must be whole non-negative numbers');
      const count = Number(value);
      assert(Number.isSafeInteger(count), 'Count exceeds safe integer range');
      return count;
    });
    return [...fields.slice(0, keyColumns), ...counts];
  });
}
const close = (actual, expected) => assert(Math.abs(actual - expected) < 1e-8, `${actual} differs from ${expected}`);
const ratio = (numerator, denominator) => denominator === 0 ? null : numerator / denominator;

const elo = {
  equalWin: eloUpdate(1200, 1200, 1),
  equalLoss: eloUpdate(1200, 1200, 0),
  largerK: eloUpdate(1200, 1200, 1, 64),
  unexpectedWin: eloUpdate(1200, 1600, 1),
  expectedLoss: eloUpdate(1200, 1600, 0),
  sequential: eloUpdate(eloUpdate(1200, 1200, 1), 1200, 0),
};
assert.equal(elo.equalWin, 1216);
assert.equal(elo.equalLoss, 1184);
assert.equal(elo.largerK, 1232);
close(elo.unexpectedWin, 1229.090909090909);
close(elo.expectedLoss, 1197.090909090909);
close(elo.sequential, 1199.263693206478);
for (const inputs of [[1200, 1200, 1, 0], [Infinity, 1200, 1, 32], [1200, 1200, 2, 32]]) {
  assert.throws(() => eloUpdate(...inputs), RangeError);
}

const market = readCounts('null-island-market.csv', ['zone', 'active_profiles', 'available_profiles', 'reciprocal_profiles'], 1);
for (const [zone, active, available, reciprocal] of market) {
  assert(reciprocal <= available && available <= active, `Non-nested counts in ${zone}`);
}
const totals = [1, 2, 3].map(column => market.reduce((sum, row) => sum + row[column], 0));
assert.deepEqual(totals, [300, 150, 40]);
// A separate scenario: the baseline CSV remains unchanged.
const recount = market.map(([zone, active, available, reciprocal]) =>
  [zone, active + (zone === 'East' ? 50 : 0), available, reciprocal]);
const recountTotals = [1, 2, 3].map(column => recount.reduce((sum, row) => sum + row[column], 0));
assert.deepEqual(recountTotals, [350, 150, 40]);
const census = {
  totals, recountTotals,
  reciprocalAmongActive: ratio(totals[2], totals[0]),
  reciprocalAmongAvailable: ratio(totals[2], totals[1]),
  reciprocalAmongActiveAfterRecount: ratio(recountTotals[2], recountTotals[0]),
  reciprocalAmongAvailableAfterRecount: ratio(recountTotals[2], recountTotals[1]),
};
assert.equal(ratio(0, 0), null); // Undefined, not a measured 0%.

const exposures = readCounts('week-02-exposures.csv', ['scenario', 'profile', 'exposures', 'likes'], 2);
const exposureRates = {};
for (const [scenario, profile, shown, likes] of exposures) {
  assert(likes <= shown, 'A like requires an exposure in this fixture');
  exposureRates[scenario] ??= {};
  exposureRates[scenario][profile] = ratio(likes, shown);
}
assert.deepEqual(exposureRates, {
  equal_counts: { A: 0.02, B: 0.2 },
  rank_reversal: { A: 0.08, B: 0.2 },
});

// Expected-value demonstration, not a random simulation or a platform claim.
const seeds = [6, 4], budget = 1000, probability = 0.1;
const allocated = seeds.map(likes => budget * likes / (seeds[0] + seeds[1]));
const cumulative = allocated.map((shown, index) => seeds[index] + shown * probability);
const equalCumulative = seeds.map(likes => likes + budget / 2 * probability);
assert.deepEqual(allocated, [600, 400]);
assert.deepEqual(cumulative, [66, 44]);
assert.deepEqual(equalCumulative, [56, 54]);
const feedback = {
  proportional: { exposures: allocated, cumulative, shareA: ratio(cumulative[0], cumulative[0] + cumulative[1]) },
  equal: { exposures: [500, 500], cumulative: equalCumulative, shareA: ratio(equalCumulative[0], equalCumulative[0] + equalCumulative[1]) },
};
console.log(JSON.stringify({ elo, census, exposureRates, feedback }, null, 2));
