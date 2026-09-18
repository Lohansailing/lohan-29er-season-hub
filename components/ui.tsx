import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <header className="page-header">
      <div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h1>{title}</h1>{description && <p className="lead">{description}</p>}</div>
      {action && <div className="page-header-action">{action}</div>}
    </header>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={"card " + className}>{children}</section>;
}

export function SectionTitle({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return <div className="section-title"><h2>{children}</h2>{right}</div>;
}

export function Pill({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "blue" | "green" | "amber" | "red" }) {
  return <span className={"pill pill-" + tone}>{children}</span>;
}

export function Progress({ value }: { value: number }) {
  return <div className="progress" aria-label={value + "%"}><span style={{ width: Math.max(0, Math.min(100, value)) + "%" }} /></div>;
}

export function Score({ value }: { value?: number }) {
  if (!value) return <span className="muted">—</span>;
  return <span className="score-dots" aria-label={value + " sur 5"}>{[1,2,3,4,5].map((n) => <i className={n <= value ? "on" : ""} key={n} />)}</span>;
}
