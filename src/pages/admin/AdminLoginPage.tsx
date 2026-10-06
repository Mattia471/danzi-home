import { FormEvent, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export function AdminLoginPage() {
  const nav = useNavigate();
  const [session, setSession] = useState<boolean | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!supabase) return setSession(false);
    supabase.auth.getSession().then(({ data }) => setSession(Boolean(data.session)));
  }, []);
  if (session) return <Navigate to="/admin/dashboard" replace />;
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError('');
    if (!supabase) return setError('Configura Supabase nel file .env per attivare l’area admin.');
    const fd = new FormData(e.currentTarget);
    const { error } = await supabase.auth.signInWithPassword({ email: String(fd.get('email')), password: String(fd.get('password')) });
    if (error) setError(error.message); else nav('/admin/dashboard');
  }
  return <main className="grid min-h-screen place-items-center bg-ink p-5"><form onSubmit={submit} className="w-full max-w-md rounded-[2rem] bg-cream p-8"><p className="font-display text-4xl font-semibold">D’Anzi House</p><p className="mt-1 text-xs font-bold uppercase tracking-[0.22em] text-ink/45">Area riservata</p><div className="mt-8 space-y-4"><input name="email" type="email" required className="field" placeholder="Email"/><input name="password" type="password" required className="field" placeholder="Password"/></div>{!isSupabaseConfigured && <p className="mt-4 text-xs text-clay">Supabase non ancora configurato.</p>}{error && <p className="mt-4 text-sm text-red-700">{error}</p>}<button className="mt-6 w-full rounded-2xl bg-ink py-4 text-sm font-bold text-white">Accedi</button></form></main>;
}
