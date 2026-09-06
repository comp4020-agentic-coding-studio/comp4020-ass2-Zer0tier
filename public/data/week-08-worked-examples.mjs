// Save all six Week 8 downloads together. Run: node week-08-worked-examples.mjs
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { startConversation, stepConversation } from './week-07-models.mjs';
import { parseDetectorCsv, evaluateDetector, errorCost, projectedPrecision, screenCase, startReview, stepReview, checkReleasePlan } from './week-08-models.mjs';

const cases = JSON.parse(readFileSync(new URL('week-08-cases.json', import.meta.url), 'utf8'));
assert.equal(cases.version, 'week-08-v1');
assert.equal(cases.detector.file, 'week-08-detector.csv');
const rows = parseDetectorCsv(readFileSync(new URL(cases.detector.file, import.meta.url), 'utf8'));
assert.equal(rows.length, 100);
const detector = cases.detector.thresholds.map(threshold => evaluateDetector(rows, threshold));
assert.deepEqual(detector.map(result => result.counts), [
  { tp:9, fn:1, fp:36, tn:54 }, { tp:8, fn:2, fp:18, tn:72 }, { tp:6, fn:4, fp:5, tn:85 },
]);
const costs = cases.detector.falseNegativeCosts.map(fnCost => ({ fnCost,
  values: detector.map(result => errorCost(result.counts, fnCost, cases.detector.falsePositiveCost)) }));
assert.deepEqual(costs.map(row => row.values), [[41,28,25],[46,38,45],[56,58,85]]);
const prevalence = [0.01,0.1,0.5].map(p => ({ prevalence:p, precision:projectedPrecision(p) }));
assert.equal(new Set(cases.cards.map(card => card.id)).size, cases.cards.length, 'Duplicate case ID');
const triage = cases.cards.map(screenCase);
assert.deepEqual(triage.map(row => row.action), ['no-additional-flag','review','review','review','no-additional-flag','no-additional-flag','no-additional-flag']);
const card = id => {
  const found = cases.cards.find(row => row.id === id);
  assert(found, 'Unknown authored case');
  return found;
};
let prior = startConversation(cases.handoff, 2);
for (const event of cases.priorEvents) prior = stepConversation(prior, event).state;
assert.equal(prior.phase, 'pending');
const assess = { id:'a1',type:'assess',at:0.3,card:card('transfer') };
const replay = (id, events) => {
  let state = startReview(prior);
  const log = events.map(event => {
    const output = stepReview(state,event);
    state = output.state;
    assert.equal(output.sendsMessage,false);
    assert.equal(output.publishesAccusation,false);
    return { eventId:event.id, action:output.action, phase:output.phase, conversation:state.conversation.phase, observation:state.conversation.observation, holds:state.holds.length };
  });
  return {id,log};
};
const traces = [
  replay('review-then-clear', [assess,{id:'r',type:'reply',at:1},{id:'clear',type:'resolve-review',at:1.5,findingIds:['a1'],note:'Assumed reviewer clearance for this branch; the case cards alone do not establish authenticity.'}]),
  replay('review-then-refusal', [assess,{id:'d',type:'decline',at:1},{id:'clear',type:'resolve-review',at:2,findingIds:['a1'],note:'A later clearance must not change the closed record.'}]),
  replay('no-match-does-not-clear', [assess,{id:'t',type:'timeout',at:2},{id:'a2',type:'assess',at:2.1,card:card('image-absent')}]),
];
assert.deepEqual(traces.map(trace => trace.log.map(row => row.phase)), [['review','review','replied'],['review','closed','closed'],['review','review','review']]);
assert.equal(traces[2].log.at(-1).observation, 'no-reply');
const release = checkReleasePlan(cases.releasePlan);
assert.equal(release.allowed,true);
const forbidden = ['collectsRealContact','acceptsPayments','uploadsThirdPartyImages','appIntegration','publishesAccusations'].map(key => ({key,...checkReleasePlan({...cases.releasePlan,[key]:true})}));
assert(forbidden.every(result => !result.allowed));
writeFileSync(1,JSON.stringify({scope:cases.scope,detector,costs,prevalence,triage,traces,release,forbidden},null,2)+'\n');
