# Daldal Bunsik

Korean bunsik (snack bar) restaurant site — menu, locations, and online ordering — built with **Vite**, **React**, and **Tailwind CSS**.

## Run locally

**Prerequisites:** Node.js 20+

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and set any `VITE_*` values you need (ordering, etc.)
3. Start dev server: `npm run dev` → [http://localhost:3000](http://localhost:3000)

## Production build

```bash
npm run build
```

## Docker

```bash
docker compose up --build
```

App is served at [http://localhost:3000](http://localhost:3000) (nginx).

## Deploy with GitHub Actions (GitHub Pages)

Workflow: [`.github/workflows/deploy-github-pages.yml`](.github/workflows/deploy-github-pages.yml) — runs on every push to `main`.

**One-time setup**

1. GitHub repo → **Settings** → **Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. Push to `main`; open the **Actions** tab to watch **Deploy to GitHub Pages**.
4. When it finishes, the site is at **https://tekmaxusa.github.io/Daldal-Bunsik/**

If you rename the repository, update `VITE_BASE_URL` in the workflow to match (`/Your-Repo-Name/`).

## Repo

[https://github.com/tekmaxusa/Daldal-Bunsik](https://github.com/tekmaxusa/Daldal-Bunsik)
