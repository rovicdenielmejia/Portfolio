# Project Structure — Rovic Mejia Portfolio

Overview of the repository layout.

---

## Root

| Path | Description |
|------|-------------|
| `*.html` | Static pages (home, about, portfolio, services, etc.) |
| `styles.css` | Global styles |
| `script.js` | Main JavaScript (nav, lightbox, back-to-top, etc.) |
| `inquire-modal.js` | Inquiry modal script |
| `404.html` | Custom 404 page |
| `robots.txt` | Crawler directives |
| `sitemap.xml` | Sitemap for SEO |
| `vercel.json` | Vercel config (rewrites, headers) |
| `netlify.toml` | Netlify config |
| `_redirects` | Netlify/static host URL rewrites |
| `git-deploy.ps1` | Deployment script |

---

## Directories

| Directory | Contents |
|-----------|----------|
| `Assets/` | Images, icons, favicon |
| `Portfolio/` | Portfolio work images (logos, posters, etc.) |
| `blog/` | Blog posts (HTML) |
| `backend/` | Next.js backend (API, dashboard) |
| `docs/` | Documentation (deploy, CTA/redirects) |

---

## Documentation

- `README.md` — Project overview and setup
- `docs/DEPLOY.md` — Netlify deployment guide
- `docs/CTA-AND-NAVIGATION-REDIRECTS.md` — URL, nav, and CTA reference

---

## URL Structure

Pages use extensionless paths (e.g. `/home`, `/portfolio`). Rewrites map these to `.html` files. See `vercel.json`, `_redirects`, and `docs/CTA-AND-NAVIGATION-REDIRECTS.md`.
