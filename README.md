# Rovic Mejia — Portfolio

**Hybrid Creative & Workforce Strategist.**  
Brand building and visual strategy externally. Structured teams and HR strategy internally.

## Structure

| Section | Description |
|---------|-------------|
| **Home** | Landing, services overview, featured work |
| **Services** | Brand & Visual Strategy (graphic design, packages), Workforce & HR Strategy |
| **Portfolio** | Brand identity, marketing, social, event, print, specialized creative |
| **About** | Skills, experience, certifications, resume |
| **Contact** | Inquiry form |
| **FAQ** | Frequently asked questions |

## Tech

- Static HTML, CSS, JavaScript
- No build step
- Inquire modal (mailto) for consultation requests

## URLs (Clean, no `.html`)

Links use paths without `.html` (e.g. `/contact`, `/frequently-ask-questions`).

### Hosting setup for clean URLs

**Netlify** — add `_redirects` in project root:

```
/*    /index.html   200
/contact    /contact.html   200
/services    /services.html   200
/portfolio    /portfolio.html   200
/about    /about.html   200
/graphic-design    /graphic-design.html   200
/hr-services    /hr-services.html   200
/contact    /contact.html   200
/frequently-ask-questions    /frequently-ask-questions.html   200
/terms-of-service    /terms-of-service.html   200
/privacy-policy    /privacy-policy.html   200
/client-policy    /client-policy.html   200
/hr-client-policy    /hr-client-policy.html   200
/graphic-design-packages    /graphic-design-packages.html   200
/event-graphic-services    /event-graphic-services.html   200
/live-coverage    /live-coverage.html   200
/pageant-graphic-package    /pageant-graphic-package.html   200
/hr-services-package    /hr-services-package.html   200
/portfolio-brand-identity    /portfolio-brand-identity.html   200
/portfolio-marketing    /portfolio-marketing.html   200
/portfolio-social    /portfolio-social.html   200
/portfolio-event    /portfolio-event.html   200
/portfolio-print    /portfolio-print.html   200
/portfolio-specialized    /portfolio-specialized.html   200
/skills    /skills.html   200
/experience    /experience.html   200
/certification    /certification.html   200
/resume    /resume.html   200
/home    /home.html   200
/404    /404.html   200
```

**GitHub Pages** — use a `404.html` + JS redirect or Jekyll with `permalink: pretty` if using a generator.

**Apache** — add to `.htaccess`:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.*)$ $1.html [L]
```

## Local preview

Open `home.html` or `index.html` in a browser, or use a simple server:

```bash
npx serve .
# or
python -m http.server 8000
```

## Assets

- `Assets/` — images, icons
- `Portfolio/` — portfolio images

## Project structure

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for the full layout. Documentation lives in `docs/` (deploy, CTA/redirects).

## License

© 2026 Rovic Mejia. All Rights Reserved.
