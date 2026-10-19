# Pasquale Sergi — Website Relaunch

A focused German landing page built with Vue 3, the Composition API, Vite and plain CSS, plus one Vercel contact function. No UI framework, router, database, tracking or external visual assets.

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

The frontend builds into `dist/`. Vercel also deploys the root `api/contact.js` function; a static-only host cannot deliver enquiries. Both `npm run dev` and `npm run preview` serve the same endpoint locally through a Vite middleware adapter. Copy `.env.example` to ignored `.env.local` to configure local delivery, then restart Vite. Never use real delivery credentials for automated tests.

## Existing Vercel deployment

This repository is already connected to the Vercel project for `pasquale.dev`. The production branch is `master`. Pushes to that branch use the existing Git integration; no new Vercel project, domain, DNS or ownership configuration is needed.

- Framework: Vite (automatic detection).
- Install: `npm install` (the npm lockfile is committed).
- Build: `npm run build`.
- Output: `dist`.
- Root directory: repository root.
- Three server-only environment variables are required for email delivery (see below).
- Vercel detects `api/contact.js` automatically. No `vercel.json`, project changes or SPA rewrites are needed.

The previous website is preserved on `backup/pre-business-relaunch` at commit `06ee8a6de8384c426851fed2f4ddc86227668497`.

## Proposal requests

Both placements use `ProposalForm.vue` and the shared controller in `src/lib/proposal.js`. Initially only a URL and “Angebot anfragen” are shown. Validating the URL reveals “Fast geschafft.” inline and focuses the email field. Email is required; the message is optional (maximum 3,000 characters). Package buttons preserve the chosen package without adding another required field.

“Anfrage senden” POSTs JSON to `/api/contact`. The API uses Resend's HTTPS API, with no email SDK. It sends a plain-text enquiry to the configured recipient and sets Reply-To to the visitor's validated email. No confirmation email is sent to visitors. The form shows “Wird gesendet…” while pending and only shows “Danke – Anfrage erhalten.” after the provider returns a message ID. This confirms acceptance by the delivery provider, not guaranteed inbox delivery. Errors keep all entered fields and offer the existing direct-email fallback; submitting never opens an email client.

Retries of unchanged input reuse a UUID-based Resend idempotency key to prevent duplicate email when a response is lost. No lead data is stored in a database or browser storage. A page reload clears the draft.

### Required production configuration

In the **existing** Vercel project's **Settings → Environment Variables**, add:

| Variable                  | Value                                                                                                 | Scope                                                |
| ------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `RESEND_API_KEY`          | An API key with sending permission from your Resend account                                           | Production, and Preview only if you want email there |
| `CONTACT_RECIPIENT_EMAIL` | `sergi.pasquale@outlook.com`                                                                          | Same scope                                           |
| `CONTACT_FROM_EMAIL`      | A sender on a domain already verified in Resend, optionally `Pasquale Sergi <sender@verified-domain>` | Same scope                                           |

The visitor's email is Reply-To, never From. A normal Outlook address cannot be used as a Resend sender unless its domain is under your control and verified. Use an existing verified sending domain, or complete Resend's sender-domain verification separately. This implementation does not change DNS, the website domain or Vercel project settings. Resend's test sender has account-recipient restrictions and is not a general production sender.

After saving the variables, **redeploy the latest `master` production deployment** so the function receives them. Then send one intentional enquiry from the live form and verify the email in your inbox/Resend delivery logs. Until these values are configured, the endpoint returns HTTP 503 and the form shows its recoverable error; production delivery must not be considered operational yet.

`VITE_PROPOSAL_EMAIL` remains an optional, public fallback-contact override. It defaults to `sergi.pasquale@outlook.com` and does not configure the API recipient. All `VITE_` values are public; never prefix any provider credentials with `VITE_`. Local `.env*` files are ignored; `.env.example` contains no credentials.

### Validation and spam protection

- Shared client/server URL, email and message validation; safe HTTP(S) URLs only, no credentials in URLs, bounded text lengths and no email-header injection.
- Honeypot field, same-origin browser requests, JSON-only POST endpoint and a 12 KB body limit. Submitted websites are not fetched by the server.
- Five attempts per IP per ten-minute window, bounded to 1,000 entries per warm function instance. Only IP hashes and counters are held temporarily. This is best-effort instance-local throttling, not a global distributed limit; no database or CAPTCHA is added.
- No success response for blocked, unconfigured or failed delivery. API responses are not cached, and provider errors/credentials are not exposed to visitors.

### Analytics hooks and tests

Window events `proposal:url-submitted`, `proposal:second-step-opened` and `proposal:enquiry-submitted` contain only `{ location }` (`hero` or `proposal`), with no personal data. No analytics dependency or tracking is installed.

`npm test` covers shared validation, both form flows, pending/success/error states, retries, optional messages, server validation, honeypot, throttling and provider errors. External provider calls are injected mocks; automated tests never send real mail. Browser QA may temporarily mock `/api/contact` using the browser's fetch API; no mock-success switch exists in production code.

## Page and components

`AppHeader`, `HeroSection`, `BeforeAfterMockup`, `HowItWorks`, `PricingSection`, `ProposalCTA`, `FAQSection`, `AppFooter`, plus shared `ProposalForm`, `WebsiteMockup`, `TrophyArt` and `AppIcon` components.

The hero's before/after browsers use responsive CSS and local SVG illustrations. They depict the fictional “Musterbetrieb” at `musterbetrieb.ch`, not a real client or literal screenshots. There is no case study section, customer testimonial or invented performance statistic.

The DM Sans variable font is self-hosted under `public/fonts/`; its SIL Open Font License is included there.

## Before public launch

- Keep the existing Vercel project and domain configuration. A canonical URL and social share image can be added separately.
- Keep illustrative examples fictional. Obtain the client's explicit consent before publishing any identifying project details or screenshots.
- Add the business's required legal and privacy information using the owner's verified details.
- Configure the three server-only email variables and verify one intentional live enquiry before promoting the contact form.
