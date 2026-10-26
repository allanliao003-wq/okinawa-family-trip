import { getRows } from '@/lib/supabase';
import SpotFilter from '@/components/SpotFilter';

export const revalidate = 30;
export const metadata = { title: '景點｜沖繩家族旅行' };

const CATS = ['歷史人文', '自然景點', '親子體驗'];

export default async function Spots() {
  const all = (await getRows('spots')).filter((s) => CATS.includes(s.category) && s.status !== '已排除');
  return (
    <>
      <h1>景點</h1>
      <p className="lead">人文歷史、自然與親子體驗。「確定」是你點名要去的，「候選」是我建議、可以再調整的。</p>
      <SpotFilter spots={all} cats={CATS} />
    </>
  );
}
