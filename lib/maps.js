const enc = encodeURIComponent;

export const gmapsSearch = (q) =>
  `https://www.google.com/maps/search/?api=1&query=${enc(q)}`;

export const photoSearch = (q) =>
  `https://www.google.com/search?tbm=isch&q=${enc(q)}`;

// 依序串起多個地點的 Google 地圖開車路線（最多 8 個中途點）
export function gmapsRoute(queries) {
  const qs = [];
  for (const q of queries) {
    if (q && qs[qs.length - 1] !== q) qs.push(q);
  }
  if (qs.length < 2) return null;
  const p = new URLSearchParams({
    api: '1',
    origin: qs[0],
    destination: qs[qs.length - 1],
    travelmode: 'driving',
  });
  const mid = qs.slice(1, -1).slice(0, 8);
  if (mid.length) p.set('waypoints', mid.join('|'));
  return `https://www.google.com/maps/dir/?${p.toString()}`;
}

export function spotPath(category) {
  if (category === '美食') return '/food';
  if (category === '購物') return '/shopping';
  return '/spots';
}

export function reserveLabel(url) {
  try {
    const h = new URL(url).hostname;
    if (h.includes('tabelog')) return '🍽 Tabelog 訂位';
    if (h.includes('hotpepper')) return '🍽 Hot Pepper 訂位';
    if (h.includes('gnavi') || h.includes('gurunavi')) return '🍽 Gurunavi 訂位';
  } catch {}
  return '🍽 線上訂位';
}
