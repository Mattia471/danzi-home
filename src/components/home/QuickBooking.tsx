import { FormEvent, useState } from 'react';
import { addDays, format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarDays, Users } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export function QuickBooking() {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const today = format(new Date(), 'yyyy-MM-dd');
  const minimumCheckOut = checkIn ? format(addDays(parseISO(checkIn), 1), 'yyyy-MM-dd') : today;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = new URLSearchParams({ checkIn, checkOut, guests });
    navigate(`/prenota?${q.toString()}`);
  };

  return (
    <section className="relative z-20 pb-5 pt-2 sm:-mt-16 sm:pb-8 sm:pt-0 lg:-mt-20">
      <Container>
        <form onSubmit={submit} className="rounded-[1.55rem] border border-black/5 bg-white p-3 shadow-card sm:rounded-[1.8rem] md:grid md:grid-cols-[1fr_1fr_0.62fr_auto] md:items-end md:gap-2 md:p-4">
          <div className="grid grid-cols-2 gap-2 md:contents">
            <label className="block rounded-2xl bg-cream/60 px-3 py-3 transition md:bg-transparent md:py-2 md:hover:bg-cream">
              <span className="mb-2 flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-ink/45 sm:text-[10px] sm:tracking-[0.18em]"><CalendarDays size={13}/> Arrivo</span>
              <input
                required
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => {
                  const value = e.target.value;
                  setCheckIn(value);
                  if (checkOut && value >= checkOut) setCheckOut('');
                }}
                className="min-h-8 w-full min-w-0 border-0 bg-transparent p-0 text-[13px] font-bold outline-none sm:text-sm"
              />
            </label>
            <label className="block rounded-2xl bg-cream/60 px-3 py-3 transition md:bg-transparent md:py-2 md:hover:bg-cream">
              <span className="mb-2 flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-ink/45 sm:text-[10px] sm:tracking-[0.18em]"><CalendarDays size={13}/> Partenza</span>
              <input
                required
                type="date"
                min={minimumCheckOut}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="min-h-8 w-full min-w-0 border-0 bg-transparent p-0 text-[13px] font-bold outline-none sm:text-sm"
              />
            </label>
          </div>
          <label className="mt-2 block rounded-2xl bg-cream/60 px-3 py-3 transition md:mt-0 md:bg-transparent md:py-2 md:hover:bg-cream">
            <span className="mb-2 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink/45"><Users size={14}/> Ospiti</span>
            <select className="min-h-8 w-full border-0 bg-transparent p-0 text-sm font-bold outline-none" value={guests} onChange={(e) => setGuests(e.target.value)}>{[1,2,3,4].map(n => <option key={n} value={n}>{n} {n === 1 ? 'ospite' : 'ospiti'}</option>)}</select>
          </label>
          <button className="mt-2 flex min-h-[56px] w-full items-center justify-center gap-2 rounded-[1.15rem] bg-sage px-7 text-sm font-extrabold text-white shadow-[0_12px_30px_rgba(255,104,70,0.22)] transition active:scale-[0.99] md:mt-0 md:w-auto md:hover:-translate-y-0.5 md:hover:bg-clay">Verifica le date <ArrowRight size={17}/></button>
        </form>
      </Container>
    </section>
  );
}
