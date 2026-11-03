# Booking demo

La modalità demo permette di presentare il percorso di prenotazione senza collegare Kross Booking.

## Attivazione

```env
VITE_KROSS_DEMO_MODE=true
```

## Flusso simulato

1. selezione date;
2. selezione ospiti;
3. controllo disponibilità;
4. preventivo demo;
5. dati ospite;
6. conferma;
7. generazione codice;
8. salvataggio in `localStorage`.

Le prenotazioni salvate nel browser diventano blocchi per i controlli successivi.

## Reset

Il pulsante **Reimposta demo** cancella le prenotazioni simulate del browser corrente.

## Dati e prezzi

Disponibilità e tariffe sono esclusivamente dimostrative.

Non devono essere:

- pubblicate come prezzi ufficiali;
- usate per accettare prenotazioni;
- sincronizzate con Airbnb;
- considerate dati Kross.

## Passaggio a produzione

```env
VITE_KROSS_DEMO_MODE=false
VITE_KROSS_BOOKING_URL=https://...
```

Da quel momento il primo step continua a raccogliere date e ospiti, ma il flusso viene trasferito al Booking Engine Kross.
