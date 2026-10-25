const WD = ['日', '一', '二', '三', '四', '五', '六'];

export function parseDate(s) {
  const [y, m, d] = s.slice(0, 10).split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}
export function fmtMD(s) {
  const d = parseDate(s);
  return `${d.getUTCMonth() + 1}/${d.getUTCDate()}（${WD[d.getUTCDay()]}）`;
}
export function daysBetween(a, b) {
  return Math.round((b - a) / 86400000);
}
export function eachDay(start, end) {
  const out = [];
  const s = parseDate(start);
  const n = daysBetween(s, parseDate(end));
  for (let i = 0; i <= n; i++) {
    const d = new Date(s.getTime() + i * 86400000);
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}
export function todayTaipei() {
  return new Date(Date.now() + 8 * 3600000).toISOString().slice(0, 10);
}
export function money(n) {
  return n == null ? '—' : `NT$${Number(n).toLocaleString('en-US')}`;
}
export function fmtDateTime(ts) {
  if (!ts) return '';
  const d = new Date(new Date(ts).getTime() + 8 * 3600000);
  const p = (x) => String(x).padStart(2, '0');
  return `${d.getUTCMonth() + 1}/${d.getUTCDate()} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())}`;
}
