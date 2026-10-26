'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const TABS = [
  ['/', '總覽'],
  ['/itinerary', '行程'],
  ['/spots', '景點'],
  ['/history', '琉球歷史'],
  ['/food', '美食'],
  ['/shopping', '購物退稅'],
  ['/transport', '交通'],
  ['/lodging', '住宿'],
  ['/checklist', '清單'],
  ['/info', '資訊'],
];

export default function Nav() {
  const path = usePathname();
  const [next, setNext] = useState(null);
  useEffect(() => setNext(null), [path]);
  const cur = next ?? path;
  return (
    <nav className="nav" aria-label="主選單">
      {TABS.map(([href, label]) => {
        const active = href === '/' ? cur === '/' : cur.startsWith(href);
        return (
          <Link key={href} href={href} prefetch className={active ? 'tab active' : 'tab'}
            aria-current={active ? 'page' : undefined} onClick={() => setNext(href)}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
