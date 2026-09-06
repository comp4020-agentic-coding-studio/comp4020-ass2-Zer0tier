// SLOP1276 Week 3: supplied drawings, invented scores and synthetic trials.
// Run inside the extracted kit: node worked-examples.mjs
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const read = name => readFileSync(new URL(name, import.meta.url));
const manifest = JSON.parse(read('manifest.json').toString());
const ratio = (n, d) => d === 0 ? null : n / d;
const fingerprint = name => createHash('sha256').update(read(name)).digest('hex');
const nonempty = value => typeof value === 'string' && value.trim().length > 0;

function keyFill(key, fill) {
  assert([key, fill].every(n => Number.isFinite(n) && n >= 0), 'Use finite non-negative lighting inputs');
  return ratio(key, fill);
}
function checkCrop(crop, sourceSize) {
  const { x, y, width, height } = crop;
  assert([x, y, width, height, ...sourceSize].every(Number.isSafeInteger), 'Use whole coordinate units');
  assert(x >= 0 && y >= 0 && width > 0 && height > 0 && sourceSize.every(n => n > 0), 'Invalid rectangle');
  assert(x + width <= sourceSize[0] && y + height <= sourceSize[1], 'Crop exceeds source bounds');
}
function auditAsset(asset) {
  assert([asset.id, asset.revision, asset.source, asset.source_file, asset.file, asset.intended_subject, asset.alt, asset.detector_scope].every(nonempty), 'Missing provenance, identity note, score scope or alt text');
  assert(['recorded', 'unknown'].includes(asset.permission), 'Unknown permission label');
  assert(typeof asset.subject_clear === 'boolean' && typeof asset.crop_ambiguous === 'boolean', 'Annotations must be explicit booleans');
  assert(Number.isFinite(asset.detector_confidence) && asset.detector_confidence >= 0 && asset.detector_confidence <= 1, 'Mock confidence must lie in [0, 1]');
  assert.equal(asset.source_size.length, 2);
  checkCrop(asset.crop, asset.source_size);
  assert.equal(fingerprint(asset.source_file), asset.source_sha256, `Source bytes changed: ${asset.source_file}`);
  assert.equal(fingerprint(asset.file), asset.sha256, `Bytes changed: ${asset.file}`);
  const svg = read(asset.file).toString();
  const { x, y, width, height } = asset.crop;
  assert(svg.includes(`viewBox="${x} ${y} ${width} ${height}"`), 'Rendered crop differs from recorded rectangle');
  const reasons = [];
  if (asset.permission !== 'recorded') reasons.push('permission unknown');
  if (!asset.subject_clear) reasons.push('intended subject unresolved');
  if (asset.crop_ambiguous) reasons.push('ambiguous crop');
  return { id: asset.id, eligible: reasons.length === 0, reasons };
}

assert.equal(new Set(manifest.assets.map(asset => asset.id)).size, manifest.assets.length, 'Duplicate asset ID');
const decisions = manifest.assets.map(auditAsset);
assert.deepEqual(decisions.filter(row => row.eligible).map(row => row.id), ['A']);
const selected = manifest.assets.find(asset => asset.id === manifest.frozen.asset_id);
assert(selected && decisions.find(row => row.id === selected.id).eligible, 'Frozen asset must pass review');
for (const key of ['revision', 'file', 'crop', 'alt', 'sha256']) {
  assert.deepEqual(manifest.frozen[key], selected[key], `Frozen ${key} differs from reviewed asset`);
}
// A missing source or invalid rectangle is rejected, rather than scored lower.
assert.throws(() => auditAsset({ ...selected, source: '' }));
assert.throws(() => checkCrop({ x: 450, y: 0, width: 300, height: 400 }, [600, 400]));
assert.throws(() => keyFill(-200, 100));
assert.throws(() => keyFill(Infinity, 100));
assert.equal(keyFill(200, 0), null);
const lighting = manifest.lighting.map(row => ({ id: row.id, keyFill: keyFill(row.key, row.fill) }));
assert.deepEqual(lighting.map(row => row.keyFill), [2, 4, 1, 2]);

const [header, ...lines] = read('identification-trials.csv').toString().trim().split(/\r?\n/);
assert.equal(header, 'trial_id,category,failure_r1,failure_r2');
const seen = new Set();
const trials = lines.map(line => {
  const fields = line.split(',');
  assert.equal(fields.length, 4);
  const [id, category, first, second] = fields;
  assert(nonempty(id) && !seen.has(id), 'Missing or duplicate trial ID');
  seen.add(id);
  assert(['group', 'fishing', 'mirror'].includes(category));
  assert(['0', '1'].includes(first) && ['0', '1'].includes(second), 'Failure labels must be 0 or 1');
  return { id, category, first: Number(first), second: Number(second) };
});
const failureRates = ['group', 'fishing', 'mirror'].map(category => {
  const rows = trials.filter(row => row.category === category);
  const failures = rows.reduce((sum, row) => sum + row.first, 0);
  return { category, trials: rows.length, failures, rate: ratio(failures, rows.length) };
});
assert.deepEqual(failureRates.map(row => [row.trials, row.failures]), [[10, 6], [10, 2], [10, 3]]);
const group = trials.filter(row => row.category === 'group');
const disagreements = group.filter(row => row.first !== row.second).map(row => row.id);
assert.deepEqual(disagreements, ['G06', 'G07']);
const groupAgreement = ratio(group.length - disagreements.length, group.length);
assert.equal(groupAgreement, 0.8);
assert.equal(group.reduce((sum, row) => sum + row.second, 0), 6);
const ambiguityFraction = ratio(manifest.assets.filter(asset => asset.crop_ambiguous).length, manifest.assets.length);
assert.equal(ambiguityFraction, 1 / 3);
const retainedArea = selected.crop.width * selected.crop.height / (selected.source_size[0] * selected.source_size[1]);
assert.equal(retainedArea, 0.5);

console.log(JSON.stringify({ lighting, failureRates, groupAgreement, disagreements, ambiguityFraction, retainedArea, decisions, frozen: manifest.frozen }, null, 2));
