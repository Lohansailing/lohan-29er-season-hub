"use client";

import { Bike, CheckCircle2, Circle, Dumbbell, Sailboat, Waves, Footprints } from "lucide-react";
import { useHub } from "@/components/data-provider";
import { Card, PageHeader, Pill, SectionTitle } from "@/components/ui";
import { formatDate } from "@/lib/format";

const sportIcon = {
  bike: Bike, sailing: Sailboat, strength: Dumbbell, swim: Waves, run: Footprints
};

export default function WorkoutsPage() {
  const { state } = useHub();
  return (
    <div className="page">
      <PageHeader eyebrow="Prévu / réalisé" title="Entraînement" description="Comparer le plan et le réel sans double saisie. Le connecteur Nolio est préparé pour l'étape suivante." />
      <SectionTitle>Cette semaine</SectionTitle>
      <div className="stack">
        {state.workouts.map((w) => {
          const Icon = sportIcon[w.sport];
          return (
            <Card className="workout-card" key={w.id}>
              <div className="workout-status">{w.completed ? <CheckCircle2 /> : <Circle />}</div>
              <div className="workout-icon"><Icon size={20} /></div>
              <div className="grow">
                <div className="row-wrap"><strong>{w.title}</strong><Pill tone={w.source === "nolio" ? "green" : "neutral"}>{w.source}</Pill></div>
                <p>{formatDate(w.date, { weekday: "long", day: "numeric", month: "short" })} · prévu {w.plannedMinutes} min{w.actualMinutes ? " · réalisé " + w.actualMinutes + " min" : ""}</p>
                {w.rpe && <small>RPE {w.rpe}/10</small>}
              </div>
            </Card>
          );
        })}
      </div>
      <Card className="connector-card">
        <div><span className="kicker">Automatisation</span><h2>Nolio</h2><p>Interface de connecteur prête côté architecture. Les identifiants OAuth sont nécessaires pour activer la synchronisation réelle.</p></div>
        <Pill tone="amber">À connecter</Pill>
      </Card>
    </div>
  );
}
