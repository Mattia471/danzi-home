# Deployment e go-live

## Vercel

Configurazione consigliata:

| Impostazione | Valore |
| --- | --- |
| Framework | Vite |
| Install command | `pnpm install --frozen-lockfile` |
| Build command | `pnpm build` |
| Output directory | `dist` |
| Node | 20+ |

## Variabili ambiente

Configurare in Vercel almeno le variabili Kross necessarie.

In demo:

```env
VITE_KROSS_DEMO_MODE=true
```

In produzione:

```env
VITE_KROSS_DEMO_MODE=false
VITE_KROSS_BOOKING_URL=https://...
VITE_KROSS_PROPERTY_ID=...
```

Le variabili Supabase server-side vanno aggiunte solo se gli endpoint legacy vengono effettivamente mantenuti.

## Verifiche pre-deploy

```bash
pnpm install --frozen-lockfile
pnpm check
```

## Checklist go-live

### Contenuti

- [ ] foto ufficiali
- [ ] indirizzo
- [ ] telefono
- [ ] email
- [ ] descrizioni
- [ ] servizi
- [ ] policy commerciali

### Booking

- [ ] Kross configurato
- [ ] demo disattivata
- [ ] disponibilità reale testata
- [ ] prenotazione test completata
- [ ] cancellazione/modifica testata
- [ ] Airbnb sincronizzato dal Channel Manager

### Privacy

- [ ] privacy policy definitiva
- [ ] cookie policy coerente con strumenti attivi
- [ ] eventuali analytics configurati con consenso quando richiesto
- [ ] nessun secret esposto nel frontend

### Mobile

- [ ] iPhone Safari
- [ ] Android Chrome
- [ ] menu
- [ ] date picker
- [ ] CTA sticky
- [ ] Google Maps
- [ ] redirect Kross

### SEO / brand

- [ ] dominio definitivo
- [ ] favicon
- [ ] Open Graph
- [ ] title/description
- [ ] sitemap/robots se aggiunti
- [ ] canonical URL quando noto

## Rollback

Vercel conserva i deployment precedenti. In caso di regressione, ripristinare l'ultimo deployment funzionante e correggere su branch separato.
