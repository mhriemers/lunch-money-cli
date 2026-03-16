# Changelog

## [1.0.2](https://github.com/mhriemers/lunch-money-cli/compare/v1.0.1...v1.0.2) (2026-03-16)


### Bug Fixes

* upgrade to Node 24 for npm OIDC publish ([#9](https://github.com/mhriemers/lunch-money-cli/issues/9)) ([ae85a5d](https://github.com/mhriemers/lunch-money-cli/commit/ae85a5dbbeba4d2d3592756a09b073e079e33b2a))

## [1.0.1](https://github.com/mhriemers/lunch-money-cli/compare/v1.0.0...v1.0.1) (2026-03-16)


### Bug Fixes

* add include-component-in-tag to match existing tag format ([#7](https://github.com/mhriemers/lunch-money-cli/issues/7)) ([40e46f4](https://github.com/mhriemers/lunch-money-cli/commit/40e46f40e0017384caa225da63d2249a32588575))
* combine release-please and publish into single workflow ([#2](https://github.com/mhriemers/lunch-money-cli/issues/2)) ([42c4ed3](https://github.com/mhriemers/lunch-money-cli/commit/42c4ed38302e80222c2a87dbcf7854ab8879faea))
* use PAT for release-please to trigger CI on release PRs ([#8](https://github.com/mhriemers/lunch-money-cli/issues/8)) ([e9e7d08](https://github.com/mhriemers/lunch-money-cli/commit/e9e7d0892a5689be036b00daea690c0121cb4f15))
* use release-please-config.json instead of workflow-level release-type ([#6](https://github.com/mhriemers/lunch-money-cli/issues/6)) ([d3c759d](https://github.com/mhriemers/lunch-money-cli/commit/d3c759d613267192fe297d5dd5a905e8a60e5101))

## 1.0.0 (2026-03-16)

### Features

* **accounts:** list, get, create, update, and delete accounts ([c23829c](https://github.com/mhriemers/lunch-money-cli/commit/c23829c56ea6ecf91237f45a6be5ebb18f1c460a))
* **budgets:** get settings, upsert, and delete budgets ([c23829c](https://github.com/mhriemers/lunch-money-cli/commit/c23829c56ea6ecf91237f45a6be5ebb18f1c460a))
* **categories:** list, get, create, update, and delete categories ([c23829c](https://github.com/mhriemers/lunch-money-cli/commit/c23829c56ea6ecf91237f45a6be5ebb18f1c460a))
* **plaid-accounts:** list, get, and sync Plaid accounts ([c23829c](https://github.com/mhriemers/lunch-money-cli/commit/c23829c56ea6ecf91237f45a6be5ebb18f1c460a))
* **recurring:** list and get recurring items ([c23829c](https://github.com/mhriemers/lunch-money-cli/commit/c23829c56ea6ecf91237f45a6be5ebb18f1c460a))
* **summary:** budget overview command ([c23829c](https://github.com/mhriemers/lunch-money-cli/commit/c23829c56ea6ecf91237f45a6be5ebb18f1c460a))
* **tags:** list, get, create, update, and delete tags ([c23829c](https://github.com/mhriemers/lunch-money-cli/commit/c23829c56ea6ecf91237f45a6be5ebb18f1c460a))
* **transactions:** full CRUD with split, unsplit, group, ungroup, and file attachments ([c23829c](https://github.com/mhriemers/lunch-money-cli/commit/c23829c56ea6ecf91237f45a6be5ebb18f1c460a))
* **auth:** interactive authentication via `lm auth` ([c23829c](https://github.com/mhriemers/lunch-money-cli/commit/c23829c56ea6ecf91237f45a6be5ebb18f1c460a))
* support `LUNCH_MONEY_API_KEY` environment variable and `--api-key` flag ([c23829c](https://github.com/mhriemers/lunch-money-cli/commit/c23829c56ea6ecf91237f45a6be5ebb18f1c460a))
* `--json` flag for machine-readable output on all commands ([c23829c](https://github.com/mhriemers/lunch-money-cli/commit/c23829c56ea6ecf91237f45a6be5ebb18f1c460a))
* human-readable table and detail formatters ([c23829c](https://github.com/mhriemers/lunch-money-cli/commit/c23829c56ea6ecf91237f45a6be5ebb18f1c460a))
