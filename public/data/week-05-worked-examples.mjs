// Save this file, week-05-cases.json, week-05-models.mjs,
// romance-models.mjs and null-island-controls.csv together; run with Node.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { mutualProbability, pairSummary, independentOpportunities, venueDecision, windowRate } from './week-05-models.mjs';
import { qualityScore, conservativeRank } from './romance-models.mjs';

const close = (actual, expected) => assert(Math.abs(actual - expected) < 1e-9);
const cases = JSON.parse(readFileSync(new URL('week-05-cases.json', import.meta.url), 'utf8'));
assert.equal(cases.version, 'week-05-v1');
const pair = pairSummary(cases.pairTable);
assert.equal(pair.total, 100);
close(pair.joint, 0.06);
close(pair.pB, 0.13);
const p = mutualProbability(cases.repeated.pA, cases.repeated.pBGivenA);
assert.equal(cases.repeated.opportunities, 20);
const independent = independentOpportunities(Array(cases.repeated.opportunities).fill(p));
close(independent.expected, 1.2);
close(independent.atLeastOne, 0.709893758869);
const heterogeneous = independentOpportunities([...Array(10).fill(0.02), ...Array(10).fill(0.1)]);
// Alternative JOINT model: a single Bernoulli draw sets every indicator.
const sharedShock = { expected: 20 * p, atLeastOne: p, none: 1 - p };
const sensitivity = [0.1, 0.2, 0.4].map(conditional => ({ conditional,
  joint: mutualProbability(0.3, conditional),
  ...independentOpportunities(Array(20).fill(mutualProbability(0.3, conditional))) }));
const venues = cases.venues.map(venue => ({ id: venue.id, ...venueDecision(venue) }));
assert.deepEqual(venues.map(v => [v.minutes, v.costCents, v.feasible]), [[100, 1400, true], [130, 1600, false], [90, 2200, false]]);
const windows = cases.windows.map(w => ({ ...w, rate: windowRate(w.matches, w.exposures) }));
assert.deepEqual(windows.map(w => w.rate), [0.2, 0.3]);
const strategies = cases.capStrategies.map(s => ({ ...s, expected: s.eligible * mutualProbability(s.pA, s.pBGivenA) }));
strategies.forEach(s => close(s.expected, 1.2));

const [header, ...lines] = readFileSync(new URL('null-island-controls.csv', import.meta.url), 'utf8').trim().split(/\r?\n/);
assert.equal(header, 'id,clarity,specificity,feasibility,exit');
assert.equal(lines.length, 99, 'Null Island v1 requires 99 controls');
const ids = new Set();
const controls = lines.map(line => {
  const fields = line.split(',');
  assert.equal(fields.length, 5);
  const [id, ...ratings] = fields;
  assert(id && !ids.has(id), 'Each control needs a unique ID');
  ids.add(id);
  assert(ratings.every(value => /^[0-4]$/.test(value)), 'Each feature must be an integer 0–4');
  return qualityScore(ratings.map(Number));
});
const benchmark = { entries: controls.length + 1, bestControl: Math.max(...controls),
  examples: [[4, 4, 3, 4], [4, 4, 4, 4]].map(features => {
    const score = qualityScore(features);
    return { features, score, rank: conservativeRank(score, controls) };
  }) };
assert.equal(benchmark.bestControl, 93.75);
assert.equal(benchmark.examples[1].rank, 1);
console.log(JSON.stringify({ scope: cases.scope, pair, independent, heterogeneous, sharedShock,
  sensitivity, venues, windows, strategies, benchmark }, null, 2));
