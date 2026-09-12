import csv from '../../public/data/bio-exposures.csv?raw';
import photoManifest from '../../public/data/week-03/manifest.json';
import venues from '../../public/data/week-09-cases.json';

export type Prediction = 'A' | 'B' | 'unknown';
export type Conclusion = 'causal-a' | 'causal-b' | 'unknown';
export const conclusions: Record<Conclusion, string> = {
  'causal-a': 'Bio A caused more positive responses.',
  'causal-b': 'Bio B caused more positive responses.',
  unknown: 'We do not know which bio caused more responses.',
};
export const riskOptions = [
  { id: 'mix', label: 'The variants have different exposure mixes.', evidence: '80% of A exposures are in North; only 20% of B exposures are in North.' },
  { id: 'allocation', label: 'Random allocation and independence are undocumented.', evidence: 'Four aggregate cells supply no individual assignment log.' },
  { id: 'identity', label: 'The A/B labels do not identify Alex’s written drafts.', evidence: 'The exposure CSV and week-04-bios.json are separate fixtures.' },
  { id: 'photo', label: 'The CSV proves that Alex changed the photo.', evidence: 'Unsupported: this CSV contains no photo field. Keep the frozen photo in the proposed trial.' },
] as const;
export type Risk = typeof riskOptions[number]['id'];
export interface ExperimentChoices {
  prediction: Prediction;
  conclusion: Conclusion;
  risks: Risk[];
  allocation: 'within-zone' | 'repeat-mix';
  photo: 'frozen' | 'change';
  stopping: 'fixed' | 'winner';
}

export function parseExposures(source: string) {
  const [header, ...lines] = source.trim().split(/\r?\n/);
  if (header !== 'zone,variant,exposures,positive_responses' || lines.length !== 4) throw new Error('Expected the four-cell exposure fixture.');
  const seen = new Set<string>();
  return lines.map(line => {
    const [zone, variant, n, x, extra] = line.split(',');
    const key = `${zone}/${variant}`;
    if (!['North', 'South'].includes(zone) || !['A', 'B'].includes(variant) || extra !== undefined || seen.has(key) || !/^\d+$/.test(n) || !/^\d+$/.test(x)) throw new Error('Invalid or duplicate exposure cell.');
    const exposures = Number(n), positives = Number(x);
    if (!Number.isSafeInteger(exposures) || !Number.isSafeInteger(positives) || exposures < 1 || positives > exposures) throw new Error('Invalid exposure counts.');
    seen.add(key);
    return { zone, variant, exposures, positives, rate: positives / exposures };
  });
}
export const exposureRows = parseExposures(csv);
export function comparison() {
  return (['A', 'B'] as const).map(variant => {
    const rows = exposureRows.filter(row => row.variant === variant);
    const exposures = rows.reduce((sum, row) => sum + row.exposures, 0);
    const positives = rows.reduce((sum, row) => sum + row.positives, 0);
    return { variant, exposures, positives, rate: positives / exposures,
      northShare: rows.find(row => row.zone === 'North')!.exposures / exposures,
      standardised: rows.reduce((sum, row) => sum + row.rate / 2, 0) };
  });
}
export const initialChoices = (): ExperimentChoices => ({ prediction: 'unknown', conclusion: 'causal-a', risks: [], allocation: 'repeat-mix', photo: 'change', stopping: 'winner' });
export function experimentFeedback(choices: ExperimentChoices) {
  const issues: string[] = [];
  if (choices.conclusion !== 'unknown') issues.push('A descriptive lead does not establish a text effect. The causal conclusion is still unknown.');
  for (const risk of riskOptions.slice(0, 3)) if (!choices.risks.includes(risk.id)) issues.push(`Add a limitation: ${risk.label}`);
  if (choices.risks.includes('photo')) issues.push('Remove the invented photo-change observation. The CSV does not record photos.');
  if (choices.allocation !== 'within-zone') issues.push('Propose random allocation within each zone, using distinct simulated viewer IDs.');
  if (choices.photo !== 'frozen') issues.push('Hold A-portrait-v1, its bytes, crop, alt text and display treatment fixed across variants.');
  if (choices.stopping !== 'fixed') issues.push('Fix the observation window and sample cap before generating outcomes; do not stop when a winner appears.');
  return issues;
}
export function makeExperimentRecord(choices: ExperimentChoices) {
  return {
    schema: 'alex-experiment-v1' as const, fictional: true as const, dataset: 'bio-exposures-v1' as const,
    choices: structuredClone(choices),
    observations: exposureRows.map(({ zone, variant, exposures, positives }) => ({ zone, variant, exposures, positives })),
  };
}
export type ExperimentRecord = ReturnType<typeof makeExperimentRecord>;
export function readExperimentRecord(text: string): ExperimentRecord {
  if (text.length > 10000) throw new Error('Use an experiment record smaller than 10 KB.');
  let value: any;
  try { value = JSON.parse(text); } catch { throw new Error('This is not a readable JSON experiment record.'); }
  const fail = () => { throw new Error('Use an unchanged alex-experiment-v1 record exported by The Experiment That Lied.'); };
  const keys = (object: unknown, expected: string[]) => object !== null && typeof object === 'object' && !Array.isArray(object) && Object.keys(object).sort().join('|') === [...expected].sort().join('|');
  if (!keys(value, ['schema', 'fictional', 'dataset', 'choices', 'observations']) || value.schema !== 'alex-experiment-v1' || value.fictional !== true || value.dataset !== 'bio-exposures-v1') return fail();
  const c = value.choices;
  if (!keys(c, ['prediction', 'conclusion', 'risks', 'allocation', 'photo', 'stopping']) || !['A', 'B', 'unknown'].includes(c.prediction) || !Object.hasOwn(conclusions, c.conclusion) || !Array.isArray(c.risks) || c.risks.some((id: unknown) => !riskOptions.some(risk => risk.id === id)) || new Set(c.risks).size !== c.risks.length || !['within-zone', 'repeat-mix'].includes(c.allocation) || !['frozen', 'change'].includes(c.photo) || !['fixed', 'winner'].includes(c.stopping)) return fail();
  const record = makeExperimentRecord(c);
  if (!Array.isArray(value.observations) || value.observations.length !== 4 || value.observations.some((row: any, i: number) => !keys(row, ['zone', 'variant', 'exposures', 'positives']) || Object.entries(record.observations[i]).some(([key, expected]) => row[key] !== expected))) return fail();
  return record;
}
export const recordFragment = (record: ExperimentRecord) => `#experiment=${encodeURIComponent(JSON.stringify(record))}`;
export function recordFromFragment(fragment: string) {
  if (!fragment) return null;
  if (!fragment.startsWith('#experiment=') || fragment.length > 30000) throw new Error('This link does not contain a supported experiment record.');
  try { return readExperimentRecord(decodeURIComponent(fragment.slice(12))); }
  catch (error) { throw new Error(error instanceof URIError ? 'The experiment link is incomplete or damaged.' : (error as Error).message); }
}

export const frozenPhoto = photoManifest.frozen;
export const atrium = venues.venues.find(venue => venue.id === venues.plan.venueId)!;
export const releaseScope = 'Authored release-day-v1 rehearsal. Checks compare classroom records and source references; they do not inspect or deploy a student’s files. No meeting is confirmed.';
export type Repair = 'swap-winner' | 'limit-claim' | 'rename-photo' | 'restore-photo' | 'raise-budget' | 'restore-plan';
export interface ReleaseState {
  record: ExperimentRecord;
  note: 'causal' | 'evidence';
  photo: 'stale' | 'renamed' | 'frozen';
  plan: 'over-budget' | 'raised-budget' | 'atrium';
  revision: number;
  audit: { revision: number; checks: ReleaseCheck[] } | null;
  decision: 'unreviewed' | 'held' | 'ready';
  history: string[];
}
export interface ReleaseCheck { id: 'claim' | 'photo' | 'plan'; title: string; ok: boolean; evidence: string; source: string; }
export function sampleRecord() {
  return makeExperimentRecord({ prediction: 'A', conclusion: 'causal-a', risks: ['mix', 'allocation', 'identity'], allocation: 'within-zone', photo: 'frozen', stopping: 'fixed' });
}
export function startRelease(record = sampleRecord()): ReleaseState {
  return { record: structuredClone(record), note: 'causal', photo: 'stale', plan: 'over-budget', revision: 0, audit: null, decision: 'unreviewed', history: ['Received the fictional release-day-v1 candidate.'] };
}
export function checkRelease(state: ReleaseState): ReleaseCheck[] {
  return [
    { id: 'claim', title: 'The experiment claim', ok: state.note === 'evidence' && state.record.choices.conclusion === 'unknown',
      evidence: `Week 4 record: ${conclusions[state.record.choices.conclusion]} CSV: A 26/100, B 19/100; B leads in both zones. No draft-to-outcome mapping or assignment log supports a causal claim.`, source: '/lectures/week-04/' },
    { id: 'photo', title: 'The frozen photo', ok: state.photo === 'frozen',
      evidence: `Week 3 requires ${frozenPhoto.revision}, ${frozenPhoto.file}, the recorded crop and alt text. The rehearsal starts with a deliberately stale reference; changing its label does not restore the source.`, source: '/data/week-03/manifest.json' },
    { id: 'plan', title: 'The Friday budget', ok: state.plan === 'atrium',
      evidence: `Alex has $20 total and Friday 5–7 pm. The authored faulty plan is 90 minutes / $24. Week 9’s ${atrium.name} reference is ${atrium.outboundMinutes + atrium.meetingMinutes + atrium.returnMinutes} minutes / $${(atrium.transportCents + atrium.activityCents) / 100} covering both drinks. It remains a proposal requiring its own confirmation.`, source: '/lectures/week-09/' },
  ];
}
export function repairRelease(state: ReleaseState, repair: Repair): ReleaseState {
  const next = structuredClone(state);
  const labels: Record<Repair, string> = {
    'swap-winner': 'Changed the claimed causal winner to B. The missing causal evidence remains.',
    'limit-claim': 'Revised the source conclusion to unknown and replaced the release claim with a descriptive evidence note. Other Week 4 choices are retained.',
    'rename-photo': 'Renamed the stale reference to A-portrait-v1. Its source, crop and metadata remain stale.',
    'restore-photo': 'Restored the frozen Week 3 source reference, crop, alt text and fingerprint.',
    'raise-budget': 'Raised the draft budget to $30. Alex’s supplied $20 limit remains unchanged.',
    'restore-plan': 'Replaced the $24 draft with the separate Week 9 Atrium proposal: 90 minutes, $14. Confirmation is not inferred.',
  };
  if (!Object.hasOwn(labels, repair)) throw new Error('Unknown repair.');
  if (repair === 'swap-winner') { next.record.choices.conclusion = 'causal-b'; next.note = 'causal'; }
  if (repair === 'limit-claim') { next.record.choices.conclusion = 'unknown'; next.note = 'evidence'; }
  if (repair === 'rename-photo') next.photo = 'renamed';
  if (repair === 'restore-photo') next.photo = 'frozen';
  if (repair === 'raise-budget') next.plan = 'raised-budget';
  if (repair === 'restore-plan') next.plan = 'atrium';
  next.revision++;
  next.audit = null;
  next.decision = 'unreviewed';
  next.history.push(`Revision ${next.revision}: ${labels[repair]}`);
  return next;
}
export function auditRelease(state: ReleaseState): ReleaseState {
  const next = structuredClone(state);
  next.audit = { revision: next.revision, checks: checkRelease(next) };
  next.decision = 'unreviewed';
  next.history.push(`Checked revision ${next.revision}: ${next.audit.checks.filter(check => check.ok).length}/3 passed.`);
  return next;
}
export function decideRelease(state: ReleaseState, decision: 'hold' | 'ready'): ReleaseState {
  const next = structuredClone(state);
  // Recompute the checks as well as requiring a current run: an old green badge is not evidence.
  const ready = next.audit?.revision === next.revision && checkRelease(next).every(check => check.ok);
  next.decision = decision === 'ready' && ready ? 'ready' : 'held';
  next.history.push(next.decision === 'ready' ? `Marked revision ${next.revision} ready for this rehearsal only. No deployment or confirmation occurred.` : 'Held the rehearsal. A ready decision needs three passing checks on the current revision.');
  return next;
}
