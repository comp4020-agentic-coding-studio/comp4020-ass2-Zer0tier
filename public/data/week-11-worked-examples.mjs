// Save the sixteen lecture downloads together. Run node week-11-worked-examples.mjs.
// Optional: node week-11-worked-examples.mjs --release-dir ./example-rc1
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { auditTime, benefitRate, dashboardSummary, observationAt, parseControls, evaluateFeatures,
  freezeCandidate, verifyFrozen, releaseHTML, sha256 } from './week-11-models.mjs';
import { qualityScore, conservativeRank, dateTransitions } from './romance-models.mjs';
import { venueDecision } from './week-05-models.mjs';
import { compareResponses, startConversation, stepConversation } from './week-07-models.mjs';
import { startReview, stepReview } from './week-08-models.mjs';
import { startHandover, stepHandover } from './week-09-models.mjs';
import { startMeeting, stepMeeting, meetingForFollowUp, propagate, simulate } from './week-10-models.mjs';
const readText=name=>readFileSync(new URL(name,import.meta.url),'utf8');
const read=name=>JSON.parse(readText(name));
const cases=read('week-11-cases.json'),bio=read('week-04-bios.json'),w5=read('week-05-cases.json'),
  w8=read('week-08-cases.json'),w9=read('week-09-cases.json'),w10=read('week-10-cases.json');
assert.equal(cases.version,'week-11-v1');
assert.equal(w5.version,'week-05-v1');assert.equal(w8.version,'week-08-v1');
assert.equal(w9.version,'week-09-v1');assert.equal(w10.version,'week-10-v1');
assert.equal(cases.candidate.sourceVersion,w8.handoff.candidateVersion);
assert.equal(cases.candidate.invitationVersion,w8.handoff.invitationVersion);

// Freeze before evaluating. Ratings are supplied human judgments, not an NLP output.
const frozen=freezeCandidate({...cases.candidate,text:bio.repair});
const controls=parseControls(readText('null-island-controls.csv'));
const primary=evaluateFeatures(verifyFrozen(frozen).features,controls);
assert.deepEqual([primary.score,primary.rank,primary.above,primary.tied],[93.75,2,0,1]);
const sensitivity=evaluateFeatures(verifyFrozen(frozen).features,controls,2);
assert.deepEqual([sensitivity.score,sensitivity.rank,sensitivity.above,sensitivity.tied],[90,2,1,0]);
const probe=[1,2].map(weight=>evaluateFeatures(cases.weightProbe,controls,weight));
assert.deepEqual(probe.map(r=>[r.score,r.rank,r.above,r.tied]),[[81.25,5,1,3],[70,22,12,9]]);
// Cross-check every score and rank against the unchanged generated course scorer.
for (const result of [primary,sensitivity,...probe]) {
  const reference=controls.map(c=>qualityScore(c.features,result.weight));
  assert.deepEqual(result.scoredControls.map(c=>c.score),reference);
  assert.equal(result.rank,conservativeRank(result.score,reference));
}
const library=w5.venues.find(v=>v.id==='library');
const baselinePlan=venueDecision(library);
const changedPlan=venueDecision(library,cases.changedAvailability.availableMinutes);
const changedEvaluation=evaluateFeatures(cases.changedAvailability.features,controls);
assert.deepEqual([baselinePlan.minutes,baselinePlan.costCents,baselinePlan.feasible],[100,1400,true]);
assert.deepEqual([changedPlan.spareMinutes,changedPlan.feasible,changedPlan.reasons],[-10,false,['time']]);
assert.deepEqual([changedEvaluation.score,changedEvaluation.rank],[87.5,2]);
const changedAvailability={...cases.changedAvailability,plan:changedPlan,evaluation:changedEvaluation,caseFidelity:false,releaseAllowed:false};

const time=auditTime(cases.timeLog);
assert.deepEqual(time,{totalMinutes:115,elapsedMinutes:115,unallocatedMinutes:0});
const rates=cases.benefits.map(benefit=>({benefit,unitsPerMinute:benefitRate(benefit,time.totalMinutes)}));
assert(Math.abs(rates[2].unitsPerMinute-0.08695652173913043)<1e-12);
const dashboard=dashboardSummary(cases.dashboard);
assert.deepEqual(dashboard.counts,{agreed:2,declined:2,pending:3,unobserved:1});
assert.equal(dashboard.agreedAmongAll,0.25);assert.equal(dashboard.agreedAmongResolved,0.5);
const decisions=cases.decision.qValues.map(q=>({q,allowed:compareResponses(q,{clarificationCost:cases.decision.clarificationCost,clarificationAllowed:true}),
  excluded:compareResponses(q,{clarificationCost:cases.decision.clarificationCost,clarificationAllowed:false})}));
assert.deepEqual(decisions.map(d=>d.allowed.winners),[['stop'],['stop','wait'],['wait','clarify'],['clarify']]);

// Actually reconstruct the earlier review and confirmed cost agreement.
let conversation=startConversation(w8.handoff,2);
for (const event of w8.priorEvents) conversation=stepConversation(conversation,event).state;
let review=startReview(conversation);
for (const event of [
  {id:'a1',type:'assess',at:0.3,card:w8.cards.find(c=>c.id==='transfer')},
  {id:'r',type:'reply',at:1},
  {id:'clear',type:'resolve-review',at:1.5,findingIds:['a1'],note:'Authored reviewer clearance; not identity proof.'},
]) review=stepReview(review,event).state;
let handover=startHandover(review,w9.plan,w9.venues);
for (const event of w9.proposalEvents) handover=stepHandover(handover,event).state;
const replay=events=>meetingForFollowUp(events.reduce((state,event)=>{
  const result=stepMeeting(state,event);
  assert.equal(result.sendsMessage,false);assert.equal(result.takesPayment,false);return result.state;
},startMeeting(handover)));
const prefix=[w10.arrival,...w10.billEvents];
const branches={
  agreed:replay([...prefix,...w10.nextDateEvents,w10.leave]),
  pending:replay([...prefix,w10.nextDateEvents[0],w10.leave]),
  unobserved:replay([...prefix,w10.leave]),
  declined:replay([...prefix,...w10.nextDateEvents,{id:'withdraw',type:'next-date',at:1087,actor:'counterpart',response:'decline'},w10.leave]),
};
const observations=Object.entries(branches).map(([id,record])=>({id,...observationAt(record,1091)}));
assert.deepEqual(observations.map(o=>o.label),['agreed','pending','unobserved','declined']);
const cutoff=observationAt(branches.agreed,1086);
assert.equal(cutoff.label,'pending');assert.equal(cutoff.latestLabel,'agreed');
assert.deepEqual(cutoff.evidenceIds,['next-a']);
assert.equal(observationAt(branches.declined,1087).label,'agreed');
assert.equal(observationAt(branches.declined,1088).label,'declined');
const exact=propagate(w10.matrix,2);
exact.forEach((p,i)=>assert(Math.abs(p-dateTransitions(2)[i])<1e-12));
const seeded=simulate(w10.matrix,{seed:402010,runs:10000,steps:2});
assert.deepEqual(seeded.counts,[3108,1606,3182,2104]);

const downloads=['week-11-cases.json','week-11-models.mjs','week-11-worked-examples.mjs',
  'week-04-bios.json','week-05-cases.json','week-05-models.mjs','week-06-models.mjs','week-07-models.mjs',
  'week-08-cases.json','week-08-models.mjs','week-09-cases.json','week-09-models.mjs','week-10-cases.json',
  'week-10-models.mjs','null-island-controls.csv','romance-models.mjs'];
const manifest={version:cases.candidate.version,candidateDigest:frozen.digest,
  inputs:downloads.map(file=>({file,sha256:sha256(readFileSync(new URL(file,import.meta.url)))}))};
const report={scope:cases.scope,candidateScope:cases.candidateScope,frozen,primary,sensitivity,probe,
  baselinePlan,changedAvailability,time,rates,dashboard,decisions,observations,cutoff,
  handoff:w8.handoff,agreement:startMeeting(handover).agreement,markov:{exact,seeded},manifest,
  limitations:['Synthetic comparator, not held-out real-world validation.','Evidence quotes are checked mechanically; ratings and case fidelity require review.',
    'The primary target fails: rank 2/100.','Checksums detect byte changes against a retained manifest, not author identity or consent.',
    'The HTML is a worked teaching example; student release and browser evidence must describe their own candidate.']};
const json=JSON.stringify(report,null,2)+'\n';
if (process.argv.length>2) {
  assert(process.argv.length===4 && process.argv[2]==='--release-dir','Use --release-dir followed by a new directory.');
  const folder=process.argv[3];mkdirSync(folder); // Fail if it exists; never overwrite a prior release.
  const html=releaseHTML(frozen,primary);
  writeFileSync(join(folder,'index.html'),html);writeFileSync(join(folder,'evaluation.json'),json);
  writeFileSync(join(folder,'manifest.json'),JSON.stringify({...manifest,outputs:[{file:'index.html',sha256:sha256(html)},{file:'evaluation.json',sha256:sha256(json)}]},null,2)+'\n');
  writeFileSync(join(folder,'README.txt'),'Fictional teaching example, not a submitted student release. Open index.html locally.\nKeep the sixteen source downloads with this folder. Re-run into a NEW directory and compare manifest.json and output bytes.\nThe report records the exact candidate, primary failure, weight sensitivity, changed case and earlier evidence.\nNo browser pass is claimed here: record your actual keyboard and viewport checks separately.\n');
}
writeFileSync(1,json);
