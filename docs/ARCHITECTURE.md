# Architettura prenotazioni

```text
Visitore
   │
   ▼
React /prenota
   │
   ▼
Supabase Edge Function create-booking
   ├── fetch Airbnb iCal (controllo live)
   ├── RPC replace_airbnb_blocks
   └── RPC create_booking_request
           │
           ▼
        bookings (pending)
           │
      Admin conferma
           ▼
        confirmed
           │
           ▼
Vercel /calendar.ics
           │
           ▼
Airbnb importa e blocca le date
```

## Perché non prenotazione istantanea

Il feed iCal è utile per sincronizzare calendari ma non è un channel manager real-time. Airbnb aggiorna periodicamente i calendari importati. La richiesta di prenotazione riduce il rischio residuo di una prenotazione simultanea sui due canali.

Per instant booking con garanzia operativa più forte, evolvere verso un PMS/channel manager autorizzato Airbnb e mantenere questo frontend come interfaccia proprietaria.
