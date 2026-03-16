# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-03-16

### Added

- Account management commands (list, get, create, update, delete)
- Budget commands (settings, upsert, delete)
- Category management commands (list, get, create, update, delete)
- Plaid account commands (list, get, sync)
- Recurring item commands (list, get)
- Summary command for budget overviews
- Tag management commands (list, get, create, update, delete)
- Transaction commands (list, get, create, update, update-many, delete, delete-many, split, unsplit, group, ungroup, attach-file, get-attachment-url, delete-attachment)
- User profile command
- Interactive authentication via `lm auth`
- Support for `LUNCH_MONEY_API_KEY` environment variable
- `--api-key` flag for inline token usage
- `--json` flag for machine-readable output on all commands
- Human-readable table and detail formatters
