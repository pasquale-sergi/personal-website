import { createApp } from "vue";
import LegalPage from "./pages/LegalPage.vue";
import "./styles.css";

createApp(LegalPage, {
  page: document.getElementById("app").dataset.page,
}).mount("#app");
