import Link from 'next/link';
import { getRows } from '@/lib/supabase';
import { Empty } from '@/components/Badge';
import SpotCard from '@/components/SpotCard';

export const dynamic = 'force-dynamic';
export const metadata = { title: '景點｜沖繩家族旅行' };

const CATS = ['全部', '歷史人文', '自然景點', '親子體驗'];

export default async function Spots({ searchParams }) {
  const { cat = '全部' } = await searchParams;
  const all = (await getRows('spots')).filter((s) => CATS.slice(1).includes(s.category) && s.status !== '已排除');
  const list = cat === '全部' ? all : all.filter((s) => s.category === cat);

  return (
    <>
      <h1>景點</h1>
      <p className="lead">人文歷史、自然與親子體驗。每張卡附營業時間、推車與長輩提醒、Google 地圖。「確定」是你點名要去的，「候選」是我建議、可以再調整的。</p>
      <div className="filters">
        {CATS.map((c) => (
          <Link key={c} href={c === '全部' ? '/spots' : `/spots?cat=${encodeURIComponent(c)}`} className={c === cat ? 'on' : ''}>
            {c}
          </Link>
        ))}
      </div>
      {list.length === 0 ? <Empty>這個分類還沒有景點</Empty> : list.map((s) => <SpotCard key={s.id} s={s} />)}
    </>
  );
}
