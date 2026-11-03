# Architettura

## Obiettivo

D'Anzi House separa il **sito pubblico** dal **motore operativo delle prenotazioni**.

Il frontend presenta la struttura, raccoglie date e numero di ospiti e, in produzione, passa il controllo a Kross Booking. In questo modo tariffe, disponibilità, pagamenti e sincronizzazione OTA restano in un solo sistema.

## Componenti

```text
Browser
  │
  ├─ React + React Router
  │    ├─ Home
  │    ├─ La casa
  │    ├─ Posizione
  │    └─ Prenota
  │
  ├─ Demo booking (solo demo)
  │    └─ localStorage
  │
  └─ Produzione
       └─ krossBooking.ts
            └─ Kross Booking Engine
                 └─ PMS / Channel Manager
                      ├─ Airbnb
                      └─ altri OTA
```

## Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- date-fns
- Lucide React

Le CTA di prenotazione convergono sulla route `/prenota`. L'adapter Kross è centralizzato in `src/services/krossBooking.ts`, evitando URL o query param duplicati nei componenti.

## Booking demo

Quando `VITE_KROSS_DEMO_MODE=true`, il sito usa `src/services/demoBooking.ts`.

La demo:

- genera blocchi di disponibilità simulati;
- calcola un preventivo scenografico;
- raccoglie dati ospite;
- genera un codice prenotazione;
- salva la prenotazione in `localStorage`;
- considera successivamente occupate le stesse date.

Non è un PMS e non deve essere usata per prenotazioni reali.

## Kross Booking

Con `VITE_KROSS_DEMO_MODE=false`, il frontend costruisce il link al Booking Engine usando le variabili ambiente.

Kross deve essere la fonte unica per:

- disponibilità;
- tariffe;
- restrizioni;
- dati ospite;
- policy;
- pagamento/garanzia;
- conferme;
- sincronizzazione OTA.

## Supabase legacy

La repository conserva una precedente implementazione basata su Supabase/iCal, inclusi migration, Edge Functions e area admin.

Questa parte non deve essere usata come secondo booking engine in parallelo a Kross. Può essere rimossa in una futura fase di cleanup quando il flusso Kross sarà definitivo.

## Hosting

Vercel ospita la SPA e l'eventuale endpoint legacy `/api/calendar`.

`vercel.json` gestisce:

- il rewrite SPA verso `index.html`;
- il vecchio endpoint `/calendar.ics`.

Dopo la migrazione completa a Kross, l'endpoint iCal legacy potrà essere rimosso.

## Principi

1. Una sola fonte di verità per le prenotazioni.
2. Nessun segreto nel bundle client.
3. Mobile-first.
4. Booking flow corto.
5. Integrazioni esterne isolate in adapter dedicati.
6. Asset ottimizzati per connessioni mobili.
