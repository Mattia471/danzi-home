# Integrazione Kross Booking

## Ruolo di Kross

Kross Booking è previsto come motore principale per disponibilità, tariffe e prenotazioni.

Il sito D'Anzi House non deve mantenere un calendario indipendente quando il Channel Manager Kross sarà operativo.

## Flusso

```text
Utente
  ↓
check-in + check-out + ospiti
  ↓
D'Anzi House
  ↓
src/services/krossBooking.ts
  ↓
Kross Booking Engine
  ↓
prenotazione / pagamento / conferma
  ↓
Channel Manager Kross
  ↓
Airbnb + altri OTA
```

## Configurazione

```env
VITE_KROSS_DEMO_MODE=false
VITE_KROSS_BOOKING_URL=https://...
VITE_KROSS_PROPERTY_ID=

VITE_KROSS_CHECKIN_PARAM=checkin
VITE_KROSS_CHECKOUT_PARAM=checkout
VITE_KROSS_GUESTS_PARAM=adults
VITE_KROSS_PROPERTY_PARAM=property_id
```

L'URL, l'ID struttura e i nomi dei query parameter vanno confermati sulla configurazione Kross del cliente.

## Adapter

Tutta la costruzione del link Kross è centralizzata in:

```text
src/services/krossBooking.ts
```

Se Kross fornisce un widget, un'integrazione white-label o una convenzione URL diversa, modificare questo file invece delle singole CTA.

## Attivazione produzione

Prima di impostare `VITE_KROSS_DEMO_MODE=false`:

1. ottenere il Booking Engine ufficiale;
2. confermare ID struttura;
3. verificare formato date richiesto;
4. verificare parametro ospiti;
5. verificare eventuali codici lingua/currency;
6. testare date disponibili;
7. testare date non disponibili;
8. completare una prenotazione reale di prova;
9. verificare il blocco su Airbnb tramite Channel Manager;
10. verificare una cancellazione/modifica.

## Regola importante

Non usare contemporaneamente Kross e il vecchio calendario Supabase/iCal come due fonti operative di disponibilità. Il risultato sarebbe un rischio inutile di inconsistenze e overbooking.
