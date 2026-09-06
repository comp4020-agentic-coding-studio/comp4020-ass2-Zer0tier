// Literal authored oracles: these check arithmetic and event contracts, not
// real-world detection quality, reviewer judgement or browser geometry.
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import cases from '../public/data/week-08-cases.json';
import { startConversation, stepConversation } from '../public/data/week-07-models.mjs';
import { parseDetectorCsv, evaluateDetector, errorCost, projectedPrecision, screenCase, startReview, stepReview, checkReleasePlan } from '../public/data/week-08-models.mjs';

const rows = parseDetectorCsv(readFileSync('public/data/week-08-detector.csv', 'utf8'));
const card = (id: string) => cases.cards.find(row => row.id === id)!;
const prior = () => cases.priorEvents.reduce((state, event) => stepConversation(state, event).state, startConversation(cases.handoff, 2));
const assess = { id: 'a1', type: 'assess', at: 0.3, card: card('transfer') };
const held = () => stepReview(startReview(prior()), assess).state;
const clear = { id: 'clear', type: 'resolve-review', at: 1.5, findingIds: ['a1'], note: 'Authored review record.' };

describe('Week 8 threat workbook', () => {
  it('reproduces all three literal confusion matrices with inclusive thresholds', () => {
    expect(rows).toHaveLength(100);
    expect([25,50,75].map(t => evaluateDetector(rows,t).counts)).toEqual([
      { tp:9, fn:1, fp:36, tn:54 }, { tp:8, fn:2, fp:18, tn:72 }, { tp:6, fn:4, fp:5, tn:85 },
    ]);
    const baseline = evaluateDetector(rows);
    expect(baseline.precision).toBeCloseTo(0.307692307692, 11);
    expect(baseline.recall).toBe(0.8);
    expect(baseline.falsePositiveRate).toBe(0.2);
    expect(baseline.accuracy).toBe(0.8);
    expect(baseline.flaggedIds).toHaveLength(26);
    expect(evaluateDetector([{id:'equal',malicious:true,score:50}],50).counts.tp).toBe(1);
  });

  it('represents undefined denominators and rejects malformed or unlabelled inputs', () => {
    expect(evaluateDetector(rows,0).counts).toEqual({tp:10,fn:0,fp:90,tn:0});
    expect(evaluateDetector(rows,100).precision).toBeNull();
    expect(evaluateDetector([],50)).toMatchObject({precision:null,recall:null,falsePositiveRate:null,accuracy:null});
    for (const csv of ['id,malicious,score\nx,,50', 'id,malicious,score\nx,1,101', 'id,malicious,score\nx,1,NaN', 'id,malicious,score\nx,1,50\nx,0,20']) expect(() => parseDetectorCsv(csv)).toThrow();
    for (const threshold of [-1,101,NaN,Infinity]) expect(() => evaluateDetector(rows,threshold)).toThrow();
    expect(() => evaluateDetector([...rows,rows[0]])).toThrow();
    expect(() => evaluateDetector([{id:'x',malicious:null,score:50}])).toThrow();
  });

  it('changes the cheapest tested threshold with declared error costs and retains ties', () => {
    const matrices = [25,50,75].map(t => evaluateDetector(rows,t).counts);
    expect([5,10,20].map(cost => matrices.map(counts => errorCost(counts,cost,1)))).toEqual([[41,28,25],[46,38,45],[56,58,85]]);
    expect(matrices.slice(1).map(counts => errorCost(counts,6.5,1))).toEqual([31,31]);
    expect(matrices.slice(0,2).map(counts => errorCost(counts,18,1))).toEqual([54,54]);
    expect(() => errorCost(matrices[0],-1)).toThrow();
    expect(() => errorCost({...matrices[0],fn:0.5})).toThrow();
  });

  it('projects base-rate effects only under explicitly fixed conditional rates', () => {
    expect(projectedPrecision(0.01)).toBeCloseTo(0.038834951456,11);
    expect(projectedPrecision(0.1)).toBeCloseTo(0.307692307692,11);
    expect(projectedPrecision(0.5)).toBeCloseTo(0.8,12);
    expect(projectedPrecision(0,0,0)).toBeNull();
    for (const p of [-0.1,1.1,NaN]) expect(() => projectedPrecision(p)).toThrow();
  });

  it('keeps coded evidence separate from proxies, safety claims and verdict labels', () => {
    expect(cases.cards.map(c => [c.id,screenCase(c).action])).toEqual([
      ['typo','no-additional-flag'],['transfer','review'],['template','review'],['image-conflict','review'],
      ['image-absent','no-additional-flag'],['latency','no-additional-flag'],['declared-helper','no-additional-flag'],
    ]);
    expect(screenCase(card('transfer')).evidence.map(row => row.kind)).toEqual(['money-request','identity-conflict']);
    expect(screenCase({id:'empty',observations:[]}).action).toBe('no-additional-flag');
    expect(() => screenCase({id:'unknown',observations:[{id:'o',kind:'looks-unusual',quote:'A guess.'}]})).toThrow();
    expect(() => screenCase({id:'duplicate',observations:[...card('typo').observations,...card('typo').observations]})).toThrow();
  });

  it('carries the actual Week 7 state and preserves replies and the clock during review', () => {
    const initial = startReview(prior());
    const saved = structuredClone(initial);
    const result = stepReview(initial,assess);
    expect(initial).toEqual(saved);
    expect(result.phase).toBe('review');
    expect(result.state.conversation.handoff.candidateVersion).toBe('week-04:A-portrait-v1+supported-bio');
    expect(result.state.conversation.handoff.invitationVersion).toBe('week-05-v1:library');
    expect(result.state.conversation.decision.evidence).toEqual([{source:'G1',quote:'I like board games.'}]);
    const reply = stepReview(result.state,{id:'r',type:'reply',at:1});
    expect([reply.phase,reply.state.conversation.phase]).toEqual(['review','replied']);
    const resolved = stepReview(reply.state,clear);
    expect(resolved.phase).toBe('replied');
    expect(resolved.state.resolutions).toHaveLength(1);
    expect(resolved).toMatchObject({sendsMessage:false,publishesAccusation:false});
    const expired = stepReview(held(),{id:'a2',type:'assess',at:2,card:card('image-absent')});
    expect([expired.phase,expired.state.conversation.observation]).toEqual(['review','no-reply']);
    expect(expired.state.conversation.sentAt).toBe(0);
  });

  it('requires all findings to clear and refuses a send while review holds a ready state', () => {
    const two = stepReview(held(),{id:'a2',type:'assess',at:0.4,card:card('template')}).state;
    expect(() => stepReview(two,clear)).toThrow('every open finding');
    expect(() => stepReview(two,{...clear,findingIds:['a1','a2'],note:''})).toThrow();
    expect(stepReview(two,{...clear,findingIds:['a2','a1']}).phase).toBe('pending');
    const readyHold = stepReview(startReview(startConversation(cases.handoff,2)),assess).state;
    expect(() => stepReview(readyHold,{id:'new-send',type:'send',at:1})).toThrow('no send record');
    expect(readyHold.conversation.phase).toBe('ready');
  });

  it('keeps the complete closed snapshot terminal against clearance and late events', () => {
    for (const type of ['decline','block','close']) {
      const closed = stepReview(held(),{id:'end',type,at:1});
      expect(closed.phase).toBe('closed');
      for (const event of [clear,{id:'late',type:'reply',at:3},{id:'send',type:'send',at:3},null]) {
        const later = stepReview(closed.state,event);
        expect(later.state).toEqual(closed.state);
        expect(later).toMatchObject({phase:'closed',action:'stop',sendsMessage:false,publishesAccusation:false});
      }
    }
  });

  it('deduplicates exact serialized events and rejects conflicts, stale times and reserved IDs', () => {
    const state = held();
    expect(stepReview(state,structuredClone(assess))).toMatchObject({state,action:'duplicate'});
    expect(() => stepReview(state,{...assess,card:card('typo')})).toThrow('Conflicting review');
    expect(() => stepReview(state,{id:'old',type:'read',at:0.2})).toThrow('observation-time order');
    expect(() => stepReview(state,{id:'s',type:'read',at:1})).toThrow('earlier communication');
    expect(() => stepReview(state,{id:'review-clock/a1',type:'read',at:1})).toThrow();
    expect(() => startReview({...prior(),events:[{id:'review-clock/old'}]})).toThrow('namespace');
  });

  it('rejects contact and payment capabilities and runs the six downloads in isolation', () => {
    expect(checkReleasePlan(cases.releasePlan)).toEqual({allowed:true,failed:[]});
    for (const key of ['collectsRealContact','acceptsPayments','uploadsThirdPartyImages','appIntegration','publishesAccusations']) expect(checkReleasePlan({...cases.releasePlan,[key]:true})).toEqual({allowed:false,failed:[key]});
    expect(checkReleasePlan({} as any).allowed).toBe(false);
    expect(checkReleasePlan({...cases.releasePlan,fictional:'true'}).allowed).toBe(false);
    const directory = mkdtempSync(join(tmpdir(),'slop1276-threat-'));
    try {
      for (const file of ['week-08-detector.csv','week-08-cases.json','week-08-models.mjs','week-08-worked-examples.mjs','week-07-models.mjs','week-06-models.mjs']) cpSync(join('dist/data',file),join(directory,file));
      const run = () => execFileSync(process.execPath,[join(directory,'week-08-worked-examples.mjs')],{cwd:tmpdir(),encoding:'utf8',stdio:['ignore','pipe','pipe']});
      const report = JSON.parse(run());
      expect(report.detector[1].counts).toEqual({tp:8,fn:2,fp:18,tn:72});
      expect(report.traces.map((trace:any) => trace.log.map((row:any) => row.phase))).toEqual([['review','review','replied'],['review','closed','closed'],['review','review','review']]);
      const file = join(directory,'week-08-detector.csv');
      const csv = readFileSync(file,'utf8');
      expect(csv.match(/M008,1,50/g)).toHaveLength(1);
      writeFileSync(file,csv.replace('M008,1,50','M008,1,49'));
      expect(run).toThrow();
    } finally { rmSync(directory,{recursive:true,force:true}); }
  });
});
