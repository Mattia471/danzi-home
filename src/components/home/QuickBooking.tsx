import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarDays, Users } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export function QuickBooking() {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = new URLSearchParams({ checkIn, checkOut, guests });
    navigate(`/prenota?${q.toString()}`);
  };
  return (
    <section className="relative z-10 -mt-2 pb-8 lg:-mt-12">
      <Container>
        <form onSubmit={submit} className="grid gap-3 rounded-[1.8rem] bg-white p-4 shadow-soft md:grid-cols-[1fr_1fr_0.65fr_auto] md:items-end">
          <label className="block px-2"><span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink/50"><CalendarDays size={14}/> Check-in</span><input required type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="field" /></label>
          <label className="block px-2"><span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink/50"><CalendarDays size={14}/> Check-out</span><input required type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="field" /></label>
          <label className="block px-2"><span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink/50"><Users size={14}/> Ospiti</span><select className="field" value={guests} onChange={(e) => setGuests(e.target.value)}>{[1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}</select></label>
          <button className="flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-ink px-6 text-sm font-bold text-white transition hover:bg-moss">Continua <ArrowRight size={17}/></button>
        </form>
      </Container>
    </section>
  );
}
