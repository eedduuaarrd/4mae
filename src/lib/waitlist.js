const STORAGE_KEY = "4mae_waitlist_v1";
export const BASE_SIGNUP_COUNT = 312;

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function readEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function getSignupCount() {
  return BASE_SIGNUP_COUNT + readEntries().length;
}

export function hasJoined(email) {
  const norm = email.trim().toLowerCase();
  return readEntries().some((e) => e.email === norm);
}

export async function joinWaitlist(email, source = "landing") {
  const norm = email.trim().toLowerCase();
  if (!isValidEmail(norm)) {
    return { ok: false, error: "Introdueix un email vàlid" };
  }
  if (hasJoined(norm)) {
    return { ok: false, error: "Aquest email ja està a la llista" };
  }

  const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT;
  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email: norm,
          source,
          joinedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        return { ok: false, error: "No s'ha pogut registrar. Torna-ho a provar." };
      }
    } catch {
      return { ok: false, error: "Error de connexió. Comprova la xarxa." };
    }
  }

  const entries = readEntries();
  entries.push({ email: norm, source, at: new Date().toISOString() });
  writeEntries(entries);

  window.dispatchEvent(new CustomEvent("4mae:waitlist-updated"));
  return { ok: true };
}
