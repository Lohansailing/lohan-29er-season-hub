"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, CalendarDays, Dumbbell, Gauge, Goal, Home, NotebookTabs, Settings, SlidersHorizontal, Soup, UsersRound, FileText } from "lucide-react";
import { useHub } from "./data-provider";
import { canAccess, type Resource } from "@/lib/rbac";

const items: { href: string; label: string; resource: Resource; icon: React.ComponentType<{ size?: number; strokeWidth?: number }> }[] = [
  { href: "/", label: "Aujourd’hui", resource: "dashboard", icon: Home },
  { href: "/calendar", label: "Saison", resource: "calendar", icon: CalendarDays },
  { href: "/sailing", label: "Navigation", resource: "sailing", icon: NotebookTabs },
  { href: "/setups", label: "Réglages", resource: "setups", icon: SlidersHorizontal },
  { href: "/goals", label: "Objectifs", resource: "goals", icon: Goal },
  { href: "/workouts", label: "Entraînement", resource: "workouts", icon: Dumbbell },
  { href: "/nutrition", label: "Nutrition", resource: "nutrition", icon: Soup },
  { href: "/sponsors", label: "Sponsoring", resource: "sponsors", icon: UsersRound },
  { href: "/documents", label: "Documents", resource: "documents", icon: FileText },
  { href: "/reports", label: "Bilans", resource: "reports", icon: BarChart3 },
  { href: "/settings", label: "Réglages app", resource: "settings", icon: Settings }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { state } = useHub();
  const visible = items.filter((item) => canAccess(state.role, item.resource));

  return (
    <div className="app-frame">
      <aside className="desktop-sidebar">
        <div className="brand">
          <div className="brand-mark"><Gauge size={22} /></div>
          <div><strong>29er Season Hub</strong><span>Saison 2026/27</span></div>
        </div>
        <nav>
          {visible.map(({ href, label, icon: Icon }) => (
            <Link className={pathname === href ? "nav-link active" : "nav-link"} href={href} key={href}>
              <Icon size={19} /><span>{label}</span>
            </Link>
          ))}
        </nav>
        <div className="sidebar-foot">
          <span className="role-pill">{roleLabel(state.role)}</span>
          <small>Données locales de démonstration</small>
        </div>
      </aside>
      <main className="main-content">{children}</main>
      <nav className="mobile-nav" aria-label="Navigation principale">
        {visible.slice(0, 5).map(({ href, label, icon: Icon }) => (
          <Link className={pathname === href ? "mobile-nav-link active" : "mobile-nav-link"} href={href} key={href}>
            <Icon size={20} strokeWidth={2.2} /><span>{label}</span>
          </Link>
        ))}
        <Link className={pathname === "/settings" ? "mobile-nav-link active" : "mobile-nav-link"} href="/settings">
          <Settings size={20} strokeWidth={2.2} /><span>Plus</span>
        </Link>
      </nav>
    </div>
  );
}

function roleLabel(role: string) {
  return ({ athlete: "Lohan · athlète", coach: "Coach", parent: "Parent", teammate: "Marin · équipier", admin: "Admin" } as Record<string,string>)[role] ?? role;
}
