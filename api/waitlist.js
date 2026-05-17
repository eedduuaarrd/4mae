import { appendWaitlistRow, readWaitlistCsv } from "../lib/waitlist-csv.mjs";

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body);
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method === "GET") {
    const secret = process.env.WAITLIST_ADMIN_SECRET?.trim();
    const key = req.headers["x-admin-key"] || req.query?.key;
    if (!secret || key !== secret) {
      sendJson(res, 401, { error: "No autoritzat" });
      return;
    }
    try {
      const csv = await readWaitlistCsv();
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", 'attachment; filename="waitlist.csv"');
      res.end(csv);
    } catch (e) {
      sendJson(res, 500, { error: e.message || "Error llegint el CSV" });
    }
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Mètode no permès" });
    return;
  }

  try {
    const body = await readBody(req);
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
