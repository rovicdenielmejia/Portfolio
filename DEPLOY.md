# Deploy to Netlify via GitHub (rovicmejiaportfolio.com)

Follow these steps to deploy this portfolio using **GitHub** and **Netlify**.

---

## 1. Push the project to GitHub

### If you don’t have a repo yet

1. **Create a new repository on GitHub**
   - Go to [github.com/new](https://github.com/new).
   - Name it (e.g. `portfolio` or `rovicmejia-portfolio`).
   - Choose **Public**, leave “Add a README” unchecked if this folder already has your files.
   - Click **Create repository**.

2. **Initialize Git and push from your machine**

   In a terminal, from the **Portfolio** folder (the one with `netlify.toml`, `home.html`, etc.):

   ```bash
   git init
   git add .
   git commit -m "Initial commit: portfolio site"
   git branch -M main
   git remote add origin https://github.com/rovicdenielmejia/Portfolio.git
   git push -u origin main
   ```

   This project uses the repository: [github.com/rovicdenielmejia/Portfolio](https://github.com/rovicdenielmejia/Portfolio).

### If the project is already a Git repo

```bash
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

---

## 2. Connect the repo to Netlify

1. Go to [app.netlify.com](https://app.netlify.com) and sign in (or create an account; you can use “Sign up with GitHub”).
2. Click **Add new site** → **Import an existing project**.
3. Choose **GitHub** and authorize Netlify if asked.
4. Select the **repository** you pushed in step 1.
5. **Configure the build** (Netlify often fills this from `netlify.toml`):
   - **Branch to deploy:** `main` (or your default branch).
   - **Build command:** leave **empty** (static site, no build).
   - **Publish directory:** `.` (root).
6. Click **Deploy site**.

Your site will be live at a URL like `something-random-123.netlify.app`.

---

## 3. Add your custom domain (rovicmejiaportfolio.com)

1. In the Netlify dashboard, open your site.
2. Go to **Site configuration** → **Domain management** (or **Domain settings**).
3. Click **Add custom domain** / **Add domain**.
4. Enter **rovicmejiaportfolio.com** and follow the steps.
5. Netlify will show the DNS records you need. At your **domain registrar** (where you bought the domain):
   - **Option A:** Add the **A** and **CNAME** records Netlify gives you.
   - **Option B:** Switch **nameservers** to Netlify DNS and manage DNS in Netlify.
6. Wait for DNS to update (a few minutes to 48 hours). Netlify will then issue a free **HTTPS** certificate automatically.

Optional: Add **www.rovicmejiaportfolio.com** in Netlify and set it to **redirect** to **rovicmejiaportfolio.com**.

---

## 3a. Use a GoDaddy domain with Netlify

If your domain (e.g. **rovicmejiaportfolio.com**) is registered at **GoDaddy**, use one of these:

### Option A: Point GoDaddy DNS to Netlify (recommended)

1. **In Netlify** (Site → Domain management → Add custom domain):
   - Add **rovicmejiaportfolio.com**.
   - Add **www.rovicmejiaportfolio.com** if you want www.
   - Netlify will show you DNS instructions; note the **Netlify nameservers** (e.g. `dns1.p01.nsone.net` and `dns2.p01.nsone.net` — yours may differ).

2. **In GoDaddy** ([godaddy.com](https://www.godaddy.com) → My Products → Domains):
   - Click your domain (e.g. rovicmejiaportfolio.com).
   - Open **DNS** or **Manage DNS**.
   - Find **Nameservers** (often “Nameservers” or “Change nameservers”).
   - Choose **Change** / **Custom** and replace GoDaddy’s nameservers with the **two Netlify nameservers** Netlify gave you.
   - Save. Propagation can take from a few minutes up to 24–48 hours.

3. Back in **Netlify**, wait until the domain shows as verified; Netlify will then issue **HTTPS** automatically.

### Option B: Keep GoDaddy nameservers (use DNS records only)

1. **In Netlify**: Add your domain (e.g. **rovicmejiaportfolio.com**). Netlify will show required records, for example:
   - **A** record: `@` (or your root domain) → the IP Netlify shows (e.g. `75.2.60.5`).
   - **CNAME** record: `www` → `your-site-name.netlify.app` (use the exact value Netlify shows).

2. **In GoDaddy** (My Products → your domain → **DNS** / **Manage DNS**):
   - **Root (apex)**: Add or edit an **A** record: **Name** `@`, **Value** `75.2.60.5`, TTL 600 (or default). Remove any other A record for `@` if it conflicts.
   - **www**: Add or edit a **CNAME** record: **Name** `www`, **Value** `your-site-name.netlify.app`, TTL 600.
   - Save.

3. Wait for DNS to propagate. Netlify will then verify the domain and enable HTTPS.

**Tip:** In Netlify → Domain management you can set **www** to redirect to the non-www (or the other way around) so one URL is the main one.

---

## 4. Updates after deployment

Whenever you push to the `main` branch on GitHub, Netlify will **automatically** rebuild and deploy:

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

---

## What’s already set up in this repo

| File / feature        | Purpose |
|-----------------------|--------|
| **netlify.toml**      | Publish directory (`.`), security headers, cache headers. |
| **_redirects**        | Clean URLs: `/`, `/home`, `/skills`, etc. → correct HTML. |
| **404.html**          | Custom “Page not found” page. |
| **robots.txt**        | Allows crawlers; points to sitemap. |
| **sitemap.xml**       | Lists pages for rovicmejiaportfolio.com. |
| **Canonical / og:url**| Set on all pages for SEO and sharing. |

You’re ready to deploy with **GitHub → Netlify** and then add **rovicmejiaportfolio.com** as the custom domain.
