// Central settings for copy, prices and switches. Change prices and terms
// here only, so they stay identical across hero, pricing, Betreuung, FAQ and
// form. `npm run build` fails if any page still shows a "TODO".

export const site = {
  url: "https://pasquale.dev",
  name: "Pasquale Sergi",
  email: (
    import.meta.env?.VITE_PROPOSAL_EMAIL || "sergi.pasquale@outlook.com"
  ).trim(),
  address: {
    postalCode: "6005",
    locality: "Luzern",
    country: "Schweiz",
  },
  // Optional portrait for "Über mich". null hides the image; the section
  // then uses a single column. Example:
  // { src: "/images/pasquale.webp", width: 800, height: 1000, alt: "Pasquale Sergi" }
  photo: null,
};

// Request form delivery. Without an endpoint the form opens a prepared email
// in the visitor's mail app. To send directly, set VITE_FORM_ENDPOINT (see
// .env.example). Nothing else in the code has to change.
export const form = {
  endpoint: (import.meta.env?.VITE_FORM_ENDPOINT || "").trim(),
  // Named in the Datenschutzerklärung whenever an endpoint is set.
  serviceName: "Web3Forms",
  // "json" (most services and own serverless functions) or "form"
  // (application/x-www-form-urlencoded).
  encoding: (import.meta.env?.VITE_FORM_ENCODING || "json").trim(),
  // Static fields some services require. Values end up in the public
  // JavaScript, never put secrets here. Web3Forms expects its public
  // access key as "access_key" (VITE_FORM_ACCESS_KEY).
  extraFields: import.meta.env?.VITE_FORM_ACCESS_KEY
    ? { access_key: import.meta.env.VITE_FORM_ACCESS_KEY.trim() }
    : {},
};

// Terms that appear in several places (hero, steps, pricing, FAQ, form).
export const offer = {
  // Optional niche line under the hero subline. Leave empty to hide it.
  niche: "",
  deliveryDays: "7–10",
  responseTime: "innert 1–2 Werktagen",
  revisions: "2 Korrekturrunden",
  paymentTerms: "50% bei Start, 50% bei Launch",
  guaranteeText:
    "Überzeugt dich der Entwurf nicht, bezahlst du nur die Anzahlung und nichts weiter.",
  freePreview: true,
};

// Section switches.
export const show = {
  // Only set to true once Sportpreise Huber has approved publication, then
  // run `npm run mockups`. While false, nothing about it is built.
  caseStudy: false,
  guarantee: true,
  vatNote: true,
};

// One-off prices in CHF. Keep these the only source for prices on the site.
export const prices = {
  relaunch: 990,
  cms: 1290,
};

// Betreuung und Hosting after launch (optional for the client).
export const care = {
  yearly: 600,
  monthly: 55,
  hourly: 90,
  includedMinutes: 20,
  noticePeriod: "3 Monaten Frist auf das Ende des Vertragsjahres",
};

// Referral programme. Never advertise a discount on the main price.
export const referral = {
  credit: 100,
  newClientBonus: "eine zusätzliche Unterseite gratis",
  maxPerYear: 3,
};

// Optional add-ons, shown under the pricing tiers.
export const extras = [
  { name: "Google-Unternehmensprofil einrichten oder aufräumen", price: 190 },
  { name: "E-Mail-Einrichtung", price: 120 },
  { name: "Impressum und Datenschutz aufsetzen (Vorlage, keine Rechtsberatung)", price: 150 },
  { name: "Karte und Öffnungszeiten einbinden", price: 90 },
];

// Shown under the prices while show.vatNote is true.
export const vatNote = "Alle Preise in CHF. Keine MWST (nicht MWST-pflichtig).";

export function chf(amount) {
  return typeof amount === "number"
    ? String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, "’")
    : amount;
}

// Shared wording so the same terms read identically everywhere.
export const terms = {
  careYearly: `CHF ${chf(care.yearly)} pro Jahr`,
  careMonthly: `CHF ${chf(care.monthly)} pro Monat`,
  hourly: `CHF ${chf(care.hourly)} pro Stunde`,
  includedChanges: `bis ${care.includedMinutes} Min. Änderungen pro Monat`,
};
