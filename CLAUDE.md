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

**No real backend exists yet.** `server/api/*` are Nuxt server routes acting as a temporary mock backend for the genuinely dynamic content — blog posts (`/api/posts`, `/api/posts/[slug]`), projects (`/api/projects`, `/api/projects/[slug]`), and the contact form (`POST /api/contact`, validates + logs, no real email sending yet). Their seed data lives in `server/utils/content.ts`, keyed per locale (see below). When a real external backend exists, these routes are the seam to repoint (or delete in favor of calling it directly) — the pages already consume them over `useFetch`/`$fetch`, not local imports. Static/editorial content that isn't meant to be "managed" (hero stats, skills, services, testimonials, career timeline, process steps, education, languages, now updates) stays as plain data in `app/data/site.ts` instead.

### i18n (French + English)

The site is bilingual via `@nuxtjs/i18n`. French is the default locale with no URL prefix (`/services`), English is prefixed (`/en/services`) — `strategy: 'prefix_except_default'` in `nuxt.config.ts`.

- `i18n/locales/fr.json` / `i18n/locales/en.json` — UI chrome strings (nav, buttons, form labels, breadcrumbs, SEO titles/descriptions, error messages). Pages call `useI18n()`'s `t()`, not hardcoded strings.
- `app/data/site.ts` — structured editorial content (hero stats, testimonials, services, process steps, career history, education, languages, now updates) is duplicated per locale inside `getSiteContent(locale)`, consumed via the `useSiteContent()` composable (a `computed` that re-resolves on locale change). Proper nouns (`siteMeta`, `socialLinks`, `clients`, `coreSkills`, `secondarySkills`) stay locale-agnostic.
- `server/utils/content.ts` — blog posts and projects are duplicated per locale (`blogPostsByLocale`, `projectsByLocale`) behind `getBlogPosts(locale)` / `getBlogPost(slug, locale)` / `getProjects(locale)` / `getProject(slug, locale)`. The `server/api/*` routes and `server/routes/rss.xml.get.ts` read `?locale=` from the query string; pages pass `{ query: { locale } }` to `useFetch` so data refetches reactively on language switch.
- Internal navigation must use `useLocalePath()` (`localePath('/blog')`) instead of a bare `to="/blog"` — plain strings don't get the `/en` prefix. `useSwitchLocalePath()` powers `app/components/LanguageSwitcher.vue`.
- `app/app.vue` sets `<html lang>`/`dir` reactively via `useLocaleHead()`.
- When adding a new translatable string, add the key to **both** `fr.json` and `en.json` — there's no fallback/missing-key warning surfaced anywhere else. Literal `@` in a message string must be escaped as `{'@'}` (vue-i18n treats `@` as linked-message syntax and fails to compile otherwise).

### Icons

Icons use `@nuxt/icon` with the Lucide set (`@iconify-json/lucide`, installed locally so icons resolve offline at build/render time — no runtime Iconify API calls). `nuxt.config.ts` forces `icon.mode: 'svg'` (inline SVG) rather than the module's default CSS-mask mode, which wasn't emitting its stylesheet correctly in this setup. Use `<Icon name="lucide:icon-name" size="16" />`.

Key pieces:

- `app/composables/useTheme.ts` + the inline anti-flash script in `nuxt.config.ts`'s `app.head.script` — dark/light theme via `data-theme` on `<html>` + `localStorage`, mirroring the mockup's approach.
- `app/error.vue` — single error page keyed on `error.statusCode`, replacing the mockup's separate 403/404/500/503 HTML files.
- `app/components/Timeline.vue` — shared timeline UI used by both `parcours.vue` (career history) and `services/process.vue` (process steps).
- `app/pages/blog/index.vue` — client-side search/tag-filter/pagination ported from the mockup's vanilla JS, operating over `useFetch('/api/posts')`.
- `app/components/GithubStatsWidget.client.vue` — client-only, fetches `api.github.com` directly (not proxied through our backend), matching the mockup.
- `server/routes/rss.xml.get.ts` — RSS feed generated from the same blog post seed data, locale-aware via `?locale=`.

`docs/site-geek/` remains as the original static-HTML design reference (not served by the app) — useful for exact copy/wording/markup comparisons when extending a page. Note it predates the i18n/icon work, so it won't reflect either.

### Easter eggs

- `app/plugins/easter-eggs.client.ts` — one global `keydown` listener (client-only) handling: `Ctrl/Cmd+K` (toggle the command terminal, works even while typing), the Konami code (↑↑↓↓←→←→BA → Matrix rain), `?` (shortcuts help), and vim-style `g`+key navigation (`g h/s/j/p/b/c/n`). All composable calls (`useCommandTerminal`, `useRouter`, `useLocalePath`, etc.) are resolved **once** at plugin setup time and the returned refs/functions reused inside the listener — calling composables again from inside a raw DOM event callback would run outside Vue's injection context and fail.
- `app/composables/useEasterEggs.ts` — shared `useState`-backed toggles: `useCommandTerminal()`, `useShortcutsHelp()`, `useMatrixRain()`.
- `app/components/CommandTerminal.vue` — a fake terminal (opened via `Ctrl+K` or the footer hint) supporting `help`, `whoami`, `ls`, `cd <page>`, `cat <file>`, `open <network>`, `theme <dark|light>`, `lang <fr|en>`, `date`, `echo`, `clear`, `sudo`, `exit`. Output strings live under the `terminal.*` i18n namespace.
- `app/components/ShortcutsHelp.vue` / `MatrixRain.vue` — the `?` cheatsheet and the Konami-triggered canvas rain effect, respectively.
- `app/plugins/console-banner.client.ts` — logs an ASCII banner + hint to the browser console for curious devs.
- All four are mounted globally in `app/app.vue` (alongside `<NuxtLayout>`) so they're available on every page, including `error.vue`.
