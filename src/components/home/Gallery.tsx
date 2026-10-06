import { gallery } from '@/data/property';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Gallery() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow="La casa" title="Spazi da vivere, non solo da attraversare." text="Un appartamento ristrutturato, funzionale e luminoso. La terrazza privata è il suo cuore: un vero spazio in più dove rallentare." />
        <div className="mt-10 grid auto-rows-[190px] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[220px]">
          {gallery.map((item, i) => (
            <figure key={item.label} className={`group relative overflow-hidden rounded-[1.7rem] ${i === 0 ? 'sm:row-span-2 lg:col-span-2' : ''}`}>
              <img src={item.src} alt={item.alt} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/90 px-4 py-2 text-xs font-bold backdrop-blur">{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
