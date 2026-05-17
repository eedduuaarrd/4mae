import {
  handleWaitlistGet,
  handleWaitlistPost,
} from "./lib/waitlist-api-handlers.mjs";

export function waitlistApiPlugin() {
  return {
    name: "waitlist-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = req.url?.split("?")[0];
        if (pathname !== "/api/waitlist") return next();

        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method === "GET") {
          await handleWaitlistGet(req, res);
          return;
        }

        if (req.method === "POST") {
          await handleWaitlistPost(req, res);
          return;
        }

        res.statusCode = 405;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.end(JSON.stringify({ error: "Mètode no permès" }));
      });
    },
  };
}
