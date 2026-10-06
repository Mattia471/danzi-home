import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { BookingRequest } from '@/types';

export async function createBookingRequest(payload: BookingRequest) {
  if (!isSupabaseConfigured || !supabase) {
    await new Promise((resolve) => setTimeout(resolve, 650));
    return { bookingCode: 'DEMO-' + Date.now().toString().slice(-6), demo: true };
  }

  const { data, error } = await supabase.functions.invoke('create-booking', {
    body: payload,
  });

  if (error) throw error;
  if (!data?.ok) throw new Error(data?.message || 'Impossibile inviare la richiesta.');
  return { bookingCode: data.bookingCode as string, demo: false };
}
