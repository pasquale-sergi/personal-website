import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";
import App from "./App.vue";

export { publicPages as pages } from "./pages.js";
export { renderHead } from "./head.js";

export function render(page) {
  return renderToString(createSSRApp(App, { page }));
}
