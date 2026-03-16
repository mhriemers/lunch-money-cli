# lunch-money-cli

A command-line interface for the [Lunch Money](https://lunchmoney.app) personal finance API.

## Installation

```bash
npm install -g lunch-money-cli
```

## Authentication

The CLI needs a Lunch Money API token. You can provide it in three ways (checked in this order):

1. **Interactive setup** — run `lm auth` and paste your token when prompted
2. **Environment variable** — set `LUNCH_MONEY_API_KEY`
3. **Flag** — pass `--api-key <token>` to any command

To get a token, go to [Lunch Money Developers](https://my.lunchmoney.app/developers), enter a label, and click "Request Access Token".

## Usage

```bash
# List all manual accounts
lm accounts list

# Get a specific transaction
lm transactions get 123456

# Create a new category
lm categories create --name "Groceries"

# View your user profile
lm user me

# Any command supports JSON output
lm accounts list --json
```

## Commands

### Accounts

| Command | Description |
|---------|-------------|
| `lm accounts list` | List all manual accounts |
| `lm accounts get ID` | Get a single account |
| `lm accounts create` | Create a manual account |
| `lm accounts update ID` | Update an account |
| `lm accounts delete ID` | Delete an account |

### Budgets

| Command | Description |
|---------|-------------|
| `lm budgets settings` | View budget settings |
| `lm budgets upsert` | Create or update a budget |
| `lm budgets delete` | Delete a budget |

### Categories

| Command | Description |
|---------|-------------|
| `lm categories list` | List all categories |
| `lm categories get ID` | Get a single category |
| `lm categories create` | Create a category |
| `lm categories update ID` | Update a category |
| `lm categories delete ID` | Delete a category |

### Plaid Accounts

| Command | Description |
|---------|-------------|
| `lm plaid-accounts list` | List all Plaid accounts |
| `lm plaid-accounts get ID` | Get a single Plaid account |
| `lm plaid-accounts sync` | Trigger a Plaid sync |

### Recurring

| Command | Description |
|---------|-------------|
| `lm recurring list` | List recurring items |
| `lm recurring get ID` | Get a single recurring item |

### Summary

| Command | Description |
|---------|-------------|
| `lm summary get` | Get a budget summary |

### Tags

| Command | Description |
|---------|-------------|
| `lm tags list` | List all tags |
| `lm tags get ID` | Get a single tag |
| `lm tags create` | Create a tag |
| `lm tags update ID` | Update a tag |
| `lm tags delete ID` | Delete a tag |

### Transactions

| Command | Description |
|---------|-------------|
| `lm transactions list` | List transactions |
| `lm transactions get ID` | Get a single transaction |
| `lm transactions create` | Create a transaction |
| `lm transactions update ID` | Update a transaction |
| `lm transactions update-many` | Update multiple transactions |
| `lm transactions delete ID` | Delete a transaction |
| `lm transactions delete-many` | Delete multiple transactions |
| `lm transactions split ID` | Split a transaction |
| `lm transactions unsplit ID` | Unsplit a transaction |
| `lm transactions group` | Group transactions |
| `lm transactions ungroup ID` | Ungroup transactions |
| `lm transactions attach-file ID` | Attach a file to a transaction |
| `lm transactions get-attachment-url ID` | Get attachment URL |
| `lm transactions delete-attachment ID` | Delete an attachment |

### User

| Command | Description |
|---------|-------------|
| `lm user me` | View your profile |

### Auth

| Command | Description |
|---------|-------------|
| `lm auth` | Save your API token |

## Global Flags

All commands support:

- `--json` — Output raw JSON instead of formatted tables
- `--api-key <token>` — Provide API token inline
- `--help` — Show help for a command

## API Documentation

This CLI wraps the [Lunch Money API](https://lunchmoney.dev). See their docs for details on available fields and behavior.

## License

[MIT](LICENSE)
