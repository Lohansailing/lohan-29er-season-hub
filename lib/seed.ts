import type { HubState } from "./types";

export const seedState: HubState = {
  role: "athlete",
  events: [
    { id: "e1", title: "Stage Pôle France", kind: "camp", start: "2026-09-19", end: "2026-09-20", location: "Brest", priority: "B" },
    { id: "e2", title: "Eurocup", kind: "race", start: "2026-10-23", end: "2026-10-26", location: "Hyères", priority: "A" },
    { id: "e3", title: "Contrôle de physique", kind: "school", start: "2026-09-24", priority: "B" },
    { id: "e4", title: "Bilan Toussaint", kind: "milestone", start: "2026-10-30", priority: "A" }
  ],
  goals: [
    { id: "g1", title: "Départs plus agressifs", detail: "Être lancé à T-0 avec option de sortie claire.", target: "8/10 départs satisfaisants", deadline: "2026-10-23", progress: 55, scope: "crew" },
    { id: "g2", title: "Communication sous spi", detail: "Information courte, continue et exploitable sur pression/hauteur.", target: "Score communication ≥ 4/5", deadline: "2026-10-23", progress: 70, scope: "crew" },
    { id: "g3", title: "Régularité physique", detail: "Tenir le plan extra-voile sans double saisie.", target: "90 % des séances réalisées", deadline: "2026-10-15", progress: 82, scope: "individual" }
  ],
  workouts: [
    { id: "w1", sport: "strength", title: "PPG", date: "2026-09-18", plannedMinutes: 60, actualMinutes: 58, rpe: 6, source: "manual", completed: true },
    { id: "w2", sport: "sailing", title: "Navigation 29er — vitesse", date: "2026-09-19", plannedMinutes: 180, source: "manual", completed: false },
    { id: "w3", sport: "bike", title: "Wattbike endurance", date: "2026-09-21", plannedMinutes: 75, source: "manual", completed: false }
  ],
  sailingSessions: [{
    id: "s1", date: "2026-09-16", location: "Brest", windMin: 14, windMax: 18, sea: "chop",
    objective1: "Vitesse au près", objective2: "Communication portant", setupId: "set2",
    upwindScore: 4, downwindScore: 4, maneuversScore: 3, tacticsScore: 4, communicationScore: 4, energyScore: 4,
    strengths: ["Bonne vitesse dans les claques", "Communication plus courte"], problem: "Deux empannages trop tardifs",
    nextAction: "Déclencher l'empannage sur mot-clé unique", crewShared: true
  }],
  setups: [
    { id: "set1", name: "Petit temps — plat", windMin: 4, windMax: 9, sea: "flat", mastRake: "Référence coach", rigTension: "Bas", notes: "Chercher puissance et assiette libre.", reference: true },
    { id: "set2", name: "Médium — clapot", windMin: 12, windMax: 18, sea: "chop", mastRake: "Référence coach + 1", rigTension: "Médium+", notes: "Priorité contrôle dans le clapot.", reference: true },
    { id: "set3", name: "Brise", windMin: 19, windMax: 30, sea: "all", mastRake: "Référence brise", rigTension: "Haut", notes: "Bateau plat, sorties de manœuvre simples.", reference: true }
  ],
  nutrition: [
    { id: "n1", phase: "before", label: "Petit-déjeuner complet 2–3 h avant", done: true },
    { id: "n2", phase: "before", label: "500 ml eau + électrolytes avant mise à l'eau", done: false },
    { id: "n3", phase: "during", label: "Objectif glucides 60 g/h", done: false },
    { id: "n4", phase: "during", label: "Flasque 500 ml + recharge zodiac", done: false },
    { id: "n5", phase: "after", label: "Récupération : glucides + protéines + eau", done: false }
  ],
  sponsors: [
    { id: "sp1", organisation: "Entreprise locale A", stage: "contacted", nextAction: "Relancer avec dossier", dueDate: "2026-09-22" },
    { id: "sp2", organisation: "Marque nautique B", stage: "discussion", nextAction: "Préparer proposition de visibilité", dueDate: "2026-09-25" },
    { id: "sp3", organisation: "Partenaire C", stage: "target", nextAction: "Trouver le bon contact" }
  ],
  documents: [
    { id: "d1", title: "CV sportif 2026", category: "sport", updatedAt: "2026-09-10", visibility: "coach" },
    { id: "d2", title: "Dossier sponsoring", category: "sponsor", updatedAt: "2026-09-12", visibility: "private" },
    { id: "d3", title: "Checklist bateau", category: "boat", updatedAt: "2026-09-15", visibility: "crew" }
  ]
};
