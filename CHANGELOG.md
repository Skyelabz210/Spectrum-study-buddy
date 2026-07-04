# Changelog

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

Known follow-up:

- Regenerate `src/routeTree.gen.ts` locally with the TanStack router plugin during the next dev run.
- Run `npm run lint` and `npm run build` locally before merge.
- Add future Otter batches as new weekly ledger entries before modifying the curriculum spine.
