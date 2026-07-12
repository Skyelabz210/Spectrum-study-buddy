# Repository Automation Policy

This project intentionally does not use GitHub Actions workflows or repository lint enforcement.

## Current state

- Canonical development branch: `main`
- GitHub Actions workflow files: none
- Repository lint script: removed
- ESLint configuration: removed
- Formatting remains available as an optional local command
- Build and browser smoke checks are run manually when useful

## Change rule

Do not add files under `.github/workflows/` or restore automated lint enforcement unless the repository owner explicitly requests it for this project.

This policy applies only to CallFlow Lab / Spectrum Study Buddy. It does not define requirements for CRAM, Nine65, or other repositories.
