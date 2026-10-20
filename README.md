# Bloomwise

A 30-day growth planner for clearer communication, C# and backend skills, and kinder self-reflection.
React 18 + Vite + React Router, with Supabase (Auth + Postgres + Row Level Security).
Styled with the BexMindhub **Rose Royale** token system (`src/styles/theme.css`).

## Setup

1. **Create a Supabase project** at https://supabase.com.
2. In **SQL Editor**, run `supabase/schema.sql` (creates tables and RLS policies).
3. In **Authentication > Providers**, keep Email enabled. For quick local testing you can turn off "Confirm email".
4. Copy `.env.example` to `.env` and fill in **Project URL** and **anon public key** (Project Settings > API).
5. Install and run:

```bash
npm install
npm run dev
```

Build for production with `npm run build` (output in `dist/`). Because the app uses client-side routing, configure your host to serve `index.html` for unknown paths.

## Structure

```
supabase/schema.sql      Tables + RLS
public/                  favicon.svg/.ico, app icons, logo.svg, manifest
src/
  main.jsx, App.jsx      Entry + routes
  context/AuthContext    Session + profile
  lib/                   supabase client, plan logic, content, dates
  hooks/                 useChecklist, useStreak, useDebouncedSave
  components/            Layout, ProtectedRoute, Logo, ui primitives
  pages/                 Auth, Onboarding, Today, Week, Speak, Journal, Roadmap
  styles/                theme.css (tokens), app.css
```

## Data model

| Table | Purpose |
|---|---|
| `profiles` | Name, schedule, daily minutes, focus, start date, difficult-day mode |
| `daily_progress` | One row per checked daily task (drives progress and streak) |
| `week_progress` | Week 1 checklist (21 tasks) |
| `speaking_drafts` | Point/Reason/Example/Conclusion draft (autosaved) |
| `vocab_logs` | Three words per day |
| `journal_entries` | Feelings and bedtime reflections |

Every table is restricted to `auth.uid()`; the anon key is safe to ship in the browser.

## Brand

Name: **Bloomwise** (growth + wisdom). Mark: a five-petal rose bloom with a `<>` core, for code at the centre of growth.
