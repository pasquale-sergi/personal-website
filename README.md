# Pasquale Sergi — Website Relaunch

German (de-CH) landing page for pasquale.dev, built with Vue 3, Vite and plain CSS. No UI framework, router, backend, tracking or external runtime assets.

## Run locally

```sh
npm install
npm run dev
```

Use the local URL printed by Vite. For production:

```sh
npm test
npm run build            # production: fails while TODO placeholders are visible
npm run build:staging    # preview build: same output, TODOs allowed
npm run preview
```

`npm run build` builds the client bundle and then pre-renders every page in `src/pages.js` to static HTML (`dist/index.html`, `dist/impressum/index.html`, ...), plus `sitemap.xml`. The browser hydrates the pre-rendered markup. Deploy `dist/` on any static host.

Pre-deploy checks in the production build:
- **TODO gate:** if any page still shows `TODO` (text, meta or JSON-LD), the build lists them, deletes `dist/` and exits with code 1. `npm run build:staging` (or `--allow-todos` / `ALLOW_TODOS=1`) skips the gate for preview deployments.
- **Missing files:** every local `src`/`srcset`/`href` must exist in `dist/`.

`DEBUG_HYDRATION=1 npm run build:staging` logs hydration mismatches in the browser console.

## Content and settings

- `src/site.config.js`: contact data, prices, Betreuung terms, referral terms, extras and the switches `show.caseStudy`, `show.guarantee`, `offer.freePreview`, `offer.niche`. Change prices and terms here only.
- `src/content/faq.js`: FAQ, also used for the FAQPage structured data.
- `src/pages.js`: routes, titles and meta descriptions. `src/head.js`: meta, Open Graph and JSON-LD.
- `npm run og-image` re-renders `public/og-image.png` from `scripts/og-image.html` with local Chrome.
- `npm run mockups` renders the before/after illustrations (`src/components/WebsiteMockup.vue`, shown on the dev-only page `/_mockups/`) to AVIF/WebP in `public/images/mockups/`. Run it after changing the mockups or switching `show.caseStudy`; the Huber images are only generated while the case study is on. Needs local Chrome, and ffmpeg with libaom for AVIF.
- `show.caseStudy` is also a build-time constant: while it is `false`, no case-study code or client name ends up in `dist/`.

## Styles

`src/styles/tokens.css` (colours, type scale, spacing, radii, shadows, fonts), `base.css` (elements, buttons, links, shared cards), `sections.css` (one block per section, mobile-first), `mockup-layout.css` (before/after arrangement). Inter Tight (headings) and DM Sans (body) are self-hosted in `public/fonts/` under the SIL Open Font License.

## Proposal requests

The hero field validates and normalises the URL, then moves focus to the email field of the full form (`#anfrage`). The full form asks for website, email and an optional message and has a hidden honeypot field. Logic: `src/lib/proposal.js` (tested in `tests/`).

Delivery is configured in `form` in `src/site.config.js`:
- **Default (no endpoint):** opens a prepared email to `site.email` in the visitor's mail app.
- **Endpoint:** set `VITE_FORM_ENDPOINT` (see `.env.example`) to POST `website`, `email`, `message`, `package`, `subject`. `VITE_FORM_ENCODING=form` sends `application/x-www-form-urlencoded` instead of JSON; `form.extraFields` adds static fields a service may need; `VITE_FORM_ACCESS_KEY` fills Web3Forms' `access_key`. On error the visitor sees a message with the direct email address. When an endpoint is set, the Datenschutz page names the form service (`form.serviceName`).

## Legal pages

`/impressum/` and `/datenschutz/` contain the final texts. The Datenschutzerklärung names Cloudflare (Cloudflare Pages) as hosting and, when a form endpoint is set, `form.serviceName` (Web3Forms) as form service. Update both pages if providers change.
