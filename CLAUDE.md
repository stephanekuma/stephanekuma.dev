# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is pnpm.

- `pnpm install` — install dependencies
- `pnpm dev` — start dev server at http://localhost:3000
- `pnpm build` — production build
- `pnpm generate` — static site generation
- `pnpm preview` — preview a production build locally

There is no lint, typecheck, or test script configured in `package.json` yet.

## Architecture

Nuxt 4 app (the `app/` directory layout is in effect: pages/components/layouts/composables all live under `app/`, not the project root). It's a personal portfolio/blog site for Kossi Stéphane Kuma, rebuilt from the static mockup in `docs/site-geek/` (terminal/monospace themed, dark/light toggle, JetBrains Mono, Tailwind).

**No real backend exists yet.** `server/api/*` are Nuxt server routes acting as a temporary mock backend for the genuinely dynamic content — blog posts (`/api/posts`, `/api/posts/[slug]`), projects (`/api/projects`, `/api/projects/[slug]`), and the contact form (`POST /api/contact`, validates + logs, no real email sending yet). Their seed data lives in `server/utils/content.ts`. When a real external backend exists, these routes are the seam to repoint (or delete in favor of calling it directly) — the pages already consume them over `useFetch`/`$fetch`, not local imports. Static/editorial content that isn't meant to be "managed" (hero stats, skills, services, testimonials, career timeline, process steps, contact info, social links) stays as plain data in `app/data/site.ts` instead.

Key pieces:

- `app/composables/useTheme.ts` + the inline anti-flash script in `nuxt.config.ts`'s `app.head.script` — dark/light theme via `data-theme` on `<html>` + `localStorage`, mirroring the mockup's approach.
- `app/error.vue` — single error page keyed on `error.statusCode`, replacing the mockup's separate 403/404/500/503 HTML files.
- `app/components/Timeline.vue` — shared timeline UI used by both `parcours.vue` (career history) and `services/process.vue` (process steps).
- `app/pages/blog/index.vue` — client-side search/tag-filter/pagination ported from the mockup's vanilla JS, operating over `useFetch('/api/posts')`.
- `app/components/GithubStatsWidget.client.vue` — client-only, fetches `api.github.com` directly (not proxied through our backend), matching the mockup.
- `server/routes/rss.xml.get.ts` — RSS feed generated from the same blog post seed data.

`docs/site-geek/` remains as the original static-HTML design reference (not served by the app) — useful for exact copy/wording/markup comparisons when extending a page.
