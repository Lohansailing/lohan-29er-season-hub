# Lohan 29er Season Hub

PWA mobile-first pour centraliser une saison de 29er : calendrier, entraînement, carnet de navigation, réglages, objectifs, nutrition, documents et sponsoring.

## État du projet

Une première version fonctionnelle du MVP est disponible dans ce dépôt. Elle fonctionne immédiatement en **mode démonstration local**, sans compte externe, et persiste les saisies dans le navigateur.

Fonctionnel :
- dashboard Aujourd'hui / semaine ;
- calendrier saison et jalons ;
- entraînements prévu / réalisé ;
- préparation et historique des séances 29er ;
- recherche de réglages par plage de vent ;
- objectifs SMART modifiables ;
- checklist nutrition/hydratation ;
- pipeline sponsoring ;
- bibliothèque documents ;
- rôles simulés athlete / coach / parent / teammate / admin ;
- manifeste PWA + cache hors ligne léger.

Préparé pour la production :
- schéma PostgreSQL/Supabase + RLS ;
- architecture de connecteurs externes ;
- Nolio laissé volontairement sans faux endpoint tant que la documentation officielle et les identifiants OAuth ne sont pas configurés.

## Lancer dans Codespaces ou en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

Pour vérifier avant un commit :

```bash
npm run typecheck
npm run build
```

## Variables d'environnement

Copier `.env.example` vers `.env.local`. Aucune variable n'est nécessaire pour le mode démonstration.

## Base de données

La migration initiale est dans `supabase/migrations/0001_initial.sql`.

## Architecture

Voir `docs/ARCHITECTURE.md`.
