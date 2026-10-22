// Every page is pre-rendered to <path>index.html at build time.
export const pages = [
  {
    path: "/",
    name: "home",
    title: "Website-Relaunch für Schweizer KMU ab CHF 990 | Pasquale Sergi",
    description:
      "Ich baue deine bestehende Website neu: modern, schnell und mobilfreundlich. Fixer Preis ab CHF 990, bestehende Inhalte werden übernommen. Kostenlose Einschätzung.",
  },
  {
    path: "/impressum/",
    name: "impressum",
    title: "Impressum | Pasquale Sergi",
    description: "Impressum von pasquale.dev: Angaben zum Anbieter und Kontakt.",
  },
  {
    path: "/datenschutz/",
    name: "datenschutz",
    title: "Datenschutzerklärung | Pasquale Sergi",
    description:
      "Wie pasquale.dev mit Personendaten umgeht: keine Cookies, kein Tracking, Anfragen werden nur zur Beantwortung genutzt.",
  },
  // Dev server only: source for the mockup images (npm run mockups).
  {
    path: "/_mockups/",
    name: "mockups",
    title: "Mockups",
    description: "",
    devOnly: true,
    noindex: true,
  },
];

export const publicPages = pages.filter((page) => !page.devOnly);

export function pageForPath(pathname) {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return (pages.find((page) => page.path === path) || pages[0]).name;
}
