'use client';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export default function RefreshButton() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [done, setDone] = useState(false);

  async function onClick() {
    setDone(false);
    try { await fetch('/api/refresh', { method: 'POST' }); } catch {}
    start(() => {
      router.refresh();
    });
    setTimeout(() => setDone(true), 600);
    setTimeout(() => setDone(false), 2600);
  }

  return (
    <button type="button" className={`refresh${pending ? ' spin' : ''}`} onClick={onClick} disabled={pending} aria-label="更新內容">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 11a8 8 0 1 0-2.3 5.7" /><path d="M20 4v7h-7" />
      </svg>
      <span>{pending ? '更新中' : done ? '已是最新' : '更新'}</span>
    </button>
  );
}
