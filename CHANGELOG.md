# Changelog

## v1.0.0-spectrum.2 — 2026-07-10

Expanded Gmail and forwarded-Outlook product ingestion.

Changed:

- Added `src/data/spectrumProductUpdate20260710.ts` with structured flashcards for PR223 Mobile, PR131 Internet, HOW7726 Invincible WiFi, BYOD, Phone Balance Buyout, trade-ins, and RR/RRP verification.
- Loaded the new cards into the active `ALL_FLASHCARDS` deck used by the app.
- Updated the current weekly training ledger with source provenance, scenarios, action items, and unresolved verification gates.
- Recorded that direct Outlook mailbox access is not connected; only Outlook-originated messages forwarded into Gmail were available.
- Excluded credentials, security codes, account-access instructions, SSNs, and personal document images from committed app data.
- Bumped the app version to `1.0.0-spectrum.2`.

Verification gates:

- Current official PR, HOW, GEN, biller, Agent OS, and SOP content control over study cards.
- Run `npm run lint` and `npm run build` before deployment.

## v1.0.0-spectrum.0 — 2026-07-04

Initial CallFlow Lab conversion.

Changed:

- Reversioned package from the generic TanStack starter identity to `callflow-lab`.
- Replaced the phlebotomy curriculum with Spectrum inbound sales training modules.
- Added weekly Otter ingestion ledger in `src/data/weeklyTraining.ts`.
- Added A-R-M and policy-gate scenario data in `src/data/scenarios.ts`.
- Added `/scenarios` route for call-response practice.
- Rebranded root shell, home dashboard, sidebar, curriculum pages, flashcards, plan, coach, and weekly ledger.
- Retargeted the AI tutor prompt to CallFlow Lab coaching.
- Rekeyed local memory to `callflowlab.memory.v1`.
- Replaced floating speech-rate controls with integer percentage controls.
- Replaced the former developer corner with a weekly training ledger.
- Removed legacy non-Spectrum image assets that belonged to the prior developer-corner content.

Known follow-up:

- Regenerate `src/routeTree.gen.ts` locally with the TanStack router plugin during the next dev run.
- Run `npm run lint` and `npm run build` locally before merge.
- Add future Otter batches as new weekly ledger entries before modifying the curriculum spine.
