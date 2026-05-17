import { appendWaitlistRow } from "./lib/waitlist-csv.mjs";

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

export function waitlistApiPlugin() {
  return {
    name: "waitlist-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = req.url?.split("?")[0];
        if (path !== "/api/waitlist") return next();

        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method !== "POST") {
          sendJson(res, 405, { error: "Mètode no permès" });
          return;
        }

        try {
          const body = await readJsonBody(req);
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
      });
    },
  };
}
