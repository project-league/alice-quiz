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
2. Skopiuj config do `.env` (lokalnie) i jako sekrety repo na GitHubie (`VITE_FIREBASE_*`, patrz `.env.example`).
3. Wgraj reguły z `firestore.rules`.

## Deploy (GitHub Pages)

Workflow `.github/workflows/deploy.yml` buduje i publikuje przy każdym pushu na `main`.

1. Repo musi nazywać się `alice-madness-quiz` (tak ustawiony jest `base` w `vite.config.ts`).
2. Settings → Pages → Source: **GitHub Actions**.
3. Settings → Secrets and variables → Actions: dodaj sekrety `VITE_FIREBASE_*`.

Adres: `https://<user>.github.io/alice-madness-quiz/`, admin: `.../alice-madness-quiz/admin-losowanie`.

## Do zrobienia

- Designy.
- `/admin-losowanie` nie ma zabezpieczenia — każdy, kto zna adres, widzi listę i może losować.
