export function formatDate(date: string, options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" }) {
  return new Intl.DateTimeFormat("fr-FR", options).format(new Date(date + "T12:00:00"));
}
export function daysUntil(date: string) {
  const now = new Date();
  const target = new Date(date + "T12:00:00");
  return Math.ceil((target.getTime() - now.getTime()) / 86400000);
}
