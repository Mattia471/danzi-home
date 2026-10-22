import { Instagram, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { property } from '@/data/property';

export function Footer() {
  return (
    <footer className="bg-[#111] pb-28 pt-12 text-white md:py-14">
      <Container>
        <div className="mb-10 rounded-[1.65rem] bg-sage px-5 py-7 text-white sm:mb-12 sm:rounded-[2rem] sm:px-9 sm:py-8 md:flex md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/70 sm:text-xs">Hai già le date?</p>
            <p className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-4xl">Controlla la disponibilità in pochi secondi.</p>
          </div>
          <Link to="/prenota" className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-extrabold text-ink transition sm:w-auto md:mt-0 md:hover:-translate-y-0.5">Verifica le date</Link>
        </div>

        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr_1fr] md:gap-10">
          <div>
            <div className="inline-flex max-w-full rounded-[1.4rem] bg-white p-3 shadow-lg">
              <img src="/brand/logo-horizontal-1200.png" alt="D'Anzi House" className="h-12 w-auto max-w-[255px] object-contain sm:h-14 sm:max-w-[300px]" />
            </div>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/55">Una casa a Roma Monte Mario per chi ha bisogno di un posto bello, pratico e semplice da vivere.</p>
          </div>
          <div className="space-y-3 text-sm text-white/65">
            <p className="font-extrabold text-white">Contatti</p>
            <p className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 shrink-0" /> {property.address}</p>
            <a href={`tel:${property.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-white"><Phone size={15} /> {property.phone}</a>
          </div>
          <div className="space-y-3 text-sm text-white/65">
            <p className="font-extrabold text-white">Informazioni</p>
            <Link className="block hover:text-white" to="/privacy">Privacy & Cookie</Link>
            <a className="block hover:text-white" href={property.airbnbUrl} target="_blank" rel="noreferrer">Annuncio Airbnb</a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:pt-7">
          <span>© {new Date().getFullYear()} D’Anzi House. Tutti i diritti riservati.</span>
          <a href="https://www.instagram.com/mattiacucuzza_/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-white"><Instagram size={14} /> Sito sviluppato da @mattiacucuzza_</a>
        </div>
      </Container>
    </footer>
  );
}
