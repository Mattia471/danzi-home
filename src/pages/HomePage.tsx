import { ArrowRight, HeartHandshake, MapPin, Star } from 'lucide-react';
import { Hero } from '@/components/home/Hero';
import { QuickBooking } from '@/components/home/QuickBooking';
import { Gallery } from '@/components/home/Gallery';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { amenities, audiences, property } from '@/data/property';

const audienceStyles = [
  'bg-sage text-white',
  'bg-sun text-ink',
  'bg-cocoa text-white',
];

export function HomePage() {
  return (
    <>
      <Hero />
      <QuickBooking />

      <section className="pb-12 pt-4 sm:pb-16 sm:pt-8">
        <Container>
          <div className="-mx-5 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-4 md:px-0 lg:grid-cols-8">
            {amenities.map(({ icon: Icon, label }) => (
              <div key={label} className="min-w-[126px] snap-start rounded-[1.2rem] border border-black/8 bg-white p-4 text-left transition md:min-w-0 md:rounded-[1.35rem] md:hover:-translate-y-1 md:hover:shadow-card">
                <Icon size={19} className="text-sage"/>
                <p className="mt-4 text-[11px] font-bold leading-5 sm:mt-5 sm:text-xs">{label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20 lg:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-10">
            <div>
              <p className="eyebrow">Non il solito alloggio</p>
              <h2 className="section-title mt-4">Una casa che si adatta al motivo per cui sei a Roma.</h2>
            </div>
            <p className="max-w-2xl text-[15px] leading-7 text-ink/60 sm:text-base sm:leading-8 lg:justify-self-end">Per un familiare, un turno in ospedale, l’università o qualche giorno in città: qui trovi autonomia, spazio e una quotidianità semplice.</p>
          </div>

          <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:px-0 md:pb-0 lg:mt-12 lg:gap-5">
            {audiences.map((item, i) => (
              <article key={item.title} className={`group min-h-[285px] min-w-[82vw] snap-center rounded-[1.65rem] p-6 transition md:min-h-[330px] md:min-w-0 md:rounded-[2rem] md:p-8 md:hover:-translate-y-1.5 ${audienceStyles[i]}`}>
                <div className="flex items-start justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-[0.2em] opacity-65">0{i + 1}</span>
                  <ArrowRight size={20}/>
                </div>
                <div className="mt-20 md:mt-24">
                  <h3 className="font-display text-[1.75rem] font-extrabold leading-tight tracking-tight md:text-3xl">{item.title}</h3>
                  <p className="mt-4 text-sm font-medium leading-7 opacity-75">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <Gallery />

      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <Container className="grid gap-4 sm:gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[470px] overflow-hidden rounded-[1.75rem] bg-cocoa p-6 text-white sm:min-h-[520px] sm:rounded-[2.2rem] sm:p-10 md:p-12">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-sage/35 blur-2xl" />
            <div className="relative">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-sun sm:text-xs">Roma · Monte Mario</p>
              <h2 className="mt-4 max-w-2xl font-display text-[2.6rem] font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-5xl md:text-6xl">Vicino a ciò che conta. Lontano dal caos che non serve.</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 sm:mt-6">Gemelli, San Filippo Neri, Università Cattolica e servizi di quartiere: una zona residenziale comoda da vivere, non solo da visitare.</p>
              <Button to="/posizione" variant="light" className="mt-7 w-full sm:mt-8 sm:w-auto">Scopri la zona <ArrowRight className="ml-2" size={17}/></Button>
            </div>
            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-2 sm:bottom-8 sm:left-10 sm:right-10 sm:gap-3 md:left-12 md:right-12">
              <div className="rounded-xl border border-white/12 bg-white/8 p-3 backdrop-blur sm:rounded-2xl sm:p-4"><HeartHandshake size={18}/><p className="mt-3 text-[10px] font-extrabold leading-4 sm:mt-5 sm:text-sm md:text-lg">Ospitalità</p></div>
              <div className="rounded-xl border border-white/12 bg-white/8 p-3 backdrop-blur sm:rounded-2xl sm:p-4"><Star size={18}/><p className="mt-3 text-[10px] font-extrabold leading-4 sm:mt-5 sm:text-sm md:text-lg">{property.rating}/5</p></div>
              <div className="rounded-xl border border-white/12 bg-white/8 p-3 backdrop-blur sm:rounded-2xl sm:p-4"><MapPin size={18}/><p className="mt-3 text-[10px] font-extrabold leading-4 sm:mt-5 sm:text-sm md:text-lg">Via Dego 4</p></div>
            </div>
          </div>

          <div className="grid gap-4 sm:gap-6">
            <div className="rounded-[1.75rem] bg-sun p-6 sm:rounded-[2.2rem] sm:p-9">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.19em] text-ink/55 sm:text-xs">Il plus che senti davvero</p>
              <p className="mt-4 font-display text-5xl font-extrabold leading-none tracking-[-0.05em] sm:mt-5">90 m²</p>
              <p className="mt-2 text-lg font-bold sm:mt-3">di terrazza privata</p>
              <p className="mt-4 text-sm leading-7 text-ink/65 sm:mt-5">Colazione fuori, una pausa al sole, una cena tranquilla. Spazio in più per vivere meglio.</p>
            </div>
            <div className="rounded-[1.75rem] bg-cream p-6 sm:rounded-[2.2rem] sm:p-9">
              <p className="eyebrow">Recensioni</p>
              <p className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:mt-5 sm:text-4xl">4,98 su 5.</p>
              <p className="mt-3 text-sm leading-7 text-ink/60 sm:mt-4">Un segnale di fiducia importante per chi prenota direttamente dal sito.</p>
              <div className="mt-6 flex items-center gap-3 text-sm font-extrabold sm:mt-7"><Star size={17} fill="currentColor" className="text-sage" /> {property.reviews} recensioni · Superhost</div>
            </div>
          </div>
        </Container>
      </section>

      <section className="px-2 pb-2 sm:px-5 sm:pb-5">
        <div className="overflow-hidden rounded-[1.75rem] bg-sage py-14 text-white sm:rounded-[2.6rem] sm:py-20">
          <Container className="text-center">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-white/65 sm:text-xs">D’Anzi House · Roma</p>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-6xl">Hai già le date? Controllale in pochi secondi.</h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/70">Invia una richiesta direttamente dal sito. La disponibilità viene verificata prima della conferma.</p>
            <Button to="/prenota" variant="light" className="mt-7 w-full sm:mt-8 sm:w-auto">Verifica disponibilità <ArrowRight className="ml-2" size={17}/></Button>
          </Container>
        </div>
      </section>
    </>
  );
}
