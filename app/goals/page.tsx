"use client";

import { Minus, Plus, Target } from "lucide-react";
import { useHub } from "@/components/data-provider";
import { Card, PageHeader, Pill, Progress } from "@/components/ui";
import { formatDate } from "@/lib/format";

export default function GoalsPage() {
  const { state, updateGoalProgress } = useHub();
  return (
    <div className="page">
      <PageHeader eyebrow="Objectifs SMART" title="Objectifs & jalons" description="Trois priorités visibles, une preuve de progrès, une prochaine action." />
      <div className="goal-grid">
        {state.goals.map((goal) => (
          <Card className="goal-card" key={goal.id}>
            <div className="row-between">
              <div className="goal-icon"><Target size={19} /></div>
              <Pill tone={goal.scope === "crew" ? "blue" : "neutral"}>{goal.scope === "crew" ? "Équipage" : "Individuel"}</Pill>
            </div>
            <h2>{goal.title}</h2><p>{goal.detail}</p>
            <div className="goal-target"><span>Cible</span><strong>{goal.target}</strong></div>
            <Progress value={goal.progress} />
            <div className="row-between"><small>{goal.progress}%</small><small>Échéance {formatDate(goal.deadline)}</small></div>
            {state.role !== "parent" && state.role !== "teammate" && (
              <div className="stepper">
                <button onClick={() => updateGoalProgress(goal.id, goal.progress - 5)} aria-label="Diminuer"><Minus size={16} /></button>
                <span>Mettre à jour</span>
                <button onClick={() => updateGoalProgress(goal.id, goal.progress + 5)} aria-label="Augmenter"><Plus size={16} /></button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
