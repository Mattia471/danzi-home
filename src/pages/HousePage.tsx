import { Check, Sun } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { amenities, gallery } from '@/data/property';

export function HousePage() {
  return (
    <>
      <section className="py-16 lg:py-24"><Container><SectionHeading eyebrow="D’Anzi House" title="Una casa semplice da vivere." text="Ristrutturata e curata nei dettagli, combina un soggiorno ampio, una cucina attrezzata, una camera versatile e un grande spazio esterno privato." /><div className="mt-10 overflow-hidden rounded-[2.2rem]"><img src="/images/living.svg" className="h-[52vh] w-full object-cover" alt="Living D'Anzi House"/></div></Container></section>
      <section className="bg-white py-20"><Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]"><div><p className="eyebrow">Spazi</p><h2 className="section-title mt-3">Tutto quello che serve per stare bene anche più di qualche notte.</h2><p className="mt-6 text-sm leading-8 text-ink/65">La camera matrimoniale può essere preparata con letto king size 180×200 oppure, su richiesta, con due letti singoli. Il soggiorno dispone di divano letto matrimoniale, tavolo da pranzo e cucina completa.</p></div><div className="grid grid-cols-2 gap-3">{amenities.map(({icon: Icon,label}) => <div key={label} className="flex items-center gap-3 rounded-2xl bg-cream p-4"><Icon size={19}/><span className="text-sm font-semibold">{label}</span></div>)}</div></Container></section>
      <section className="py-20"><Container className="grid gap-8 lg:grid-cols-2 lg:items-center"><img src="/images/hero.svg" className="h-[480px] w-full rounded-[2rem] object-cover" alt="Terrazza privata"/><div className="lg:pl-10"><Sun size={30}/><h2 className="section-title mt-5">La terrazza è una stanza in più, solo senza soffitto.</h2><p className="mt-5 text-sm leading-8 text-ink/65">90 m² a uso esclusivo con zona lounge, tavolo da pranzo con gazebo, ombrellone, barbecue e lettini. Uno spazio raro a Roma, prezioso soprattutto nei soggiorni più lunghi.</p><ul className="mt-7 space-y-3 text-sm">{['Zona pranzo esterna','Area relax','Barbecue','Due lettini','Spazio anche per famiglie'].map(x => <li key={x} className="flex items-center gap-2"><Check size={16} className="text-moss"/>{x}</li>)}</ul><Button to="/prenota" className="mt-8">Controlla le date</Button></div></Container></section>
      <section className="pb-24"><Container><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{gallery.slice(1).map(x => <img key={x.src} src={x.src} alt={x.alt} className="h-72 w-full rounded-[1.7rem] object-cover"/>)}</div></Container></section>
    </>
  );
}
