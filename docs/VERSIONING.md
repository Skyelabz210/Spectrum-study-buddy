# CallFlow Lab Versioning Protocol

Current app line: `v1.2.0-spectrum.0`

This release line tracks the CallFlow Lab Spectrum inbound-sales study system, auditable source ingestions, structural features and release-verification controls.

## Version shape

Use this release pattern:

`vMAJOR.MINOR.PATCH-spectrum.INGESTION`

Examples:

- `v1.0.0-spectrum.0` — first full conversion into CallFlow Lab.
- `v1.0.0-spectrum.1` — privacy and daily-ingestion setup corrections.
- `v1.0.0-spectrum.2` — Gmail plus forwarded-Outlook product-knowledge ingestion.
- `v1.1.0-spectrum.4` — Quick Lookup, Prompt Engineer, Across the Spectrum and workbench refinements.
- `v1.2.0-spectrum.0` — comprehensive Otter corpus integration, four new curriculum modules, 100-card expansion, full subsystem audit and automated release checks.

## Weekly update steps

1. Pull the week's approved training sources.
2. Ignore fragments with no useful transcript or product content; mark failed retrievals as pending.
3. Exclude credentials, security codes, SSNs, customer data, account-access instructions and personal document images.
4. Extract terms, policy gates, tool paths, scenarios, flashcards, action items and unresolved questions.
5. Record source provenance and retrieval status in `src/data/weeklyTraining.ts`.
6. Add stable new concepts through an additive curriculum pack and compose them in `src/data/fullCurriculum.ts`.
7. Load new cards through `src/data/flashcardDeck.ts` so they become active without deleting prior packs.
8. Update scenarios, simulator personas, prompt drivers or corpus records only when the source supports the change.
9. Increment `CURRENT_APP_VERSION` and `package.json` together.
10. Regenerate the package-manager lockfile when package identity or dependencies change.
11. Run `npm run audit`, `npm run typecheck` and `npm run build`; `npm run check` runs the combined local gate.
12. Verify the private preview on desktop and mobile before any production deployment.

## Reversion rule

Every ingestion or structural release must remain reversible by reverting its commits or removing the dated additive pack and corresponding `WeeklyTrainingUpdate` entry. Do not silently overwrite provenance.

## Authority rule

The app is a private study shell. Current official procedure, system articles, biller, Agent OS, approved offer, facilitator guidance, HR, payroll and benefits materials control when exact wording, pricing, eligibility or policy matters.
