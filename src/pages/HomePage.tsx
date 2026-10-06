import { ArrowRight, HeartHandshake, MapPin, Star } from 'lucide-react';
import { Hero } from '@/components/home/Hero';
import { QuickBooking } from '@/components/home/QuickBooking';
import { Gallery } from '@/components/home/Gallery';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { amenities, audiences, property } from '@/data/property';

export function HomePage() {
  return (
    <>
      <Hero />
      <QuickBooking />

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8">
            {amenities.map(({ icon: Icon, label }) => <div key={label} className="rounded-2xl border border-black/5 bg-white/55 p-4 text-center"><Icon className="mx-auto" size={20}/><p className="mt-3 text-xs font-semibold leading-5">{label}</p></div>)}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <SectionHeading eyebrow="Un soggiorno che ha senso" title="Qui non sei solo di passaggio." text="D’Anzi House nasce per offrire la semplicità di una casa vera a chi ha bisogno di fermarsi a Roma con tempi e necessità diverse." align="center" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {audiences.map((item, i) => <article key={item.title} className="rounded-[1.8rem] bg-cream p-7 lg:p-9"><span className="font-display text-5xl text-sage/40">0{i+1}</span><h3 className="mt-5 font-display text-3xl font-semibold">{item.title}</h3><p className="mt-4 text-sm leading-7 text-ink/65">{item.text}</p></article>)}
          </div>
        </Container>
      </section>

      <Gallery />

      <section className="pb-20 lg:pb-28">
        <Container className="grid gap-8 overflow-hidden rounded-[2.2rem] bg-moss p-7 text-white md:grid-cols-[1.05fr_0.95fr] md:p-12 lg:p-16">
          <div>
            <p className="eyebrow !text-white/60">Una posizione pratica</p>
            <h2 className="section-title mt-3">Gemelli, Monte Mario e Roma a portata di giornata.</h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/70">Via Dego è in un quartiere residenziale con supermercati, farmacie e servizi quotidiani. La stazione Roma Balduina e diverse linee bus rendono semplici gli spostamenti.</p>
            <Button to="/posizione" variant="light" className="mt-8">Scopri la posizione <ArrowRight className="ml-2" size={17}/></Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.7rem] bg-white/10 p-6"><HeartHandshake size={24}/><p className="mt-12 text-3xl font-display font-semibold">Ospitalità attenta</p><p className="mt-2 text-sm text-white/65">Un host presente e un check-in apprezzato dagli ospiti.</p></div>
            <div className="rounded-[1.7rem] bg-white/10 p-6"><Star size={24}/><p className="mt-12 text-3xl font-display font-semibold">{property.rating}/5</p><p className="mt-2 text-sm text-white/65">Valutazione media su {property.reviews} recensioni Airbnb.</p></div>
            <div className="rounded-[1.7rem] bg-white/10 p-6 sm:col-span-2"><MapPin size={24}/><p className="mt-7 font-display text-3xl font-semibold">Via Dego 4 · Roma</p><p className="mt-2 text-sm text-white/65">Monte Mario, vicino a Gemelli e San Filippo Neri.</p></div>
          </div>
        </Container>
      </section>

      <section className="bg-sand py-20">
        <Container className="text-center">
          <p className="eyebrow">Il tuo soggiorno a Roma</p>
          <h2 className="mx-auto mt-3 max-w-3xl font-display text-5xl font-semibold tracking-tight md:text-6xl">Trova le date giuste. Al resto pensiamo insieme.</h2>
          <Button to="/prenota" className="mt-8">Verifica disponibilità</Button>
        </Container>
      </section>
    </>
  );
}
