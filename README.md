# Etherion Consulting

Source for [etherionconsulting.com](https://www.etherionconsulting.com) — a Hugo site built on a customised
[Hugo Saasify](https://github.com/chaoming/hugo-saasify-theme) theme.

## About Etherion

Etherion helps regulated organisations get AI, data and delivery under control before an audit, a board
question, or a stalled deal forces the issue.

Our mission is to accelerate responsible AI and digital transformation by embedding governance into every
stage of innovation, and building solutions that are trusted by customers, regulators, and the businesses
that depend on them.

### Four disciplines, one connected practice

Most firms are strong in one of these. The gap between them is where AI programs actually fail.

| Discipline | What it covers |
| --- | --- |
| **AI Governance** | ISO 42001 readiness, AI risk inventories, lifecycle controls, board-ready reporting |
| **Agentic AI Automation** | AI agents and automated workflows with validation and controls built in |
| **PMO** | Delivery structure, capacity and dependency visibility, intake and prioritisation |
| **Data Governance & Quality** | Lineage, quality and ownership fixed at the source; legacy estate modernisation |

### Who we work with

Financial Services, Insurance, Healthcare and technology organisations operating under enterprise
procurement, regulatory or risk scrutiny — across AU, EU and US markets.

### Credentials

ISO 42001 Lead Implementer Practitioner · Certified Data Management Professional (CDMP) · DAMA-DMBOK
aligned practice · 15+ years of regulated industry delivery.

### Team

| | |
| --- | --- |
| **Shweta Naik** | Managing Partner — Digital Transformation & PMO Governance |
| **Vaibhav Kalekar** | Managing Partner — AI Governance & Data Transformation |
| **Suresh Naik** | Advisor |

Founded 2025. 30+ years of combined experience, 40+ projects delivered.

### How we work

- **Speed without shortcuts** — we deliver fast because we're efficient, not because we cut corners.
- **Human-centered** — we build for people, not just systems.
- **Transparent partnership** — no black boxes, no surprises.

## Running the site locally

Requires Hugo **extended** and Node 20+.

```bash
npm install
npm start          # Tailwind watcher + hugo server -D on :1313
```

To produce the same output CI does:

```bash
npm run build      # tailwindcss --minify && hugo --minify -> ./public
```

`public/` is not cleaned between builds, so stale pages from an earlier run can survive and be
served. Use `rm -rf public && npm run build` whenever you're inspecting the output.

## Deployment

Two pipelines run off `main`, and it's worth knowing which one users actually hit:

- **Cloudflare Pages serves `www.etherionconsulting.com`.** Its build command is a bare `hugo`, with no
  separate Tailwind step, so Hugo compiles the CSS itself through PostCSS. Cloudflare sets `CI=true` in
  the build environment — don't branch templates on `$CI` expecting a prebuilt stylesheet to exist there.
- **`.github/workflows/hugo.yml` publishes to GitHub Pages** with `HUGO_ENVIRONMENT=production`. It runs
  the Tailwind CLI first, so Hugo picks up `assets/css/style.css` instead of compiling.

Both paths end up with a fingerprinted stylesheet; see the third gotcha below.

The theme lives in `themes/hugo-saasify-theme/` and is vendored directly in this repo, not a submodule —
edit it in place.

## Layout

```
content/            Markdown pages; most compose Hugo shortcodes rather than prose
  services/         One page per service offering
  blog/             Articles
  case-studies/     Case studies
layouts/            Project overrides — these win over the theme
  partials/         page-header, pagination, header, footer
  shortcodes/       Site-specific shortcodes
themes/hugo-saasify-theme/
  assets/css/main.css   Design tokens and component classes (source of truth)
  layouts/              Theme templates; overridden per-file by layouts/
assets/css/style.css    Tailwind output, generated at build time (gitignored)
```

`content/` also holds `de/`, `es/`, `fr/`, `pt/` and `zh-cn/` translation directories, plus `docs/`,
`features/` and `jobs/`. These are demo content inherited from the theme, not live pages — they account
for most of the page count in a build and are pending cleanup.

## Design system

Design tokens (colour ramps, type scale, radii, shadows) are CSS custom properties defined at the top of
`themes/hugo-saasify-theme/assets/css/main.css` and consumed via `tailwind.config.js`. Change them there,
not in individual templates.

### Page rhythm

Every page reads as **dark band → light content → dark footer**. Two pieces produce that:

- A soft radial brand glow on `body` is the default page surface. Sections with no background of their own
  let it show through.
- `.band-dark` turns any `<section>` into a full-bleed navy band. Everything inside it — headings, body
  copy, eyebrows, cards, borders, buttons, form fields — inverts automatically, so don't hand-roll dark
  section styling.

Section shortcodes take a consistent parameter:

```
{{< features-section dark="true" title="..." >}}   navy band
{{< features-section tint="true" title="..." >}}   subtle gray band
{{< features-section title="..." >}}               transparent, glow shows through
```

`benefits-grid`, `testimonials`, `faq` and `section-container` accept the same `dark` / `tint` parameters.

Non-home pages open with the `page-header` partial, which renders the band and its heading:

```go-html-template
{{ partial "page-header" (dict
    "eyebrow" "Insights"
    "title" .Title
    "description" .Description
    "align" "center"
) }}
```

### Three gotchas

**Don't invert utility classes with plain class selectors.** Tailwind's `@apply` resolves a class name
against *every* rule that declares it, including ours. A rule like `.band-dark .text-gray-900 {}` leaks
into any component that does `@apply text-gray-900` and repaints it. The inversion rules use
`[class~="text-gray-900"]` instead — same elements, same specificity, invisible to `@apply`.

**Prose beats utilities.** `.prose h3` is more specific than a `text-base` class on the element, so
utility classes on headings inside long-form content are silently ignored. Card and list overrides for
prose content live in `main.css`.

**The stylesheet filename must stay hashed.** Pages are served with `max-age=0` but CSS with a four-hour
`max-age`, so a fixed filename means returning visitors get new HTML against a stale stylesheet — the site
renders badly for them while looking fine in a private window. `baseof.html` therefore always pipes the CSS
through `fingerprint`.

It picks the source by asking whether `assets/css/style.css` exists, not by checking an environment
variable: if a build step already ran Tailwind it uses that file, otherwise it compiles `main.css` via
PostCSS. Both Cloudflare and GitHub Actions install `node_modules`, so either route works from a bare
`hugo`.

## License

[LICENSE](LICENSE) is the upstream Hugo Saasify theme's MIT licence, which the vendored theme is used
under. Site content, copy and branding are Etherion Consulting's.
