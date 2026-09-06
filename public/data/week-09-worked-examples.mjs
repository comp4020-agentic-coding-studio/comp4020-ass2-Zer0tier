// Save all ten downloads together; run node week-09-worked-examples.mjs.
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { venueDecision } from './week-05-models.mjs';
import { startConversation, stepConversation } from './week-07-models.mjs';
import { startReview, stepReview } from './week-08-models.mjs';
import { dateLogistics } from './romance-models.mjs';
import { costSharing, filterVenue, enumerateLogistics, startHandover, stepHandover, handoverForDate } from './week-09-models.mjs';
const read = name => JSON.parse(readFileSync(new URL(name,import.meta.url),'utf8'));
const cases=read('week-09-cases.json'), earlier=read('week-08-cases.json'), week5=read('week-05-cases.json');
assert.equal(cases.version,'week-09-v1');
assert.equal(earlier.version,'week-08-v1');
assert.equal(week5.version,'week-05-v1');
const library=venueDecision(week5.venues.find(row=>row.id==='library'));
assert.equal(library.minutes,100);assert.equal(library.costCents,1400);
let conversation=startConversation(earlier.handoff,2);
for (const event of earlier.priorEvents) conversation=stepConversation(conversation,event).state;
let review=startReview(conversation);
for (const event of [
  {id:'a1',type:'assess',at:0.3,card:earlier.cards.find(row=>row.id==='transfer')},
  {id:'r',type:'reply',at:1},
  {id:'clear',type:'resolve-review',at:1.5,findingIds:['a1'],note:'Assumed reviewer clearance for this authored transition; not identity proof.'},
]) review=stepReview(review,event).state;
const decisions=cases.venues.map(venue=>filterVenue(venue,1020,'cover-both',cases.weights));
assert.deepEqual(decisions.map(row=>row.reasons),[[],['public','exit'],['opening','time','budget'],[]]);
assert.deepEqual([decisions[0].minutes,decisions[0].costs.alexTotal],[90,1400]);
assert.equal(cases.logistics.baseMinutes,decisions[0].minutes);
assert.equal(cases.logistics.baseCostCents,decisions[0].costs.alexTotal);
const independent=enumerateLogistics(cases.logistics);
const dependent=enumerateLogistics({...cases.logistics,closureGivenLate:0.4,closureGivenOnTime:0});
assert.deepEqual(independent.states.map(row=>[row.costCents,row.minutes]),[[1400,90],[2000,100],[1400,110],[2000,120]]);
for (const [report,reference] of [[independent,dateLogistics()],[dependent,dateLogistics(0.4,0)]]) {
  assert(Math.abs(report.expectedCostCents-1460)<1e-9);
  assert(Math.abs(report.expectedMinutes-96)<1e-9);
  assert(Math.abs(report.expectedCostCents/100-reference.expectedCost)<1e-9);
  assert(Math.abs(report.targetMissProbability-reference.failureProbability)<1e-12);
}
assert(Math.abs(independent.targetMissProbability-0.025)<1e-12);
assert(Math.abs(dependent.targetMissProbability-0.1)<1e-12);
const split=costSharing(1200,200,'split-drinks');assert.equal(split.alexTotal,800);
const replay = (id,events) => {
  let state=startHandover(review,cases.plan,cases.venues);
  const log=events.map(event=>{
    const output=stepHandover(state,event);state=output.state;
    assert.equal(output.sendsMessage,false);assert.equal(output.booksVenue,false);assert.equal(output.takesPayment,false);
    return {id:event.id,phase:state.phase,version:state.plan.version,confirmations:state.confirmations};
  });
  return {id,log,state};
};
const revised={...cases.plan,version:'week-09-v2:atrium-split',costMode:'split-drinks'};
const newReview=stepReview(review,{id:'new-finding',type:'assess',at:2,card:earlier.cards.find(row=>row.id==='template')}).state;
const traces=[
  replay('confirmed',cases.proposalEvents),
  replay('cancelled',[...cases.proposalEvents,{id:'c',type:'cancel',at:985},{id:'late',type:'confirm',at:986,actor:'counterpart',planVersion:cases.plan.version}]),
  replay('revised',[...cases.proposalEvents,{id:'v2',type:'revise',at:982,plan:revised},{id:'a2',type:'confirm',at:984,actor:'alex',planVersion:revised.version},{id:'b2',type:'confirm',at:985,actor:'counterpart',planVersion:revised.version}]),
  replay('expired',[cases.proposalEvents[0],cases.proposalEvents[1],{...cases.proposalEvents[2],at:990}]),
  replay('new-review',[...cases.proposalEvents,{id:'hold',type:'review',at:985,review:newReview}]),
];
assert.deepEqual(traces.map(trace=>trace.state.phase),['confirmed','cancelled','confirmed','expired','review']);
assert.equal(traces[2].state.decision.primary.costs.alexTotal,800);
const handoff=handoverForDate(traces[0].state);
for (const i of [1,3,4]) assert.throws(()=>handoverForDate(traces[i].state));
writeFileSync(1,JSON.stringify({scope:cases.scope,priorLibrary:library,decisions,independent,dependent,split,
  traces:traces.map(({id,log})=>({id,log})),handoff},null,2)+'\n');
