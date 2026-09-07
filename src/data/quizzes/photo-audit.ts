import type { TutorialQuiz } from '../../lib/tutorial-quiz';

export const photoAuditQuiz: TutorialQuiz = {
  id: 'photo-audit',
  title: 'The photo desk needs receipts',
  intro: 'The crop looks good. The metadata would like a word.',
  context: 'All images, records, readings and reviewer labels are authored teaching fixtures. These separate examples add no facts about Alex.',
  questions: [
    {
      id: 'provenance', type: 'choice', title: 'The suspiciously tidy record', skill: 'Preserve provenance and uncertainty',
      scenario: 'A fictional portrait has a recorded source, a supported subject label, an in-bounds crop and useful alt text. Its deliberately incomplete exercise record says permission: unknown. A teammate wants to change that field to yes because the image looks professional.',
      prompt: 'What should your manifest do with this record?',
      options: [
        { id: 'looks', text: 'Approve it: a professional-looking image supplies the missing permission.' },
        { id: 'blocked', text: 'Retain the record and block selection until the required permission evidence is supplied.' },
        { id: 'erase', text: 'Delete the rejected row so the manifest contains only clean-looking records.' },
        { id: 'guess', text: 'Mark permission as yes, but lower the detection score to compensate.' },
      ],
    },
    {
      id: 'lighting', type: 'choice', title: 'The five-to-one sales pitch', skill: 'Use the declared lighting convention',
      scenario: 'In the same setup and arbitrary unit, the isolated key-source reading is 300 and the isolated fill-source reading is 75. A teammate adds them and announces a 5:1 ratio. This exercise defines key-to-fill as isolated key divided by isolated fill.',
      prompt: 'Which correction follows this convention?',
      options: [
        { id: 'combined', text: '5:1: the key reading must include the fill reading.' },
        { id: 'guarantee', text: '4:1, which proves that this setup will get more matches.' },
        { id: 'isolated', text: '4:1. Doubling both readings preserves the ratio, without proving a better photo.' },
        { id: 'difference', text: '225:1: subtract the fill from the key before reporting the ratio.' },
      ],
    },
    {
      id: 'crop', type: 'number', title: 'The crop invoice', skill: 'Calculate retained area',
      scenario: 'An 800 × 600 source uses a top-left origin. The crop starts at (200, 100), has width 400 and height 300, and lies inside the source. No resizing happens in this calculation.',
      illustration: {
        src: '/data/quizzes/photo-crop.svg', width: 640, height: 480,
        alt: 'An 800 by 600 source rectangle contains a shaded 400 by 300 crop starting at source coordinates 200, 100.',
        caption: 'Source coordinates and dimensions, not a platform upload specification. The shaded rectangle is the retained crop.',
      },
      tool: 'Retained area (%) = 100 × (crop width × crop height) / (source width × source height).',
      prompt: 'What percentage of the source area is retained? Enter the percentage as a number, without the % sign.',
      inputLabel: 'Retained source area (%)',
    },
    {
      id: 'identity', type: 'choice', title: 'The extremely confident stranger', skill: 'Separate detection from identity',
      scenario: 'A course-drawn group image shows two unlabelled fictional adults. Its crop keeps one adult and part of the other at the edge. A mock face-presence score is 0.99; there is no supplied subject label or relationship history.',
      prompt: 'Which record is supported by those facts?',
      options: [
        { id: 'recognised', text: 'Subject: Alex. A score of 0.99 identifies the complete figure.' },
        { id: 'history', text: 'Alt text: Alex has cropped out an ex. The partial figure supplies the history.' },
        { id: 'consent', text: 'Permission: yes. High face-presence confidence establishes consent.' },
        { id: 'unresolved', text: 'Subject unresolved; crop ambiguous. Describe the two unlabelled adults and retain the source.' },
      ],
    },
    {
      id: 'agreement', type: 'choice', title: 'Same totals, different witnesses', skill: 'Compare annotations row by row',
      scenario: 'Two fictional reviewers label the same eight identification tasks: 1 means the supplied cues fail to identify the intended subject uniquely; 0 means pass. Each reports four failures. A teammate claims their annotations therefore agree completely.',
      evidence: {
        caption: 'Invented trial labels · a separate fixture from the portrait records',
        columns: ['Trial', 'Reviewer 1', 'Reviewer 2'],
        rows: [['T1', '1', '1'], ['T2', '1', '0'], ['T3', '1', '0'], ['T4', '1', '1'], ['T5', '0', '1'], ['T6', '0', '1'], ['T7', '0', '0'], ['T8', '0', '0']],
      },
      prompt: 'What should the audit report about agreement?',
      options: [
        { id: 'rowwise', text: 'They agree on 4/8 labels, or 50%. Agreement alone does not establish correctness.' },
        { id: 'totals', text: 'They agree on 8/8 labels because each reported four failures.' },
        { id: 'failures-only', text: 'They agree on 2/8 labels; matching passes should not count.' },
        { id: 'better', text: 'Reviewer 1 is more accurate because their failures occur earlier in the table.' },
      ],
    },
    {
      id: 'freeze', type: 'choice', title: 'One test, two makeovers', skill: 'Freeze non-bio inputs for Week 4',
      scenario: 'A proposed bio comparison gives bio A portrait revision v1 and bio B a brighter, tighter crop exported as v2. Their filenames share the same prefix, but their bytes, crop and alt text differ. The planned question concerns the bio wording.',
      prompt: 'Which repair makes the image treatment constant?',
      options: [
        { id: 'filename', text: 'Rename both exports portrait.svg; matching names guarantee identical image treatment.' },
        { id: 'score', text: 'Use whichever export has the higher detection score in each arm.' },
        { id: 'freeze', text: 'Use the same frozen bytes, crop, alt text and display treatment in both arms; change the bio text.' },
        { id: 'interpret', text: 'Keep both photo changes and report any response difference as the bio effect.' },
      ],
    },
  ],
};
