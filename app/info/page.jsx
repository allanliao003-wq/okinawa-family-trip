import { getRows } from '@/lib/supabase';
import { Section, Empty } from '@/components/Badge';

export const dynamic = 'force-dynamic';
export const metadata = { title: '實用資訊｜沖繩家族旅行' };

export default async function Info() {
  const rows = await getRows('info_notes');
  const sections = [...new Set(rows.map((r) => r.section))];
  return (
    <>
      <h1>實用資訊</h1>
      <p className="lead">緊急聯絡、租車與出發前提醒</p>
      {rows.length === 0 && <Empty>還沒有資料</Empty>}
      {sections.map((s) => (
        <Section key={s} title={s}>
          {rows.filter((r) => r.section === s).map((r) => (
            <article className="card" key={r.id}>
              <h3>{r.title}</h3>
              {r.content && <p style={{ whiteSpace: 'pre-wrap' }}>{r.content}</p>}
            </article>
          ))}
        </Section>
      ))}
    </>
  );
}
