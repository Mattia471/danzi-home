import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container } from '@/components/ui/Container';

const links = [
  ['La casa', '/la-casa'],
  ['Posizione', '/posizione'],
  ['Prenota', '/prenota'],
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-cream/90 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between">
        <Link to="/" className="leading-none" onClick={() => setOpen(false)}>
          <span className="block font-display text-3xl font-semibold">D’Anzi House</span>
          <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.27em] text-ink/55">Gemelli · San Pietro · Roma</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([label, to]) => (
            <NavLink key={to} to={to} className={({ isActive }) => `text-sm font-semibold ${isActive ? 'text-moss' : 'text-ink/70 hover:text-ink'}`}>{label}</NavLink>
          ))}
          <Link to="/prenota" className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-moss">Verifica disponibilità</Link>
        </nav>
        <button className="rounded-full border border-black/10 p-3 md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Apri menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>
      {open && (
        <div className="border-t border-black/5 bg-cream md:hidden">
          <Container className="flex flex-col gap-2 py-5">
            {links.map(([label, to]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="rounded-2xl px-3 py-4 font-semibold hover:bg-white">{label}</Link>)}
          </Container>
        </div>
      )}
    </header>
  );
}
