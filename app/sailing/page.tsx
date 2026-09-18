"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Gauge, Plus, Sailboat, Share2, Sparkles, Wind } from "lucide-react";
import { useHub } from "@/components/data-provider";
import { Card, PageHeader, Pill, Score, SectionTitle } from "@/components/ui";
import { formatDate } from "@/lib/format";
import type { SeaState } from "@/lib/types";

export default function SailingPage() {
  const { state, addSailingSession } = useHub();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("2026-09-19");
  const [location, setLocation] = useState("Brest");
  const [windMin, setWindMin] = useState(12);
  const [windMax, setWindMax] = useState(18);
  const [sea, setSea] = useState<SeaState>("chop");
  const [objective1, setObjective1] = useState("Vitesse au près");
  const [objective2, setObjective2] = useState("Communication sous spi");
  const [setupId, setSetupId] = useState(state.setups[1]?.id ?? "");
  const [crewShared, setCrewShared] = useState(true);

  const recommended = useMemo(() => state.setups.find((s) => s.windMin <= windMin && s.windMax >= windMax && (s.sea === sea || s.sea === "all")), [state.setups, windMin, windMax, sea]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    addSailingSession({
      date, location, windMin, windMax, sea, objective1, objective2, setupId,
      strengths: [], nextAction: "Débriefer après la séance", crewShared
    });
    setOpen(false);
  }

  return (
    <div className="page">
      <PageHeader
        eyebrow="Carnet 29er"
        title="Navigation"
        description="Avant : créer l'intention. Après : transformer la séance en apprentissage."
        action={<button className="button primary" onClick={() => setOpen(!open)}><Plus size={17} /> Préparer</button>}
      />

      {open && (
        <Card className="form-card">
          <div className="row-between"><div><span className="kicker">Étape 1/2</span><h2>Préparer la séance</h2></div><Pill tone="blue">≈ 2 min</Pill></div>
          <form onSubmit={submit} className="form-grid">
            <label>Date<input type="date" value={date} onChange={(e) => setDate(e.target.value)} required /></label>
            <label>Lieu<input value={location} onChange={(e) => setLocation(e.target.value)} required /></label>
            <label>Vent min (nd)<input type="number" min="0" max="50" value={windMin} onChange={(e) => setWindMin(Number(e.target.value))} /></label>
            <label>Vent max (nd)<input type="number" min="0" max="50" value={windMax} onChange={(e) => setWindMax(Number(e.target.value))} /></label>
            <label>État de mer<select value={sea} onChange={(e) => setSea(e.target.value as SeaState)}><option value="flat">Plat</option><option value="chop">Clapot</option><option value="waves">Vagues</option></select></label>
            <label>Réglage<select value={setupId} onChange={(e) => setSetupId(e.target.value)}>{state.setups.map((s) => <option value={s.id} key={s.id}>{s.name}</option>)}</select></label>
            <label className="span-2">Objectif 1<input value={objective1} onChange={(e) => setObjective1(e.target.value)} required /></label>
            <label className="span-2">Objectif 2<input value={objective2} onChange={(e) => setObjective2(e.target.value)} /></label>
            {recommended && <div className="recommendation span-2"><Sparkles size={17} /><span><strong>Réglage cohérent :</strong> {recommended.name}</span></div>}
            <label className="toggle-row span-2"><input type="checkbox" checked={crewShared} onChange={(e) => setCrewShared(e.target.checked)} /><span>Partager la partie équipage avec Marin</span></label>
            <div className="form-actions span-2"><button type="button" className="button ghost" onClick={() => setOpen(false)}>Annuler</button><button className="button primary" type="submit">Enregistrer la préparation</button></div>
          </form>
        </Card>
      )}

      <SectionTitle>Historique récent</SectionTitle>
      <div className="stack">
        {state.sailingSessions.map((session) => {
          const setup = state.setups.find((s) => s.id === session.setupId);
          return (
            <Card className="session-card" key={session.id}>
              <div className="session-head">
                <div className="session-date"><Sailboat size={20} /><div><strong>{formatDate(session.date, { weekday: "long", day: "numeric", month: "long" })}</strong><span>{session.location}</span></div></div>
                <div className="row-wrap"><Pill tone="blue"><Wind size={13} /> {session.windMin}–{session.windMax} nd</Pill>{session.crewShared && <Pill tone="green"><Share2 size={13} /> équipage</Pill>}</div>
              </div>
              <div className="session-objectives"><span><b>Objectif 1</b>{session.objective1}</span>{session.objective2 && <span><b>Objectif 2</b>{session.objective2}</span>}</div>
              {setup && <div className="setup-inline"><Gauge size={16} /><span><b>Réglage :</b> {setup.name}</span></div>}
              {session.communicationScore && (
                <div className="scores-grid">
                  <span>Près <Score value={session.upwindScore} /></span>
                  <span>Portant <Score value={session.downwindScore} /></span>
                  <span>Manœuvres <Score value={session.maneuversScore} /></span>
                  <span>Tactique <Score value={session.tacticsScore} /></span>
                  <span>Communication <Score value={session.communicationScore} /></span>
                  <span>Énergie <Score value={session.energyScore} /></span>
                </div>
              )}
              {session.strengths.length > 0 && <div className="lessons"><strong>Points forts</strong>{session.strengths.map((s) => <span key={s}>✓ {s}</span>)}</div>}
              {session.problem && <p className="problem"><strong>À régler :</strong> {session.problem}</p>}
              {session.nextAction && <div className="next-action"><span>Prochaine action</span><strong>{session.nextAction}</strong></div>}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
