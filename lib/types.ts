export type Role = "athlete" | "coach" | "parent" | "teammate" | "admin";
export type EventKind = "race" | "camp" | "school" | "travel" | "milestone";
export type Priority = "A" | "B" | "C";
export type SeaState = "flat" | "chop" | "waves";
export type SponsorStage = "target" | "contacted" | "discussion" | "sent" | "followup" | "won" | "lost";

export interface SeasonEvent {
  id: string; title: string; kind: EventKind; start: string; end?: string;
  location?: string; priority?: Priority; notes?: string;
}
export interface Goal {
  id: string; title: string; detail: string; target: string; deadline: string;
  progress: number; scope: "individual" | "crew";
}
export interface Workout {
  id: string; sport: "sailing" | "bike" | "run" | "swim" | "strength";
  title: string; date: string; plannedMinutes: number; actualMinutes?: number;
  rpe?: number; source: "manual" | "nolio"; completed: boolean;
}
export interface SailingSession {
  id: string; date: string; location: string; windMin: number; windMax: number;
  sea: SeaState; objective1: string; objective2?: string; setupId?: string;
  upwindScore?: number; downwindScore?: number; maneuversScore?: number;
  tacticsScore?: number; communicationScore?: number; energyScore?: number;
  strengths: string[]; problem?: string; nextAction?: string; crewShared: boolean;
}
export interface BoatSetup {
  id: string; name: string; windMin: number; windMax: number; sea: SeaState | "all";
  mastRake: string; rigTension: string; notes: string; reference: boolean;
}
export interface NutritionItem {
  id: string; label: string; phase: "before" | "during" | "after"; done: boolean;
}
export interface Sponsor {
  id: string; organisation: string; contact?: string; stage: SponsorStage;
  value?: string; nextAction: string; dueDate?: string;
}
export interface HubDocument {
  id: string; title: string; category: "sponsor" | "sport" | "boat" | "travel" | "school";
  updatedAt: string; visibility: "private" | "crew" | "coach" | "parents"; url?: string;
}
export interface HubState {
  role: Role; events: SeasonEvent[]; goals: Goal[]; workouts: Workout[];
  sailingSessions: SailingSession[]; setups: BoatSetup[]; nutrition: NutritionItem[];
  sponsors: Sponsor[]; documents: HubDocument[];
}
