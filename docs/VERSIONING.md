# CallFlow Lab Versioning Protocol

Current app line: `v1.5.0-spectrum.0`

This release line tracks the CallFlow Lab Spectrum inbound-sales study system, auditable source ingestions, structural features, corporate intelligence, voice practice, prompt education and release-verification controls.

## Version shape

Use this release pattern:

`vMAJOR.MINOR.PATCH-spectrum.INGESTION`

Examples:

- `v1.0.0-spectrum.0` — first full conversion into CallFlow Lab.
- `v1.0.0-spectrum.1` — privacy and daily-ingestion setup corrections.
- `v1.0.0-spectrum.2` — Gmail plus forwarded-Outlook product-knowledge ingestion.
- `v1.1.0-spectrum.4` — Quick Lookup, Prompt Engineer, Across the Spectrum and workbench refinements.
- `v1.2.0-spectrum.0` — comprehensive Otter corpus integration, four new curriculum modules, 100-card expansion, full subsystem audit and automated release checks.
- `v1.3.0-spectrum.0` — The Full Spectrum corporate intelligence page, mission alignment, corporate lineage, Cox transaction status, AI direction, leadership and competitor landscape.
- `v1.4.0-spectrum.0` — generated TanStack route ownership plus the voice-first Across the Spectrum simulator with caller playback, microphone transcription, grounded AI turns, deterministic fallback, QA evidence and live offer guidance.
- `v1.5.0-spectrum.0` — Prompt Engineering Academy with beginner-to-professional lessons, pricing-safe templates, formatting recipes, workflows, prompt practice, advanced retrieval/security/agent topics and programmatic optimization concepts.

## Weekly update steps

1. Pull the week's approved training, corporate and tutorial sources.
2. Ignore fragments with no useful transcript or product content; mark failed retrievals as pending.
3. Exclude credentials, security codes, SSNs, customer data, account-access instructions and personal document images.
4. Extract terms, policy gates, tool paths, scenarios, flashcards, tutorial concepts, action items and unresolved questions.
5. Record source provenance, retrieval status and verification date in `src/data/weeklyTraining.ts`.
6. Add stable new concepts through an additive curriculum or tutorial pack rather than overwriting prior evidence.
7. Load new cards through `src/data/flashcardDeck.ts` so they become active without deleting prior packs.
8. Update scenarios, simulator personas, prompt drivers, corporate records or corpus records only when the source supports the change.
9. Preserve transaction status, source class and uncertainty; do not convert an expected event into a completed event.
10. Keep `src/routeTree.gen.ts` under TanStack generator ownership. Route files are the source; development/build regenerates the tree.
11. Increment `CURRENT_APP_VERSION` and `package.json` together.
12. Regenerate the package-manager lockfile when package identity or dependencies change.
13. Run `npm run audit`, `npm run typecheck` and `npm run build`; `npm run check` runs the combined local gate.
14. Verify Prompt Academy lesson progress, copy controls, pricing-safe unknown handling and advanced-topic labels.
15. Verify microphone permission, caller playback, transcription, deterministic fallback and private AI calling in the private preview.
16. Verify the private preview on desktop and mobile before any production deployment.

## Reversion rule

Every ingestion or structural release must remain reversible by reverting its commits or removing the dated additive pack and corresponding `WeeklyTrainingUpdate` entry. Do not silently overwrite provenance.

## Authority rule

The app is a private study shell. Current official procedure, system articles, biller, Agent OS, approved offer, corporate communications, facilitator guidance, HR, payroll and benefits materials control when exact wording, pricing, eligibility, transaction status or policy matters.
