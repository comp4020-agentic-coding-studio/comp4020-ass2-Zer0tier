// Save nineteen lecture downloads together. Run node week-12-worked-examples.mjs.
// Retain the drill: --work-dir ./maintenance-lab (must be new).
// Consume an existing unchanged Week 11 example: --release-dir ./example-rc1
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, readdirSync, mkdirSync, mkdtempSync, copyFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { startAgreement, stepAgreement, retentionPlan, checkManifest, restoreSnapshot, sha256 } from './week-12-models.mjs';
import { verifyFrozen, observationAt } from './week-11-models.mjs';
import { routeMessage } from './week-06-models.mjs';
import { startConversation, stepConversation } from './week-07-models.mjs';
import { startReview, stepReview, checkReleasePlan } from './week-08-models.mjs';
import { startHandover, stepHandover, handoverForDate } from './week-09-models.mjs';
import { startMeeting, stepMeeting } from './week-10-models.mjs';
const source=dirname(fileURLToPath(import.meta.url));
const read=name=>JSON.parse(readFileSync(join(source,name),'utf8'));
const c=read('week-12-cases.json'),w8=read('week-08-cases.json'),w9=read('week-09-cases.json'),w10=read('week-10-cases.json');
assert.equal(c.version,'week-12-v1');
const options={};
for (let i=2;i<process.argv.length;i+=2) {
  const name=process.argv[i],value=process.argv[i+1];
  assert(['--work-dir','--release-dir'].includes(name) && value && !Object.hasOwn(options,name),'Use each supported option once with its directory.');
  options[name]=resolve(value);
}
const root=options['--work-dir'] ?? mkdtempSync(join(tmpdir(),'week-12-drill-'));
if (options['--work-dir']) mkdirSync(root); // Preserve every existing directory.
const files=['week-11-cases.json','week-11-models.mjs','week-11-worked-examples.mjs','week-04-bios.json',
  'week-05-cases.json','week-05-models.mjs','week-06-models.mjs','week-07-models.mjs','week-08-cases.json',
  'week-08-models.mjs','week-09-cases.json','week-09-models.mjs','week-10-cases.json','week-10-models.mjs',
  'null-island-controls.csv','romance-models.mjs'];
const releaseFiles=['index.html','evaluation.json','manifest.json','README.txt'];
const bytesAt=folder=>Object.fromEntries(readdirSync(folder).map(name=>[name,readFileSync(join(folder,name))]));
const generate=(folder,output)=>JSON.parse(execFileSync(process.execPath,[join(folder,'week-11-worked-examples.mjs'),'--release-dir',output],
  {cwd:folder,encoding:'utf8',stdio:'pipe',maxBuffer:2*1024*1024}));
try {
  const received=options['--release-dir'] ?? join(root,'received');
  if (!options['--release-dir']) generate(source,received);
  const receivedBytes=bytesAt(received);
  assert.deepEqual(Object.keys(receivedBytes).sort(),[...releaseFiles].sort(),'Use the four-file Week 11 teaching release.');
  const receivedManifest=JSON.parse(receivedBytes['manifest.json'].toString());
  const receivedReport=JSON.parse(receivedBytes['evaluation.json'].toString());
  checkManifest(receivedManifest.inputs,{}); // Validate flat paths BEFORE reading any manifest entry.
  assert.deepEqual(receivedManifest.inputs.map(row=>row.file).sort(),[...files].sort());
  const sourceCheck=checkManifest(receivedManifest.inputs,Object.fromEntries(files.map(file=>[file,readFileSync(join(source,file))])));
  assert.equal(sourceCheck.ok,true,'Source download differs from the received release manifest.');
  assert.deepEqual(receivedManifest.outputs.map(row=>row.file).sort(),['evaluation.json','index.html']);
  assert.equal(checkManifest(receivedManifest.outputs,{'index.html':receivedBytes['index.html'],'evaluation.json':receivedBytes['evaluation.json']}).ok,true,'Received output digest mismatch.');
  const frozen=verifyFrozen(receivedReport.frozen);
  assert.equal(receivedManifest.candidateDigest,receivedReport.frozen.digest);
  assert.equal(receivedManifest.version,frozen.version);
  assert.deepEqual([receivedReport.primary.score,receivedReport.primary.rank],[93.75,2]);
  assert.deepEqual([receivedReport.sensitivity.score,receivedReport.sensitivity.rank],[90,2]);
  assert.equal(receivedReport.changedAvailability.releaseAllowed,false);
  const trusted=releaseFiles.map(file=>({file,sha256:sha256(receivedBytes[file])}));

  const clean=join(root,'clean-source');mkdirSync(clean);
  for (const file of files) copyFileSync(join(source,file),join(clean,file));
  assert.deepEqual(readdirSync(clean).sort(),[...files].sort());
  const cleanReport=generate(clean,join(root,'reproduced'));
  const reproduction=checkManifest(trusted,bytesAt(join(root,'reproduced')));
  assert.deepEqual(reproduction,{ok:true,missing:[],changed:[],extra:[]});
  assert.equal(verifyFrozen(cleanReport.frozen).text,frozen.text);

  // Damage only a newly created copy. Keep the received release and manifest intact.
  const damaged=Object.fromEntries(releaseFiles.map(file=>[file,Buffer.from(receivedBytes[file])]));
  const html=damaged['index.html'].toString();
  assert.equal(c.fault.target,'index.html');assert.equal(c.fault.needle,'Fine to pass.');assert.equal(c.fault.replacement,'');
  assert.equal(html.split(c.fault.needle).length-1,1,'Fault must match exactly once.');
  damaged['index.html']=Buffer.from(html.replace(c.fault.needle,c.fault.replacement));
  damaged['obsolete.txt']=Buffer.from('Disposable stale output used to test full restoration.\n');
  const rollback=restoreSnapshot(trusted,receivedBytes,damaged);
  assert.deepEqual(rollback.before,{ok:false,missing:[],changed:['index.html'],extra:['obsolete.txt']});
  assert.deepEqual(rollback.after,{ok:true,missing:[],changed:[],extra:[]});
  for (const [name,bytes] of [['faulty',damaged],['restored',rollback.restored]]) {
    const folder=join(root,name);mkdirSync(folder);
    for (const [file,contents] of Object.entries(bytes)) writeFileSync(join(folder,file),contents);
  }
  assert.deepEqual(checkManifest(trusted,bytesAt(join(root,'restored'))),rollback.after);
  writeFileSync(join(root,'trusted-release-manifest.json'),JSON.stringify(trusted,null,2)+'\n');
  writeFileSync(join(root,'current-release.json'),JSON.stringify({directory:'restored',scope:'Local drill selection only; no server or public deployment is changed.'},null,2)+'\n');

  const replay=(events,record=c.agreement)=>{
    let state=startAgreement(record);
    const trace=events.map(event=>{
      const output=stepAgreement(state,event);state=output.state;assert.equal(output.sendsMessage,false);
      return {id:event.id,phase:state.phase,version:state.current.version,accepted:state.pending?.acceptedBy.length ?? 0,action:output.action};
    });return {trace,state};
  };
  const accepted=replay([c.proposal,...c.acknowledgements]);
  assert.deepEqual(accepted.trace.map(row=>[row.phase,row.version,row.accepted]),[['review',1,0],['review',1,1],['active',2,0]]);
  assert.deepEqual(accepted.state.current.acknowledgedBy,['A','B']);
  assert.throws(()=>stepAgreement(accepted.state,{...c.proposal,id:'stale',proposalId:'stale-copy',at:4}),/Stale/);
  const rejected=replay([c.proposal,{...c.acknowledgements[1],type:'reject'}]);
  assert.equal(rejected.state.current.version,1);assert.equal(rejected.state.phase,'review');
  assert.throws(()=>stepAgreement(rejected.state,{...c.proposal,id:'renamed',proposalId:'try-again',at:4}),/retry/);
  const expired=replay([c.proposal,c.acknowledgements[0],{...c.acknowledgements[1],at:10}]);
  assert.equal(expired.state.history[0].status,'expired');assert.equal(expired.state.current.version,1);
  const ended=stepAgreement(accepted.state,{id:'end',type:'end',at:4,actor:'B',baseVersion:1}).state;
  assert.equal(ended.phase,'ended');
  assert.deepEqual(stepAgreement(ended,{...c.proposal,id:'late',at:5,baseVersion:2}).state,ended);
  const endingDuringReview=replay([c.proposal,c.acknowledgements[0],{id:'exit',type:'end',at:3,actor:'B'}]);
  assert.equal(endingDuringReview.state.history[0].status,'cancelled-by-ending');
  assert.deepEqual(endingDuringReview.state.history[0].acceptedBy,['A']);
  assert.deepEqual(stepAgreement(endingDuringReview.state,{...c.acknowledgements[1],id:'late-accept',at:4}).state,endingDuringReview.state);
  const networkProposal={...c.proposal,actor:'P',terms:{...c.networkAgreement.terms,routine:'Optional shared planning check-in with a choice of times; each can pass.'}};
  const network=replay([networkProposal,...['P','Q','R'].map((actor,i)=>({...c.acknowledgements[0],id:actor,actor,at:i+2}))],c.networkAgreement);
  assert.deepEqual(network.trace.map(row=>row.version),[1,1,1,2]);
  const retention=[14,30].map(day=>({day,rows:retentionPlan(c.inventory,day)}));
  assert.deepEqual(retention[0].rows.map(row=>row.action),['retain-for-purpose','plan-delete-own-copies','plan-delete-own-copies','outside-control','retain-for-purpose']);
  assert.equal(retention[1].rows.filter(row=>row.action==='review-release-dependency').length,2);

  // Verify actual earlier closure functions, not a table of claimed outcomes.
  const terminal=[];
  const add=(week,before,after)=>{assert.deepEqual(after,before);terminal.push({week,preserved:true});};
  const declinedInput={...w8.handoff.snapshot,boundary:'declined'};
  assert.equal(routeMessage(declinedInput).action,'stop');
  assert.equal(routeMessage({...declinedInput,inbound:'reply'}).action,'stop');terminal.push({week:6,preserved:true});
  let conversation=startConversation(w8.handoff,2);
  conversation=stepConversation(conversation,{id:'s',type:'send',at:0}).state;
  const closedConversation=stepConversation(conversation,{id:'d',type:'decline',at:1}).state;
  add(7,closedConversation,stepConversation(closedConversation,{id:'late',type:'reply',at:2}).state);
  let review=startReview(conversation);
  review=stepReview(review,{id:'flag',type:'assess',at:0.3,card:w8.cards.find(card=>card.id==='transfer')}).state;
  review=stepReview(review,{id:'d',type:'decline',at:1}).state;
  add(8,review,stepReview(review,{id:'clear',type:'resolve-review',at:2,findingIds:['flag'],note:'Cannot reopen refusal.'}).state);
  const replied=stepConversation(conversation,{id:'reply',type:'reply',at:1}).state;
  let handover=startHandover(startReview(replied),w9.plan,w9.venues);
  for (const event of w9.proposalEvents) handover=stepHandover(handover,event).state;
  const cancelled=stepHandover(handover,{id:'cancel',type:'decline',at:981}).state;
  add(9,cancelled,stepHandover(cancelled,{...w9.proposalEvents[1],id:'late',at:982}).state);
  assert.throws(()=>handoverForDate(cancelled));
  let meeting=startMeeting(handover);
  for (const event of [w10.arrival,w10.leave]) meeting=stepMeeting(meeting,event).state;
  add(10,meeting,stepMeeting(meeting,{...w10.nextDateEvents[0],at:1091}).state);
  const declinedRecord=receivedReport.observations.find(o=>o.id==='declined').source;
  assert.equal(observationAt(declinedRecord,1440).label,'declined');terminal.push({week:11,preserved:true});
  add(12,ended,stepAgreement(ended,{id:'restore-old-consent',type:'clock',at:100}).state);
  const releaseBoundary=checkReleasePlan(w8.releasePlan);
  assert.equal(releaseBoundary.allowed,true);
  assert.equal(checkReleasePlan({...w8.releasePlan,collectsRealContact:true}).allowed,false);
  assert.equal(checkReleasePlan({...w8.releasePlan,acceptsPayments:true}).allowed,false);
  assert.deepEqual(c.handover.map(row=>row.week),[2,3,4,5,6,7,8,9,10,11,12]);
  const report={scope:c.scope,receivedMode:options['--release-dir'] ? 'existing-week-11-example' : 'reconstructed-week-11-example',
    environment:{node:process.version,platform:process.platform,architecture:process.arch},
    sourceCheck,reproduction,release:{version:frozen.version,candidateDigest:receivedReport.frozen.digest,primary:{score:receivedReport.primary.score,rank:receivedReport.primary.rank},
      sensitivity:{score:receivedReport.sensitivity.score,rank:receivedReport.sensitivity.rank},changedCaseReleaseAllowed:receivedReport.changedAvailability.releaseAllowed},
    rollback:{before:rollback.before,after:rollback.after,selection:'restored',manifest:trusted},
    agreements:{accepted,rejected,expired,ended,endingDuringReview,network},retention,terminal,releaseBoundary,
    limitations:['Same-host clean-directory reproduction, not an independent machine or hermetic sandbox.',
      'The automatic runner accepts the unchanged Week 11 example; use your own documented build and comparison for a student release.',
      'Trust in a retained manifest is an input assumption; replacing both files and hashes is not detected by self-consistency.',
      'Ending remains terminal; software restoration never changes an agreement record.',
      'No browser result, student feedback, maintenance manual or completed artefact index is fabricated.']};
  writeFileSync(join(root,'report.json'),JSON.stringify(report,null,2)+'\n');
  writeFileSync(join(root,'handover-template.md'),'# Student handover index template\n\nAdd your actual local artefact path, version, check result and later use. These rows identify course requirements; they do not assert completion.\n\n| Week | Artefact | Your path / version / check / later use |\n| --- | --- | --- |\n'+c.handover.map(row=>`| ${row.week} | ${row.artifact} | To record |`).join('\n')+'\n');
  writeFileSync(join(root,'README.txt'),'Week 12 local teaching drill. Open faulty/index.html and restored/index.html; compare the exit wording and evaluation.\nThe received release is untouched. reproduced/ is rebuilt from the sixteen copied source downloads in clean-source/.\ntrusted-release-manifest.json covers all four output files. report.json records comparisons and environment.\ncurrent-release.json identifies the restored local folder; it does not switch a server or deploy anything.\nWrite your own maintenance/exit manual and fill handover-template.md with your actual artefacts. Record browser and feedback evidence only after doing that work.\n');
  writeFileSync(1,JSON.stringify(report,null,2)+'\n');
} finally {
  if (!options['--work-dir']) rmSync(root,{recursive:true,force:true}); // Only this run's fresh temporary directory.
}
