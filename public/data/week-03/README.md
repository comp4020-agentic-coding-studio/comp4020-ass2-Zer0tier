# SLOP1276 Week 3 photo kit

Unzip the kit, open its week-03 directory and run:

    node worked-examples.mjs

No packages, network, camera or app account are needed. The script prints a JSON
calculation log and checks the image bytes against their recorded SHA-256
fingerprints. Use any language, calculator or hand trace for your own attempt.

All five SVG files are original course-authored schematic illustrations of
fictional adults. They are not real photographs and make no claim about Alex's
actual appearance. The A label is supplied case annotation, not face recognition.
The C record deliberately has an unknown permission status within the fictional
exercise; the artwork itself was created for this kit. Keep that distinction.

manifest.json records three assets, two derived crops, mock confidence scores,
four arbitrary-unit lighting scenarios and the selected A-portrait-v1 revision.
The cropped SVG viewBox rectangles use the source's 600 by 400 coordinate grid.
No face detector was run; the confidence scores and review labels are invented.

identification-trials.csv is a separate synthetic 30-trial exercise, not an
evaluation of these three drawings. Each row is a mock annotation task under
the rule "can the intended subject be uniquely identified from supplied cues?"
1 means identification failed; 0 means it passed. Both reviewer columns are
invented. The categories do not establish facts about real dating photographs.

Expected outputs: lighting ratios 2, 4, 1, 2; reviewer 1 failures 6/10, 2/10 and
3/10; group reviewer agreement 8/10; ambiguity fraction 1/3; A's retained area
1/2. A passes the information checks; B has unresolved identity and an ambiguous
crop; C has unknown exercise permission and an obscured subject.

For Week 4, both bio variants use the same frozen file, revision, crop, alt text
and byte fingerprint. Preserve rejected records with their reasons. A byte hash
detects a file change; it does not prove identity, permission or truth.

For an extension, work in a copy: alter a crop or image byte and observe the
failed check. Document a new revision and review it before creating a new freeze.
Do not replace the original fixture while describing results as the baseline.
