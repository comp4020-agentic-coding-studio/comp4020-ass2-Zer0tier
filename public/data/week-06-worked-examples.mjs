// Save this file with week-06-cases.json, week-06-models.mjs and
// romance-models.mjs. Run: node week-06-worked-examples.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { routeMessage, replyRate, compareDrafts } from './week-06-models.mjs';
import { compareBios } from './romance-models.mjs';

const cases = JSON.parse(readFileSync(new URL('week-06-cases.json', import.meta.url), 'utf8'));
assert.equal(cases.version, 'week-06-v1');
const unique = rows => {
  assert(Array.isArray(rows));
  const ids = rows.map(row => row.id);
  assert(ids.every(id => typeof id === 'string' && id.length > 0));
  assert.equal(new Set(ids).size, ids.length, 'Duplicate fixture ID');
};
unique(cases.recipients);
unique(cases.routingCases);
unique(cases.replyCounts);
const recipients = new Map(cases.recipients.map(recipient => [recipient.id, recipient]));
const routes = cases.routingCases.map(row => {
  assert(recipients.has(row.snapshot.recipientId), 'Unknown recipient reference');
  const output = routeMessage({ ...row.snapshot, recipient: recipients.get(row.snapshot.recipientId) });
  assert.equal(output.action, row.expected, `Unexpected route for ${row.id}`);
  assert.equal(output.sendsMessage, false);
  return { id: row.id, ...output };
});
const rates = cases.replyCounts.map(row => ({ ...row, rate: replyRate(row.replies, row.exposures) }));
assert.deepEqual(rates.map(row => row.rate), [0.2, 0.4]);
const difference = rates[1].rate - rates[0].rate;
const ratio = rates[1].rate / rates[0].rate;
const sparseCheck = compareBios(2, 10, 4, 10);
assert.equal(sparseCheck.z, null);
const utility = [0.05, 0.1, 0.15, 0.25].map(costPerSecond => ({ costPerSecond,
  ...compareDrafts(cases.utilityOptions, 10, costPerSecond) }));
assert.deepEqual(utility.map(row => row.winners), [['games'], ['hey', 'games'], ['hey'], ['defer']]);
unique(cases.pressureCases);
const pressure = cases.pressureCases.map(row => {
  assert([row.answers, row.declines, row.none].every(n => Number.isSafeInteger(n) && n >= 0));
  const exposures = row.answers + row.declines + row.none;
  assert.equal(exposures, 10);
  assert.equal(typeof row.admissible, 'boolean');
  return { ...row, exposures, replies: row.answers + row.declines,
    replyRate: replyRate(row.answers + row.declines, exposures), answerRate: replyRate(row.answers, exposures) };
});
assert.deepEqual(pressure.map(row => [row.replyRate, row.answerRate]), [[0.4, 0.3], [0.6, 0.1]]);
const constrained = compareDrafts(pressure.map(row => ({ id: row.id, probability: row.replyRate, seconds: 10, admissible: row.admissible })));
assert.deepEqual(constrained.excluded, ['demand']);
assert.deepEqual(constrained.winners, ['optional']);
console.log(JSON.stringify({ scope: cases.scope, routes, rates, difference, ratio, sparseCheck, utility, pressure, constrained }, null, 2));
