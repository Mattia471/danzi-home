import { ArrowUpRight } from 'lucide-react';
import { gallery } from '@/data/property';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Gallery() {
  return (
    <section className="bg-cream py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-7">
          <SectionHeading eyebrow="Dentro D’Anzi House" title="Spazi da vivere, non solo da fotografare." text="Cucina, living, camera e terrazza sono pensati per stare bene anche durante soggiorni più lunghi." />
          <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full bg-sage text-white md:flex"><ArrowUpRight size={25}/></div>
        </div>

        <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:px-0 sm:pb-0 lg:grid-cols-12 lg:auto-rows-[230px]">
          {gallery.map((item, i) => (
            <figure key={item.label} className={`group relative min-w-[82vw] snap-center overflow-hidden rounded-[1.55rem] bg-white sm:min-w-0 sm:rounded-[1.8rem] ${i === 0 ? 'aspect-[4/5] sm:row-span-2 lg:col-span-7 lg:row-span-2 lg:aspect-auto' : 'aspect-[4/3] lg:col-span-5 lg:aspect-auto'}`}>
              <img src={item.src} alt={item.alt} loading={i === 0 ? 'eager' : 'lazy'} className="h-full w-full object-cover transition duration-700 md:group-hover:scale-[1.04]" />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent" />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-2 text-xs font-extrabold text-ink shadow-sm backdrop-blur">{item.label}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-2 text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-ink/35 sm:hidden">Scorri per vedere gli ambienti</p>
      </Container>
    </section>
  );
}
