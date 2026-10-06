# Arlen — Portfolio

Personal portfolio and résumé site built with React + Vite.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Edit content

All text lives in two files — no need to touch the components:

- `src/data/profile.js` — name, tagline, about, contact links, experience, education, skills
- `src/data/projects.js` — featured case studies and the smaller project cards

To offer a résumé download, put the PDF in `public/` and set `links.resume` in `profile.js`
(e.g. `'./Arlen-Resume.pdf'`). To show LinkedIn, set `links.linkedin`.

## Deploy for free (GitHub Pages)

1. Create a new **public** repository on GitHub named **`Arvolen.github.io`**
   (this exact name gives you the clean URL `https://arvolen.github.io`; any other name
   also works and becomes `https://arvolen.github.io/<repo-name>/`).
2. Push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/Arvolen/Arvolen.github.io.git
   git push -u origin main
   ```
3. On GitHub, open the repo → **Settings → Pages** → under *Build and deployment*, set
   **Source** to **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` builds and publishes the site. After a
   minute or two it's live. Every later `git push` redeploys automatically.
