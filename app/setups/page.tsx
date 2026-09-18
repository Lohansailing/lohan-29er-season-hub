"use client";

import { useMemo, useState } from "react";
import { Search, Star, Waves, Wind } from "lucide-react";
import { useHub } from "@/components/data-provider";
import { Card, PageHeader, Pill } from "@/components/ui";

export default function SetupsPage() {
  const { state } = useHub();
  const [wind, setWind] = useState(16);
  const [query, setQuery] = useState("");

  const matches = useMemo(() => state.setups.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase()) &&
    wind >= s.windMin - 2 && wind <= s.windMax + 2
  ), [state.setups, query, wind]);

  return (
    <div className="page">
      <PageHeader eyebrow="Mémoire technique" title="Réglages 29er" description="Retrouver en quelques secondes ce qui a bien fonctionné dans les mêmes conditions." />
      <Card className="filter-bar">
        <label className="search-box"><Search size={18} /><input placeholder="Rechercher un réglage…" value={query} onChange={(e) => setQuery(e.target.value)} /></label>
        <label className="wind-filter"><Wind size={18} /><span>{wind} nd</span><input type="range" min="4" max="30" value={wind} onChange={(e) => setWind(Number(e.target.value))} /></label>
      </Card>
      <div className="setup-grid">
        {matches.map((setup) => (
          <Card className="setup-card" key={setup.id}>
            <div className="row-between"><Pill tone="blue"><Wind size={13} /> {setup.windMin}–{setup.windMax} nd</Pill>{setup.reference && <span className="reference"><Star size={14} fill="currentColor" /> Référence</span>}</div>
            <h2>{setup.name}</h2>
            <div className="setup-specs">
              <span><b>Quête</b>{setup.mastRake}</span>
              <span><b>Tension</b>{setup.rigTension}</span>
              <span><b>Mer</b><Waves size={15} /> {setup.sea === "all" ? "Toutes" : setup.sea === "flat" ? "Plat" : setup.sea === "chop" ? "Clapot" : "Vagues"}</span>
            </div>
            <p>{setup.notes}</p>
          </Card>
        ))}
        {matches.length === 0 && <Card className="empty-state">Aucun réglage ne correspond à ce filtre. Élargis la plage de vent ou efface la recherche.</Card>}
      </div>
    </div>
  );
}
