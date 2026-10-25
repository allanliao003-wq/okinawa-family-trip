import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
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
