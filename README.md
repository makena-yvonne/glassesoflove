# Glasses of Love (GOL) – Charity Webpage

A single-page website for **Glasses of Love (GOL)** foundation, based on the GOL portfolio. Tagline: *Because we care.*

## What’s included

- **Hero** – “Because we care” and intro to GOL’s work across Kenya
- **About** – Who we are, mission, vision, values (2013–present, registered 2019)
- **What We Do** – Charity visits, Donations, Mentorship
- **Stats** – 200+ members, 28+ projects, founded 2013
- **Past Projects** – Highlights (clothing drives, children’s homes, hospitals, etc.) + YouTube link
- **Get Involved** – Donate, Join us, Partnerships
- **Donate** – CTA to email for donation enquiries
- **Footer** – GOL contact (phone, email) and social links (Website, Facebook, Instagram, Twitter, YouTube, LinkedIn)

## How to view

1. Open `index.html` in any web browser (double-click the file or drag it into the browser).
2. Or run a local server, e.g.:
   - **Python:** `python -m http.server 8000` then go to http://localhost:8000
   - **Node:** `npx serve` then open the URL shown

## How to host (put the site online)

Your site is **static** (HTML + CSS + images), so you can use any of these **free** options.

### Option 1: Netlify (easiest – drag and drop)

1. Go to [netlify.com](https://www.netlify.com) and sign up (free).
2. Drag your **entire `charity-foundation` folder** (the one that contains `index.html` and `images`) onto the Netlify “Deploy” area.
3. Netlify gives you a URL like `random-name-123.netlify.app`. You can change it in **Site settings → Domain management** (e.g. `glassesoflove.netlify.app`).
4. **Custom domain:** In Netlify, go to **Domain settings → Add custom domain** and add `glassesoflove.or.ke`. Then in your domain registrar (where you bought .or.ke), set the DNS as Netlify tells you.

### Option 2: GitHub Pages (good if you use GitHub)

1. Create a **GitHub** account and a new **repository** (e.g. `glasses-of-love-website`).
2. Upload your project: put `index.html` and the `images` folder in the **root** of the repo (or in a folder and set that as the source in repo **Settings → Pages**).
3. In the repo go to **Settings → Pages**. Under “Source” choose **Deploy from a branch**. Select the branch (e.g. `main`) and folder (e.g. `/ (root)` or the folder with `index.html`), then Save.
4. The site will be at `https://yourusername.github.io/glasses-of-love-website/`. You can add a custom domain in Pages settings.

### Option 3: Vercel

1. Go to [vercel.com](https://vercel.com) and sign up.
2. Click **Add New → Project**. Import from Git (if your code is on GitHub) or use **Upload** to drag the `charity-foundation` folder.
3. Deploy. You get a URL like `charity-foundation-xxx.vercel.app`. Custom domain: **Project → Settings → Domains**.

### Using your domain glassesoflove.or.ke

- Buy or manage the domain at your **.or.ke registrar** (e.g. Kenya Network Information Centre or your host).
- In the registrar’s DNS settings, add the record your host gives you (Netlify/GitHub/Vercel will show “Add an A record” or “CNAME” and the value).
- In the hosting dashboard, add the domain `glassesoflove.or.ke` (and optionally `www.glassesoflove.or.ke`).

### Checklist before going live

- [ ] Add your real project photos in `images/projects/` (see `images/projects/README.md`).
- [ ] Test all links (email, socials, YouTube).
- [ ] If you add a donation form or payment link later, update the Donate button.

## Customize

- **Name & copy:** Replace “GOL” and all text with your charity’s name and messaging.
- **Colors:** Edit the CSS variables at the top of `<style>` in `index.html` (`:root`).
- **Donate link:** Change the “Give now” and “Donate” button `href` to your real donation page (e.g. Stripe, PayPal, or your own form).
- **Contact:** Update email, phone, and social links in the footer.
- **Stats:** Replace the numbers in the stats section with your real impact data.

No build step or dependencies required—everything is in one HTML file.
