"use client";

import { Database, PlugZap, RotateCcw, ShieldCheck, Smartphone } from "lucide-react";
import { useHub } from "@/components/data-provider";
import { Card, PageHeader, Pill, SectionTitle } from "@/components/ui";
import type { Role } from "@/lib/types";

const roles: { value: Role; label: string; detail: string }[] = [
  { value: "athlete", label: "Lohan", detail: "Accès complet à son espace" },
  { value: "coach", label: "Coach", detail: "Sport, voile, objectifs et métriques utiles" },
  { value: "parent", label: "Parent", detail: "Calendrier, logistique, sponsoring et synthèse" },
  { value: "teammate", label: "Marin", detail: "Carnets et réglages explicitement partagés" },
  { value: "admin", label: "Administrateur", detail: "Paramètres techniques et intégrations" }
];

export default function SettingsPage() {
  const { state, setRole, resetDemo } = useHub();
  return (
    <div className="page">
      <PageHeader eyebrow="Application" title="Réglages" description="Mode prototype : change de rôle pour vérifier les vues et les restrictions fonctionnelles." />
      <SectionTitle>Rôle simulé</SectionTitle>
      <Card className="role-list">
        {roles.map((role) => (
          <button className={state.role === role.value ? "role-row selected" : "role-row"} onClick={() => setRole(role.value)} key={role.value}>
            <span><strong>{role.label}</strong><small>{role.detail}</small></span>
            {state.role === role.value && <Pill tone="green">Actif</Pill>}
          </button>
        ))}
      </Card>

      <SectionTitle>Infrastructure</SectionTitle>
      <div className="settings-grid">
        <Card className="setting-card"><Smartphone /><div><strong>PWA</strong><p>Installable et responsive</p></div><Pill tone="green">Prête</Pill></Card>
        <Card className="setting-card"><Database /><div><strong>PostgreSQL / Supabase</strong><p>Migration fournie, clés à renseigner</p></div><Pill tone="amber">À connecter</Pill></Card>
        <Card className="setting-card"><PlugZap /><div><strong>Nolio OAuth2</strong><p>Adaptateur préparé, identifiants requis</p></div><Pill tone="amber">À connecter</Pill></Card>
        <Card className="setting-card"><ShieldCheck /><div><strong>RBAC</strong><p>Vues par rôle + schéma RLS prévu</p></div><Pill tone="green">Préparé</Pill></Card>
      </div>

      <button className="button danger" onClick={resetDemo}><RotateCcw size={17} /> Réinitialiser les données de démonstration</button>
    </div>
  );
}
