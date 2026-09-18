"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { seedState } from "@/lib/seed";
import type { HubState, Role, SailingSession, Sponsor, SponsorStage } from "@/lib/types";

const STORAGE_KEY = "lohan-29er-season-hub:v1";

type DataContextValue = {
  state: HubState; hydrated: boolean; setRole: (role: Role) => void;
  addSailingSession: (session: Omit<SailingSession, "id">) => void;
  updateGoalProgress: (id: string, progress: number) => void;
  toggleNutritionItem: (id: string) => void;
  addSponsor: (sponsor: Omit<Sponsor, "id">) => void;
  updateSponsorStage: (id: string, stage: SponsorStage) => void;
  resetDemo: () => void;
};

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<HubState>(seedState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw) as HubState);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const value = useMemo<DataContextValue>(() => ({
    state, hydrated,
    setRole: (role) => setState((s) => ({ ...s, role })),
    addSailingSession: (session) => setState((s) => ({ ...s, sailingSessions: [{ ...session, id: crypto.randomUUID() }, ...s.sailingSessions] })),
    updateGoalProgress: (id, progress) => setState((s) => ({ ...s, goals: s.goals.map((g) => g.id === id ? { ...g, progress: Math.max(0, Math.min(100, progress)) } : g) })),
    toggleNutritionItem: (id) => setState((s) => ({ ...s, nutrition: s.nutrition.map((n) => n.id === id ? { ...n, done: !n.done } : n) })),
    addSponsor: (sponsor) => setState((s) => ({ ...s, sponsors: [{ ...sponsor, id: crypto.randomUUID() }, ...s.sponsors] })),
    updateSponsorStage: (id, stage) => setState((s) => ({ ...s, sponsors: s.sponsors.map((sp) => sp.id === id ? { ...sp, stage } : sp) })),
    resetDemo: () => setState(seedState)
  }), [state, hydrated]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useHub() {
  const value = useContext(DataContext);
  if (!value) throw new Error("useHub must be used inside DataProvider");
  return value;
}
