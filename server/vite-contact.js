import { Readable } from "node:stream";
import { createContactHandler } from "./contact.js";

// Local development/preview uses the same endpoint as Vercel, with no delivery mocks.
export function contactApiPlugin(env) {
  const handle = createContactHandler({ env });
  const middleware = async (req, res, next) => {
    if (req.url?.split("?")[0] !== "/api/contact") return next();
    try {
      const request = new Request(
        new URL(req.url, `http://${req.headers.host}`),
        {
          method: req.method,
          headers: req.headers,
          ...(!["GET", "HEAD"].includes(req.method)
            ? { body: Readable.toWeb(req), duplex: "half" }
            : {}),
        },
      );
      const response = await handle(request);
      res.writeHead(response.status, Object.fromEntries(response.headers));
      res.end(await response.text());
    } catch {
      res.writeHead(500, {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      });
      res.end(
        JSON.stringify({
          error: "Die Anfrage konnte gerade nicht gesendet werden.",
        }),
      );
    }
  };
  return {
    name: "local-contact-api",
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}
