import { getRows } from '@/lib/supabase';
import { Section, Empty } from '@/components/Badge';

export const dynamic = 'force-dynamic';
export const metadata = { title: '清單｜沖繩家族旅行' };

export default async function Checklist() {
  const rows = await getRows('checklist_items');
  const sections = [...new Set(rows.map((r) => r.section))];
  return (
    <>
      <h1>清單</h1>
      <p className="lead">已完成 {rows.filter((r) => r.done).length} / {rows.length} 項</p>
      {rows.length === 0 && <Empty>還沒有項目</Empty>}
      {sections.map((s) => (
        <Section key={s} title={s}>
          <div className="card">
            {rows.filter((r) => r.section === s).map((r) => (
              <div className="check" key={r.id}>
                <span className={r.done ? 'box done' : 'box'}>{r.done ? '✓' : ''}</span>
                <div>
                  <div className={r.done ? 'done-text' : ''}>{r.title}</div>
                  {r.note && <div className="sub">{r.note}</div>}
                </div>
              </div>
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}
