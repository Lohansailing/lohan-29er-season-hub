"use client";

import { useState } from "react";
import { ArrowRight, CalendarClock, Plus, UsersRound } from "lucide-react";
import { useHub } from "@/components/data-provider";
import { Card, PageHeader, Pill } from "@/components/ui";
import type { SponsorStage } from "@/lib/types";
import { formatDate } from "@/lib/format";

const stages: { id: SponsorStage; label: string }[] = [
  { id: "target", label: "Cible" }, { id: "contacted", label: "Contacté" },
  { id: "discussion", label: "Échange" }, { id: "sent", label: "Dossier envoyé" },
  { id: "followup", label: "Relance" }, { id: "won", label: "Accord" }, { id: "lost", label: "Refus" }
];

export default function SponsorsPage() {
  const { state, addSponsor, updateSponsorStage } = useHub();
  const [open, setOpen] = useState(false);
  const [organisation, setOrganisation] = useState("");
  const [nextAction, setNextAction] = useState("");

  function create(e: React.FormEvent) {
    e.preventDefault();
    addSponsor({ organisation, nextAction, stage: "target" });
    setOrganisation(""); setNextAction(""); setOpen(false);
  }

  function advance(id: string, current: SponsorStage) {
    const idx = stages.findIndex((s) => s.id === current);
    if (idx >= 0 && idx < stages.length - 2) updateSponsorStage(id, stages[idx + 1].id);
  }

  return (
    <div className="page wide">
      <PageHeader eyebrow="Mini-CRM" title="Sponsoring" description="Chaque prospect a un statut, une prochaine action et une date." action={<button className="button primary" onClick={() => setOpen(!open)}><Plus size={17} /> Prospect</button>} />
      {open && <Card className="form-card compact-form"><form onSubmit={create} className="form-grid"><label>Organisation<input value={organisation} onChange={(e) => setOrganisation(e.target.value)} required /></label><label>Prochaine action<input value={nextAction} onChange={(e) => setNextAction(e.target.value)} required /></label><div className="form-actions span-2"><button className="button primary">Ajouter au pipeline</button></div></form></Card>}
      <div className="kanban">
        {stages.filter((s) => !["lost"].includes(s.id)).map((stage) => (
          <div className="kanban-column" key={stage.id}>
            <div className="kanban-head"><span>{stage.label}</span><b>{state.sponsors.filter((sp) => sp.stage === stage.id).length}</b></div>
            {state.sponsors.filter((sp) => sp.stage === stage.id).map((sp) => (
              <Card className="sponsor-card" key={sp.id}>
                <div className="sponsor-icon"><UsersRound size={18} /></div>
                <strong>{sp.organisation}</strong>
                {sp.contact && <small>{sp.contact}</small>}
                <p>{sp.nextAction}</p>
                {sp.dueDate && <Pill tone="amber"><CalendarClock size={13} /> {formatDate(sp.dueDate)}</Pill>}
                {!["won","lost"].includes(sp.stage) && <button className="advance" onClick={() => advance(sp.id, sp.stage)}>Étape suivante <ArrowRight size={15} /></button>}
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
