// Literal arithmetic and event oracles; prose, external validity and layout need review.
import { readFileSync, mkdtempSync, copyFileSync, writeFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';
import { propagate, categorical, seededUniform, simulate, absorption, startMeeting, stepMeeting, meetingForFollowUp } from '../public/data/week-10-models.mjs';
import { startConversation, stepConversation } from '../public/data/week-07-models.mjs';
import { startReview, stepReview } from '../public/data/week-08-models.mjs';
import { startHandover, stepHandover } from '../public/data/week-09-models.mjs';
const read=(name:string)=>JSON.parse(readFileSync(`public/data/${name}`,'utf8'));
const c=read('week-10-cases.json'), w9=read('week-09-cases.json'), w8=read('week-08-cases.json');
const near=(actual:number[],expected:number[])=>actual.forEach((p,i)=>expect(p).toBeCloseTo(expected[i],12));
function agreement(confirm=true) {
  let conversation=startConversation(w8.handoff,2);
  for (const e of w8.priorEvents) conversation=stepConversation(conversation,e).state;
  let review=startReview(conversation);
  review=stepReview(review,{id:'r',type:'reply',at:1}).state;
  let state=startHandover(review,w9.plan,w9.venues);
  if (confirm) for (const e of w9.proposalEvents) state=stepHandover(state,e).state;
  return state;
}
const run=(events:any[])=>events.reduce((s,e)=>stepMeeting(s,e).state,startMeeting(agreement()));

describe('Week 10 date workbook',()=>{
  it('propagates source rows into literal one- and two-step vectors without transposition',()=>{
    expect(propagate(c.matrix,0)).toEqual([1,0,0,0]);
    near(propagate(c.matrix,1),[0.5,0.2,0.2,0.1]);
    near(propagate(c.matrix,2),[0.31,0.16,0.32,0.21]);
    near(propagate(c.matrix,2,[0,1,0,0]),[0.24,0.15,0.19,0.42]);
    near(propagate(c.changedMatrix,2),[0.31,0.16,0.17,0.36]);
    const initial=[0,1,0,0];propagate(c.matrix,5,initial);expect(initial).toEqual([0,1,0,0]);
  });
  it('preserves mass and absorbs N/E, rejecting invalid and nonabsorbing matrices',()=>{
    for (const steps of [0,1,2,50,10000]) {
      expect(propagate(c.matrix,steps).reduce((a:number,b:number)=>a+b,0)).toBeCloseTo(1,12);
      expect(propagate(c.matrix,steps,[0,0,1,0])).toEqual([0,0,1,0]);
      expect(propagate(c.matrix,steps,[0,0,0,1])).toEqual([0,0,0,1]);
    }
    for (const row of [[0.5,0.2,0.2,0.2],[-0.1,0.5,0.5,0.1],[NaN,0,0,1],[Infinity,0,0,0],[1,0]]) {
      expect(()=>propagate([row,...c.matrix.slice(1)],2)).toThrow();
    }
    expect(()=>propagate([...c.matrix.slice(0,2),[0.1,0,0.9,0],c.matrix[3]],2)).toThrow(/absorbing/);
    for (const n of [-1,1.5,Infinity,10001]) expect(()=>propagate(c.matrix,n)).toThrow();
    expect(()=>propagate(c.matrix,1,[1,1,0,0])).toThrow();
  });
  it('uses half-open categorical intervals and never selects zero mass at u=0',()=>{
    expect([0,0.499,0.5,0.699,0.7,0.899,0.9,0.999].map(u=>categorical(c.matrix[0],u))).toEqual([0,0,1,1,2,2,3,3]);
    expect(categorical([0,0,1,0],0)).toBe(2);
    expect(categorical([0,0,0,1],0)).toBe(3);
    for (const u of [-0.1,1,NaN,Infinity]) expect(()=>categorical(c.matrix[0],u)).toThrow();
  });
  it('matches independently checked unsigned LCG words and fixed path counts',()=>{
    const random=seededUniform(402010);
    expect(Array.from({length:5},()=>random()*4294967296)).toEqual([154701297,426061468,1684044107,2650537518,2080321461]);
    const small=simulate(c.matrix,{seed:402010,runs:1000,steps:2});
    const large=simulate(c.matrix,{seed:402010,runs:10000,steps:2});
    expect(small.counts).toEqual([310,167,297,226]);
    expect(large.counts).toEqual([3108,1606,3182,2104]);
    near(small.absoluteErrors,[0,0.007,0.023,0.016]);near(large.absoluteErrors,[0.0008,0.0006,0.0018,0.0004]);
    expect(large.absoluteErrors[0]).toBeGreaterThan(small.absoluteErrors[0]);
    expect(simulate(c.changedMatrix,{seed:402010,runs:10000,steps:2}).counts).toEqual([3108,1606,1711,3575]);
  });
  it('resets each simulated path and validates run, seed, horizon and initial state bounds',()=>{
    expect(simulate(c.matrix,{seed:0,runs:10,steps:0}).counts).toEqual([10,0,0,0]);
    expect(simulate(c.matrix,{seed:0xffffffff,runs:10,steps:50,start:2}).counts).toEqual([0,0,10,0]);
    expect(simulate(c.matrix,{seed:0,runs:10,steps:50,start:3}).counts).toEqual([0,0,0,10]);
    for (const invalid of [{runs:0},{runs:1.5},{runs:1000001},{seed:-1},{seed:4294967296},{steps:-1},{steps:10001},{start:4},{runs:1000000,steps:100}]) {
      expect(()=>simulate(c.matrix,{seed:402010,runs:1000,steps:2,...invalid})).toThrow();
    }
  });
  it('solves eventual absorption separately from the finite horizon',()=>{
    const base=absorption(c.matrix);near(base.toN,[16/29,11/29]);near(base.toE,[13/29,18/29]);near(base.expectedSteps,[90/29,80/29]);
    near(absorption(c.changedMatrix).toN,[9/29,8/29]);
    expect(()=>absorption([[1,0,0,0],[0,1,0,0],c.matrix[2],c.matrix[3]])).toThrow(/transient/);
    expect(propagate(c.matrix,100)[2]).toBeCloseTo(16/29,12);
  });
  it('requires an actual confirmed Week 9 record and separately records arrival',()=>{
    expect(()=>startMeeting(agreement(false))).toThrow();
    const confirmed=agreement();const start=startMeeting(confirmed);
    expect(start.phase).toBe('awaiting-arrival');expect(start.nextDate).toBe('unobserved');
    expect(start.agreement.costs).toEqual({mode:'cover-both',alexDrinks:1200,counterpartDrinks:0,alexTransport:200,alexTotal:1400,counterpartTransport:null});
    expect(()=>stepMeeting(start,c.billEvents[0])).toThrow(/Arrival/);
    expect(()=>stepMeeting(start,{...c.arrival,actors:['alex']})).toThrow();
    expect(run([c.arrival]).phase).toBe('active');
    const cancelled=stepHandover(confirmed,{id:'cancel',type:'cancel',at:985}).state;
    expect(()=>startMeeting(cancelled)).toThrow();
  });
  it('leaves repeated waits unchanged and needs two acknowledgements of checked current costs',()=>{
    let state=run([c.arrival]);const bills=[];
    for (const e of c.billEvents) {const out=stepMeeting(state,e);state=out.state;bills.push(state.bill);expect(out.sendsMessage).toBe(false);expect(out.takesPayment).toBe(false);}
    expect(bills).toEqual(['waiting','waiting','asked','asked','acknowledged']);
    expect(state.nextDate).toBe('unobserved');
    expect(()=>stepMeeting(run([c.arrival]),{...c.billEvents[2],planVersion:'old'})).toThrow(/current/);
    expect(()=>run([c.arrival,c.billEvents[2],c.billEvents[3],{...c.billEvents[3],id:'twice'}])).toThrow();
    for (const billCents of [null,1400]) {
      const changed=run([c.arrival,{...c.billEvents[2],billCents}]);expect(changed.bill).toBe('review');
      expect(()=>stepMeeting(changed,c.billEvents[3])).toThrow();
      expect(stepMeeting(changed,c.leave).state.phase).toBe('ended');
    }
  });
  it('keeps observed agreement, decline, pending and unobserved distinct; withdrawal remains possible',()=>{
    expect(meetingForFollowUp(run([c.arrival,c.leave])).nextDate).toBe('unobserved');
    expect(meetingForFollowUp(run([c.arrival,c.nextDateEvents[0],c.leave])).nextDate).toBe('pending');
    const agreed=run([c.arrival,...c.nextDateEvents]);expect(agreed.nextDate).toBe('agreed');
    const decline={id:'no',type:'next-date',at:1087,actor:'counterpart',response:'decline'};
    const withdrawn=stepMeeting(agreed,decline).state;expect(withdrawn.nextDate).toBe('declined');
    expect(withdrawn.events).toHaveLength(4);
    expect(()=>stepMeeting(withdrawn,{...c.nextDateEvents[0],id:'retry',at:1088})).toThrow(/retry/);
    expect(()=>run([c.arrival,{...c.nextDateEvents[0],response:'nice time'}])).toThrow(/explicit/);
  });
  it('makes leaving independent of bill progress, retains terminal snapshots and rejects conflicting histories',()=>{
    const ended=run([{...c.leave,at:1030}]);
    expect(ended.phase).toBe('ended');expect(ended.bill).toBe('waiting');
    expect(stepMeeting(ended,c.arrival).state).toEqual(ended);
    expect(stepMeeting(ended,c.billEvents[2]).state).toEqual(ended);
    const active=run([c.arrival]);expect(stepMeeting(active,c.arrival).state).toEqual(active);
    expect(()=>stepMeeting(active,{...c.arrival,at:1041})).toThrow(/Conflicting/);
    expect(()=>stepMeeting(active,{id:'stale',type:'wait',at:1039})).toThrow(/chronology/);
    expect(()=>meetingForFollowUp(active)).toThrow(/Close/);
  });
  it('runs exactly eleven downloads offline and rejects a changed fixture',()=>{
    const names=['week-10-worked-examples.mjs','week-10-cases.json','week-10-models.mjs','week-09-cases.json','week-09-models.mjs','week-08-cases.json','week-08-models.mjs','week-07-models.mjs','week-06-models.mjs','week-05-models.mjs','romance-models.mjs'];
    const dir=mkdtempSync(join(tmpdir(),'week-10-'));
    try {
      for (const name of names) copyFileSync(`dist/data/${name}`,join(dir,name));
      const report=JSON.parse(execFileSync(process.execPath,[join(dir,names[0])],{cwd:dir,encoding:'utf8'}));
      expect(report.baseline[1].counts).toEqual([3108,1606,3182,2104]);
      expect(report.traces.map((t:any)=>t.followUp.nextDate)).toEqual(['agreed','unobserved','pending','declined','unobserved','unobserved']);
      const changed=structuredClone(c);changed.matrix[0]=[0.5,0.2,0.1,0.2];
      writeFileSync(join(dir,'week-10-cases.json'),JSON.stringify(changed));
      expect(()=>execFileSync(process.execPath,[join(dir,names[0])],{cwd:dir,stdio:'pipe'})).toThrow();
    } finally {rmSync(dir,{recursive:true,force:true});}
  });
});
