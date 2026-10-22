import { Bus, ExternalLink, Hospital, MapPinned, Navigation, ShoppingBasket, TrainFront } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { property } from '@/data/property';

const points = [
  { icon: Hospital, title: 'Policlinico Gemelli', text: 'Una delle destinazioni principali per chi sceglie D’Anzi House.' },
  { icon: Hospital, title: 'San Filippo Neri', text: 'Comodo per professionisti, pazienti e accompagnatori.' },
  { icon: TrainFront, title: 'Stazione Monte Mario · FL3', text: 'Collegamenti verso San Pietro, Trastevere e Ostiense.' },
  { icon: Bus, title: 'Bus di quartiere', text: 'Diverse linee utili per muoversi verso il centro e le zone vicine.' },
  { icon: ShoppingBasket, title: 'Servizi quotidiani', text: 'Supermercati, farmacie, bar, ristoranti e negozi nel quartiere.' },
  { icon: MapPinned, title: 'Monte Mario', text: 'Una zona residenziale, autentica e più tranquilla del centro storico.' },
];

const mapsQuery = encodeURIComponent(property.address);
const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;

export function LocationPage() {
  return (
    <>
      <section className="py-10 sm:py-16 lg:py-24">
        <Container>
          <p className="eyebrow">Roma · Monte Mario</p>
          <h1 className="mt-4 max-w-5xl font-display text-[2.85rem] font-bold leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-[5.7rem]">Vicino a ciò che conta. Collegato a tutto il resto.</h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-ink/60 sm:mt-7 sm:text-base sm:leading-8">D’Anzi House si trova in una zona residenziale di Monte Mario, con i servizi utili alla vita di tutti i giorni e collegamenti verso gli ospedali e il centro di Roma.</p>
        </Container>
      </section>

      <section className="px-2 pb-8 sm:px-5 sm:pb-10">
        <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[1.65rem] border border-black/7 bg-white shadow-card sm:rounded-[2.6rem]">
          <div className="relative h-[52vh] min-h-[420px] max-h-[650px] w-full bg-cream sm:min-h-[520px]">
            <iframe
              title="Mappa D'Anzi House"
              src={mapsEmbedUrl}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />

            <div className="absolute inset-x-3 bottom-3 hidden max-w-md rounded-[1.4rem] border border-white/70 bg-white/95 p-4 shadow-xl backdrop-blur-md sm:block md:inset-x-auto md:bottom-5 md:left-5 md:p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage text-white"><MapPinned size={20}/></span>
                <div className="min-w-0">
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-ink/40">D’Anzi House</p>
                  <p className="mt-1 text-sm font-extrabold leading-5">{property.address}</p>
                </div>
              </div>
              <a href={mapsDirectionsUrl} target="_blank" rel="noreferrer" className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 text-sm font-extrabold text-white transition hover:bg-sage">
                <Navigation size={16}/> Indicazioni stradali
              </a>
            </div>
          </div>

          <div className="p-3 sm:hidden">
            <div className="flex items-start gap-3 rounded-2xl bg-cream/70 p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage text-white"><MapPinned size={18}/></span>
              <div className="min-w-0">
                <p className="text-xs font-extrabold">D’Anzi House</p>
                <p className="mt-1 text-xs leading-5 text-ink/55">{property.address}</p>
              </div>
            </div>
            <a href={mapsDirectionsUrl} target="_blank" rel="noreferrer" className="mt-2 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-ink px-4 text-sm font-extrabold text-white">
              <Navigation size={17}/> Apri indicazioni <ExternalLink size={15}/>
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3">
            {points.map(({icon:Icon,title,text},i) => (
              <article key={title} className={`rounded-[1.35rem] p-4 transition sm:rounded-[1.8rem] sm:p-7 md:hover:-translate-y-1 ${i === 0 ? 'bg-sage text-white' : i === 1 ? 'bg-sun' : 'border border-black/7 bg-white'}`}>
                <Icon size={21}/>
                <h2 className="mt-8 font-display text-lg font-extrabold leading-tight tracking-tight sm:mt-10 sm:text-2xl">{title}</h2>
                <p className={`mt-3 hidden text-sm leading-7 sm:block ${i===0 ? 'text-white/75' : 'text-ink/60'}`}>{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center sm:mt-10"><Button to="/prenota" className="w-full sm:w-auto">Verifica disponibilità</Button></div>
        </Container>
      </section>
    </>
  );
}
