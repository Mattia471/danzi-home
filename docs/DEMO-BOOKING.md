# Demo prenotazione

Il progetto include una modalità di prenotazione simulata pensata per presentazioni al cliente prima del collegamento definitivo a Kross Booking.

## Attivazione

Nel file `.env`:

```env
VITE_KROSS_DEMO_MODE=true
```

Con questa impostazione il form `/prenota` non effettua chiamate esterne.

## Cosa simula

1. Selezione di arrivo, partenza e numero di ospiti.
2. Verifica disponibilità contro alcuni blocchi calendario generati dinamicamente.
3. Calcolo di una tariffa demo con prezzo feriale/weekend, pulizia finale e sconto per soggiorni lunghi.
4. Inserimento dei dati principali dell'ospite.
5. Conferma con codice prenotazione.
6. Salvataggio della prenotazione demo in `localStorage`.
7. Le date appena prenotate vengono considerate occupate nei controlli successivi.

Il pulsante `Reimposta demo` cancella soltanto le prenotazioni simulate salvate nel browser.

## Passaggio a Kross Booking

Quando il Booking Engine reale è disponibile:

```env
VITE_KROSS_DEMO_MODE=false
VITE_KROSS_BOOKING_URL=https://...
VITE_KROSS_PROPERTY_ID=...
```

Il primo step del form continuerà a raccogliere date e ospiti, ma invece di eseguire la simulazione aprirà Kross Booking con i parametri configurati in `src/services/krossBooking.ts`.

Le tariffe presenti nella demo sono esclusivamente scenografiche e non devono essere considerate prezzi commerciali reali.
