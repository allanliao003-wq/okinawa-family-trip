'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  ['/', '總覽'],
  ['/itinerary', '行程'],
  ['/spots', '景點'],
  ['/transport', '交通'],
  ['/lodging', '住宿'],
  ['/budget', '費用'],
  ['/checklist', '清單'],
  ['/info', '實用資訊'],
];

export default function Nav() {
  const path = usePathname();
  return (
    <nav className="nav" aria-label="主選單">
      {TABS.map(([href, label]) => {
        const active = href === '/' ? path === '/' : path.startsWith(href);
        return (
          <Link key={href} href={href} className={active ? 'tab active' : 'tab'}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
