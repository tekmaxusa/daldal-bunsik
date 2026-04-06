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

Workflow: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) — **`build`** then **`deploy`** (same idea as other `tekmaxusa` sites). The live URL appears on the green **deploy** job after success.

**One-time setup (required — avoids deploy 404)**

1. Open **[Pages settings](https://github.com/tekmaxusa/daldal-bunsik/settings/pages)**.
2. **Build and deployment** → **Source** → choose **GitHub Actions** (not “Deploy from a branch” / not only `gh-pages`).
3. Save. If you previously used the `gh-pages` branch, switch this to **GitHub Actions** so `actions/deploy-pages` can run.
4. Push to `main` or **Actions** → **Deploy to GitHub Pages** → **Run workflow**.

Live site: **https://tekmaxusa.github.io/daldal-bunsik/**

The workflow build uses the repo slug from `GITHUB_REPOSITORY` for Vite’s `base` (see [`vite.config.ts`](vite.config.ts)). For a **local** production build that matches Pages, run `VITE_BASE_URL=/daldal-bunsik/ npm run build` (adjust the path if the repo name changes).

## Repo

[https://github.com/tekmaxusa/daldal-bunsik](https://github.com/tekmaxusa/daldal-bunsik)
