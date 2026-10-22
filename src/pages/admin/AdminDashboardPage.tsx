import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { CalendarDays, LogOut, RefreshCw, UserRound } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Row = { id:string; booking_code:string; check_in:string; check_out:string; first_name:string; last_name:string; guests:number; status:string; created_at:string };

export function AdminDashboardPage() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);
  const [auth, setAuth] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const [syncing, setSyncing] = useState(false);
  useEffect(() => {
    if (!supabase) return setReady(true);
    supabase.auth.getSession().then(async ({data}) => { setAuth(Boolean(data.session)); setReady(true); if(data.session) await load(); });
  }, []);
  async function load(){ if(!supabase) return; const {data}=await supabase.from('bookings').select('id,booking_code,check_in,check_out,first_name,last_name,guests,status,created_at').order('check_in'); setRows((data||[]) as Row[]); }
  async function sync(){ if(!supabase) return; setSyncing(true); await supabase.functions.invoke('sync-airbnb-calendar'); await load(); setSyncing(false); }
  async function setStatus(id:string,status:string){ if(!supabase)return; await supabase.from('bookings').update({status}).eq('id',id); await load(); }
  async function logout(){ await supabase?.auth.signOut(); nav('/admin'); }
  if(!ready) return <main className="grid min-h-screen place-items-center bg-cream">Caricamento…</main>;
  if(!auth) return <Navigate to="/admin" replace/>;
  return <main className="min-h-screen bg-[#f2efe9] p-5 md:p-8"><div className="mx-auto max-w-7xl"><header className="flex flex-col gap-4 rounded-[1.8rem] bg-ink p-6 text-white md:flex-row md:items-center md:justify-between"><div className="flex items-center gap-3"><span className="inline-flex rounded-2xl bg-white p-2"><img src="/brand/logo-icon.png" alt="D'Anzi House" className="h-11 w-11 object-contain" /></span><div><p className="font-display text-2xl font-semibold">D’Anzi House</p><p className="text-xs text-white/50">Booking control room</p></div></div><div className="flex gap-2"><button onClick={sync} className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold"><RefreshCw className={`mr-2 inline ${syncing?'animate-spin':''}`} size={15}/> Sincronizza Airbnb</button><button onClick={logout} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink"><LogOut className="mr-2 inline" size={15}/> Esci</button></div></header><section className="mt-6 grid gap-4 sm:grid-cols-3"><Stat icon={<CalendarDays/>} label="Prenotazioni" value={rows.length}/><Stat icon={<UserRound/>} label="Ospiti in arrivo" value={rows.filter(r=>r.status==='confirmed').reduce((a,r)=>a+r.guests,0)}/><Stat icon={<CalendarDays/>} label="Da confermare" value={rows.filter(r=>r.status==='pending').length}/></section><section className="mt-6 overflow-hidden rounded-[1.8rem] bg-white"><div className="border-b border-black/5 p-6"><h1 className="font-display text-3xl font-semibold">Prenotazioni</h1></div><div className="overflow-x-auto"><table className="w-full min-w-[800px] text-left text-sm"><thead className="bg-cream text-xs uppercase tracking-wider text-ink/45"><tr>{['Codice','Ospite','Date','Persone','Stato','Azioni'].map(x=><th key={x} className="px-5 py-4">{x}</th>)}</tr></thead><tbody>{rows.map(r=><tr key={r.id} className="border-t border-black/5"><td className="px-5 py-4 font-bold">{r.booking_code}</td><td className="px-5 py-4">{r.first_name} {r.last_name}</td><td className="px-5 py-4">{r.check_in} → {r.check_out}</td><td className="px-5 py-4">{r.guests}</td><td className="px-5 py-4"><span className="rounded-full bg-cream px-3 py-1 text-xs font-bold">{r.status}</span></td><td className="px-5 py-4"><select value={r.status} onChange={e=>setStatus(r.id,e.target.value)} className="rounded-xl border border-black/10 px-3 py-2"><option value="pending">pending</option><option value="confirmed">confirmed</option><option value="cancelled">cancelled</option><option value="completed">completed</option></select></td></tr>)}</tbody></table>{rows.length===0&&<p className="p-8 text-sm text-ink/50">Nessuna prenotazione ancora.</p>}</div></section></div></main>;
}
function Stat({icon,label,value}:{icon:ReactNode;label:string;value:number}){return <div className="rounded-[1.5rem] bg-white p-6"><div className="text-moss">{icon}</div><p className="mt-8 text-4xl font-display font-semibold">{value}</p><p className="mt-1 text-xs font-bold uppercase tracking-wider text-ink/45">{label}</p></div>}
