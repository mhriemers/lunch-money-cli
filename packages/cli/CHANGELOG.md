# Changelog

## [2.1.3](https://github.com/mhriemers/lunch-money-cli/compare/lunch-money-cli-v2.1.2...lunch-money-cli-v2.1.3) (2026-03-26)

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - lunch-money-cli-core bumped from ^2.1.1 to ^2.2.0

## [2.1.2](https://github.com/mhriemers/lunch-money-cli/compare/lunch-money-cli-v2.1.1...lunch-money-cli-v2.1.2) (2026-03-25)

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - lunch-money-cli-core bumped from ^2.1.0 to ^2.1.1

## [2.1.1](https://github.com/mhriemers/lunch-money-cli/compare/lunch-money-cli-v2.1.0...lunch-money-cli-v2.1.1) (2026-03-25)

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - lunch-money-cli-core bumped from ^2.0.0 to ^2.1.0

## [2.1.0](https://github.com/mhriemers/lunch-money-cli/compare/lunch-money-cli-v2.0.0...lunch-money-cli-v2.1.0) (2026-03-25)

### ⚠ BREAKING CHANGES

- BaseCommand no longer provides createClient() or --api-key flag. Use ApiCommand for commands that need API access. setApiKey and the init hook have been removed.

### Bug Fixes

- add per-package READMEs and changelogs for npm ([#45](https://github.com/mhriemers/lunch-money-cli/issues/45)) ([6272ac0](https://github.com/mhriemers/lunch-money-cli/commit/6272ac04e72bb9c2e4643534a3cf1aab59cc6baf))

### Code Refactoring

- declare --api-key as oclif flag, split BaseCommand/ApiCommand ([#48](https://github.com/mhriemers/lunch-money-cli/issues/48)) ([3f5910a](https://github.com/mhriemers/lunch-money-cli/commit/3f5910a485e8c2942885d51e9e666378ae8a5e8a))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - lunch-money-cli-core bumped from ^1.0.0 to ^2.0.0

## [2.0.0](https://github.com/mhriemers/lunch-money-cli/compare/lunch-money-cli-v1.1.0...lunch-money-cli-v2.0.0) (2026-03-24)

### ⚠ BREAKING CHANGES

- package internals restructured into monorepo layout. The public API (exports from lunch-money-cli) is preserved via re-exports.

### Features

- restructure into monorepo with lunch-money-cli-core base library ([#30](https://github.com/mhriemers/lunch-money-cli/issues/30)) ([8fd51c6](https://github.com/mhriemers/lunch-money-cli/commit/8fd51c6628131a0f202abf8bafb6fd8ad3ecc81f))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - lunch-money-cli-core bumped from ^0.0.0 to ^1.0.0

## [1.1.0](https://github.com/mhriemers/lunch-money-cli/compare/v1.0.4...v1.1.0) (2026-03-24)

### Features

- sync command descriptions with Lunch Money v2 OpenAPI spec ([#27](https://github.com/mhriemers/lunch-money-cli/issues/27)) ([49265be](https://github.com/mhriemers/lunch-money-cli/commit/49265be45326ac96d9813d15e241182de2a68e52))

## [1.0.4](https://github.com/mhriemers/lunch-money-cli/compare/v1.0.3...v1.0.4) (2026-03-16)

### Bug Fixes

- split release and publish into separate workflows ([#13](https://github.com/mhriemers/lunch-money-cli/issues/13)) ([c390518](https://github.com/mhriemers/lunch-money-cli/commit/c39051881186caf2f5038fe57f06124035998b91))

## [1.0.3](https://github.com/mhriemers/lunch-money-cli/compare/v1.0.2...v1.0.3) (2026-03-16)

### Bug Fixes

- update npm before publish and remove publish flags ([#11](https://github.com/mhriemers/lunch-money-cli/issues/11)) ([4e72dd8](https://github.com/mhriemers/lunch-money-cli/commit/4e72dd8e26842282c675d183ef2bf9fc8acb8434))

## [1.0.2](https://github.com/mhriemers/lunch-money-cli/compare/v1.0.1...v1.0.2) (2026-03-16)

### Bug Fixes

- upgrade to Node 24 for npm OIDC publish ([#9](https://github.com/mhriemers/lunch-money-cli/issues/9)) ([ae85a5d](https://github.com/mhriemers/lunch-money-cli/commit/ae85a5dbbeba4d2d3592756a09b073e079e33b2a))

## [1.0.1](https://github.com/mhriemers/lunch-money-cli/compare/v1.0.0...v1.0.1) (2026-03-16)

### Bug Fixes

- add include-component-in-tag to match existing tag format ([#7](https://github.com/mhriemers/lunch-money-cli/issues/7)) ([40e46f4](https://github.com/mhriemers/lunch-money-cli/commit/40e46f40e0017384caa225da63d2249a32588575))
- combine release-please and publish into single workflow ([#2](https://github.com/mhriemers/lunch-money-cli/issues/2)) ([42c4ed3](https://github.com/mhriemers/lunch-money-cli/commit/42c4ed38302e80222c2a87dbcf7854ab8879faea))
- use PAT for release-please to trigger CI on release PRs ([#8](https://github.com/mhriemers/lunch-money-cli/issues/8)) ([e9e7d08](https://github.com/mhriemers/lunch-money-cli/commit/e9e7d0892a5689be036b00daea690c0121cb4f15))
- use release-please-config.json instead of workflow-level release-type ([#6](https://github.com/mhriemers/lunch-money-cli/issues/6)) ([d3c759d](https://github.com/mhriemers/lunch-money-cli/commit/d3c759d613267192fe297d5dd5a905e8a60e5101))

## 1.0.0 (2026-03-16)

### Features

- **accounts:** list, get, create, update, and delete accounts ([c23829c](https://github.com/mhriemers/lunch-money-cli/commit/c23829c56ea6ecf91237f45a6be5ebb18f1c460a))
- **budgets:** get settings, upsert, and delete budgets ([c23829c](https://github.com/mhriemers/lunch-money-cli/commit/c23829c56ea6ecf91237f45a6be5ebb18f1c460a))
- **categories:** list, get, create, update, and delete categories ([c23829c](https://github.com/mhriemers/lunch-money-cli/commit/c23829c56ea6ecf91237f45a6be5ebb18f1c460a))
- **plaid-accounts:** list, get, and sync Plaid accounts ([c23829c](https://github.com/mhriemers/lunch-money-cli/commit/c23829c56ea6ecf91237f45a6be5ebb18f1c460a))
- **recurring:** list and get recurring items ([c23829c](https://github.com/mhriemers/lunch-money-cli/commit/c23829c56ea6ecf91237f45a6be5ebb18f1c460a))
- **summary:** budget overview command ([c23829c](https://github.com/mhriemers/lunch-money-cli/commit/c23829c56ea6ecf91237f45a6be5ebb18f1c460a))
- **tags:** list, get, create, update, and delete tags ([c23829c](https://github.com/mhriemers/lunch-money-cli/commit/c23829c56ea6ecf91237f45a6be5ebb18f1c460a))
- **transactions:** full CRUD with split, unsplit, group, ungroup, and file attachments ([c23829c](https://github.com/mhriemers/lunch-money-cli/commit/c23829c56ea6ecf91237f45a6be5ebb18f1c460a))
- **auth:** interactive authentication via `lm auth` ([c23829c](https://github.com/mhriemers/lunch-money-cli/commit/c23829c56ea6ecf91237f45a6be5ebb18f1c460a))
- support `LUNCH_MONEY_API_KEY` environment variable and `--api-key` flag ([c23829c](https://github.com/mhriemers/lunch-money-cli/commit/c23829c56ea6ecf91237f45a6be5ebb18f1c460a))
- `--json` flag for machine-readable output on all commands ([c23829c](https://github.com/mhriemers/lunch-money-cli/commit/c23829c56ea6ecf91237f45a6be5ebb18f1c460a))
- human-readable table and detail formatters ([c23829c](https://github.com/mhriemers/lunch-money-cli/commit/c23829c56ea6ecf91237f45a6be5ebb18f1c460a))
