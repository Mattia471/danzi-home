import { FormEvent, useMemo, useState, type ReactNode } from 'react';
import { addDays, differenceInCalendarDays, format, parseISO } from 'date-fns';
import { it } from 'date-fns/locale';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  CreditCard,
  LockKeyhole,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import {
  createDemoBooking,
  resetDemoBookings,
  searchDemoAvailability,
  type DemoBooking,
  type DemoQuote,
} from '@/services/demoBooking';
import { buildKrossBookingUrl, isKrossDemoMode } from '@/services/krossBooking';

type Step = 'search' | 'details' | 'success';

const currency = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' });

export function BookingPage() {
  const [params] = useSearchParams();
  const demoMode = isKrossDemoMode();
  const [step, setStep] = useState<Step>('search');
  const [checkIn, setCheckIn] = useState(params.get('checkIn') || '');
  const [checkOut, setCheckOut] = useState(params.get('checkOut') || '');
  const [guests, setGuests] = useState(Number(params.get('guests') || 2));
  const [quote, setQuote] = useState<DemoQuote | null>(null);
  const [booking, setBooking] = useState<DemoBooking | null>(null);
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  const today = format(new Date(), 'yyyy-MM-dd');
  const minimumCheckOut = checkIn ? format(addDays(parseISO(checkIn), 1), 'yyyy-MM-dd') : today;
  const nights = useMemo(
    () => checkIn && checkOut ? Math.max(0, differenceInCalendarDays(parseISO(checkOut), parseISO(checkIn))) : 0,
    [checkIn, checkOut],
  );

  const formattedStay = checkIn && checkOut && nights > 0
    ? `${format(parseISO(checkIn), 'd MMM', { locale: it })} → ${format(parseISO(checkOut), 'd MMM yyyy', { locale: it })}`
    : 'Scegli le date';

  function runAvailabilityCheck(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setQuote(null);

    if (!checkIn || !checkOut || nights < 1) {
      setError('Scegli una data di arrivo e una data di partenza valide.');
      return;
    }

    if (!demoMode) {
      const destination = buildKrossBookingUrl({ checkIn, checkOut, guests });
      if (!destination) {
        setError('Il Booking Engine non è ancora configurato. Attiva la modalità demo oppure inserisci l’URL Kross Booking.');
        return;
      }
      window.location.assign(destination);
      return;
    }

    setChecking(true);
    window.setTimeout(() => {
      const result = searchDemoAvailability({ checkIn, checkOut, guests });
      setChecking(false);

      if (!result.available) {
        const start = format(parseISO(result.conflict.checkIn), 'd MMM', { locale: it });
        const end = format(parseISO(result.conflict.checkOut), 'd MMM', { locale: it });
        setError(`Queste date si sovrappongono a un soggiorno già presente (${start} → ${end}). Prova un altro periodo.`);
        return;
      }

      setQuote(result.quote);
      setStep('details');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 650);
  }

  function confirmDemoBooking(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!quote) return;

    const fd = new FormData(e.currentTarget);
    const firstName = String(fd.get('firstName') || '').trim();
    const lastName = String(fd.get('lastName') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const phone = String(fd.get('phone') || '').trim();
    const notes = String(fd.get('notes') || '').trim();

    if (!firstName || !lastName || !email || !phone) {
      setError('Compila i dati richiesti per proseguire.');
      return;
    }

    const result = createDemoBooking(
      { checkIn, checkOut, guests },
      { firstName, lastName, email, phone, notes },
      quote,
    );

    setBooking(result);
    setError('');
    setStep('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function restartDemo() {
    setStep('search');
    setQuote(null);
    setBooking(null);
    setError('');
    setCheckIn('');
    setCheckOut('');
    setGuests(2);
  }

  function clearDemoData() {
    resetDemoBookings();
    restartDemo();
  }

  const progressIndex = step === 'search' ? 1 : step === 'details' ? 2 : 3;

  return (
    <section className="bg-[#fffdf9] py-6 sm:py-12 lg:py-18">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-sage/10 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-sage">
              <Sparkles size={13}/>
              {demoMode ? 'Demo prenotazione interattiva' : 'Prenotazione diretta'}
            </div>
            {demoMode && (
              <button onClick={clearDemoData} type="button" className="inline-flex items-center gap-1.5 text-xs font-bold text-ink/45 transition hover:text-ink">
                <RotateCcw size={13}/> Reimposta demo
              </button>
            )}
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-black/5 bg-white p-2 shadow-sm sm:max-w-xl">
            {['Date', 'Dettagli', 'Conferma'].map((label, index) => {
              const number = index + 1;
              const active = progressIndex === number;
              const completed = progressIndex > number;
              return (
                <div key={label} className={`flex min-h-11 items-center justify-center gap-2 rounded-xl px-2 text-xs font-extrabold transition ${active ? 'bg-sage text-white' : completed ? 'bg-sage/10 text-sage' : 'text-ink/35'}`}>
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${active ? 'bg-white/20' : completed ? 'bg-sage text-white' : 'bg-black/5'}`}>
                    {completed ? <Check size={12}/> : number}
                  </span>
                  <span>{label}</span>
                </div>
              );
            })}
          </div>

          {step === 'success' && booking ? (
            <div className="mt-7 overflow-hidden rounded-[1.8rem] border border-black/5 bg-white shadow-card sm:mt-10 sm:rounded-[2.2rem]">
              <div className="bg-cocoa px-5 py-8 text-white sm:px-10 sm:py-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sun text-ink"><CheckCircle2 size={28}/></div>
                <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-white/55">Prenotazione demo confermata</p>
                <h1 className="mt-2 font-display text-4xl font-extrabold leading-none tracking-[-0.04em] sm:text-6xl">Perfetto, ci vediamo a Roma.</h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">La simulazione è completata. Le date appena prenotate vengono ora considerate occupate anche nei prossimi controlli della demo.</p>
              </div>

              <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[1fr_0.75fr] lg:p-10">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-ink/40">Codice prenotazione</p>
                  <p className="mt-2 font-display text-3xl font-extrabold tracking-tight text-sage">{booking.code}</p>

                  <div className="mt-7 grid grid-cols-2 gap-3">
                    <SummaryItem label="Soggiorno" value={`${format(parseISO(booking.checkIn), 'd MMM', { locale: it })} → ${format(parseISO(booking.checkOut), 'd MMM', { locale: it })}`} />
                    <SummaryItem label="Ospiti" value={`${booking.guests}`} />
                    <SummaryItem label="Notti" value={`${booking.nights}`} />
                    <SummaryItem label="Totale demo" value={currency.format(booking.total)} />
                  </div>

                  <div className="mt-6 rounded-2xl bg-cream p-4 text-sm leading-6 text-ink/60">
                    <strong className="text-ink">{booking.firstName} {booking.lastName}</strong><br/>
                    {booking.email}<br/>
                    {booking.phone}
                  </div>
                </div>

                <div className="rounded-[1.5rem] bg-sun/35 p-5 sm:p-6">
                  <LockKeyhole size={22}/>
                  <p className="mt-5 font-display text-2xl font-extrabold tracking-tight">Cosa succederà con Kross</p>
                  <p className="mt-3 text-xs leading-6 text-ink/60">In produzione, disponibilità, prezzo, pagamento, conferma e aggiornamento dei canali verranno gestiti dal Booking Engine e dal Channel Manager Kross Booking.</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-black/6 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <button type="button" onClick={restartDemo} className="min-h-12 rounded-full border border-black/10 px-6 text-sm font-extrabold transition hover:bg-cream">Nuova simulazione</button>
                <p className="text-center text-[11px] leading-5 text-ink/40 sm:text-right">Demo locale: nessun pagamento o invio reale è stato effettuato.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-7 max-w-3xl sm:mt-10">
                <p className="eyebrow">Prenotazione diretta</p>
                <h1 className="mt-3 font-display text-[2.65rem] font-extrabold leading-[0.94] tracking-[-0.045em] sm:text-6xl">
                  {step === 'search' ? 'Scegli le date. Al resto pensiamo noi.' : 'Ultimo passaggio, poi la casa è tua.'}
                </h1>
                <p className="mt-4 max-w-2xl text-[15px] leading-7 text-ink/60 sm:mt-5 sm:text-base">
                  {step === 'search'
                    ? 'Per la demo simuliamo il comportamento del Booking Engine: disponibilità, tariffa e date già occupate.'
                    : 'Inserisci i dati principali dell’ospite. In produzione questo passaggio sarà gestito direttamente dal Booking Engine Kross.'}
                </p>
              </div>

              <div className="mt-7 grid gap-5 lg:mt-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
                {step === 'search' ? (
                  <form onSubmit={runAvailabilityCheck} className="rounded-[1.7rem] border border-black/5 bg-white p-4 shadow-card sm:rounded-[2rem] sm:p-7 lg:p-8">
                    <div className="mb-5 flex items-center justify-between gap-4 border-b border-black/7 pb-5">
                      <div>
                        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-ink/40">Il tuo soggiorno</p>
                        <p className="mt-1 font-display text-2xl font-extrabold tracking-tight">{formattedStay}</p>
                      </div>
                      {nights > 0 && <span className="shrink-0 rounded-full bg-sun/45 px-3 py-2 text-xs font-extrabold text-ink">{nights} {nights === 1 ? 'notte' : 'notti'}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                      <DateField label="Arrivo" min={today} value={checkIn} onChange={(value) => {
                        setCheckIn(value);
                        setError('');
                        if (checkOut && value >= checkOut) setCheckOut('');
                      }} />
                      <DateField label="Partenza" min={minimumCheckOut} value={checkOut} onChange={(value) => { setCheckOut(value); setError(''); }} />
                    </div>

                    <label className="mt-3 flex min-h-[64px] items-center justify-between gap-4 rounded-2xl border border-black/7 px-4 sm:mt-4 sm:px-5">
                      <span className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/10 text-sage"><Users size={18}/></span>
                        <span><span className="block text-sm font-extrabold">Ospiti</span><span className="mt-0.5 block text-xs text-ink/45">Massimo 4 persone</span></span>
                      </span>
                      <select aria-label="Numero ospiti" className="min-h-11 rounded-xl border border-black/10 bg-white px-3 text-base font-extrabold outline-none focus:border-sage" value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                        {[1,2,3,4].map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </label>

                    {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold leading-6 text-red-700">{error}</p>}

                    <button disabled={checking} className="mt-5 flex min-h-[58px] w-full items-center justify-center gap-2 rounded-2xl bg-sage px-6 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(255,104,70,0.22)] transition active:scale-[0.99] disabled:cursor-wait disabled:opacity-70 sm:mt-6 sm:hover:bg-clay">
                      {checking ? 'Controllo disponibilità…' : <>Verifica disponibilità <ArrowRight size={18}/></>}
                    </button>

                    {demoMode && <p className="mt-3 text-center text-[11px] leading-5 text-ink/40">Alcune date sono volutamente occupate per rendere realistica la dimostrazione.</p>}
                  </form>
                ) : (
                  <form onSubmit={confirmDemoBooking} className="rounded-[1.7rem] border border-black/5 bg-white p-4 shadow-card sm:rounded-[2rem] sm:p-7 lg:p-8">
                    <button type="button" onClick={() => { setStep('search'); setError(''); }} className="mb-5 inline-flex items-center gap-2 text-xs font-extrabold text-ink/50 hover:text-ink"><ArrowLeft size={15}/> Modifica date</button>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <InputField name="firstName" label="Nome" autoComplete="given-name" placeholder="Mattia" />
                      <InputField name="lastName" label="Cognome" autoComplete="family-name" placeholder="Cucuzza" />
                      <InputField name="email" label="Email" type="email" autoComplete="email" placeholder="nome@email.it" />
                      <InputField name="phone" label="Telefono" type="tel" autoComplete="tel" placeholder="+39 333 1234567" />
                    </div>

                    <label className="mt-3 block">
                      <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink/45">Richieste particolari <span className="normal-case tracking-normal text-ink/30">(facoltativo)</span></span>
                      <textarea name="notes" className="field min-h-24 resize-y text-base" placeholder="Es. arrivo in tarda serata, due letti singoli…" />
                    </label>

                    <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-2xl bg-cream/65 p-4 text-xs leading-5 text-ink/60">
                      <input required type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-[#FF6846]" />
                      <span>Confermo di voler simulare la prenotazione e di aver preso visione dell’informativa privacy.</span>
                    </label>

                    {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}

                    <button className="mt-5 flex min-h-[58px] w-full items-center justify-center gap-2 rounded-2xl bg-sage px-6 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(255,104,70,0.22)] transition active:scale-[0.99] sm:hover:bg-clay">
                      Conferma prenotazione demo <ArrowRight size={18}/>
                    </button>
                  </form>
                )}

                <aside className="lg:sticky lg:top-28">
                  {step === 'details' && quote ? (
                    <div className="overflow-hidden rounded-[1.6rem] border border-black/7 bg-white shadow-sm">
                      <div className="bg-cocoa p-5 text-white sm:p-6">
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/50">Riepilogo</p>
                        <p className="mt-2 font-display text-2xl font-extrabold tracking-tight">{formattedStay}</p>
                        <p className="mt-1 text-xs text-white/55">{guests} {guests === 1 ? 'ospite' : 'ospiti'} · {quote.nights} {quote.nights === 1 ? 'notte' : 'notti'}</p>
                      </div>
                      <div className="space-y-3 p-5 text-sm sm:p-6">
                        <PriceRow label={`${quote.nights} notti`} value={currency.format(quote.accommodationTotal)} />
                        {quote.discount > 0 && <PriceRow label="Sconto soggiorno lungo" value={`− ${currency.format(quote.discount)}`} highlight />}
                        <PriceRow label="Pulizia finale" value={currency.format(quote.cleaningFee)} />
                        <div className="h-px bg-black/7" />
                        <div className="flex items-end justify-between gap-3"><span className="font-extrabold">Totale demo</span><span className="font-display text-3xl font-extrabold tracking-tight">{currency.format(quote.total)}</span></div>
                        <p className="text-[10px] leading-5 text-ink/40">Tariffa puramente dimostrativa. Prezzi, tasse e condizioni reali arriveranno da Kross Booking.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                      <InfoCard icon={<ShieldCheck size={22} className="text-sun"/>} title="Disponibilità sincronizzata" text="La demo simula un calendario unico con date già occupate e nuove prenotazioni." dark />
                      <InfoCard icon={<CreditCard size={22}/>} title="Prezzo immediato" text="Dopo il controllo mostriamo un preventivo simulato prima di chiedere i dati dell’ospite." yellow />
                      <InfoCard icon={<CalendarDays size={22} className="text-sage"/>} title="Pensato per mobile" text="Tre passaggi chiari, campi grandi e nessuna informazione superflua prima del momento giusto." />
                    </div>
                  )}
                </aside>
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}

function DateField({ label, min, value, onChange }: { label: string; min: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="min-w-0 rounded-2xl bg-cream/65 p-3 sm:p-4">
      <span className="mb-2 flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-ink/45 sm:text-[10px]"><CalendarDays size={14}/> {label}</span>
      <input className="min-h-9 w-full min-w-0 border-0 bg-transparent p-0 text-base font-extrabold outline-none" required type="date" min={min} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function InputField({ name, label, type = 'text', autoComplete, placeholder }: { name: string; label: string; type?: string; autoComplete?: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink/45">{label}</span>
      <input required name={name} type={type} autoComplete={autoComplete} placeholder={placeholder} className="field min-h-[54px] text-base" />
    </label>
  );
}

function PriceRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return <div className={`flex items-center justify-between gap-3 ${highlight ? 'font-bold text-sage' : 'text-ink/60'}`}><span>{label}</span><span className="font-bold">{value}</span></div>;
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-black/7 p-4"><p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-ink/40">{label}</p><p className="mt-2 text-sm font-extrabold">{value}</p></div>;
}

function InfoCard({ icon, title, text, dark = false, yellow = false }: { icon: ReactNode; title: string; text: string; dark?: boolean; yellow?: boolean }) {
  const classes = dark ? 'bg-cocoa text-white' : yellow ? 'bg-sun text-ink' : 'border border-black/7 bg-white text-ink';
  const body = dark ? 'text-white/65' : 'text-ink/55';
  return <div className={`rounded-[1.5rem] p-5 sm:p-6 ${classes}`}>{icon}<p className="mt-7 font-display text-2xl font-extrabold tracking-tight">{title}</p><p className={`mt-2 text-xs leading-6 ${body}`}>{text}</p></div>;
}
