import { getRows } from '@/lib/supabase';
import { Empty } from '@/components/Badge';
import SpotCard from '@/components/SpotCard';

export const dynamic = 'force-dynamic';
export const metadata = { title: '美食｜沖繩家族旅行' };

export default async function Food() {
  const list = (await getRows('spots')).filter((s) => s.category === '美食' && s.status !== '已排除');
  return (
    <>
      <h1>美食</h1>
      <p className="lead">牧志市場活海鮮、居酒屋與三線、週末限定的 Shima Buns，以及待補的鮮奶茶。</p>
      {list.length === 0 ? <Empty>還沒有資料</Empty> : list.map((s) => <SpotCard key={s.id} s={s} />)}
    </>
  );
}
