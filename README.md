# lunch-money-cli

A command-line interface for the [Lunch Money](https://lunchmoney.app) personal finance API.

## Packages

| Package | Description |
| --- | --- |
| [lunch-money-cli](./packages/cli) | CLI application (`lm` command) |
| [lunch-money-cli-core](./packages/cli-core) | Core library for building plugins |

## Quick Start

```bash
npm install -g lunch-money-cli
lm auth
lm transactions list
```

## Authentication

The CLI needs a Lunch Money API token. You can provide it in three ways (checked in this order):

1. **Interactive setup** — run `lm auth` and paste your token when prompted
2. **Environment variable** — set `LUNCH_MONEY_API_KEY`
3. **Flag** — pass `--api-key <token>` to any command

To get a token, go to [Lunch Money Developers](https://my.lunchmoney.app/developers), enter a label, and click "Request Access Token".

## Documentation

- **CLI usage & commands** — see the [lunch-money-cli README](./packages/cli/README.md)
- **Core library API** — see the [lunch-money-cli-core README](./packages/cli-core/README.md)

## License

MIT
