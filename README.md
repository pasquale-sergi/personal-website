# Pasquale Sergi — Website Relaunch

A focused, primarily German landing page built with Vue 3, the Composition API, Vite and plain CSS. No UI framework, router, backend, tracking or external runtime assets.

## Run locally

```sh
npm install
npm run dev
```

Use the local URL printed by Vite. For production:

```sh
npm test
npm run build
npm run preview
```

Deploy the generated `dist/` directory on a static host.

## Existing Vercel deployment

This repository is already connected to the Vercel project for `pasquale.dev`. The production branch is `master`. Pushes to that branch use the existing Git integration; no new Vercel project, domain, DNS or ownership configuration is needed.

- Framework: Vite (automatic detection).
- Install: `npm install` (the npm lockfile is committed).
- Build: `npm run build`.
- Output: `dist`.
- Root directory: repository root.
- No required production environment variables. `VITE_PROPOSAL_EMAIL` is an optional public override; the recipient defaults to `sergi.pasquale@outlook.com`.
- No server or history-based routes, so no `vercel.json` or SPA rewrites are needed.

The previous website is preserved on `backup/pre-business-relaunch` at commit `06ee8a6de8384c426851fed2f4ddc86227668497`.

## Proposal requests

The hero validates and normalizes the website URL, then scrolls to and focuses the proposal form. Package buttons carry the package selection into that form. The final form opens a prefilled email addressed to `sergi.pasquale@outlook.com`. Visitors review and send it in their own email app; the site never reports that an email was sent.

To override the recipient, copy `.env.example` to `.env.local`, edit `VITE_PROPOSAL_EMAIL`, and rebuild. Vite's `VITE_` values are public build-time configuration, so never put secrets there.

The submission integration is isolated in `src/lib/proposal.js` and `ProposalForm.vue`, ready to replace with a real form endpoint later. The contact section also displays the email address for visitors who prefer to write directly.

## Page and components

`AppHeader`, `HeroSection`, `BeforeAfterMockup`, `HowItWorks`, `PricingSection`, `CaseStudy`, `ProposalCTA`, `FAQSection`, `AppFooter`, plus shared `ProposalForm`, `WebsiteMockup`, `TrophyArt` and `AppIcon` components.

The before/after browsers use responsive CSS and local SVG illustrations. They are explicitly labelled as illustrative examples, not literal screenshots. The project scope follows the supplied brief. There are no testimonials or invented performance statistics.

The DM Sans variable font is self-hosted under `public/fonts/`; its SIL Open Font License is included there.

## Before public launch

- Keep the existing Vercel project and domain configuration. A canonical URL and social share image can be added separately.
- Confirm the final project copy and replace the illustrative mockups with approved real project screenshots if desired.
- Add the business's required legal and privacy information using the owner's verified details.
- The email-based flow is complete; a form backend is intentionally out of scope.
