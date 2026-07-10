# Changelog

## v1.1.0-spectrum.3 — 2026-07-10

Direct Outlook/Gmail corpus reconciliation and rapid retrieval release.

Changed:

- Connected direct Outlook ingestion for `Anthony.Diaz2@spectrum.com` and reconciled it with forwarded Gmail copies.
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
