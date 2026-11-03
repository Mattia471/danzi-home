<p align="center">
  <img src="./public/brand/logo-horizontal-1200.png" alt="D'Anzi House" width="520" />
</p>

<h1 align="center">D'Anzi House</h1>

<p align="center">
  Sito ufficiale mobile-first per <strong>D'Anzi House · Gemelli / San Pietro · Roma</strong>.<br />
  Hospitality, prenotazione diretta e integrazione predisposta per Kross Booking.
</p>

<p align="center">
  <a href="https://github.com/Mattia471/danzi-home/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/Mattia471/danzi-home/actions/workflows/ci.yml/badge.svg" /></a>
  <img alt="React 18" src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white" />
  <img alt="pnpm" src="https://img.shields.io/badge/pnpm-ready-F69220?logo=pnpm&logoColor=white" />
</p>

---

## Panoramica

D'Anzi House è un appartamento a Roma, zona Monte Mario, pensato per soggiorni turistici ma soprattutto per chi deve restare in città per **cure, assistenza a familiari, lavoro ospedaliero o università**.

Il progetto traduce questo posizionamento in un'esperienza digitale calda e semplice da usare, con particolare attenzione al mobile e a un percorso di prenotazione breve.

### Stato attuale

- ✅ sito pubblico responsive e mobile-first
- ✅ branding D'Anzi House integrato
- ✅ gallery e asset demo ottimizzati in WebP
- ✅ pagina posizione con Google Maps embedded
- ✅ booking demo completo e persistente nel browser
- ✅ adapter Kross Booking già centralizzato
- ✅ predisposizione Vercel
- ✅ CI GitHub Actions
- ⏳ collegamento Booking Engine Kross reale da completare con URL/ID del cliente
- ⏳ foto demo da sostituire con fotografie ufficiali prima del go-live

> La modalità demo è attiva di default e **non rappresenta disponibilità o prezzi reali**.

## Funzionalità

### Sito pubblico

- Home editoriale orientata alla conversione
- Pagina dedicata agli spazi della casa
- Gallery responsive
- Pagina posizione con pin e indicazioni stradali
- CTA prenotazione sticky su smartphone
- menu mobile full-screen
- scroll-to-top automatico tra le route
- favicon, Apple Touch Icon e metadata social

### Prenotazione

Il progetto supporta due modalità:

**Demo**
```text
Date + ospiti
    ↓
Controllo disponibilità simulata
    ↓
Preventivo demo
    ↓
Dati ospite
    ↓
Conferma + codice prenotazione
    ↓
Persistenza localStorage
```

**Produzione con Kross Booking**
```text
D'Anzi House
    ↓
Date + ospiti
    ↓
src/services/krossBooking.ts
    ↓
Kross Booking Engine
    ↓
PMS / Channel Manager
    ↓
Airbnb + altri OTA
```

Kross Booking deve diventare la **fonte unica per disponibilità, tariffe e conferme**. Il vecchio flusso Supabase/iCal resta nel repository solo come riferimento legacy.

## Stack

| Area | Tecnologia |
| --- | --- |
| Frontend | React 18 |
| Linguaggio | TypeScript |
| Build | Vite 6 |
| UI | Tailwind CSS |
| Routing | React Router |
| Icone | Lucide React |
| Date | date-fns |
| Booking | Kross Booking ready |
| Backend legacy/opzionale | Supabase |
| Hosting | Vercel |
| Package manager | pnpm |

## Requisiti

- Node.js **20+**
- pnpm **9+** o **10+**

## Avvio locale

```bash
git clone https://github.com/Mattia471/danzi-home.git
cd danzi-home

pnpm install
cp .env.example .env.local
pnpm dev
```

Il progetto sarà disponibile all'indirizzo mostrato da Vite, normalmente `http://localhost:5173`.

## Variabili ambiente

Copia `.env.example` in `.env.local`.

### Kross Booking

| Variabile | Obbligatoria | Descrizione |
| --- | --- | --- |
| `VITE_KROSS_DEMO_MODE` | sì | `true` usa il simulatore, `false` usa Kross |
| `VITE_KROSS_BOOKING_URL` | produzione | URL Booking Engine fornito da Kross |
| `VITE_KROSS_PROPERTY_ID` | se richiesto | ID struttura |
| `VITE_KROSS_CHECKIN_PARAM` | no | nome query param check-in |
| `VITE_KROSS_CHECKOUT_PARAM` | no | nome query param check-out |
| `VITE_KROSS_GUESTS_PARAM` | no | nome query param ospiti |
| `VITE_KROSS_PROPERTY_PARAM` | no | nome query param struttura |

### Supabase legacy/opzionale

`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` servono soltanto per le parti legacy/admin ancora presenti. Le chiavi server-side non devono mai essere esposte con prefisso `VITE_`.

Consulta [`.env.example`](./.env.example) per l'elenco completo.

## Script

```bash
pnpm dev        # sviluppo locale
pnpm typecheck  # controllo TypeScript
pnpm lint       # ESLint
pnpm build      # build produzione
pnpm check      # lint + build
pnpm preview    # preview build
```

## Struttura

```text
danzi-home/
├─ api/                    # endpoint Vercel legacy
├─ docs/                   # documentazione tecnica e operativa
├─ public/
│  ├─ brand/               # logo, favicon e asset branding
│  └─ images/              # immagini sito
├─ src/
│  ├─ components/
│  │  ├─ home/
│  │  ├─ layout/
│  │  └─ ui/
│  ├─ data/
│  ├─ lib/
│  ├─ pages/
│  ├─ services/
│  └─ types/
├─ supabase/               # migration/functions legacy
├─ .env.example
├─ vercel.json
└─ package.json
```

## Routing

| Route | Descrizione |
| --- | --- |
| `/` | Home |
| `/la-casa` | Spazi e servizi |
| `/posizione` | Mappa e collegamenti |
| `/prenota` | Demo booking / handoff Kross |
| `/privacy` | Informativa |
| `/admin` | Login area legacy |
| `/admin/dashboard` | Dashboard legacy |

## Deployment su Vercel

1. Importa la repository in Vercel.
2. Framework preset: **Vite**.
3. Build command: `pnpm build`.
4. Output directory: `dist`.
5. Aggiungi le variabili ambiente.
6. In produzione imposta `VITE_KROSS_DEMO_MODE=false` solo dopo aver verificato il Booking Engine reale.

La configurazione SPA è già gestita da [`vercel.json`](./vercel.json).

Per la checklist completa: [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md).

## Documentazione

- [Architettura](./docs/ARCHITECTURE.md)
- [Integrazione Kross Booking](./docs/KROSS-BOOKING.md)
- [Booking demo](./docs/DEMO-BOOKING.md)
- [Deployment e go-live](./docs/DEPLOYMENT.md)
- [Brand & UX](./docs/BRAND-AND-UX.md)
- [Contribuire](./CONTRIBUTING.md)
- [Security policy](./SECURITY.md)

## Immagini demo

Gli asset `public/images/*-demo.webp` sono usati per mostrare il concept al cliente e **non devono essere considerati fotografie ufficiali della struttura**.

Prima della pubblicazione vanno sostituiti con le immagini reali, mantenendo preferibilmente WebP/AVIF e dimensioni ottimizzate.

## Checklist prima del go-live

- [ ] URL Booking Engine Kross confermato
- [ ] property ID e parametri Kross verificati
- [ ] Channel Manager Kross sincronizzato con Airbnb
- [ ] demo mode disattivata
- [ ] foto ufficiali inserite
- [ ] prezzi/policy reali verificati
- [ ] privacy e cookie policy definitive
- [ ] telefono, email e indirizzo ricontrollati
- [ ] test completo da iPhone e Android
- [ ] dominio e redirect HTTPS configurati
- [ ] test prenotazione reale end-to-end

## Sicurezza

Non committare mai:

- file `.env`
- service-role key Supabase
- credenziali Kross
- token Vercel
- chiavi API private

Le variabili prefissate `VITE_` sono incluse nel bundle client e vanno considerate pubbliche.

Per segnalazioni: [SECURITY.md](./SECURITY.md).

## Crediti

Design e sviluppo web: [@mattiacucuzza_](https://www.instagram.com/mattiacucuzza_/)

---

<p align="center">
  <strong>D'Anzi House</strong><br />
  Roma · Monte Mario · Gemelli
</p>
