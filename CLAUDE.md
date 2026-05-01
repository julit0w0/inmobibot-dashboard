# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server on port 5173
npm run build     # Production build → dist/
npm run lint      # ESLint check
npm run preview   # Preview production build
```

**Important:** Run these from a WSL terminal with nvm active (nvm is configured in `~/.bashrc`). Do not run from Windows cmd/PowerShell — the project lives in the WSL filesystem and requires Linux node. node_modules must be installed with WSL's npm.

No test suite exists — testing is manual in the browser.

## Architecture

React 19 + Vite SPA for a real estate (inmuebles) management platform, targeting Spanish-speaking real estate agents (es-AR locale). All data is currently mocked in `src/data.jsx` for May 2026 prototyping.

**Stack:**
- **Vite** — dev server at port 5173, path alias `@/` → `./src`, API proxy `/api/*` → `http://localhost:8000` (FastAPI backend)
- **React Query** — configured in `main.jsx` with `staleTime: 30s`, `retry: 1`; axios is installed but API calls aren't wired yet
- **Zustand** — installed but unused; available for global state
- **Custom CSS design system** — `tokens.css` defines all design tokens (`--accent-*`, `--gray-*`, `--fg-*`, `--bg-*`, `--border-*`); `styles.css` builds on them with layout primitives. No Tailwind.

**Routing:**
Manual state-based routing via `useState` in `Shell.jsx` — no React Router. Active views: `dashboard`, `calendar`, `properties`, `clients`, `documents` (placeholder), `settings`.

**Key files:**
- `Shell.jsx` — layout wrapper (fixed sidebar + fixed topbar), navigation state, `onNav()` handler
- `Primitives.jsx` — atomic UI components: `Icon` (SVG sprite from `/public/icons.svg`), `Button`, `IconButton`, `Pill`, `Tabs`, `Tooltip`, `Input`, `Select`, `Textarea`, `Modal`, `Drawer`, `Popover`
- `data.jsx` — mock data (PROPERTIES, CLIENTS, EVENTS) + helpers; exports to `window` for sibling components
- `Dashboard.jsx` — KPI cards + today's agenda
- `Calendar.jsx` — month/week/day views with drag-to-create; event kinds: `visit`, `rent`, `meet`, `call`, `sign`
- `Properties.jsx` — list + detail drawer; property types: `departamento`, `casa`, `ph`, `local`, `oficina`
- `Clients.jsx` — list + detail drawer; client roles: `prospect`, `tenant`, `owner`
- `EventPopover.jsx` — floating event detail with quick actions (confirm, reschedule, cancel, delete)

**UI patterns:**
- Drawers (`<Drawer>`) slide in from the right for entity details
- Popovers (`<Popover>`) are absolutely-positioned for event details
- Status badges use `<Pill>` with a `kind` prop mapped to color tokens
- `App.jsx` is the real shell entry: `Sidebar` + `Topbar` + page routing + global `EventPopover` + `ToastStack`
