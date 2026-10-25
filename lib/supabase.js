import { createClient } from '@supabase/supabase-js';

// 這兩個是公開值（publishable key），資料安全由 Supabase RLS 保護：匿名只能讀、不能寫。
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vkcaqdhzfleskwxlukxd.supabase.co';
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_Zuri9jsutZ5djPyyJv0A7g_kaMhlro2';

export const supabase = createClient(
  URL,
  KEY,
  {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (url, init) => fetch(url, { ...init, cache: 'no-store' }) },
  }
);

export async function getRows(table, orders = [['sort_order', true]]) {
  let q = supabase.from(table).select('*');
  for (const [col, asc] of orders) q = q.order(col, { ascending: asc });
  const { data, error } = await q;
  if (error) throw new Error(`${table}: ${error.message}`);
  return data ?? [];
}

export async function getTrip() {
  const { data, error } = await supabase.from('trip').select('*').eq('id', 1).single();
  if (error) throw new Error(`trip: ${error.message}`);
  return data;
}
