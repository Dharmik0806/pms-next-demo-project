// Date helpers used by tables and cards.

// "12 Mar 2026" – returns a dash when the date is missing
export function formatDate(value?: string | Date | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

// "2026-03-12" – the format <input type="date"> needs
export function toInputDate(value?: string | Date | null): string {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

// True when a due date is in the past
export function isPast(value?: string | Date | null): boolean {
  if (!value) return false;
  return new Date(value).getTime() < Date.now();
}
