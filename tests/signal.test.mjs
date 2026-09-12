import test from 'node:test';
import assert from 'node:assert/strict';
import { seedData, blankData, summary, spending, balanceSeries, parseMoney, validateData, shiftDate } from '../lib/signal.ts';
const today = '2026-09-11';
test('income, spending, bill obligations, goal reserves, and buffer reconcile in cents', () => {
  const d = seedData(today);
  assert.equal(validateData(d), true);
  assert.deepEqual(summary(d, today), { balance: 2635808, income: 420000, spent: 204192, reserved: 1344000, upcoming: 191500, available: 1000308 });
  d.transactions.push({ id: 'extra', name: 'Lunch', amount: -1234, date: today, category: 'Food', accountId: 'checking' });
  assert.equal(summary(d, today).balance, 2634574);
  assert.equal(spending(d, 'Food', today), 10526);
});
test('paying a due bill releases its reserve while recording exactly one expense', () => {
  const d = seedData(today); const before = summary(d, today); const bill = d.bills[0];
  d.transactions.push({ id: 'payment', name: bill.name, amount: -bill.amount, date: today, category: bill.category, accountId: bill.accountId }); bill.transactionId = 'payment';
  assert.equal(summary(d, today).balance, before.balance - bill.amount);
  assert.equal(summary(d, today).available, before.available);
  assert.equal(validateData(d), true);
});
test('overdue bills count, distant bills do not; prior-month spending stays out of budgets', () => {
  const d = seedData(today); d.bills[0].date = shiftDate(today, 31); d.bills[1].date = shiftDate(today, -40);
  assert.equal(summary(d, today).upcoming, 6500);
  d.transactions.push({ id: 'prior', name: 'Prior groceries', amount: -10000, date: '2026-08-31', category: 'Food', accountId: 'checking' });
  assert.equal(spending(d, 'Food', today), 9292);
});
test('chart periods use actual ledger history, including leap years and a single-day month', () => {
  const d = seedData(today);
  assert.equal(balanceSeries(d, 'Week', today).length, 7);
  assert.equal(balanceSeries(d, 'Month', today).length, 11);
  assert.equal(balanceSeries(d, 'Year', today).at(-1).balance, summary(d, today).balance);
  assert.equal(balanceSeries(blankData(), 'Year', '2024-03-01').length, 61);
  assert.equal(balanceSeries(blankData(), 'Month', '2026-09-01').length, 1);
});
test('rejects corrupt backups, duplicate ids, broken links, impossible dates, and invalid amounts', () => {
  assert.equal(validateData(blankData()), true);
  for (const value of [null, {}, { version: 1 }, { ...seedData(today), accounts: [] }]) assert.equal(validateData(value), false);
  const invalid = [
    d => d.transactions.push(d.transactions[0]), d => d.transactions[0].amount = Infinity,
    d => d.transactions[0].accountId = 'missing', d => d.transactions[0].date = '2026-02-31',
    d => d.goals[0].saved = d.goals[0].target + 1, d => d.budgets.Food = -1,
    d => d.bills[0].transactionId = 'missing', d => d.transactions[0].amount = 0,
  ];
  for (const mutate of invalid) { const d = seedData(today); mutate(d); assert.equal(validateData(d), false); }
  assert.equal(parseMoney('0.29'), 29); assert.equal(parseMoney('-12.34', true), -1234);
  for (const value of ['1.234', '-1', 'Infinity', '1e4', '', '1000000001']) assert.throws(() => parseMoney(value));
});
