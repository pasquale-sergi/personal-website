// Builds the client bundle, renders every page to static HTML and writes
// sitemap.xml. The output in dist/ is plain static files for any host.
import { build } from "vite";
import { access, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = path.join(root, "dist");
const ssrOut = path.join(root, ".ssr");

await build({ root });
await build({
  root,
  logLevel: "warn",
  build: {
    ssr: "src/entry-server.js",
    outDir: ssrOut,
    emptyOutDir: true,
    rollupOptions: { output: { entryFileNames: "entry-server.mjs" } },
  },
});

const { render, pages, renderHead } = await import(
  pathToFileURL(path.join(ssrOut, "entry-server.mjs")).href
);
const { site } = await import(
  pathToFileURL(path.join(root, "src/site.config.js")).href
);
const template = await readFile(path.join(dist, "index.html"), "utf8");
const allowTodos =
  process.argv.includes("--allow-todos") || !!process.env.ALLOW_TODOS;
const todos = [];
const missing = new Set();

for (const page of pages) {
  const appHtml = await render(page.name);
  const html = template
    .replace("<!--app-head-->", renderHead(page))
    .replace(
      '<div id="app"></div>',
      `<div id="app" data-page="${page.name}">${appHtml}</div>`,
    );
  const file = path.join(dist, page.path, "index.html");
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
  // Everything a visitor or crawler can see: text, meta tags and JSON-LD.
  const visible = html.replace(/<!--[\s\S]*?-->/g, "");
  for (const match of visible.matchAll(/TODO[^<"\]]{0,60}/g)) {
    todos.push(`${page.path}  ${match[0].trim()}`);
  }
  // Every local file referenced by src, srcset or href must exist.
  for (const [, attr] of html.matchAll(/(?:src|srcset|href)="([^"]+)"/g)) {
    for (const ref of attr.split(",").map((part) => part.trim().split(" ")[0])) {
      if (!ref.startsWith("/") || ref.startsWith("//")) continue;
      const file = ref.split(/[?#]/)[0];
      const target = path.join(dist, file.endsWith("/") ? `${file}index.html` : file);
      if (!pages.some((p) => p.path === file)) {
        await access(target).catch(() => missing.add(`${page.path} -> ${ref}`));
      }
    }
  }
}

const urls = pages
  .filter((page) => !page.noindex)
  .map((page) => `  <url><loc>${site.url}${page.path}</loc></url>`)
  .join("\n");
await writeFile(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
await rm(ssrOut, { recursive: true, force: true });

console.log(`\nPre-rendered ${pages.length} page(s) and sitemap.xml.`);
if (missing.size) {
  await rm(dist, { recursive: true, force: true });
  console.error(
    `\nBuild failed: missing files:\n  ${[...missing].join("\n  ")}\n` +
      "Mockup images: run `npm run mockups` after changing show.caseStudy.",
  );
  process.exit(1);
}
if (todos.length) {
  const list = todos.map((todo) => `  ${todo}`).join("\n");
  if (allowTodos) {
    console.warn(`Staging build: ${todos.length} visible TODO placeholder(s).`);
  } else {
    // Leave nothing deployable behind when placeholders are still visible.
    await rm(dist, { recursive: true, force: true });
    console.error(
      `\nBuild failed: ${todos.length} TODO placeholder(s) are still visible:\n${list}\n\n` +
        "Fill them in (mostly src/site.config.js), or run `npm run build:staging` for a preview build.",
    );
    process.exit(1);
  }
}
