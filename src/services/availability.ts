import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { CalendarBlock } from '@/types';

export async function getCalendarBlocks(): Promise<CalendarBlock[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from('calendar_blocks')
    .select('id,source,start_date,end_date,type')
    .gte('end_date', today)
    .order('start_date');

  if (error) throw error;
  return (data ?? []) as CalendarBlock[];
}
