"use client";

import { Check, Droplets, Fuel, Utensils } from "lucide-react";
import { useHub } from "@/components/data-provider";
import { Card, PageHeader, Pill, SectionTitle } from "@/components/ui";

const phaseInfo = {
  before: { title: "Avant", icon: Utensils },
  during: { title: "Pendant", icon: Fuel },
  after: { title: "Après", icon: Droplets }
};

export default function NutritionPage() {
  const { state, toggleNutritionItem } = useHub();
  const done = state.nutrition.filter((i) => i.done).length;

  return (
    <div className="page">
      <PageHeader eyebrow="Protocole du jour" title="Nutrition & hydratation" description="Prévu / réalisé, sans transformer le ravitaillement en tableau compliqué." action={<Pill tone="green">{done}/{state.nutrition.length}</Pill>} />
      <div className="nutrition-grid">
        {(Object.keys(phaseInfo) as Array<keyof typeof phaseInfo>).map((phase) => {
          const InfoIcon = phaseInfo[phase].icon;
          return (
            <div key={phase}>
              <SectionTitle><span className="inline-icon"><InfoIcon size={18} /> {phaseInfo[phase].title}</span></SectionTitle>
              <Card className="checklist">
                {state.nutrition.filter((i) => i.phase === phase).map((item) => (
                  <button className={item.done ? "check-row done" : "check-row"} onClick={() => toggleNutritionItem(item.id)} key={item.id}>
                    <span className="checkbox">{item.done && <Check size={16} />}</span><span>{item.label}</span>
                  </button>
                ))}
              </Card>
            </div>
          );
        })}
      </div>
      <Card className="protocol-note"><strong>Repère régate</strong><p>Le protocole est une aide de suivi sportif. Les quantités restent ajustables selon la durée, la météo, la tolérance et les consignes de l'encadrement.</p></Card>
    </div>
  );
}
