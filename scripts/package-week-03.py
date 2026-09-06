"""Build the Week 3 SVG crops, byte fingerprints and reproducible teaching ZIP.

Run from anywhere: python3 scripts/package-week-03.py
Only the two declared crop derivatives and the kit metadata/archive are written.
"""
import hashlib
import json
from pathlib import Path
import re
from zipfile import ZipFile, ZipInfo, ZIP_DEFLATED

root = Path(__file__).resolve().parents[1]
kit = root / 'public/data/week-03'
manifest_path = kit / 'manifest.json'
manifest = json.loads(manifest_path.read_text())
for asset in manifest['assets']:
    asset['source_sha256'] = hashlib.sha256((kit / asset['source_file']).read_bytes()).hexdigest()
    asset['detector_scope'] = 'Mock face-presence score for source_file; not a calibrated probability'
    if asset['file'] != asset['source_file']:
        source = (kit / asset['source_file']).read_text()
        crop = asset['crop']
        opening = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{crop["width"]}" '
                   f'height="{crop["height"]}" viewBox="{crop["x"]} {crop["y"]} '
                   f'{crop["width"]} {crop["height"]}" role="img" aria-labelledby="title desc">')
        source, count = re.subn(r'<svg\b[^>]*>', lambda _: opening, source, count=1)
        assert count == 1
        source, count = re.subn(r'<desc id="desc">.*?</desc>', lambda _: f'<desc id="desc">{asset["alt"]}</desc>', source)
        assert count == 1
        (kit / asset['file']).write_text(source)
    asset['sha256'] = hashlib.sha256((kit / asset['file']).read_bytes()).hexdigest()
selected = next(asset for asset in manifest['assets'] if asset['id'] == manifest['frozen']['asset_id'])
manifest['frozen']['sha256'] = selected['sha256']
manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n')

files = ['README.md', 'manifest.json', 'identification-trials.csv', 'worked-examples.mjs',
         'photo-a.svg', 'photo-a-crop.svg', 'photo-b.svg', 'photo-b-crop.svg', 'photo-c.svg']
archive = root / 'public/data/week-03-photo-kit.zip'
with ZipFile(archive, 'w') as bundle:
    for name in files:
        entry = ZipInfo(f'week-03/{name}', date_time=(2026, 9, 6, 0, 0, 0))
        entry.compress_type = ZIP_DEFLATED
        entry.external_attr = 0o100644 << 16
        bundle.writestr(entry, (kit / name).read_bytes())
print(f'Packaged {len(files)} files; frozen asset {selected["revision"]}.')
