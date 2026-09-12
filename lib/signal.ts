export const categories = ['Housing', 'Food', 'Transport', 'Shopping', 'Subscriptions', 'Health', 'Other'] as const;
export type Category = typeof categories[number];
export type Transaction = { id: string; name: string; amount: number; date: string; category: Category; accountId: string };
export type Account = { id: string; name: string; opening: number };
export type Goal = { id: string; name: string; target: number; saved: number };
export type Bill = { id: string; name: string; amount: number; date: string; category: Category; accountId: string; transactionId?: string };
export type SignalData = { version: 1; sample: boolean; accounts: Account[]; transactions: Transaction[]; goals: Goal[]; bills: Bill[]; budgets: Record<Category, number>; buffer: number };
export const money = (cents: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format((cents || 0) / 100);
export function dateKey(date = new Date()) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; }
export function shiftDate(date: string, days: number) { const value = new Date(`${date}T12:00:00`); value.setDate(value.getDate() + days); return dateKey(value); }
export function seedData(today = dateKey()): SignalData {
  return { version: 1, sample: true, accounts: [{ id: 'checking', name: 'Everyday checking', opening: 620000 }, { id: 'savings', name: 'Savings', opening: 1800000 }],
    transactions: [
      { id: 't1', name: 'Studio payroll', amount: 420000, date: shiftDate(today, -9), category: 'Other', accountId: 'checking' },
      { id: 't2', name: 'Monthly rent', amount: -185000, date: shiftDate(today, -8), category: 'Housing', accountId: 'checking' },
      { id: 't3', name: 'Whole Foods', amount: -8642, date: shiftDate(today, -5), category: 'Food', accountId: 'checking' },
      { id: 't4', name: 'Design tools', amount: -2400, date: shiftDate(today, -3), category: 'Subscriptions', accountId: 'checking' },
      { id: 't5', name: 'Neighborhood coffee', amount: -650, date: shiftDate(today, -1), category: 'Food', accountId: 'checking' },
      { id: 't6', name: 'Train pass', amount: -7500, date: today, category: 'Transport', accountId: 'checking' },
    ], goals: [{ id: 'g1', name: 'Lake house weekend', target: 200000, saved: 144000 }, { id: 'g2', name: 'Emergency fund', target: 1500000, saved: 1200000 }],
    bills: [{ id: 'b1', name: 'Studio rent', amount: 185000, date: shiftDate(today, 12), category: 'Housing', accountId: 'checking' }, { id: 'b2', name: 'Internet', amount: 6500, date: shiftDate(today, 3), category: 'Subscriptions', accountId: 'checking' }],
    budgets: { Housing: 200000, Food: 45000, Transport: 18000, Shopping: 25000, Subscriptions: 12000, Health: 15000, Other: 20000 }, buffer: 100000 };
}
export function blankData(): SignalData { return { ...seedData(), sample: false, accounts: [{ id: 'checking', name: 'Everyday checking', opening: 0 }], transactions: [], goals: [], bills: [], budgets: Object.fromEntries(categories.map(c => [c, 0])) as Record<Category, number>, buffer: 0 }; }
export const accountBalance = (data: SignalData, id: string, end = dateKey()) => (data.accounts.find(a => a.id === id)?.opening ?? 0) + data.transactions.filter(t => t.accountId === id && t.date <= end).reduce((sum, t) => sum + t.amount, 0);
export const totalBalance = (data: SignalData, end = dateKey()) => data.accounts.reduce((sum, a) => sum + accountBalance(data, a.id, end), 0);
export function summary(data: SignalData, today = dateKey()) {
  const month = data.transactions.filter(t => t.date.startsWith(today.slice(0, 7)) && t.date <= today);
  const income = month.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const spent = -month.filter(t => t.amount < 0).reduce((s, t) => s + t.amount, 0);
  const reserved = data.goals.reduce((s, g) => s + g.saved, 0);
  const upcoming = data.bills.filter(b => !b.transactionId && b.date <= shiftDate(today, 30)).reduce((s, b) => s + b.amount, 0);
  const balance = totalBalance(data, today);
  return { balance, income, spent, reserved, upcoming, available: balance - reserved - upcoming - data.buffer };
}
export function spending(data: SignalData, category: Category, today = dateKey()) { return -data.transactions.filter(t => t.amount < 0 && t.category === category && t.date.startsWith(today.slice(0, 7)) && t.date <= today).reduce((s, t) => s + t.amount, 0); }
export type BalancePeriod = 'Week' | 'Month' | 'Year';
export const balanceDays: Record<BalancePeriod, number> = { Week: 7, Month: 30, Year: 365 };

// All ranges are slices of this daily ledger, including the closing balance
// immediately before the requested days. No aggregation drops recent movement.
export function balanceSeries(data: SignalData, period: BalancePeriod, today = dateKey()) {
  const start = shiftDate(today, -balanceDays[period]);
  let balance = data.accounts.reduce((sum, a) => sum + a.opening, 0);
  const daily = new Map<string, number>();
  for (const t of data.transactions) {
    if (t.date < start) balance += t.amount;
    else daily.set(t.date, (daily.get(t.date) ?? 0) + t.amount);
  }
  return Array.from({ length: balanceDays[period] + 1 }, (_, i) => {
    const date = shiftDate(start, i);
    balance += daily.get(date) ?? 0;
    return { date, balance };
  });
}

export function balanceChartModel(data: SignalData, period: BalancePeriod, today = dateKey()) {
  const history = balanceSeries(data, 'Year', today);
  const points = history.slice(-(balanceDays[period] + 1));
  const low = Math.min(...history.map(point => point.balance));
  const high = Math.max(...history.map(point => point.balance));
  const padding = Math.max(100, Math.ceil((high - low) * 0.08));
  const change = points[points.length - 1].balance - points[0].balance;
  const zoomPeriod: BalancePeriod | null = period === 'Year' ? 'Month' : period === 'Month' ? 'Week' : null;
  return {
    points, days: balanceDays[period], change,
    trend: change > 0 ? 'up' : change < 0 ? 'down' : 'flat',
    // Preserve dollar positions between views; only the time axis zooms.
    scale: { min: low - padding, max: high + padding },
    zoom: zoomPeriod ? { period: zoomPeriod, days: balanceDays[zoomPeriod], startIndex: points.length - balanceDays[zoomPeriod] - 1 } : null,
  };
}
export function parseMoney(value: string, allowNegative = false) {
  if (!(allowNegative ? /^-?\d+(\.\d{1,2})?$/ : /^\d+(\.\d{1,2})?$/).test(value)) throw new Error('Enter an amount with at most two decimal places.');
  const result = Math.round(Number(value) * 100);
  if (!Number.isSafeInteger(result) || Math.abs(result) > 100000000000) throw new Error('Amount is too large.');
  return result;
}
export function validateData(value: unknown): value is SignalData {
  if (!value || typeof value !== 'object') return false;
  const d = value as SignalData;
  const cents = (n: unknown) => typeof n === 'number' && Number.isSafeInteger(n) && Math.abs(n) <= 100000000000;
  const positive = (n: unknown) => cents(n) && (n as number) >= 0;
  const name = (s: unknown) => typeof s === 'string' && s.trim().length > 0 && s.length <= 100;
  const validDate = (s: unknown) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s)) && new Date(s).toISOString().slice(0, 10) === s;
  const list = (a: unknown) => Array.isArray(a) && a.length <= 10000 && a.every(item => item && name(item.id)) && new Set(a.map(item => item.id)).size === a.length;
  if (d.version !== 1 || typeof d.sample !== 'boolean' || !list(d.accounts) || !d.accounts.length || !list(d.transactions) || !list(d.goals) || !list(d.bills) || !positive(d.buffer)) return false;
  if (!d.accounts.every(a => name(a.name) && cents(a.opening))) return false;
  const account = (id: string) => d.accounts.some(a => a.id === id);
  if (!d.transactions.every(t => name(t.name) && cents(t.amount) && t.amount !== 0 && validDate(t.date) && t.date <= dateKey() && categories.includes(t.category) && account(t.accountId))) return false;
  if (!d.goals.every(g => name(g.name) && positive(g.target) && g.target > 0 && positive(g.saved) && g.saved <= g.target)) return false;
  if (!d.bills.every(b => name(b.name) && positive(b.amount) && b.amount > 0 && validDate(b.date) && categories.includes(b.category) && account(b.accountId) && (!b.transactionId || d.transactions.some(t => t.id === b.transactionId && t.amount === -b.amount && t.accountId === b.accountId && t.category === b.category)))) return false;
  const paymentIds = d.bills.flatMap(b => b.transactionId ? [b.transactionId] : []);
  if (new Set(paymentIds).size !== paymentIds.length) return false;
  return !!d.budgets && categories.every(c => positive(d.budgets[c]));
}
