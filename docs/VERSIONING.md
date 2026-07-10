# CallFlow Lab Versioning Protocol

Current app line: `v1.0.0-spectrum.2`

This release line tracks the CallFlow Lab Spectrum inbound-sales study system and its auditable weekly content ingestions.

## Version shape

Use this release pattern:

`vMAJOR.MINOR.PATCH-spectrum.INGESTION`

Examples:

- `v1.0.0-spectrum.0` — first full conversion from Tish-Sticks to CallFlow Lab.
- `v1.0.0-spectrum.1` — privacy and daily-ingestion setup corrections.
- `v1.0.0-spectrum.2` — Gmail plus forwarded-Outlook product-knowledge ingestion.
- `v1.1.0-spectrum.4` — structural feature update, such as a new drill mode or persistent database-backed weekly updates.

## Weekly update steps

1. Pull the week's approved training sources.
2. Ignore fragments with no useful transcript or product content.
3. Exclude credentials, security codes, SSNs, customer data, account-access instructions, and personal document images.
4. Extract terms, policy gates, tool paths, scenarios, flashcards, action items, and unresolved questions.
5. Add or update the current entry in `src/data/weeklyTraining.ts` with source provenance.
6. Update `src/data/curriculum.ts` only when a concept is stable enough to become part of the study spine.
7. Load new product cards through `src/data/flashcardDeck.ts` so they become active in the app.
8. Update `src/data/scenarios.ts` for new A-R-M, policy-gate, product, or navigation drills.
9. Increment `CURRENT_APP_VERSION` and `package.json` together.
10. Regenerate the package-manager lockfile when package identity or dependencies change.
11. Run lint and build before merging or deploying.

## Reversion rule

Every weekly update must be reversible by reverting the commit or removing that week's `WeeklyTrainingUpdate` entry plus any content linked to its source date or release line.

## Authority rule

The app is a private study shell. Current official procedure, system articles, biller, Agent OS, facilitator guidance, HR, payroll, and benefits materials control when exact wording or policy matters.
