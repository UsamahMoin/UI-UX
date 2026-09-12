import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCsv, normalizeRows, filterNovaRange, rowsToCsv } from '../lib/nova-data.ts';

test('calendar filters sort dates and retain multiple records per day across month boundaries', () => {
  const rows = normalizeRows(parseCsv('Date,Account,Revenue\n2026-09-03,Latest,12\n2026-08-27,Old,99\n2026-08-28,Boundary,10\n2026-09-03,Same day,5\n2026-08-30,Middle,7'));
  const week = filterNovaRange(rows, 7);
  assert.deepEqual(week.map(r => r.account), ['Boundary', 'Middle', 'Latest', 'Same day']);
  assert.equal(week.reduce((sum, r) => sum + r.revenue, 0), 34);
  assert.equal(rows[0].account, 'Latest');
});
test('zero activation is measured and high risk; absent activation is unknown', () => {
  const rows = normalizeRows(parseCsv('Account,Revenue,Activation\nZero,0,0\nAbsent,100,'));
  assert.equal(rows[0].activation, 0); assert.equal(rows[0].risk, 'High');
  assert.equal(rows[1].activation, null); assert.equal(rows[1].risk, 'Unknown');
  assert.deepEqual(filterNovaRange(rows, 7), rows);
});
test('invalid imports fail visibly instead of silently creating zero revenue', () => {
  for (const csv of ['Account,Revenue\nA,nope', 'Account,Revenue\nA,', 'Account,Revenue,Activation\nA,1,101', 'Date,Account,Revenue\n2026-02-31,A,1', 'Account,Revenue\n,1']) assert.throws(() => normalizeRows(parseCsv(csv)));
  assert.throws(() => parseCsv('Account,Revenue\n"unfinished,12'));
});
test('quoted CSV round trips and spreadsheet formulas are neutralized on export', () => {
  const rows = normalizeRows(parseCsv('Account,Revenue,Owner\n"A, Inc",12,"Quoted ""name"""\n=HYPERLINK(),0,Owner'));
  const csv = rowsToCsv(rows);
  assert.match(csv, /'=HYPERLINK\(\)/);
  const decoded = normalizeRows(parseCsv(csv));
  assert.equal(decoded[0].account, 'A, Inc');
  assert.equal(decoded[0].owner, 'Quoted "name"');
  assert.equal(decoded[1].revenue, 0);
});
