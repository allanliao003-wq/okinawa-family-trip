import Link from 'next/link';
import { getRows } from '@/lib/supabase';
import { Badge, Empty } from '@/components/Badge';

export const dynamic = 'force-dynamic';
export const metadata = { title: '景點｜沖繩家族旅行' };

const FILTERS = ['全部', '確定', '候選', '已排除'];

export default async function Spots({ searchParams }) {
  const { status = '全部' } = await searchParams;
  const all = await getRows('spots');
  const list = status === '全部' ? all.filter((s) => s.status !== '已排除') : all.filter((s) => s.status === status);
  const tone = { 確定: 'ok', 候選: 'coral', 已排除: 'muted' };

  return (
    <>
      <h1>景點</h1>
      <p className="lead">候選與確定的地點，附長輩與推車友善標註</p>
      <div className="filters">
        {FILTERS.map((f) => (
          <Link key={f} href={f === '全部' ? '/spots' : `/spots?status=${f}`} className={f === status ? 'on' : ''}>{f}</Link>
        ))}
      </div>
      {list.length === 0 ? <Empty>這個分類還沒有景點</Empty> : list.map((s) => (
        <article className="card" key={s.id}>
          {s.image_url && <img src={s.image_url} alt={s.name} style={{ width: '100%', borderRadius: 10, marginBottom: 8 }} />}
          <h3>{s.name}</h3>
          {s.name_ja && <div className="sub">{s.name_ja}{s.area ? ` · ${s.area}` : ''}</div>}
          <div style={{ marginTop: 6 }}>
            <Badge tone={tone[s.status]}>{s.status}</Badge>
            <Badge>{s.category}</Badge>
            {s.stroller_friendly === true && <Badge tone="sea">推車友善</Badge>}
            {s.stroller_friendly === false && <Badge tone="coral">推車不便</Badge>}
            {s.elder_friendly === true && <Badge tone="sea">長輩友善</Badge>}
            {s.elder_friendly === false && <Badge tone="coral">長輩較吃力</Badge>}
          </div>
          {s.description && <p>{s.description}</p>}
          <p className="sub">
            {s.opening_hours && <>營業：{s.opening_hours}　</>}
            {s.ticket_info && <>門票：{s.ticket_info}　</>}
            {s.duration_min && <>建議停留：{s.duration_min} 分鐘</>}
          </p>
          {s.address && <p className="sub">📍 {s.address}</p>}
          {s.tips && <p className="sub">💡 {s.tips}</p>}
          {s.map_url && <p><a href={s.map_url} target="_blank" rel="noreferrer">在地圖開啟</a></p>}
        </article>
      ))}
    </>
  );
}
