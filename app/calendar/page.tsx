"use client";

import { CalendarDays, Flag, GraduationCap, MapPin, Milestone, Plane, TentTree } from "lucide-react";
import { useHub } from "@/components/data-provider";
import { Card, PageHeader, Pill, SectionTitle } from "@/components/ui";
import { formatDate } from "@/lib/format";
import type { EventKind } from "@/lib/types";

const icons: Record<EventKind, React.ComponentType<{ size?: number }>> = {
  race: Flag, camp: TentTree, school: GraduationCap, travel: Plane, milestone: Milestone
};
const labels: Record<EventKind, string> = { race: "Régate", camp: "Stage", school: "Scolaire", travel: "Déplacement", milestone: "Jalon" };

export default function CalendarPage() {
  const { state } = useHub();
  const events = state.events.slice().sort((a,b) => a.start.localeCompare(b.start));

  return (
    <div className="page">
      <PageHeader eyebrow="Saison 2026/27" title="Calendrier & jalons" description="Sport, école et logistique dans la même chronologie." />
      <div className="month-strip">
        {["Sep","Oct","Nov","Déc","Jan","Fév","Mar","Avr","Mai","Juin","Juil","Aoû"].map((m,i) => <button className={i === 0 ? "month active" : "month"} key={m}>{m}</button>)}
      </div>
      <SectionTitle>Prochaines échéances</SectionTitle>
      <div className="stack">
        {events.map((event) => {
          const Icon = icons[event.kind];
          return (
            <Card className="event-card" key={event.id}>
              <div className={"event-icon kind-" + event.kind}><Icon size={20} /></div>
              <div className="event-main">
                <div className="row-wrap"><strong>{event.title}</strong><Pill tone={event.priority === "A" ? "amber" : "neutral"}>{event.priority || labels[event.kind]}</Pill></div>
                <p><CalendarDays size={15} /> {formatDate(event.start, { weekday: "long", day: "numeric", month: "long" })}{event.end ? " → " + formatDate(event.end, { day: "numeric", month: "long" }) : ""}</p>
                {event.location && <p><MapPin size={15} /> {event.location}</p>}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
