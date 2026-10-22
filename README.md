# D'Anzi House

Sito vetrina mobile-first per **D'Anzi House – Gemelli / San Pietro**, Roma, predisposto per prenotazioni dirette tramite **Kross Booking**.


## Modalità demo prenotazione

Per presentare il flusso al cliente prima del collegamento a Kross Booking, il progetto parte con `VITE_KROSS_DEMO_MODE=true`. La pagina `/prenota` simula disponibilità, tariffa, dati ospite e conferma e salva le prenotazioni demo nel browser. Vedi `docs/DEMO-BOOKING.md`.

## Stack

- React 18 + Vite + TypeScript
- Tailwind CSS
- React Router
- Kross Booking: booking engine / PMS / channel manager previsto come motore delle prenotazioni
- Google Maps embedded nella pagina Posizione
- Supabase presente come supporto/legacy per l'area admin e possibili funzionalità future
- Vercel per hosting

## Avvio locale

```bash
npm install
cp .env.example .env
npm run dev
```

## Kross Booking

Il sito non raccoglie più inutilmente nome, email e telefono prima di conoscere la disponibilità. Il flusso pubblico è:

```text
Date + ospiti sul sito
        ↓
Kross Booking Engine
        ↓
Disponibilità / tariffa / dati ospite / pagamento / conferma
        ↓
Channel Manager Kross
        ↓
Airbnb e altri OTA configurati
```

Configura in `.env`:

```env
VITE_KROSS_DEMO_MODE=true
VITE_KROSS_BOOKING_URL=
VITE_KROSS_PROPERTY_ID=
VITE_KROSS_CHECKIN_PARAM=checkin
VITE_KROSS_CHECKOUT_PARAM=checkout
VITE_KROSS_GUESTS_PARAM=adults
VITE_KROSS_PROPERTY_PARAM=property_id
```

L'integrazione è centralizzata in `src/services/krossBooking.ts`. Quando Kross fornirà al cliente URL e parametri definitivi del Booking Engine, sarà sufficiente valorizzare le variabili ambiente o adattare questo singolo file.

Dettagli: `docs/KROSS-BOOKING.md`.

## Google Maps

La pagina `/posizione` contiene direttamente la mappa Google con pin su D'Anzi House e CTA **Indicazioni stradali**. Non richiede una API key per l'embed attuale.

## UX mobile

- CTA prenotazione fissa su smartphone
- menu mobile full-screen
- hero e sezioni ottimizzate per viewport mobile
- gallery/card con scroll orizzontale e snap
- ricerca date touch-friendly
- primo step prenotazione ridotto a check-in, check-out e ospiti
- demo completa in 3 step con disponibilità, preventivo, dati ospite e conferma
- campi con dimensioni adatte al touch e font che evita lo zoom automatico su iPhone
- safe-area iOS
- immagini demo WebP ottimizzate

## Foto demo

Le immagini `public/images/*-demo.webp` servono esclusivamente per presentare il concept al cliente e non rappresentano necessariamente gli ambienti reali della struttura. Prima del go-live vanno sostituite con le fotografie originali.

## Supabase / iCal legacy

Il repository conserva le precedenti Edge Functions, migration e logiche iCal come riferimento. Se Kross Booking + Channel Manager viene adottato come soluzione definitiva, **non usare contemporaneamente il vecchio calendario Supabase/iCal come secondo booking engine**. Evitiamo due fonti di verità per lo stesso inventario.

## Prima del go-live

- ottenere da Kross Booking l'URL definitivo del Booking Engine e gli eventuali parametri/ID della struttura;
- configurare Airbnb e gli altri OTA dentro il Channel Manager Kross;
- sostituire le immagini demo con quelle originali;
- verificare indirizzo, telefono, policy commerciali, caparra e cancellazione;
- completare Privacy/Cookie in base ai servizi realmente attivi;
- testare su iPhone e Android il percorso sito → Kross → conferma;
- configurare dominio e variabili Vercel.

## Credito sviluppatore

Il footer contiene il credito con link a **@mattiacucuzza_**.
