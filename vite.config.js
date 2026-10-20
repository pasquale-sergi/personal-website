import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { contactApiPlugin } from "./server/vite-contact.js";
import { fileURLToPath } from "node:url";

// Match static directory-index URLs locally without a Vercel rewrite.
function legalPageUrls() {
  const install = (server) => {
    server.middlewares.use((request, _response, next) => {
      const pathname = request.url?.split("?")[0];
      if (["/impressum", "/datenschutz"].includes(pathname)) {
        request.url = request.url.replace(pathname, `${pathname}/`);
      }
      next();
    });
  };
  return {
    name: "local-legal-page-urls",
    configureServer: install,
    configurePreviewServer: install,
  };
}

export default defineConfig(({ mode }) => ({
  appType: "mpa",
  plugins: [
    vue(),
    legalPageUrls(),
    contactApiPlugin({ ...loadEnv(mode, process.cwd(), ""), ...process.env }),
  ],
  build: {
    rollupOptions: {
      input: {
        home: fileURLToPath(new URL("./index.html", import.meta.url)),
        impressum: fileURLToPath(
          new URL("./impressum/index.html", import.meta.url),
        ),
        datenschutz: fileURLToPath(
          new URL("./datenschutz/index.html", import.meta.url),
        ),
      },
    },
  },
}));
