import { getRows } from '@/lib/supabase';
import { Section, Empty } from '@/components/Badge';

export const revalidate = 30;
export const metadata = { title: '實用資訊｜沖繩家族旅行' };

export default async function Info() {
  const rows = (await getRows('info_notes')).filter((r) => r.section !== '琉球歷史入門');
  const sections = [...new Set(rows.map((r) => r.section))];
  return (
    <>
      <h1>實用資訊</h1>
      <p className="lead">自駕須知、人文禮儀、行程提醒、緊急聯絡與日文常用句。退稅與優惠券在「購物與退稅」分頁。</p>
      {rows.length === 0 && <Empty>還沒有資料</Empty>}
      {sections.map((s) => (
        <Section key={s} title={s}>
          {rows.filter((r) => r.section === s).map((r) => (
            <article className="card" key={r.id}>
              <h3>{r.title}</h3>
              {r.content && <p style={{ whiteSpace: 'pre-wrap' }}>{r.content}</p>}
              {r.source_url && <div className="links"><a href={r.source_url} target="_blank" rel="noreferrer">資料來源</a></div>}
            </article>
          ))}
        </Section>
      ))}
    </>
  );
}
