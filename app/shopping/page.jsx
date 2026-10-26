import { getRows } from '@/lib/supabase';
import { Badge, Section, Empty } from '@/components/Badge';
import SpotCard from '@/components/SpotCard';

export const dynamic = 'force-dynamic';
export const metadata = { title: '購物與退稅｜沖繩家族旅行' };

const COUPON_TONE = { 已查證: 'ok', 網路分享待確認: 'coral', 待查: 'muted' };

export default async function Shopping() {
  const [spots, stores, coupons, notes] = await Promise.all([
    getRows('spots'),
    getRows('stores'),
    getRows('coupons'),
    getRows('info_notes'),
  ]);
  const malls = spots.filter((s) => s.category === '購物' && s.status !== '已排除');
  const tax = notes.filter((n) => n.section.startsWith('退稅') || n.section === '優惠券');
  const mallNames = [...new Set(stores.map((s) => s.mall))];

  return (
    <>
      <h1>購物與退稅</h1>
      <p className="lead">2026/11/1 起日本退稅改為「先付稅、事後退」。回程務必先退稅、再托運。</p>

      <Section title="退稅與優惠券重點">
        {tax.map((n) => (
          <article className="card" key={n.id}>
            <h3>{n.title}</h3>
            <div className="sub">{n.section}</div>
            <p style={{ whiteSpace: 'pre-wrap' }}>{n.content}</p>
            {n.source_url && <div className="links"><a href={n.source_url} target="_blank" rel="noreferrer">資料來源</a></div>}
          </article>
        ))}
      </Section>

      <Section title="商場與店家">
        {malls.length === 0 ? <Empty>還沒有資料</Empty> : malls.map((s) => <SpotCard key={s.id} s={s} />)}
      </Section>

      <Section title="各商場有哪些品牌">
        <p className="sub">「待查」是我查到的資料沒列出，不代表沒有，現場以實際為準。</p>
        {mallNames.map((m) => (
          <div className="card" key={m}>
            <h3>{m}</h3>
            <div className="badges">
              {stores.filter((s) => s.mall === m).map((s) => (
                <Badge key={s.id} tone={s.status === '已確認' ? 'ok' : 'muted'}>
                  {s.brand}{s.status === '待查' ? '（待查）' : ''}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section title="優惠券">
        {coupons.map((c) => (
          <article className="card" key={c.id}>
            <h3>{c.name}</h3>
            <div className="badges"><Badge tone={COUPON_TONE[c.status]}>{c.status}</Badge>{c.store && <Badge>{c.store}</Badge>}</div>
            {c.benefit && <p>{c.benefit}</p>}
            {c.how_to_use && <p className="sub">使用：{c.how_to_use}</p>}
            {c.note && <p className="warn">⚠️ {c.note}</p>}
            {c.source_url && <div className="links"><a href={c.source_url} target="_blank" rel="noreferrer">資料來源</a></div>}
          </article>
        ))}
      </Section>
    </>
  );
}
