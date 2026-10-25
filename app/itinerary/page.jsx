import Link from 'next/link';
import { getTrip, getRows } from '@/lib/supabase';
import { fmtMD, eachDay, todayTaipei } from '@/lib/format';
import { Badge, Empty } from '@/components/Badge';

export const dynamic = 'force-dynamic';
export const metadata = { title: '行程｜沖繩家族旅行' };

export default async function Itinerary() {
  const trip = await getTrip();
  const [items, spots] = await Promise.all([
    getRows('itinerary_items', [['day_date', true], ['sort_order', true]]),
    getRows('spots'),
  ]);
  const spotMap = Object.fromEntries(spots.map((s) => [s.id, s]));
  const days = eachDay(trip.start_date, trip.end_date);
  const today = todayTaipei();

  return (
    <>
      <h1>行程</h1>
      <p className="lead">{fmtMD(trip.start_date)} – {fmtMD(trip.end_date)}，共 {days.length} 天</p>
      {days.map((d, idx) => {
        const list = items.filter((i) => i.day_date === d);
        return (
          <section key={d}>
            <div className={d === today ? 'dayhead today' : 'dayhead'}>
              <h2>Day {idx + 1}</h2>
              <span className="sub">{fmtMD(d)}{d === today ? ' · 今天' : ''}</span>
            </div>
            {list.length === 0 ? (
              <Empty>尚未安排</Empty>
            ) : (
              <ul className="tl">
                {list.map((i) => {
                  const sp = i.spot_id ? spotMap[i.spot_id] : null;
                  return (
                    <li key={i.id}>
                      <div className="t">
                        {i.start_time && <span className="time">{i.start_time}{i.end_time ? `–${i.end_time}` : ''}</span>}
                        {i.title}
                      </div>
                      <div><Badge tone="muted">{i.category}</Badge>{sp && <Link href="/spots"><Badge tone="sea">{sp.name}</Badge></Link>}</div>
                      {i.description && <div className="sub">{i.description}</div>}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        );
      })}
    </>
  );
}
