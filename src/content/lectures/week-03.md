---
title: "Data Acquisition: Photography as a Quantitative Asset"
description: "Treat profile photos as traceable information assets. Test lighting, identity ambiguity and detection confidence using fictional image records."
week: 3
date: 2027-03-08
teachers: [mira-chen]
keyConcept: "Minimizing the “Is that their ex cropped out?” uncertainty variable"
slides: /decks/week-03/
related: [sessions/03-photo-assets]
---

## Your first data pipeline has a camera

A profile photograph is an information asset, not a universal attractiveness measurement. This week turns the [Week 2 platform audit](/sessions/02-platforms/) into a **Photo asset manifest**: an inspectable record of where an image came from, what changed, what it shows and why it was selected. A crisp answer to the wrong question is still the wrong answer.

By the end, you should be able to record provenance and transformations, calculate a declared lighting ratio and identification-failure rate, separate detection from identity, and freeze an image for a controlled bio comparison. Use the supplied schematic drawings or your own fictional placeholders. No camera, face detector or personal photograph is required.

## Using the 47-slide teaching pack

The full route takes **180 minutes including a 10-minute break**. It budgets time for active work, not just reading slides. Split it across the scheduled lecture, the existing 90-minute tutorial and guided study as needed. Carry work forward and do each exercise once; teaching dates and tutorial duration are unchanged.

| Elapsed time | Slides | Work and evidence produced |
| --- | --- | --- |
| 0–25 min | 1–9 | 10 min case and history, 6 min provenance exercise, 9 min review |
| 25–55 min | 10–17 | 10 min lighting concepts, 6 min ratios, 4 min answers, 5 min controlled comparison, 5 min capture record |
| 55–90 min | 18–26 | 12 min crop illustrations, 8 min coordinates, 6 min uncertainty annotations, 9 min identity/detection debrief |
| 90–100 min | 27 | Break |
| 100–135 min | 28–35 | 8 min annotation rule, 6 min calculations, 7 min denominators, 4 min reviewer comparison, 6 min answers, 4 min sensitivity |
| 135–165 min | 36–42 | 8 min manifest fields, 5 min alt text, 4 min answers, 8 min implementation, 5 min selection review |
| 165–180 min | 43–47 | 5 min freeze, 4 min experiment repair, 3 min handoff, 3 min exit check |

For another 15–25 minutes, try a second valid crop and explain which evidence it removes; change an image byte in a copy and observe the failed fingerprint check; or add an empty trial category and handle its undefined rate. Record a new revision rather than silently editing the baseline.

## Download the fictional photo kit

The [complete photo kit ZIP](/data/week-03-photo-kit.zip) contains nine files: three original SVG drawings, two crop derivatives, a manifest, a 30-row annotation CSV, a worked-example script and a README. All drawings show fictional adults; their colours and appearance are illustrative, not additional facts about Alex. The confidence scores and reviewer labels are invented. No detector or annotation study was run.

You can also inspect the [manifest JSON](/data/week-03/manifest.json), [trial CSV](/data/week-03/identification-trials.csv) and [workbook](/data/week-03/worked-examples.mjs) directly. The three-asset manifest and the thirty-trial dataset are **separate teaching fixtures**, not joined observations of the same images.

## Provenance and the case · slides 4–9

Alex remains the [fixed fictional adult CS student](/toolkit/#benchmark): board games, terrible puns, Friday 5–7 pm availability, $20 total outing budget, bus travel, and an aim to meet someone with the possibility of a relationship. Week 2 separated supplied inputs, recorded events and unknowns. Apply that boundary to the image record.

| Asset | Supplied evidence | Unresolved information |
| --- | --- | --- |
| A | Course-drawn source; Alex label; exercise permission recorded | The drawing cannot establish any real person's appearance or motivation |
| B | Course-drawn group source; exercise permission recorded | Neither figure is identified; a crop leaves part of a second figure at the edge |
| C | Course-drawn mirror source; a phone obscures part of the face | Exercise permission is unknown; intended subject unresolved |

**Exercise:** create source, permission, intended-subject and unknown fields for each. Can a clear-looking image repair missing permission?

**Answer:** no. Keep C's missing exercise field visible and block selection until supported information is supplied. All artwork was created for this course; the deliberately incomplete permission record is part of the fictional exercise, not an assertion about the artwork's actual origin. Retain the source for all three records, including those you reject.

The asset history runs **source → derivative → review → freeze**. Each derivative keeps a source link, crop rectangle and revision. A label supplied by the case can support identity within the exercise; a detection box cannot supply that label by itself.

## Light as a measured input · slides 10–17

[Nikon's introduction to three-point lighting](https://www.nikonusa.com/learn-and-explore/c/tips-and-techniques/introduction-to-three-point-lighting-other-video-lighting-techniques) describes a main light, a fill that reduces shadows and an accent light. This supports the role distinction; it does not establish a lighting ratio that improves dating outcomes. The deck's setup diagram shows two light sources and a camera, with schematic positions only.

For our **constructed exercise**, define key-to-fill as an isolated key-source reading divided by an isolated fill-source reading, using the same arbitrary unit, measurement location and setup. This is a declared source-reading convention, not a measured bright-side/shadow-side ratio in a finished image.

| Record | Key | Fill | Key / fill |
| --- | --- | --- | --- |
| L1 | 200 | 100 | **2:1** |
| L2 | 200 | 50 | **4:1** |
| L3 | 100 | 100 | **1:1** |
| L4 | 400 | 200 | **2:1** |

**Exercise and answer:** halving L1's fill gives L2, doubling the ratio. Doubling both original readings gives L4: the absolute readings change but the ratio does not. A zero fill reading makes the finite ratio undefined; the workbook returns `null`. Negative or non-finite readings are invalid.

A ratio does not reconstruct camera exposure, colour, pose or background. The deck's low/high separation illustration changes drawn foreground/background colours, not a simulated light source. Do not treat its pixel values as a light-meter measurement.

**Controlled-comparison exercise:** propose a test of whether a fill change alters visible shadow detail in one setup. Keep subject, pose, framing, background and camera settings fixed; change the fill input; define a shadow-detail annotation rule before judging the result. Record setup ID, source, settings if applicable, readings, units and the changed input. Our numerical fixture has no observed shadow-detail outcomes, so it cannot show that the hypothesis passed. A written procedure is sufficient.

## Crops need coordinates and context · slides 18–24

The original drawing below places fictional Alex, with a supplied label, behind game tiles. The kit's portrait derivative keeps the label and tiles.

![Original teaching drawing: a labelled fictional Alex behind three game tiles, within a 600 by 400 coordinate frame.](/data/week-03/photo-a.svg)

Record the crop as `(x, y, width, height)` in the original image's coordinate system. These SVG drawings use a **600 × 400 coordinate grid**; the exercise does not claim that this is a platform's required upload resolution.

For A, `(150, 0, 300, 400)` retains 300 × 400 / (600 × 400) = **50%** of the source area. Its right boundary is 450 ≤ 600 and its bottom is 400 ≤ 400. The rectangle is valid. A proposed crop at x = 450 with width 300 reaches 750 and must be rejected. Require non-negative origins, positive dimensions and a rectangle inside the source bounds.

**Exercise:** check those bounds, then inspect whether the identity label and relevant objects remain visible. The answer is yes for A's supplied crop. Retained area is a geometric fraction, not an information-quality score: removing half the area can preserve the cues needed for the task.

### Key concept: the cropped-ex uncertainty variable

In B's [original group drawing](/data/week-03/photo-b.svg), neither adult is identified. The crop below leaves part of the second figure visible. The source cannot establish their relationship either.

![Teaching crop of two unlabelled fictional adults: the blue figure is complete and the rose figure is cut by the right edge. Their relationship is unspecified.](/data/week-03/photo-b-crop.svg)

**Exercise:** compare “a second figure is partially visible at the edge” with “that is Alex's ex, cropped out”. The first describes visible content. The second invents both identity and relationship history. Record `crop_ambiguous: true` and `subject_clear: false`; retain the source and request a supported subject label or a different asset. A speculative caption cannot restore missing context.

One ambiguous crop among the three records gives **1/3** under the supplied binary crop rule. C's separate occlusion and permission problems do not increase this crop-specific numerator. Two non-ambiguous crops do not imply two acceptable assets.

## Confidence is not chemistry · slides 25–26

[Google's ML Kit documentation](https://developers.google.com/ml-kit/vision/face-detection) distinguishes detecting faces from recognising individuals. Our diagram uses authored boxes and a **mock source-image face-presence confidence of 0.98** for B; it is not an ML Kit output or a calibrated probability. Neither a box nor that score identifies the intended subject.

A's lower mock score, 0.92, coexists with stronger supplied identity evidence. A detector's score concerns its declared task, not honesty, compatibility or consent. Keep the score, its scope, the intended-subject label and the supporting cue in separate fields. Do not sort by a number that answers the wrong question.

## Annotation and denominators · slides 28–35

Define a failure as **the supplied cues do not uniquely identify the intended subject**. Each CSV row is an invented annotation task. `failure_r1` and `failure_r2` are fabricated reviewer labels: 1 = failure, 0 = pass. They are not real responses from students or app users, and the categories are not inferred from our three drawings.

| Category | Reviewer 1 failures | Trials | Failure fraction |
| --- | --- | --- | --- |
| Group photos | 6 | 10 | **60%** |
| Fishing photos | 2 | 10 | **20%** |
| Mirror selfies | 3 | 10 | **30%** |

**Exercise:** group the CSV by category, sum reviewer 1's labels and divide by the category's row count. Require unique trial IDs and binary labels. The denominator is ten trials per category, not three assets and not exposures from Week 2. A category with zero trials has an undefined rate.

Pooling this specific fixture gives (6 + 2 + 3) / 30 = **11/30 ≈ 36.7%**. Because group sizes happen to be equal, averaging the three rates gives the same result here. With unequal sizes, use total failures / total trials rather than an unweighted average. These constructed counts do not estimate dating failure rates or identify a universally best photo type.

**Reviewer exercise:** compare G01–G10 row by row. Each reviewer marks six failures, but they disagree on **G06 and G07**. They agree on **8/10 = 80%** of labels. Equal totals do not imply identical annotations, and agreement is not correctness. Clarify what counts as a supplied identifying cue; adjudicate disagreements using the rule and reference evidence, not whichever score is larger.

**Sensitivity answer:** in a separate copy, change reviewer 1's G06 from 1 to 0. Group failures change from 6/10 to 5/10, or **60% to 50%**. Preserve the baseline and log why the label changed. This demonstrates the effect of one annotation in a small fixture; it does not discover a fact about group photographs.

## Build and review the manifest · slides 36–42

Each record needs an asset ID, original source, exercise permission status, intended subject and supporting cue, source size, crop rectangle, revision, ambiguity flag, relevant alt text, mock score with its scope, and a decision with reasons. A missing required source or invalid rectangle is a validation failure. Known uncertainty such as C's `permission: unknown` is retained as a blocked record.

[W3C's informative-image guidance](https://www.w3.org/WAI/tutorials/images/informative/) explains that text alternatives convey the image's relevant meaning or content. Here the visible identity cue and crop are part of the teaching task. “Photo” omits that information; “attractive and trustworthy” supplies unsupported claims.

**Alt-text exercise and answer:** describe A's actual crop in one sentence. The reference is: “Teaching illustration of fictional Alex, labelled on a blue top, behind a table with three game tiles.” For B, describe two unlabelled adults and the partly cut figure, while leaving their relationship unknown. Check the words against the image, not an imagined biography.

**Implementation exercise:** validate the records and return pass/block with reasons. Required acceptance conditions are recorded source and permission, a supported subject, a valid crop, no unresolved crop ambiguity and useful alt text. Confidence does not override any condition. Test a blank source and an out-of-bounds crop before selecting from the eligible set.

**Worked selection:** A passes. B is blocked for unresolved identity and crop ambiguity. C is blocked for unknown exercise permission and an obscured subject. Keep all three records and the rejection reasons. One asset passes even though only one crop has the ambiguity flag: they measure different conditions.

## Freeze the image for Week 4 · slides 43–47

The selected revision is **A-portrait-v1**, file `photo-a-crop.svg`, rectangle `(150, 0, 300, 400)`. The manifest stores its alt text and SHA-256 byte fingerprint. A fingerprint detects changed bytes; it does not establish identity, provenance or permission. Review provides those annotations.

**Repair exercise:** if bio A uses photo A and bio B uses photo B, a response difference cannot be attributed specifically to the bio. Both variants should use the same frozen file, crop, alt text and display treatment; the planned difference is the bio text. Fixing the photo does not by itself solve audience allocation or other experimental problems. [Week 4](/lectures/week-04/) supplies that protocol.

**Run the reference:** extract the kit, open its `week-03` directory and run:

```sh
node worked-examples.mjs
```

The script needs no packages or network. It reproduces ratios, failure rates, reviewer agreement, crop area and selection; validates image fingerprints and crop metadata; and prints a JSON log. Consult it after your own attempt. A calculator, hand trace or another language is equally suitable. The kit README describes the fixture boundaries and an optional change-detection exercise.

The [tutorial](/sessions/03-photo-assets/) produces the manifest, source/derivative files, calculation log, selected revision and reasons for retaining two rejected alternatives. The [data report](/assessments/market-report/) uses this work to explain why non-bio inputs must stay fixed; it does not require a candidate profile.

**Exit answers:** 200/50 gives 4:1; 0.98 does not identify which figure is Alex; changing the crop adds another changed input. Carry the manifest forward, including its uncertainties.

The three external readings above were checked on **6 September 2026**. They support lighting roles, detector scope and text alternatives; the course's invented numerical fixtures provide no claim about real romantic outcomes. Recheck the pages before teaching in 2027.
