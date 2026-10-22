# Architettura D'Anzi House

## Frontend

React + Vite + TypeScript + Tailwind CSS su Vercel.

## Prenotazioni

Il flusso pubblico è predisposto per Kross Booking:

```text
Sito D'Anzi House
    ↓
Date + ospiti
    ↓
Adapter src/services/krossBooking.ts
    ↓
Kross Booking Engine
    ↓
PMS / Channel Manager Kross
    ↓
Airbnb / altri OTA
```

Kross diventa la fonte operativa per disponibilità, tariffe e conferme. In questo modo il sito non duplica dati anagrafici o pagamenti e non mantiene un secondo calendario indipendente.

## Supabase

Supabase resta nel repository per l'area admin/prototipo precedente e per eventuali funzionalità future non coperte dal PMS, ma il booking pubblico non dipende più da Supabase.

## Posizione

La pagina Posizione usa una Google Map embedded con pin sull'indirizzo della struttura e link diretto alle indicazioni stradali.
