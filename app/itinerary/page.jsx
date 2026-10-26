import Link from 'next/link';
import { getTrip, getRows } from '@/lib/supabase';
import { fmtMD, todayTaipei } from '@/lib/format';
import { gmapsRoute, gmapsSearch, spotPath } from '@/lib/maps';
import { Badge, Empty } from '@/components/Badge';

export const revalidate = 30;
export const metadata = { title: '行程｜沖繩家族旅行' };

function Item({ i, sp }) {
  return (
    <li>
      <div className="t">
        {i.start_time && <span className="time">{i.start_time}</span>}
        {i.title}
      </div>
      <div className="badges">
        <Badge tone="muted">{i.category}</Badge>
        {i.optional && <Badge tone="sea">彈性</Badge>}
        {i.duration_min && <Badge>約 {i.duration_min} 分</Badge>}
        {sp?.elder_friendly === false && <Badge tone="coral">長輩較吃力</Badge>}
        {sp?.stroller_friendly === false && <Badge tone="coral">推車不便</Badge>}
      </div>
      {i.description && <div className="sub">{i.description}</div>}
      {i.car_note && <div className="sub">🚗 {i.car_note}</div>}
      <div className="links">
        {i.map_query && <a href={gmapsSearch(i.map_query)} target="_blank" rel="noreferrer">📍 導航</a>}
        {sp && <Link href={`${spotPath(sp.category)}#${sp.id}`}>詳細資訊</Link>}
      </div>
    </li>
  );
}

export default async function Itinerary() {
  const trip = await getTrip();
  const [days, items, spots] = await Promise.all([
    getRows('trip_days', [['day_no', true]]),
    getRows('itinerary_items', [['day_date', true], ['sort_order', true]]),
    getRows('spots'),
  ]);
  const spotMap = Object.fromEntries(spots.map((s) => [s.id, s]));
  const today = todayTaipei();

  return (
    <>
      <h1>行程</h1>
      <p className="lead">
        {fmtMD(trip.start_date)} – {fmtMD(trip.end_date)}。每天有「主線」和「備案」，標「彈性」的項目累了可以直接拿掉。
      </p>
      {days.length === 0 && <Empty>行程還在規劃中</Empty>}
      {days.map((d) => {
        const date = d.day_date.slice(0, 10);
        const main = items.filter((i) => i.day_date === date && i.plan === 'main');
        const backup = items.filter((i) => i.day_date === date && i.plan === 'backup');
        const route = gmapsRoute(main.map((i) => i.map_query));
        return (
          <section key={d.day_no} id={`day-${d.day_no}`} className="day">
            <div className={date === today ? 'dayhead today' : 'dayhead'}>
              <h2>Day {d.day_no}</h2>
              <span className="sub">{fmtMD(date)}{date === today ? ' · 今天' : ''}</span>
            </div>
            <div className="daytitle">{d.title}</div>
            {d.summary && <p className="sub">{d.summary}</p>}
            {d.drive_note && <p className="sub">🚗 {d.drive_note}</p>}
            {d.hotel_note && <p className="sub">🏨 住宿：{d.hotel_note}</p>}
            {route && (
              <div className="links">
                <a href={route} target="_blank" rel="noreferrer">🗺 整天路線（Google 地圖）</a>
              </div>
            )}
            {main.length === 0 ? <Empty>尚未安排</Empty> : (
              <ul className="tl">
                {main.map((i) => <Item key={i.id} i={i} sp={i.spot_id ? spotMap[i.spot_id] : null} />)}
              </ul>
            )}
            {backup.length > 0 && (
              <details className="backup">
                <summary>備案與調整（{backup.length}）</summary>
                {d.backup_summary && <p className="sub">{d.backup_summary}</p>}
                <ul className="tl">
                  {backup.map((i) => <Item key={i.id} i={i} sp={i.spot_id ? spotMap[i.spot_id] : null} />)}
                </ul>
              </details>
            )}
          </section>
        );
      })}
    </>
  );
}
