# lunch-money-cli-core

Core library for building [lunch-money-cli](https://github.com/mhriemers/lunch-money-cli) plugins: base command, config, formatters, and API client utilities.

## Installation

```bash
npm install lunch-money-cli-core
```

## API

### `BaseCommand`

Abstract base class extending oclif's `Command` with `--json` output, structured error handling, and an `output()` helper. Use this for commands that don't need API access (e.g. `auth`).

```typescript
import { BaseCommand } from "lunch-money-cli-core";

export default class Auth extends BaseCommand {
  async run() {
    // has this.output(), --json, and error handling
    return this.output({ success: true }, "Done.");
  }
}
```

### `ApiCommand`

Extends `BaseCommand` with a global `--api-key` flag and `createClient()`. Commands parse their own flags and pass `flags["api-key"]` to `createClient()`, which falls back to the `LUNCH_MONEY_API_KEY` env var, then the saved config file.

```typescript
import { ApiCommand } from "lunch-money-cli-core";

export default class MyCommand extends ApiCommand {
  async run() {
    const { flags } = await this.parse(MyCommand);
    const client = this.createClient(flags["api-key"]);
    const data = await client.getTransactions();
    return this.output(data, formatTable(data, transactionColumns));
  }
}
```

### `createClient`

Creates a `LunchMoneyClient` instance from an API key.

```typescript
import { createClient } from "lunch-money-cli-core";

const client = createClient("your-api-key");
```

### `parseIntArg` / `parseJsonArg`

Argument parsing utilities for CLI commands.

```typescript
import { parseIntArg, parseJsonArg } from "lunch-money-cli-core";

const id = parseIntArg("123", "id"); // 123
const body = parseJsonArg('{"name": "Test"}', "body"); // { name: "Test" }
```

### Config

File-based configuration management.

```typescript
import { loadConfig, saveConfig, getConfigPath } from "lunch-money-cli-core";

const config = loadConfig(configDir);
saveConfig(configDir, { api_key: "your-key" });
```

### Formatters

Terminal-aware table and detail formatting.

```typescript
import { formatTable, formatDetail, formatMessage } from "lunch-money-cli-core";
import type { ColumnDef, FieldDef } from "lunch-money-cli-core";

const table = formatTable(rows, columns);
const detail = formatDetail(data, fields);
```

### Column & Field Definitions

Predefined column/field definitions for all Lunch Money data types:

- `accountColumns` / `accountFields`
- `categoryColumns` / `categoryFields`
- `tagColumns` / `tagFields`
- `transactionColumns` / `transactionFields`
- `plaidAccountColumns` / `plaidAccountFields`
- `recurringColumns` / `recurringFields`
- `summaryColumns`
- `userFields` / `budgetSettingsFields`

## License

MIT
