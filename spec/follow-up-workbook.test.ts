// Literal teaching oracles. Browser layout, rating judgment and external validity
// require separate review; a checksum alone proves none of them.
import { readFileSync, mkdtempSync, copyFileSync, writeFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';
import { auditTime, benefitRate, dashboardSummary, observationAt, parseControls, weightedScore,
  evaluateFeatures, freezeCandidate, verifyFrozen, releaseHTML, sha256 } from '../public/data/week-11-models.mjs';
import { qualityScore } from '../src/lib/romance-models';
const read=(name:string)=>JSON.parse(readFileSync(`public/data/${name}`,'utf8'));
const c=read('week-11-cases.json'),bio=read('week-04-bios.json');
const csv=readFileSync('public/data/null-island-controls.csv','utf8');
const controls: {id:string;features:number[]}[]=parseControls(csv);
const candidate=()=>freezeCandidate({...c.candidate,text:bio.repair});

describe('Week 11 follow-up workbook',()=>{
  it('counts elapsed time once, accepts adjacent intervals and exposes gaps',()=>{
    expect(auditTime(c.timeLog)).toEqual({totalMinutes:115,elapsedMinutes:115,unallocatedMinutes:0});
    expect(auditTime([{id:'a',start:0,end:10},{id:'b',start:20,end:25}])).toEqual({totalMinutes:15,elapsedMinutes:25,unallocatedMinutes:10});
    expect(()=>auditTime([...c.timeLog,{id:'overlap',start:105,end:110}])).toThrow(/Overlapping/);
    for (const invalid of [[{id:'a',start:1,end:1}],[{id:'a',start:-1,end:2}],
      [{id:'a',start:0,end:2},{id:'a',start:2,end:3}],[]]) expect(()=>auditTime(invalid)).toThrow();
    const log=structuredClone(c.timeLog);auditTime(log.reverse());expect(log[0].id).toBe('follow-up');
  });
  it('reports benefit per minute with explicit undefined zero-time handling',()=>{
    expect(benefitRate(10,115)).toBeCloseTo(0.08695652173913043,12);
    expect(benefitRate(10,115/60)).toBeCloseTo(5.217391304347826,12);
    expect(benefitRate(0,115)).toBe(0);expect(benefitRate(10,0)).toBeNull();
    for (const args of [[NaN,115],[10,Infinity],[-1,115],[10,-1]]) expect(()=>benefitRate(...args)).toThrow();
  });
  it('keeps unresolved observations visible in the denominator',()=>{
    expect(dashboardSummary(c.dashboard)).toEqual({counts:{agreed:2,declined:2,pending:3,unobserved:1},total:8,resolved:4,agreedAmongAll:0.25,agreedAmongResolved:0.5});
    expect(dashboardSummary([{id:'p',label:'pending'}]).agreedAmongResolved).toBeNull();
    expect(dashboardSummary([]).agreedAmongAll).toBeNull();
    expect(()=>dashboardSummary([{id:'a',label:'nice time'}])).toThrow();
    expect(()=>dashboardSummary([...c.dashboard,c.dashboard[0]])).toThrow();
  });
  it('parses all 99 controls strictly without filling missing evidence',()=>{
    expect(controls).toHaveLength(99);
    expect(controls.at(-1)).toEqual({id:'control-099',features:[3,4,4,4]});
    for (const invalid of [csv.replace('control-099','control-098'),csv.replace('3,4,4,4','3,4,,4'),csv.trim().split('\n').slice(0,-1).join('\n'),csv.replace('clarity','mood')]) expect(()=>parseControls(invalid)).toThrow();
    expect(()=>weightedScore([4,4,5,4])).toThrow();
    expect(()=>weightedScore([4,4,4])).toThrow();
    expect(()=>weightedScore([4,4,4,4],0)).toThrow();
    expect(()=>weightedScore([4,4,4,4],Infinity)).toThrow();
  });
  it('counts ties against the frozen candidate and reweights every control',()=>{
    const result=evaluateFeatures([4,4,3,4],controls);
    expect([result.score,result.rank,result.above,result.tied]).toEqual([93.75,2,0,1]);
    const changed=evaluateFeatures([4,4,3,4],controls,2);
    expect([changed.score,changed.rank,changed.above,changed.tied]).toEqual([90,2,1,0]);
    expect(changed.scoredControls.at(-1)?.score).toBe(95);
    expect(evaluateFeatures([4,4,4,4],controls,2).rank).toBe(1);
    for (const weight of [1,2]) controls.forEach(control=>expect(weightedScore(control.features,weight)).toBe(qualityScore(control.features,weight)));
    expect(evaluateFeatures([2,2,2,2],controls.map(c=>({...c,features:[2,2,2,2]}))).rank).toBe(100);
    expect(()=>evaluateFeatures([4,4,3,4],controls.slice(1))).toThrow();
  });
  it('reproduces the weak-feasibility probe and the distinct changed-evidence vector',()=>{
    const primary=evaluateFeatures([4,4,1,4],controls),weighted=evaluateFeatures([4,4,1,4],controls,2);
    expect([primary.score,primary.rank,primary.above,primary.tied]).toEqual([81.25,5,1,3]);
    expect([weighted.score,weighted.rank,weighted.above,weighted.tied]).toEqual([70,22,12,9]);
    const changed=evaluateFeatures([4,4,2,4],controls);
    expect([changed.score,changed.rank]).toEqual([87.5,2]);
  });
  it('detects changed frozen text, evidence or ratings and escapes the release text',()=>{
    const frozen=candidate();
    expect(verifyFrozen(frozen).text).toBe(bio.repair);
    for (const field of ['text','features','evidence']) {
      const copy=structuredClone(frozen);
      if (field==='text') copy.snapshot.text+=' changed';
      else if (field==='features') copy.snapshot.features[2]=4;
      else copy.snapshot.evidence[0].reason='new';
      expect(()=>verifyFrozen(copy)).toThrow(/changed/);
    }
    expect(()=>freezeCandidate({...c.candidate,text:'Unsupported new text'})).toThrow(/quote/);
    const html=releaseHTML(frozen,evaluateFeatures(frozen.snapshot.features,controls));
    expect(html).toContain('rank 2/100');expect(html).toContain('Fictional teaching example');
    const special=freezeCandidate({...frozen.snapshot,text:bio.repair+' <script> & "test"'});
    const escaped=releaseHTML(special,evaluateFeatures(special.snapshot.features,controls));
    expect(escaped).toContain('&lt;script&gt; &amp; &quot;test&quot;');expect(escaped).not.toContain('<script>');
  });
  it('runs the real inherited chain offline, preserves cutoffs and makes identical release bytes',()=>{
    const folder=mkdtempSync(join(tmpdir(),'week-11-workbook-'));
    const files=['week-11-cases.json','week-11-models.mjs','week-11-worked-examples.mjs','week-04-bios.json',
      'week-05-cases.json','week-05-models.mjs','week-06-models.mjs','week-07-models.mjs','week-08-cases.json',
      'week-08-models.mjs','week-09-cases.json','week-09-models.mjs','week-10-cases.json','week-10-models.mjs',
      'null-island-controls.csv','romance-models.mjs'];
    try {
      for (const file of files) copyFileSync(`dist/data/${file}`,join(folder,file));
      const run=(dir:string)=>JSON.parse(execFileSync(process.execPath,['week-11-worked-examples.mjs','--release-dir',dir],{cwd:folder,encoding:'utf8',stdio:'pipe'}));
      const report=run('rc1');run('rc2');
      expect(report.primary.rank).toBe(2);expect(report.sensitivity.score).toBe(90);
      expect(report.changedAvailability.plan).toMatchObject({minutes:100,costCents:1400,spareMinutes:-10,feasible:false,reasons:['time']});
      expect(report.changedAvailability.releaseAllowed).toBe(false);
      expect(report.time.totalMinutes).toBe(115);
      expect(report.observations.map((o:any)=>o.label)).toEqual(['agreed','pending','unobserved','declined']);
      expect(report.cutoff).toMatchObject({label:'pending',latestLabel:'agreed',evidenceIds:['next-a'],meeting:'ended',bill:'acknowledged',planVersion:'week-09-v1:atrium-cover'});
      const withdrawn=report.observations[3].source;
      expect(observationAt(withdrawn,1087).label).toBe('agreed');
      expect(observationAt(withdrawn,1088).label).toBe('declined');
      expect(observationAt(withdrawn,1086).source).toEqual(withdrawn);
      expect(report.agreement.costs).toMatchObject({alexDrinks:1200,counterpartDrinks:0,alexTotal:1400});
      expect(report.handoff).toMatchObject({candidateVersion:'week-04:A-portrait-v1+supported-bio',invitationVersion:'week-05-v1:library'});
      expect(report.markov.seeded.counts).toEqual([3108,1606,3182,2104]);
      expect(report.manifest.inputs).toHaveLength(16);
      for (const file of ['index.html','evaluation.json','manifest.json','README.txt']) expect(readFileSync(join(folder,'rc1',file))).toEqual(readFileSync(join(folder,'rc2',file)));
      const manifest=JSON.parse(readFileSync(join(folder,'rc1/manifest.json'),'utf8'));
      for (const output of manifest.outputs) expect(sha256(readFileSync(join(folder,'rc1',output.file)))).toBe(output.sha256);
      expect(()=>run('rc1')).toThrow();
      const altered=read('week-11-cases.json');altered.candidate.features[2]=4;
      writeFileSync(join(folder,'week-11-cases.json'),JSON.stringify(altered));
      expect(()=>run('bad')).toThrow();
    } finally { rmSync(folder,{recursive:true,force:true}); }
  });
});
