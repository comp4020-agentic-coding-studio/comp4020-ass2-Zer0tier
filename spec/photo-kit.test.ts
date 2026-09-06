// Exercise the exact student download, including its image/manifest contract.
// These checks do not judge image quality or the truth of authored annotations.
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { inflateRawSync } from 'node:zlib';
import { spawnSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

// The authored archive uses ordinary deflated entries without data descriptors.
// Read its local records so the test needs no OS zip utility or new dependency.
function kitFiles() {
  const zip = readFileSync('dist/data/week-03-photo-kit.zip');
  const files = new Map<string, Buffer>();
  let offset = 0;
  while (zip.readUInt32LE(offset) === 0x04034b50) {
    expect(zip.readUInt16LE(offset + 6) & 9).toBe(0); // No encryption or trailing sizes.
    expect(zip.readUInt16LE(offset + 8)).toBe(8);
    const compressedSize = zip.readUInt32LE(offset + 18);
    const size = zip.readUInt32LE(offset + 22);
    const nameLength = zip.readUInt16LE(offset + 26);
    const extraLength = zip.readUInt16LE(offset + 28);
    const name = zip.subarray(offset + 30, offset + 30 + nameLength).toString();
    const start = offset + 30 + nameLength + extraLength;
    const bytes = inflateRawSync(zip.subarray(start, start + compressedSize));
    expect(bytes.length).toBe(size);
    expect(files.has(name)).toBe(false);
    files.set(name, bytes);
    offset = start + compressedSize;
  }
  expect([...files.keys()].sort()).toEqual([
    'README.md', 'manifest.json', 'identification-trials.csv', 'worked-examples.mjs',
    'photo-a.svg', 'photo-a-crop.svg', 'photo-b.svg', 'photo-b-crop.svg', 'photo-c.svg',
  ].map(name => `week-03/${name}`).sort());
  return files;
}

function runKit(change?: (folder: string) => void) {
  const folder = mkdtempSync(join(tmpdir(), 'slop1276-photo-'));
  try {
    for (const [name, bytes] of kitFiles()) writeFileSync(join(folder, name.slice('week-03/'.length)), bytes);
    change?.(folder);
    return spawnSync(process.execPath, [join(folder, 'worked-examples.mjs')], { encoding: 'utf8' });
  } finally {
    rmSync(folder, { recursive: true, force: true });
  }
}

describe('the Week 3 photo handoff', () => {
  it('ships the same kit files individually and in the archive, with reproducible answers', () => {
    for (const [name, bytes] of kitFiles()) expect(bytes.equals(readFileSync(`dist/data/${name}`))).toBe(true);
    const result = runKit();
    expect(result.status, result.stderr).toBe(0);
    const report = JSON.parse(result.stdout);
    expect(report.lighting.map((row: any) => row.keyFill)).toEqual([2, 4, 1, 2]);
    expect(report.failureRates.map((row: any) => [row.trials, row.failures])).toEqual([[10, 6], [10, 2], [10, 3]]);
    expect(report.groupAgreement).toBe(0.8);
    expect(report.disagreements).toEqual(['G06', 'G07']);
    expect(report.ambiguityFraction).toBeCloseTo(1 / 3, 12);
    expect(report.retainedArea).toBe(0.5);
    expect(report.decisions.map((row: any) => [row.id, row.eligible])).toEqual([['A', true], ['B', false], ['C', false]]);
    expect(report.frozen.revision).toBe('A-portrait-v1');
  });

  it('rejects changed image bytes under the frozen filename', () => {
    const result = runKit(folder => {
      const file = join(folder, 'photo-a-crop.svg');
      writeFileSync(file, Buffer.concat([readFileSync(file), Buffer.from('\n')]));
    });
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('Bytes changed: photo-a-crop.svg');
  });

  it('rejects a handoff crop that differs from the reviewed asset', () => {
    const result = runKit(folder => {
      const file = join(folder, 'manifest.json');
      const manifest = JSON.parse(readFileSync(file, 'utf8'));
      expect(manifest.frozen.crop.x).toBe(150);
      manifest.frozen.crop.x = 151;
      writeFileSync(file, JSON.stringify(manifest));
    });
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('Frozen crop differs from reviewed asset');
  });
});
