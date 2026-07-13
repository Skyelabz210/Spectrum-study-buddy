# Changelog

## v1.7.0-spectrum.0 — 2026-07-13

Outlook Calendar onboarding ingestion and cross-app schedule release.

Changed:

- Read the connected primary Outlook calendar and found one Spectrum item: the Tuesday, August 11, 2026 new-hire orientation.
- Added a sanitized, source-dated calendar dataset with the verified arrival target, training window, location, days-off note, I-9 readiness, attire, security check-in, and email-confirmation instruction.
- Added a compact next-calendar-milestone cue to Today without restoring the former long landing-page stack.
- Added the complete calendar brief to Study Plan and a focused first-day checklist to My Setup.
- Recorded the ingestion in the Weekly Ledger and bumped the app and ledger version to `1.7.0-spectrum.0`.
- Kept calendar onboarding content out of customer-product lookup, sales scripts, and simulations because it is employee/admin context rather than product authority.
- Excluded the recruiter contact, mailbox address, Outlook event ID, Outlook item URL, and other connector identifiers from the app bundle.

Verification:

- Added calendar-content, three-surface wiring, mobile-layout, privacy, phone-pattern, and live-link regression gates.
- Ran the full repository audit, mobile UX tests, speech tests, TypeScript typecheck, and production build.

## v1.6.0-spectrum.0 — 2026-07-13

Mobile-first UX, navigation, reader reliability and Spectrum visual-system release.

Changed:

- Replaced the long landing dashboard and full curriculum spine with a compact Today workspace organized into Live Call, Practice, Learn and secondary utilities.
- Reorganized the sidebar into Today, Live Call, Practice, Learn and System groups.
- Added an explicit labeled mobile Menu control, an in-menu close control, automatic menu dismissal after every route selection, and a fixed five-action mobile bottom dock.
- Replaced the inherited magenta palette with a Spectrum-aligned blue, cyan, deep-navy and cool-white token system.
- Added mobile-safe touch targets, safe-area padding, horizontally scrollable tab bars, compact route spacing and consistent page frames.
- Repaired the speech lifecycle so unsupported, cancelled, blocked and completed utterances have distinct results.
- Prevented flashcard and module autoplay from advancing when audio fails or is blocked; added visible audio status and a manual Read card action.
- Added a chunked Page Reader and exposed it in Across the Spectrum, Prompt Academy and The Full Spectrum.
- Reordered Across the Spectrum so Ready and the live work surface precede setup on mobile; moved setup and coaching inspectors into expandable panels.
- Added mobile selectors to Scenario Trainer and Prompt Engineer so the primary work surface appears before long desktop rails.
- Added progressive disclosure to Prompt Engineer compiler evidence, Full Spectrum reference sections and secondary Setup sections.
- Restored Coach memory visibility on mobile and changed the Coach height calculation to dynamic viewport units.
- Replaced deprecated TanStack server-function validators and split large client bundles into smaller cacheable chunks.
- Added Python mobile-UX regression gates and executable speech lifecycle tests to `npm run check`.

Verification:

- Domain audit passed for all routes, 226 flashcards, 14 modules, 81 lessons, 6 caller personas, 8 QA markers, privacy scans and exact CRAM mask recovery.
- Python mobile-UX regression gates passed.
- Speech lifecycle tests passed for success, cancellation, unsupported-browser and blocked-audio paths.
- TypeScript typecheck and production client/SSR builds passed.

## v1.1.0-spectrum.4 — 2026-07-11

AI-assisted selling workbench release with CRAM exact-state refinement and week-two UI architecture planning completed 2026-07-12.

Changed:

- Added `/sales-prompts`, a deterministic AI Sales Specialist Prompt Engineer designed for the browser-based internal Spectrum AI agent.
- Added ten common call-driver presets covering new Internet, premium-tier upgrades, Mobile pitching, additional lines, device savings, Invincible WiFi, Voice, price objections, competitor switching, and total household connectivity.
- Added a minimum-input workflow that can build a complete paste-ready prompt from one customer sentence.
- Added Rapid, Standard, and Full Strategy output depths plus direct, consultative, reassuring, and energetic delivery tones.
- Added source-discipline instructions requiring the internal AI to verify current KBase, biller, Agent OS, approved offers, serviceability, equipment, device compatibility, and Competitive Edge content instead of inventing missing facts.
- Added adaptive discovery, OARS listening, A-R-M objection handling, need–proof–benefit bridges, and autonomy-safe assumptive closing.
- Added conversion-integrity gates against fabricated scarcity, hidden conditions, unsupported claims, pressure based on vulnerability, and customer/account identifiers in the local app.
- Added the Prompt Engineer to the sidebar and landing dashboard without replacing Quick Lookup, Sales Coach, Across the Spectrum, or any existing study route.
- Added `src/data/cramSalesCompiler.ts`, an integer-state CRAM compiler using the bounded prime pair `M=36`, `A=37`, and five binary invariants per lane.
- Added a four-level winding tower: observed value, need winding, strategy meta-winding, and transaction meta-meta-winding.
- Added exact lane masks bounded by 31 so every valid lane satisfies `mask mod 37 = mask` exactly.
- Added a second exact five-bit risk mask for missing customer language, unknown current services, possible protected identifiers, coercive instructions, and unsupported persuasion methods.
- Added an evidence-grade system: A for direct sales or strong operational evidence, B for replicated/convergent evidence, C for bounded adjacent-domain hypotheses, and HOLD for unsupported or autonomy-threatening tactics.
- Added active timing order: verified credibility and discovery early, reflection and value reasoning in the middle, procedural clarity and choice-preserving close late.
- Added hold blocks for embedded commands, personality targeting, hidden steering, fabricated scarcity, and unverified social proof.
- Added a visible exact-state certificate, winding-tower cards, active strategy ledger, risk recovery carries, and hold ledger to the Prompt Engineer UI.
- Added `docs/resources/cram-exact-state-sales-compiler-2026-07-12.md` as the operational specification.
- Added `docs/UI_REFINEMENT_PLAN_2026-07-12.md`, covering scalable information architecture, grouped navigation, mobile behavior, shared workspaces, route-specific improvements, and phased implementation.
- Added `docs/UI_AESTHETIC_SYSTEM_2026-07-12.md`, defining color discipline, typography, surface hierarchy, component polish, motion, mobile behavior, and acceptance criteria.
- Rebuilt the global visual tokens around a focused dark operational canvas with restrained magenta emphasis, semantic success/warning/info states, three surface levels, refined borders, softer glow, and more deliberate depth.
- Added improved font rendering, focus treatment, scrollbars, reduced-motion behavior, reusable shell/surface utilities, and mobile radius adjustments.
- Refined the top shell with contextual workspace/page labels and persistent Quick Lookup access.
- Refined sidebar branding, spacing, active-state emphasis, and collapsed-mode tooltips.
- Polished error and missing-route surfaces to match the workbench visual system.
- Removed the repository lint command and deleted the ESLint configuration.
- Confirmed that no GitHub Actions workflow files are configured and recorded the no-workflow policy in `.github/WORKFLOWS_DISABLED.md`.
- Kept `main` as the canonical development and default branch.
- Kept the app version at `1.1.0-spectrum.4` so package and weekly-ledger versions remain aligned during the same workbench release.

Mailbox findings integrated:

- Meaningful Mobile presentations should include pricing, plan, feature, and benefit and should be introduced as a real conversation rather than a late mention.
- Internet and premium-tier positioning should begin with household users, device count, simultaneous activities, performance expectations, and serviceability.
- Invincible WiFi discovery should cover people, devices, dead zones, buffering, work from home, gaming, streaming, and outage-continuity need.
- Device-saving prompts preserve BYOD, Phone Balance Buyout, trade-in, activation, documentation, compatibility, and current-offer verification gates.
- Temporary incentive amounts, individual performance data, employee names, and confidential mailbox content were not committed to the app.

Research basis:

- Adaptive selling has the strongest direct sales-performance support in the reviewed meta-analysis.
- Open questions, reflective listening, affirmations, and summaries are used to improve relevance and reduce conversational resistance.
- Choice-preserving wording is used to reduce reactance; the assumptive close is permitted only after need, fit, eligibility, and complete disclosure are established.
- Procedural clarity is retained as a bounded Grade C hypothesis because the supplied corpus identifies a cross-domain pattern but does not establish a universal telecom-sales mechanism.
- Consumer-steering results are used as a risk signal, not as a recipe for concealed influence.
- NLP embedded-command claims remain on HOLD because no controlled trial isolating the claimed mechanism was located in the supplied corpus.

## v1.1.0-spectrum.3 — 2026-07-10

Direct Outlook/Gmail corpus reconciliation and rapid retrieval release.

Changed:

- Connected direct Outlook ingestion for the work mailbox and reconciled it with forwarded Gmail copies.
- Canonicalized duplicate product messages by KB/article ID rather than creating duplicate facts.
- Added `src/data/knowledgeCorpus.ts` with exact-source records for PR131, PR223, HOW7726, GEN7777, GEN9023, GEN8761, HOW7449, GEN9001, referenced SIA articles, public Mobile plan context, and source-pointer alerts.
- Added `/lookup`: type one or a few words such as `advantage`, `2 gig`, `unlimited plus`, `PBB`, or `RRP` to retrieve plan, speed, services/features, requirements, notes, and source status.
- Added Quick Lookup as a fourth AI Coach mode. It is injected with only canonical corpus matches and is instructed not to invent missing facts.
- Put the private PID on the landing page with a one-tap copy control.
- Added an isolated private profile for PID/work email and kept it separate from customer product records.
- Corrected Advantage to the internal PR131 record: 100×20 Mbps, approved-address display gate, biller flag, product-combination restriction, qualified-offer downgrade rule, and seasonal-suspension note.
- Expanded PR131 records for Premier, Gig, 2 Gig, 7 Gig, SIA, and legacy Ultra.
- Expanded device records for BYOD, Phone Balance Buyout, trade-in, RR, and RRP.
- Replaced the prior simplistic Mobile-throttling conclusion with an explicit source discrepancy: internal PR223 removed threshold wording while the current public Spectrum plan page still displays customer-facing thresholds.
- Updated weekly provenance so direct Outlook is no longer listed as disconnected.
- Bumped the app version to `1.1.0-spectrum.3`.

Privacy and source controls:

- Excluded passwords, activation PINs, authenticator/security codes, SSNs, payroll documents, ADP files, personal document images, and billing-system access secrets.
- Personal/admin records do not appear in Quick Lookup product results.
- Current official KB article, biller, Agent OS, approved SOP, and live offer control over the study corpus.
- Source conflicts remain visible with timestamps rather than being silently flattened.

## v1.0.0-spectrum.2 — 2026-07-10

Expanded Gmail and forwarded-Outlook product ingestion.

Changed:

- Added `src/data/spectrumProductUpdate20260710.ts` with structured flashcards for PR223 Mobile, PR131 Internet, HOW7726 Invincible WiFi, BYOD, Phone Balance Buyout, trade-ins, and RR/RRP verification.
- Loaded the new cards into the active `ALL_FLASHCARDS` deck used by the app.
- Updated the current weekly training ledger with source provenance, scenarios, action items, and unresolved verification gates.
- Recorded that direct Outlook mailbox access was not connected at that revision; this is superseded by v1.1.0-spectrum.3.
- Excluded credentials, security codes, account-access instructions, SSNs, and personal document images from committed app data.
- Bumped the app version to `1.0.0-spectrum.2`.

Verification gates:

- Current official PR, HOW, GEN, biller, Agent OS, and SOP content control over study cards.
- Run `npm run build` manually when a browser/build smoke check is useful.

## v1.0.0-spectrum.0 — 2026-07-04

Initial CallFlow Lab conversion.

Changed:

- Reversioned package from the generic TanStack starter identity to `callflow-lab`.
- Replaced the phlebotomy curriculum with Spectrum inbound sales training modules.
- Added weekly Otter ingestion ledger in `src/data/weeklyTraining.ts`.
- Added A-R-M and policy-gate scenario data in `src/data/scenarios.ts`.
- Added `/scenarios` route for call-response practice.
- Rebranded root shell, home dashboard, sidebar, curriculum pages, flashcards, plan, coach, and weekly ledger.
- Retargeted the AI tutor prompt into CallFlow Coach.
- Rekeyed local memory to `callflowlab.memory.v1`.
- Replaced floating speech-rate controls with integer percentage controls.
- Replaced the former developer corner with a weekly training ledger.
- Removed legacy non-Spectrum image assets that belonged to the prior developer-corner content.

Known follow-up:

- Regenerate `src/routeTree.gen.ts` locally with the TanStack router plugin during the next local dev/build run.
- Use manual build and browser smoke checks when needed; no repository lint or GitHub Actions enforcement is configured.
- Add future Otter batches as new weekly ledger entries before modifying the curriculum spine.
