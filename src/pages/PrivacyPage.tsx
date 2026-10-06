import { Container } from '@/components/ui/Container';

export function PrivacyPage() {
  return <section className="py-20"><Container className="max-w-3xl"><p className="eyebrow">Privacy</p><h1 className="section-title mt-3">Privacy & Cookie</h1><div className="mt-8 rounded-2xl border border-clay/20 bg-white p-6 text-sm leading-7 text-ink/65"><strong className="text-ink">Da completare prima della pubblicazione.</strong><p className="mt-3">Questa pagina è volutamente lasciata come template: inserire i dati del titolare del trattamento, finalità, basi giuridiche, tempi di conservazione, fornitori utilizzati (Supabase, Vercel, eventuale Resend/EmailJS e analytics), cookie effettivamente installati e modalità di esercizio dei diritti. Il testo finale va verificato in base alla configurazione realmente messa online.</p></div></Container></section>;
}
