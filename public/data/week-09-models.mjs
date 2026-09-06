// Authored planning models. No free-text consent inference or external actions.
import { venueDecision } from './week-05-models.mjs';
const text = value => typeof value === 'string' && value.trim().length > 0;
const count = value => {
  if (!Number.isSafeInteger(value) || value < 0) throw new RangeError('Use non-negative safe whole units.');
};
const probability = value => {
  if (!Number.isFinite(value) || value < 0 || value > 1) throw new RangeError('Use probabilities in [0,1].');
};

export function costSharing(activityCents, transportCents, mode) {
  [activityCents,transportCents].forEach(count);
  if (!['cover-both','split-drinks'].includes(mode) || activityCents % 2) throw new Error('Use two equal whole-cent drink prices and a known cost mode.');
  const counterpartDrinks = mode === 'split-drinks' ? activityCents / 2 : 0;
  const alexDrinks = activityCents - counterpartDrinks;
  const alexTotal = alexDrinks + transportCents;
  count(alexTotal);
  return {mode,alexDrinks,counterpartDrinks,alexTransport:transportCents,alexTotal,counterpartTransport:null};
}

export function filterVenue(venue, departMinute = 1020, mode = 'cover-both', weights = {quiet:3,lighting:1}) {
  if (!venue || !text(venue.id)) throw new TypeError('Use an authored venue card.');
  [departMinute,venue.openMinute,venue.closeMinute].forEach(count);
  if (venue.closeMinute < venue.openMinute || venue.closeMinute > 1440) throw new RangeError('Use same-day opening times.');
  const costs = costSharing(venue.activityCents,venue.transportCents,mode);
  const route = venueDecision({...venue,activityCents:costs.alexDrinks},120,2000);
  const arrival = departMinute + venue.outboundMinutes;
  const meetingEnd = arrival + venue.meetingMinutes;
  const home = meetingEnd + venue.returnMinutes;
  [arrival,meetingEnd,home].forEach(count);
  const reasons = ['public','access','exit','bus'].filter(key => venue[key] !== true);
  if (arrival < venue.openMinute || meetingEnd > venue.closeMinute) reasons.push('opening');
  if (departMinute < 1020 || home > 1140) reasons.push('time');
  if (costs.alexTotal > 2000) reasons.push('budget');
  if (!weights || ![weights.quiet,weights.lighting].every(n => Number.isFinite(n) && n >= 0) || weights.quiet + weights.lighting <= 0 ||
      ![venue.quiet,venue.lighting].every(n => Number.isFinite(n) && n >= 0 && n <= 5)) throw new RangeError('Use non-negative preference weights and 0-5 scores.');
  const score = weights.quiet * venue.quiet + weights.lighting * venue.lighting;
  if (!Number.isFinite(score)) throw new RangeError('Preference arithmetic must remain finite.');
  return {id:venue.id,feasible:reasons.length===0,reasons,score:reasons.length ? null : score,arrival,meetingEnd,home,minutes:route.minutes,costs};
}

export function enumerateLogistics(config) {
  const c = config;
  if (!c) throw new TypeError('Supply the logistics assumptions.');
  [c.baseCostCents,c.baseMinutes,c.lateMinutes,c.closureCostCents,c.closureMinutes,c.timeLimit,c.budgetCents,c.availableMinutes].forEach(count);
  [c.lateProbability,c.closureGivenLate,c.closureGivenOnTime].forEach(probability);
  const states = [false,true].flatMap(late => [false,true].map(closed => {
    const conditional = late ? c.closureGivenLate : c.closureGivenOnTime;
    const mass = (late ? c.lateProbability : 1-c.lateProbability) * (closed ? conditional : 1-conditional);
    const costCents = c.baseCostCents + (closed ? c.closureCostCents : 0);
    const minutes = c.baseMinutes + (late ? c.lateMinutes : 0) + (closed ? c.closureMinutes : 0);
    [costCents,minutes].forEach(count);
    return {late,closed,probability:mass,costCents,minutes};
  }));
  const massWhere = predicate => states.filter(predicate).reduce((sum,row) => sum+row.probability,0);
  return {states,expectedCostCents:states.reduce((sum,row)=>sum+row.probability*row.costCents,0),
    expectedMinutes:states.reduce((sum,row)=>sum+row.probability*row.minutes,0),
    closureProbability:massWhere(row=>row.closed),
    targetMissProbability:massWhere(row=>row.minutes > c.timeLimit || row.costCents > c.budgetCents),
    hardWindowMissProbability:massWhere(row=>row.minutes > c.availableMinutes),
    budgetMissProbability:massWhere(row=>row.costCents > c.budgetCents)};
}

const planKeys = ['version','priorInvitationVersion','venueId','alternativeId','date','departMinute','confirmBy','costMode','cancelText'];
export function inspectPlan(plan, venues) {
  if (!plan || Object.keys(plan).length !== planKeys.length || !planKeys.every(key => Object.hasOwn(plan,key))) throw new TypeError('Use only the minimal proposal fields.');
  for (const key of ['version','priorInvitationVersion','venueId','alternativeId','date','cancelText']) if (!text(plan[key])) throw new TypeError('Proposal references and cancellation text must be explicit.');
  const date = new Date(plan.date+'T00:00:00Z');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(plan.date) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0,10)!==plan.date || date.getUTCDay()!==5) throw new Error('Use a valid Friday date.');
  [plan.departMinute,plan.confirmBy].forEach(count);
  if (plan.confirmBy >= plan.departMinute || plan.venueId === plan.alternativeId) throw new Error('Confirm before departure and name a distinct alternative.');
  if (!Array.isArray(venues) || new Set(venues.map(v=>v.id)).size !== venues.length) throw new Error('Use unique venue IDs.');
  const decisions = [plan.venueId,plan.alternativeId].map(id => {
    const venue = venues.find(v=>v.id===id);
    if (!venue) throw new Error('Unknown proposal venue.');
    return filterVenue(venue,plan.departMinute,plan.costMode);
  });
  if (decisions.some(row=>!row.feasible)) throw new Error('Both primary and alternative must pass hard constraints.');
  return {primary:decisions[0],alternative:decisions[1]};
}

function checkReview(review) {
  if (!review || review.version !== 'week-08-v1' || !Array.isArray(review.holds) || !review.conversation?.handoff ||
      !['ready','sent','pending','replied','closed'].includes(review.conversation.phase)) throw new TypeError('Use an actual Week 8 review snapshot.');
}
export function startHandover(review, plan, venues) {
  checkReview(review);
  if (review.holds.length || review.conversation.phase !== 'replied') throw new Error('A held, pending or closed record cannot start a proposal.');
  if (plan.priorInvitationVersion !== review.conversation.handoff.invitationVersion) throw new Error('Retain the earlier invitation version.');
  const decision = inspectPlan(plan,venues);
  return {version:'week-09-v1',review:structuredClone(review),plan:structuredClone(plan),venues:structuredClone(venues),decision,
    phase:'draft',confirmations:[],priorPlans:[],events:[],lastAt:null,reason:null};
}

export function stepHandover(input,event) {
  if (!input || input.version !== 'week-09-v1') throw new TypeError('Use a Week 9 handover snapshot.');
  const state = structuredClone(input);
  const finish = action => ({state,action,sendsMessage:false,booksVenue:false,takesPayment:false});
  if (['cancelled','expired'].includes(state.phase)) return finish('stop');
  if (!event || !text(event.id) || !['propose','confirm','revise','cancel','decline','clock','review'].includes(event.type)) throw new TypeError('Use a known event type and ID.');
  count(event.at);
  if (event.at >= 1440) throw new RangeError('Observation minutes belong to the proposal day.');
  const prior = state.events.find(row=>row.id===event.id);
  if (prior) {
    if (JSON.stringify(prior)!==JSON.stringify(event)) throw new Error('Conflicting handover event ID.');
    return finish('duplicate');
  }
  if (state.lastAt !== null && event.at < state.lastAt) throw new Error('Keep new events in observation-time order.');
  state.lastAt = event.at;
  state.events.push(structuredClone(event));
  if (['cancel','decline'].includes(event.type)) {
    state.phase='cancelled';state.reason=event.type;state.confirmations=[];
    return finish('stop');
  }
  if (event.type === 'review') {
    checkReview(event.review);
    for (const key of ['candidateVersion','invitationVersion']) if (event.review.conversation.handoff[key] !== state.review.conversation.handoff[key]) throw new Error('Review must concern the same prior artefacts.');
    state.review=structuredClone(event.review);state.confirmations=[];
    state.phase=state.review.conversation.phase==='closed' ? 'cancelled' : state.review.holds.length ? 'review' : 'draft';
    if (state.phase==='cancelled') {state.reason='prior-closed';return finish('stop');}
    if (state.review.conversation.phase !== 'replied') throw new Error('An open update must retain the replied conversation.');
  }
  // Half-open confirmation window: a new confirmation at the deadline is late.
  if (state.phase !== 'confirmed' && event.at >= state.plan.confirmBy) {
    state.phase='expired';state.reason='unconfirmed-at-deadline';state.confirmations=[];
    return finish('stop');
  }
  if (event.type === 'propose') {
    if (state.phase !== 'draft') throw new Error('Record a proposal only from draft.');
    state.phase='proposed';
  } else if (event.type === 'confirm') {
    if (!['proposed','confirmed'].includes(state.phase) || !['alex','counterpart'].includes(event.actor) || event.planVersion !== state.plan.version) throw new Error('Confirm the current proposed version with an explicit actor.');
    if (state.confirmations.includes(event.actor)) throw new Error('This actor has already confirmed this version.');
    state.confirmations.push(event.actor);
    if (state.confirmations.length === 2) state.phase='confirmed';
  } else if (event.type === 'revise') {
    if (!['proposed','confirmed'].includes(state.phase)) throw new Error('Revise an open proposed or confirmed plan.');
    if (!event.plan || [state.plan,...state.priorPlans].some(plan=>plan.version===event.plan.version) || event.plan.priorInvitationVersion!==state.plan.priorInvitationVersion) throw new Error('A revision needs a new version and the same prior invitation.');
    const decision=inspectPlan(event.plan,state.venues);
    if (event.plan.confirmBy <= event.at) throw new Error('A revision needs a future confirmation point.');
    state.priorPlans.push(state.plan);state.plan=structuredClone(event.plan);state.decision=decision;
    state.confirmations=[];state.phase='proposed';
  }
  return finish(state.phase==='confirmed' ? 'record-confirmed-plan' : state.phase==='review' ? 'hold' : 'record-only');
}

export function handoverForDate(state) {
  if (!state || state.version!=='week-09-v1' || state.phase!=='confirmed' || state.review.holds.length || state.review.conversation.phase!=='replied') throw new Error('Only a currently confirmed, unheld plan can be handed over.');
  return structuredClone({scope:'Authored plan agreement only; arrival and continuing agreement are not inferred.',plan:state.plan,
    costs:state.decision.primary.costs,confirmations:state.confirmations,priorHandoff:state.review.conversation.handoff});
}
