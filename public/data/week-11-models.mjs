// Bounded offline teaching functions. No network, messages, timers or profile fitting.
import { createHash } from 'node:crypto';
const labels = ['agreed','declined','pending','unobserved'];
const text = value => typeof value === 'string' && value.trim().length > 0;
const whole = value => Number.isSafeInteger(value) && value >= 0;
export const sha256 = value => createHash('sha256').update(value).digest('hex');

// Intervals are half-open; touching endpoints do not double-count a minute.
export function auditTime(log) {
  if (!Array.isArray(log) || !log.length) throw new Error('Supply time intervals.');
  const rows=structuredClone(log).sort((a,b)=>a.start-b.start);
  const ids=new Set();
  for (const [i,row] of rows.entries()) {
    if (!text(row.id) || ids.has(row.id) || !whole(row.start) || !whole(row.end) || row.end<=row.start) throw new Error('Use unique IDs and increasing whole-minute intervals.');
    if (i && row.start<rows[i-1].end) throw new Error('Overlapping activities double-count elapsed time.');
    ids.add(row.id);
  }
  const totalMinutes=rows.reduce((sum,row)=>sum+row.end-row.start,0);
  const elapsedMinutes=rows.at(-1).end-rows[0].start;
  return {totalMinutes,elapsedMinutes,unallocatedMinutes:elapsedMinutes-totalMinutes};
}
export function benefitRate(benefit,minutes) {
  if (!Number.isFinite(benefit) || benefit<0 || !Number.isFinite(minutes) || minutes<0) throw new Error('Use finite non-negative benefit and time.');
  return minutes===0 ? null : benefit/minutes;
}
export function dashboardSummary(rows) {
  if (!Array.isArray(rows)) throw new Error('Supply coded rows.');
  const counts=Object.fromEntries(labels.map(label=>[label,0])),ids=new Set();
  for (const row of rows) {
    if (!text(row.id) || ids.has(row.id) || !labels.includes(row.label)) throw new Error('Use unique IDs and explicit observation labels.');
    ids.add(row.id);counts[row.label]++;
  }
  const resolved=counts.agreed+counts.declined;
  return {counts,total:rows.length,resolved,agreedAmongAll:rows.length ? counts.agreed/rows.length : null,
    agreedAmongResolved:resolved ? counts.agreed/resolved : null};
}

// Consume only records made by Week 10's real meetingForFollowUp exporter.
// Reconstruct an earlier cutoff from the retained events; do not rewrite history.
export function observationAt(record,cutoff) {
  if (!record || record.meeting!=='ended' || !text(record.planVersion) || !Array.isArray(record.events) || !labels.includes(record.nextDate) || !whole(cutoff)) throw new Error('Use a completed Week 10 export and a whole-minute cutoff.');
  let label='unobserved';const actors=new Set(),evidenceIds=[];
  for (const event of record.events) {
    if (event.at>=cutoff || event.type!=='next-date') continue;
    if (!['alex','counterpart'].includes(event.actor) || !['agree','decline'].includes(event.response)) throw new Error('Use coded actor responses, not free text.');
    if (label==='declined') throw new Error('A decline cannot be retried.');
    evidenceIds.push(event.id);
    if (event.response==='decline') label='declined';
    else { actors.add(event.actor);label=actors.size===2 ? 'agreed' : 'pending'; }
  }
  return {cutoff,label,evidenceIds,latestLabel:record.nextDate,meeting:record.meeting,planVersion:record.planVersion,
    bill:record.bill,source:structuredClone(record)};
}

export function parseControls(csv) {
  const [header,...lines]=csv.trim().split(/\r?\n/);
  if (header!=='id,clarity,specificity,feasibility,exit' || lines.length!==99) throw new Error('Use Null Island v1: header and 99 controls.');
  const ids=new Set();
  return lines.map(line=>{
    const [id,...values]=line.split(',');
    if (!text(id) || ids.has(id) || values.length!==4 || !values.every(v=>/^[0-4]$/.test(v))) throw new Error('Use unique control IDs and four integer ratings.');
    ids.add(id);return {id,features:values.map(Number)};
  });
}
export function weightedScore(features,weight=1) {
  if (!Array.isArray(features) || features.length!==4 || !Array.from(features).every(v=>Number.isInteger(v) && v>=0 && v<=4) || !Number.isFinite(weight) || weight<=0 || weight>1000) throw new Error('Use four 0–4 integer ratings and a weight in (0,1000].');
  const [c,s,f,e]=features;
  return 100*(c+s+weight*f+e)/(4*(3+weight));
}
export function evaluateFeatures(features,controls,weight=1) {
  if (!Array.isArray(controls) || controls.length!==99 || new Set(controls.map(c=>c.id)).size!==99 || controls.some(c=>!text(c.id))) throw new Error('Use 99 distinct controls.');
  const score=weightedScore(features,weight);
  const scoredControls=controls.map(c=>({id:c.id,score:weightedScore(c.features,weight)}));
  const above=scoredControls.filter(c=>c.score>score).length;
  const tied=scoredControls.filter(c=>c.score===score).length;
  return {weight,score,above,tied,rank:1+above+tied,entries:100,scoredControls};
}
export function freezeCandidate(candidate) {
  if (!candidate || !text(candidate.version) || !text(candidate.text) || !Array.isArray(candidate.evidence) || candidate.evidence.length!==4) throw new Error('Supply a version, exact text and four evidence records.');
  weightedScore(candidate.features);
  if (!candidate.evidence.every(e=>text(e.quote) && candidate.text.includes(e.quote) && text(e.reason))) throw new Error('Each rating needs a quote present in the text and a reason.');
  const snapshot=structuredClone(candidate);
  return {snapshot,digest:sha256(JSON.stringify(snapshot))};
}
export function verifyFrozen(frozen) {
  if (!frozen || sha256(JSON.stringify(frozen.snapshot))!==frozen.digest) throw new Error('Frozen candidate changed; preserve the result and create a new version.');
  freezeCandidate(frozen.snapshot);
  return structuredClone(frozen.snapshot);
}
const escapeHTML=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function releaseHTML(frozen,result) {
  const candidate=verifyFrozen(frozen);
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Alex · fictional teaching release</title>
<style>body{font:18px/1.65 system-ui,sans-serif;color:#241e2b;background:#fff8fb;margin:0}main{max-width:42rem;margin:3rem auto;padding:0 1.5rem}h1,h2{line-height:1.2}a{color:#254f79}a:focus-visible{outline:3px solid #973257;outline-offset:4px}p{overflow-wrap:anywhere}</style></head>
<body><main><h1>Alex</h1><p>Fictional teaching example · ${escapeHTML(candidate.version)}</p>
<p id="candidate-text">${escapeHTML(candidate.text)}</p>
<h2>Evaluation</h2><p>Null Island v1: ${result.score}/100; conservative rank ${result.rank}/${result.entries}. Primary weights. Ratings are authored judgments; this benchmark predicts no real romantic outcome.</p>
<p>This example contains no contact form, tracking or app integration.</p><p><a href="evaluation.json">Read the evaluation and limitations</a></p></main></body></html>\n`;
}
