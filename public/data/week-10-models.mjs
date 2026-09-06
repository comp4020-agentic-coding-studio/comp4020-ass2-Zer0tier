// Authored finite-state exercises. No messaging, payment, consent classifier or timer.
import { handoverForDate } from './week-09-models.mjs';
const whole = (value, max) => {
  if (!Number.isSafeInteger(value) || value < 0 || value > max) throw new RangeError('Use a whole value inside the documented bound.');
};
function distribution(row) {
  if (!Array.isArray(row) || row.length !== 4) throw new TypeError('Use four probabilities in C/A/N/E order.');
  for (const p of row) if (!Number.isFinite(p) || p < 0 || p > 1) throw new RangeError('Use finite probabilities in [0,1].');
  if (Math.abs(row.reduce((a,b)=>a+b,0)-1) > 1e-12) throw new RangeError('Probability mass must sum to one.');
}
export function validateMatrix(matrix) {
  if (!Array.isArray(matrix) || matrix.length !== 4) throw new TypeError('Use four source rows.');
  for (const row of matrix) distribution(row);
  for (const i of [2,3]) for (let j=0;j<4;j++) {
    if (matrix[i][j] !== Number(i===j)) throw new Error('N and E must remain absorbing.');
  }
}
export function propagate(matrix, steps, initial=[1,0,0,0]) {
  validateMatrix(matrix);whole(steps,10000);distribution(initial);
  let current=[...initial];
  for (let step=0;step<steps;step++) {
    current=[0,1,2,3].map(j=>current.reduce((sum,p,i)=>sum+p*matrix[i][j],0));
  }
  return current;
}
// Half-open cumulative intervals. Final positive cell absorbs only roundoff.
function pick(row,u) {
  let cumulative=0, lastPositive=0;
  for (let j=0;j<4;j++) {
    cumulative+=row[j];
    if (row[j]>0) lastPositive=j;
    if (u < cumulative) return j;
  }
  return lastPositive;
}
export function categorical(row,u) {
  distribution(row);
  if (!Number.isFinite(u) || u < 0 || u >= 1) throw new RangeError('Draw u in [0,1).');
  return pick(row,u);
}
// Deliberately small teaching PRNG: unsigned 32-bit LCG, not cryptographic.
// Draw after advancing, one draw per step even in absorbing states.
export function seededUniform(seed) {
  whole(seed,0xffffffff);
  let state=seed;
  return () => {
    state=(Math.imul(1664525,state)+1013904223)>>>0;
    return state/4294967296;
  };
}
export function simulate(matrix,{seed,runs,steps,start=0}) {
  validateMatrix(matrix);whole(runs,1000000);whole(steps,10000);whole(start,3);
  if (runs===0 || runs*steps>10000000) throw new RangeError('Use 1–1,000,000 paths and at most 10,000,000 transitions.');
  const random=seededUniform(seed), counts=[0,0,0,0];
  for (let run=0;run<runs;run++) {
    let state=start;
    for (let step=0;step<steps;step++) state=pick(matrix[state],random());
    counts[state]++;
  }
  const initial=[0,0,0,0];initial[start]=1;
  const exact=propagate(matrix,steps,initial), estimates=counts.map(n=>n/runs);
  return {seed,runs,steps,start,counts,estimates,exact,absoluteErrors:estimates.map((p,i)=>Math.abs(p-exact[i]))};
}
// First-step equations for this four-state structure; rejects closed C/A classes.
export function absorption(matrix) {
  validateMatrix(matrix);
  const a=1-matrix[0][0], b=-matrix[0][1], c=-matrix[1][0], d=1-matrix[1][1];
  const determinant=a*d-b*c;
  if (determinant<=1e-12) throw new Error('This extension needs transient C/A states and a nonsingular system.');
  const solve=(x,y)=>[(d*x-b*y)/determinant,(a*y-c*x)/determinant];
  return {toN:solve(matrix[0][2],matrix[1][2]),toE:solve(matrix[0][3],matrix[1][3]),expectedSteps:solve(1,1)};
}

export function startMeeting(handover) {
  const agreement=handoverForDate(handover);
  return {version:'week-10-v1',agreement,phase:'awaiting-arrival',bill:'waiting',billActors:[],
    nextDate:'unobserved',nextActors:[],events:[],lastAt:null};
}
const actor = value => {
  if (!['alex','counterpart'].includes(value)) throw new Error('Use an explicit actor.');
};
export function stepMeeting(input,event) {
  if (!input || input.version!=='week-10-v1') throw new TypeError('Use a constructed meeting snapshot.');
  const state=structuredClone(input);
  const output=()=>({state,sendsMessage:false,takesPayment:false});
  if (state.phase==='ended') return output();
  if (!event || typeof event.id!=='string' || !event.id.trim()) throw new TypeError('Use an event ID.');
  const previous=state.events.find(e=>e.id===event.id);
  if (previous) {
    if (JSON.stringify(previous)!==JSON.stringify(event)) throw new Error('Conflicting event ID.');
    return output();
  }
  whole(event.at,1439);
  if (event.at<state.agreement.plan.departMinute || (state.lastAt!==null && event.at<state.lastAt)) throw new Error('Events must follow departure and the retained chronology.');
  if (event.type==='leave') { actor(event.actor);state.phase='ended'; }
  else if (event.type==='arrive') {
    if (state.phase!=='awaiting-arrival' || !Array.isArray(event.actors) || event.actors.length!==2 || new Set(event.actors).size!==2) throw new Error('Record both observed arrivals once.');
    event.actors.forEach(actor);state.phase='active';
  } else {
    if (state.phase!=='active') throw new Error('Arrival must be explicitly observed first.');
    if (['ask-bill','ack-bill'].includes(event.type) && event.planVersion!==state.agreement.plan.version) throw new Error('Name the current cost agreement.');
    switch (event.type) {
      case 'wait': break;
      case 'ask-bill': {
        if (state.bill!=='waiting') throw new Error('An unresolved change needs a separate renewed agreement.');
        if (event.billCents!==null) whole(event.billCents,1000000);
        const costs=state.agreement.costs;
        state.bill=event.billCents===costs.alexDrinks+costs.counterpartDrinks ? 'asked' : 'review';
        break;
      }
      case 'ack-bill':
        actor(event.actor);
        if (state.bill!=='asked' || state.billActors.includes(event.actor)) throw new Error('Acknowledge checked costs once per actor.');
        state.billActors.push(event.actor);
        if (state.billActors.length===2) state.bill='acknowledged';
        break;
      case 'next-date':
        actor(event.actor);
        if (!['agree','decline'].includes(event.response)) throw new Error('Use an explicit response; silence is unobserved.');
        if (state.nextDate==='declined') throw new Error('Do not retry a declined invitation.');
        if (event.response==='decline') { state.nextDate='declined';state.nextActors=[]; }
        else {
          if (state.nextActors.includes(event.actor)) throw new Error('One actor cannot supply two agreements.');
          state.nextActors.push(event.actor);
          state.nextDate=state.nextActors.length===2 ? 'agreed' : 'pending';
        }
        break;
      default: throw new Error('Unknown coded observation.');
    }
  }
  state.lastAt=event.at;state.events.push(structuredClone(event));
  return output();
}
export function meetingForFollowUp(state) {
  if (!state || state.version!=='week-10-v1' || state.phase!=='ended') throw new Error('Close the meeting record before exporting.');
  return structuredClone({scope:'Authored observations only; no Monte Carlo state is evidence of agreement.',
    planVersion:state.agreement.plan.version,meeting:'ended',bill:state.bill,nextDate:state.nextDate,events:state.events});
}
