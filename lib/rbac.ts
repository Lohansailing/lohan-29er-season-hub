import type { Role } from "./types";

export type Resource = "dashboard" | "calendar" | "workouts" | "sailing" | "setups" | "goals" | "nutrition" | "sponsors" | "documents" | "settings";

const access: Record<Role, Resource[]> = {
  athlete: ["dashboard","calendar","workouts","sailing","setups","goals","nutrition","sponsors","documents","settings"],
  coach: ["dashboard","calendar","workouts","sailing","setups","goals","nutrition","documents","settings"],
  parent: ["dashboard","calendar","goals","sponsors","documents","settings"],
  teammate: ["dashboard","sailing","setups","goals","documents","settings"],
  admin: ["dashboard","calendar","workouts","sailing","setups","goals","nutrition","sponsors","documents","settings"]
};
export function canAccess(role: Role, resource: Resource) { return access[role].includes(resource); }
