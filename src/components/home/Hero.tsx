import { ArrowRight, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { property } from '@/data/property';

export function Hero() {
  return (
    <section className="bg-white px-2 pb-3 pt-2 sm:px-4 sm:pb-5 sm:pt-4">
      <div className="relative min-h-[72svh] overflow-hidden rounded-[1.55rem] bg-ink sm:min-h-[78vh] sm:rounded-[2.6rem] lg:min-h-[82vh]">
        <img
          src="/images/terrace-demo.webp"
          alt="Terrazza di D'Anzi House, immagine dimostrativa"
          className="absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />

        <Container className="relative flex min-h-[72svh] flex-col justify-end pb-9 pt-20 text-white sm:min-h-[78vh] sm:pb-20 lg:min-h-[82vh] lg:pb-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/20 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] backdrop-blur-md sm:px-4 sm:text-xs sm:normal-case sm:tracking-normal">
              <MapPin size={13} /> Roma · Monte Mario · Gemelli
            </div>
            <h1 className="mt-5 max-w-[900px] font-display text-[2.65rem] font-extrabold leading-[0.95] tracking-[-0.055em] text-white sm:mt-6 sm:text-6xl md:text-7xl lg:text-[5.7rem]">
              A Roma, con il comfort di casa.
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] font-medium leading-7 text-white/82 sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
              Uno spazio indipendente e accogliente per soggiorni di cura, lavoro e studio, con 90 m² di terrazza privata da vivere davvero.
            </p>
            <div className="mt-6 grid gap-2.5 sm:mt-8 sm:flex sm:flex-wrap sm:gap-3">
              <Button to="/prenota" className="w-full sm:w-auto">Verifica disponibilità <ArrowRight className="ml-2" size={17} /></Button>
              <Button to="/la-casa" variant="light" className="w-full sm:w-auto">Scopri la casa</Button>
            </div>

            <div className="mt-5 flex items-center gap-3 text-xs font-bold text-white/80 sm:hidden">
              <span className="inline-flex items-center gap-1"><Star size={14} fill="currentColor" /> {property.rating}</span>
              <span className="h-4 w-px bg-white/25" />
              <span>{property.reviews} recensioni</span>
              <span className="h-4 w-px bg-white/25" />
              <span>Superhost</span>
            </div>
          </div>

          <div className="absolute bottom-7 right-7 hidden items-center gap-3 rounded-2xl border border-white/20 bg-black/25 px-4 py-3 backdrop-blur-md sm:flex lg:right-10">
            <span className="flex items-center gap-1 text-sm font-extrabold"><Star size={15} fill="currentColor" /> {property.rating}</span>
            <span className="h-5 w-px bg-white/25" />
            <span className="text-xs font-semibold text-white/75">{property.reviews} recensioni · Superhost</span>
          </div>
        </Container>

        <div className="absolute right-5 top-5 hidden rounded-[1.4rem] bg-sun px-5 py-4 text-ink shadow-card md:block">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.19em]">Il suo spazio speciale</p>
          <p className="mt-1 font-display text-2xl font-extrabold tracking-tight">90 m² di terrazza privata</p>
        </div>
      </div>
    </section>
  );
}
