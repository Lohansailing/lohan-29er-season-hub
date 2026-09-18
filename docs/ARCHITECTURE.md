# Architecture — Lohan 29er Season Hub

## Product loop

The application is organized around one loop:

**planifier → préparer → réaliser/importer → débriefer → apprendre → ajuster**

The dashboard is deliberately not a reporting warehouse: it points to the next useful action.

## Current implementation

- Next.js App Router + React + TypeScript
- Mobile-first PWA shell, installable manifest and lightweight service worker
- Role-aware navigation for athlete / coach / parent / teammate / admin
- Functional demo data stored locally in the browser so the prototype is immediately usable
- Core screens: dashboard, season calendar, workouts, sailing journal, boat setups, goals, nutrition, sponsoring and documents
- Normalized PostgreSQL/Supabase migration with RLS foundations
- External connector boundary for Nolio; no endpoint is invented before official docs and credentials are verified

## Production transition

1. Create an EU-region Supabase project.
2. Apply `supabase/migrations/0001_initial.sql`.
3. Add Supabase server/client helpers and replace the local demo provider with repository-backed queries.
4. Provision users and `season_members` roles.
5. Tighten write policies per resource/role.
6. Register a Nolio developer application and verify its official OAuth scopes/endpoints.
7. Encrypt external provider tokens server-side only.
8. Add webhook ingestion with idempotency keys via `sync_jobs`.

## Privacy model

The teammate role only sees crew-shared sailing sessions. Nutrition, detailed personal metrics, school information and sponsoring are not exposed to the teammate by default. Real enforcement belongs in PostgreSQL RLS/server authorization; the current client role switch is only a prototype preview.

## Offline

The service worker caches the shell and key pages. Demo entries are persisted in `localStorage`. Production offline drafts should use IndexedDB with an explicit sync queue and conflict strategy.
