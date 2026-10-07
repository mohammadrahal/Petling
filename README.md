# Petling

A voice-first learning app for children aged 3 to 8. A companion asks a question
out loud, the child answers out loud, and the companion grows as they practise.
Questions come in English and Modern Standard Arabic.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v3.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
```

```bash
npm run build && npm run start   # production
npm run lint
```

Speaking uses the browser's own Web Speech API, so it works in Chrome, Edge and
Safari. Firefox has no `SpeechRecognition`, and the app says so and falls back to
tappable answers rather than failing quietly.

## What is real and what is not

There is no backend. Being clear about the line matters, because a few screens
would otherwise look like they are reporting a real child's progress:

| Area | State |
|---|---|
| Speech recognition and speech synthesis | Real, via the browser |
| Choosing a companion | Real, kept in `localStorage` |
| Daily limit, language and email preferences | Real, kept in `localStorage` |
| Answer grading, berries, stars within a session | Real, computed client-side |
| Streaks, word totals, weekly chart, badges | **Sample data.** Each screen says so on the page |
| `POST /api/contact` | Validates and accepts, but no mail provider is wired, so it reports `delivered: false` |
| Plan checkout | Not connected. The button says so instead of claiming success |

## Routes

Everything except `/talk` renders inside the `(site)` route group, which supplies
the header and footer. `/talk` sits outside it so it can run full-screen.

| Route | For | What it does |
|---|---|---|
| `/` | Parents arriving | What the app is, shown as one real exchange |
| `/choose` | Children | Pick a companion, hear them in either language |
| `/dashboard` | Children | The companion's state, feeding, today's three tasks |
| `/talk` | Children | The session itself: ask, answer, grade, grow |
| `/about` | Parents | How a session works, and what is and isn't collected |
| `/profile` | Parents | Progress, and the daily limit and language controls |
| `/upgrade` | Parents | Free and Family plans compared |
| `/contact` | Parents | Support form and the questions parents actually ask |

## Layout

```text
src/
├── app/
│   ├── layout.tsx            # fonts, metadata; no site chrome
│   ├── globals.css           # base layer, the .press device, reduced motion
│   ├── (site)/
│   │   ├── layout.tsx        # header + footer
│   │   └── …                 # the seven site routes
│   ├── talk/page.tsx         # full-screen session
│   └── api/contact/route.ts  # server-side validation
├── components/
│   ├── Navbar.tsx            # split by audience: children, then parents
│   ├── Footer.tsx
│   ├── ParentNav.tsx         # sub-nav for the four parent pages
│   ├── CompanionStage.tsx    # the lit disc a companion stands in
│   ├── SubjectIcon.tsx       # subject → icon
│   └── Icons.tsx             # 27 icons, one grid, one stroke weight
└── lib/
    ├── companions.ts         # the six companions (server-safe)
    ├── companion-store.ts    # the stored selection and settings
    └── store.ts              # localStorage via useSyncExternalStore
```

## Design system

The rules are short enough to keep in your head, and they are what stop the UI
drifting back into a pile of identical rounded cards.

**Colour carries a role, never decoration.** Six families in
`tailwind.config.ts`:

| Token | Means |
|---|---|
| `coral` | Act on this. Buttons, the mic, the one thing to press |
| `sun` | Alive. The light a companion sits in; rewards |
| `leaf` | Progress. Done, correct, growing |
| `berry` | Spend or take care. Treats, and warnings for parents |
| `ink` / `ink-soft` | All type. One colour at two strengths |
| `shell` / `clay` | The two grounds: `shell` reads, `clay` plays |

Companions have no colour of their own on purpose. Six identity colours would
leave colour meaning nothing, so they are told apart by their portrait and their
subject.

Text on a `coral` fill is `ink`, not white — 4.99:1 against 3.05:1 — which also
lets the coral stay bright instead of darkening to carry white text. The chart on
`/profile` uses `leaf-mark`, a step apart from `leaf`, because a chart fill and a
text colour answer to different checks: one needs chroma, the other contrast.

**Type.** `Baloo Bhaijaan 2` for display, because it covers Latin *and* Arabic,
so a bilingual line keeps one voice; `Lexend` for body, which was drawn to
improve reading proficiency in young readers. Both self-hosted through
`next/font`. Weight carries information: display 800, heading 700, emphasis 600,
body 400.

**Shadow means pressable.** There is one shadow in the app — the hard offset in
the `.press` class — and it appears only under things you can press. Content
regions are separated by hairline rules and ground colour, not by floating boxes.

**Icons are drawn, never emoji.** Emoji render differently per platform, carry no
stroke relationship to the type, and are announced by screen readers as their
CLDR name. `Icons.tsx` holds the set.

**Motion.** Only the companion moves without being asked, and only as a slow
breath. Everything else moves in response to a person, and
`prefers-reduced-motion` is respected.

## Accessibility

Skip link; one focus ring; labelled form controls with server-matched validation
and errors tied via `aria-describedby`; `aria-live` for answers, feeding and form
results; the weekly chart has a table view; `lang="ar"` on every Arabic string so
it is announced in the right language. Text meets WCAG AA at its size.

## Not wired up

- `public/assets/` — 18 unreferenced PNGs from the original generation pass,
  still publicly served. `public/characters/` holds the nine images actually used.
- `stitch_html/`, `stitch_screens.json` — the design-tool export the first pass
  was built from. Kept as reference; nothing imports them.

## Licence

MIT.
