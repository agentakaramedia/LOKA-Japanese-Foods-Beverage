# LOKA Japanese Foods & Beverage — coded website

A static rebuild of the WordPress (Woodmart + Elementor) site at
<https://lokajapanesefoodsbeverage.com>, built with [Astro](https://astro.build).
Every page is pre-rendered to plain HTML/CSS; JavaScript is only shipped for the
mobile menu, accordions, gallery lightbox and the PDF product-list viewer.

## Getting started

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # optimizes images (public/opt) then outputs static files to dist/
npm run preview    # serve the production build
npm run check      # TypeScript / Astro diagnostics
npm test           # Playwright suite (desktop, tablet, mobile)
```

Node 22.22+ is required. Tests use the locally installed Google Chrome; to use
Playwright's bundled Chromium instead run `npx playwright install chromium` and set
`PW_CHANNEL=` (empty).

`dist/` can be deployed to any static host (Vercel, Netlify, Cloudflare Pages, S3…).
URLs keep the WordPress permalink structure with trailing slashes.

## Indexing

The live WordPress site sends `noindex, nofollow` on every page, and this build does
the same by default. Build with `PUBLIC_ALLOW_INDEXING=true` once the site should be
indexed.

## Structure

```
src/
  layouts/Base.astro          <head> metadata, header, page shell
  components/
    Header.astro              desktop menu + mobile drawer + language flag
    Hero.astro                Elementor-style banner (photo, overlay, title, divider)
    Icon.astro                Font Awesome paths copied from the original
    Lightbox.astro            gallery viewer for news posts
    PdfFlipbook.astro         pdf.js viewer replacing the DearFlip plugin
    EmptyPage.astro           mirrors WordPress pages that have no content
  data/
    site.ts                   navigation and external links
    posts.json / posts.ts     the 10 genuine news posts
    about.json                About page sections
    icons.ts                  SVG icon paths
  pages/                      one file per URL; [slug].astro renders news posts
  styles/global.css           theme base styles
public/
  uploads/                    media copied from wp-content/uploads (same sub-paths)
  images/                     logos/icons that were inline in the original HTML
tests/site.spec.mjs           functional + regression tests
scripts/optimize-images.mjs   WebP generation (runs before every build)
docs/design-system.md         colors, type, spacing, components, assets
```

### Editing content

- **News posts:** edit `src/data/posts.json` (title, dates, body HTML, `image` or
  `gallery`). New entries automatically appear on `/news-and-events/` and get their own page.
- **About page sections:** `src/data/about.json`.
- **Navigation / external links:** `src/data/site.ts`.
- Other copy lives directly in the page files under `src/pages/`.

## Pages

| URL | Notes |
| --- | --- |
| `/` | Home |
| `/about-us-loka/` | About LOKA (9 sections with galleries) |
| `/products/` | Product categories (collapsible cards) |
| `/contact/` | Email + Facebook contact |
| `/japanese-food-supplier-cambodia/` | "Get your product discovered" (suppliers) |
| `/faq/` | FAQ accordion |
| `/team/` | Team videos + YouTube media |
| `/news-and-events/` | News list |
| `/work-with-loka/` | Suppliers / clients sign-up |
| `/loka-product-list/` | 32-page product list PDF viewer |
| `/news/`, `/loka-general-and-partners-catalogue-2/` | Empty on the original site; reproduced as such |
| `/<post-slug>/` | 10 news/event posts |

## Differences from the WordPress site (intentional)

- **Spam content removed.** The WordPress database contains ~3,150 injected posts
  (pirated software/movie "torrent" pages) and ~58 fake categories. They are listed on the
  original News & Events page and home-page widget. Only the 10 genuine LOKA posts were
  rebuilt; the original site appears to be compromised and should be cleaned/secured.
- The Gashikoukan-kai post's WordPress date is stored with the year `0202`; it is
  shown as 20 January 2024 (the event date).
- Dead `#` links now point somewhere useful: home category tiles → `/products/`,
  "Register as a LOKA Supplier/Client" → `/contact/`.
- On phones the 60px "The Developing Cambodian Market" heading is scaled to fit instead
  of overflowing the screen.
- The DearFlip page-turn plugin is replaced by a pdf.js viewer (cover, then two-page
  spreads on desktop; zoom, fullscreen, share, download). The thumbnail-grid button was not reproduced.
- The 404 page links to the home page instead of a WordPress search form.
- Accessibility: news-post body text (`#7a7a7a` → `#767676`) and the news-list dates
  (`#aaa` → `#767676`) were darkened to meet WCAG AA contrast; YouTube embeds use
  youtube-nocookie.com.

## Performance (Lighthouse, production build)

| | Performance | Accessibility | Best practices |
| --- | --- | --- | --- |
| Desktop (8 pages) | 98–100 | 98–100 | 96–100 |
| Mobile (8 pages) | 92–100 | 98–100 | 93–96 |

SEO scores 58–66 only because pages are `noindex` (see *Indexing*). Images are served
as WebP and the hero photo is preloaded. The remaining Lighthouse notes are the home
page's "More Information" link text (original copy) and third-party YouTube cookies.
- Content kept exactly as published, including existing quirks (e.g. the AEON 2022 post
  reuses the AEON 2023 text; the "CAMFOOD AND CAMHOTEL’22" title on the Niigata post).

## Known gaps

- The Japanese (`/ja/`) TranslatePress version is not part of this rebuild; the flag in the
  header links to the live site's `/ja/` pages.
- Category/author archive pages (`/category/*`, `/author/*`) only contained spam and were
  not rebuilt.
