"use client";

import { BarChart3, CheckCircle2, Flag, MessageSquareText, Target } from "lucide-react";
import { useHub } from "@/components/data-provider";
import { Card, PageHeader, Progress, Score, SectionTitle } from "@/components/ui";

export default function ReportsPage() {
  const { state } = useHub();
  const completed = state.workouts.filter((w) => w.completed).length;
  const planned = state.workouts.length;
  const completion = planned ? Math.round((completed / planned) * 100) : 0;
  const latest = state.sailingSessions[0];
  const avgGoal = state.goals.length ? Math.round(state.goals.reduce((sum, g) => sum + g.progress, 0) / state.goals.length) : 0;

  return (
    <div className="page">
      <PageHeader eyebrow="Bilan automatique" title="Cette semaine" description="Une synthèse lisible par Lohan, le coach et les parents selon leurs droits." />
      <div className="stats-grid">
        <Card><span className="stat-label">Plan réalisé</span><strong className="stat-value">{completion}%</strong><Progress value={completion} /></Card>
        <Card><span className="stat-label">Progression objectifs</span><strong className="stat-value">{avgGoal}%</strong><Progress value={avgGoal} /></Card>
        <Card><span className="stat-label">Débriefs voile</span><strong className="stat-value">{state.sailingSessions.length}</strong><span className="stat-note">séance(s) enregistrée(s)</span></Card>
      </div>

      <div className="two-col">
        <div>
          <SectionTitle>Ce qui progresse</SectionTitle>
          <Card className="report-list">
            {state.goals.slice().sort((a,b) => b.progress-a.progress).slice(0,3).map((goal) => (
              <div className="report-row" key={goal.id}><Target size={18} /><div><strong>{goal.title}</strong><p>{goal.progress}% · {goal.target}</p></div></div>
            ))}
          </Card>
        </div>
        <div>
          <SectionTitle>Dernière navigation</SectionTitle>
          <Card className="report-list">
            {latest ? <>
              <div className="report-row"><Flag size={18} /><div><strong>{latest.location} · {latest.windMin}–{latest.windMax} nd</strong><p>{latest.objective1}</p></div></div>
              <div className="report-row"><MessageSquareText size={18} /><div><strong>Communication</strong><p><Score value={latest.communicationScore} /></p></div></div>
              <div className="report-row"><CheckCircle2 size={18} /><div><strong>Prochaine action</strong><p>{latest.nextAction}</p></div></div>
            </> : <p className="muted">Aucune séance débriefée.</p>}
          </Card>
        </div>
      </div>

      <Card className="report-summary">
        <BarChart3 size={20} />
        <div><strong>Synthèse prête à partager</strong><p>Le prototype calcule cette vue à partir des données enregistrées. La génération PDF et la synthèse IA pourront être ajoutées après connexion de la base et validation des règles de partage.</p></div>
      </Card>
    </div>
  );
}
