# Security Policy

## Segnalazioni

Per vulnerabilità o esposizioni di credenziali, evitare issue pubbliche con dettagli sensibili.

Contattare direttamente il maintainer della repository tramite il profilo GitHub.

## Segreti

Non devono mai essere committati:

- `.env` e varianti locali;
- Supabase service-role key;
- token Vercel;
- credenziali Kross;
- chiavi Resend private;
- qualsiasi segreto del cliente.

Le variabili con prefisso `VITE_` sono incorporate nel frontend e devono essere considerate pubbliche.

## Supabase

La anon key può essere usata dal client quando le policy RLS sono configurate correttamente. La service-role key deve restare esclusivamente server-side.

## Dipendenze

La CI esegue lint e build ad ogni push/PR verso `main`. Gli aggiornamenti delle dipendenze vanno testati prima del merge.
