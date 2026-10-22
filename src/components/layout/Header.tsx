import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container } from '@/components/ui/Container';

const links = [
  ['La casa', '/la-casa'],
  ['Posizione', '/posizione'],
  ['Prenota', '/prenota'],
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/94 backdrop-blur-xl">
      <Container className="flex h-[68px] items-center justify-between sm:h-[76px]">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)} aria-label="D'Anzi House - Home">
          <img src="/brand/logo-icon.png" alt="" aria-hidden="true" className="h-11 w-11 shrink-0 object-contain sm:hidden" />
          <div className="min-w-0 sm:hidden">
            <span className="block truncate font-display text-[1.18rem] font-extrabold tracking-[-0.04em] text-ink">D’Anzi House</span>
            <span className="mt-0.5 block text-[7px] font-extrabold uppercase tracking-[0.18em] text-ink/45">Roma · Monte Mario</span>
          </div>
          <div className="hidden min-w-0 sm:block">
            <img src="/brand/logo-horizontal-1200.png" alt="D'Anzi House" className="h-10 w-auto max-w-[230px] object-contain lg:h-11 lg:max-w-[265px]" />
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([label, to]) => (
            <NavLink key={to} to={to} className={({ isActive }) => `text-sm font-bold transition ${isActive ? 'text-sage' : 'text-ink/65 hover:text-ink'}`}>{label}</NavLink>
          ))}
          <Link to="/prenota" className="rounded-full bg-sage px-5 py-3 text-sm font-extrabold text-white shadow-[0_8px_22px_rgba(255,104,70,0.22)] transition hover:-translate-y-0.5 hover:bg-clay">Verifica disponibilità</Link>
        </nav>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      {open && (
        <div className="fixed inset-x-0 top-[68px] z-50 h-[calc(100dvh-68px)] bg-white md:hidden">
          <Container className="flex h-full flex-col py-6">
            <div className="mb-5 rounded-[1.5rem] border border-black/6 bg-cream/70 p-4">
              <img src="/brand/logo-horizontal-1200.png" alt="D'Anzi House" className="h-11 w-auto max-w-full object-contain" />
              <p className="mt-3 text-sm leading-6 text-ink/55">Una casa a Roma pensata per farti sentire accolto, comodo e subito a tuo agio.</p>
            </div>
            <nav className="flex flex-col">
              {links.map(([label, to], index) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-black/7 py-5 font-display text-3xl font-extrabold tracking-tight"
                >
                  <span>{label}</span><span className="text-sm font-sans text-ink/30">0{index + 1}</span>
                </Link>
              ))}
            </nav>
            <div className="mt-auto pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <p className="mb-4 text-sm leading-6 text-ink/55">Hai già le date? Controlla subito la disponibilità.</p>
              <Link to="/prenota" onClick={() => setOpen(false)} className="flex min-h-14 w-full items-center justify-center rounded-2xl bg-sage px-6 text-sm font-extrabold text-white">Verifica disponibilità</Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
