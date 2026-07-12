# CallFlow Lab UI Refinement Plan

Date: 2026-07-12  
Stage: Week 2 growth architecture  
Canonical branch: `main`

## 1. Executive direction

CallFlow Lab has already expanded from a study shell into four distinct operating systems inside one app:

1. Live-call assistance
2. Sales practice and simulation
3. Structured learning and recall
4. Training ingestion, setup, and provenance

The current interface still presents nearly every route as an equal item in one flat navigation list. That worked for the first conversion, but it will become increasingly difficult to scan as additional modules, product tools, call simulations, prompt systems, and weekly training packs are added.

The next interface should behave like an agent workspace rather than a collection of pages. The dominant question should be:

> What does the agent need to do right now?

The interface should make the answer available in one or two actions.

## 2. Current UI inventory

### Existing routes

- `/` — landing dashboard
- `/lookup` — exact-source product lookup
- `/curriculum` — module index
- `/curriculum/$moduleId` — module lessons
- `/setup` — local work profile and setup tasks
- `/across-spectrum` — mock-call simulator
- `/sales-prompts` — AI Sales Specialist Prompt Engineer
- `/scenarios` — written objection and policy drills
- `/flashcards` — flip deck and cheatsheet
- `/tutor` — coach, lookup, simplify, and quiz modes
- `/plan` — study plan
- `/tips` — tips
- `/corner` — weekly ingestion ledger

### Existing shell

- One left sidebar
- One static top bar
- One flat sidebar group labeled `Study`
- Twelve peer-level navigation entries
- Route pages independently define their own page header, controls, and card composition

## 3. Primary findings

### 3.1 Flat navigation will not scale

Every route currently has equal weight in a single list. Quick Lookup, My Setup, Weekly Ledger, Flashcards, and the live simulator are presented as peers even though they answer different intents.

As more tools are added, the list will become slower to scan and the collapsed icon-only mode will become harder to understand.

### 3.2 The landing page has too many competing entry points

The home route currently combines:

- a large PID identity block
- seven primary action buttons
- eight equal dashboard tiles
- the full curriculum spine

The page is informative, but there is no single dominant next action. The most urgent workflows—lookup, active-call support, and practice—compete visually with setup and historical material.

### 3.3 Overlapping capabilities need intentional relationships

Several routes are complementary but currently appear independent:

- Quick Lookup and Coach Lookup mode
- Scenario Trainer and Across the Spectrum
- Prompt Engineer and Sales Coach
- Curriculum and Flashcards
- Weekly Ledger and newly ingested modules
- Plan, Tips, and Curriculum

The interface should show these as workflow sequences rather than unrelated destinations.

### 3.4 Long card-stack pages will become dense

The Prompt Engineer, simulator, ledger, lookup results, and future product modules can all accumulate large vertical stacks. Repeating full cards works at small scale, but it increases scrolling and hides the current task.

Dense tools need:

- a dominant work surface
- a compact outline or control rail
- an inspector or detail drawer
- progressive disclosure
- persistent actions near the generated result

### 3.5 Route naming and navigation labels are inconsistent

Examples:

- `/corner` means Weekly Ledger in the UI
- `/tutor` contains four distinct modes
- `Across the Spectrum` is conceptually strong but long in compact navigation
- `Plan`, `Tips`, and `My Setup` do not communicate whether they are learning, administration, or live-call tools

Labels should reflect user intent and route aliases should remain stable for backward compatibility.

### 3.6 The shell does not expose context

The top bar always says `CallFlow Lab · weekly sales study`. It does not display:

- current workspace
- current module or selected product
- active simulation state
- current prompt mode
- recent item
- quick return path

### 3.7 Mobile loses important secondary context

The Coach hides its memory panel on small screens. Other large routes stack all controls above or below the main work area. Future mobile behavior should use drawers, sheets, and tabs so secondary information remains available without displacing the primary task.

### 3.8 Visual tokens retain legacy naming

The stylesheet still contains old Tish-Sticks comments and variables such as `blood`. The current pink-neon visual language is consistent, but naming and semantic tokens should be cleaned so future components use product-purpose tokens rather than inherited project terminology.

## 4. Target information architecture

The sidebar should be reorganized into five intent groups.

### Home

- Today

### Live Call

- Quick Lookup
- AI Sales Specialist
- Sales Coach
- Across the Spectrum

### Practice

- Scenarios
- Flashcards

### Learn

- Curriculum
- Study Plan
- Tips

### System

- My Setup
- Weekly Ledger

This grouping preserves every existing route while reducing decision cost.

## 5. Target workspace model

### 5.1 Today workspace

The landing page should become a prioritized operational dashboard.

Default order:

1. **Continue / Resume** — most recent lesson, simulation, prompt, or scenario
2. **Live Call Tools** — Lookup, Prompt Engineer, Coach
3. **Practice Next** — recommended scenario or flashcard deck
4. **New This Week** — newly ingested training facts and modules
5. **Progress** — compact learning summary
6. **Administration** — setup and ledger links

The PID remains available but should move into a compact identity/status strip rather than dominate the full first viewport.

### 5.2 Live Call workspace

Live-call tools should share a consistent compact shell:

- top context bar
- call-driver or product selector
- dominant answer/script surface
- source and verification status
- copy action
- related-tool links

Quick transitions:

- Lookup result → Ask Coach
- Lookup result → Build Sales Prompt
- Prompt output → Practice in Across the Spectrum
- Simulator wrap-up → Open matching Scenario

### 5.3 Practice workspace

Scenario Trainer, Flashcards, and Across the Spectrum should share:

- difficulty
- topic/product filter
- recent attempts
- random drill
- weak-area drill
- completion state

### 5.4 Learn workspace

Curriculum should become a filterable module library with:

- module categories
- week added
- product/service tags
- progress
- recently updated
- source status
- search

## 6. Navigation design

### Desktop

Use a grouped collapsible sidebar with:

- group labels
- clear active state
- optional unread/new badge
- tooltips in collapsed mode
- a compact Recent section
- a bottom utility area for setup and ledger

### Mobile portrait

Use:

- a compact top app bar
- a bottom navigation containing Today, Live, Practice, Learn, More
- a sheet for the full route directory
- persistent access to Quick Lookup

### Mobile landscape

Use a narrow icon rail and slide-over inspector for tools such as the simulator and prompt engineer.

## 7. Global command and search

Add a command palette opened by keyboard or button.

Supported actions:

- search a product or acronym
- open any route
- open a curriculum module
- start a random scenario
- start a call simulation
- create a sales prompt
- resume recent work
- copy PID

Search should return mixed result types with visible type labels:

- Product
- Module
- Scenario
- Tool
- Weekly update

## 8. Shared page primitives

Create reusable components before adding many more routes.

### `PageHeader`

Contains:

- eyebrow or workspace label
- title
- concise description
- status badge
- primary action

### `WorkspaceShell`

Contains:

- optional left outline rail
- dominant center work surface
- optional right inspector
- mobile drawer behavior

### `ContextBar`

Displays:

- current product or call driver
- source status
- active mode
- last updated date
- related action

### `ResultPanel`

For lookup answers, scripts, coach responses, and simulator coaching.

### `FilterBar`

For product, week, category, difficulty, and completion filters.

### `EmptyState`

Provides one repair action rather than generic explanatory prose.

### `RecentActivity`

One local data model shared by lessons, lookups, prompts, scenarios, and simulations.

## 9. Route-specific refinements

### Home

- Replace equal-weight action grid with prioritized sections
- Make Quick Lookup the persistent primary action
- Add Resume
- Add New This Week
- Move setup and ledger into a lower-priority system section
- Reduce duplicate buttons and tiles

### Quick Lookup

- Keep the search field sticky
- Add one-click copy for key facts
- Add compact first-answer mode
- Add expand/collapse for requirements and notes
- Add actions: Ask Coach, Build Prompt, Practice Scenario
- Add recent searches
- Add product-category filtering when the corpus grows

### AI Sales Specialist

- Split into `Live Mode` and `Builder Mode`
- Live Mode shows minimal inputs and the single best next line first
- Builder Mode exposes the full strategy and certificate details
- Keep copy action sticky
- Move technical certificate detail into a collapsible inspector
- Add save-as-template and recent prompts locally
- Add direct handoff to Across the Spectrum

### Sales Coach

- Replace four small mode buttons with a mode switcher that clearly explains the active mode
- Synchronize route search state whenever mode or query changes
- Expose memory on mobile through a drawer
- Add starter chips based on current module and recent lookups
- Add explicit source chips to lookup responses

### Across the Spectrum

- Make the call transcript the dominant viewport
- Collapse persona and difficulty into a setup drawer after the call starts
- Keep QA markers visible but compact during the active call
- Put live hint, next-best line, and rebuttal in a right inspector
- Add call-driver filters and random caller generation
- Add replay and attempt history
- Send wrap-up gaps directly into matching flashcards or scenarios

### Scenario Trainer

- Replace long static side lists with searchable filters
- Add random, weak-area, and product-specific drill modes
- Add attempt comparison and self-rating
- Add direct transition into a matching simulated call

### Flashcards

- Add category and product filters
- Add known / needs-review controls
- Persist deck position and review state
- Reduce cheatsheet density with collapsible categories
- Add start-from-current-module

### Curriculum

- Add search, category, week, and product filters
- Add progress and updated badges
- Add module collections rather than one unbounded linear list
- Add Recently Added and Continue Learning sections

### Weekly Ledger

- Default to latest week summary
- Collapse historical weeks
- Add filters for source, module, product, and unresolved item
- Link each changed item directly to the relevant module or tool
- Present unresolved questions as actionable verification tasks

### Setup

- Separate private profile, app preferences, and onboarding checklist
- Add completion state
- Keep sensitive-data explanations concise and near the relevant field

## 10. Scalable content registry

New modules and tools should be registered in shared typed data rather than manually repeated across the sidebar, home page, route metadata, and related links.

Recommended registry fields:

```ts
{
  id,
  title,
  shortTitle,
  route,
  workspace,
  icon,
  description,
  keywords,
  status,
  weekAdded,
  relatedRoutes,
  mobilePriority
}
```

This registry should drive:

- sidebar
- mobile navigation
- command palette
- landing-page tool cards
- related-tool links
- route directory

## 11. State and persistence model

Use local browser storage for non-sensitive UI state:

- recent routes
- recent lookups
- recent prompt templates
- last selected scenario
- flashcard review status
- curriculum progress
- simulator attempts
- pinned tools

Keep customer account identifiers and protected information out of persistent local state.

## 12. Visual-system refinement

### Token cleanup

Rename legacy semantic variables:

- `blood` → `danger-accent` or remove when unused
- legacy Tish-Sticks comments → CallFlow Lab terminology
- define explicit tokens for success, warning, source-verified, needs-check, active-call, and coaching

### Hierarchy

- one dominant action per page
- one dominant work surface
- fewer equal-weight cards
- direct labels near affected content
- progressive disclosure for technical detail
- reduced decorative glow around secondary elements

### Typography

- preserve large page titles for landing and major workspaces
- use smaller contextual headers inside operational tools
- standardize eyebrow, title, description, and status spacing

## 13. Accessibility and interaction requirements

- Every collapsed navigation icon receives a visible tooltip
- Essential states never rely on color alone
- Keyboard access for command palette, tabs, primary action, and result copy
- Focus returns to the affected work surface after closing mobile drawers
- Live call controls have clear accessible labels
- Reduced-motion behavior for scrolling and call-status animation
- All critical result information remains visible without hover

## 14. Implementation phases

### Phase 0 — Repository and architecture cleanup

Status: started

- Keep `main` as canonical
- Remove lint command and ESLint configuration
- Keep GitHub Actions workflows absent
- Record automation policy
- Add this refinement plan

### Phase 1 — Navigation foundation

- Add typed navigation registry
- Group desktop sidebar by intent
- Add collapsed-mode tooltips
- Add mobile bottom navigation and route sheet
- Add contextual top bar
- Preserve every existing route

Acceptance:

- Any current route is reachable in two actions or fewer
- Quick Lookup is reachable in one action from every route
- Navigation remains understandable in collapsed and mobile states

### Phase 2 — Today dashboard

- Build Resume state
- Add Live Call Tools section
- Add Practice Next
- Add New This Week
- De-emphasize setup and ledger

Acceptance:

- The first viewport contains one clear primary action
- No duplicate route is presented more than once in the primary action area

### Phase 3 — Shared workspace components

- Add PageHeader
- Add WorkspaceShell
- Add ContextBar
- Add ResultPanel
- Add FilterBar
- Add RecentActivity

Acceptance:

- New modules can use shared shell components without creating a new page layout from scratch

### Phase 4 — Live tool consolidation

- Refine Lookup
- Split Prompt Engineer into Live and Builder modes
- Refine Coach mode switching
- Connect Lookup → Prompt → Simulator workflows

Acceptance:

- An agent can move from customer phrase to verified fact to tailored script to practice call without returning home

### Phase 5 — Practice system

- Shared practice filters
- Attempt history
- Weak-area routing
- Simulator wrap-up handoffs
- Flashcard review state

### Phase 6 — Learning library

- Curriculum filtering and collections
- Progress state
- Recently added modules
- Weekly ledger deep links

### Phase 7 — Scale and personalization

- Command palette
- favorites/pins
- recent history
- role-specific or training-week views
- configurable home workspace

## 15. Immediate implementation order

The first UI implementation pass should contain only the following low-risk foundation changes:

1. Create the typed navigation registry
2. Replace the flat sidebar with grouped navigation
3. Add tooltips for collapsed icons
4. Add a contextual page title to the top bar
5. Introduce a persistent Quick Lookup action
6. Clean legacy stylesheet naming and comments

The landing-page redesign and route-specific work should follow after the navigation foundation is stable.

## 16. Completion definition

The interface is ready for continued weekly expansion when:

- adding a new module does not require editing several unrelated navigation surfaces
- adding a new tool places it in a clear workspace automatically
- live-call actions remain one or two interactions away
- learning, practice, live support, and administration are visibly distinct
- mobile retains access to secondary context through drawers or sheets
- the primary task remains visible while details are progressively revealed
- every route has a clear next action and related-tool path
