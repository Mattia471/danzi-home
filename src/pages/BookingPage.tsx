import { FormEvent, useEffect, useMemo, useState } from 'react';
import { differenceInCalendarDays, format, parseISO } from 'date-fns';
import { it } from 'date-fns/locale';
import { CalendarCheck, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { createBookingRequest } from '@/services/booking';
import { getCalendarBlocks } from '@/services/availability';
import type { CalendarBlock } from '@/types';

function overlaps(start: string, end: string, block: CalendarBlock) {
  return start < block.end_date && end > block.start_date;
}

export function BookingPage() {
  const [params] = useSearchParams();
  const [blocks, setBlocks] = useState<CalendarBlock[]>([]);
  const [checkIn, setCheckIn] = useState(params.get('checkIn') || '');
  const [checkOut, setCheckOut] = useState(params.get('checkOut') || '');
  const [guests, setGuests] = useState(Number(params.get('guests') || 2));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ code: string; demo: boolean } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => { getCalendarBlocks().then(setBlocks).catch(() => undefined); }, []);
  const nights = useMemo(() => checkIn && checkOut ? Math.max(0, differenceInCalendarDays(parseISO(checkOut), parseISO(checkIn))) : 0, [checkIn, checkOut]);
  const unavailable = Boolean(checkIn && checkOut && blocks.some((b) => overlaps(checkIn, checkOut, b)));

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    if (!checkIn || !checkOut || nights < 1) return setError('Seleziona date valide.');
    if (unavailable) return setError('Le date selezionate risultano già occupate.');
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    try {
      const response = await createBookingRequest({
        checkIn, checkOut, guests,
        firstName: String(fd.get('firstName') || ''),
        lastName: String(fd.get('lastName') || ''),
        email: String(fd.get('email') || ''),
        phone: String(fd.get('phone') || ''),
        message: String(fd.get('message') || ''),
        privacyAccepted: fd.get('privacy') === 'on',
      });
      setResult({ code: response.bookingCode, demo: response.demo });
    } catch (err) { setError(err instanceof Error ? err.message : 'Si è verificato un errore.'); }
    finally { setLoading(false); }
  }

  if (result) return <section className="py-24"><Container className="max-w-2xl"><div className="rounded-[2rem] bg-white p-8 text-center shadow-soft md:p-12"><CheckCircle2 className="mx-auto text-moss" size={48}/><p className="eyebrow mt-6">Richiesta inviata</p><h1 className="mt-3 font-display text-5xl font-semibold">Ci siamo.</h1><p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-ink/65">Abbiamo ricevuto la tua richiesta. Il proprietario verificherà definitivamente la disponibilità e ti contatterà per la conferma.</p><div className="mx-auto mt-7 w-fit rounded-2xl bg-cream px-5 py-4"><span className="text-xs text-ink/50">Codice richiesta</span><strong className="ml-3">{result.code}</strong></div>{result.demo && <p className="mt-5 text-xs text-clay">Modalità demo: collega Supabase per salvare realmente la prenotazione.</p>}</div></Container></section>;

  return (
    <section className="py-14 lg:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">Prenotazione diretta</p>
            <h1 className="mt-3 font-display text-5xl font-semibold leading-none">Quando vuoi sentirti a casa?</h1>
            <p className="mt-5 text-sm leading-7 text-ink/65">Invia una richiesta senza impegno. Prima della conferma controlliamo anche il calendario Airbnb per ridurre al minimo il rischio di sovrapposizioni.</p>
            <div className="mt-8 space-y-3">
              <div className="flex gap-3 rounded-2xl bg-white p-4"><ShieldCheck size={20}/><div><p className="text-sm font-bold">Date controllate</p><p className="mt-1 text-xs leading-5 text-ink/55">La richiesta viene verificata sul calendario interno e su Airbnb.</p></div></div>
              <div className="flex gap-3 rounded-2xl bg-white p-4"><CalendarCheck size={20}/><div><p className="text-sm font-bold">Nessun pagamento automatico</p><p className="mt-1 text-xs leading-5 text-ink/55">La richiesta viene prima confermata dal proprietario.</p></div></div>
            </div>
          </div>
          <form onSubmit={submit} className="rounded-[2rem] bg-white p-6 shadow-soft md:p-9">
            <div className="grid gap-4 sm:grid-cols-2">
              <label><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink/50">Check-in</span><input className="field" required type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} /></label>
              <label><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink/50">Check-out</span><input className="field" required type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)} /></label>
              <label><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink/50">Ospiti</span><select className="field" value={guests} onChange={e=>setGuests(Number(e.target.value))}>{[1,2,3,4].map(n=><option key={n}>{n}</option>)}</select></label>
              <div className="rounded-2xl bg-cream p-4"><span className="text-xs font-bold uppercase tracking-wider text-ink/50">Soggiorno</span><p className="mt-2 font-display text-2xl font-semibold">{nights || '—'} {nights === 1 ? 'notte' : 'notti'}</p></div>
            </div>
            {unavailable && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">Una o più date selezionate non sono disponibili.</p>}
            <div className="my-7 h-px bg-black/8" />
            <div className="grid gap-4 sm:grid-cols-2">
              <input className="field" name="firstName" required placeholder="Nome" />
              <input className="field" name="lastName" required placeholder="Cognome" />
              <input className="field" name="email" required type="email" placeholder="Email" />
              <input className="field" name="phone" required type="tel" placeholder="Telefono" />
              <textarea className="field min-h-28 sm:col-span-2" name="message" placeholder="Messaggio o richieste particolari (facoltativo)" />
            </div>
            <label className="mt-5 flex items-start gap-3 text-xs leading-5 text-ink/60"><input required name="privacy" type="checkbox" className="mt-1" /> Ho letto l’informativa privacy e acconsento al trattamento dei dati necessario per gestire la richiesta.</label>
            {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <button disabled={loading || unavailable} className="mt-6 w-full rounded-2xl bg-ink px-6 py-4 text-sm font-bold text-white transition hover:bg-moss disabled:cursor-not-allowed disabled:opacity-50">{loading ? 'Controllo disponibilità…' : 'Invia richiesta di prenotazione'}</button>
            {checkIn && checkOut && nights > 0 && !unavailable && <p className="mt-4 text-center text-xs text-ink/45">{format(parseISO(checkIn), 'd MMMM', { locale: it })} → {format(parseISO(checkOut), 'd MMMM yyyy', { locale: it })}</p>}
          </form>
        </div>
      </Container>
    </section>
  );
}
