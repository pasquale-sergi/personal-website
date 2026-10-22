// Renders the before/after mockups (dev page /_mockups/) to images:
// public/images/mockups/<example>-<variant>-<640|1280>.{avif,webp}
// plus src/content/mockups.json with the intrinsic sizes.
// Needs local Chrome; AVIF additionally needs ffmpeg with libaom-av1.
import { createServer } from "vite";
import { spawn, execFileSync } from "node:child_process";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const outDir = path.join(root, "public/images/mockups");
const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const { show } = await import(pathToFileURL(path.join(root, "src/site.config.js")).href);
// Client-named images only exist once the case study is approved.
const examples = show.caseStudy ? ["generic", "huber"] : ["generic"];
const widths = [640, 1280];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let hasAvif = false;
try {
  hasAvif = execFileSync("ffmpeg", ["-hide_banner", "-encoders"]).toString().includes("libaom-av1");
} catch {}

const server = await createServer({ root, logLevel: "error", server: { port: 5199, strictPort: true } });
await server.listen();
const port = 9336;
const chrome = spawn(chromePath, [
  "--headless=new",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${path.join(root, ".ssr/chrome")}`,
  "about:blank",
]);

try {
  let target;
  for (let i = 0; i < 60 && !target; i++) {
    await sleep(250);
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
      target = list.find((t) => t.type === "page");
    } catch {}
  }
  if (!target) throw new Error("Chrome did not start (is another run still active?)");
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0;
  const pending = {};
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending[msg.id]) pending[msg.id](msg.result);
  };
  const send = (method, params = {}) =>
    new Promise((r) => {
      pending[++id] = r;
      ws.send(JSON.stringify({ id, method, params }));
    });

  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  const manifest = {};
  for (const scale of [1, 2]) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: 900,
      height: 3000,
      deviceScaleFactor: scale,
      mobile: false,
    });
    await send("Page.navigate", {
      url: `http://localhost:5199/_mockups/?examples=${examples.join(",")}`,
    });
    await sleep(2500);
    await send("Runtime.evaluate", { expression: "document.fonts.ready", awaitPromise: true });
    const { result } = await send("Runtime.evaluate", {
      returnByValue: true,
      expression: `[...document.querySelectorAll('[data-mockup]')].map(el => {
        const b = el.getBoundingClientRect();
        return { name: el.dataset.mockup, x: b.x, y: b.y + scrollY, width: b.width, height: b.height };
      })`,
    });
    for (const box of result.value) {
      const width = box.width * scale;
      const height = Math.round(box.height * scale);
      const base = path.join(outDir, `${box.name}-${widths[scale - 1]}`);
      const shot = await send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: true,
        clip: { x: box.x, y: box.y, width: box.width, height: box.height, scale: 1 },
      });
      const png = `${base}.png`;
      await writeFile(png, Buffer.from(shot.data, "base64"));
      const webp = await send("Page.captureScreenshot", {
        format: "webp",
        quality: 82,
        captureBeyondViewport: true,
        clip: { x: box.x, y: box.y, width: box.width, height: box.height, scale: 1 },
      });
      await writeFile(`${base}.webp`, Buffer.from(webp.data, "base64"));
      if (hasAvif) {
        execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", png, "-c:v", "libaom-av1",
          "-still-picture", "1", "-crf", "32", "-pix_fmt", "yuv420p", `${base}.avif`]);
      }
      await rm(png);
      if (scale === 2) manifest[box.name] = { width, height };
    }
  }
  manifest.formats = hasAvif ? ["avif", "webp"] : ["webp"];
  await writeFile(
    path.join(root, "src/content/mockups.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
  console.log(`Wrote ${examples.length * 4} mockup images (${manifest.formats.join(", ")}).`);
} finally {
  chrome.kill();
  await server.close();
  await rm(path.join(root, ".ssr/chrome"), { recursive: true, force: true });
}
