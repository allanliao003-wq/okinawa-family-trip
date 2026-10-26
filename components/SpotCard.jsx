import { Badge } from '@/components/Badge';
import { gmapsSearch, photoSearch } from '@/lib/maps';

const TONE = { 確定: 'ok', 候選: 'coral', 已排除: 'muted' };

function Line({ label, children }) {
  if (!children) return null;
  return (
    <p className="line">
      <span className="k">{label}</span>
      <span>{children}</span>
    </p>
  );
}

export default function SpotCard({ s }) {
  const q = s.map_query || s.name;
  return (
    <article className="card spot" id={s.id}>
      <h3>{s.name}</h3>
      {(s.name_ja || s.area) && (
        <div className="sub">{[s.name_ja, s.area].filter(Boolean).join(' · ')}</div>
      )}
      <div className="badges">
        <Badge tone={TONE[s.status]}>{s.status}</Badge>
        <Badge>{s.category}</Badge>
        {s.stroller_friendly === true && <Badge tone="sea">推車友善</Badge>}
        {s.stroller_friendly === false && <Badge tone="coral">推車不便</Badge>}
        {s.elder_friendly === true && <Badge tone="sea">長輩友善</Badge>}
        {s.elder_friendly === false && <Badge tone="coral">長輩較吃力</Badge>}
      </div>

      {s.description && <p>{s.description}</p>}
      {s.history && <p className="hist"><b>歷史背景　</b>{s.history}</p>}

      <Line label="營業">{s.opening_hours}</Line>
      <Line label="公休">{s.closed_days}</Line>
      <Line label="票價">{s.ticket_info}</Line>
      <Line label="停留">{s.duration_min ? `約 ${s.duration_min} 分鐘` : null}</Line>
      <Line label="停車">{s.parking}</Line>
      <Line label="推車">{s.stroller_note}</Line>
      <Line label="長輩">{s.elder_note}</Line>
      <Line label="地址">{s.address}</Line>
      <Line label="電話">
        {s.phone ? (
          /^[0-9-]+$/.test(s.phone) ? <a href={`tel:${s.phone}`}>{s.phone}</a> : s.phone
        ) : null}
      </Line>
      {s.tips && <p className="tip">💡 {s.tips}</p>}
      {s.verify_note && <p className="warn">⚠️ 待確認：{s.verify_note}</p>}

      <div className="links">
        <a href={gmapsSearch(q)} target="_blank" rel="noreferrer">📍 Google 地圖</a>
        <a href={photoSearch(q)} target="_blank" rel="noreferrer">🖼 看照片</a>
        {s.website && <a href={s.website} target="_blank" rel="noreferrer">官網</a>}
        {s.source_url && <a href={s.source_url} target="_blank" rel="noreferrer">資料來源</a>}
      </div>
      {s.verified_on && <div className="sub small">資料查證日：{s.verified_on}</div>}
    </article>
  );
}
