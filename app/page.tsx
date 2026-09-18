"use client";

import Link from "next/link";
import { ArrowRight, CalendarClock, CheckCircle2, CloudSun, Flag, NotebookPen, Plus, TimerReset, Trophy } from "lucide-react";
import { useHub } from "@/components/data-provider";
import { Card, PageHeader, Pill, Progress, SectionTitle } from "@/components/ui";
import { daysUntil, formatDate } from "@/lib/format";

export default function DashboardPage() {
  const { state } = useHub();
  const nextWorkout = state.workouts.find((w) => !w.completed);
  const nextRace = state.events.find((e) => e.kind === "race");
  const openNutrition = state.nutrition.filter((n) => !n.done).length;

  return (
    <div className="page">
      <PageHeader eyebrow="Vendredi 18 septembre" title="Aujourd’hui" description="Un seul cockpit pour décider, faire, débriefer et apprendre." />

      <div className="hero-grid">
        <Card className="hero-card">
          <div className="hero-top"><div><span className="kicker">Prochaine séance</span><h2>{nextWorkout?.title ?? "Aucune séance prévue"}</h2></div><Pill tone="blue">{nextWorkout ? formatDate(nextWorkout.date, { weekday: "short", day: "numeric", month: "short" }) : "Libre"}</Pill></div>
          <div className="hero-meta">
            <span><TimerReset size={17} /> {nextWorkout?.plannedMinutes ?? 0} min prévues</span>
            <span><CloudSun size={17} /> Météo à connecter</span>
          </div>
          <div className="quick-actions">
            <Link className="button primary" href="/sailing"><NotebookPen size={18} /> Préparer</Link>
            <Link className="button" href="/sailing"><CheckCircle2 size={18} /> Débriefer</Link>
            <Link className="button ghost" href="/sailing"><Plus size={18} /> Note</Link>
          </div>
        </Card>

        <Card className="race-card">
          <span className="kicker">Prochaine régate</span>
          <div className="race-icon"><Flag size={22} /></div>
          <h2>{nextRace?.title ?? "À planifier"}</h2>
          <p>{nextRace?.location} · {nextRace ? formatDate(nextRace.start, { day: "numeric", month: "long" }) : ""}</p>
          {nextRace && <div className="big-number">{daysUntil(nextRace.start)}<span>jours</span></div>}
        </Card>
      </div>

      <div className="stats-grid">
        <Card><span className="stat-label">Séances voile débriefées</span><strong className="stat-value">{state.sailingSessions.length}</strong><span className="stat-note">Objectif : ≥ 80 %</span></Card>
        <Card><span className="stat-label">Objectifs actifs</span><strong className="stat-value">{state.goals.length}</strong><span className="stat-note">Top 3 du bloc</span></Card>
        <Card><span className="stat-label">Checklist nutrition</span><strong className="stat-value">{state.nutrition.length - openNutrition}/{state.nutrition.length}</strong><span className="stat-note">{openNutrition} à cocher</span></Card>
      </div>

      <div className="two-col">
        <div>
          <SectionTitle>Priorités du bloc <Link className="text-link" href="/goals">Voir tout <ArrowRight size={15} /></Link></SectionTitle>
          <div className="stack">
            {state.goals.slice(0, 3).map((goal) => (
              <Card key={goal.id} className="goal-mini">
                <div className="row-between"><strong>{goal.title}</strong><span>{goal.progress}%</span></div>
                <Progress value={goal.progress} />
                <small>{goal.target}</small>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <SectionTitle>À venir <Link className="text-link" href="/calendar">Saison <CalendarClock size={15} /></Link></SectionTitle>
          <Card className="timeline-card">
            {state.events.slice().sort((a,b) => a.start.localeCompare(b.start)).slice(0,4).map((event) => (
              <div className="timeline-row" key={event.id}>
                <div className="date-box"><strong>{formatDate(event.start, { day: "2-digit" })}</strong><span>{formatDate(event.start, { month: "short" })}</span></div>
                <div><strong>{event.title}</strong><p>{event.location || event.kind}</p></div>
                {event.priority && <Pill tone={event.priority === "A" ? "amber" : "neutral"}>{event.priority}</Pill>}
              </div>
            ))}
          </Card>
        </div>
      </div>

      <Card className="learning-card">
        <div className="learning-icon"><Trophy size={20} /></div>
        <div><span className="kicker">Dernier apprentissage 29er</span><strong>{state.sailingSessions[0]?.nextAction || "Débriefe ta prochaine séance pour créer la mémoire d’équipage."}</strong></div>
        <Link href="/sailing"><ArrowRight /></Link>
      </Card>
    </div>
  );
}
