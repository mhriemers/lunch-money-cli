# lunch-money-cli-core

Core library for building [lunch-money-cli](https://github.com/mhriemers/lunch-money-cli) plugins: base command, config, formatters, and API client utilities.

## Installation

```bash
npm install lunch-money-cli-core
```

## API

### `BaseCommand`

Abstract base class extending oclif's `Command` with built-in error handling, JSON output support, and API client creation.

```typescript
import { BaseCommand } from "lunch-money-cli-core";

export default class MyCommand extends BaseCommand {
  async run() {
    const client = this.createClient();
    const data = await client.getTransactions();
    this.output(formatTable(data, transactionColumns));
    return data;
  }
}
```

### `createClient` / `setApiKey`

Global API key management and client creation.

```typescript
import { setApiKey, createClient } from "lunch-money-cli-core";

setApiKey("your-api-key");
const client = createClient();
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

### Init Hook

Oclif init hook that resolves the API key from (in priority order): `--api-key` flag, `LUNCH_MONEY_API_KEY` env var, or config file.

```typescript
import { initHook } from "lunch-money-cli-core";
```

## License

MIT
