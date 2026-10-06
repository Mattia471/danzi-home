import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

function esc(value: string) { return value.replace(/\\/g,'\\\\').replace(/,/g,'\\,').replace(/;/g,'\\;').replace(/\n/g,'\\n'); }
function ymd(date: string) { return date.replaceAll('-', ''); }

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const propertyId = process.env.PROPERTY_ID || '00000000-0000-0000-0000-000000000001';
  if (!url || !key) return res.status(500).send('Supabase env missing');
  const supabase = createClient(url, key);
  const { data, error } = await supabase.from('bookings').select('id,booking_code,check_in,check_out').eq('property_id', propertyId).eq('status','confirmed').gte('check_out', new Date().toISOString().slice(0,10));
  if (error) return res.status(500).send(error.message);
  const events = (data || []).map((b) => [
    'BEGIN:VEVENT',
    `UID:${b.id}@danzihouse.it`,
    `DTSTART;VALUE=DATE:${ymd(b.check_in)}`,
    `DTEND;VALUE=DATE:${ymd(b.check_out)}`,
    `SUMMARY:${esc(`D'Anzi House ${b.booking_code}`)}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
  ].join('\r\n')).join('\r\n');
  const calendar = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//DAnzi House//Direct Booking//IT','CALSCALE:GREGORIAN',events,'END:VCALENDAR'].filter(Boolean).join('\r\n');
  res.setHeader('Content-Type','text/calendar; charset=utf-8');
  res.setHeader('Cache-Control','no-store, max-age=0');
  return res.status(200).send(calendar);
}
