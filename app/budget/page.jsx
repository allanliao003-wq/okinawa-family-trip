import { getTrip, getRows } from '@/lib/supabase';
import { money } from '@/lib/format';

export const revalidate = 30;
export const metadata = { title: '費用｜沖繩家族旅行' };

export default async function Budget() {
  const trip = await getTrip();
  const rows = await getRows('budget_items');
  const sum = (k) => rows.reduce((a, r) => a + (r[k] ?? 0), 0);
  const min = sum('est_min');
  const max = sum('est_max');
  const actual = rows.some((r) => r.actual_per_person != null) ? sum('actual_per_person') : null;
  const limit = trip.budget_per_person;
  const pct = limit ? Math.min(100, Math.round((max / limit) * 100)) : 0;

  return (
    <>
      <h1>費用</h1>
      <p className="lead">每人估算（新台幣）。預算上限 {money(limit)}，其中餐飲與門票另計。</p>
      <div className="card">
        <div className="sub">估算區間（每人）</div>
        <div style={{ fontSize: 24, fontWeight: 800 }}>{money(min)} – {money(max)}</div>
        <div className={max > limit ? 'bar over' : 'bar'}><i style={{ width: `${pct}%` }} /></div>
        <div className="sub">{max > limit ? `高標超出上限 ${money(max - limit)}` : `高標仍在上限內，約剩 ${money(limit - max)}`}</div>
        {actual != null && <div className="sub">已記錄實際：{money(actual)}</div>}
      </div>
      <table>
        <thead><tr><th>項目</th><th className="num">最低</th><th className="num">最高</th><th className="num">實際</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>{r.label}{r.note && <div className="sub">{r.note}</div>}</td>
              <td className="num">{money(r.est_min)}</td>
              <td className="num">{money(r.est_max)}</td>
              <td className="num">{money(r.actual_per_person)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot><tr><td>合計（每人）</td><td className="num">{money(min)}</td><td className="num">{money(max)}</td><td className="num">{money(actual)}</td></tr></tfoot>
      </table>
    </>
  );
}
