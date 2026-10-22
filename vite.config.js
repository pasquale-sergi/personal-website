import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { pages, pageForPath } from "./src/pages.js";
import { renderHead } from "./src/head.js";
import { show } from "./src/site.config.js";

// In development the head tags are injected per request. Production pages
// get theirs from scripts/prerender.js.
const devHead = {
  name: "dev-head",
  apply: "serve",
  transformIndexHtml(html, { path }) {
    const page = pages.find((p) => p.name === pageForPath(path));
    return html.replace("<!--app-head-->", renderHead(page));
  },
};

export default defineConfig({
  plugins: [vue(), devHead],
  // DEBUG_HYDRATION=1 npm run build logs hydration mismatches in production.
  define: {
    // Build-time switch: while false, no case-study code or client name ships.
    __CASE_STUDY__: JSON.stringify(show.caseStudy),
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(
      !!process.env.DEBUG_HYDRATION,
    ),
  },
});
