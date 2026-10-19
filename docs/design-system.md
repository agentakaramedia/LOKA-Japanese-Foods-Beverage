# LOKA design system (as measured on the original WordPress site)

All values were taken from the live site's computed styles and Elementor CSS
(Woodmart theme + Elementor, October 2026) and are what the rebuild uses.

## Colors

| Token | Value | Used for |
| --- | --- | --- |
| `--loka-header-bg` | `#2d309c` | Header bar (desktop and mobile) |
| `--loka-navy` | `#1d218a` | Product cards, FAQ, intro bands, buttons, icons |
| `--loka-navy-2` | `#1d2088` | Supplier page bands, "Get In Touch" button |
| `--loka-red` | `#dc0021` | Active/hover menu underline, mobile active item, 404 title |
| Career button red | `#e00417` | "Explore LOKA's open positions" |
| Custom-block navy | `#1b3a9a` | Blue sections on Home / About |
| Custom-block text | `#2c3e94` | Body text on Home / About |
| Contact indigo | `#2b2f9b` / `#1f2380` (hover) | Contact page |
| Media heading | `#062c7e` | "MEDIA RESOURCES" title and rule |
| CTA band | `#ccf3ff` | Team page contact band |
| Light grey band | `#f0f0f0` | Supplier page sections |
| Body text | `#767676` | Theme default text |
| Hero overlay | `#000` at 40% or 60% | All photo banners |

## Typography

- The original declares "Poppins"/"Roboto" on Elementor widgets but never loads them,
  so browsers render the generic **sans-serif** fallback (Arial on Windows, Helvetica
  on macOS). The rebuild uses `sans-serif` directly for identical output.
- Pages built from custom HTML blocks do load web fonts:
  Home and About use **Poppins** (300–700) + **Noto Sans Khmer**, plus **Cinzel** on Home; Contact uses **DM Sans** + **Noto Sans Khmer**.

| Element | Desktop | Mobile (≤767px) |
| --- | --- | --- |
| Hero title | 60px / 900 / line-height 1 | 30px (40px on Work with LOKA) |
| Section display title (Our Products, Market) | 60px / 900 | 30px |
| Section heading | 30px / 800 | 30px |
| Card heading | 24px / 800 | 24px |
| Body | 14px / 400 / 1.6 | same |
| Menu | 13px / 700 / uppercase | 13px / 600 (drawer) |
| Buttons | 15px / 500, padding 12px 24px, radius 3px (10px on Work with LOKA) | same |

## Layout & spacing

- Header: 125px tall, content 1192px wide (logo 380px); mobile header 98px
  (38px top band + 60px row), logo 200px, hamburger drawer 300px wide.
- Hero banners: min-height 600px (300px on Products ≤1024px), 150px on mobile;
  5px white divider inset 100px (40px on mobile) with 15px vertical padding.
- Elementor content rows use 200px side padding on desktop, 30px on tablet/mobile.
- Custom blocks (Home/About/Contact) use a 1100px max-width wrapper with 24px gutters.
- Page wrapper leaves 40px below the last block. The original footer is hidden on
  every page, so the rebuild has none.
- Breakpoints (Elementor/Woodmart): mobile ≤767px, tablet ≤1024px, desktop ≥1025px.

## Components

Header + mobile drawer · Hero banner · Product category card (collapsible) ·
FAQ accordion (one open at a time) · News list grid (4 columns → 1) · Post meta
(calendar / location icons) · Photo gallery with lightbox · PDF flipbook ·
Origin flag + transport-mode list (Sea / Air / Truck icons).

Icons are the original Font Awesome 5 SVG paths (`src/data/icons.ts`).

## Assets

- Media keeps the WordPress upload paths: `wp-content/uploads/YYYY/MM/file` →
  `public/uploads/YYYY/MM/file`. Only files used by the rebuilt pages were kept
  (118 files: photos, flags, favicons, 3 team videos, the 32-page product list PDF).
- `npm run build` creates optimized WebP copies in `public/opt/` (full size + 800px wide)
  through `scripts/optimize-images.mjs`; pages reference those through `src/lib/img.ts`.
- Images embedded as base64 in the original HTML (service icons, logo, sake photo)
  were extracted to `public/images/`.

## Content inventory

See the page table in the README. Content was copied verbatim from the rendered
original pages; the 10 genuine news posts live in `src/data/posts.json`.
