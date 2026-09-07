// Literal lifecycle and byte-comparison checks; no test proves human agreement,
// prose quality, independent-machine reproducibility or browser accessibility.
import { readFileSync, writeFileSync, copyFileSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';
import { startAgreement, stepAgreement, retentionPlan, checkManifest, restoreSnapshot, sha256 } from '../public/data/week-12-models.mjs';
const c=JSON.parse(readFileSync('public/data/week-12-cases.json','utf8'));
const start=()=>startAgreement(c.agreement);
const replay=(events:any[])=>events.reduce((state,event)=>stepAgreement(state,event).state,start());
const accepted=()=>replay([c.proposal,...c.acknowledgements]);
const manifest=(files:Record<string,Buffer>)=>Object.entries(files).map(([file,bytes])=>({file,sha256:sha256(bytes)}));

describe('Week 12 maintenance workbook',()=>{
  it('requires initial acknowledgements from every distinct participant',()=>{
    expect(start()).toMatchObject({phase:'active',current:{version:1,acknowledgedBy:['A','B']}});
    for (const invalid of [{...c.agreement,acknowledgedBy:['A']},{...c.agreement,acknowledgedBy:['A','A']},
      {...c.agreement,participants:['A','A']},{...c.agreement,version:2}]) expect(()=>startAgreement(invalid)).toThrow();
  });
  it('keeps proposed terms separate until two explicit current-version acceptances',()=>{
    const original=start(),proposed=stepAgreement(original,c.proposal).state;
    expect(proposed).toMatchObject({phase:'review',current:{version:1},pending:{acceptedBy:[]}});
    expect(proposed.current.terms).toEqual(c.agreement.terms);expect(original.pending).toBeNull();
    const first=stepAgreement(proposed,c.acknowledgements[0]).state;
    expect(first).toMatchObject({current:{version:1},pending:{acceptedBy:['A']}});
    const result=stepAgreement(first,c.acknowledgements[1]);
    expect(result.state).toMatchObject({phase:'active',current:{version:2,terms:c.proposal.terms,acknowledgedBy:['A','B']},pending:null});
    expect(result.state.history[0].status).toBe('adopted');expect(result.sendsMessage).toBe(false);
  });
  it('expires at the deadline without treating missing acceptance as refusal',()=>{
    const before=replay([c.proposal,c.acknowledgements[0],{...c.acknowledgements[1],at:9}]);
    const at=replay([c.proposal,c.acknowledgements[0],{...c.acknowledgements[1],at:10}]);
    expect(before.current.version).toBe(2);
    expect(at).toMatchObject({phase:'review',current:{version:1},pending:null});
    expect(at.history[0]).toMatchObject({status:'expired',acceptedBy:['A']});
    const silence=replay([c.proposal,{id:'clock',type:'clock',at:10}]);
    expect(silence.history[0].status).toBe('expired');expect(silence.endedBy).toBeNull();
  });
  it('rejects stale versions and prevents renaming a refused proposal into a retry',()=>{
    expect(()=>stepAgreement(accepted(),{...c.proposal,id:'old',proposalId:'new-id',at:4})).toThrow(/Stale/);
    const pending=replay([c.proposal]);
    expect(()=>stepAgreement(pending,{...c.acknowledgements[0],baseVersion:0})).toThrow(/exact/);
    expect(()=>stepAgreement(pending,{...c.acknowledgements[0],proposalId:'other'})).toThrow(/exact/);
    const rejected=replay([c.proposal,{...c.acknowledgements[1],type:'reject'}]);
    expect(rejected).toMatchObject({phase:'review',current:{version:1},pending:null});
    expect(rejected.history[0].status).toBe('rejected');
    expect(()=>stepAgreement(rejected,{...c.proposal,id:'retry',proposalId:'renamed',at:4})).toThrow(/retry/);
    expect(()=>stepAgreement(rejected,{...c.acknowledgements[0],id:'late',at:4})).toThrow();
  });
  it('lets either participant end immediately and preserves the complete ended record',()=>{
    for (const state of [start(),replay([c.proposal]),replay([c.proposal,c.acknowledgements[0]]),accepted(),replay([c.proposal,{...c.acknowledgements[1],type:'reject'}])]) {
      for (const actor of ['A','B']) {
        const ended=stepAgreement(state,{id:'end',type:'end',at:5,actor,baseVersion:0}).state;
        expect(ended.phase).toBe('ended');expect(ended.endedBy).toBe(actor);
        expect(stepAgreement(ended,{id:'later',type:'clock',at:6}).state).toEqual(ended);
        expect(stepAgreement(ended,{...c.acknowledgements[1],id:'late-accept',at:6}).state).toEqual(ended);
        expect(stepAgreement(ended,{...c.proposal,id:'restore',at:6,baseVersion:ended.current.version}).state).toEqual(ended);
        if (state.pending) expect(ended.history.at(-1).status).toBe('cancelled-by-ending');
      }
    }
  });
  it('handles duplicate delivery without double approval and rejects invalid event records',()=>{
    const proposed=replay([c.proposal]);
    expect(stepAgreement(proposed,c.proposal).state).toEqual(proposed);
    expect(()=>stepAgreement(proposed,{...c.proposal,at:2})).toThrow(/Conflicting/);
    const first=stepAgreement(proposed,c.acknowledgements[0]).state;
    expect(stepAgreement(first,c.acknowledgements[0]).state).toEqual(first);
    expect(()=>stepAgreement(first,{...c.acknowledgements[0],id:'second',at:3})).toThrow(/once/);
    for (const event of [{...c.acknowledgements[0],actor:'outsider'}, {...c.acknowledgements[0],at:0},
      {...c.acknowledgements[0],at:NaN},{id:'x',type:'restore-consent',at:3,actor:'A'}]) expect(()=>stepAgreement(proposed,event)).toThrow();
  });
  it('requires all three listed participants for the separate shared agreement',()=>{
    let state=startAgreement(c.networkAgreement);
    state=stepAgreement(state,{...c.proposal,actor:'P',terms:{...c.networkAgreement.terms,routine:'Choose a mutually acceptable optional check-in.'}}).state;
    for (const [i,actor] of ['P','Q','R'].entries()) {
      state=stepAgreement(state,{...c.acknowledgements[0],id:actor,at:i+2,actor}).state;
      expect(state.current.version).toBe(i<2 ? 1 : 2);
    }
    expect(state.current.acknowledgedBy).toEqual(['P','Q','R']);
  });
  it('plans retention by ownership and expiry, without deleting or losing release dependencies',()=>{
    const plan=retentionPlan(c.inventory,14);
    expect(plan.map((row:any)=>row.action)).toEqual(['retain-for-purpose','plan-delete-own-copies','plan-delete-own-copies','outside-control','retain-for-purpose']);
    expect(plan.every((row:any)=>!row.deletesFiles && !row.sendsRequest)).toBe(true);
    expect(retentionPlan(c.inventory,13)[1].action).toBe('retain-for-purpose');
    expect(retentionPlan(c.inventory,30).filter((row:any)=>row.action==='review-release-dependency')).toHaveLength(2);
    expect(()=>retentionPlan([{...c.inventory[0],synthetic:false}],14)).toThrow();
    expect(()=>retentionPlan([...c.inventory,c.inventory[0]],14)).toThrow();
    expect(()=>retentionPlan(c.inventory,-1)).toThrow();
  });
  it('detects missing, changed and extra bytes and validates manifest paths',()=>{
    const files={'index.html':Buffer.from('original'),'evaluation.json':Buffer.from('{"rank":2}')};
    const trusted=manifest(files);
    expect(checkManifest(trusted,files)).toEqual({ok:true,missing:[],changed:[],extra:[]});
    expect(checkManifest(trusted,{'index.html':Buffer.from('changed'),'extra.txt':Buffer.from('x')})).toEqual({ok:false,missing:['evaluation.json'],changed:['index.html'],extra:['extra.txt']});
    expect(sha256('abc')).toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
    for (const invalid of [[],[trusted[0],trusted[0]],[{...trusted[0],file:'../outside'}],[{...trusted[0],sha256:'invalid'}]]) expect(()=>checkManifest(invalid,files)).toThrow();
  });
  it('restores the full trusted snapshot and refuses a changed archive',()=>{
    const archive={'index.html':Buffer.from('Fine to pass.'),'evaluation.json':Buffer.from('{"rank":2}')};
    const trusted=manifest(archive),working={...archive,'index.html':Buffer.from(''),'obsolete.txt':Buffer.from('old')};
    const result=restoreSnapshot(trusted,archive,working);
    expect(result.before).toEqual({ok:false,missing:[],changed:['index.html'],extra:['obsolete.txt']});
    expect(result.after).toEqual({ok:true,missing:[],changed:[],extra:[]});
    expect(Object.keys(result.restored)).toEqual(['index.html','evaluation.json']);
    result.restored['index.html'][0]=0;expect(archive['index.html'].toString()).toBe('Fine to pass.');
    expect(working['index.html'].toString()).toBe('');
    expect(()=>restoreSnapshot(trusted,working,archive)).toThrow(/archive/);
  });
  it('consumes the actual Week 11 release in a clean offline directory and restores it byte for byte',()=>{
    const folder=mkdtempSync(join(tmpdir(),'week12-offline-'));
    const files=['week-12-cases.json','week-12-models.mjs','week-12-worked-examples.mjs',
      'week-11-cases.json','week-11-models.mjs','week-11-worked-examples.mjs','week-04-bios.json','week-05-cases.json','week-05-models.mjs',
      'week-06-models.mjs','week-07-models.mjs','week-08-cases.json','week-08-models.mjs','week-09-cases.json','week-09-models.mjs',
      'week-10-cases.json','week-10-models.mjs','null-island-controls.csv','romance-models.mjs'];
    try {
      for (const file of files) copyFileSync(`dist/data/${file}`,join(folder,file));
      const run=(args:string[])=>JSON.parse(execFileSync(process.execPath,args,{cwd:folder,encoding:'utf8',stdio:'pipe',maxBuffer:2*1024*1024}));
      run(['week-11-worked-examples.mjs','--release-dir','received']);
      const before=readFileSync(join(folder,'received/index.html'));
      const report=run(['week-12-worked-examples.mjs','--release-dir','received','--work-dir','drill']);
      expect(report.receivedMode).toBe('existing-week-11-example');
      expect(report.release).toMatchObject({primary:{score:93.75,rank:2},sensitivity:{score:90,rank:2},changedCaseReleaseAllowed:false});
      expect(report.reproduction.ok).toBe(true);expect(report.rollback.after.ok).toBe(true);
      expect(report.rollback.before).toEqual({ok:false,missing:[],changed:['index.html'],extra:['obsolete.txt']});
      expect(report.terminal.map((row:any)=>[row.week,row.preserved])).toEqual([[6,true],[7,true],[8,true],[9,true],[10,true],[11,true],[12,true]]);
      expect(report.agreements.ended.phase).toBe('ended');
      expect(report.agreements.network.trace.map((row:any)=>row.version)).toEqual([1,1,1,2]);
      expect(readFileSync(join(folder,'received/index.html'))).toEqual(before);
      for (const file of ['index.html','evaluation.json','manifest.json','README.txt']) {
        expect(readFileSync(join(folder,'drill/reproduced',file))).toEqual(readFileSync(join(folder,'received',file)));
        expect(readFileSync(join(folder,'drill/restored',file))).toEqual(readFileSync(join(folder,'received',file)));
      }
      expect(readFileSync(join(folder,'drill/faulty/index.html'),'utf8')).not.toContain('Fine to pass.');
      expect(readFileSync(join(folder,'drill/handover-template.md'),'utf8').match(/To record/g)).toHaveLength(11);
      expect(()=>run(['week-12-worked-examples.mjs','--work-dir','drill'])).toThrow();
      writeFileSync(join(folder,'received/index.html'),'changed');
      expect(()=>run(['week-12-worked-examples.mjs','--release-dir','received','--work-dir','bad'])).toThrow();
      writeFileSync(join(folder,'received/index.html'),before);
      writeFileSync(join(folder,'week-11-cases.json'),readFileSync(join(folder,'week-11-cases.json'),'utf8')+'\n');
      expect(()=>run(['week-12-worked-examples.mjs','--release-dir','received','--work-dir','source-mismatch'])).toThrow();
    } finally {rmSync(folder,{recursive:true,force:true});}
  });
});
