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

function saveLocally(norm, source) {
  const entries = readEntries();
  if (entries.some((e) => e.email === norm)) return false;
  entries.push({ email: norm, source, at: new Date().toISOString() });
  writeEntries(entries);
  window.dispatchEvent(new CustomEvent("4mae:waitlist-updated"));
  return true;
}

async function postToCsvApi(norm, source) {
  const res = await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      email: norm,
      source,
      joinedAt: new Date().toISOString(),
    }),
  });

  if (res.status === 409) {
    return { ok: false, duplicate: true };
  }

  if (!res.ok) {
    let message = "No s'ha pogut registrar. Torna-ho a provar.";
    try {
      const data = await res.json();
      if (data.error) message = data.error;
    } catch {
      /* ignore */
    }
    return { ok: false, error: message };
  }

  return { ok: true };
}

async function postToEndpoint(endpoint, norm, source) {
  const isFormspree = endpoint.includes("formspree.io");

  if (isFormspree) {
    const body = new FormData();
    body.append("email", norm);
    body.append("source", source);
    body.append("_subject", "4mæ — Nova inscripció waitlist");
    const res = await fetch(endpoint, { method: "POST", body, headers: { Accept: "application/json" } });
    return res.ok;
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email: norm, source, joinedAt: new Date().toISOString() }),
  });
  return res.ok;
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

  const staticHost =
    typeof window !== "undefined" && window.location.hostname.endsWith("github.io");

  try {
    const csvResult = await postToCsvApi(norm, source);
    if (!csvResult.ok) {
      return {
        ok: false,
        error: csvResult.duplicate ? "Aquest email ja està a la llista" : csvResult.error,
      };
    }
  } catch {
    if (!staticHost) {
      return { ok: false, error: "Error de connexió. Comprova la xarxa." };
    }
  }

  const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT?.trim();

  if (endpoint) {
    try {
      const sent = await postToEndpoint(endpoint, norm, source);
      if (!sent) {
        return { ok: false, error: "No s'ha pogut enviar a Formspree. Torna-ho a provar." };
      }
    } catch {
      return { ok: false, error: "Error de connexió. Comprova la xarxa." };
    }
  }

  saveLocally(norm, source);
  return { ok: true };
}
