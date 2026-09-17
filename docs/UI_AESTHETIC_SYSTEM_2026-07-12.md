# CallFlow Lab Aesthetic Polish System

Date: 2026-07-12  
Stage: Week 2 visual foundation  
Canonical branch: `main`

## 1. Visual direction

CallFlow Lab should feel like a focused operational workspace built for agents who need fast answers, practice, and coaching under time pressure.

The target expression is:

- dark and concentrated
- precise rather than decorative
- energetic without visual noise
- modern without looking like a generic template
- readable during a live call
- equally intentional on desktop and mobile

The visual identity keeps the existing deep navy canvas and magenta accent, but uses the accent more selectively. The strongest color and glow belong to the primary action, active call state, selected navigation item, or verified success state.

## 2. Aesthetic hierarchy

Every page should contain five visible layers:

1. **Canvas** — the quiet dark background that carries the whole app.
2. **Shell** — sidebar and top context bar.
3. **Primary work surface** — the dominant task area.
4. **Secondary panels** — controls, source details, history, or coaching context.
5. **Transient emphasis** — success, active state, risk, warning, or current recommendation.

This prevents every card from appearing equally important.

## 3. Color discipline

### Core roles

- Background: deep navy-black.
- Foreground: cool near-white.
- Primary accent: controlled magenta.
- Secondary accent: muted violet-blue.
- Success: green used for completed QA, verified status, and positive completion.
- Warning: amber used for unresolved checks and required verification.
- Destructive: red reserved for actual blocking or sensitive-data risk.
- Information: blue used for source or system context.

### Rules

- One dominant accent per surface.
- No rainbow status language.
- Glow is limited to primary actions and genuinely active states.
- Secondary cards use border, spacing, and typography before color.
- Status meaning is always paired with text or an icon.

## 4. Typography

### Reading hierarchy

- Major workspace title: large, tight tracking, short line length.
- Operational page title: compact and contextual.
- Section title: medium weight with strong spacing above.
- Eyebrow: uppercase, small, widely tracked.
- Body: 14–16 px with relaxed line height.
- Metadata: 11–12 px, muted, never used for essential instructions.
- Generated scripts and source output: monospaced only where exact structure matters.

### Rules

- Keep paragraphs narrow enough for rapid scanning.
- Avoid large headings inside dense live tools.
- Use bold for decision points, not entire paragraphs.
- Use direct labels instead of detached legends.

## 5. Surface and depth system

### Surface 1

Used for passive containers, supporting cards, and historical context.

### Surface 2

Used for active controls, selected items, and primary tool panels.

### Surface 3

Used sparingly for focused inspectors, active call panels, and generated result surfaces.

### Depth rules

- Borders establish most hierarchy.
- Shadows are soft and broad.
- Inner highlights create edge definition on dark surfaces.
- Hover lift is limited to genuinely clickable cards.
- Large stacked shadows are avoided on information-only panels.

## 6. Component polish

### Sidebar

- Stronger brand mark.
- Clearer active indicator.
- More comfortable vertical rhythm.
- Tooltips in collapsed mode.
- Grouped navigation in the next structural phase.

### Top context bar

- Shows current workspace and page.
- Keeps Quick Lookup available globally.
- Uses restrained translucency and blur.
- Remains compact enough for mobile.

### Cards

- Shared radius and border treatment.
- One dominant card per page.
- Secondary cards are visually quieter.
- Interactive cards receive hover feedback; static cards do not imitate buttons.

### Buttons

- Primary: gradient accent, used once per task region.
- Secondary: quiet surface with border.
- Ghost: navigation or low-priority utility.
- Destructive: only for irreversible or sensitive actions.

### Inputs

- Strong focus ring.
- Clear placeholder contrast.
- Labels remain visible after entry.
- Error and verification states include text.

## 7. Motion

Motion should explain state change.

Approved motion:

- subtle hover elevation
- drawer and sheet transitions
- active-call pulse
- QA marker appearance
- result-panel reveal
- route-level loading feedback

Avoid:

- ambient floating effects
- continuous decorative animation
- large parallax movement
- repeated glow pulsing outside live state

Reduced-motion preferences disable nonessential animation and smooth scrolling.

## 8. Mobile aesthetic behavior

- Reduce radius slightly on narrow screens.
- Keep the primary task before secondary controls.
- Use sheets and drawers instead of stacking every inspector inline.
- Preserve visible status and primary action.
- Avoid dense two-column metadata blocks.
- Maintain generous tap targets and clear focus.
- Keep Quick Lookup reachable from the shell.

## 9. First visual-foundation implementation

Completed in the initial polish pass:

- Replaced inherited visual comments with CallFlow Lab terminology.
- Added semantic success, warning, information, and danger tokens.
- Added three surface levels and refined border roles.
- Reduced glow intensity and improved shadow depth.
- Added a fixed operational canvas background.
- Improved font rendering, heading rhythm, selection, focus, and scrollbars.
- Added reduced-motion behavior.
- Added reusable `surface-panel`, `surface-panel-strong`, `shell-bar`, `eyebrow`, `interactive-lift`, and text-gradient utilities.
- Refined the top shell with contextual workspace and page labels.
- Added globally available Quick Lookup access.
- Refined sidebar brand treatment, vertical rhythm, active state, and collapsed tooltips.
- Polished error and missing-route surfaces.

## 10. Next visual passes

### Pass A — Navigation and home

- Apply grouped navigation.
- Redesign Today as a prioritized workspace.
- Reduce duplicate route cards.
- Establish one primary action per viewport.

### Pass B — Live tools

- Use a shared live-tool shell.
- Make script, answer, or transcript the dominant surface.
- Move source and certificate detail into inspectors.
- Keep copy and next action persistent.

### Pass C — Practice and learning

- Standardize drill controls and completion states.
- Introduce module collections and update badges.
- Use progress visuals sparingly and consistently.

### Pass D — Mobile refinement

- Add bottom navigation.
- Add mobile inspectors and route directory sheet.
- Test keyboard, on-screen keyboard, orientation, and reduced-motion paths.

## 11. Acceptance criteria

The aesthetic system is successful when:

- the primary task is visible within three seconds
- active, verified, warning, and blocked states are visually distinct without relying only on color
- no page presents more than one equally dominant primary action
- live-call pages remain readable at a glance
- repeated page structures look related
- desktop and mobile preserve the same reading priority
- new modules can use existing visual tokens and primitives without inventing new styling
- screenshots still communicate hierarchy without hover or motion
