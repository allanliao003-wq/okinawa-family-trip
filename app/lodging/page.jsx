import { getRows } from '@/lib/supabase';
import { fmtMD, money } from '@/lib/format';
import { Badge, Empty } from '@/components/Badge';

export const revalidate = 30;
export const metadata = { title: '住宿｜沖繩家族旅行' };

export default async function Lodging() {
  const rows = await getRows('lodging');
  return (
    <>
      <h1>住宿</h1>
      <p className="lead">共 5 晚。已訂：那霸 THE NEST NAHA 2 晚（2/8–2/10），讀谷民宿 3 晚（2/10–2/13）</p>
      {rows.length === 0 ? <Empty>還沒有住宿資料，確定後會更新</Empty> : rows.map((l) => (
        <article className="card" key={l.id}>
          <h3>{l.name}</h3>
          <div><Badge tone={l.status === '已訂' ? 'ok' : 'coral'}>{l.status}</Badge>{l.area && <Badge>{l.area}</Badge>}</div>
          {(l.check_in || l.check_out) && <p>{l.check_in && fmtMD(l.check_in)} 入住 → {l.check_out && fmtMD(l.check_out)} 退房</p>}
          {l.rooms && <p className="sub">房型：{l.rooms}</p>}
          {l.address && <p className="sub">📍 {l.address}</p>}
          {l.price_total != null && <p className="sub">總價：{money(l.price_total)}</p>}
          {l.booking_ref && <p className="sub">訂房編號：{l.booking_ref}</p>}
          {l.notes && <p className="sub">{l.notes}</p>}
          {l.map_url && <div className="links"><a href={l.map_url} target="_blank" rel="noreferrer">📍 在 Google 地圖查看</a></div>}
        </article>
      ))}
    </>
  );
}
