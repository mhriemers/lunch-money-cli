# Changelog

## [2.0.0](https://github.com/mhriemers/lunch-money-cli/compare/lunch-money-cli-core-v1.0.0...lunch-money-cli-core-v2.0.0) (2026-03-25)

### ⚠ BREAKING CHANGES

- BaseCommand no longer provides createClient() or --api-key flag. Use ApiCommand for commands that need API access. setApiKey and the init hook have been removed.

### Bug Fixes

- add per-package READMEs and changelogs for npm ([#45](https://github.com/mhriemers/lunch-money-cli/issues/45)) ([6272ac0](https://github.com/mhriemers/lunch-money-cli/commit/6272ac04e72bb9c2e4643534a3cf1aab59cc6baf))

### Code Refactoring

- declare --api-key as oclif flag, split BaseCommand/ApiCommand ([#48](https://github.com/mhriemers/lunch-money-cli/issues/48)) ([3f5910a](https://github.com/mhriemers/lunch-money-cli/commit/3f5910a485e8c2942885d51e9e666378ae8a5e8a))

## 1.0.0 (2026-03-24)

### ⚠ BREAKING CHANGES

- package internals restructured into monorepo layout. The public API (exports from lunch-money-cli) is preserved via re-exports.

### Features

- restructure into monorepo with lunch-money-cli-core base library ([#30](https://github.com/mhriemers/lunch-money-cli/issues/30)) ([8fd51c6](https://github.com/mhriemers/lunch-money-cli/commit/8fd51c6628131a0f202abf8bafb6fd8ad3ecc81f))
