// Local teaching records, not a service, identity check or human-consent oracle.
import { createHash } from 'node:crypto';
const text=value=>typeof value==='string' && value.trim().length>0;
const whole=value=>Number.isSafeInteger(value) && value>=0;
const clone=value=>structuredClone(value);
export const sha256=value=>createHash('sha256').update(value).digest('hex');
const terms=value=>{
  if (!value || Object.keys(value).sort().join(',')!=='architecture,privacy,routine' || !Object.values(value).every(text)) throw new Error('Supply architecture, routine and privacy terms.');
  return {architecture:value.architecture,routine:value.routine,privacy:value.privacy};
};
export function startAgreement(record) {
  if (!record || !text(record.id) || record.version!==1 || !Array.isArray(record.participants) || record.participants.length<2 ||
    !record.participants.every(text) || new Set(record.participants).size!==record.participants.length || !Array.isArray(record.acknowledgedBy) ||
    JSON.stringify([...record.participants].sort())!==JSON.stringify([...record.acknowledgedBy].sort())) throw new Error('Record distinct participants and each initial acknowledgement for version 1.');
  return {schema:'week-12-v1',id:record.id,phase:'active',participants:clone(record.participants),
    current:{version:1,terms:terms(record.terms),acknowledgedBy:clone(record.acknowledgedBy)},
    pending:null,history:[],events:[],lastAt:null,endedBy:null};
}
export function stepAgreement(input,event) {
  if (!input || input.schema!=='week-12-v1') throw new Error('Use a constructed Week 12 agreement.');
  const state=clone(input);
  const finish=action=>({state,action,sendsMessage:false});
  if (state.phase==='ended') return finish('stop');
  if (!event || !text(event.id) || !whole(event.at) || !['propose','accept','reject','clock','end'].includes(event.type)) throw new Error('Use a known event, unique ID and non-negative whole ticks.');
  const prior=state.events.find(e=>e.id===event.id);
  if (prior) {
    if (JSON.stringify(prior)!==JSON.stringify(event)) throw new Error('Conflicting event ID.');
    return finish('duplicate');
  }
  if (state.lastAt!==null && event.at<state.lastAt) throw new Error('Keep event chronology.');
  if (event.type!=='clock' && !state.participants.includes(event.actor)) throw new Error('Name a participant in this agreement.');
  const archive=status=>{
    state.history.push({...state.pending,status,closedAt:event.at});state.pending=null;
  };
  // An ending needs one participant, never a quorum or a current base version.
  if (event.type==='end') {
    if (state.pending) archive('cancelled-by-ending');
    state.phase='ended';state.endedBy=event.actor;
  } else if (state.pending && event.at>=state.pending.expiresAt) {
    archive('expired');state.phase='review';
    state.events.push(clone(event));state.lastAt=event.at;return finish('expired-without-adoption');
  } else if (event.type==='propose') {
    if (state.pending) throw new Error('Resolve the pending proposal first.');
    if (event.baseVersion!==state.current.version) throw new Error('Stale base version.');
    if (!text(event.proposalId) || state.history.some(p=>p.id===event.proposalId) || !whole(event.expiresAt) || event.expiresAt<=event.at) throw new Error('Use a new proposal ID and a future expiry.');
    const proposed=terms(event.terms);
    if (JSON.stringify(proposed)===JSON.stringify(state.current.terms)) throw new Error('No terms changed.');
    if (state.history.some(p=>p.status==='rejected' && JSON.stringify(p.terms)===JSON.stringify(proposed))) throw new Error('Do not retry rejected terms under a new ID.');
    state.pending={id:event.proposalId,baseVersion:event.baseVersion,terms:proposed,expiresAt:event.expiresAt,acceptedBy:[]};state.phase='review';
  } else if (['accept','reject'].includes(event.type)) {
    if (!state.pending || event.proposalId!==state.pending.id || event.baseVersion!==state.current.version || event.baseVersion!==state.pending.baseVersion) throw new Error('Respond to the exact current proposal and base version.');
    if (event.type==='reject') {archive('rejected');state.phase='review';}
    else {
      if (state.pending.acceptedBy.includes(event.actor)) throw new Error('Each participant accepts once.');
      state.pending.acceptedBy.push(event.actor);
      if (state.participants.every(actor=>state.pending.acceptedBy.includes(actor))) {
        state.current={version:state.current.version+1,terms:clone(state.pending.terms),acknowledgedBy:clone(state.pending.acceptedBy)};
        archive('adopted');state.phase='active';
      }
    }
  }
  state.events.push(clone(event));state.lastAt=event.at;
  return finish(state.phase==='ended' ? 'stop' : state.pending ? 'await-explicit-responses' : 'record-only');
}

export function retentionPlan(inventory,day) {
  if (!Array.isArray(inventory) || !whole(day)) throw new Error('Supply an inventory and whole elapsed days.');
  const ids=new Set();
  return inventory.map(item=>{
    if (!item || !text(item.id) || ids.has(item.id) || item.synthetic!==true || !['student','other'].includes(item.owner) ||
      !text(item.purpose) || !whole(item.retainUntil) || typeof item.releaseDependency!=='boolean' || !Array.isArray(item.copies) || !item.copies.length || !item.copies.every(text)) throw new Error('Use unique synthetic records with owner, purpose, copies, expiry and dependency status.');
    ids.add(item.id);
    const action=item.owner==='other' ? 'outside-control' : day<item.retainUntil ? 'retain-for-purpose' : item.releaseDependency ? 'review-release-dependency' : 'plan-delete-own-copies';
    return {...clone(item),day,action,deletesFiles:false,sendsRequest:false};
  });
}

// Flat classroom bundles only. Reject traversal, duplicate names and omitted files.
export function checkManifest(manifest,files) {
  if (!Array.isArray(manifest) || !manifest.length || !files || typeof files!=='object') throw new Error('Supply a non-empty manifest and file bytes.');
  const names=new Set();
  for (const row of manifest) {
    if (!row || !/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(row.file) || names.has(row.file) || !/^[a-f0-9]{64}$/.test(row.sha256)) throw new Error('Use unique flat filenames and SHA-256 digests.');
    names.add(row.file);
  }
  const missing=manifest.filter(row=>!Object.hasOwn(files,row.file)).map(row=>row.file);
  const changed=manifest.filter(row=>Object.hasOwn(files,row.file) && sha256(files[row.file])!==row.sha256).map(row=>row.file);
  const extra=Object.keys(files).filter(name=>!names.has(name));
  return {ok:!missing.length && !changed.length && !extra.length,missing,changed,extra};
}

export function restoreSnapshot(trustedManifest,archive,working) {
  if (!checkManifest(trustedManifest,archive).ok) throw new Error('Rollback archive does not match the retained manifest.');
  const before=checkManifest(trustedManifest,working);
  // Replace the COMPLETE in-memory snapshot, so stale extra files do not survive.
  const restored=Object.fromEntries(Object.entries(archive).map(([name,bytes])=>[name,Buffer.from(bytes)]));
  return {before,restored,after:checkManifest(trustedManifest,restored)};
}
