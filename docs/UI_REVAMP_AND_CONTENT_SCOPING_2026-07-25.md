# Spectrum SAS — UI Revamp & Content Reorganization Scoping

Date: 2026-07-25
Stage: Scoping / makeover analysis
Branch: `claude/ui-revamp-content-org-s402d7`

---

## 1. Context — why this work

The app is asked to feel **more professional and clearly Spectrum-branded**, to carry the **flashcard autoplay voice into the lessons**, and to **separate content into properly defined decks** — specifically so that *HR / onboarding* (benefits and the like) is its own deck you can step into, the *corpus* that has been ingested is browsable, and *packages / plans* have a home of their own.

This document inspects the current app end to end and scopes the makeover into four workstreams with concrete files, APIs, sequencing, verification, and risks. **No code is changed here** — this is the plan of record before implementation.

### Naming caveat (important)
The repo directory is `tish-s-phlebotomy-pal`, but there is **no phlebotomy content**. This is **Spectrum SAS — "Sales Agent Sidekick,"** a training/study app for Spectrum inbound sales agents (Internet / TV / Mobile / Voice). "Lessons" in this doc means the training/curriculum content, not clinical content. The only blood/phlebotomy residue is two unused theme tokens (`--color-blood`, `.bg-gradient-blood` in `src/styles.css`), which we will retire.

---

## 2. Current-state analysis

### 2.1 Stack
- **React 19 + TanStack Start** (SSR) + **TanStack Router** (file-based routes in `src/routes/`), React Query, deployed to Cloudflare.
- **Vite 7**, Lovable.dev config wrapper. TypeScript strict, ESLint + Prettier.
- **Tailwind CSS v4, CSS-only theme** — no `tailwind.config.js`; all tokens live in `src/styles.css` via `@theme inline`.
- **shadcn/ui** (~47 primitives in `src/components/ui/`) on Radix, `lucide-react` icons, `sonner` toasts.
- **Supabase is auth-only** (`src/integrations/supabase/types.ts` schema is empty). **All content is hardcoded TypeScript** in `src/data/` (~8,000 lines across 23 files). Only user *progress* persists, via `localStorage` (`src/lib/tutorMemory.ts`). **No backend migrations are ever required for this work.**

### 2.2 Information architecture (today)
Sidebar (`src/components/AppSidebar.tsx`) groups routes as **Today / Live Call / Practice / Learn / My Stuff**. 19 routes exist. The relevant ones:

| Area | Routes |
|---|---|
| Learn | `/curriculum`, `/curriculum/$moduleId`, `/prompt-academy`, `/full-spectrum`, `/tips` |
| Practice | `/flashcards`, `/across-spectrum`, `/scenarios` |
| Live Call | `/lookup`, `/sales-prompts`, `/tutor` |
| My Stuff | `/my-stuff`, `/bulletin`, `/company-walkthrough`, `/plan`, `/setup`, `/corner` |

The **four target groupings the user wants do not exist as first-class destinations today**:
- **Course Training** — exists as one flat `MODULES` list, but HR is mixed in.
- **HR / Onboarding** — scattered: curriculum **Module 6 "Employee Benefits, Spark & Incentives"** (tag `Onboarding`), flashcards tagged `Benefits`/`Spark`/`My Setup`, plus `/setup` (PID, E-Verify) and `src/data/workSetup.ts`. No single home.
- **Corpus** — real and substantial (`src/data/knowledgeCorpus.ts`, 34 `KnowledgeRecord`s with sources + verification) but only surfaced *inside* `/lookup` and the offer engine. **No browse page.**
- **Packages & Plans** — product tiers live inside the corpus (`plan`/`speed` fields) and `src/data/acrossSpectrumOffers.ts`. **No dedicated page.**

### 2.3 Branding (today)
Already a coherent dark, Spectrum-blue system, documented in `docs/UI_AESTHETIC_SYSTEM_2026-07-12.md`. Tokens in `src/styles.css`:
- Canvas `#061728`, foreground `#f7fafc`, **primary (Spectrum blue) `#0073d1`**, **focus cyan `#00a8e0`**, success/warning/info/destructive semantic tokens, three surface levels, custom shadows/glow, radius `0.875rem`.
- Typography: **Inter** + system stack, tight tracking on headings.
- **Weak spots:** brand mark is a bare **☎️ emoji** in a gradient tile (no logo/wordmark, no `public/` dir); home and inner pages have inconsistent header treatments; several pages present more than one equally-dominant primary action (against the design doc's own acceptance criteria); no light-surface "document" affordance for dense reference reading.

### 2.4 The autoplay voice (today)
All TTS is the browser **Web Speech API**, funneled through one wrapper: `src/lib/speak.ts` (`speak`, `speakAndWait`, `stopSpeaking`, plus voice selection with preference tokens + deterministic fallback). It is SSR-safe (window guards) and enforces a single active utterance app-wide.

**Three consumers each re-implement their own loop** — this is the duplication to collapse:
1. `src/routes/flashcards.tsx` → `FlipDeck` (~L161–215): the **polished** loop — *Question → 400 ms → flip → Answer → 800 ms → advance*, `cancelled` flag + cleanup, rate select (85/100/115/130 %), `aria-live` status line, one-shot "Read card," unmount safety.
2. `src/routes/curriculum.$moduleId.tsx` → `playFrom` (~L50–82): a **rougher but working** lesson autoplay (reads title + why + body + tips, scrolls into view, `cancelRef`).
3. `src/routes/prompt-academy.tsx` "Lessons" tab: **no per-lesson autoplay at all** — only a whole-page `PageReader` reading a fixed summary string. **This is the real gap.**

There is a related component `src/components/PageReader.tsx` (chunked read of a DOM element/text, used by prompt-academy / full-spectrum / across-spectrum). No shared *hook* exists — every loop is bespoke.

---

## 3. Makeover scope — four workstreams

### WS1 — Unified autoplay voice (the "flashcard voice, everywhere")

**Goal:** one reader engine, the flashcard-quality cadence, applied to every lessons surface, with remembered speed/voice.

**Create `src/hooks/useReaderPlaylist.ts`** — a headless hook that both flashcards and lessons drive:

```ts
type ReaderItem = { id: string; segments: string[] };      // e.g. flashcard = [question, answer]
type UseReaderOptions = {
  segmentPauseMs?: number;   // between segments of one item (default 400)
  itemPauseMs?: number;      // between items (default 800)
  endBehavior?: "loop" | "stop";  // at the last item: "loop" wraps to the first (flashcards' `(x+1) % length`), "stop" halts and announces completion (curriculum/academy). Default "stop"; flashcards passes "loop". The reader test must cover BOTH.
  onSegment?: (itemId: string, segmentIndex: number) => void;  // flip/scroll/highlight hook
  onActiveChange?: (itemId: string | null) => void;
};
type UseReaderResult = {
  isPlaying: boolean;
  isPaused: boolean;         // paused mid-playlist with activeId/activeSegment retained (distinct from stopped)
  activeId: string | null;
  activeSegment: number;
  audioMessage: string;      // aria-live text, preserves existing error/permission copy
  ratePercent: number;
  setRatePercent: (n: number) => void;
  preferredVoiceToken?: string;              // the remembered voice preference the hook forwards to speakAndWait as preferredVoiceTokens
  setPreferredVoiceToken: (token?: string) => void;   // backs the optional voice picker; persisted alongside ratePercent
  play: (fromIndex?: number) => void;   // start from an index (default 0)
  pause: () => void;         // halt playback but retain activeId/activeSegment so ReaderControls' Pause can resume — distinct from stop
  resume: () => void;        // continue from the paused item/segment (Pause/Resume is the flashcards Autoplay toggle's real contract)
  skip: () => void;          // advance to next item mid-playback (cancels only the current utterance; playback continues) — preserves curriculum's existing Skip
  stop: () => void;          // terminate the whole playlist and clear active state
  readOne: (itemId: string, segmentIndex?: number) => void;   // one-shot, non-advancing; segmentIndex selects the visible segment (flashcard: question when unflipped, answer when flipped) so FlipDeck.readCard's behavior is preserved
};
function useReaderPlaylist(items: ReaderItem[], opts?: UseReaderOptions): UseReaderResult;
```

- Internally reuses `speakAndWait`/`stopSpeaking`; preserves the exact cancellation + "audio could not start / check TTS permissions" semantics already in flashcards.
- `onSegment` is how each surface expresses its own behavior: **flashcards** flip the card between segment 0→1; **lessons** scroll the active card into view and ring-highlight it.
- Persist `ratePercent` and a preferred voice token to `localStorage` (reuse the `tutorMemory.ts` pattern) so the setting is remembered across sessions and surfaces.

**Create `src/components/ReaderControls.tsx`** — the shared control cluster (Autoplay/Pause, Stop/Skip, one-shot Read, rate `<select>`, `aria-live` status), so all three surfaces look and behave identically.

**Refactor the three consumers onto the hook:**
- `flashcards.tsx` `FlipDeck` → items = `[{id, segments:[`Question. ${front}`, `Answer. ${answerWithSource}`]}]`, `onSegment` flips.
- `curriculum.$moduleId.tsx` → items = lessons, segments = `[`${title}. Why it matters: ${why}. ${body}${tips}`]`, `onSegment` scrolls + highlights. Removes the bespoke `playFrom`.
- `prompt-academy.tsx` Lessons tab → **new**: items built from **`filteredLessons`** (the level-filtered list actually rendered, `prompt-academy.tsx:122`), *not* all `ACADEMY_LESSONS` — otherwise autoplay walks through hidden lessons with no visible card to scroll to/highlight. Segments built from `title / plainEnglish / objective / spectrumExample / exercise`; add per-lesson ▶ and the shared controls. **Reset/stop playback when `selectedLevel` changes** (re-key the hook on the filter). Closes the gap.

**Risk/guardrails:** keep all `window`/`speechSynthesis` guards (SSR); keep single-active-utterance invariant. **Update the existing UX gate as part of WS1:** `scripts/test-mobile-ux.py:57-63` asserts the literal strings `speakAndWait`, `questionResult`, and `answerResult` *inside* `src/routes/flashcards.tsx` — the exact internals this refactor removes — so `npm run test:ux` (part of `check`) would fail on a correct implementation. Re-point those assertions at the new surface: verify `useReaderPlaylist` / `ReaderControls` usage and the preserved user-facing markers (`Read card`, `Audio could not start`) rather than the loop internals. Do the same for any `speak.ts` markers that move. Note the existing `scripts/test-speech.mjs` only transpiles `src/lib/speak.ts` and asserts wrapper outcomes (`ended`/`error`/`unsupported`/cancel) — it does **not** exercise the hook's sequencing, pauses, `onSegment` callbacks, item advancement, or cleanup. **WS1 must add hook-level coverage** (a new `scripts/test-reader-playlist.mjs`, or a component/unit test) with `speakAndWait` mocked, so a broken playlist can't pass green. Expose it as a new npm script (e.g. `test:reader`) **and add it to the composite `check` script** (`package.json:18`, currently `audit && audit:decks && test:ux && test:speech && typecheck && build`) so CI/the single gate actually exercises the hook. `test:speech` alone is not the WS1 gate.

### WS2 — Content reorganization into four tracks

**Goal:** make Course Training, HR / Onboarding, Corpus, and Packages & Plans first-class, separately navigable destinations.

**Data model — add a `track` to modules** (`src/data/curriculum.ts`):
```ts
export type ModuleTrack = "course" | "hr-onboarding";
export type Module = { /* …existing… */ track?: ModuleTrack };  // default "course"
```
Tag the HR modules `track: "hr-onboarding"`; everything else stays `"course"`. Two modules qualify today: **Module 6 "Employee Benefits, Spark & Incentives"** (base curriculum) and **Module 14 "Benefits, Support & Learning Accommodations"** (tag `Employee support`, in `otterCurriculum20260712.ts`). Both must be tagged, or the HR hub silently omits Module 14. `fullCurriculum.ts` still merges base + Otter modules. This cleanly splits HR out **without moving content between files**.

**Course Training** — `curriculum.index.tsx` filters `MODULES` to `track !== "hr-onboarding"`; page reframed as "Course Training." The module **detail** route (`curriculum.$moduleId.tsx`) keeps the WS1 voice but its **"All modules" backlink must become track-aware** (`curriculum.$moduleId.tsx:108-113`): it currently hardcodes a link to `/curriculum`, so opening an HR module (6 or 14) from the HR hub and tapping "All modules" would land the user on a list that no longer contains that module. Point tagged HR modules back to `/hr-onboarding` (derive from `mod.track`), everything else to `/curriculum`.

**HR / Onboarding — new hub `src/routes/hr-onboarding.tsx`** that pulls the HR module(s), the HR/benefits/Spark/`My Setup` flashcard subset, and links to `/setup`. Add an **HR flashcard family**:
- extend `FlashcardDeckDefinition.family` union with `"HR & Onboarding"` and add deck id(s) in `FLASHCARD_DECKS` (`src/data/flashcardDeck.ts`);
- **also update the hard-coded family tuple in `src/routes/flashcards.tsx:77`** — the deck selector renders `<optgroup>`s from a literal `["Final exam", "Article study", "Optional mastery"]`, so a new `"HR & Onboarding"` family stays invisible until it's added there (and mirrored on the new HR hub);
- add a `getDeckCards` branch for the HR deck driven by an **explicit HR category allowlist**, *not* by module number. Module number is not a reliable HR signal at the card level: module 6 also contains `Affordability` cards (Internet Assist, ACP — product, not HR: `flashcardDeck.ts:70-80`), and every `My Setup` card is `module: 5` (`flashcardDeck.ts:126-149`). So filtering by module 6/14 would both pull in product cards and drop the requested `My Setup` subset. The correct predicate matches these categories: `Benefits`, `Employee Perks`, `Spark`, `My Setup`, `Employee Support` (EAP/pay-schedule, `otter12-086..089`), and `Study Accommodation` (`otter12-090..092`) — while **excluding** `Affordability`. This intentionally makes the flashcard split (category-driven) independent of the curriculum `track` split (module-driven), because module→HR is clean for lessons but not for cards. Membership is *computed*, so no per-card edits. (If categories prove too brittle later, add an explicit card-level HR `deckTag` — but the allowlist covers today's data.)

**Corpus — new browse route `src/routes/corpus.tsx`** rendering `KNOWLEDGE_CORPUS` grouped by `category` (Internet / Mobile / Mobile Devices / Mobile Protection / WiFi / Voice / …), each record showing summary, services, requirements, `verification` badge, and `CORPUS_SOURCES` provenance. Reuses `surface-panel` / `card-elevated` / `eyebrow` utilities and the existing verification-badge visual language. This finally gives the ingested corpus a home outside Quick Lookup. (Source-queue / ingestion status already lives in `/flashcards` and `/corner` and can cross-link.)

**Packages & Plans — new route `src/routes/packages.tsx`** presenting the product-tier subset of `KNOWLEDGE_CORPUS` (records with `plan`/`speed`) as clean comparison cards per service line. **Scope note:** the corpus only covers **Internet, Mobile (incl. devices/protection), WiFi, and Voice** — there is **no TV-category corpus record**, and `acrossSpectrumOffers.ts` builds only Internet/Mobile/WiFi lanes. TV package study content currently lives in the **`tv` flashcard deck** (`flashcardDeck.ts` `SERVICE_PATTERNS.tv`), not the corpus. So the page renders the four corpus-backed lines, and TV is either (a) surfaced via a cross-link to the `tv` deck, or (b) added later once a TV-package record is ingested into the corpus — it is **not** promised as a corpus-driven comparison here. Reuses the offer/lane framing from `acrossSpectrumOffers.ts` where useful. Study-oriented (no pricing/checkout — there is no billing system, and none is added).

**Navigation restructure** (`AppSidebar.tsx` + `__root.tsx` `routeContext` + `MobileDock`):
- Introduce a **"Training" group** with the four destinations front and center: **Course Training** (`/curriculum`), **HR & Onboarding** (`/hr-onboarding`), **Corpus** (`/corpus`), **Packages & Plans** (`/packages`).
- Keep Live Call / Practice / My Stuff; fold `Study Plan`, `Setup`, `Weekly Ledger` appropriately (Setup cross-linked from HR).
- Update the 5-slot `MobileDock` and the `routeContext` label map for the new routes.

**Risk:** `src/routeTree.gen.ts` is generated — new route files require regenerating it (the router plugin does this on `vite dev`/`build`; the plan's verification step covers it).

### WS3 — Professional Spectrum-branded polish

**Goal:** elevate the existing dark Spectrum-blue system (keep it — it's already on-brand) to a more finished, professional feel. Executes the "Next visual passes (A–D)" already outlined in `docs/UI_AESTHETIC_SYSTEM_2026-07-12.md`.

- **Real brand mark:** replace the ☎️ emoji in `AppSidebar.tsx` with an **inline SVG Spectrum-style wordmark/monogram** ("Spectrum SAS") — no asset pipeline needed (SVG in the component). Apply consistently to the sidebar header, favicon-equivalent meta, and 404/error surfaces.
- **Consistent page header primitive:** a small `PageHeader` (eyebrow + title + optional primary action) so every route shares the same rhythm and honors "one dominant primary action per viewport."
- **Home realignment** (`src/routes/index.tsx`): reframe the three workspace cards to foreground the four training tracks; keep Quick Lookup / Call Practice as the two hero actions; align copy to the four-track vocabulary.
- **Token hygiene:** retire unused `--color-blood` / `.bg-gradient-blood`; verify semantic tokens (success/warning/info/destructive) are used consistently for verification states across the new Corpus/Packages pages.
- **Motion & density:** keep to the design doc — glow only on active/primary, soft broad shadows, reduced-motion respected.

### WS4 — Home dashboard as the four-track front door
Covered jointly by WS2 (routes/nav) and WS3 (visual). The home "More when you need it" and workspace cards become the launchpad to Course Training / HR / Corpus / Packages, so the separation the user asked for is felt immediately on landing.

---

## 4. Sequencing

1. **WS1 foundation** — `useReaderPlaylist` + `ReaderControls`; refactor flashcards (proves parity), then curriculum, then add prompt-academy lessons. *Self-contained, low risk, immediately visible.*
2. **WS2 data** — `Module.track`, HR flashcard family + `getDeckCards` branch. *No UI yet; typecheck-clean.*
3. **WS2 routes** — `corpus.tsx`, `packages.tsx`, `hr-onboarding.tsx`; regenerate route tree.
4. **WS2 nav** — sidebar groups, `routeContext`, mobile dock.
5. **WS3 branding** — brand mark, `PageHeader`, home realignment, token cleanup.
6. **Docs** — update `UI_AESTHETIC_SYSTEM` "next passes" as completed; refresh `CHANGELOG.md`.

Each step is independently shippable, so this can land as one PR or a short series.

## 5. Verification
- **`npm run check`** = `audit` + `audit:decks` + `test:ux` + `test:speech` + `typecheck` + `build`. This is the gate; it also regenerates the route tree during `build`. **WS1 extends it** with the new `test:reader` (hook coverage) and **WS2 extends `audit:decks`** with the HR-membership assertion (below), so the composite gate — not just the separately-run targeted commands — catches a broken hook or an incomplete HR deck.
- Targeted: after WS1, the new hook test plus `npm run test:speech` (the latter guards `speak.ts` only — see WS1 guardrails). After the HR-deck change, **extend `scripts/analyze-flashcard-decks.mjs`**: today it only asserts baseline totals (103/329) and duplicate IDs and never calls `getDeckCards`, so an empty or `Employee Support`-missing HR deck would still pass. Add an explicit assertion that `getDeckCards("hr-onboarding")` (a) is non-empty and (b) covers **every category in the HR allowlist** — `Benefits`, `Employee Perks`, `Spark`, `My Setup`, `Employee Support`, `Study Accommodation` — asserting at least one card per category (ideally an exact expected card-count / ID set), and (c) contains **no `Affordability` card**. A partial "contains Employee Support" check would let an implementation silently drop `Benefits`, `My Setup`, or `Study Accommodation` and still pass, so the assertion must span the full allowlist to actually gate HR membership. Run `npm run typecheck` after the `Module.track` change.
- Manual: autoplay parity on flashcards vs. the two lesson surfaces (start/stop/skip/rate persists across reloads and across pages); each of the four tracks reachable from sidebar + mobile dock; Corpus/Packages render all records with correct verification badges; reduced-motion path.

## 6. Risks & non-goals
- **Generated `routeTree.gen.ts`** — never hand-edit; new routes appear via the router plugin on dev/build.
- **Static content** — zero backend/migration work; "ingestion" remains a commit-time process (no runtime upload/RAG is in scope).
- **Deck membership is computed** — re-bucketing HR is a filter change, not a mass card edit; guard with `audit:decks`.
- **SSR speech safety** — preserve every `window`/`speechSynthesis` guard in `speak.ts`; the hook must no-op server-side.
- **Non-goals:** no billing/pricing/checkout, no light theme, no new backend, no official Spectrum logo asset (an original on-brand wordmark instead).

## 7. Open decisions (confirm before/at implementation)
1. **Brand mark:** an original "Spectrum SAS" wordmark/monogram in the Spectrum palette (recommended, since no official asset exists and this is an internal study tool) — vs. supplying a specific logo file.
2. **Nav shape:** a single **"Training"** group holding the four tracks (recommended) vs. four separate top-level groups.
3. **Voice preference:** expose a voice picker (male/female/named) persisted to `localStorage`, or keep browser-default with only rate remembered.
4. **Scope of delivery:** one comprehensive PR vs. a short phased series (WS1 first).
