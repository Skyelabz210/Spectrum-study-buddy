# CallFlow Lab Versioning Protocol

Current app line: `v1.0.0-spectrum.0`

This revision converts the former phlebotomy study shell into CallFlow Lab, a weekly-updated Spectrum inbound sales study system.

## Version shape

Use this release pattern:

`vMAJOR.MINOR.PATCH-spectrum.WEEK`

Examples:

- `v1.0.0-spectrum.0` — first full conversion from Tish-Sticks to CallFlow Lab.
- `v1.0.1-spectrum.1` — first weekly content update after new Otter recordings.
- `v1.1.0-spectrum.4` — structural feature update, such as a new drill mode or persistent database-backed weekly updates.

## Weekly update steps

1. Pull the week's Otter recordings.
2. Ignore fragments with no useful transcript.
3. Extract terms, policy gates, tool paths, scenarios, flashcards, action items, and unresolved questions.
4. Add a new entry to `src/data/weeklyTraining.ts`.
5. Update `src/data/curriculum.ts` only when a concept is stable enough to become part of the study spine.
6. Update `src/data/scenarios.ts` for new A-R-M, policy-gate, or navigation drills.
7. Increment `CURRENT_APP_VERSION` and `package.json` together.
8. Run lint/build locally before merging.

## Reversion rule

Every weekly update must be reversible by reverting the commit or removing that week's `WeeklyTrainingUpdate` entry plus any content linked to its `weekId`.

## Authority rule

The app is a study shell. Current official procedure, system articles, facilitator guidance, HR, payroll, and benefits materials control when exact wording or policy matters.
