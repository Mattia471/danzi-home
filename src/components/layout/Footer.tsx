import { Instagram, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { property } from '@/data/property';

export function Footer() {
  return (
    <footer className="bg-ink py-14 text-white">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="font-display text-4xl font-semibold">D’Anzi House</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/60">Una casa accogliente a Roma Monte Mario, pensata per soggiorni di cura, lavoro, studio e tempo da vivere con tranquillità.</p>
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <p className="font-bold text-white">Contatti</p>
            <p className="flex items-center gap-2"><MapPin size={15} /> {property.address}</p>
            <a href={`tel:${property.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-white"><Phone size={15} /> {property.phone}</a>
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <p className="font-bold text-white">Informazioni</p>
            <Link className="block hover:text-white" to="/privacy">Privacy & Cookie</Link>
            <a className="block hover:text-white" href={property.airbnbUrl} target="_blank" rel="noreferrer">Annuncio Airbnb</a>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} D’Anzi House. Tutti i diritti riservati.</span>
          <a href="https://www.instagram.com/mattiacucuzza_/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-white"><Instagram size={14} /> Sito sviluppato da @mattiacucuzza_</a>
        </div>
      </Container>
    </footer>
  );
}
