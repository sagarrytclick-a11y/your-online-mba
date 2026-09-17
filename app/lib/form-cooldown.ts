const COOLDOWN_MS = 8_000; // short anti double-click only
const STORAGE_KEY = "yom_form_cooldown";

export function getFormCooldownRemaining(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const remaining = Number(raw) - Date.now();
    return remaining > 0 ? remaining : 0;
  } catch {
    return 0;
  }
}

export function markFormSubmitted(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, String(Date.now() + COOLDOWN_MS));
  } catch {
    /* ignore */
  }
}

export function formatCooldown(ms: number): string {
  const sec = Math.ceil(ms / 1000);
  return sec <= 60 ? `${sec}s` : `${Math.ceil(sec / 60)}m`;
}
