// Renders scripts/og-image.html to public/og-image.png (1200x630) with a
// locally installed Chrome. Run after changing the hero headline or price.
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const chrome =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const source = new URL("./og-image.html", import.meta.url).href;
const target = fileURLToPath(new URL("../public/og-image.png", import.meta.url));

execFileSync(chrome, [
  "--headless",
  "--disable-gpu",
  "--hide-scrollbars",
  "--force-device-scale-factor=1",
  "--window-size=1200,630",
  `--screenshot=${target}`,
  source,
]);
console.log(`Wrote ${target}`);
