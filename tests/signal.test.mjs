import test from 'node:test';
import assert from 'node:assert/strict';
import { seedData, blankData, summary, spending, balanceSeries, balanceChartModel, totalBalance, parseMoney, validateData, shiftDate } from '../lib/signal.ts';
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
test('nested daily charts preserve identical dates, balances, and dollar scales at calendar boundaries', () => {
  for (const end of ['2026-09-12', '2026-09-01', '2026-01-02', '2024-03-01', '2026-03-09', '2026-11-02']) {
    const d = seedData(end);
    const year = balanceChartModel(d, 'Year', end);
    const month = balanceChartModel(d, 'Month', end);
    const week = balanceChartModel(d, 'Week', end);
    assert.equal(year.points.length, 366);
    assert.equal(month.points.length, 31);
    assert.equal(week.points.length, 8);
    assert.deepEqual(year.points.slice(-31), month.points);
    assert.deepEqual(month.points.slice(-8), week.points);
    assert.deepEqual(year.scale, month.scale);
    assert.deepEqual(month.scale, week.scale);
    for (const point of year.points) assert.equal(point.balance, totalBalance(d, point.date));
    assert.deepEqual(year.points.slice(year.zoom.startIndex), month.points);
    assert.deepEqual(month.points.slice(month.zoom.startIndex), week.points);
    assert.equal(week.zoom, null);
  }
});
test('trend and headline use each selected window while the final balance agrees', () => {
  const d = seedData(today);
  const week = balanceChartModel(d, 'Week', today);
  const month = balanceChartModel(d, 'Month', today);
  const year = balanceChartModel(d, 'Year', today);
  assert.equal(week.change, -19192);
  assert.equal(week.trend, 'down');
  assert.equal(month.change, 215808);
  assert.equal(month.trend, 'up');
  assert.equal(year.change, month.change);
  assert.equal(year.trend, 'up');
  assert.equal(year.points.at(-1).balance, summary(d, today).balance);
  const neutral = balanceChartModel(blankData(), 'Week', today);
  assert.equal(neutral.change, 0);
  assert.equal(neutral.trend, 'flat');
  assert.ok(neutral.scale.max > neutral.scale.min);
});
test('daily history retains income and expenses across the first and final days of each window', () => {
  const d = blankData();
  d.accounts[0].opening = 100000;
  d.transactions = [
    { id: 'older', name: 'Older income', amount: 20000, date: shiftDate(today, -400), category: 'Other', accountId: 'checking' },
    { id: 'first', name: 'First day expense', amount: -1000, date: shiftDate(today, -6), category: 'Other', accountId: 'checking' },
    { id: 'last', name: 'Today income', amount: 4000, date: today, category: 'Other', accountId: 'checking' },
  ];
  const week = balanceSeries(d, 'Week', today);
  assert.equal(week[0].balance, 120000);
  assert.equal(week[1].balance, 119000);
  assert.equal(week.at(-1).balance, 123000);
  assert.equal(balanceChartModel(d, 'Week', today).change, 3000);
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

test('bill links must be unique matching expenses, never unrelated income or payments', () => {
  for (const mutate of [
    d => { d.bills[0].transactionId = 't1'; },
    d => { d.bills[0].transactionId = 't3'; },
    d => { d.bills[0].transactionId = 't2'; d.bills[0].accountId = 'savings'; },
    d => { d.bills[0].transactionId = 't2'; d.bills[0].category = 'Other'; },
    d => { d.bills[0].transactionId = 't2'; d.bills.push({ ...d.bills[0], id: 'duplicate-payment' }); },
  ]) { const d = seedData(today); mutate(d); assert.equal(validateData(d), false); }
});
