// SLOP1276 Week 4. All texts and counts are fictional teaching fixtures.
// Save this file, week-04-bios.json, week-04-text.mjs, bio-exposures.csv
// and romance-models.mjs together. Run: node week-04-worked-examples.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { analyseBio } from './week-04-text.mjs';
import { compareBios } from './romance-models.mjs';

const close = (actual, expected) => assert(Math.abs(actual - expected) < 1e-8);
const bios = JSON.parse(readFileSync(new URL('week-04-bios.json', import.meta.url), 'utf8'));
const texts = Object.fromEntries(bios.candidates.map(({ id, text }) => [id, analyseBio(text, bios.phrases)]));
assert.deepEqual(Object.keys(texts), ['A', 'B']);
assert.deepEqual([texts.A.codePoints, texts.B.codePoints], [80, 101]);
assert.deepEqual([texts.A.tokens.length, texts.B.tokens.length], [14, 20]);
assert.deepEqual(texts.A.matchedIndices, [3, 4, 5]);
close(texts.A.tokenShare, 3 / 14);
assert.equal(texts.B.tokenShare, 0);
const repair = analyseBio(bios.repair);
assert.equal(repair.codePoints, 103);

const [header, ...lines] = readFileSync(new URL('bio-exposures.csv', import.meta.url), 'utf8').trim().split(/\r?\n/);
assert.equal(header, 'zone,variant,exposures,positive_responses');
const seen = new Set();
const rows = lines.map(line => {
  const fields = line.split(',');
  assert.equal(fields.length, 4);
  const [zone, variant, n, x] = fields;
  assert(['North', 'South'].includes(zone) && ['A', 'B'].includes(variant));
  const key = `${zone}/${variant}`;
  assert(!seen.has(key), `Duplicate cell ${key}`);
  seen.add(key);
  assert(/^\d+$/.test(n) && /^\d+$/.test(x), 'Counts must be non-negative whole numbers');
  const exposures = Number(n), positives = Number(x);
  assert(Number.isSafeInteger(exposures) && Number.isSafeInteger(positives));
  assert(exposures > 0 && positives <= exposures, 'Require positive exposure count and positives <= exposures');
  return { zone, variant, exposures, positives, rate: positives / exposures };
});
assert.equal(seen.size, 4, 'Both variants must be present in both zones');
const pooled = {}, standardised = {}, northShare = {};
for (const variant of ['A', 'B']) {
  const cells = rows.filter(row => row.variant === variant);
  const exposures = cells.reduce((sum, row) => sum + row.exposures, 0);
  const positives = cells.reduce((sum, row) => sum + row.positives, 0);
  pooled[variant] = { exposures, positives, rate: positives / exposures };
  // A declared hypothetical target mix, not a causal correction.
  standardised[variant] = cells.reduce((sum, row) => sum + 0.5 * row.rate, 0);
  northShare[variant] = cells.find(row => row.zone === 'North').exposures / exposures;
}
assert.deepEqual(rows.map(row => row.rate), [0.3, 0.35, 0.1, 0.15]);
assert.deepEqual(pooled, { A: { exposures: 100, positives: 26, rate: 0.26 }, B: { exposures: 100, positives: 19, rate: 0.19 } });
close(standardised.A, 0.2);
close(standardised.B, 0.25);
assert.deepEqual(northShare, { A: 0.8, B: 0.2 });

// Separate independent-binomial arithmetic fixture: not pooled CSV totals,
// not observations of these candidate texts, not the proposed stratified trial.
const balanced = compareBios(120, 1000, 140, 1000);
const nullRate = (120 + 140) / 2000;
const nullSE = Math.sqrt(nullRate * (1 - nullRate) * (1 / 1000 + 1 / 1000));
close(balanced.difference, 0.02);
close(balanced.z, 1.329791937084);
const largerFixture = compareBios(1200, 10000, 1400, 10000);
close(largerFixture.z, 4.205171335312);
assert.equal(compareBios(2, 8, 4, 8).z, null);

console.log(JSON.stringify({
  scope: bios.scope,
  texts, repair,
  reversal: { rows, pooled, northShare, standardised },
  balanced: { ...balanced, nullRate, nullSE, relativeChange: balanced.difference / balanced.rateA },
  largerFixture,
}, null, 2));
