// Save the eleven lecture downloads together; run node week-10-worked-examples.mjs.
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { startConversation, stepConversation } from './week-07-models.mjs';
import { startReview, stepReview } from './week-08-models.mjs';
import { startHandover, stepHandover } from './week-09-models.mjs';
import { dateTransitions } from './romance-models.mjs';
import { propagate, simulate, absorption, startMeeting, stepMeeting, meetingForFollowUp } from './week-10-models.mjs';
const read=name=>JSON.parse(readFileSync(new URL(name,import.meta.url),'utf8'));
const cases=read('week-10-cases.json'), earlier=read('week-08-cases.json'), week9=read('week-09-cases.json');
assert.equal(cases.version,'week-10-v1');assert.equal(earlier.version,'week-08-v1');assert.equal(week9.version,'week-09-v1');
const near=(actual,expected)=>actual.forEach((p,i)=>assert(Math.abs(p-expected[i])<1e-12));
near(propagate(cases.matrix,2),[0.31,0.16,0.32,0.21]);
near(propagate(cases.matrix,2),dateTransitions(2));
near(propagate(cases.changedMatrix,2),[0.31,0.16,0.17,0.36]);
assert.deepEqual(cases.simulation,{seed:402010,runs:[1000,10000],steps:2});
const baseline=cases.simulation.runs.map(runs=>simulate(cases.matrix,{...cases.simulation,runs}));
const changed=simulate(cases.changedMatrix,{...cases.simulation,runs:10000});
assert.deepEqual(baseline.map(r=>r.counts),[[310,167,297,226],[3108,1606,3182,2104]]);
assert.deepEqual(changed.counts,[3108,1606,1711,3575]);
const eventual=absorption(cases.matrix);near(eventual.toN,[16/29,11/29]);near(eventual.expectedSteps,[90/29,80/29]);
let conversation=startConversation(earlier.handoff,2);
for (const event of earlier.priorEvents) conversation=stepConversation(conversation,event).state;
let review=startReview(conversation);
for (const event of [
  {id:'a1',type:'assess',at:0.3,card:earlier.cards.find(c=>c.id==='transfer')},
  {id:'r',type:'reply',at:1},
  {id:'clear',type:'resolve-review',at:1.5,findingIds:['a1'],note:'Assumed reviewer clearance in an authored fixture, not identity proof.'},
]) review=stepReview(review,event).state;
let handover=startHandover(review,week9.plan,week9.venues);
assert.throws(()=>startMeeting(handover));
for (const event of week9.proposalEvents) handover=stepHandover(handover,event).state;
const start=startMeeting(handover);
assert.equal(start.phase,'awaiting-arrival');
assert.deepEqual([start.agreement.costs.alexDrinks,start.agreement.costs.counterpartDrinks,start.agreement.costs.alexTotal],[1200,0,1400]);
const replay=(id,events)=>{
  let state=startMeeting(handover);
  const log=events.map(event=>{
    const output=stepMeeting(state,event);state=output.state;
    assert.equal(output.sendsMessage,false);assert.equal(output.takesPayment,false);
    return {id:event.id,phase:state.phase,bill:state.bill,nextDate:state.nextDate};
  });
  return {id,log,followUp:meetingForFollowUp(state)};
};
const traces=[
  replay('agreed',[cases.arrival,...cases.billEvents,...cases.nextDateEvents,cases.leave]),
  replay('unobserved',[cases.arrival,cases.leave]),
  replay('pending',[cases.arrival,cases.nextDateEvents[0],cases.leave]),
  replay('withdrawn',[cases.arrival,...cases.nextDateEvents,{id:'withdraw',type:'next-date',at:1087,actor:'counterpart',response:'decline'},cases.leave]),
  replay('changed-bill',[cases.arrival,{...cases.billEvents[2],billCents:1400},cases.leave]),
  replay('leave-before-arrival',[{...cases.leave,at:1030},cases.arrival]),
];
assert.deepEqual(traces.map(t=>t.followUp.nextDate),['agreed','unobserved','pending','declined','unobserved','unobserved']);
assert.deepEqual(traces.map(t=>t.followUp.bill),['acknowledged','waiting','waiting','waiting','review','waiting']);
assert.deepEqual(traces[0].log.slice(1,6).map(e=>e.bill),['waiting','waiting','asked','asked','acknowledged']);
writeFileSync(1,JSON.stringify({scope:cases.scope,order:cases.states,baseline,changed,eventual,agreement:start.agreement,traces},null,2)+'\n');
