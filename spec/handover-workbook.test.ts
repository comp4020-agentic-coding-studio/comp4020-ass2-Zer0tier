// Literal planning/event oracles, not real-venue access or consent verification.
// Browser layout and contrast are checked in the rendered site, not here.
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import cases from '../public/data/week-09-cases.json';
import earlier from '../public/data/week-08-cases.json';
import { startConversation, stepConversation } from '../public/data/week-07-models.mjs';
import { startReview, stepReview } from '../public/data/week-08-models.mjs';
import { costSharing, filterVenue, enumerateLogistics, inspectPlan, startHandover, stepHandover, handoverForDate } from '../public/data/week-09-models.mjs';
const review = () => {
  let state=startConversation(earlier.handoff,2);
  for (const event of earlier.priorEvents) state=stepConversation(state,event).state;
  state=stepConversation(state,{id:'r',type:'reply',at:1}).state;
  return startReview(state);
};
const initial = () => startHandover(review(),cases.plan,cases.venues);
const confirmed = () => cases.proposalEvents.reduce((state,event)=>stepHandover(state,event).state,initial());
const assess = (state:any) => stepReview(state,{id:'a1',type:'assess',at:2,card:earlier.cards[1]}).state;

describe('Week 9 offline handover workbook',()=>{
  it('keeps proposed drink contributions separate from Alex transport and agreement',()=>{
    expect(costSharing(1200,200,'cover-both')).toEqual({mode:'cover-both',alexDrinks:1200,counterpartDrinks:0,alexTransport:200,alexTotal:1400,counterpartTransport:null});
    expect(costSharing(1200,200,'split-drinks').alexTotal).toBe(800);
    expect(costSharing(1200,200,'split-drinks').counterpartDrinks).toBe(600);
    for (const args of [[1201,200,'split-drinks'],[1200,-1,'cover-both'],[1200,200,'assume-they-pay']] as const) expect(()=>costSharing(...args)).toThrow();
  });
  it('filters hard constraints before ranking and includes exact budget and window limits',()=>{
    const results=cases.venues.map(v=>filterVenue(v));
    expect(results.map(row=>[row.id,row.reasons,row.score])).toEqual([
      ['atrium',[],15],['loft',['public','exit'],null],['gallery',['opening','time','budget'],null],['annex',[],14],
    ]);
    expect(results[0]).toMatchObject({arrival:1040,meetingEnd:1090,home:1110,minutes:90});
    expect(filterVenue({...cases.venues[0],access:null}).reasons).toEqual(['access']);
    expect(filterVenue({...cases.venues[1],quiet:5,lighting:5},1020,'cover-both',{quiet:100,lighting:100}).score).toBeNull();
    expect(filterVenue(cases.venues[3]).costs.alexTotal).toBe(2000);
    expect(filterVenue({...cases.venues[0],meetingMinutes:80}).home).toBe(1140);
    expect(filterVenue({...cases.venues[0],meetingMinutes:80}).feasible).toBe(true);
    expect(filterVenue(cases.venues[0],1020,'cover-both',{quiet:1,lighting:1}).score).toBe(7);
    expect(filterVenue(cases.venues[3],1020,'cover-both',{quiet:1,lighting:1}).score).toBe(8);
  });
  it('validates minimal fields and a feasible distinct alternative before proposing',()=>{
    expect(inspectPlan(cases.plan,cases.venues).alternative.feasible).toBe(true);
    for (const patch of [{homeAddress:'fictional but unnecessary'},{date:'2027-05-08'},{alternativeId:'loft'},{alternativeId:'atrium'},{confirmBy:1020}]) expect(()=>inspectPlan({...cases.plan,...patch},cases.venues)).toThrow();
    expect(()=>inspectPlan(cases.plan,[...cases.venues,cases.venues[0]])).toThrow('unique venue');
  });
  it('enumerates the four literal independent outcomes and strict target exceedance',()=>{
    const result=enumerateLogistics(cases.logistics);
    expect(result.states.map(row=>[row.late,row.closed,row.costCents,row.minutes])).toEqual([[false,false,1400,90],[false,true,2000,100],[true,false,1400,110],[true,true,2000,120]]);
    result.states.forEach((row,i)=>expect(row.probability).toBeCloseTo([0.675,0.075,0.225,0.025][i],12));
    expect(result.expectedCostCents).toBeCloseTo(1460,10);expect(result.expectedMinutes).toBeCloseTo(96,12);
    expect(result.targetMissProbability).toBeCloseTo(0.025,12);
    expect(result.hardWindowMissProbability).toBe(0);expect(result.budgetMissProbability).toBe(0);
    expect(enumerateLogistics({...cases.logistics,timeLimit:109}).targetMissProbability).toBeCloseTo(0.25,12);
    expect(enumerateLogistics({...cases.logistics,timeLimit:120}).targetMissProbability).toBe(0);
  });
  it('changes dependence and the baseline without confusing marginal means with tail risk',()=>{
    const dependent=enumerateLogistics({...cases.logistics,closureGivenLate:0.4,closureGivenOnTime:0});
    dependent.states.forEach((row,i)=>expect(row.probability).toBeCloseTo([0.75,0,0.15,0.1][i],12));
    expect(dependent.closureProbability).toBeCloseTo(0.1,12);
    expect(dependent.expectedCostCents).toBeCloseTo(1460,10);expect(dependent.expectedMinutes).toBeCloseTo(96,12);
    expect(dependent.targetMissProbability).toBeCloseTo(0.1,12);
    expect(enumerateLogistics({...cases.logistics,closureGivenLate:0,closureGivenOnTime:2/15}).targetMissProbability).toBe(0);
    expect(enumerateLogistics({...cases.logistics,baseMinutes:100}).targetMissProbability).toBeCloseTo(0.25,12);
    expect(enumerateLogistics({...cases.logistics,baseCostCents:800}).expectedCostCents).toBeCloseTo(860,10);
    for (const patch of [{lateProbability:1.1},{closureGivenLate:NaN},{baseMinutes:-1},{baseCostCents:0.5}]) expect(()=>enumerateLogistics({...cases.logistics,...patch})).toThrow();
  });
  it('requires an actual unheld replied handoff and preserves the earlier version and evidence',()=>{
    const state=initial();
    expect(state.phase).toBe('draft');expect(state.confirmations).toEqual([]);
    expect(state.review.conversation.handoff.invitationVersion).toBe('week-05-v1:library');
    expect(state.review.conversation.decision.evidence).toEqual([{source:'G1',quote:'I like board games.'}]);
    expect(()=>startHandover(assess(review()),cases.plan,cases.venues)).toThrow('cannot start');
    expect(()=>startHandover(startReview(startConversation(earlier.handoff,2)),cases.plan,cases.venues)).toThrow();
    const closed=stepReview(review(),{id:'d',type:'decline',at:2}).state;
    expect(()=>startHandover(closed,cases.plan,cases.venues)).toThrow();
    expect(()=>startHandover(review(),{...cases.plan,priorInvitationVersion:'unknown'},cases.venues)).toThrow('earlier invitation');
  });
  it('requires two explicit confirmations of the same version and never emits external actions',()=>{
    let state=initial();const original=state;const before=structuredClone(state);
    const phases=[];
    for (const event of cases.proposalEvents) {
      const result=stepHandover(state,event);state=result.state;phases.push(state.phase);
      expect(result).toMatchObject({sendsMessage:false,booksVenue:false,takesPayment:false});
    }
    expect(phases).toEqual(['proposed','proposed','confirmed']);
    expect(original).toEqual(before);
    expect(handoverForDate(state)).toMatchObject({confirmations:['alex','counterpart'],costs:{alexTotal:1400}});
    expect(()=>stepHandover(initial(),cases.proposalEvents[1])).toThrow('current proposed');
    expect(()=>stepHandover(state,{...cases.proposalEvents[1],id:'again',at:981})).toThrow('already confirmed');
  });
  it('invalidates confirmations after revision or a fresh review and requires new agreement',()=>{
    const state=confirmed();const saved=structuredClone(state);
    const plan={...cases.plan,version:'week-09-v2:split',costMode:'split-drinks'};
    const revised=stepHandover(state,{id:'v',type:'revise',at:982,plan}).state;
    expect(state).toEqual(saved);expect(revised.phase).toBe('proposed');expect(revised.confirmations).toEqual([]);
    expect(revised.decision.primary.costs.alexTotal).toBe(800);expect(revised.priorPlans).toHaveLength(1);
    expect(()=>stepHandover(revised,{...cases.proposalEvents[2],id:'old-version',at:984})).toThrow('current proposed');
    const held=stepHandover(state,{id:'review',type:'review',at:985,review:assess(review())}).state;
    expect(held.phase).toBe('review');expect(held.confirmations).toEqual([]);expect(()=>handoverForDate(held)).toThrow();
    const clear=stepReview(held.review,{id:'clear',type:'resolve-review',at:3,findingIds:['a1'],note:'Assumed authored clearance.'}).state;
    const reset=stepHandover(held,{id:'clear-review',type:'review',at:986,review:clear}).state;
    expect(reset.phase).toBe('draft');expect(reset.confirmations).toEqual([]);
  });
  it('keeps cancellation and expiry terminal and rejects conflicting or stale new event IDs',()=>{
    const state=confirmed();
    const closed=stepHandover(state,{id:'c',type:'cancel',at:985}).state;
    expect(stepHandover(closed,{...cases.proposalEvents[2],id:'late',at:986}).state).toEqual(closed);
    expect(()=>handoverForDate(closed)).toThrow();
    const one=cases.proposalEvents.slice(0,2).reduce((s,e)=>stepHandover(s,e).state,initial());
    expect(stepHandover(one,{...cases.proposalEvents[2],at:989}).state.phase).toBe('confirmed');
    const expired=stepHandover(one,{...cases.proposalEvents[2],at:990}).state;
    expect(expired.phase).toBe('expired');expect(stepHandover(expired,null).state).toEqual(expired);
    expect(stepHandover(one,cases.proposalEvents[0])).toMatchObject({state:one,action:'duplicate'});
    expect(()=>stepHandover(one,{...cases.proposalEvents[0],at:971})).toThrow('Conflicting');
    expect(()=>stepHandover(one,{id:'old',type:'clock',at:969})).toThrow('observation-time');
    const priorClosed=stepReview(review(),{id:'d',type:'decline',at:2}).state;
    expect(stepHandover(state,{id:'closed-review',type:'review',at:985,review:priorClosed}).state).toMatchObject({phase:'cancelled',reason:'prior-closed'});
  });
  it('runs all ten downloads offline and rejects a corrupted numerical fixture',()=>{
    const directory=mkdtempSync(join(tmpdir(),'slop1276-handover-'));
    try {
      for (const file of ['week-09-cases.json','week-09-models.mjs','week-09-worked-examples.mjs','week-08-cases.json','week-08-models.mjs','week-07-models.mjs','week-06-models.mjs','week-05-cases.json','week-05-models.mjs','romance-models.mjs']) cpSync(join('dist/data',file),join(directory,file));
      const run=()=>execFileSync(process.execPath,[join(directory,'week-09-worked-examples.mjs')],{cwd:tmpdir(),encoding:'utf8',stdio:['ignore','pipe','pipe']});
      const report=JSON.parse(run());
      expect(report.priorLibrary).toMatchObject({minutes:100,costCents:1400});
      expect(report.traces.map((trace:any)=>trace.log.at(-1).phase)).toEqual(['confirmed','cancelled','confirmed','expired','review']);
      expect(report.independent.targetMissProbability).toBeCloseTo(0.025,12);
      const file=join(directory,'week-09-cases.json');const changed=JSON.parse(readFileSync(file,'utf8'));
      changed.logistics.baseMinutes=91;writeFileSync(file,JSON.stringify(changed));expect(run).toThrow();
    } finally {rmSync(directory,{recursive:true,force:true});}
  });
});
