# VALARX Deployment Plan — Backend Hosting (Free-First)

How to take the current FastAPI backend live in a way that's compatible with the frontend as it
exists today, for **$0/month**, with honest caveats and cheap paid upgrades when they're worth it.
Facts about free tiers verified July 2026 (they change often — re-check before committing).

---

## 1. The compatibility contract (what any host must satisfy)

The frontend only needs these things from a backend host:

| Requirement | Where it comes from |
|---|---|
| `GET /events/` → JSON array of events (now incl. optional `startDate`/`endDate`) | `app/event/page.tsx`, `app/event/[id]/register/page.tsx` |
| `POST /events/` → create event | `app/admin/events/new/page.tsx` |
| CORS allowing the deployed frontend origin | `backend/app/main.py` currently allows only `localhost:3000` / `192.168.1.10:3000` — **must be updated** |
| A public HTTPS URL in `NEXT_PUBLIC_API_URL` | `frontend/.env.local` today; set in the frontend host's env settings when deployed |

Built-in resilience worth knowing: the **event listing page falls back to `staticEvents` when the
API is unreachable** — so a backend that sleeps/cold-starts degrades gracefully on the most
visited page. The register page and admin form have **no fallback**; they need the API awake.

## 2. ⚠ Step zero: persistence (do this before hosting anything)

The backend stores events in an **in-memory Python list**. On your own always-on machine that's
merely fragile (events vanish on restart). On free cloud tiers it's actively broken:

- **Serverless hosts (Vercel Functions):** every instance re-seeds from the file; a POSTed event
  disappears almost immediately and different requests can see different data.
- **Render free tier:** the service spins down after 15 minutes idle — all admin-created events
  are erased several times a day.

**Fix (small):** add a real database before deploying. Recommended: **Neon free Postgres**
(0.5 GB — years of event data; scale-to-zero with ~sub-second wake; Singapore region available).
Minimal implementation that changes nothing about the API surface:

- Add `sqlmodel` (or `psycopg[binary]`) to `requirements.txt`.
- One table, one JSONB column: `events(id text primary key, data jsonb)` — each event stored as
  the same JSON the API already speaks. ~40 lines in a new `app/db.py`; the two route handlers
  swap `events.append(...)` / list return for two small queries. Seed once from the existing
  `app/data/events.py`.
- `DATABASE_URL` comes from an env var. Locally you can keep the in-memory list as a fallback
  when `DATABASE_URL` is unset, so dev workflow doesn't change.

(Why not SQLite? It needs a persistent disk — free tiers give you ephemeral filesystems. SQLite
becomes the right answer only on the VPS option below.)

## 3. Recommended free stack ($0/month)

**Frontend → Vercel Hobby · Backend → Render free web service · Database → Neon free.**

```
[Vercel]  Next.js frontend          — free, native Next.js hosting, auto-deploy from GitHub
    │  NEXT_PUBLIC_API_URL=https://valarx-api.onrender.com
    ▼
[Render]  FastAPI (free web svc)    — free 750 h/mo, Singapore region, auto-deploy from GitHub
    │  DATABASE_URL=postgres://...
    ▼
[Neon]    Postgres (free)           — 0.5 GB, Singapore (ap-southeast-1), wakes in ~ms
```

- **Cost:** $0. No credit card required for any of the three.
- **Region:** put Render + Neon in **Singapore** — best latency for Philippine users.
- **The one real caveat:** Render free services sleep after 15 min idle and take **30–60 s** to
  wake. Impact is small here: the event page shows the static fallback instantly while the API
  wakes; the register iframe and admin form are the only places a visitor might feel it.
- **Use Neon, not Render's own free Postgres** — Render's free database is time-limited
  (deleted after its free period expires); Neon's isn't.
- Setup checklist:
  1. Neon: create project (Singapore) → copy `DATABASE_URL`.
  2. Do step-zero persistence change; seed the Lua Fundamentals event.
  3. Render: New Web Service → repo, root dir `backend`, start command
     `uvicorn app.main:app --host 0.0.0.0 --port $PORT`; add `DATABASE_URL` env var.
  4. Update CORS `allow_origins` in `app/main.py` to include the Vercel domain.
  5. Vercel: import repo, root dir `frontend` (build runs the theme codegen via `prebuild`
     automatically); set `NEXT_PUBLIC_API_URL` to the Render URL.

### Free alternative A — everything on Vercel

Vercel officially supports FastAPI on its Python runtime, so the backend can live as serverless
functions in the same Vercel account: no sleep, small cold starts, $0. Trade-offs: **requires the
Neon migration first** (in-memory is unusable on serverless), 10 s function timeout on Hobby
(fine for these CRUD routes), and Hobby is licensed for non-commercial use (a community site
qualifies). Choose this if you'd rather manage one platform than two; choose Render if you want
the backend to be a plain long-running server you can later move anywhere.

### Free alternative B — Hugging Face Spaces (Docker)

A free CPU Space runs the FastAPI container and only sleeps after ~48 h of *zero* traffic (much
gentler than Render's 15 min). Quirky home for a community API (Spaces are meant for ML demos),
but legitimate and free. Pair with Neon.

### Not recommended for free hosting (July 2026 state)

- **Railway** — no true free tier anymore; Hobby is $5/mo (includes $5 usage).
- **Fly.io** — free allowances removed; realistic small-app cost $8–25/mo.
- **Koyeb** — free Starter tier closed to new users after the Mistral acquisition (early 2026).
- **Supabase free** as the DB — attractive because auth is bundled (relevant for Phase 5), but
  free projects **pause after 1 week of inactivity and need a manual dashboard unpause** — risky
  for a low-traffic community site. Reconsider on the $25/mo tier when Phase 5 needs auth, or
  stick with Neon + roll simple auth.

## 4. Paid options that aren't too expensive

Worth paying when the Render cold start starts annoying you (usually: when admins use the event
form regularly, or events drive registration traffic spikes).

| Option | Cost | What you get | When it makes sense |
|---|---|---|---|
| **Render Starter** (upgrade in place) | **$7/mo** | Same setup, always-on, zero migration — flip one toggle | The default upgrade path from the free stack |
| **Railway Hobby** | **$5/mo** (usage-based, includes $5 credit) | Nice DX, bundled Postgres, always-on within credit | If you want app + DB on one bill; watch usage-based overage |
| **VPS (Hetzner CAX11 or similar)** | **~$4–5/mo** | Full Linux box; SQLite on disk (no external DB needed); can also host other community tools (Discord bots etc.) | Most value per peso, but you own updates, HTTPS (Caddy), and backups |

Frontend stays free on Vercel Hobby in every scenario.

## 5. Phase 5 alignment (XP tracker / auth)

The free stack above already satisfies Phase 5's first blocker (persistence). The remaining one
is **auth**: the middleware currently guards `/admin/*` by cookie presence and redirects to a
`/login` page that doesn't exist. When Phase 5 starts:

- Add a real session route (`POST /auth/login` on the FastAPI side, HTTP-only cookie, verify in
  `frontend/middleware.ts`) and create the `/login` page — Neon stores members/sessions.
- Or adopt **Supabase (paid $25/mo)** / **Clerk (free tier: 10k MAU)** for hosted auth if
  rolling your own feels heavy. Clerk's free tier is the cheaper on-ramp.

XP models/endpoints from the blueprint (`Member`, `ActivityEvent`, `GET /leaderboard`, …) then
slot into the same Neon database — no re-hosting needed.

## 6. Decision summary

- **Do now (free):** Neon + step-zero persistence → Render free (Singapore) → Vercel Hobby.
- **First paid upgrade:** Render Starter $7/mo when cold starts hurt.
- **Skip:** Railway/Fly/Koyeb free (gone), Render free Postgres (expires), Supabase free as
  primary DB (weekly pause).

### Sources (free-tier facts, checked July 2026)

- [Render — Deploy for Free docs](https://render.com/docs/free) · [Render pricing](https://render.com/pricing) · [Render free tier guide](https://deploybase.app/blog/render-free-tier-complete-guide-2026)
- [Vercel — Deploy FastAPI](https://vercel.com/docs/frameworks/backend/fastapi) · [Vercel Hobby plan](https://vercel.com/docs/plans/hobby) · [Vercel Functions limits](https://vercel.com/docs/functions/limitations)
- [Neon vs Supabase free tiers (2026)](https://agentdeals.dev/neon-vs-supabase) · [Database free-tier comparison 2026](https://agentdeals.dev/database-free-tier-comparison-2026)
- [Fly.io free tier status 2026](https://www.saaspricepulse.com/tools/flyio) · [Railway pricing 2026](https://www.srvrlss.io/provider/railway/) · [Koyeb alternatives 2026](https://kuberns.com/blogs/koyeb-alternatives/)
- [Free backend hosting platforms tested 2026](https://snapdeploy.dev/blog/free-backend-hosting-2026-apis-servers)
