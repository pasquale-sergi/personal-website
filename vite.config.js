import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { contactApiPlugin } from "./server/vite-contact.js";

export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    contactApiPlugin({ ...loadEnv(mode, process.cwd(), ""), ...process.env }),
  ],
}));
