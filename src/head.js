import { site, prices } from "./site.config.js";
import { faq } from "./content/faq.js";

const ogImage = `${site.url}/og-image.png`;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function jsonLd(data) {
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
}

function businessData() {
  const { postalCode, locality } = site.address;
  const business = {
    "@type": "ProfessionalService",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: `${site.url}/`,
    email: site.email,
    image: ogImage,
    description:
      "Website-Relaunch für Schweizer Kleinunternehmen: bestehende Websites modern neu gebaut, zum Fixpreis. Hosting und Betreuung auf Wunsch.",
    areaServed: { "@type": "Country", name: "Schweiz" },
    founder: { "@type": "Person", name: site.name },
    priceRange: `CHF ${prices.relaunch}–${prices.cms}`,
    makesOffer: [
      { name: "Website-Relaunch", price: prices.relaunch },
      { name: "Relaunch mit CMS", price: prices.cms },
    ].map(({ name, price }) => ({
      "@type": "Offer",
      name,
      price: String(price),
      priceCurrency: "CHF",
    })),
  };
  business.address = {
    "@type": "PostalAddress",
    postalCode,
    addressLocality: locality,
    addressCountry: "CH",
  };
  return business;
}

function faqData() {
  return {
    "@type": "FAQPage",
    "@id": `${site.url}/#faq`,
    mainEntity: faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function renderHead(page) {
  const url = `${site.url}${page.path}`;
  const tags = [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    page.noindex ? `<meta name="robots" content="noindex, follow" />` : "",
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="de_CH" />`,
    `<meta property="og:site_name" content="${escapeHtml(site.name)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Deine alte Website. Neu gemacht. Website-Relaunch ab CHF 990." />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
  ];
  if (page.name === "home") {
    tags.push(
      jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          businessData(),
          {
            "@type": "WebSite",
            "@id": `${site.url}/#website`,
            url: `${site.url}/`,
            name: site.name,
            inLanguage: "de-CH",
            publisher: { "@id": `${site.url}/#business` },
          },
          faqData(),
        ],
      }),
    );
  }
  return tags.filter(Boolean).join("\n    ");
}
