import Link from 'next/link';
import { getRows } from '@/lib/supabase';
import { Badge, Section, Empty } from '@/components/Badge';
import { spotPath } from '@/lib/maps';

export const revalidate = 30;
export const metadata = { title: '琉球歷史｜沖繩家族旅行' };

export default async function History() {
  const [notes, spots] = await Promise.all([getRows('info_notes'), getRows('spots')]);
  const primer = notes.filter((n) => n.section === '琉球歷史入門');
  const withHistory = spots
    .filter((s) => s.history && s.status !== '已排除')
    .sort((a, b) => (a.history_sort ?? 99) - (b.history_sort ?? 99));
  const eras = [...new Set(withHistory.map((s) => s.history_era))];

  return (
    <>
      <h1>琉球歷史</h1>
      <p className="lead">不懂琉球也沒關係。先看這份入門，再看每個景點在歷史上是什麼。年代與細節以現場說明牌為準。</p>

      <Section title="先看這個：入門">
        {primer.length === 0 && <Empty>還沒有資料</Empty>}
        {primer.map((n) => (
          <article className="card" key={n.id}>
            <h3>{n.title}</h3>
            <p>{n.content}</p>
          </article>
        ))}
      </Section>

      <Section title="景點在歷史上的位置">
        {eras.map((era) => (
          <div key={era} className="era">
            <h3 className="era-title">{era}</h3>
            {withHistory.filter((s) => s.history_era === era).map((s) => (
              <article className="card" key={s.id}>
                <h3>
                  <Link href={`${spotPath(s.category)}#${s.id}`}>{s.name}</Link>
                </h3>
                <div className="badges">
                  <Badge tone={s.status === '確定' ? 'ok' : 'coral'}>{s.status}</Badge>
                  {s.elder_friendly === false && <Badge tone="coral">長輩較吃力</Badge>}
                  {s.stroller_friendly === false && <Badge tone="coral">推車不便</Badge>}
                </div>
                <p>{s.history}</p>
              </article>
            ))}
          </div>
        ))}
      </Section>
    </>
  );
}
