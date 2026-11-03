# Contributing

Questa repository contiene il sito D'Anzi House.

## Workflow consigliato

1. crea una branch da `main`;
2. usa nomi descrittivi, ad esempio `feat/kross-widget` o `fix/mobile-booking`;
3. mantieni le modifiche focalizzate;
4. esegui i controlli locali;
5. apri una Pull Request.

## Controlli

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
pnpm build
```

Oppure:

```bash
pnpm check
```

## Convenzioni commit

Preferire messaggi brevi e leggibili:

```text
feat: add Kross booking handoff
fix: correct mobile booking scroll
docs: improve deployment guide
chore: clean generated files
```

## Regole

- non committare file `.env`;
- non committare chiavi o token;
- non inserire prezzi demo come prezzi reali;
- mantenere Kross come unica fonte booking quando attivo;
- ottimizzare le immagini prima di aggiungerle;
- verificare sempre mobile e desktop;
- preservare il credito sviluppatore nel footer salvo richiesta esplicita del proprietario del progetto.
