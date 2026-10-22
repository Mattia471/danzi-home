import { Check, Sun } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { amenities, gallery } from '@/data/property';

export function HousePage() {
  return (
    <>
      <section className="bg-white px-2 pb-5 pt-2 sm:px-5 sm:pb-6 sm:pt-3">
        <div className="relative overflow-hidden rounded-[1.55rem] bg-ink sm:rounded-[2.6rem]">
          <img src="/images/living-demo.webp" className="h-[64svh] min-h-[480px] w-full object-cover sm:h-[66vh]" alt="Living D'Anzi House, immagine demo"/>
          <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <Container className="absolute inset-0 flex items-end pb-8 text-white sm:pb-14">
            <div className="max-w-3xl">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-sun sm:text-xs">Dentro D’Anzi House</p>
              <h1 className="mt-4 font-display text-[2.8rem] font-bold leading-[0.94] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">Una casa semplice da vivere, bella da ritrovare.</h1>
            </div>
          </Container>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-28">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
          <SectionHeading eyebrow="Spazi" title="Tutto quello che serve per stare bene anche più di qualche notte." text="Camera matrimoniale flessibile, soggiorno con divano letto, cucina completa e spazi pensati per una vera quotidianità." />
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {amenities.map(({icon: Icon,label}) => <div key={label} className="flex min-h-24 flex-col justify-between rounded-[1.25rem] border border-black/7 bg-cream p-4 transition sm:min-h-28 sm:rounded-[1.5rem] sm:p-5 md:hover:-translate-y-1 md:hover:bg-white md:hover:shadow-card"><Icon size={20} className="text-sage"/><span className="mt-5 text-[11px] font-bold leading-5 sm:mt-6 sm:text-sm">{label}</span></div>)}
          </div>
        </Container>
      </section>

      <section className="bg-cream py-14 sm:py-20 lg:py-28">
        <Container className="grid gap-7 lg:grid-cols-2 lg:items-center lg:gap-8">
          <div className="overflow-hidden rounded-[1.75rem] sm:rounded-[2.2rem]"><img src="/images/terrace-demo.webp" className="aspect-[4/3] w-full object-cover sm:h-[520px] sm:aspect-auto" alt="Terrazza privata, immagine demo"/></div>
          <div className="lg:pl-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sun sm:h-14 sm:w-14"><Sun size={23}/></div>
            <h2 className="section-title mt-5 sm:mt-6">La terrazza è una stanza in più, solo senza soffitto.</h2>
            <p className="mt-5 text-sm leading-7 text-ink/60 sm:mt-6 sm:leading-8">90 m² a uso esclusivo con zona lounge, tavolo da pranzo con gazebo, ombrellone, barbecue e lettini. Uno spazio raro a Roma, prezioso soprattutto nei soggiorni più lunghi.</p>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-[13px] sm:mt-7 sm:text-sm">{['Zona pranzo esterna','Area relax','Barbecue','Due lettini','Spazio per famiglie'].map(x => <li key={x} className="flex items-center gap-2 font-semibold"><Check size={15} className="shrink-0 text-sage"/>{x}</li>)}</ul>
            <Button to="/prenota" className="mt-7 w-full sm:mt-8 sm:w-auto">Controlla le date</Button>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20 lg:py-28">
        <Container>
          <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 sm:pb-0 lg:grid-cols-3">
            {gallery.slice(1).map((x,i) => <img key={x.src} src={x.src} alt={x.alt} loading="lazy" className={`aspect-[4/3] min-w-[82vw] snap-center rounded-[1.55rem] object-cover sm:min-w-0 sm:rounded-[1.8rem] ${i===0 ? 'lg:col-span-2 lg:h-96' : 'lg:h-72'}`}/>) }
          </div>
        </Container>
      </section>
    </>
  );
}
