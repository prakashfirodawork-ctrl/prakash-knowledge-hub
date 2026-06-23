# Prakash Knowledge Hub

> **AI, Pi Network, Web3, Data Analytics, Personal Branding and Digital Growth Blog Platform.**

[![Netlify Status](https://api.netlify.com/api/v1/badges/placeholder/deploy-status)](https://prakashknowledgehub.com)
[![GitHub](https://img.shields.io/github/license/prakashfirodawork-ctrl/prakash-knowledge-hub)](LICENSE)

A full-stack, SEO-optimized blogging platform by **Prakash Choudhary** — covering Artificial Intelligence, Pi Network, Web3 & Blockchain, Data Analytics, Personal Branding, Digital Growth, and Education.

**Live Demo:** [prakashknowledgehub.com](https://prakashknowledgehub.com)

---

## Project Overview

Prakash Knowledge Hub is a content platform built for students, professionals, entrepreneurs, and Pi Network Pioneers who want practical, actionable insights on emerging technologies and digital growth strategies.

The platform features a high-performance React + Vite frontend backed by an Express/PostgreSQL API, with full SEO optimization, dark mode, a Pi Network referral bar, and a rich post-creation dashboard.

---

## Features

- **7 Content Categories** — AI, Pi Network, Web3, Data Analytics, Personal Branding, Digital Growth, Education
- **Dark / Light Mode** — system-aware toggle with smooth transitions
- **Pi Network Referral Bar** — sticky floating bar linking to `@prakashphiroda` invitation
- **Full-Text Search** — search across titles, descriptions, tags, and categories
- **Rich Article Pages** — reading time, view counter, like button, related posts
- **Author Profile Page** — personal branding, stats, social links, Pi referral card
- **Dashboard** — create and publish posts with Markdown support
- **SEO Optimized** — per-page meta, Open Graph, Twitter Cards, JSON-LD, sitemap, robots.txt
- **Mobile Responsive** — designed mobile-first with Tailwind CSS
- **Performance** — code-split chunks, Vite build, gzip-compressed assets

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite 7, Tailwind CSS 4, Wouter (routing) |
| **UI Components** | shadcn/ui, Radix UI, Framer Motion, Lucide React |
| **Data Fetching** | TanStack React Query v5 |
| **Backend** | Node.js 20, Express 5 |
| **Database** | PostgreSQL + Drizzle ORM |
| **API Contract** | OpenAPI 3.1 → Orval codegen (React Query hooks + Zod schemas) |
| **Monorepo** | pnpm workspaces |
| **SEO** | react-helmet-async, JSON-LD, Open Graph, Twitter Cards |
| **Theming** | next-themes (dark/light mode) |
| **Build** | Vite (frontend), esbuild (API server) |
| **Validation** | Zod v4, drizzle-zod |

---

## Project Structure

```
.
├── artifacts/
│   ├── blog/                        # React + Vite frontend
│   │   ├── public/
│   │   │   ├── images/              # Author photos & site images
│   │   │   ├── favicon.svg
│   │   │   ├── sitemap.xml          # SEO sitemap
│   │   │   ├── robots.txt           # Crawler rules
│   │   │   └── _redirects           # Netlify SPA routing
│   │   └── src/
│   │       ├── pages/               # Route-level components
│   │       │   ├── home.tsx         # Landing page
│   │       │   ├── blog.tsx         # Article listing
│   │       │   ├── blog-post.tsx    # Single article
│   │       │   ├── category.tsx     # Category filter
│   │       │   ├── search.tsx       # Full-text search
│   │       │   ├── author.tsx       # Author profile
│   │       │   └── dashboard.tsx    # Post creation
│   │       ├── components/
│   │       │   ├── layout/          # Header, Footer, Layout, Pi bar
│   │       │   └── ui/              # shadcn/ui components
│   │       └── main.tsx             # App entry point
│   └── api-server/                  # Express REST API
│       └── src/routes/              # posts, categories, tags, search, stats
├── lib/
│   ├── db/                          # Drizzle ORM schema & migrations
│   ├── api-spec/openapi.yaml        # OpenAPI 3.1 source of truth
│   └── api-client-react/            # Generated React Query hooks
├── netlify.toml                     # Netlify deployment config
├── vercel.json                      # Vercel deployment config
└── README.md
```

---

## Installation Guide

### Prerequisites

- **Node.js 20+**
- **pnpm 9+** — `npm install -g pnpm`
- **PostgreSQL** (local or cloud)

### 1. Clone the repository

```bash
git clone https://github.com/prakashfirodawork-ctrl/prakash-knowledge-hub.git
cd prakash-knowledge-hub
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

```bash
# Create a .env file at the project root
cp .env.example .env
```

```env
# Required
DATABASE_URL=postgresql://user:password@localhost:5432/prakash_hub

# Optional — set if API is deployed on a separate domain
VITE_API_BASE_URL=https://your-api-server.com
```

### 4. Set up the database

```bash
# Push schema to your PostgreSQL instance
pnpm --filter @workspace/db run push

# Seed sample posts (optional)
pnpm --filter @workspace/db run seed
```

### 5. Start development servers

```bash
# Frontend — http://localhost:5173
pnpm --filter @workspace/blog run dev

# API server — http://localhost:8080
pnpm --filter @workspace/api-server run dev
```

---

## Deployment Guide

### Netlify (Recommended — one-click)

1. Fork/clone this repo to your GitHub account
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**
3. Select your repository — Netlify auto-detects `netlify.toml`
4. Set environment variable: `VITE_API_BASE_URL` → your API server URL
5. Click **Deploy site**

Build settings (pre-configured in `netlify.toml`):
- **Build command:** `pnpm install --frozen-lockfile && pnpm --filter @workspace/blog run build`
- **Publish directory:** `artifacts/blog/dist/public`

### Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import from GitHub
2. Select this repository — Vercel auto-detects `vercel.json`
3. Set `VITE_API_BASE_URL` in environment settings
4. Click **Deploy**

### GitHub Pages (Static frontend only)

```bash
# Build the frontend
pnpm --filter @workspace/blog run build

# The output is in artifacts/blog/dist/public/
# Push that folder to your gh-pages branch or configure GitHub Actions
```

> **Note:** For GitHub Pages with a non-root repo path, update `base` in `artifacts/blog/vite.config.ts` to match your repo name: `base: "/prakash-knowledge-hub/"`

### Full-Stack Deployment (Frontend + API + Database)

| Component | Recommended Platforms |
|---|---|
| **API Server** | Railway, Render, Fly.io |
| **Database** | Neon, Supabase, Railway PostgreSQL |
| **Frontend** | Netlify, Vercel, Cloudflare Pages |

Set `VITE_API_BASE_URL` on your frontend host to your deployed API URL.

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/posts` | List posts (paginated, filterable) |
| `POST` | `/api/posts` | Create a new post |
| `GET` | `/api/posts/featured` | Featured posts |
| `GET` | `/api/posts/popular` | Most-viewed posts |
| `GET` | `/api/posts/recent` | Recent posts |
| `GET` | `/api/posts/:slug` | Single post by slug |
| `PATCH` | `/api/posts/:slug` | Update a post |
| `DELETE` | `/api/posts/:slug` | Delete a post |
| `POST` | `/api/posts/:slug/view` | Increment view count |
| `POST` | `/api/posts/:slug/like` | Like a post |
| `GET` | `/api/posts/:slug/related` | Related posts |
| `GET` | `/api/categories` | All categories with counts |
| `GET` | `/api/tags` | All tags |
| `GET` | `/api/search?q=query` | Full-text search |
| `GET` | `/api/stats/summary` | Site-wide statistics |

---

## SEO Features

- **Per-page meta tags** via `react-helmet-async`
- **Open Graph** tags for rich social media previews
- **Twitter Cards** (`summary_large_image`)
- **JSON-LD Structured Data** — `WebSite` + `Person` schema on every page
- **`sitemap.xml`** — all major routes listed
- **`robots.txt`** — allows all crawlers, links to sitemap
- **Semantic HTML** — proper `<h1>`→`<h6>` hierarchy, `<article>`, `<nav>`, `<main>`
- **Canonical URLs** — prevents duplicate content issues
- **`theme-color`** meta — Pi Purple `#5E3A99` for mobile browsers

---

## Content Categories

| Category | Topics Covered |
|---|---|
| 🤖 Artificial Intelligence | AI tools, ChatGPT, automation, EdTech AI |
| π Pi Network | Launchpad, KYC, ecosystem, mining, Open Mainnet |
| 🔗 Web3 & Blockchain | DeFi, NFTs, smart contracts, wallets |
| 📊 Data Analytics | SQL, Python, Power BI, dashboards |
| 🎯 Personal Branding | LinkedIn, content strategy, thought leadership |
| 📈 Digital Growth | SEO, social media, audience building |
| 🎓 Education | Learning strategies, EdTech, career development |

---

## Author

**Prakash Choudhary** — AI Educator · Digital Builder · Web3 Advocate

> *"Learn. Build. Grow. Impact."*

| Platform | Link |
|---|---|
| 🌐 Website | [Prakash Identity Hub](https://prakashfirodawork-ctrl.github.io/Prakash-Identity-Hub) |
| 💼 LinkedIn | [@prakashphiroda](https://www.linkedin.com/in/prakashphiroda) |
| 🐦 Twitter / X | [@PiProtecter](https://x.com/PiProtecter) |
| 📘 Facebook | [@prakashphiroda](https://www.facebook.com/prakashphiroda) |
| 📷 Instagram | [@prakashphiroda](https://www.instagram.com/prakashphiroda) |
| π Pi Network | Referral code: **`prakashphiroda`** |

---

## Contributing

This is a personal knowledge platform. If you find a bug or have a suggestion, feel free to open an issue.

---

## License

MIT © Prakash Choudhary
