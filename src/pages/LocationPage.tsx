import { Bus, Hospital, MapPinned, ShoppingBasket, TrainFront } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

const points = [
  { icon: Hospital, title: 'Policlinico Gemelli', text: 'Una delle destinazioni principali per chi sceglie D’Anzi House.' },
  { icon: Hospital, title: 'San Filippo Neri', text: 'Comodo per professionisti, pazienti e accompagnatori.' },
  { icon: TrainFront, title: 'Roma Balduina · FL3', text: 'Stazione ferroviaria raggiungibile a piedi dalla zona.' },
  { icon: Bus, title: 'Bus 46, 49, 546, 907', text: 'Diverse linee utili per muoversi verso il centro e i quartieri vicini.' },
  { icon: ShoppingBasket, title: 'Servizi quotidiani', text: 'Supermercati, farmacie, bar, ristoranti e negozi nel quartiere.' },
  { icon: MapPinned, title: 'Monte Mario', text: 'Una zona residenziale, autentica e più tranquilla del centro storico.' },
];

export function LocationPage() {
  return (
    <>
      <section className="py-16 lg:py-24"><Container><p className="eyebrow">Roma · Monte Mario</p><h1 className="display-title mt-4 max-w-4xl">Vicino a ciò che conta. Collegato a tutto il resto.</h1><p className="mt-7 max-w-2xl text-base leading-8 text-ink/65">D’Anzi House si trova in Via Dego 4, in una zona residenziale con i servizi utili alla vita di tutti i giorni e collegamenti verso il centro di Roma.</p></Container></section>
      <section className="pb-12"><Container><div className="relative min-h-[430px] overflow-hidden rounded-[2.2rem] bg-moss"><div className="absolute inset-0 opacity-20" style={{backgroundImage:'radial-gradient(circle at 20% 30%, white 0 2px, transparent 3px), radial-gradient(circle at 60% 60%, white 0 2px, transparent 3px), radial-gradient(circle at 80% 20%, white 0 2px, transparent 3px)', backgroundSize:'80px 80px'}}/><div className="relative flex min-h-[430px] items-end p-8 text-white md:p-12"><div><MapPinned size={34}/><p className="mt-5 font-display text-4xl font-semibold">Via Dego 4 · 00168 Roma</p><a className="mt-4 inline-block text-sm font-bold underline underline-offset-4" href="https://www.google.com/maps/search/?api=1&query=Via+Dego+4+Roma" target="_blank" rel="noreferrer">Apri in Google Maps</a></div></div></div></Container></section>
      <section className="py-16"><Container><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{points.map(({icon:Icon,title,text}) => <article key={title} className="rounded-[1.7rem] bg-white p-7"><Icon size={23}/><h2 className="mt-8 font-display text-2xl font-semibold">{title}</h2><p className="mt-3 text-sm leading-7 text-ink/60">{text}</p></article>)}</div><div className="mt-10 text-center"><Button to="/prenota">Verifica disponibilità</Button></div></Container></section>
    </>
  );
}
