# Alice Madness Quiz

React SPA (Vite + TypeScript): 10 losowych pytań z bazy, zapis nicku i wyniku do Firebase (Firestore), losowanie zwycięzcy na `/admin-losowanie`.

## Lokalnie

```bash
cp .env.example .env   # uzupełnij config z Firebase
npm install
npm run dev
```

## Struktura

- `src/data/questions.json` — baza pytań (`correct` = indeks poprawnej odpowiedzi). Quiz losuje 10 z nich.
- `src/lib/results.ts` — zapis/odczyt wyników z kolekcji `results` (`nick`, `score`, `total`, `day`, `createdAt`). `day` to data w strefie Europe/Warsaw.
- `src/pages/QuizPage.tsx` — quiz.
- `src/pages/AdminDrawPage.tsx` — `/admin-losowanie`: losuje jeden wynik z danego dnia z ≥ 7/10 pkt.
- `firestore.rules` — reguły bezpieczeństwa (wklej w Firebase console → Firestore → Rules).

## Firebase

1. Utwórz projekt w Firebase, dodaj aplikację Web, włącz Firestore.
2. Skopiuj config do `.env` (patrz `.env.example`).
3. Wgraj reguły z `firestore.rules`.

## Deploy (GitHub Pages)

Budowanie odbywa się lokalnie, z configiem z `.env`:

```bash
npm run deploy
```

Skrypt buduje aplikację, dodaje `404.html` (żeby działały bezpośrednie linki, np. `/admin-losowanie`) i wypycha `dist/` na gałąź `gh-pages`.

Jednorazowo: Settings → Pages → Source: **Deploy from a branch**, gałąź `gh-pages`, folder `/ (root)`.

Repo: `project-league/alice-quiz`. Jeśli zmienisz nazwę repo, zmień też `base` w `vite.config.ts`.

Adres: `https://project-league.github.io/alice-quiz/`, admin: `https://project-league.github.io/alice-quiz/admin-losowanie`.

## Do zrobienia

- Designy.
- `/admin-losowanie` chroni tylko proste hasło (hash w `VITE_ADMIN_PASSWORD_HASH`). To słabe zabezpieczenie: hash jest w kodzie strony, a reguły Firestore wciąż pozwalają każdemu czytać wyniki. Docelowo: Firebase Auth + reguły z listą adresów.

## Zmiana hasła do /admin-losowanie

```bash
printf %s "nowe-haslo" | shasum -a 256
```

Wynik wklej do `.env` jako `VITE_ADMIN_PASSWORD_HASH=...` i zrób `npm run deploy`.
