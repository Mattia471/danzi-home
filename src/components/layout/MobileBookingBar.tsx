import { CalendarDays } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function MobileBookingBar() {
  const { pathname } = useLocation();
  if (pathname === '/prenota') return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/8 bg-white/95 px-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-xl md:hidden">
      <Link to="/prenota" className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-sage px-5 text-sm font-extrabold text-white shadow-[0_10px_30px_rgba(255,104,70,0.24)] active:scale-[0.99]">
        <CalendarDays size={18} /> Verifica disponibilità
      </Link>
    </div>
  );
}
