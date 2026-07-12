# VALARX Frontend Remodel Blueprint

Full structural remodel of the frontend. This document supersedes the design direction in
`DESIGN_SYSTEM_PROMPT.md` ("Neon Terminal") and the styling phases of
`VISUAL_UPGRADE_BLUEPRINT.md`. The theme *infrastructure* those docs describe
(`theme/theme.json` → `scripts/generate-theme.mjs` → `app/theme.css`) is kept — only the design
direction changes.

## Ground rules (from the remodel brief)

1. **Lime green and deep purple become accents only.** Neither is a page or surface color
   anymore. The base becomes a neutral surface scale.
2. **No single gimmick theme.** Retire the gaming/terminal metaphors (quest log, press start,
   party, prompt prefixes, blinking cursors). Voice is a professional tech/learning community —
   consistent everywhere, including fonts.
3. **One cohesive system, not stitched-together pages.** Every page uses the same header, type
   scale, section pattern, card pattern, and button set.
4. **Functionality is preserved.** Everything in the "Functionality contract" section below must
   work identically after the remodel.
5. **Page focus:** Home is interactive, Events spotlights the latest event, About is rebuilt to
   look distinctly professional.

---

## Design direction

**A neutral dark base with two brand accents.**

- The page base becomes a near-black neutral (graphite), not purple. Cards and panels are
  slightly lighter neutrals. Depth comes from a small surface scale + hairline borders, not
  colored glows.
- **Lime (`#a7ff04`) is the primary accent**: CTAs, active nav state, links on hover, the
  featured-event highlight, status dots. Small doses only.
- **Deep purple (`#300a86` family) is the secondary accent**: soft background tints behind
  featured sections, subtle gradients, decorative panels, chart/graphic fills. Never a full-page
  background.

Why dark-neutral instead of light: lime `#a7ff04` is illegible on white (≈1.9:1 contrast) — it
only survives as an accent on dark surfaces. Dark-neutral also carries over every existing
asset (white text, logo, photos) without rework. If a light marketing variant is ever wanted,
it needs a darker lime variant token first — out of scope here.

### Typography — one voice

- **Geist Sans for everything**: headings, body, labels, buttons, stats.
- **Geist Mono is retired from the UI voice.** No more mono eyebrows, `>` prompts, blinking
  cursor spans, or mono status chips. (The font stays loaded only if a real code snippet ever
  needs it.)
- Eyebrow/section labels become sans, `text-xs font-semibold uppercase tracking-widest`,
  in `text-ink/50` with an accent variant for emphasis — same treatment on every page.
- Keep the semantic scale tokens (`text-display`, `text-h1`, …) — they're theme-neutral.

### Naming & copy sweep

| Current (gaming/terminal) | New (professional community) |
|---|---|
| "VALARX Quest Log" | "Events" |
| "Active Quests" / "Quest Archive" | "Upcoming events" / "Past events" |
| `> press start_` | removed |
| "Find the party" (Connect) | "Connect with us" |
| Status chips `LIVE` / `UPCOMING` / `COMPLETED` | "Happening now" / "Upcoming" / "Completed" (sans, sentence case) |
| `QuestBoard.tsx` | `EventGrid.tsx` |
| `TimelineContent.tsx` | `EventTimeline.tsx` |
| `bg-arcade-grid` utility | removed — replaced by a subtle neutral/purple radial tint |
| `btn-menu` utility | `btn-lift` (same behavior, neutral name, toned-down glow) |
| "quest"/"party"/"XP" wording anywhere in copy | plain community wording |

Component renames are pure renames (same props) so call sites update mechanically.

---

## Theme token plan (`frontend/theme/theme.json`)

Keep the existing token *names* where possible so the re-skin is mostly a value swap; add two
new tokens for purple-as-accent. Target values (tune during Phase 1):

```jsonc
"colors": {
  "primary":            "#111114",   // was purple — now the neutral page base
  "secondary":          "#1a1a1f",   // raised surfaces: cards, panels, modal
  "accent":             "#a7ff04",   // unchanged — lime, primary accent
  "accent-hover":       "#91db03",
  "accent-dim":         "#6b9e02",
  "brand":              "#42169b",   // NEW — purple as secondary accent (tints, gradients)
  "brand-deep":         "#300a86",   // NEW — deeper purple for gradient stops
  "background":         "{primary}",
  "background-dark":    "#0c0c0e",   // wells, footer (now darker-than-base, not lighter)
  "background-deepest": "#242429",   // borders, dividers (neutral hairline)
  "text":               "#f5f5f7",
  "text-on-accent":     "#0c0c0e"
}
```

- Shadows: drop the lime `glow` family as a default treatment; keep `shadow-panel`/`shadow-modal`
  as soft neutral shadows. A single restrained `shadow-accent` may remain for the featured event
  card only.
- Motion tokens stay as-is (they're theme-neutral and good).
- `globals.css`: remove `bg-arcade-grid`; rename `btn-menu` → `btn-lift`; keep the
  `:focus-visible` ring (accent) and the `prefers-reduced-motion` block untouched.

---

## Page structure map

Structure only — final visual design of each page is decided at build time within this system.

### Home `app/page.tsx` — interactive

Becomes a real landing page instead of a single centered hero. Needs event data, so it becomes
a client component (or gets a client section) reusing the same fetch + `staticEvents` fallback
as the events page.

1. **Hero** — logo/wordmark, one-line positioning statement, primary CTA (View events) +
   secondary CTA (Join Discord). Subtle purple radial tint as backdrop (the accent use of purple).
2. **Next-event spotlight (the interactive centerpiece)** — pulls the soonest
   upcoming/ongoing event via `getEventStatus`/`getEventSortDate` and shows a live countdown
   (`daysUntil`, ticking at day/hour granularity), status, and a register link. This is the
   main lime-accent moment on the page.
3. **What VALARX is** — three-pillar strip (learn / build / community) distilled from the About
   copy; each pillar links to its page section.
4. **Community strip** — compact Discord/Facebook/Luma row (condensed Connect cards).
5. Scroll-reveal via the existing `FadeIn` (kept); no parallax/sticky experiments here.

### Events `app/event/page.tsx` — latest event is the highlight

1. **Featured event spotlight (top, full-width)** — the single most relevant event:
   first `ongoing`, else soonest `upcoming`, else most recent `completed`. Large card:
   title, date + countdown, location, brief, organizers avatars, register CTA. This is the
   page's hero — the "highlight the latest event" requirement.
2. **Upcoming events** — remaining non-completed events in a responsive card grid
   (`EventGrid`, renamed from `QuestBoard`), same `EventCard` anatomy minus gaming chrome.
3. **Past events** — `EventTimeline` (renamed from `TimelineContent`), reverse-chronological,
   muted styling. Collapses to a simple list on mobile.
4. `EventModal`, hover-preview behavior, skeleton loading, API fetch + static fallback: all kept
   as-is functionally; restyled to the neutral system.

### About `app/about/page.tsx` — rebuilt, professional

Full rebuild. Drop the experimental 200vh sticky-overlap columns (`StickyFadeSection` layout) —
that's the main "frankenstein" offender. Replace with a conventional editorial page:

1. **Hero** — eyebrow + headline + one-paragraph summary (reuse existing copy, it's good).
2. **Mission & approach** — two-column text sections with generous whitespace; existing
   Mission / Education copy condensed and cleaned.
3. **What we do** — the three-card "How we learn" strip (kept, restyled: numbered cards on
   `secondary` surface, accent number).
4. **Who it's for** — the three community groups (kept, restyled to match the same card
   pattern — one card pattern site-wide).
5. **Straight talk** ("What we are not") — kept; simple bordered panel, reads as honesty, which
   *is* professional.
6. **CTA band** — join Discord / view events.

All copy stays; the layout and rhythm change. `FadeIn` for gentle reveals only.

### Connect `app/connect/page.tsx`
Structure kept (heading + 3 link cards). Copy sweep ("Find the party" → "Connect with us"),
cards restyled to the shared card pattern. Fix the Luma link (currently points to
`luma.com/create`, which is Luma's own create-event page — point it at the VALARX Luma
calendar/event URL).

### Team `app/team/page.tsx`
Stays unlinked from nav (placeholder lorem data). Restyle to the shared card pattern only when
real member data lands; not part of remodel scope beyond token inheritance.

### Registration `app/event/[id]/register/page.tsx`
Functionality untouched (hash lookup + Luma iframe). Cosmetic: remove mono loading line, use
the standard skeleton; replace the hardcoded iframe border color with a token.

### Admin `app/admin/**`
Functionality untouched (form → POST `/events/`). Minimal restyle from raw inline-styled HTML
to token utilities so it doesn't look like a different site. Low priority, last.

### Shell — `layout.tsx`, `Header`, `Footer`, `SplashScreen`

- **Header**: rebuilt as a standard professional navbar — logo left (visible on mobile too),
  links right, active link marked by an accent underline/dot, plus a proper mobile menu
  (currently there is none and the tab bar is the most theme-bound component). The `NavBox`
  arcade-tab component is removed.
- **Footer**: kept structurally (it's already neutral); token inheritance only.
- **SplashScreen**: **removed.** A 3-second black splash on every load is the opposite of the
  professional direction and delays content. Delete component + `layout.tsx` reference.

---

## Component inventory

| Component | Action |
|---|---|
| `EventCard.tsx` | Keep — restyle, de-game (no stamps/chips-in-mono); still the single shared card for grid + timeline |
| `EventModal.tsx` | Keep — restyle; keep focus management, status logic, register CTA |
| `EventsSkeleton.tsx` | Keep — drop the mono `> syncing…` line |
| `QuestBoard.tsx` | Rename → `EventGrid.tsx`, restyle |
| `TimelineContent.tsx` | Rename → `EventTimeline.tsx`, restyle |
| `FadeIn.tsx` | Keep as-is (theme-neutral, respects reduced motion) |
| `StickyFadeSection.tsx` | Remove after the About rebuild (its only consumer) |
| `Header.tsx` / `NavBox.tsx` | Rebuild header; delete `NavBox` |
| `Footer.tsx` | Keep |
| `SplashScreen.tsx` | Remove |
| `PersonCard.tsx` | Keep — used by `EventModal` for organizers/speakers; tone down the 3D-lift to a subtle hover |
| NEW `FeaturedEvent.tsx` | Spotlight card shared by Home (compact) and Events (full) |
| NEW `Countdown.tsx` | Client countdown used inside `FeaturedEvent` |
| NEW `MobileMenu` (in Header) | Mobile navigation |

## Functionality contract — must work identically after remodel

- Events fetch from `GET {NEXT_PUBLIC_API_URL}/events/` with `staticEvents` fallback on failure
  (events page, register page, and now Home).
- Status derivation: `lib/eventStatus.ts` (`getEventStatus`, `getEventSortDate`, `daysUntil`) —
  unchanged, now also consumed by Home and the featured-event picker.
- Event detail modal incl. schedule, organizers/speakers/partners, capacity, and the
  register CTA built from `hashEventId` (`lib/eventHash.ts`).
- Registration route `/event/[id]/register` resolving the hash and embedding `lumaUrl`.
- Admin event creation form POSTing to the backend; middleware cookie guard on `/admin/*`.
- Accessibility floor: global `:focus-visible` ring, `aria-current` nav, modal focus trap,
  `role="status"` loading states — all preserved. (`prefers-reduced-motion` support was
  removed July 2026 by owner decision: ease animations always run. Don't re-add the
  neutralizer block without asking.)

## Execution phases

| Phase | Scope | Outcome |
|---|---|---|
| 0 | This blueprint | direction locked |
| 1 | Theme re-base: new `theme.json` values + `brand` tokens, regenerate, purge `bg-arcade-grid`, rename `btn-menu`, shadow cleanup | whole site instantly neutral; purple/lime demoted |
| 2 | Shell: new Header + mobile menu, delete NavBox + SplashScreen, footer pass | cohesive frame on every page |
| 3 | Events: `FeaturedEvent` spotlight, `EventGrid`/`EventTimeline` renames, copy sweep, modal/skeleton restyle | latest event is the highlight |
| 4 | Home: hero + next-event spotlight + pillars + community strip | interactive landing |
| 5 | About: full editorial rebuild, remove `StickyFadeSection` | professional about page |
| 6 | Connect copy + Luma link fix, register-page polish, admin restyle, final naming/copy sweep | no stray gaming vocabulary anywhere |
| 7 | Verification: keyboard pass, reduced-motion pass, 360px→desktop responsive pass, API-down fallback pass, `npm run build` | ship |

Each phase leaves the site working — no long broken branch.

## Hover size-change motion plan (implemented)

Goal: every interactive surface visibly grows on hover and settles back on leave, tiered by
surface size so it reads as responsive, not cartoonish. Builds on the existing global easing
rule and motion tokens.

### Principles

1. **Transform-only.** All size changes via `scale()` — never animate `width`/`height`/
   `padding`/`font-size` on hover (reflow + neighbour shift). Accent hairlines that "widen"
   use `scale-x` with `origin-left` instead of width.
2. **Tiered scale amounts** — bigger surface, smaller scale:
   | Tier | Elements | Hover | Active (press) |
   |---|---|---|---|
   | Controls | buttons, chips, CTA pills, logo | `scale(1.04)` + existing lift | `scale(0.97)` |
   | Cards | pillar/open-call/connect cards, event rows | `scale(1.015)` + `z-10` + shadow | `scale(0.99)` |
   | Panels | featured-event spotlight, community strip | `scale(1.008)` | — |
   | Details | icons, arrows, timeline dots, close buttons | `scale(1.15)` or translate | — |
   | Media | photos inside cards (PersonCard) | inner image `scale(1.06)` under `overflow-hidden` | — |
3. **Inline text links never scale** (nav/footer links keep color + underline treatments;
   scaling inline text looks wobbly). Exception: the nav underline itself grows via `scale-x`.
4. **Easing:** `ease-smooth` everywhere; `ease-snap` (the unused overshoot token) reserved for
   the playful tier — pillar and open-call cards — so they pop slightly.
5. **Grid overlap:** scaled cards get `hover:z-10`; parent containers must not clip
   (`overflow-hidden` only on inner media wrappers).
6. **Reduced motion:** already neutralized by the global media block — no exceptions.

### Utility changes (`globals.css`)

- `btn-lift` (upgrade): add `scale(1.04)` to hover, `scale(0.97)` to active — every existing
  button site-wide inherits the size change with zero call-site edits.
- `card-grow` (new): `hover:scale(1.015) + z-10 + shadow-glow`, `active:scale(0.99)`,
  `ease-snap` variant via a second class or data attribute.
- `panel-grow` (new): `hover:scale(1.008)` for the two large panels.
- Media zoom stays inline Tailwind (`group` + `group-hover:scale-105 transition-transform`).

### Per-surface map

| Surface | Treatment |
|---|---|
| Header nav links | underline `scale-x` 0→1 grow; no text scale |
| Logo | `scale(1.05)` |
| Mobile menu rows | background fill + slight `translate-x` |
| Hero CTAs / all buttons | upgraded `btn-lift` (automatic) |
| Home pillar cards | `card-grow` + `ease-snap`, hairline `scale-x` widen, arrow `translate-x` |
| Featured event panel | `panel-grow` |
| Community strip / About CTA panels | `panel-grow` |
| EventCard rows | `card-grow` (keeps existing hover-expand of brief) |
| EventTimeline dots | dot `scale(1.3)` on hover |
| Open-call cards | `card-grow` + `ease-snap`; hairline widen becomes `scale-x` |
| Connect link cards | `card-grow`; CTA pill inherits `btn-lift` sizing |
| PersonCard | card `scale(1.02)` + photo `scale(1.06)` zoom |
| Modal close ✕ | `scale(1.15)` + 90° rotate |
| About program/group cards | `card-grow` |

### Execution order

1. Utilities (btn-lift upgrade, card-grow, panel-grow) — buttons change site-wide instantly.
2. Shell: nav underline grow, logo, mobile menu.
3. Home: pillars, panels.
4. Events: cards, timeline dots, open call, modal close.
5. About + Connect cards.
6. Verify: build, hover computed-transform checks in preview, reduced-motion pass.

## Iteration 2 — Events restructure + Facebook integration (July 2026)

Supersedes the "Events" page structure above (the featured spotlight moved to Home).

### Events page `app/event/page.tsx` — tabbed

Four tabs with count badges (roving-tabindex tablist, arrow-key navigation, lime underline):

1. **Ongoing** — the DEFAULT tab; empty state has a jump-to-Upcoming button.
2. **Upcoming** — soonest first; `EventGrid` shows its own empty state when nothing is scheduled.
3. **Past events** — archived `EventCard` stack, newest first.
4. **Timeline** — the consolidated summary of *all* events in `EventTimeline`: compact clickable
   rows (date · title · status chip), year separators, status-aware dots (pulsing accent =
   ongoing), and a lime **Today** line separating future from past.

Tab save-state: the selected tab is held in module scope (like `eventsCache`), so client-side
navigation away and back restores it; a full refresh resets to Ongoing (deliberate — do not
"fix" this by moving it to sessionStorage). **Game Dev Open Call** lives INSIDE the Ongoing tab
(it's a standing "now running" program) and counts +1 toward that tab's badge; deep links to
`/event#open-call` force-select the Ongoing tab and scroll to the panel.

`StatusChip` was extracted from `EventCard` into `app/components/StatusChip.tsx` and is shared
by the card and the timeline.

### Home `app/page.tsx`

"On the calendar" became **"Featured events"**: the `FeaturedEvent` spotlight plus up to two
more non-completed events as cards. The event details modal now opens on Home too (spotlight
"View details" and cards), instead of bouncing to the events page.

### Facebook integration

Two features, both designed to degrade to nothing when unconfigured:

1. **Event archives (live now, no token needed).** `Event.archive?: ArchiveItem[]`
   (`{ type: 'video' | 'post', url, caption? }`) — `url` is a public Facebook post/video
   permalink. `FacebookEmbed.tsx` renders it through Facebook's iframe plugin endpoints
   (`plugins/video.php` / `plugins/post.php`), so media plays in the event modal ("Event
   archive" section) without ever re-uploading it. Backend `EventCreate` accepts the same
   field. To archive an event: copy the post's Share > permalink into the event's `archive`.
2. **Page stats strip (built, needs a token to activate).** Backend `GET /facebook/stats`
   proxies the Graph API (followers, page likes, 28-day page views) with a 1-hour in-memory
   cache; the token stays server-side. Frontend `FacebookStats.tsx` sits in the Home community
   strip and renders nothing until the endpoint responds. Activate by setting `FB_PAGE_ID` +
   `FB_PAGE_ACCESS_TOKEN` in `backend/.env`: generate a short-lived token in Graph API
   Explorer (as the page admin, with `pages_show_list` + `pages_read_engagement` +
   `read_insights`), then run `backend/scripts/get_page_token.py <token>` — it exchanges it
   via the app credentials (`FB_APP_ID`/`FB_APP_SECRET`, already in `.env`) and prints the
   non-expiring page token lines to paste in. Note: Meta periodically deprecates Page
   Insights metrics — the endpoint tolerates partial failures and the frontend hides missing
   numbers.

## Iteration 3 — Motion pass + first live archive (July 2026)

### First Facebook archive entry

The Lua Fundamentals event now carries its trailer:
`https://www.facebook.com/61586341747138/videos/1475117197612134/` (resolved from the
`facebook.com/share/v/…` short link — **share links do NOT work in the embed plugin**; always
resolve them to the canonical permalink first by opening the link in a browser and copying the
final URL). The trailer is a Reel, so `ArchiveItem` gained `portrait?: boolean` (frontend +
backend): portrait items render in a 9:16 frame (`max-w-[360px]`), landscape videos in 16:9
(`max-w-[720px]`). Videos embed with `show_text=false` (bare player, no post chrome); posts
keep `show_text=true`.

### Entrance animations (added)

New keyframe utilities in `globals.css` — `anim-fade-in`, `anim-rise-in`, `anim-drop-in`,
`anim-swap-in` (opacity/transform only, compositor-friendly). Used by: event modal (backdrop
fade + panel rise), mobile menu (drop-in), events tab panels (swap-in, panel is keyed by tab
so switching remounts it). `SplashScreen` no longer skips itself on `prefers-reduced-motion`
(same owner decision as the CSS neutralizer removal); it still shows once per session.

### Card hover perf fix

The EventCard hover reveal used to animate `max-height`, which resized the card and shifted
every card below it mid-animation — fast cursor movement chased cards that were still moving.
The brief + location line is now **always visible** (also better on touch, where hover never
fires); hover brightens the text and fades in the "Click for full details" hint instead
(opacity/color only — no layout). `card-grow`/`panel-grow` gained `will-change: transform`,
and `card-grow` no longer animates `box-shadow` (per-frame shadow repaints stutter across
card stacks; the shadow now appears un-animated on hover).

**Cascade-layer gotcha (do not regress):** the global `a, button, …` transition rule in
`globals.css` must stay inside `@layer base`. Unlayered, it beats every Tailwind utility
(utilities live in a later layer) and silently re-adds `box-shadow` animation to cards.

## Open items

1. **Featured-event freshness**: with only one seeded event, the spotlight logic must degrade
   gracefully to a single event (no empty "upcoming" section rendering oddly).
2. **`/login` dead end** (pre-existing): `/admin` redirects to a nonexistent `/login`. Still out
   of scope, still flagged.
3. **Seed data duplication** (pre-existing): frontend `staticEvents` and backend seed are
   hand-synced copies.
4. **Light-mode variant**: deferred; requires a dark-lime token to pass contrast on white.
