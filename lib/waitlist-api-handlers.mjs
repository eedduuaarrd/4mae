import { appendWaitlistRow, readWaitlistCsv, getWaitlistEntries } from "./waitlist-csv.mjs";

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

export function isAdminAuthorized(req) {
  const secret = process.env.WAITLIST_ADMIN_SECRET?.trim();
  if (!secret) return false;

  const url = new URL(req.url || "/", "http://localhost");
  const headerKey = req.headers["x-admin-key"] || req.headers["X-Admin-Key"];
  const key = headerKey || url.searchParams.get("key");
  return key === secret;
}

export async function handleWaitlistGet(req, res) {
  if (!isAdminAuthorized(req)) {
    sendJson(res, 401, { error: "No autoritzat" });
    return;
  }

  try {
    const url = new URL(req.url || "/", "http://localhost");
    const format = url.searchParams.get("format") || "csv";

    if (format === "json") {
      const entries = await getWaitlistEntries();
      sendJson(res, 200, { count: entries.length, entries, updatedAt: new Date().toISOString() });
      return;
    }

    const csv = await readWaitlistCsv();
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", 'attachment; filename="waitlist.csv"');
    res.end(csv.startsWith("\uFEFF") ? csv : `\uFEFF${csv}`);
  } catch (e) {
    sendJson(res, 500, { error: e.message || "Error llegint la llista" });
  }
}

export async function readRequestBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body);
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

export async function handleWaitlistPost(req, res) {
  try {
    const body = await readRequestBody(req);
    const email = body.email?.trim();
    const source = body.source?.trim() || "landing";
    const joinedAt = body.joinedAt || new Date().toISOString();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      sendJson(res, 400, { error: "Email no vàlid" });
      return;
    }

    await appendWaitlistRow({ email, source, joinedAt });
    sendJson(res, 200, { ok: true });
  } catch (e) {
    if (e.code === "DUPLICATE") {
      sendJson(res, 409, { error: "Aquest email ja està a la llista" });
      return;
    }
    sendJson(res, 500, { error: e.message || "Error guardant el correu" });
  }
}
