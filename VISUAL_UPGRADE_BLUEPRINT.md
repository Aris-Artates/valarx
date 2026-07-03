# VALARX Visual Upgrade Blueprint

A phase-by-phase plan for upgrading the VALARX community platform's visual identity: a dynamic
theming system, a smart "quest log" event section, and site-wide gaming-flavored UX — while
keeping the site clean, readable, and modern.

**Status legend:** ✅ implemented · 📋 specified (ready to build) · 🔮 blueprint (needs decisions/backend work first)

| Phase | Scope | Status |
|---|---|---|
| 1 | Theme token foundation (JSON → Tailwind v4) | ✅ implemented |
| 2 | Token refactor sweep (all hardcoded colors → semantic tokens) | ✅ implemented |
| 3 | Smart event section — "Quest Log" redesign | ✅ implemented (+ loading skeletons) |
| 4 | Site-wide gaming UX & micro-interactions | 🔶 largely implemented (see note below) |
| 5 | Projects showcase (inventory slots) + Community XP tracker | 🔮 blueprint |

---

## How the theme system works (Phases 1–2, implemented)

**Single source of truth:** [`frontend/theme/theme.json`](frontend/theme/theme.json)

```
theme/theme.json  ──(node scripts/generate-theme.mjs)──►  app/theme.css  ──►  Tailwind v4 utilities
```

- Edit any value in `theme.json`, then run `node scripts/generate-theme.mjs` from `frontend/`
  (it also runs automatically before `npm run dev` and `npm run build`).
- The script emits `app/theme.css` (committed, never hand-edited) containing:
  - a `:root` block with the raw brand variables (`--primary`, `--secondary`, `--accent`,
    `--background-dark`, …)
  - a Tailwind v4 `@theme inline` block mapping them to utility namespaces, so components use
    semantic classes like `bg-secondary`, `text-accent/70`, `border-deepest`, `shadow-glow`.
- **To re-brand the whole site, change the hex values in `theme.json` and restart dev.** Nothing
  else needs to be touched — no component uses a raw hex anymore.

### Color tokens

| Token (JSON key / CSS var) | Value | Role | Utility classes |
|---|---|---|---|
| `primary` | `#300a86` | Dominant brand purple, page base | `bg-primary`, `text-primary` |
| `secondary` | `#42169b` | Elevated surfaces: cards, panels, modal | `bg-secondary` |
| `accent` | `#a7ff04` | Neon lime — CTAs, highlights, active states | `bg-accent`, `text-accent/70`, `border-accent/40` |
| `accent-hover` | `#91db03` | Button hover fill | `hover:bg-accent-hover` |
| `accent-dim` | `#6b9e02` | Muted lime — timeline year dots; reserved as the "completed quest" accent (Phase 3) | `bg-accent-dim` |
| `background` | `{primary}` (reference) | Page background | `bg-background` |
| `background-dark` | `#230761` | Deeper wells, hover fills, footer | `bg-background-dark/60` |
| `background-deepest` | `#0f005c` | Borders, dividers, deep shadows | `border-deepest`, `bg-deepest` |
| `text` | `#ffffff` | Text ("ink"); muted text via opacity | `text-ink`, `text-ink/60` |
| `text-on-accent` | `{background-deepest}` | Text on lime buttons | `text-on-accent` |

Values may reference other tokens with `{token-name}` — e.g. `"background": "{primary}"` becomes
`--background: var(--primary)`, so changing `primary` re-skins the background automatically.

### Other token groups

- **Typography** — fonts (`--font-sans` → Geist, with system fallbacks), a semantic size scale
  (`text-display`, `text-h1`, `text-h2`, `text-body`, `text-small`, `text-label` — available for
  Phases 3–4), and the `eyebrow` composite utility (small uppercase tracked label used as section
  markers site-wide).
- **Radius** — `rounded-sm/md/lg/xl/2xl` (kept at Tailwind defaults so existing layouts are
  unchanged, but now user-tunable) plus `rounded-slot` (`0.25rem`) — the sharp "game-UI" radius
  reserved for inventory slots (Phase 5).
- **Shadows** — standardized from the previously ad-hoc values: `shadow-panel`, `shadow-modal`,
  `shadow-glow` (accent glow at 20%), `shadow-glow-strong` (35%, for LIVE quests / legendary
  slots), `shadow-card-lift` (PersonCard 3D pop), `shadow-hero-glow`. Glow shadows are built with
  `color-mix(… var(--accent) …)` so they follow the accent color when you re-theme.
- **Motion** — `--duration-fast/base/slow` (`:root` vars for custom animation classes) and
  easings `ease-smooth` / `ease-snap` (the snappy overshoot curve for "game menu" presses).
  Named to avoid overriding Tailwind's built-in `ease-out`, which the header nav already uses.

### Phase 2 replacement table (applied)

| Before (hardcoded) | After (semantic) |
|---|---|
| `bg-[#300a86]` | `bg-background` |
| `bg-[#42169b]` | `bg-secondary` |
| `bg-[#230761]`, `bg-[#1a0660]` | `bg-background-dark` (off-token `#1a0660` folded in — near-identical) |
| `border-[#0f005c]` / `text-[#0f005c]` | `border-deepest` / `text-on-accent` |
| `text-[#a7ff04]/70` etc. | `text-accent/70` (opacity modifiers carry over) |
| `hover:bg-[#91db03]` | `hover:bg-accent-hover` |
| inline `#6b9e02` dot | `bg-accent-dim` |
| `text-white/XX`, `border-white/30` | `text-ink/XX`, `border-ink/30` |
| `shadow-2xl shadow-[#0f005c]` (modal) | `shadow-modal` |
| `shadow-[0_0_14px_rgba(167,255,4,0.2)]` (nav) | `shadow-glow` |
| inline `boxShadow: 0 3vh 6vh -1.5vh #0f005c` (PersonCard) | `shadow-card-lift` |
| inline accent ring / glare rgba values (PersonCard) | `ring-accent/20`, `var(--accent)` color-mix |
| `shadow-[0_40px_60px_20px_#300a86]` (about) | `shadow-hero-glow` |

Also fixed in Phase 1–2: the body font was accidentally Arial (a `font-family` rule in
`globals.css` overrode the loaded Geist font) — the site now actually renders in Geist; dead
splash-screen keyframes were removed from `globals.css` (the component injects its own).

---

## Phase 3 — Smart Event Section: the "Quest Log" 📋

**Goal:** events automatically detect their status; completed events visually become "Completed"
and move to a Quest Archive section at the bottom of the events page (decision made: bottom
section, not a separate tab — with one scroll narrative and today's small event count, a tab
would feel empty; graduate to `/event?view=archive` once the archive exceeds ~10 events).

### 3.1 Data model (backwards-compatible)

- Add **optional** ISO fields to the `Event` type in `frontend/app/data/events.ts`:
  ```ts
  startDate?: string; // ISO "YYYY-MM-DD" or full datetime
  endDate?: string;
  ```
  Keep the display strings `date` ("April, 2026") and `month` untouched — the API, static
  fallback, and admin form all keep working.
- Mirror in the backend Pydantic model `backend/app/models/event.py` (`Optional[str] = None`)
  and add real dates to the seed event in `backend/app/data/events.py`.

### 3.2 Status detection — `frontend/lib/eventStatus.ts` (new)

```ts
type EventStatus = 'upcoming' | 'ongoing' | 'completed';
getEventStatus(event: Event, now = new Date()): EventStatus
```

- With ISO dates: `upcoming` before `startDate`; `ongoing` between start and
  (`endDate` ?? end of start day); `completed` after.
- Fallback (only `date: "Month, YYYY"` available): reuse the existing month-parsing from
  `isEventPast` — `completed` after the month's last day, otherwise `upcoming`.
  `ongoing`/LIVE is only reachable with ISO dates (prevents an event showing "LIVE" for a month).
- Pure function over the shared `Event` shape → works identically for API data and the
  `staticEvents` fallback. `isEventPast` becomes a thin wrapper (or is deleted; its only caller
  is the EventModal register pill).

### 3.3 UI restructure — `frontend/app/event/page.tsx`

Two zones, one page:

1. **⚔ Active Quests (top)** — status `upcoming`/`ongoing`, sorted soonest-first.
   - New `frontend/app/components/QuestBoard.tsx`: large cards, not timeline rows.
   - New shared `frontend/app/components/EventCard.tsx` with `variant: 'active' | 'archived'`
     so the board and the archive don't fork markup.
   - Card anatomy: left **date rail** (month + "in N days" countdown when `startDate` exists),
     status chip (`UPCOMING` = outlined accent; `LIVE` = filled accent with a subtle pulse),
     type badge, title, brief, location; hover = lift + `shadow-glow-strong`.
2. **🏆 Quest Archive (bottom)** — status `completed`.
   - **Evolve `TimelineContent.tsx`, don't replace it** — the year/month dot-rail spine is
     exactly right for a history view. Add: reverse-chronological sorting (it currently renders
     API order), archived card styling, and use the shared `EventCard` for row bodies.
   - Archived treatment: accents swap `accent` → `accent-dim`, muted borders (`border-deepest`),
     slight desaturation (`opacity-80`), a rotated bordered "COMPLETED" stamp in the corner
     (eyebrow-style uppercase), and denser/collapsed rows (hover-expand kept, shorter).
3. **EventModal** — replace the binary "Registration Closed" pill with a status chip driven by
   `getEventStatus`: `Completed` (accent-dim) / `LIVE` / Register CTA for upcoming.
4. **Admin form** (`frontend/app/admin/events/new/page.tsx`) — add `<input type="date">` for
   `startDate`/`endDate`; optionally derive the display `date`/`month` strings from `startDate`
   before POSTing.

**Verification:** seed event (April 2026) appears under Active Quests as UPCOMING; temporarily
set a static event's date to 2025 → renders in the Archive with the COMPLETED stamp; behavior
identical with the API up and down (static fallback); POSTing an event without `startDate`
still succeeds.

---

## Phase 4 — Site-Wide Gaming UX & Micro-interactions 🔶

> **Status update:** implemented — `btn-menu`, global `:focus-visible` ring, `bg-arcade-grid`
> layered backdrop, `prefers-reduced-motion` block, landing hero upgrade, real copy on the
> Connect page, about-page mobile responsiveness fixes, navigation ARIA (`aria-current`,
> labeled nav landmarks), modal focus
> management, quest-log loading skeletons, and "Neon Terminal" mono accents (see
> `DESIGN_SYSTEM_PROMPT.md`). Remaining from the original spec: `.border-sweep` animated border
> (waiting on Phase 5 legendary slots) and the optional landing stat strip.

**Principle:** CSS-only (no animation library), consuming the motion tokens, always respecting
`prefers-reduced-motion`.

### 4.1 Reusable utility set (add to `globals.css` as `@utility`)

| Utility | Behavior |
|---|---|
| `btn-menu` | "Main-menu button": hover `translateY(-1px)` + `shadow-glow`; active press `scale(0.98)`; `var(--duration-base)` + `ease-smooth` |
| `focus-game` | Consistent `focus-visible` ring in accent with offset (the site currently has no focus treatment — apply to nav tabs, buttons, cards) |
| `border-sweep` | Animated gradient border sweep for featured/legendary items |
| global media block | `@media (prefers-reduced-motion: reduce)` zeroes transforms/animations for the above **and** FadeIn / StickyFadeSection / SplashScreen (none respect it today) |

### 4.2 Per-page enhancement map

| Page | Enhancement |
|---|---|
| Landing `app/page.tsx` | Hero upgrade: eyebrow + `text-display` headline, CTAs restyled as `btn-menu` "press start" buttons, subtle scanline/grid backdrop in `background-dark`, optional stat strip (events held / members) |
| About `app/about/page.tsx` | Section markers restyled as quest-log headers; keep FadeIn/StickyFade animations |
| Connect `app/connect/page.tsx` | **Replace the lorem-ipsum heading with real copy**; link grid restyled as "party invite" cards with glow hover |
| Team `app/team/page.tsx` | Keep unlinked (placeholder data) until real member data exists; then reuse `PersonCard` |
| Header / NavBox | Build on the existing neon-glow tabs: press state (`ease-snap`), active-tab underglow, `focus-game` rings — the site's "main menu" |
| Admin form | Minimal token restyle so it's no longer raw unstyled HTML (low priority) |

**Verification:** keyboard-tab pass shows focus rings on every interactive element; enabling the
OS reduced-motion setting disables lifts/sweeps/fades; Lighthouse accessibility score unchanged
or better.

---

## Phase 5 — Projects Showcase & Community XP 🔮

### 5.1 Inventory-slot project cards (buildable now with seed data)

No project data exists yet — build the component future-ready with a static seed, mirroring the
`staticEvents` pattern:

- `frontend/app/data/projects.ts`:
  ```ts
  interface Project {
    id: string; title: string; author: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    engine?: string; thumbnail?: string; tags?: string[]; url?: string;
  }
  ```
- `frontend/app/components/ProjectSlot.tsx` + optional `frontend/app/projects/page.tsx`:
  - Square/4:3 slot grid (`grid-cols-2 md:grid-cols-4`), sharp `rounded-slot` corners.
  - Rarity borders: common `border-deepest` · rare `border-secondary` · epic `border-accent-dim`
    · legendary `border-accent` + `shadow-glow-strong` + `border-sweep`.
  - **Empty-slot state:** dashed `border-ink/20`, centered "+", microcopy
    "Slot open — submit your project" (links to Discord/submission form).
  - Hover: lift + glow + meta reveal (author, engine, tags).

### 5.2 Community XP tracker (blueprint only — blocked on backend)

**Frontend widget spec:**
- `XPBar` — level badge, animated accent fill bar, next-level threshold label; compact variant
  for the header corner.
- `ActivityFeed` — recent community actions ("Riel completed the Lua workshop · +50 XP").

**Backend requirements (must come first — do not build the UI against nothing):**
- Persistence: the FastAPI backend currently stores events in an **in-memory list** (lost on
  restart). XP needs a real database (SQLite/Postgres via SQLModel is the natural fit).
- Auth: middleware guards `/admin/*` by cookie **presence only** and redirects to a `/login`
  route that **does not exist**. Real sessions/login must exist before XP writes can be trusted.
- Models: `Member`, `ActivityEvent(memberId, type, xp, timestamp)`, `XPRule(type → points)`.
- Endpoints: `GET /members/{id}/xp`, `GET /leaderboard`, `POST /activity` (auth-gated).

---

## Risks & open items

1. **Seed event needs a real ISO date** (Phase 3): "Lua Fundamentals 2026" has month-only
   precision. The month fallback keeps it correctly UPCOMING meanwhile. When known, update
   **both** `frontend/app/data/events.ts` and `backend/app/data/events.py`.
2. **Duplicated seed data**: the frontend static fallback and backend seed are hand-synced
   copies — every event edit must touch both. Future improvement: generate one from the other.
3. **`/login` dead end**: unauthenticated `/admin` visits redirect to a 404. Out of scope for
   the visual upgrade; blocks Phase 5 auth. Flagged so it isn't forgotten.
4. **`#1a0660` fold-in** (done in Phase 2): merged into `background-dark` (`#230761`) — a
   near-invisible change on three surfaces (about-page stat cells, sticky sections).
5. **Naming semantics**: `--primary` is the deep purple (dominant brand color) per the chosen
   convention; the neon lime is `--accent`. Keep this mental model when editing `theme.json`.
