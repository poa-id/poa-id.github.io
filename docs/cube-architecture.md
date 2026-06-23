# POA.AR — Cube Architecture & Identity

Living document. Update when decisions change — this should reflect current truth, not a frozen plan.

See also: [website.md](./website.md) for routes and implementation · [content-export.md](./content-export.md) for verbatim page copy.

---

## Core Idea

This is not primarily a portfolio.

It is a personal domain with a professional facade.

The portfolio exists because recruiters and clients need a portfolio. The site exists because I want a place on the internet that genuinely reflects who I am and what I care about.

The goal is not to maximize engagement, build an audience, or create a content funnel.

The goal is to build a coherent place.

Visitors should be able to arrive for professional reasons and, if they choose, discover deeper layers of the person behind the work.

---

## Design Philosophy

**Portfolio first. Discovery second.**

The site must remain immediately usable for recruiters, hiring managers, and clients.

However, curiosity should be rewarded.

The house map, achievements, hidden descent, writing, and The Deep are mechanisms of discovery — not obstacles.

Nothing gates content. Nothing requires gamification.

The cube is a **map**, not a puzzle.

---

## The Cube (six faces)

Six visible faces = six dimensions of a life. Each face is a **place**, an **archetype**, and a **question**.

| Room        | Archetype       | Question                              |
| ----------- | --------------- | ------------------------------------- |
| The Hall    | —               | Where am I?                           |
| Scriptorium | The Thinker     | What do I think?                      |
| Garden      | The Steward     | What am I cultivating?                |
| Forge       | The Builder     | What am I building?                   |
| Shelf       | The Learner     | What is shaping me?                   |
| Hearth      | The Householder | What am I building a life around?      |
| The Deep    | The Dreamer     | What am I dreaming about? *(hidden)*  |

**Source of truth (copy):** `src/lib/room-content.ts`

**Source of truth (code):** `src/lib/cube-faces.ts`

### The Deep (hidden layer — not a cube face)

The Deep is **not** die face VII. It is a hidden layer beneath the Forge.

| Place     | Archetype    | Inscription                     | Route     | Access                          |
|-----------|--------------|---------------------------------|-----------|---------------------------------|
| The Deep  | The Dreamer  | What keeps the lantern burning. | `/mines`  | Dwarf helmet on Forge; map descent |

The house map charts The Deep only after discovery (`deepMapUnlocked`). The descent appears below Forge on the floor plan, not below Hearth.

**Note:** *The Hearth & The Deep* is the game title — it references the in-game hearth mechanic and the Deep’s mythic register. The Hearth **cube face** (The Householder) is a different layer.

---

## Professional facade (not cube faces)

Top nav on Home and facade pages: **About · Work · Art · Now · Theme**

| Route              | Purpose                                      |
|--------------------|----------------------------------------------|
| `/about`           | Bio, values, CV download                     |
| `/work`            | Case studies / professional work             |
| `/art`             | Illustration, tattoos, flash, digital work   |
| `/now`             | nownownow-style snapshot                     |
| `/correspondence`  | Mailbox outside the house (not a cube face)|

Scriptorium is **not** in the top nav — reached laterally from Home.

---

## Face Definitions

### I — Home · The Hall

**Inscription:** *Where all paths meet.*

The entrance. Where professional identity and every other face intersect. Most accessible face. Recruiters land here and should understand immediately who Pedro is professionally.

---

### II — Scriptorium · The Thinker

**Inscription:** *Thoughts worth keeping.*

Writing. Essays. Reflections. Ideas worth preserving — not content marketing, not SEO. A modern scriptorium.

---

### III — The Garden · The Steward

**Inscription:** *What is tended grows.*

Cultivation rather than production. Practices that shape a person over time: gardening, bonsai, training, trades, craftsmanship, stewardship.

A forge changes metal through heat. A garden changes living things through care.

---

### IV — Forge · The Builder

**Inscription:** *Ideas tested against reality.*

Creation, experimentation, prototyping. Software, AI, products, interactive systems. Where ideas become tangible.

**Navigation note:** Forge does **not** connect back to The Hall via edge tabs. Return path is through The Garden. The Deep descends from here (dwarf helmet icon).

---

### V — Shelf · The Learner

**Inscription:** *The things that feed the work.*

Books, influences, references, marginalia — what shapes the other rooms. Partially populated (reading lists, foundations, quotes).

**Secret:** A faint die relic hides on the Shelf header. Finding it unlocks the Surveyor’s Die in the house map relics tray.

---

### VI — Hearth · The Householder

**Inscription:** *A life built close to the ground.*

The human center: family, home, meals, routine, embodied life. Stub sections exist; content not yet populated.

---

### The Deep · The Dreamer (hidden)

**Inscription:** *What keeps the lantern burning.*

Imagination, wonder, myth. Home of *The Hearth & The Deep* — a solitary idle game in progress. Teaser at `/mines`; no playable build yet.

---

## Community & Visitors

Community is not a cube face. Visitors walk through the map; they are not on it.

**Correspondence** (`/correspondence`) is a mailbox outside the house — email, LinkedIn, eventually RSS. Not a newsletter funnel.

The Now page’s “The Guild” section describes personal software tools Pedro builds — not a community face on the cube.

---

## Desired Feeling

Less portfolio platform, more connected rooms.

A visitor should gradually discover: a designer, a writer, a steward, a builder, a learner, a householder, a dreamer — six expressions of one person.

Final impression: *This feels like a real human being.*

---

*Last updated: June 2026.*
