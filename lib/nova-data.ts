export type NovaRow = {
  date: string;
  account: string;
  owner: string;
  revenue: number;
  activation: number | null;
  risk: 'Low' | 'Medium' | 'High' | 'Unknown';
  status: 'Active' | 'At risk' | 'Renewed';
};

export type Cell = string | number | boolean | Date | null | undefined;

export function parseCsv(text: string): string[][] {
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

  if (quoted) throw new Error('An opening quote is missing its closing quote in this CSV.');
  rows.at(-1)?.push(cell.trim());
  return rows.filter(row => row.some(value => value !== ''));
}

function toNumber(value: Cell, label: string, optional = false): number | null {
  if (value == null || String(value).trim() === '') {
    if (optional) return null;
    throw new Error(`${label} is required.`);
  }
  const text = String(value).trim().replace(/^\$/, '').replace(/%$/, '').replaceAll(',', '');
  if (!/^\d+(\.\d+)?$/.test(text)) throw new Error(`${label} must be a non-negative number.`);
  const result = Number(text);
  if (!Number.isFinite(result) || result > 1e12) throw new Error(`${label} is too large.`);
  return result;
}

export function normalizeRows(rows: Cell[][]): NovaRow[] {
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

  if (rows.length > 10001) throw new Error('Import at most 10,000 rows at a time.');
  return rows.slice(1).filter(row => row.some(value => value !== null && value !== '')).map((row, rowIndex) => {
    const activation = indexes.activation >= 0 ? toNumber(row[indexes.activation], `Row ${rowIndex + 2} activation`, true) : null;
    if (activation !== null && activation > 100) throw new Error(`Row ${rowIndex + 2} activation must be between 0 and 100.`);
    const rawStatus = indexes.status >= 0 ? String(row[indexes.status] ?? '').toLowerCase() : '';
    const rawRisk = indexes.risk >= 0 ? String(row[indexes.risk] ?? '').toLowerCase() : '';
    const risk: NovaRow['risk'] = rawRisk.includes('high') || rawStatus.includes('risk') || (activation !== null && activation < 50)
      ? 'High'
      : rawRisk.includes('medium') || (activation !== null && activation < 70) ? 'Medium' : rawRisk.includes('low') || activation !== null ? 'Low' : 'Unknown';
    const status: NovaRow['status'] = rawStatus.includes('renew') ? 'Renewed' : rawStatus.includes('risk') ? 'At risk' : 'Active';
    const rawDate = indexes.date >= 0 ? row[indexes.date] : '';
    const date = rawDate instanceof Date ? rawDate.toISOString().slice(0, 10) : String(rawDate ?? '').trim();

    if (date && (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date)) throw new Error(`Row ${rowIndex + 2} date must be YYYY-MM-DD.`);
    if (!String(row[indexes.account] ?? '').trim()) throw new Error(`Row ${rowIndex + 2} needs an account name.`);
    return {
      date,
      account: String(row[indexes.account] || `Account ${rowIndex + 1}`),
      owner: indexes.owner >= 0 ? String(row[indexes.owner] || 'Unassigned') : 'Unassigned',
      revenue: toNumber(row[indexes.revenue], `Row ${rowIndex + 2} revenue`) ?? 0,
      activation,
      risk,
      status,
    };
  });
}

export function rowsToCsv(rows: NovaRow[]) {
  const escape = (value: string | number) => `"${typeof value === 'string' && /^[=+\-@\t\r]/.test(value) ? "'" : ''}${String(value).replaceAll('"', '""')}"`;
  return [
    ['Date', 'Account', 'Owner', 'Revenue', 'Activation', 'Risk', 'Status'].join(','),
    ...rows.map(row => [row.date, row.account, row.owner, row.revenue, row.activation ?? '', row.risk, row.status].map(escape).join(',')),
  ].join('\n');
}

export function filterNovaRange(rows: NovaRow[], days: number) {
  // A file without complete dates cannot honestly offer calendar-day filtering.
  if (!rows.length || rows.some(row => !row.date)) return rows;
  const sorted = [...rows].sort((a, b) => a.date.localeCompare(b.date));
  const end = sorted[sorted.length - 1].date;
  const startDate = new Date(`${end}T12:00:00Z`);
  startDate.setUTCDate(startDate.getUTCDate() - days + 1);
  const start = startDate.toISOString().slice(0, 10);
  return sorted.filter(row => row.date >= start && row.date <= end);
}
