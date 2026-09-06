'use client';

import { useMemo, useRef, useState, type ChangeEvent } from 'react';
import readXlsxFile from 'read-excel-file/browser';
import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BarChart3,
  Bell,
  Box,
  Download,
  FileSpreadsheet,
  Gauge,
  Upload,
  Users,
  X,
} from 'lucide-react';

type NovaRow = {
  date: string;
  account: string;
  owner: string;
  revenue: number;
  activation: number;
  risk: 'Low' | 'Medium' | 'High';
  status: 'Active' | 'At risk' | 'Renewed';
};

type NovaView = 'overview' | 'revenue' | 'accounts' | 'data';
type Cell = string | number | boolean | Date | null | undefined;

const sampleRows: NovaRow[] = [
  { date: '2026-08-28', account: 'Northstar', owner: 'Maya Chen', revenue: 48000, activation: 82, risk: 'Low', status: 'Renewed' },
  { date: '2026-08-29', account: 'Arcwell', owner: 'Jon Bell', revenue: 32500, activation: 71, risk: 'Low', status: 'Active' },
  { date: '2026-08-30', account: 'Lattice Labs', owner: 'Maya Chen', revenue: 41500, activation: 64, risk: 'Medium', status: 'Active' },
  { date: '2026-08-31', account: 'Canopy', owner: 'Ari Stone', revenue: 28500, activation: 49, risk: 'High', status: 'At risk' },
  { date: '2026-09-01', account: 'Orbit Health', owner: 'Jon Bell', revenue: 39200, activation: 76, risk: 'Low', status: 'Active' },
  { date: '2026-09-02', account: 'Kindred', owner: 'Ari Stone', revenue: 35400, activation: 58, risk: 'Medium', status: 'Active' },
  { date: '2026-09-03', account: 'Wavelength', owner: 'Maya Chen', revenue: 51750, activation: 88, risk: 'Low', status: 'Active' },
  { date: '2026-09-04', account: 'Daybreak', owner: 'Jon Bell', revenue: 27600, activation: 42, risk: 'High', status: 'At risk' },
  { date: '2026-09-05', account: 'Foundry', owner: 'Ari Stone', revenue: 44800, activation: 69, risk: 'Medium', status: 'Active' },
  { date: '2026-09-06', account: 'Linear Works', owner: 'Maya Chen', revenue: 46200, activation: 79, risk: 'Low', status: 'Active' },
  { date: '2026-09-07', account: 'Hearthside', owner: 'Jon Bell', revenue: 31200, activation: 45, risk: 'High', status: 'At risk' },
  { date: '2026-09-08', account: 'Relay', owner: 'Ari Stone', revenue: 42400, activation: 73, risk: 'Low', status: 'Active' },
];

const navItems = [
  { id: 'overview' as const, label: 'Overview', icon: Gauge },
  { id: 'revenue' as const, label: 'Revenue', icon: BarChart3 },
  { id: 'accounts' as const, label: 'Accounts', icon: Users },
  { id: 'data' as const, label: 'Data connections', icon: Box },
];

function parseCsv(text: string): string[][] {
  const rows: string[][] = [[]];
  let cell = '';
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const next = text[index + 1];
    if (character === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === ',' && !quoted) {
      rows.at(-1)?.push(cell.trim());
      cell = '';
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && next === '\n') index += 1;
      rows.at(-1)?.push(cell.trim());
      cell = '';
      rows.push([]);
    } else {
      cell += character;
    }
  }

  rows.at(-1)?.push(cell.trim());
  return rows.filter(row => row.some(value => value !== ''));
}

function toNumber(value: Cell): number {
  if (typeof value === 'number') return value;
  const parsed = Number(String(value ?? '').replace(/[$,%\s]/g, '').replace(/,/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeRows(rows: Cell[][]): NovaRow[] {
  if (rows.length < 2) throw new Error('The file needs a header row and at least one data row.');
  const headers = rows[0].map(value => String(value ?? '').trim().toLowerCase().replace(/[^a-z0-9]/g, ''));
  const indexOf = (...names: string[]) => headers.findIndex(header => names.includes(header));
  const indexes = {
    date: indexOf('date', 'day'),
    account: indexOf('account', 'company', 'customer', 'name'),
    owner: indexOf('owner', 'manager', 'rep'),
    revenue: indexOf('revenue', 'arr', 'amount', 'value'),
    activation: indexOf('activation', 'usage', 'adoption', 'score'),
    risk: indexOf('risk', 'risklevel'),
    status: indexOf('status', 'stage'),
  };

  if (indexes.account < 0 || indexes.revenue < 0) {
    throw new Error('Include at least Account and Revenue columns. Date, Owner, Activation, Risk, and Status are optional.');
  }

  return rows.slice(1).filter(row => row.some(value => value !== null && value !== '')).map((row, rowIndex) => {
    const activation = indexes.activation >= 0 ? toNumber(row[indexes.activation]) : 0;
    const rawStatus = indexes.status >= 0 ? String(row[indexes.status] ?? '').toLowerCase() : '';
    const rawRisk = indexes.risk >= 0 ? String(row[indexes.risk] ?? '').toLowerCase() : '';
    const risk: NovaRow['risk'] = rawRisk.includes('high') || rawStatus.includes('risk') || (activation > 0 && activation < 50)
      ? 'High'
      : rawRisk.includes('medium') || (activation > 0 && activation < 70) ? 'Medium' : 'Low';
    const status: NovaRow['status'] = rawStatus.includes('renew') ? 'Renewed' : rawStatus.includes('risk') ? 'At risk' : 'Active';
    const rawDate = indexes.date >= 0 ? row[indexes.date] : '';
    const date = rawDate instanceof Date ? rawDate.toISOString().slice(0, 10) : String(rawDate || `Row ${rowIndex + 1}`);

    return {
      date,
      account: String(row[indexes.account] || `Account ${rowIndex + 1}`),
      owner: indexes.owner >= 0 ? String(row[indexes.owner] || 'Unassigned') : 'Unassigned',
      revenue: toNumber(row[indexes.revenue]),
      activation,
      risk,
      status,
    };
  });
}

function rowsToCsv(rows: NovaRow[]) {
  const escape = (value: string | number) => `"${String(value).replaceAll('"', '""')}"`;
  return [
    ['Date', 'Account', 'Owner', 'Revenue', 'Activation', 'Risk', 'Status'].join(','),
    ...rows.map(row => [row.date, row.account, row.owner, row.revenue, row.activation, row.risk, row.status].map(escape).join(',')),
  ].join('\n');
}

function downloadCsv(rows: NovaRow[], filename: string) {
  const url = URL.createObjectURL(new Blob([rowsToCsv(rows)], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function DataTable({ rows, caption }: { rows: NovaRow[]; caption: string }) {
  return (
    <div className="nova-table-wrap">
      <table className="nova-table">
        <caption>{caption}</caption>
        <thead><tr><th scope="col">Account</th><th scope="col">Owner</th><th scope="col">Revenue</th><th scope="col">Activation</th><th scope="col">Risk</th><th scope="col">Status</th></tr></thead>
        <tbody>{rows.map((row, index) => <tr key={`${row.account}-${index}`}><th scope="row">{row.account}</th><td>{row.owner}</td><td>${row.revenue.toLocaleString()}</td><td>{row.activation ? `${row.activation}%` : '—'}</td><td><span className={`risk-badge risk-${row.risk.toLowerCase()}`}>{row.risk}</span></td><td>{row.status}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

export function NovaDashboard() {
  const [view, setView] = useState<NovaView>('overview');
  const [range, setRange] = useState('30 days');
  const [rows, setRows] = useState(sampleRows);
  const [source, setSource] = useState('Built-in sample data');
  const [message, setMessage] = useState('Upload a CSV or Excel workbook to replace the sample data.');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [atRiskOnly, setAtRiskOnly] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const visibleRows = useMemo(() => rows.slice(-(range === '7 days' ? 7 : range === '30 days' ? 30 : 90)), [range, rows]);
  const revenue = visibleRows.reduce((sum, row) => sum + row.revenue, 0);
  const activationRows = visibleRows.filter(row => row.activation > 0);
  const activation = activationRows.length ? activationRows.reduce((sum, row) => sum + row.activation, 0) / activationRows.length : 0;
  const atRisk = visibleRows.filter(row => row.risk === 'High' || row.status === 'At risk');
  const maxRevenue = Math.max(...visibleRows.map(row => row.revenue), 1);
  const accountRows = atRiskOnly ? rows.filter(row => row.risk === 'High' || row.status === 'At risk') : rows;

  async function importFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setMessage(`Reading ${file.name}…`);
    try {
      const rawRows: Cell[][] = file.name.toLowerCase().endsWith('.csv')
        ? parseCsv(await file.text())
        : await readXlsxFile(file) as unknown as Cell[][];
      const imported = normalizeRows(rawRows);
      if (!imported.length) throw new Error('No usable data rows were found.');
      setRows(imported);
      setSource(file.name);
      setMessage(`${imported.length} rows connected from ${file.name}.`);
      setView('overview');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'This file could not be read.');
    } finally {
      event.target.value = '';
    }
  }

  function reviewSignals() {
    setAtRiskOnly(true);
    setView('accounts');
  }

  return (
    <div className="demo nova-demo">
      <aside className="nova-side">
        <b>N.</b>
        <nav aria-label="NOVA dashboard sections">{navItems.map(item => { const Icon = item.icon; return <button key={item.id} className={view === item.id ? 'active' : ''} onClick={() => setView(item.id)} aria-label={item.label} aria-current={view === item.id ? 'page' : undefined}><Icon /></button>; })}</nav>
        <div className="avatar" title="Signed in as Sam Kim">SK</div>
      </aside>

      <section className="nova-main">
        <header>
          <div><small>MONDAY, SEPTEMBER 8</small><h2>{view === 'overview' ? 'Good morning, Sam.' : navItems.find(item => item.id === view)?.label}</h2><p className="nova-source">Source: {source}</p></div>
          <div className="nova-header-actions">
            <input ref={inputRef} hidden type="file" accept=".csv,.xlsx" onChange={importFile} />
            <button className="nova-action-button" onClick={() => inputRef.current?.click()}><Upload /> Connect data</button>
            <button className="nova-action-button" onClick={() => downloadCsv(rows, 'nova-dashboard-data.csv')}><Download /> Export CSV</button>
            <button className="nova-bell" onClick={() => setNotificationsOpen(open => !open)} aria-label="Notifications" aria-expanded={notificationsOpen}><Bell /><i /></button>
          </div>
          {notificationsOpen && <div className="nova-notifications" aria-live="polite"><button onClick={() => setNotificationsOpen(false)} aria-label="Close notifications"><X /></button><strong>{atRisk.length} accounts need attention</strong><p>{atRisk.length ? atRisk.map(row => row.account).join(', ') : 'No accounts'} {atRisk.length === 1 ? 'has' : 'have'} high risk signals.</p></div>}
        </header>

        <output className="nova-message" aria-live="polite">{message}</output>

        {view === 'overview' && <>
          <div className="nova-metrics">
            <article><span>Pipeline</span><strong>${(revenue / 1000).toFixed(0)}K</strong><em><ArrowUp /> Live data</em></article>
            <article><span>Activation</span><strong>{activation ? `${activation.toFixed(1)}%` : '—'}</strong><em><ArrowUp /> Average</em></article>
            <article><span>At risk</span><strong>{String(atRisk.length).padStart(2, '0')}</strong><em className="down"><ArrowDown /> Review</em></article>
          </div>
          <div className="nova-grid">
            <article className="nova-chart">
              <div className="panel-title"><div><small>REVENUE VELOCITY</small><strong>${revenue.toLocaleString()}</strong></div><fieldset className="range-tabs" aria-label="Revenue date range">{['7 days', '30 days', 'Quarter'].map(item => <button key={item} className={range === item ? 'active' : ''} onClick={() => setRange(item)} aria-pressed={range === item}>{item}</button>)}</fieldset></div>
              <figure className="bar-chart" aria-label={`Revenue chart for ${range}`}>{visibleRows.map((row, index) => <span key={`${row.account}-${index}`} style={{ height: `${Math.max(12, row.revenue / maxRevenue * 100)}%` }} title={`${row.account}: $${row.revenue.toLocaleString()}`}><i /></span>)}</figure>
              <div className="chart-labels"><span>{visibleRows[0]?.date || 'Start'}</span><span>{range}</span><span>{visibleRows.at(-1)?.date || 'Now'}</span></div>
            </article>
            <article className="nova-focus"><small>TODAY’S FOCUS</small><div className="score"><span>{Math.max(0, 100 - atRisk.length * 6)}</span><i>Momentum</i></div><p>{atRisk.length} account{atRisk.length === 1 ? '' : 's'} need attention before 2:00 PM.</p><button onClick={reviewSignals}>Review signals <ArrowRight /></button></article>
          </div>
          <div className="activity-row"><div><Activity /><span><b>{rows.at(-1)?.account || 'Data'} updated</b><small>{rows.at(-1)?.status || 'Connected'} · ${(rows.at(-1)?.revenue || 0).toLocaleString()}</small></span></div><span>Latest record</span></div>
        </>}

        {view === 'revenue' && <section className="nova-view-panel"><div className="nova-view-heading"><div><small>REVENUE DETAILS</small><h3>${revenue.toLocaleString()} in the selected range</h3></div><fieldset className="range-tabs" aria-label="Revenue date range">{['7 days', '30 days', 'Quarter'].map(item => <button key={item} className={range === item ? 'active' : ''} onClick={() => setRange(item)} aria-pressed={range === item}>{item}</button>)}</fieldset></div><figure className="bar-chart large" aria-label={`Revenue chart for ${range}`}>{visibleRows.map((row, index) => <span key={`${row.account}-${index}`} style={{ height: `${Math.max(12, row.revenue / maxRevenue * 100)}%` }} title={`${row.account}: $${row.revenue.toLocaleString()}`}><i /></span>)}</figure><DataTable rows={visibleRows} caption={`Revenue records for ${range}`} /></section>}

        {view === 'accounts' && <section className="nova-view-panel"><div className="nova-view-heading"><div><small>ACCOUNT HEALTH</small><h3>{accountRows.length} accounts</h3></div><fieldset className="range-tabs" aria-label="Account filter"><button className={!atRiskOnly ? 'active' : ''} onClick={() => setAtRiskOnly(false)} aria-pressed={!atRiskOnly}>All</button><button className={atRiskOnly ? 'active' : ''} onClick={() => setAtRiskOnly(true)} aria-pressed={atRiskOnly}>At risk</button></fieldset></div><DataTable rows={accountRows} caption={atRiskOnly ? 'Accounts with high risk signals' : 'All connected accounts'} /></section>}

        {view === 'data' && <section className="nova-data-panel"><FileSpreadsheet /><small>CSV + EXCEL CONNECTION</small><h3>Bring your own operating data.</h3><p>Upload a CSV or .xlsx workbook with Account and Revenue columns. NOVA will recalculate the dashboard locally in your browser; nothing is sent to a server.</p><div><button onClick={() => inputRef.current?.click()}><Upload /> Choose file</button><button onClick={() => downloadCsv(sampleRows, 'nova-import-template.csv')}><Download /> Download template</button></div><p className="nova-data-note">{message}</p></section>}
      </section>
    </div>
  );
}
