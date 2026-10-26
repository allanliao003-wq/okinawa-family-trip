import Link from 'next/link';
import { getTrip, getRows } from '@/lib/supabase';
import { fmtMD, parseDate, daysBetween, todayTaipei } from '@/lib/format';
import { Section, Empty } from '@/components/Badge';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const trip = await getTrip();
  const today = todayTaipei();
  const toStart = daysBetween(parseDate(today), parseDate(trip.start_date));
  const toEnd = daysBetween(parseDate(today), parseDate(trip.end_date));
  const nights = daysBetween(parseDate(trip.start_date), parseDate(trip.end_date));
  const people = trip.adults + trip.children;

  const [days, items] = await Promise.all([
    getRows('trip_days', [['day_no', true]]),
    getRows('itinerary_items', [['day_date', true], ['sort_order', true]]),
  ]);
  const focusDate = toStart > 0 ? trip.start_date.slice(0, 10) : toEnd >= 0 ? today : null;
  const focus = focusDate ? items.filter((i) => i.day_date === focusDate && i.plan === 'main') : [];

  let heroCount;
  if (toStart > 0) heroCount = <>還有 <span>{toStart}</span><small>天出發</small></>;
  else if (toEnd >= 0) heroCount = <>旅行進行中 · 第 <span>{-toStart + 1}</span><small>天</small></>;
  else heroCount = <>旅程已結束，歡迎回來</>;

  return (
    <>
      <div className="hero">
        <div>{trip.subtitle}</div>
        <h1>{trip.title}</h1>
        <div>{fmtMD(trip.start_date)} – {fmtMD(trip.end_date)}</div>
        <div className="count">{heroCount}</div>
      </div>

      <div className="grid">
        <div className="stat"><b>{people} 人</b><span>兩台車同行</span></div>
        <div className="stat"><b>{trip.elders} 位長輩</b><span>移動方便優先</span></div>
        <div className="stat"><b>{nights + 1} 天 {nights} 晚</b><span>自由行</span></div>
        <div className="stat"><b>≤ NT${trip.budget_per_person?.toLocaleString('en-US')}</b><span>每人預算上限</span></div>
      </div>

      {trip.headline_notes && (
        <Section title="重點提醒">
          <div className="card"><p style={{ margin: 0 }}>{trip.headline_notes}</p></div>
          <div className="card">
            <p style={{ margin: 0 }}>🧾 <b>回程退稅：</b>先不要托運行李，到安檢前的退稅機掃護照，綠燈再托運。<Link href="/shopping">看完整步驟</Link></p>
          </div>
        </Section>
      )}

      <Section title={focusDate === today ? '今日行程' : `第一天行程（${fmtMD(trip.start_date)}）`}>
        {focus.length === 0 ? (
          <Empty>這天還沒有安排，<Link href="/itinerary">看完整行程</Link></Empty>
        ) : (
          <ul className="tl">
            {focus.map((i) => (
              <li key={i.id}>
                <div className="t">{i.start_time && <span className="time">{i.start_time}</span>}{i.title}</div>
                {i.description && <div className="sub">{i.description}</div>}
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section title="六天一覽">
        <div className="daylist">
          {days.map((d) => (
            <Link key={d.day_no} href={`/itinerary#day-${d.day_no}`}>
              <div className="card">
                <div><span className="n">Day {d.day_no}</span><b>{d.title}</b></div>
                <div className="sub">{fmtMD(d.day_date.slice(0, 10))}</div>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
