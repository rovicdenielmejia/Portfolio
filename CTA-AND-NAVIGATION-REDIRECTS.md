# CTA & Navigation Redirects — Rovic Mejia Portfolio

This document describes **call-to-action (CTA) links**, **site-wide navigation**, and **URL redirect/rewrite rules** for the portfolio website so that internal links and deployed URLs stay consistent.

---

## 1. URL convention (deployed)

- **Use extensionless paths in all internal links.** When deployed, the site serves pages without `.html` in the URL.
- **Examples:** `home`, `portfolio`, `contact`, `graphic-design`, `portfolio-brand-identity`.
- **Do not use** `contact.html`, `portfolio.html`, etc. in `href` attributes (except in redirect configs that map path → file).

---

## 2. Redirect & rewrite configuration

### 2.1 Vercel (`vercel.json`)

Rewrites map extensionless paths to the corresponding `.html` files (no redirect; URL in the browser stays extensionless):

| Source (path) | Destination (file) |
|---------------|---------------------|
| `/` | `/home.html` |
| `/home` | `/home.html` |
| `/skills` | `/skills.html` |
| `/about` | `/about.html` |
| `/experience` | `/experience.html` |
| `/portfolio` | `/portfolio.html` |
| `/portfolio-brand-identity` | `/portfolio-brand-identity.html` |
| `/portfolio-marketing` | `/portfolio-marketing.html` |
| `/portfolio-social` | `/portfolio-social.html` |
| `/portfolio-event` | `/portfolio-event.html` |
| `/portfolio-print` | `/portfolio-print.html` |
| `/portfolio-specialized` | `/portfolio-specialized.html` |
| `/services` | `/services.html` |
| `/graphic-design` | `/graphic-design.html` |
| `/hr-services` | `/hr-services.html` |
| `/hr-recruitment` | `/hr-services` (rewrite to same service page) |
| `/certification` | `/certification.html` |
| `/contact` | `/contact.html` |
| `/inquire` | `/contact` (rewrite to contact) |
| `/pageant-graphic-package` | `/pageant-graphic-package.html` |
| `/graphic-design-packages` | `/graphic-design-packages.html` |
| `/client-policy` | `/client-policy.html` |
| `/resume` | `/resume.html` |

### 2.2 Netlify / static hosts (`_redirects`)

Same behavior: extensionless URL → serve the correct `.html`. Use **200** for rewrites (no URL change) and **301** only where a path should redirect to another path (e.g. `/inquire` → `/contact`, `/hr-recruitment` → `/hr-services`).

- **200:** path → `.html` (e.g. `/contact` → `/contact.html`)
- **301:** `/inquire` → `/contact`, `/hr-recruitment` → `/hr-services.html` (or `/hr-services` if the host resolves it)

---

## 3. Global navigation (header)

Same structure on all main pages. Links must be **extensionless**.

| Label | href (use this) |
|-------|-----------------|
| Logo / "Rovic Mejia" | `home` |
| Home | `home` |
| Skills | `skills` |
| Services (parent) | `services` |
| → Brand & Visual Strategy | `graphic-design` |
| → Workforce & HR Strategy | `hr-services` |
| Portfolio | `portfolio` |
| About (parent) | `about` |
| → Experience | `experience` |
| → Certifications | `certification` |
| Contact | `contact` |

---

## 4. Footer (Quick Links)

Same on all pages that show the footer:

| Link | href |
|------|------|
| Home | `home` |
| About | `about` |
| Contact | `contact` |
| Skills | `skills` |
| Services | `services` |
| Portfolio | `portfolio` |

Copyright link “Rovic Mejia” → `home`.

---

## 5. CTAs by page

### 5.1 Home (`home`)

| CTA | href |
|-----|------|
| View Portfolio | `portfolio` |
| Explore Services | `services` |
| Learn More (Brand & Visual Strategy) | `graphic-design-packages` |
| Learn More (Workforce & HR Strategy) | `hr-services` |
| Featured: Brand Identity System | `portfolio#brand-identity` |
| Featured: Social Media Visual Framework | `portfolio#marketing` |
| Featured: Event Creative | `portfolio#event-creative` |
| Featured: HR Documentation Sample | `portfolio#event-creative` |
| View Full Portfolio | `portfolio` |
| About CTA (e.g. Experience / Certifications) | `experience`, `certification` |
| Contact CTA | `contact` |

### 5.2 Services (`services`)

| CTA | href |
|-----|------|
| Learn More (Brand & Visual Strategy) | `graphic-design` (prefer extensionless) |
| Learn More (Workforce & HR Strategy) | `hr-services` |

### 5.3 Portfolio main (`portfolio`)

| CTA | href |
|-----|------|
| View More Brand Identity Works | `portfolio-brand-identity` |
| View More Marketing Visuals | `portfolio-marketing` |
| View More Social Visuals | `portfolio-social` |
| View More Event Projects | `portfolio-event` |
| View More Print Layouts | `portfolio-print` |
| View More Specialized Works | `portfolio-specialized` |

### 5.4 Portfolio category pages

Each category page has:

- **Back link:** “← Back to Portfolio” → `portfolio`

### 5.5 Contact (`contact`)

- **Submit:** Form posts via `mailto:` (no page redirect).
- All nav/footer links follow the global nav and footer tables above.

### 5.6 About (`about`)

- CTAs to **Experience** and **Certifications** → `experience`, `certification`.
- No contact block on About; use nav/footer for `contact`.

### 5.7 Graphic Design (`graphic-design`)

| CTA | href |
|-----|------|
| Explore Brand Packages | `graphic-design-packages` |

### 5.8 Graphic Design Packages (`graphic-design-packages`)

| CTA | href |
|-----|------|
| View Full Client Policy | `client-policy` |

### 5.9 Client Policy (`client-policy`)

| CTA | href |
|-----|------|
| ← Back to Brand Packages | `graphic-design-packages` |

### 5.10 HR Services (`hr-services`)

- No extra CTAs beyond nav/footer (e.g. Contact, Portfolio).

### 5.11 Pageant Graphic Package (`pageant-graphic-package`)

- Nav/footer only; optional CTA to `contact` or `graphic-design` as needed.

### 5.12 Resume (`resume`)

- Nav/footer only.

### 5.13 404

- Nav and footer use same links as above; “Home” or logo → `home`.

---

## 6. Special redirects (canonical paths)

| Requested path | Resolves to | Note |
|----------------|-------------|------|
| `/inquire` | `/contact` | Use `contact` in links; no separate Inquire page. |
| `/hr-recruitment` | `/hr-services` | 301 on Netlify; rewrite on Vercel to same content as hr-services. |
| `/` | `/home` (serves `home.html`) | Root shows home. |

---

## 7. Checklist for new or updated pages

- [ ] All internal links use **extensionless** paths (e.g. `graphic-design`, not `graphic-design.html`).
- [ ] Header nav matches the table in **§3**.
- [ ] Footer quick links match **§4**.
- [ ] Any new extensionless path is added to **`vercel.json`** (rewrites) and **`_redirects`** (200 or 301 as needed).
- [ ] CTAs are documented in **§5** and point to the correct extensionless href.

---

## 8. File reference

| Config | Purpose |
|--------|---------|
| `vercel.json` | Rewrites for extensionless URLs (Vercel). |
| `_redirects` | Extensionless URLs and 301 redirects (Netlify / static). |

Use this doc when adding new CTAs, changing nav, or deploying to a new host so CTA and navigation redirects stay consistent across the whole website.
