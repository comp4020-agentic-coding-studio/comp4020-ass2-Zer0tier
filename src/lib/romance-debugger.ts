import { routeMessage } from '../../public/data/week-06-models.mjs';

type Snapshot = {
  closed: boolean;
  boundary: 'clear' | 'unknown' | 'declined';
  sent: boolean;
  inbound: 'none' | 'reply' | 'decline';
  recipient: { id: string; topics: { topic: string; quote: string }[] | null };
};
export type Message = { speaker: string; text: string; kind: 'profile' | 'outgoing' | 'incoming' | 'system' | 'boundary' | 'draft' };
type Route = ReturnType<typeof routeMessage>;
type Effect = 'context' | 'plain' | 'clarify' | 'observe' | 'close' | 'unsupported';
export type Choice = { id: string; label: string; effect: Effect; explanation: string; next: string | null; text?: string; allowed?: string[] };
type Scene = { title: string; prompt: string; unknowns: string[]; choices: Choice[]; patch?: Partial<Snapshot>; arrivals?: Message[] };
export type Inspection = {
  choiceId: string; choice: string; accepted: boolean; explanation: string;
  before: Route; after: Route; evidence: { source: string; quote: string }[];
  unknowns: string[]; next: string | null;
};
export type DebuggerState = {
  caseId: string; sceneId: string; snapshot: Snapshot; messages: Message[];
  latest: Inspection | null; history: Inspection[];
};

export const debuggerCases = [
  { id: 'shared', title: 'A shared interest', description: 'A supported opener, an ambiguous reply and a boundary.', first: 'shared-open' },
  { id: 'missing', title: 'The missing context', description: 'An empty profile field and an unanswered message.', first: 'missing-open' },
  { id: 'history', title: 'The incomplete record', description: 'A shared hobby with a crucial piece of history missing.', first: 'history-review' },
];
export const stateLabels: Record<string, string> = {
  'draft-context': 'Contextual draft available', 'draft-plain': 'Plain draft available',
  pending: 'Pending', respond: 'Reply to review', review: 'Needs review', stop: 'Closed / stop',
};
export const treeRules = [
  { id: 'terminal', title: 'Check the boundary', description: 'A closed, declined or blocked conversation stops here.' },
  { id: 'metadata', title: 'Check the record', description: 'Unknown or malformed routing facts require review.' },
  { id: 'history', title: 'Check what happened', description: 'A reply needs review. An unanswered opener stays pending.' },
  { id: 'context', title: 'Check shared context', description: 'Use a supported topic, or offer a plain draft.' },
];

const noReply = ['Why no reply has been recorded.', 'Whether the recipient is interested or available on Friday.'];
const opener = (context: boolean, next: string): Choice => ({
  id: context ? 'context' : 'plain', effect: context ? 'context' : 'plain',
  label: context ? 'Use the board-games opener' : 'Use a plain introduction',
  text: context ? 'Board games and terrible puns here. Which co-op game would you recommend?' : 'Hi, I’m Alex. How is your week going?',
  explanation: context
    ? 'Alex’s case and the recipient’s quote support the topic. This simulation records one opener; a reply is still unknown.'
    : 'A plain introduction makes no claim about a shared hobby. This simulation records one opener and waits for evidence.',
  next,
});
const close = (next: string | null = null): Choice => ({ id: 'close', label: 'Close this conversation', effect: 'close', next,
  explanation: 'The local record is closed. Ending the conversation does not require a guessed explanation of the other person’s feelings.' });
const invent: Choice = { id: 'invent', label: 'Claim that we both love hiking', effect: 'unsupported', next: null,
  explanation: 'No supplied evidence establishes a shared hiking interest. Alex’s case supplies board games and terrible puns. Repair the draft without adding biography.' };
const waitingChoices = (next: string | null): Choice[] => [
  { id: 'unknown', label: 'We don’t know yet — leave it pending', effect: 'observe', allowed: ['pending'], next,
    explanation: 'Uncertainty is a valid result. No reply is recorded, so the state stays pending. A read receipt or a wait does not establish a motive.' },
  { ...opener(false, ''), id: 'resend', label: 'Send another opener' },
  { id: 'assume', label: 'Treat the silence as proof of disinterest', effect: 'unsupported', next: null,
    explanation: 'The log contains an absence of a reply, not an explanation. You may choose to stop, but you cannot label a motive from this evidence.' },
  close(),
];
const scenes: Record<string, Scene> = {
  'shared-open': {
    title: 'A topic with evidence', prompt: 'Alex has not sent an opener. What should happen next?',
    unknowns: ['Whether the recipient will reply.', 'Whether Friday is available or any meeting is agreed.'],
    choices: [opener(true, 'shared-wait'), opener(false, 'shared-wait'), invent],
  },
  'shared-wait': {
    title: 'Read. And then nothing.', prompt: 'The authored log adds a read receipt. What does the silence let you do?',
    arrivals: [{ speaker: 'Observation log', kind: 'system', text: 'A read receipt is recorded. No reply has been recorded.' }],
    unknowns: noReply, choices: waitingChoices('shared-reply'),
  },
  'shared-reply': {
    title: '“Might” is doing a lot of work', prompt: 'The next authored event is a reply. What can Alex reasonably draft?',
    patch: { inbound: 'reply' },
    arrivals: [{ speaker: 'G1 · fictional reply', kind: 'incoming', text: 'I like co-op games. Friday might work, but I need to check.' }],
    unknowns: ['Whether Friday is available or any meeting is agreed.', 'What the reply means about romantic interest.'],
    choices: [
      { id: 'clarify', label: 'Draft one question about Friday', effect: 'clarify', next: 'shared-refusal',
        text: 'Would Friday work for you? It’s fine if it doesn’t.',
        explanation: 'The actual reply supplies a topic to clarify. This is a local follow-up draft, not a second opener or a confirmed meeting. Availability remains unknown.' },
      { id: 'assume', label: 'Record the Library meeting as agreed', effect: 'unsupported', next: null,
        explanation: '“Might work” is not a confirmation of place, time or cost. Alex’s feasible Library proposal still has no mutual agreement.' },
      close(),
    ],
  },
  'shared-refusal': {
    title: 'The boundary changes the route', prompt: 'A separate authored development supplies a clear refusal. Which action respects this record?',
    patch: { inbound: 'decline', boundary: 'declined' },
    arrivals: [{ speaker: 'G1 · fictional refusal', kind: 'boundary', text: 'I’ve thought about it. I’m not interested. Please don’t contact me again.' }],
    unknowns: ['The reason for the refusal. It is not needed to respect the boundary.'],
    choices: [close('shared-late'), { ...opener(true, ''), label: 'Try one more board-games opener' }],
  },
  'shared-late': {
    title: 'A late event tests the stop', prompt: 'This final fault-injection fixture adds a reply after closure. Does it reopen the record?',
    patch: { inbound: 'reply' },
    arrivals: [{ speaker: 'Late-event fixture', kind: 'incoming', text: 'A later message says: “The co-op game was fun.” The earlier refusal remains in the record.' }],
    unknowns: ['Why the late message arrived. This model does not interpret it as permission to reopen.'],
    choices: [
      { id: 'keep-closed', label: 'Keep the conversation closed', effect: 'observe', allowed: ['stop'], next: null,
        explanation: 'Closed stays closed. The terminal check runs before reply history or shared context. The late event supplies no reopening transition.' },
      { id: 'reopen', label: 'Reopen and send another message', effect: 'context', next: null,
        explanation: 'A late reply cannot override terminal closure.' },
    ],
  },
  'missing-open': {
    title: 'An empty field is not a shared hobby', prompt: 'U1’s card has no topic evidence. Which opener can Alex justify?',
    unknowns: ['The recipient’s hobbies.', 'Whether the recipient will reply or is available on Friday.'],
    choices: [opener(false, 'missing-wait'), { ...opener(true, ''), label: 'Assume they like board games too' }, invent],
  },
  'missing-wait': {
    title: 'No reply. No explanation.', prompt: 'The supplied observation log still contains no reply. Choose a defensible next action.',
    arrivals: [{ speaker: 'Observation log', kind: 'system', text: 'No reply is recorded. Delivery and read status are unknown.' }],
    unknowns: noReply, choices: waitingChoices(null),
  },
  'history-review': {
    title: 'The topic is present. The history is not.', prompt: 'The import has lost its boundary field. Is shared context enough to start an opener?',
    unknowns: ['Whether a prior refusal or closure exists in the missing record.'],
    choices: [
      { id: 'review', label: 'We don’t know yet — review the record', effect: 'observe', allowed: ['review'], next: 'history-refusal',
        explanation: 'The missing boundary is material routing evidence. Keep the case in review while the classroom fixture reveals the earlier record.' },
      opener(true, ''),
    ],
  },
  'history-refusal': {
    title: 'The recovered line changes everything', prompt: 'The earlier boundary is now supplied. Trace the tree again.',
    patch: { boundary: 'declined' },
    arrivals: [{ speaker: 'Recovered boundary record', kind: 'boundary', text: 'Earlier message: “Please don’t contact me again.”' }],
    unknowns: ['The reason for the earlier refusal. It is not required for the stop decision.'],
    choices: [close(), { ...opener(true, ''), label: 'Use the shared hobby anyway' }],
  },
};

export const currentScene = (state: DebuggerState) => {
  const scene = scenes[state.sceneId];
  if (!scene) throw new Error('Unknown conversation scene.');
  return scene;
};
export const inspectSnapshot = (state: DebuggerState) => routeMessage(state.snapshot);

export function startDebugger(caseId: string): DebuggerState {
  const scenario = debuggerCases.find(item => item.id === caseId);
  if (!scenario) throw new Error('Choose one of the three fictional cases.');
  const missing = caseId === 'missing';
  return {
    caseId, sceneId: scenario.first,
    snapshot: { closed: false, boundary: caseId === 'history' ? 'unknown' : 'clear', sent: false, inbound: 'none',
      recipient: { id: missing ? 'U1' : 'G1', topics: missing ? null : [{ topic: 'board-games', quote: 'I like board games.' }] } },
    messages: [
      { speaker: missing ? 'U1 · fictional profile' : 'G1 · fictional profile', kind: 'profile',
        text: missing ? 'No topic information is supplied.' : 'I like board games.' },
      { speaker: 'Routing record', kind: 'system', text: caseId === 'history'
        ? 'No opener is recorded. The boundary/history field is unknown.'
        : 'No opener is recorded. The supplied boundary field is clear; this does not establish interest or agreement.' },
    ], latest: null, history: [],
  };
}

function evidenceFor(state: DebuggerState, route: Route): Inspection['evidence'] {
  const facts: Inspection['evidence'] = [];
  const latest = (kind: Message['kind']) => state.messages.findLast(message => message.kind === kind);
  const quote = (message: Message | undefined) => { if (message) facts.push({ source: message.speaker, quote: message.text }); };
  if (route.action === 'stop') {
    quote(latest('boundary'));
    facts.push({ source: 'Current boundary record', quote: `Closed: ${state.snapshot.closed}. Boundary: ${state.snapshot.boundary}. The terminal rule has priority.` });
  } else if (route.action === 'review') {
    facts.push({ source: 'Routing record', quote: 'The boundary/history field is unknown. Shared context cannot fill that gap.' });
  } else if (route.action === 'pending') {
    quote(latest('outgoing'));
    facts.push({ source: 'Observation record', quote: 'One opener is recorded; no incoming reply is recorded.' });
    const observation = latest('system');
    if (observation?.speaker === 'Observation log') quote(observation);
  } else if (route.action === 'respond') {
    quote(latest('incoming'));
  } else {
    facts.push({ source: 'Alex’s fixed case', quote: 'Alex likes board games and terrible puns.' });
    quote(latest('profile'));
  }
  return facts;
}

export function chooseAction(input: DebuggerState, choiceId: string): DebuggerState {
  // A rendered decision is reviewed before another action, including double clicks.
  if (input.latest) return input;
  const scene = currentScene(input);
  const choice = scene.choices.find(item => item.id === choiceId);
  if (!choice) throw new Error('Choose an action offered in the current scene.');
  const state = structuredClone(input);
  const before = inspectSnapshot(state);
  let accepted = true;
  let explanation = choice.explanation;
  const allowed = choice.effect === 'context' ? ['draft-context']
    : choice.effect === 'plain' ? ['draft-context', 'draft-plain']
    : choice.effect === 'clarify' ? ['respond'] : choice.allowed;
  if (choice.effect === 'unsupported') accepted = false;
  else if (allowed && !allowed.includes(before.action)) {
    accepted = false;
    explanation = `Action held: ${before.reason}. The current route is “${stateLabels[before.action]}”. No message or state change is recorded.`;
  }
  if (accepted) {
    if (['context', 'plain'].includes(choice.effect)) {
      state.snapshot.sent = true;
      state.messages.push({ speaker: 'Alex · simulated opener', kind: 'outgoing', text: choice.text! });
    } else if (choice.effect === 'clarify') {
      state.messages.push({ speaker: 'Alex · local clarification draft', kind: 'draft', text: choice.text! });
    } else if (choice.effect === 'close') state.snapshot.closed = true;
  }
  const after = inspectSnapshot(state);
  const evidence = [...(['context', 'plain'].includes(choice.effect) ? evidenceFor(input, before) : []), ...evidenceFor(state, after)];
  state.latest = { choiceId, choice: choice.label, accepted, explanation, before, after,
    evidence: evidence.filter((item, index) => evidence.findIndex(other => other.source === item.source && other.quote === item.quote) === index),
    unknowns: [...scene.unknowns], next: accepted ? choice.next : null };
  state.history.push(structuredClone(state.latest));
  return state;
}

export function retryAction(input: DebuggerState): DebuggerState {
  if (!input.latest || input.latest.accepted) return input;
  return { ...structuredClone(input), latest: null };
}

export function advanceDebugger(input: DebuggerState): DebuggerState {
  if (!input.latest?.accepted || !input.latest.next) return input;
  const state = structuredClone(input);
  state.sceneId = input.latest.next;
  const scene = currentScene(state);
  // Scene reveals are authored observations, not responses caused by a choice.
  // No reveal may erase an explicit boundary or revive terminal closure.
  state.snapshot = { ...state.snapshot, ...scene.patch,
    closed: state.snapshot.closed || scene.patch?.closed === true,
    boundary: state.snapshot.boundary === 'declined' ? 'declined' : (scene.patch?.boundary ?? state.snapshot.boundary) };
  state.messages.push(...structuredClone(scene.arrivals ?? []));
  state.latest = null;
  return state;
}

export function exportTrace(state: DebuggerState) {
  return structuredClone({ version: 'romance-debugger-v1', fictional: true,
    scope: 'Authored classroom conversation. No real messages, people, predictions or emotion labels.',
    caseId: state.caseId, sceneId: state.sceneId, snapshot: state.snapshot, messages: state.messages, history: state.history });
}
