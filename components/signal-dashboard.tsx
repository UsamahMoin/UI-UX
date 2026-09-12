'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowDownLeft, ArrowUpRight, Check, ChevronRight, Download, Plus, Search, Settings2, Target, Trash2, Upload, Wallet, X, Pencil, Undo2 } from 'lucide-react';
import { accountBalance, balanceChartModel, blankData, categories, dateKey, money, parseMoney, seedData, spending, summary, validateData, type BalancePeriod, type Category, type SignalData, type Transaction } from '@/lib/signal';

const STORAGE_KEY = 'signal-money-v1';
type View = 'Overview' | 'Activity' | 'Plan' | 'Accounts';
type Editor = { kind: 'transaction' | 'goal' | 'bill' | 'account' | 'budget' | 'settings'; id?: string };
const friendlyDate = (date: string) => new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
function download(name: string, text: string, type: string) { const url = URL.createObjectURL(new Blob([text], { type })); const a = document.createElement('a'); a.href = url; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
function csvCell(value: string | number) { const text = String(value); return `"${(typeof value === 'string' && /^[=+\-@\t\r]/.test(text) ? "'" : '') + text.replaceAll('"', '""')}"`; }

export function SignalDashboard() {
  const [data, setData] = useState<SignalData | null>(null);
  const [view, setView] = useState<View>('Overview');
  const [period, setPeriod] = useState<'Week' | 'Month' | 'Year'>('Month');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [month, setMonth] = useState('');
  const [editor, setEditor] = useState<Editor | null>(null);
  const [message, setMessage] = useState('');
  const [storageError, setStorageError] = useState('');
  const [conflict, setConflict] = useState(false);
  const [undo, setUndo] = useState<SignalData | null>(null);
  const backupInput = useRef<HTMLInputElement>(null);
  const savedRaw = useRef<string | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      savedRaw.current = raw;
      if (raw) { const parsed: unknown = JSON.parse(raw); if (!validateData(parsed)) throw new Error(); setData(parsed); }
      else setData(seedData());
    } catch { setStorageError('Your saved data could not be opened. Download the saved file before replacing it, or restore a backup.'); }
    const onStorage = (event: StorageEvent) => { if (event.key === STORAGE_KEY || event.key === null) { setConflict(true); setEditor(null); } };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);
  function commit(next: SignalData, text: string, remember = true) {
    if (conflict) return;
    if (!validateData(next)) { setMessage('Unable to save these values. Please check the amounts and dates.'); return; }
    if (remember) setUndo(data);
    setData(next); setMessage(text);
    try { const raw = JSON.stringify(next); localStorage.setItem(STORAGE_KEY, raw); savedRaw.current = raw; setStorageError(''); }
    catch { setStorageError('Changes are only in this tab because browser storage is unavailable or full. Download a backup before leaving.'); }
  }
  function remove(kind: 'transactions' | 'goals' | 'bills', id: string) {
    if (!data) return;
    const next = { ...data, [kind]: data[kind].filter(item => item.id !== id) };
    if (kind === 'transactions') next.bills = data.bills.map(b => b.transactionId === id ? { ...b, transactionId: undefined } : b);
    commit(next, kind === 'bills' ? 'Bill reminder removed. Any recorded payment stays in Activity.' : 'Removed. You can undo this change.');
  }
  async function restore(file?: File) {
    if (!file || conflict) return;
    try { if (file.size > 5000000) throw new Error(); const parsed: unknown = JSON.parse(await file.text()); if (!validateData(parsed)) throw new Error(); if (window.confirm('Replace the data in this browser with this backup? You can undo this change.')) commit(parsed, 'Backup restored.'); }
    catch { setMessage('This is not a valid Signal backup. Choose a Signal JSON backup under 5 MB.'); }
    finally { if (backupInput.current) backupInput.current.value = ''; }
  }
  const restoreInput = <input ref={backupInput} type="file" accept="application/json,.json" hidden onChange={event => void restore(event.target.files?.[0])} />;
  if (!data) return <div className="signal-app signal-loading">{storageError ? <><h2>Let’s recover your data.</h2><p role="alert">{storageError}</p><div className="sg-actions"><button onClick={() => savedRaw.current && download('signal-recovery.json', savedRaw.current, 'application/json')}>Download saved file</button><button onClick={() => backupInput.current?.click()}>Restore backup</button><button onClick={() => { if (window.confirm('Replace the saved data with a blank tracker? Download the saved file first if you need it.')) commit(blankData(), 'Started a blank tracker.'); }}>Start fresh</button></div>{restoreInput}</> : <p>Opening your money overview…</p>}</div>;
  const today = dateKey();
  const totals = summary(data, today);
  const chart = balanceChartModel(data, period, today);
  const transactions = [...data.transactions].sort((a, b) => b.date.localeCompare(a.date));
  const visible = transactions.filter(t => (!query || `${t.name} ${t.category} ${data.accounts.find(a => a.id === t.accountId)?.name}`.toLowerCase().includes(query.toLowerCase())) && (filter === 'All' || filter === 'Income' && t.amount > 0 || filter === 'Expenses' && t.amount < 0 || t.category === filter) && (!month || t.date.startsWith(month)));
  const pending = [...data.bills].filter(b => !b.transactionId).sort((a, b) => a.date.localeCompare(b.date));
  const navigation = (next: View) => { setView(next); setMessage(''); };
  function exportCSV() { download(`signal-transactions-${today}.csv`, '\uFEFF' + [['Date', 'Description', 'Category', 'Account', 'Amount USD'], ...visible.map(t => [t.date, t.name, t.category, data!.accounts.find(a => a.id === t.accountId)?.name ?? '', t.amount / 100])].map(row => row.map(csvCell).join(',')).join('\r\n'), 'text/csv;charset=utf-8'); setMessage(`Exported ${visible.length} transactions.`); }
  const rows = (items: Transaction[]) => <div className="sg-transactions">{items.length ? items.map(t => <div className="sg-transaction" key={t.id}><span className={`sg-transaction-icon ${t.amount > 0 ? 'income' : ''}`}>{t.amount > 0 ? <ArrowDownLeft /> : <ArrowUpRight />}</span><div className="sg-transaction-name"><strong>{t.name}</strong><span>{t.category} · {data.accounts.find(a => a.id === t.accountId)?.name}</span></div><time dateTime={t.date}>{friendlyDate(t.date)}</time><b className={t.amount > 0 ? 'sg-positive' : ''}>{t.amount > 0 ? '+' : '−'}{money(Math.abs(t.amount))}</b><div className="sg-row-actions"><button aria-label={`Edit ${t.name}`} onClick={() => setEditor({ kind: 'transaction', id: t.id })}><Pencil /></button><button aria-label={`Delete ${t.name}`} onClick={() => remove('transactions', t.id)}><Trash2 /></button></div></div>) : <div className="sg-empty"><Search /><h3>{data.transactions.length ? 'No matching transactions' : 'Your first entry starts here'}</h3><p>{data.transactions.length ? 'Try another search or clear your filters.' : 'Set your opening balance in Accounts, then add income or an expense.'}</p>{data.transactions.length ? <button onClick={() => { setQuery(''); setFilter('All'); setMonth(''); }}>Clear filters</button> : <button onClick={() => setEditor({ kind: 'transaction' })}>Add transaction</button>}</div>}</div>;
  const goalCard = (g: SignalData['goals'][number]) => <article className="sg-goal" key={g.id}><div className="sg-card-heading"><Target /><span>{Math.round(g.saved / g.target * 100)}%</span></div><h3>{g.name}</h3><p><b>{money(g.saved)}</b> of {money(g.target)}</p><progress value={g.saved} max={g.target} aria-label={`${g.name} progress`} /><div className="sg-card-footer"><span>{g.saved === g.target ? 'Goal reached' : `${money(g.target - g.saved)} to go`}</span><button onClick={() => setEditor({ kind: 'goal', id: g.id })}>Manage <ChevronRight /></button></div></article>;
  return <div className="signal-app">
    <nav className="sg-nav" aria-label="Signal navigation"><a className="sg-brand" href="#signal-workspace" onClick={() => navigation('Overview')}>signal<span>●</span></a><div className="sg-nav-links">{(['Overview', 'Activity', 'Plan', 'Accounts'] as View[]).map(item => <button key={item} aria-current={view === item ? 'page' : undefined} onClick={() => navigation(item)}>{item}</button>)}</div><button className="sg-settings" aria-label="Data and settings" onClick={() => setEditor({ kind: 'settings' })}><Settings2 /></button></nav>
    <div className="sg-local-note"><span><i /> {data.sample ? 'Sample data · explore or start fresh' : 'Personal tracker'} · USD</span><span>Saved in this browser · no bank connection</span></div>
    {conflict && <div className="sg-warning" role="alert">Signal changed in another tab. Reload to use the latest saved data.<button onClick={() => window.location.reload()}>Reload data</button></div>}
    {storageError && <div className="sg-warning" role="alert">{storageError}<button onClick={() => download(`signal-backup-${today}.json`, JSON.stringify(data, null, 2), 'application/json')}>Download backup</button></div>}
    {message && <div className="sg-message" role="status"><Check /><span>{message}</span>{undo && <button onClick={() => { commit(undo, 'Change undone.', false); setUndo(null); }}><Undo2 /> Undo</button>}<button aria-label="Dismiss message" onClick={() => setMessage('')}><X /></button></div>}
    <fieldset className="sg-workspace" id="signal-workspace" disabled={conflict}>
      <div className="sg-page-title"><div><small>{new Date(`${today}T12:00:00`).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</small><h2>{view === 'Overview' ? 'A little clarity. A lot of calm.' : view === 'Activity' ? 'Every move, in one place.' : view === 'Plan' ? 'Make room for what matters.' : 'Your money, accounted for.'}</h2></div><button className="sg-primary" onClick={() => setEditor({ kind: 'transaction' })}><Plus /> Add transaction</button></div>
      {view === 'Overview' && <>
        <section className="sg-balance-layout"><div className="sg-balance-panel"><div className="sg-balance-heading"><div><small>TOTAL BALANCE</small><h3>{money(totals.balance)}</h3><p className={`sg-trend sg-trend-${chart.trend}`} aria-live="polite">{chart.trend === 'up' ? '↑ Up' : chart.trend === 'down' ? '↓ Down' : '— No change'}{chart.change !== 0 && ` ${money(Math.abs(chart.change))}`} over {chart.days} days</p></div><div className="sg-period" aria-label="Balance period">{(['Week', 'Month', 'Year'] as const).map(p => <button key={p} aria-pressed={p === period} onClick={() => setPeriod(p)}>{p}</button>)}</div></div><BalanceChart key={period} model={chart} period={period} onPeriodChange={setPeriod} /></div>
        <aside className="sg-available"><div><Wallet /><small>AVAILABLE AFTER RESERVES</small></div><strong>{money(totals.available)}</strong><p>{totals.available < 0 ? 'Your planned reserves exceed your balance.' : 'A clearer view of what’s unreserved.'}</p><dl><div><dt>Total balance</dt><dd>{money(totals.balance)}</dd></div><div><dt>Bills due within 30 days*</dt><dd>−{money(totals.upcoming)}</dd></div><div><dt>Set aside for goals</dt><dd>−{money(totals.reserved)}</dd></div><div><dt>Your buffer</dt><dd>−{money(data.buffer)}</dd></div></dl><small>*Includes overdue bills. Only reflects what you’ve entered.</small><button onClick={() => navigation('Plan')}>Adjust your plan <ChevronRight /></button></aside></section>
        <section className="sg-stats"><article><span><ArrowDownLeft /> Income this month</span><strong>{money(totals.income)}</strong></article><article><span><ArrowUpRight /> Spending this month</span><strong>{money(totals.spent)}</strong></article><article><span><Target /> Set aside for goals</span><strong>{money(totals.reserved)}</strong></article></section>
        <div className="sg-two-columns"><section className="sg-panel"><div className="sg-section-heading"><h3>Recent activity</h3><button onClick={() => navigation('Activity')}>View all <ChevronRight /></button></div>{rows(transactions.slice(0, 5))}</section><section className="sg-panel"><div className="sg-section-heading"><h3>Coming up</h3><button onClick={() => navigation('Plan')}>View plan <ChevronRight /></button></div>{pending.length ? pending.slice(0, 3).map(b => <button className="sg-upcoming" key={b.id} onClick={() => setEditor({ kind: 'bill', id: b.id })}><span className="sg-date-tile">{new Date(`${b.date}T12:00:00`).toLocaleDateString('en-US', { month: 'short' })}<b>{b.date.slice(-2)}</b></span><span><strong>{b.name}</strong><small>{b.date < today ? 'Overdue' : b.date === today ? 'Due today' : friendlyDate(b.date)}</small></span><b>{money(b.amount)}</b></button>) : <div className="sg-empty"><Check /><h3>Nothing coming up</h3><p>Add a bill to include it in your plan.</p><button onClick={() => setEditor({ kind: 'bill' })}>Add bill</button></div>}<div className="sg-goal-preview">{data.goals.slice(0, 1).map(goalCard)}</div></section></div>
      </>}
      {view === 'Activity' && <section className="sg-panel"><div className="sg-filters"><label className="sg-search"><Search /><input aria-label="Search transactions" placeholder="Search transactions…" value={query} onChange={e => setQuery(e.target.value)} /></label><label><span className="sr-only">Transaction type or category</span><select value={filter} onChange={e => setFilter(e.target.value)}>{['All', 'Income', 'Expenses', ...categories].map(c => <option key={c}>{c}</option>)}</select></label><label><span className="sr-only">Transaction month</span><input type="month" aria-label="Transaction month" value={month} onChange={e => setMonth(e.target.value)} /></label><button onClick={() => { setQuery(''); setFilter('All'); setMonth(''); }}>Clear</button><button onClick={exportCSV} disabled={!visible.length}><Download /> CSV</button></div><div className="sg-results"><span>{visible.length} transaction{visible.length === 1 ? '' : 's'}</span><span>Net: {money(visible.reduce((s, t) => s + t.amount, 0))}</span></div>{rows(visible)}</section>}
      {view === 'Plan' && <><section className="sg-panel"><div className="sg-section-heading"><div><h3>Monthly budgets</h3><p>Category limits compared with this month’s expenses.</p></div><button onClick={() => setEditor({ kind: 'budget' })}><Pencil /> Edit budgets</button></div><div className="sg-budget-grid">{categories.map(c => { const used = spending(data, c); const limit = data.budgets[c]; const over = used > limit && limit > 0; return <article key={c}><div><strong>{c}</strong><span>{limit ? `${Math.round(used / limit * 100)}%` : 'No limit set'}</span></div><progress className={over ? 'sg-over' : ''} value={Math.min(used, limit)} max={limit || 1} aria-label={`${c} budget used`} /><p><b>{money(used)}</b><span>{limit ? ` / ${money(limit)}` : ' spent'}</span></p>{limit > 0 && <small className={over ? 'sg-negative' : ''}>{money(Math.abs(limit - used))} {over ? 'over budget' : 'left'}</small>}</article>; })}</div></section>
        <section className="sg-section"><div className="sg-section-heading"><div><h3>Savings goals</h3><p>Set-asides reserve part of your balance; they don’t move money.</p></div><button onClick={() => setEditor({ kind: 'goal' })}><Plus /> New goal</button></div><div className="sg-goals">{data.goals.map(goalCard)}{!data.goals.length && <div className="sg-empty"><Target /><h3>Something to look forward to</h3><p>Add a goal and decide how much to set aside.</p></div>}</div></section>
        <section className="sg-panel"><div className="sg-section-heading"><div><h3>Bills & reminders</h3><p>Marking a bill paid records an expense. No payment is sent.</p></div><button onClick={() => setEditor({ kind: 'bill' })}><Plus /> Add bill</button></div><div className="sg-bills">{[...data.bills].sort((a, b) => Number(!!a.transactionId) - Number(!!b.transactionId) || a.date.localeCompare(b.date)).map(b => <div key={b.id} className="sg-bill"><div><strong>{b.name}</strong><span>{friendlyDate(b.date)} · {b.transactionId ? 'Paid' : b.date < today ? 'Overdue' : 'Upcoming'} · {data.accounts.find(a => a.id === b.accountId)?.name}</span></div><b>{money(b.amount)}</b>{!b.transactionId && <button onClick={() => { const id = crypto.randomUUID(); commit({ ...data, transactions: [...data.transactions, { id, name: b.name, amount: -b.amount, date: today, category: b.category, accountId: b.accountId }], bills: data.bills.map(item => item.id === b.id ? { ...item, transactionId: id } : item) }, 'Bill recorded as paid. No payment was sent.'); }}><Check /> Mark paid</button>}{!b.transactionId && <button aria-label={`Edit ${b.name} bill`} onClick={() => setEditor({ kind: 'bill', id: b.id })}><Pencil /></button>}<button aria-label={`Delete ${b.name} bill`} onClick={() => remove('bills', b.id)}><Trash2 /></button></div>)}{!data.bills.length && <p className="sg-muted">No bills yet. Add your next due date to get started.</p>}</div></section>
        <section className="sg-buffer"><div><h3>A little breathing room</h3><p>Your buffer reserves {money(data.buffer)} from available money.</p></div><button onClick={() => setEditor({ kind: 'settings' })}>Adjust buffer <ChevronRight /></button></section></>}
      {view === 'Accounts' && <><div className="sg-section-heading"><p>Manual balances. No account numbers or bank credentials needed.</p><button onClick={() => setEditor({ kind: 'account' })}><Plus /> Add account</button></div><div className="sg-accounts">{data.accounts.map(a => <article key={a.id}><Wallet /><h3>{a.name}</h3><strong>{money(accountBalance(data, a.id))}</strong><dl><div><dt>Opening balance</dt><dd>{money(a.opening)}</dd></div><div><dt>Recorded activity</dt><dd>{money(accountBalance(data, a.id) - a.opening)}</dd></div></dl><button onClick={() => setEditor({ kind: 'account', id: a.id })}>Edit account <Pencil /></button></article>)}</div><p className="sg-explainer">Use your balance before the first recorded transaction as the opening balance. Income and expenses update the total automatically. Goals are reserves within these accounts.</p></>}
    </fieldset>
    <footer className="sg-footer"><span>Money, clearly.</span><div><button onClick={() => download(`signal-backup-${today}.json`, JSON.stringify(data, null, 2), 'application/json')}><Download /> Backup</button><button disabled={conflict} onClick={() => backupInput.current?.click()}><Upload /> Restore</button></div></footer>{restoreInput}
    {editor && <EditorDialog data={data} editor={editor} close={() => setEditor(null)} save={(next, text) => { commit(next, text); setEditor(null); }} removeGoal={id => { remove('goals', id); setEditor(null); }} startFresh={() => { if (window.confirm('Clear the sample or personal data and start with an empty tracker? Download a backup first if needed.')) { commit(blankData(), 'Ready for your own numbers. Set your opening balance in Accounts.'); setEditor(null); setView('Accounts'); } }} backup={() => download(`signal-backup-${today}.json`, JSON.stringify(data, null, 2), 'application/json')} />}
  </div>;
}

function BalanceChart({ model, period, onPeriodChange }: { model: ReturnType<typeof balanceChartModel>; period: BalancePeriod; onPeriodChange: (period: BalancePeriod) => void }) {
  const { points, scale, zoom, trend } = model;
  const [selected, setSelected] = useState<number | null>(null);
  const selectedIndex = Math.min(selected ?? points.length - 1, points.length - 1);
  const x = (index: number) => 15 + index / (points.length - 1) * 770;
  const y = (balance: number) => 190 - (balance - scale.min) / (scale.max - scale.min) * 170;
  const path = points.map((point, i) => `${i ? 'L' : 'M'}${x(i)},${y(point.balance)}`).join(' ');
  const point = points[selectedIndex];
  const first = points[0];
  const last = points[points.length - 1];
  const fullDate = (date: string) => new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const axisMoney = (cents: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: scale.max - scale.min < 10000 ? 2 : 0 }).format((cents || 0) / 100);
  return <div className={`sg-chart sg-trend-${trend}`}>
    <div className="sg-chart-readout"><time dateTime={point.date}>{fullDate(point.date)}</time><b>{money(point.balance)}</b><small>Last {model.days} days</small></div>
    <div className="sg-chart-plot">
      <div className="sg-chart-axis" aria-label="Shared balance scale">{[scale.max, (scale.max + scale.min) / 2, scale.min].map((value, i) => <span key={i} title={money(Math.round(value))}>{axisMoney(value)}</span>)}</div>
      <svg viewBox="0 0 800 210" preserveAspectRatio="none" role="img" aria-label={`${period} balance from ${money(first.balance)} on ${fullDate(first.date)} to ${money(last.balance)} on ${fullDate(last.date)}. ${trend === 'flat' ? 'No change' : trend === 'up' ? 'Increased' : 'Decreased'} over ${model.days} days.`}
        onPointerMove={event => { const box = event.currentTarget.getBoundingClientRect(); const fraction = ((event.clientX - box.left) / box.width * 800 - 15) / 770; setSelected(Math.round(Math.max(0, Math.min(1, fraction)) * (points.length - 1))); }} onPointerLeave={() => setSelected(null)}>
        <defs><linearGradient id="signal-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="currentColor" stopOpacity=".18" /><stop offset="100%" stopColor="currentColor" stopOpacity="0" /></linearGradient></defs>
        {zoom && <rect className="sg-chart-window" x={x(zoom.startIndex)} y="10" width={785 - x(zoom.startIndex)} height="190" rx="3" />}
        {[20, 105, 190].map(v => <line key={v} x1="15" y1={v} x2="785" y2={v} stroke="#454039" strokeDasharray="3 6" />)}
        <path d={`${path} L785,200 L15,200Z`} fill="url(#signal-area)" />
        <path className="sg-balance-line" d={path} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <line x1={x(selectedIndex)} y1="10" x2={x(selectedIndex)} y2="200" stroke="#aaa098" strokeDasharray="4 5" />
        <circle cx={x(selectedIndex)} cy={y(point.balance)} r="4" fill="currentColor" />
      </svg>
    </div>
    <div className="sg-chart-controls"><input type="range" min="0" max={points.length - 1} value={selectedIndex} onChange={e => setSelected(Number(e.target.value))} aria-label="Explore daily balance" aria-valuetext={`${fullDate(point.date)}: ${money(point.balance)}`} />
      <div className="sg-chart-dates">{[0, Math.round((points.length - 1) / 2), points.length - 1].map(i => <time key={i} dateTime={points[i].date} title={fullDate(points[i].date)}>{period === 'Year' ? new Date(`${points[i].date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : friendlyDate(points[i].date)}</time>)}</div>
    </div>
    <div className="sg-chart-context"><span>Same dollar scale in all views.</span>{zoom && <button onClick={() => onPeriodChange(zoom.period)}><i /> Shaded: last {zoom.days} days <ChevronRight /></button>}</div>
    <p className="sg-chart-note">Daily balances from your recorded transactions. {zoom ? 'Zoom into the shaded area to follow the same pattern.' : 'This is the final 7-day segment of Month and Year.'}</p>
  </div>;
}

function EditorDialog({ data, editor, close, save, removeGoal, startFresh, backup }: { data: SignalData; editor: Editor; close: () => void; save: (next: SignalData, text: string) => void; removeGoal: (id: string) => void; startFresh: () => void; backup: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [error, setError] = useState('');
  const transaction = data.transactions.find(t => t.id === editor.id);
  const goal = data.goals.find(g => g.id === editor.id);
  const bill = data.bills.find(b => b.id === editor.id);
  const account = data.accounts.find(a => a.id === editor.id);
  const item = editor.kind === 'transaction' ? transaction : editor.kind === 'goal' ? goal : editor.kind === 'bill' ? bill : account;
  const [direction, setDirection] = useState(transaction && transaction.amount > 0 ? 'income' : 'expense');
  useEffect(() => { const previous = document.activeElement as HTMLElement | null; dialog.current?.showModal(); return () => previous?.focus(); }, []);
  const title = editor.kind === 'settings' ? 'Data & settings' : editor.kind === 'budget' ? 'Monthly budgets' : `${editor.id ? 'Edit' : 'Add'} ${editor.kind}`;
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError('');
    const form = new FormData(event.currentTarget);
    const str = (key: string) => String(form.get(key) ?? '').trim();
    const cents = (key: string, negative = false) => parseMoney(str(key), negative);
    const id = editor.id ?? crypto.randomUUID();
    const upsert = <T extends { id: string }>(items: T[], next: T) => editor.id ? items.map(old => old.id === id ? next : old) : [...items, next];
    try {
      let next = { ...data };
      if (['transaction', 'goal', 'bill', 'account'].includes(editor.kind) && !str('name')) throw new Error('Enter a name.');
      if (editor.kind === 'transaction' || editor.kind === 'bill') {
        const amount = cents('amount'); if (amount <= 0) throw new Error('Amount must be greater than zero.');
        const date = str('date'); if (!date || (editor.kind === 'transaction' && date > dateKey())) throw new Error('Use today or an earlier date for transactions. Add future expenses as bills.');
        const base = { id, name: str('name'), date, category: str('category') as Category, accountId: str('accountId') };
        if (editor.kind === 'transaction') {
          next.transactions = upsert(data.transactions, { ...base, amount: amount * (direction === 'income' ? 1 : -1) });
          if (data.bills.some(b => b.transactionId === id)) { if (direction === 'income') throw new Error('A bill payment must be an expense.'); next.bills = data.bills.map(b => b.transactionId === id ? { ...b, name: base.name, amount, category: base.category, accountId: base.accountId } : b); }
        } else next.bills = upsert(data.bills, { ...base, amount });
      }
      if (editor.kind === 'goal') { const target = cents('target'); const saved = cents('saved'); if (target <= 0 || saved > target) throw new Error('Target must be positive and at least as much as the set-aside.'); next.goals = upsert(data.goals, { id, name: str('name'), target, saved }); }
      if (editor.kind === 'account') next.accounts = upsert(data.accounts, { id, name: str('name'), opening: cents('opening', true) });
      if (editor.kind === 'budget') next.budgets = Object.fromEntries(categories.map(c => [c, cents(c)])) as Record<Category, number>;
      if (editor.kind === 'settings') next.buffer = cents('buffer');
      if (!validateData(next)) throw new Error('Check the entered dates and amounts.');
      save(next, editor.kind === 'settings' ? 'Buffer updated.' : editor.kind === 'budget' ? 'Monthly budgets updated.' : `${editor.kind[0].toUpperCase() + editor.kind.slice(1)} saved.`);
    } catch (e) { setError(e instanceof Error ? e.message : 'Please check your entries.'); }
  }
  const field = (label: string, children: ReactNode) => <label className="sg-field"><span>{label}</span>{children}</label>;
  const amountInput = (name: string, value = 0, min = 0) => <input name={name} type="number" step="0.01" min={min} max="1000000000" defaultValue={(value / 100).toFixed(2)} required inputMode="decimal" />;
  return <dialog ref={dialog} className="sg-dialog" aria-labelledby="sg-dialog-title" onCancel={close} onClick={e => { if (e.target === e.currentTarget) close(); }}><div><header><h2 id="sg-dialog-title">{title}</h2><button onClick={close} aria-label="Close dialog"><X /></button></header><form onSubmit={submit}>
    {['transaction', 'goal', 'bill', 'account'].includes(editor.kind) && field(editor.kind === 'transaction' ? 'Description' : 'Name', <input name="name" maxLength={100} defaultValue={item?.name ?? ''} required autoFocus placeholder={editor.kind === 'transaction' ? 'e.g. Groceries' : undefined} />)}
    {editor.kind === 'transaction' && field('Type', <select value={direction} onChange={e => setDirection(e.target.value)}><option value="expense">Expense</option><option value="income">Income</option></select>)}
    {(editor.kind === 'transaction' || editor.kind === 'bill') && <><div className="sg-form-grid">{field('Amount (USD)', amountInput('amount', Math.abs(transaction?.amount ?? bill?.amount ?? 0), 0.01))}{field(editor.kind === 'bill' ? 'Due date' : 'Date', <input name="date" type="date" defaultValue={transaction?.date ?? bill?.date ?? dateKey()} max={editor.kind === 'transaction' ? dateKey() : undefined} required />)}</div><div className="sg-form-grid">{field('Category', <select name="category" defaultValue={transaction?.category ?? bill?.category ?? 'Other'}>{categories.map(c => <option key={c}>{c}</option>)}</select>)}{field('Account', <select name="accountId" defaultValue={transaction?.accountId ?? bill?.accountId ?? data.accounts[0].id}>{data.accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}</select>)}</div>{editor.kind === 'bill' && <p className="sg-form-note">A one-time reminder. Nothing is charged or sent. Mark it paid when you’ve made the payment.</p>}</>}
    {editor.kind === 'goal' && <><div className="sg-form-grid">{field('Target (USD)', amountInput('target', goal?.target, 0.01))}{field('Set aside (USD)', amountInput('saved', goal?.saved))}</div><p className="sg-form-note">This reserves money in your plan. Your total account balance stays the same.</p>{goal && <button type="button" className="sg-delete" onClick={() => removeGoal(goal.id)}><Trash2 /> Delete goal & release reserve</button>}</>}
    {editor.kind === 'account' && <>{field('Opening balance (USD)', amountInput('opening', account?.opening, -1000000000))}<p className="sg-form-note">Balance before your first recorded transaction. A negative amount represents money owed.</p>{account && <><button type="button" className="sg-delete" disabled={data.accounts.length === 1 || data.transactions.some(t => t.accountId === account.id) || data.bills.some(b => b.accountId === account.id)} onClick={() => save({ ...data, accounts: data.accounts.filter(a => a.id !== account.id) }, 'Account removed. You can undo this change.')}><Trash2 /> Delete account</button><p className="sg-form-note">Keep at least one account. Move or remove linked transactions and bills before deleting an account.</p></>}</>}
    {editor.kind === 'budget' && <><p className="sg-form-note">These limits repeat each month. Use 0 for no limit.</p><div className="sg-form-grid">{categories.map(c => <div key={c}>{field(`${c} (USD)`, amountInput(c, data.budgets[c]))}</div>)}</div></>}
    {editor.kind === 'settings' && <>{field('Buffer (USD)', amountInput('buffer', data.buffer))}<p className="sg-form-note">Keep this much unallocated for everyday surprises.</p><section className="sg-data-settings"><h3>Your data</h3><p>Stored only in this browser on this device. Back up before clearing browser data or switching devices. No bank connection or payments.</p><button type="button" onClick={backup}><Download /> Download backup</button><button type="button" onClick={startFresh}>Start with my own data</button></section></>}
    {error && <p className="sg-form-error" role="alert">{error}</p>}<footer><button type="button" onClick={close}>Cancel</button><button className="sg-primary" type="submit">Save {editor.kind === 'settings' ? 'buffer' : editor.kind === 'budget' ? 'budgets' : editor.kind}</button></footer>
  </form></div></dialog>;
}
