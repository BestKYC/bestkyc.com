# BestKYC

> Independent rankings and reviews of the best KYC software, KYB platforms, AML screening tools, identity verification vendors, and fraud prevention software — written by the compliance officers, fraud prevention specialists, and product owners who evaluate this software for a living.

**Live site:** [www.bestkyc.com](https://www.bestkyc.com) · **RSS:** [`/rss.xml`](https://www.bestkyc.com/rss.xml)

---

## What this project is

Type "best identity verification software" or "best KYC software" into Google and you get back a wall of vendor websites ranking themselves #1, plus content farms that accept money to put vendors at the top of a list. The practitioners who would actually be useful at answering the question — compliance officers, fraud strategists, product owners — don't usually write the results up, because they're busy picking software for the next project.

[BestKYC](https://www.bestkyc.com) is those practitioners writing it up. It publishes the evaluation work that already happens inside companies onboarding users, verifying businesses, screening for sanctions and PEPs, and fighting fraud — so other buyers don't start from zero.

The site is an independent side project. It is not operated by or affiliated with any vendor it ranks. Read the [why](https://www.bestkyc.com/why), the [methodology](https://www.bestkyc.com/methodology), and the [disclosures](https://www.bestkyc.com/disclosures).

## What the site covers

Four categories, each with its own ranking, vendor profiles, and reviews:

- **[KYC & ID verification](https://www.bestkyc.com/kyc)** — identity verification software, document and liveness checks, biometric authentication, onboarding flows for regulated and non-regulated use cases.
- **[KYB (Know Your Business)](https://www.bestkyc.com/kyb)** — business verification, UBO (ultimate beneficial owner) discovery, corporate registry data, due diligence workflows.
- **[AML](https://www.bestkyc.com/aml)** — AML screening, sanctions and PEP screening, adverse media monitoring, transaction monitoring, travel-rule tooling.
- **[Fraud prevention](https://www.bestkyc.com/fraud)** — fraud detection platforms, device intelligence, risk scoring, account takeover and synthetic-identity defense.

## Rankings and articles

- **[The best KYC software of 2026](https://www.bestkyc.com/rankings/best-kyc-2026)** — the first published ranking, weighted for compliance.
- **[KYC vs ID verification: the same software, for different reasons](https://www.bestkyc.com/articles/kyc-vs-id-verification)** — why compliance buyers and fraud buyers end up shortlisting the same vendors for opposite reasons.
- [All rankings](https://www.bestkyc.com/rankings) · [All articles](https://www.bestkyc.com/articles) · [All vendors](https://www.bestkyc.com/vendors)

## Editorial approach

Every ranking is scored against [seven criteria](https://www.bestkyc.com/methodology): voice from the public, pricing, experience and accuracy, sales process, support, integration, and compliance. Weights shift by project — a bank onboarding flow weights compliance heaviest; an ecommerce fraud stack weights experience and accuracy heaviest.

G2 and Gartner Peer Insights star averages are not used. On those platforms, vendors hand out gift cards to customers who write reviews and preferentially solicit reviews from happy customers or customers who just asked for a discount. The result is a biased sample, not a random one. The site relies instead on unincentivized practitioner voices — forums, community conversations, and internal evaluation notes.

## Stack

- [**Astro 6**](https://astro.build/) — static-first, content-driven
- **TypeScript** (strict) + **MDX** for long-form content
- [**Tailwind CSS v4**](https://tailwindcss.com/) with OKLCH design tokens
- Self-hosted fonts via [Fontsource](https://fontsource.org/) (Inter Variable + Newsreader Variable)
- [**Cloudflare Pages**](https://pages.cloudflare.com/) for hosting at the edge
- Plausible for analytics (production only, no cookies)
- `@astrojs/sitemap`, `@astrojs/rss`, `@astrojs/mdx`, view transitions

## Requirements

- **Node** ≥ 22.12 (see `engines.node` in `package.json`)
- **npm** 10+ (ships with modern Node)

## Local development

```bash
git clone https://github.com/<org>/<repo>.git
cd <repo>
npm install
npm run dev
```

Then open <http://localhost:4321>.

### Scripts

- **`npm run dev`** — Local dev server with HMR
- **`npm run build`** — Static production build to `dist/`
- **`npm run preview`** — Serve the built site locally
- **`npm run check`** — TypeScript + Astro diagnostics (`astro check`)
- **`npm run logos`** — Regenerate PNG/ICO icon assets from SVG sources

## Project structure

```
/
├── public/                     # Static assets served as-is
│   ├── favicon.svg/.ico, logo*.svg, og-default.*
│   ├── site.webmanifest, robots.txt
│   └── _headers, _redirects    # Cloudflare Pages edge config
├── src/
│   ├── components/             # Astro components (Hero, SEO, RankingTable, …)
│   ├── content/
│   │   ├── articles/           # MDX essays + shared images/
│   │   ├── vendors/            # Vendor profiles (MDX)
│   │   ├── rankings/           # Ranked lists (MDX)
│   │   └── reviews/            # Full reviews (MDX)
│   ├── content.config.ts       # Zod schemas for all collections
│   ├── layouts/                # BaseLayout.astro
│   ├── pages/                  # File-based routes
│   ├── styles/global.css       # Tailwind import + design tokens
│   ├── utils/                  # schema.org helpers, etc.
│   └── consts.ts               # Site metadata + category taxonomy
├── scripts/
│   └── rasterize-logos.mjs     # SVG → PNG/ICO build helper
├── astro.config.ts
├── tsconfig.json
└── package.json
```

## Content collections

All public content lives in `src/content/` as MDX with Zod-validated frontmatter:

- **`vendors`** — vendor profiles with category tags (kyc, kyb, aml, fraud), HQ, pricing model, and an optional `teamRole` used to surface editorial conflicts on the profile page and the disclosures listing automatically.
- **`articles`** — essays and explainers. Supports `image` / `imageAlt` for the featured/OG card.
- **`rankings`** — ranked vendor lists with `reference('vendors')` entries. Per-entry `note`, `bestFor`, and `pick` (Editor's Pick / Best Value / Best Enterprise).
- **`reviews`** — individual vendor reviews (schema ready, not yet populated).

Drop a new `.mdx` file into the matching collection and it's picked up by the build automatically. Slugs derive from filename. Images are referenced by path relative to the MDX file.

## SEO and performance

The site is built for organic search from day one:

- Astro static output — no runtime framework on the client
- Preloaded latin font subsets for LCP
- All images pass through Astro `<Image>` — WebP and AVIF variants, responsive `srcset`, intrinsic dimensions (no CLS)
- `prefetch.prefetchAll = 'viewport'` warms the cache as users scroll
- Inlined critical CSS via `inlineStylesheets: 'auto'`
- Canonical URLs, OG and Twitter cards, and `Organization` / `WebSite` / `BreadcrumbList` / `SoftwareApplication` / `ItemList` JSON-LD on every page
- `sitemap-index.xml`, `robots.txt`, and `rss.xml` all generated at build time
- `public/_headers` sets HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, and long-lived cache-control on hashed assets

## Deployment (Cloudflare Pages)

1. Push to GitHub (or similar).
2. In Cloudflare Pages, create a new project connected to the repo.
3. Set the framework preset to **Astro**, or configure manually:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** `22` (env variable `NODE_VERSION=22`)
4. Deploy. Every push to `main` triggers a build; PRs get preview URLs at `<branch>.<project>.pages.dev`.

`public/_redirects` forces the apex domain (`https://bestkyc.com`) to the `www` subdomain at the edge.

## Topics

Suggested GitHub topics for repo discovery: `astro`, `kyc`, `kyb`, `aml`, `aml-screening`, `fraud-prevention`, `identity-verification`, `compliance`, `reviews`, `rankings`, `static-site`, `cloudflare-pages`, `mdx`, `tailwindcss`.

## License

Content, rankings, and illustrations © BestKYC editorial team. All rights reserved. The site code is not currently licensed for redistribution — contact [hello@bestkyc.com](mailto:hello@bestkyc.com) for reuse.
