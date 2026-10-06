# D'Anzi House

Sito vetrina + booking diretto per **D'Anzi House – Gemelli / San Pietro**, Roma.

## Stack

- React 18 + Vite + TypeScript
- Tailwind CSS
- React Router
- Supabase: PostgreSQL, Auth, RLS, Edge Functions
- Vercel: hosting + endpoint pubblico `/calendar.ics`
- iCal Airbnb: sincronizzazione disponibilità bidirezionale
- Resend opzionale per email di notifica

## Avvio locale

```bash
npm install
cp .env.example .env
npm run dev
```

Senza variabili Supabase il frontend funziona in **demo mode**: il layout è navigabile e il form restituisce un codice demo senza salvare dati.

## 1. Crea Supabase

1. Crea un progetto Supabase.
2. Esegui `supabase/migrations/001_initial_schema.sql` nel SQL Editor.
3. Copia URL e anon key in `.env`.
4. In Authentication crea l'utente admin.
5. Recupera il suo UUID e inseriscilo:

```sql
insert into public.admin_users(user_id)
values ('UUID_UTENTE_AUTH');
```

## 2. Deploy Edge Functions

Con Supabase CLI:

```bash
supabase functions deploy create-booking --no-verify-jwt
supabase functions deploy sync-airbnb-calendar --no-verify-jwt
```

Imposta i secrets:

```bash
supabase secrets set AIRBNB_ICAL_URL="URL_ICAL_ESPORTATO_DA_AIRBNB"
supabase secrets set OWNER_EMAIL="booking@danzihouse.it"
supabase secrets set RESEND_API_KEY="..."
supabase secrets set FROM_EMAIL="D'Anzi House <booking@danzihouse.it>"
```

`RESEND_*` è opzionale. La prenotazione funziona anche senza invio email.

## 3. Sync Airbnb -> sito

Airbnb: **Calendario > Disponibilità > Collega calendari > Esporta calendario**, copia l'URL `.ics` e salvalo come `AIRBNB_ICAL_URL`.

La function `sync-airbnb-calendar` legge gli eventi Airbnb e aggiorna `calendar_blocks` in modo transazionale. Il form booking esegue inoltre un controllo live del feed Airbnb subito prima di creare la richiesta.

### Cron consigliato

In Supabase Dashboard crea un Cron Job ogni 15 minuti che invochi `sync-airbnb-calendar`. Il controllo live al submit resta la seconda barriera.

## 4. Sync sito -> Airbnb

Dopo il deploy Vercel il progetto espone:

```text
https://TUO-DOMINIO.it/calendar.ics
```

Il rewrite in `vercel.json` lo inoltra alla serverless function `api/calendar.ts`, che esporta **solo prenotazioni `confirmed`**.

In Airbnb: **Calendario > Disponibilità > Collega calendari > Importa calendario** e incolla l'URL sopra.

> Nota: Airbnb dichiara che i calendari importati vengono aggiornati automaticamente circa ogni 3 ore. Per questo il progetto usa di default un flusso di **richiesta + conferma**, non una prenotazione istantanea irrevocabile.

## 5. Workflow booking

1. Il visitatore seleziona le date.
2. Il frontend legge i blocchi salvati.
3. Al submit `create-booking` scarica nuovamente l'iCal Airbnb.
4. I blocchi Airbnb vengono sostituiti in transazione.
5. La RPC `create_booking_request` usa un advisory lock e verifica blocchi + prenotazioni attive.
6. La richiesta viene salvata `pending`.
7. L'admin la porta a `confirmed`.
8. `/calendar.ics` espone la prenotazione confermata ad Airbnb.

## 6. Admin

- `/admin`: login Supabase Auth
- `/admin/dashboard`: prenotazioni, cambio stato, sync manuale Airbnb

Le policy RLS consentono la gestione solo agli UUID presenti in `admin_users`.

## 7. Foto

Il progetto include placeholder grafici per evitare hotlink da Airbnb/Google. Prima del go-live usa **i file originali del proprietario**, ottimizzati in WebP/AVIF. Vedi `public/images/README.md`.

Le informazioni pubbliche dell'alloggio già usate nel copy: 4 ospiti, 1 camera, 2 letti, 1 bagno, terrazza privata 90 m², cucina, Wi-Fi, workspace, letto king 180×200 configurabile come due singoli, posizione Monte Mario vicino a Gemelli e San Filippo Neri.

## 8. Prima del go-live

- sostituire tutte le immagini placeholder;
- completare informativa Privacy/Cookie con i dati reali del titolare e servizi effettivamente attivi;
- configurare dominio e variabili Vercel;
- testare import/export iCal con prenotazioni fittizie;
- verificare email, telefono e regole commerciali del cliente;
- impostare eventuali analytics solo dopo consenso, se richiesto;
- aggiungere prezzi e pagamenti solo quando il cliente definisce policy, caparra e cancellazioni.

## Credito sviluppatore

Il footer contiene il credito con link a **@mattiacucuzza_**.
