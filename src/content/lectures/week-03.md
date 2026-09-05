---
title: "Data Acquisition: Photography as a Quantitative Asset"
description: "Treat profile photos as traceable information assets. Test lighting, identity ambiguity and detection confidence using fictional image records."
week: 3
date: 2027-03-08
teachers: [mira-chen]
keyConcept: "Minimizing the “Is that their ex cropped out?” uncertainty variable"
related: [sessions/03-photo-assets]
---

## Your first data pipeline has a camera

A profile photograph is an information asset, not a universal attractiveness measurement. Record provenance, permission, crop, lighting and what a viewer is meant to identify. Use drawings, placeholders or explicitly fictional artwork; nobody needs to upload their face.

For a **constructed lighting exercise**, define the key-to-fill ratio as key-light intensity divided by fill-light intensity. Inputs 200 and 100 arbitrary units give **2:1**. This is our measurement convention, not a claim that a particular ratio causes matches. Background contrast and a crop can change legibility independently of that ratio.

## Confidence is not chemistry

A face detector's confidence concerns its own detection task. It does not measure honesty, compatibility or consent. In our mock asset manifest, a group photo receives confidence 0.98 yet leaves the fictional subject unidentified. A crisp answer to the wrong question is still the wrong answer.

Use this **invented ten-trial-per-category fixture**, where a failure means “the mock annotation cannot identify the intended subject”:

- Group photos: 6 failures out of 10.
- Fishing photos: 2 failures out of 10.
- Mirror selfies: 3 failures out of 10.

These are course inputs, not observed dating failure rates. Different crops, contexts or annotation rules could reverse the order. Do not extrapolate ten fabricated trials into advice for humanity.

## Key concept: the cropped-ex uncertainty variable

Minimise the “Is that their ex cropped out?” uncertainty variable by documenting what the image actually shows—not by asserting who an unseen person was. One ambiguous crop among three candidate assets gives an ambiguity fraction of **1/3** under our binary annotation rule.

Bring three fictional asset records to the tutorial. Test missing provenance, an ambiguous group crop and an unsupported identity claim. Select an asset by information quality, retain the rejected alternatives, and write useful alt text. Week 4 must keep this photo choice fixed while changing the bio; otherwise the experiment changes two inputs at once.

[Continue to the week 3 tutorial](/sessions/03-photo-assets/).
