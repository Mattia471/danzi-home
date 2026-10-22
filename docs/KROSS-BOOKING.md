# Integrazione Kross Booking

Il frontend pubblico è predisposto perché **Kross Booking sia la fonte principale per disponibilità, tariffe e prenotazioni**.

## Flusso previsto

1. L'utente seleziona check-in, check-out e numero di ospiti su D'Anzi House.
2. Il sito costruisce l'URL del Booking Engine Kross con i parametri selezionati.
3. L'utente prosegue su Kross Booking, dove vengono gestiti disponibilità reale, tariffa, dati dell'ospite, policy, eventuale garanzia/pagamento e conferma.
4. Kross Booking / Channel Manager sincronizza disponibilità e prenotazioni con i canali OTA configurati, incluso Airbnb quando il relativo collegamento è attivo.


## Modalità demo

Finché il collegamento reale non è disponibile, il progetto usa per impostazione predefinita:

```env
VITE_KROSS_DEMO_MODE=true
```

In questa modalità `/prenota` simula disponibilità, preventivo e conferma, senza contattare Kross. Per collegare il Booking Engine reale impostare `VITE_KROSS_DEMO_MODE=false` e compilare l'URL Kross. Dettagli in `docs/DEMO-BOOKING.md`.

## Configurazione

Copia `.env.example` in `.env` e compila almeno:

```env
VITE_KROSS_BOOKING_URL=https://URL-FORNITO-DA-KROSS...
```

Se Kross assegna un identificativo struttura separato:

```env
VITE_KROSS_PROPERTY_ID=...
```

I nomi dei parametri sono configurabili perché l'URL definitivo e la convenzione query devono essere verificati sull'account Kross del cliente:

```env
VITE_KROSS_CHECKIN_PARAM=checkin
VITE_KROSS_CHECKOUT_PARAM=checkout
VITE_KROSS_GUESTS_PARAM=adults
VITE_KROSS_PROPERTY_PARAM=property_id
```

L'adapter è centralizzato in:

```text
src/services/krossBooking.ts
```

Se Kross fornisce una convenzione URL diversa, un widget dedicato o un'integrazione white-label, basta modificare questo adapter senza cambiare tutte le CTA del sito.

## Supabase e vecchio iCal

Le funzioni Supabase/iCal presenti nel repository sono mantenute come codice legacy e possono essere utili per dati non gestiti da Kross. Se Kross Booking viene usato insieme al suo Channel Manager, **non bisogna mantenere due motori separati di disponibilità** per lo stesso inventario: Kross deve essere la fonte unica lato prenotazioni.
