import { createApp, createSSRApp } from "vue";
import App from "./App.vue";
import { pageForPath } from "./pages.js";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/sections.css";
import "./styles/mockup-layout.css";

const container = document.getElementById("app");
const page = container.dataset.page || pageForPath(window.location.pathname);
// Pre-rendered pages are hydrated; the dev server renders from scratch.
const create = container.hasChildNodes() ? createSSRApp : createApp;
create(App, { page }).mount(container);
