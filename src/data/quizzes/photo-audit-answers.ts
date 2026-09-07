import type { AnswerKey } from '../../lib/tutorial-quiz';

export const photoAuditAnswers: AnswerKey = {
  provenance: {
    answer: 'blocked',
    explanation: 'Image quality cannot supply a missing permission record. Preserve the source, the unknown field and the blocking reason; select only when the exercise’s required evidence is present. Deleting the row hides the audit trail, and changing a detection score cannot repair provenance. The missing field is part of the authored fixture, not a claim about the actual course artwork’s permission.',
  },
  lighting: {
    answer: 'isolated',
    explanation: 'Under the declared isolated-source convention, 300/75 = 4:1. Doubling both readings gives 600/150 = 4:1. The calculation (300 + 75)/75 = 5:1 answers a different question. This ratio alone reconstructs neither the finished image nor any dating outcome; a different convention must be stated rather than silently substituted.',
  },
  crop: {
    answer: 25,
    explanation: 'The crop area is 400 × 300 = 120,000; the source area is 800 × 600 = 480,000. Thus 100 × 120,000/480,000 = 25%. Halving both dimensions retains one quarter of the area, not half. The right edge is 200 + 400 = 600 ≤ 800 and the bottom is 100 + 300 = 400 ≤ 600. A valid rectangle and its retained area do not establish that useful identifying cues remain.',
  },
  identity: {
    answer: 'unresolved',
    explanation: 'The mock score concerns face presence, not recognition of the intended subject. Neither adult is labelled, and the partial figure leaves crop context unresolved. Record those uncertainties and describe the visible content in alt text. Inventing Alex’s identity, an ex or consent would add unsupported facts. Keep the asset blocked until the required subject and crop evidence is resolved.',
  },
  agreement: {
    answer: 'rowwise',
    explanation: 'The matching rows are T1, T4, T7 and T8: four of eight, or 50% agreement. Matching passes count as well as matching failures. Each reviewer’s failure rate is also 4/8 here, but that is a separate calculation. Equal failure totals do not imply identical labels, and agreement does not prove correctness. Review disagreements against the declared identification rule and supplied evidence.',
  },
  freeze: {
    answer: 'freeze',
    explanation: 'The planned variable is the bio text, so both arms need the same frozen image bytes, crop, alt text and display treatment. Save the revision and byte fingerprint in the manifest. Equal filenames do not establish equal files; a fingerprint checks bytes but cannot verify identity or permission. Holding the image constant still leaves audience allocation and the rest of the experiment protocol to Week 4.',
  },
};
