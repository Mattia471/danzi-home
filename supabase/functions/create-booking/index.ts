import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { parseIcal } from '../_shared/ical.ts';
import { cors } from '../_shared/cors.ts';

const PROPERTY_ID = '00000000-0000-0000-0000-000000000001';

async function syncAirbnb(supabase: ReturnType<typeof createClient>) {
  const url = Deno.env.get('AIRBNB_ICAL_URL');
  if (!url) return;
  const response = await fetch(url, { headers: { 'User-Agent': 'DanziHouseBookingCheck/1.0' } });
  if (!response.ok) throw new Error('Impossibile verificare il calendario Airbnb');
  const blocks = parseIcal(await response.text());
  const { error } = await supabase.rpc('replace_airbnb_blocks', { p_property_id: PROPERTY_ID, p_blocks: blocks });
  if (error) throw error;
}

async function sendMail(payload: Record<string, unknown>, bookingCode: string) {
  const key = Deno.env.get('RESEND_API_KEY');
  const owner = Deno.env.get('OWNER_EMAIL');
  const from = Deno.env.get('FROM_EMAIL');
  if (!key || !owner || !from) return;
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [owner], subject: `Nuova richiesta ${bookingCode}`, html: `<h2>Nuova richiesta D'Anzi House</h2><p>Codice: <strong>${bookingCode}</strong></p><p>${payload.firstName} ${payload.lastName}</p><p>${payload.checkIn} → ${payload.checkOut} · ${payload.guests} ospiti</p><p>${payload.email} · ${payload.phone}</p>` }),
  });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'POST') return Response.json({ ok:false, message:'Method not allowed' }, { status:405, headers:cors });
  try {
    const body = await req.json();
    if (!body.privacyAccepted) return Response.json({ ok:false, message:'Consenso privacy necessario.' }, { status:400, headers:cors });
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    await syncAirbnb(supabase);
    const { data, error } = await supabase.rpc('create_booking_request', {
      p_property_id: PROPERTY_ID,
      p_check_in: body.checkIn,
      p_check_out: body.checkOut,
      p_guests: Number(body.guests),
      p_first_name: body.firstName,
      p_last_name: body.lastName,
      p_email: body.email,
      p_phone: body.phone,
      p_message: body.message || null,
    });
    if (error) {
      const message = error.message.includes('DATES_NOT_AVAILABLE') ? 'Le date sono appena diventate non disponibili. Prova un altro periodo.' : error.message;
      return Response.json({ ok:false, message }, { status:409, headers:cors });
    }
    await sendMail(body, data);
    return Response.json({ ok:true, bookingCode:data }, { headers:cors });
  } catch (error) {
    return Response.json({ ok:false, message:error instanceof Error ? error.message : 'Errore durante la prenotazione.' }, { status:500, headers:cors });
  }
});
