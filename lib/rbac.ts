import type { Role } from "./types";

export type Resource = "dashboard" | "calendar" | "workouts" | "sailing" | "setups" | "goals" | "nutrition" | "sponsors" | "documents" | "reports" | "settings";

const access: Record<Role, Resource[]> = {
  athlete: ["dashboard","calendar","workouts","sailing","setups","goals","nutrition","sponsors","documents","reports","settings"],
  coach: ["dashboard","calendar","workouts","sailing","setups","goals","nutrition","documents","reports","settings"],
  parent: ["dashboard","calendar","goals","sponsors","documents","reports","settings"],
  teammate: ["dashboard","sailing","setups","goals","documents","reports","settings"],
  admin: ["dashboard","calendar","workouts","sailing","setups","goals","nutrition","sponsors","documents","reports","settings"]
};
export function canAccess(role: Role, resource: Resource) { return access[role].includes(resource); }
