'use client';
import { useState } from 'react';
import SpotCard from '@/components/SpotCard';

export default function SpotFilter({ spots, cats }) {
  const [cat, setCat] = useState('全部');
  const list = cat === '全部' ? spots : spots.filter((s) => s.category === cat);
  return (
    <>
      <div className="filters" role="tablist">
        {['全部', ...cats].map((c) => (
          <button key={c} type="button" className={c === cat ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      {list.length === 0 ? <p className="empty">這個分類還沒有景點</p> : list.map((s) => <SpotCard key={s.id} s={s} />)}
    </>
  );
}
