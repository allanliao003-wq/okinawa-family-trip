import { getRows } from '@/lib/supabase';
import { fmtDateTime, money } from '@/lib/format';
import { Badge, Empty } from '@/components/Badge';

export const dynamic = 'force-dynamic';
export const metadata = { title: '交通｜沖繩家族旅行' };

export default async function Transport() {
  const rows = await getRows('transport');
  return (
    <>
      <h1>交通與租車</h1>
      <p className="lead">航班、租車與其他交通</p>
      {rows.length === 0 ? <Empty>尚無資料</Empty> : rows.map((t) => (
        <article className="card" key={t.id}>
          <h3>{t.title}</h3>
          <div><Badge tone={t.status === '已訂' ? 'ok' : 'coral'}>{t.status}</Badge><Badge>{t.kind}</Badge></div>
          {(t.from_place || t.to_place) && <p>{t.from_place} → {t.to_place}</p>}
          {(t.depart_at || t.arrive_at) && <p className="sub">{fmtDateTime(t.depart_at)}{t.arrive_at ? ` → ${fmtDateTime(t.arrive_at)}` : ''}</p>}
          {t.details && <p className="sub">{t.details}</p>}
          {t.booking_ref && <p className="sub">訂位代號：{t.booking_ref}</p>}
          {t.price_total != null && <p className="sub">總價：{money(t.price_total)}</p>}
        </article>
      ))}
    </>
  );
}
