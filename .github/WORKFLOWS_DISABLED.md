# Repository Automation Policy

CallFlow Lab now uses a minimal GitHub Actions release-verification workflow because the project has grown into a multi-route, source-aware training application.

## Current state

- Canonical development branch: `main`
- Workflow: `.github/workflows/callflow-check.yml`
- Repository audit: `npm run audit`
- TypeScript check: `npm run typecheck`
- Production build: `npm run build`
- Combined local release check: `npm run check`
- Formatting remains available through `npm run format`
- ESLint configuration is not currently restored; the integrity script, typecheck and production build are the enforced checks

## Change rule

Keep automation narrow and deterministic. New workflow steps must directly protect route wiring, corpus integrity, privacy, TypeScript correctness or deployability. Do not add unrelated release automation or repository-writing permissions without owner approval.

## Known lockfile note

The existing `bun.lock` still contains legacy root workspace metadata. Regenerate the lockfile in the connected development environment, then restore `bun install --frozen-lockfile` in CI.

This policy applies only to CallFlow Lab / Spectrum Study Buddy. It does not define requirements for CRAM, Nine65 or other repositories.
