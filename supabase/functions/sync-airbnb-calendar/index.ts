import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { parseIcal } from '../_shared/ical.ts';
import { cors } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  try {
    const url = Deno.env.get('AIRBNB_ICAL_URL');
    if (!url) throw new Error('AIRBNB_ICAL_URL non configurato');
    const projectUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(projectUrl, serviceRole);
    const res = await fetch(url, { headers: { 'User-Agent': 'DanziHouseCalendarSync/1.0' } });
    if (!res.ok) throw new Error(`Airbnb iCal HTTP ${res.status}`);
    const blocks = parseIcal(await res.text());
    const { error } = await supabase.rpc('replace_airbnb_blocks', {
      p_property_id: '00000000-0000-0000-0000-000000000001',
      p_blocks: blocks,
    });
    if (error) throw error;
    return Response.json({ ok: true, count: blocks.length }, { headers: cors });
  } catch (error) {
    return Response.json({ ok: false, message: error instanceof Error ? error.message : 'Sync error' }, { status: 500, headers: cors });
  }
});
