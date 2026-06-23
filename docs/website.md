# Portfolio Site — Implementation Reference

Technical and structural reference for **poa-id.github.io / poa.ar**.

**Identity & philosophy:** [cube-architecture.md](./cube-architecture.md)  
**Verbatim copy export:** [content-export.md](./content-export.md)

**Repo:** `poa-id.github.io`  
**Stack:** Next.js 15 (App Router), React 19, Tailwind CSS 4, static export  
**Deploy:** GitHub Pages via `.github/workflows/nextjs.yml` → `/out`

---

## 1. What this is

A personal domain with a professional facade. Portfolio for recruiters/clients; spatial house metaphor for discovery.

Six **cube faces** are routable rooms. **The Deep** is a hidden layer (not a seventh face). A **house map** replaces the old die navigator as the primary spatial artifact.

**Portfolio first. Discovery second.** Nothing is gated.

---

## 2. Site map

### Top navigation (professional facade)

On Home and facade pages (`/about`, `/work`, `/art`, `/now`):

| Link   | Route     |
|--------|-----------|
| Logo   | `/`       |
| About  | `/about`  |
| Work   | `/work`   |
| Art    | `/art`    |
| Now    | `/now`    |
| Theme  | toggle    |

Scriptorium is **not** in top nav.

### All routes

| Route                 | Status | Notes                                      |
|-----------------------|--------|--------------------------------------------|
| `/`                   | Live   | The Hall — split layout + ambient video    |
| `/about`              | Live   | Facade                                     |
| `/work`               | Live   | Facade                                     |
| `/art`                | Live   | Facade                                     |
| `/now`                | Live   | Facade                                     |
| `/correspondence`     | Live   | Mailbox — not a cube face                  |
| `/writing`            | Live   | Redirects to newest post                   |
| `/writing/[slug]`     | Live   | Markdown from `content/writing/`           |
| `/garden`             | Stub   | Garden face                                |
| `/forge`              | Stub   | Forge face + Deep descent link             |
| `/shelf`              | Partial| Shelf face — reading lists populated       |
| `/hearth`             | Stub   | Hearth face                                |
| `/mines`              | Live   | The Deep teaser (URL legacy name)          |

---

## 3. Navigation topology

### From Home (The Hall)

| Edge        | Label        | Route      | Component              |
|-------------|--------------|------------|------------------------|
| Left        | Scriptorium  | `/writing` | `WritingEntryEdge`     |
| Right       | The Garden   | `/garden`  | `GardenEntryEdge`      |
| Top         | Shelf        | `/shelf`   | `ShelfEntryEdge`       |
| Bottom      | Hearth       | `/hearth`  | `HearthEntryEdge`      |
| Bottom-right| Correspondence | `/correspondence` | `ContactButtons` |

**No** bottom “The Deep” tab from Home. **No** Forge edge from Home (mobile inline link only).

Ambient videos on Home right panel:
- Light: forest, snow, water
- Dark: campfire, moto

Map removed from homepage carousel — lives in global house map only.

### Cube face connections

| From          | Edge tab                         | To           |
|---------------|----------------------------------|--------------|
| Scriptorium   | Home → (right)                   | `/`          |
| Garden        | ← The Hall (left)                | `/`          |
| Garden        | → Forge (right)                  | `/forge`     |
| Forge         | ← The Garden (left)              | `/garden`    |
| Forge         | Dwarf helmet (inline)            | `/mines`     |
| Shelf         | ↓ The Hall (bottom)              | `/`          |
| Hearth        | ↑ The Hall (top)                 | `/`          |
| The Deep      | ↑ The Hall (top, certh icon)     | `/`          |

**Forge has no Hall return edge** — intentional disconnect.

---

## 4. Layout patterns by face

| Face        | Layout                          | Shell              |
|-------------|---------------------------------|--------------------|
| Home/facade | 50/50 split (nav + content \| video panel) | inline in pages |
| Scriptorium | 20/80 sidebar \| article        | `writing-shell`    |
| Garden      | 80/20 content \| nav (mirrored) | `garden-shell`     |
| Shelf       | 10/90 strip top \| content      | `shelf-shell`      |
| Hearth      | 90/10 content \| strip bottom   | `hearth-shell`     |
| Forge       | Centered stub                   | `cube-face-shell`  |
| The Deep    | Centered teaser, mines palette  | inline             |

Each themed face has its own palette in `src/lib/cube-face-themes.ts`.

---

## 5. House map (Surveyor’s Notes)

**Component:** `HouseMapNav` — fixed bottom-left scroll button, opens centered modal.

**Map grid:** `src/lib/hall-cube-map.ts` — 8×5 cells, `3.25rem` rooms, `gap-1`.

**Floor plan geography:**
- Center spine (col 3): Shelf → Hall → Hearth
- Horizontal row: Scriptorium — (double corridor) — Hall — Garden — Forge
- Deep descends from Forge (col 7), not Hearth

**Fog of war:** Only The Hall known initially. Other rooms show `???` until visited. Deep appears after `unlockDeepMap()` (Forge descent click).

**Modal layout:**
- Left/center: interactive floor plan
- Right sidebar: marginalia for hovered/selected room + Relics tray
- Die relic (after `found_dice`): stats popup in relics corner

**Scroll icons:** `public/images/map-scroll-closed.png` / `map-scroll-open.png` — masked SVG, `currentColor` theming.

---

## 6. Gamification layer

**Shell:** `GamificationShell` wraps app — `GamificationProvider`, `AchievementToast`, `HouseMapNav`.

**Storage:** `localStorage` key `poa-portfolio-gamification`

**State:** `visitedFaces`, `deepMapUnlocked`, achievements, theme/video tracking.

**Toast:** bottom-right, title only, ~3.5s dismiss.

### Achievements (`src/lib/achievements.ts`)

| ID | Title | Secret |
|----|-------|--------|
| face_front | At the Hall | |
| face_left | Into the Scriptorium | |
| face_right | Into the Garden | |
| face_back | Through the Forge | |
| face_top | At the Hearth | *unlocks on Shelf visit* |
| face_bottom | At the Shelf | *unlocks on Hearth visit* |
| face_down | Going Down | |
| found_dice | Roll for Initiative | ✓ |
| cube_explorer | Cube Explorer | |
| cube_complete | Full Rotation | |
| deep_delve | Deep Delve | ✓ |
| deep_map_found | Charted the Descent | ✓ |
| theme_lightswitch | Lightswitch | |
| theme_wanderer | Light and Dark | |
| theme_flipper_5 | Flickering Light | |
| theme_flipper_10 | Dimmer Switch Devotee | |
| theme_flipper_50 | Lord of Lumen | ✓ |
| theme_both_worlds | Both Worlds | |
| video_* | Various ambient video milestones | |

Reset for testing: `localStorage.removeItem("poa-portfolio-gamification"); location.reload()`

---

## 7. Design system

| Role         | Font             | Variable             |
|--------------|------------------|----------------------|
| Display      | Disket Mono      | `--font-disket`      |
| Display bold | Disket Mono Bold | `--font-disket-bold` |
| Body         | Montserrat       | `--font-montserrat`  |

Theme: `next-themes`, default **light**. Edge tabs: solid bg, chevron + vertical label.

Deep/mines palette: `#0a0908`, `#c4a882`, `#2a2218`.

---

## 8. Content sources

| Content type      | Location                          |
|-------------------|-----------------------------------|
| Scriptorium posts | `content/writing/*.md`            |
| Cube face stubs   | `src/lib/cube-face-content.ts`    |
| Garden sections   | `src/lib/garden-content.ts`       |
| Hearth sections   | `src/lib/hearth-content.ts`       |
| Shelf lists       | `src/lib/shelf-content.ts`        |
| Map annotations   | `src/lib/hall-cube-map.ts`        |
| Page copy (facade)| inline in `src/app/*/page.tsx`    |

---

## 9. Project structure

```
docs/
  README.md
  cube-architecture.md
  website.md
  content-export.md

content/writing/

public/images/
  map-scroll-closed.png / .svg
  map-scroll-open.png / .svg
  dwarf-helmet.png
  certh-43.png

src/
  app/                   # Routes
  components/
    house-map-nav.tsx
    hall-cube-map.tsx
    cube-edge-tabs.tsx
    *-shell.tsx
  contexts/gamification-provider.tsx
  lib/
    cube-faces.ts
    hall-cube-map.ts
    achievements.ts
    posts.ts
    cube-face-content.ts
    shelf-content.ts
    garden-content.ts
    hearth-content.ts
```

---

## 10. Development

```bash
npm install
npm run dev      # next dev --turbopack
npm run build    # static export → /out
```

If dev/build conflict: `rm -rf .next && npm run dev`

---

## 11. Open work

| Area           | Notes                                           |
|----------------|-------------------------------------------------|
| Garden         | Populate section content beyond stubs           |
| Forge          | Real experiments/builds content                 |
| Hearth         | Populate embodied-life writing                  |
| Scriptorium    | More posts beyond pipeline test                 |
| The Deep       | Link playable build when ready                  |
| Correspondence | RSS, guestbook if it feels right                |
| Achievements   | face_top / face_bottom titles may need swap     |

---

## 12. Principles

1. **Portfolio first** — recruiters must land and understand immediately.
2. **Discovery, not obstruction** — map and achievements never gate content.
3. **Map, not puzzle** — six expressions of one person.
4. **Place first** — connected rooms, not a platform.
5. **Living docs** — update docs when decisions change.

---

*Last updated: June 2026.*
