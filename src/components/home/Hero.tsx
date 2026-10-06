import { ArrowRight, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { property } from '@/data/property';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-sand">
      <Container className="grid min-h-[78vh] items-stretch gap-0 py-6 lg:grid-cols-[0.88fr_1.12fr] lg:py-8">
        <div className="flex flex-col justify-center rounded-t-[2rem] bg-cream p-7 sm:p-12 lg:rounded-l-[2.2rem] lg:rounded-tr-none lg:p-14">
          <div className="pill w-fit"><MapPin size={14} /> Roma · Monte Mario</div>
          <h1 className="display-title mt-8">Sentirsi a casa, anche lontano da casa.</h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-ink/65">Un appartamento curato e indipendente vicino al Policlinico Gemelli, pensato per chi arriva a Roma per cura, lavoro, studio o semplicemente per viverla con più calma.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button to="/prenota">Verifica disponibilità <ArrowRight className="ml-2" size={17} /></Button>
            <Button to="/la-casa" variant="ghost">Scopri la casa</Button>
          </div>
          <div className="mt-10 flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 font-bold"><Star size={16} fill="currentColor" /> {property.rating}</span>
            <span className="h-4 w-px bg-black/15" />
            <span className="text-ink/60">{property.reviews} recensioni Airbnb</span>
            <span className="h-4 w-px bg-black/15" />
            <span className="text-ink/60">Superhost</span>
          </div>
        </div>
        <div className="relative min-h-[420px] overflow-hidden rounded-b-[2rem] lg:min-h-full lg:rounded-r-[2.2rem] lg:rounded-bl-none">
          <img src="/images/hero.svg" alt="D'Anzi House" className="h-full w-full object-cover" />
          <div className="absolute bottom-5 left-5 rounded-2xl bg-white/90 px-5 py-4 backdrop-blur">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink/50">Il dettaglio che cambia il soggiorno</p>
            <p className="mt-1 font-display text-2xl font-semibold">90 m² di terrazza privata</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
