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

## Global Flags

All commands support:

- `--json` — Output raw JSON instead of formatted tables
- `--api-key <token>` — Provide API token inline
- `--help` — Show help for a command

## Commands

<!-- commands -->

- [`lm accounts create`](#lm-accounts-create)
- [`lm accounts delete ID`](#lm-accounts-delete-id)
- [`lm accounts get ID`](#lm-accounts-get-id)
- [`lm accounts list`](#lm-accounts-list)
- [`lm accounts update ID`](#lm-accounts-update-id)
- [`lm auth`](#lm-auth)
- [`lm budgets delete`](#lm-budgets-delete)
- [`lm budgets settings`](#lm-budgets-settings)
- [`lm budgets upsert`](#lm-budgets-upsert)
- [`lm categories create`](#lm-categories-create)
- [`lm categories delete ID`](#lm-categories-delete-id)
- [`lm categories get ID`](#lm-categories-get-id)
- [`lm categories list`](#lm-categories-list)
- [`lm categories update ID`](#lm-categories-update-id)
- [`lm help [COMMAND]`](#lm-help-command)
- [`lm plaid-accounts get ID`](#lm-plaid-accounts-get-id)
- [`lm plaid-accounts list`](#lm-plaid-accounts-list)
- [`lm plaid-accounts sync`](#lm-plaid-accounts-sync)
- [`lm plugins`](#lm-plugins)
- [`lm plugins add PLUGIN`](#lm-plugins-add-plugin)
- [`lm plugins:inspect PLUGIN...`](#lm-pluginsinspect-plugin)
- [`lm plugins install PLUGIN`](#lm-plugins-install-plugin)
- [`lm plugins link PATH`](#lm-plugins-link-path)
- [`lm plugins remove [PLUGIN]`](#lm-plugins-remove-plugin)
- [`lm plugins reset`](#lm-plugins-reset)
- [`lm plugins uninstall [PLUGIN]`](#lm-plugins-uninstall-plugin)
- [`lm plugins unlink [PLUGIN]`](#lm-plugins-unlink-plugin)
- [`lm plugins update`](#lm-plugins-update)
- [`lm recurring get ID`](#lm-recurring-get-id)
- [`lm recurring list`](#lm-recurring-list)
- [`lm summary get`](#lm-summary-get)
- [`lm tags create`](#lm-tags-create)
- [`lm tags delete ID`](#lm-tags-delete-id)
- [`lm tags get ID`](#lm-tags-get-id)
- [`lm tags list`](#lm-tags-list)
- [`lm tags update ID`](#lm-tags-update-id)
- [`lm transactions attach-file TRANSACTION-ID`](#lm-transactions-attach-file-transaction-id)
- [`lm transactions create`](#lm-transactions-create)
- [`lm transactions delete ID`](#lm-transactions-delete-id)
- [`lm transactions delete-attachment FILE-ID`](#lm-transactions-delete-attachment-file-id)
- [`lm transactions delete-many`](#lm-transactions-delete-many)
- [`lm transactions get ID`](#lm-transactions-get-id)
- [`lm transactions get-attachment-url FILE-ID`](#lm-transactions-get-attachment-url-file-id)
- [`lm transactions group`](#lm-transactions-group)
- [`lm transactions list`](#lm-transactions-list)
- [`lm transactions split ID`](#lm-transactions-split-id)
- [`lm transactions ungroup ID`](#lm-transactions-ungroup-id)
- [`lm transactions unsplit ID`](#lm-transactions-unsplit-id)
- [`lm transactions update ID`](#lm-transactions-update-id)
- [`lm transactions update-many`](#lm-transactions-update-many)
- [`lm user me`](#lm-user-me)

## `lm accounts create`

Create a new manually-managed account. Requires name, type, and balance at minimum.

```
USAGE
  $ lm accounts create --balance <value> --name <value> --type <value> [--json] [--api-key <value>] [--balance-as-of
    <value>] [--closed-on <value>] [--currency <value>] [--custom-metadata <value>] [--display-name <value>]
    [--exclude-from-transactions] [--external-id <value>] [--institution-name <value>] [--status <value>] [--subtype
    <value>]

FLAGS
  --balance=<value>            (required) Current balance as a numeric string up to 4 decimal places (e.g. '195.50'). Do
                               not include currency symbols.
  --balance-as-of=<value>      Date/time the balance was last updated in ISO 8601 format. Accepts date (YYYY-MM-DD) or
                               datetime string.
  --closed-on=<value>          Date the account was closed (YYYY-MM-DD format or 'null'). If set, --status must also be
                               'closed'.
  --currency=<value>           Three-letter lowercase currency code in ISO 4217 format (e.g. 'usd', 'eur'). Defaults to
                               account's primary currency.
  --custom-metadata=<value>    JSON object with additional account data. Must be valid JSON and not exceed 4096
                               characters when stringified. Example: '{"key": "value"}'
  --display-name=<value>       Display name for the account. Must be unique across all manual accounts. If not set,
                               derived from institution_name and name.
  --exclude-from-transactions  If set, transactions may not be assigned to this manual account
  --external-id=<value>        Optional user-defined ID for the account (max 75 characters)
  --institution-name=<value>   Name of institution holding the account (1-50 characters)
  --name=<value>               (required) Name of the manual account (1-45 characters)
  --status=<value>             Account status. Allowed values: 'active' (default), 'closed'
  --subtype=<value>            Optional account subtype (1-100 characters). Examples: retirement, checking, savings,
                               'prepaid credit card'
  --type=<value>               (required) Primary account type. Allowed values: cash, credit, cryptocurrency, 'employee
                               compensation', investment, loan, 'other liability', 'other asset', 'real estate', vehicle

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Create a new manually-managed account. Requires name, type, and balance at minimum.
```

_See code: [src/commands/accounts/create.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/accounts/create.ts)_

## `lm accounts delete ID`

Delete a manually-managed account. If transactions exist for this account, they will show a warning in the web view.

```
USAGE
  $ lm accounts delete ID [--json] [--api-key <value>]

ARGUMENTS
  ID  Unique identifier of the manual account to delete (integer)

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Delete a manually-managed account. If transactions exist for this account, they will show a warning in the web view.
```

_See code: [src/commands/accounts/delete.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/accounts/delete.ts)_

## `lm accounts get ID`

Retrieve details of a specific manually-managed account by its ID

```
USAGE
  $ lm accounts get ID [--json] [--api-key <value>]

ARGUMENTS
  ID  Unique identifier of the manual account to retrieve (integer)

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Retrieve details of a specific manually-managed account by its ID
```

_See code: [src/commands/accounts/get.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/accounts/get.ts)_

## `lm accounts list`

Retrieve a list of all manually-managed accounts (not synced via Plaid) associated with the user's account

```
USAGE
  $ lm accounts list [--json] [--api-key <value>]

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Retrieve a list of all manually-managed accounts (not synced via Plaid) associated with the user's account
```

_See code: [src/commands/accounts/list.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/accounts/list.ts)_

## `lm accounts update ID`

Update properties of an existing manually-managed account. Only provided fields are updated; omitted fields remain unchanged.

```
USAGE
  $ lm accounts update ID [--json] [--api-key <value>] [--balance <value>] [--balance-as-of <value>] [--closed-on
    <value>] [--currency <value>] [--custom-metadata <value>] [--data <value>] [--display-name <value>]
    [--exclude-from-transactions <value>] [--external-id <value>] [--institution-name <value>] [--name <value>]
    [--status <value>] [--subtype <value>] [--type <value>]

ARGUMENTS
  ID  Unique identifier of the manual account to update (integer)

FLAGS
  --balance=<value>                    New balance as a numeric string up to 4 decimal places (e.g. '195.50'). Do not
                                       include currency symbols.
  --balance-as-of=<value>              Date/time for the balance update in ISO 8601 format. Ignored if --balance is not
                                       also set. Defaults to current time when --balance is provided.
  --closed-on=<value>                  Date the account was closed (YYYY-MM-DD format or 'null'). If updating a
                                       non-closed account, --status must also be set to 'closed'.
  --currency=<value>                   New three-letter lowercase currency code in ISO 4217 format (e.g. 'usd', 'eur')
  --custom-metadata=<value>            JSON object with additional account data. Must be valid JSON, max 4096 characters
                                       when stringified. Example: '{"key": "value"}'
  --data=<value>                       Full update request body as a JSON string. When provided, all other flags are
                                       ignored. Must conform to the manual account update schema.
  --display-name=<value>               New display name for the account. Must be unique across all manual accounts.
  --exclude-from-transactions=<value>  Whether transactions may be assigned to this account ('true' or 'false')
  --external-id=<value>                Optional user-defined ID for the account (max 75 characters)
  --institution-name=<value>           New institution name (1-50 characters)
  --name=<value>                       New name for the account (1-45 characters)
  --status=<value>                     Account status. Allowed values: 'active', 'closed'. If set to 'closed', the
                                       closed_on date defaults to today unless also specified.
  --subtype=<value>                    New account subtype (1-100 characters). Examples: retirement, checking, savings,
                                       'prepaid credit card'
  --type=<value>                       New primary account type. Allowed values: cash, credit, cryptocurrency, 'employee
                                       compensation', investment, loan, 'other liability', 'other asset', 'real estate',
                                       vehicle

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Update properties of an existing manually-managed account. Only provided fields are updated; omitted fields remain
  unchanged.
```

_See code: [src/commands/accounts/update.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/accounts/update.ts)_

## `lm auth`

Authenticate with Lunch Money by saving your API token

```
USAGE
  $ lm auth [--json]

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Authenticate with Lunch Money by saving your API token
```

_See code: [src/commands/auth.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/auth.ts)_

## `lm budgets delete`

Remove a budget entry for a specific category and budget period start date

```
USAGE
  $ lm budgets delete --category-id <value> --start-date <value> [--json] [--api-key <value>]

FLAGS
  --category-id=<value>  (required) ID of the category whose budget should be removed (integer)
  --start-date=<value>   (required) Start date of the budget period to remove (YYYY-MM-DD). Must be a valid budget
                         period start date.

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Remove a budget entry for a specific category and budget period start date
```

_See code: [src/commands/budgets/delete.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/budgets/delete.ts)_

## `lm budgets settings`

Retrieve budget period and display settings for the account, including granularity (week/month/twice a month), quantity, anchor date, and display preferences

```
USAGE
  $ lm budgets settings [--json] [--api-key <value>]

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Retrieve budget period and display settings for the account, including granularity (week/month/twice a month),
  quantity, anchor date, and display preferences
```

_See code: [src/commands/budgets/settings.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/budgets/settings.ts)_

## `lm budgets upsert`

Create or update a budget for a category and period. If a budget exists for the given start_date and category_id, it is updated; otherwise a new one is created. The start_date must be a valid budget period start for the account.

```
USAGE
  $ lm budgets upsert --amount <value> --category-id <value> --start-date <value> [--json] [--api-key <value>]
    [--currency <value>] [--notes <value>]

FLAGS
  --amount=<value>       (required) Budget amount as a number or numeric string (e.g. '500' or '250.50')
  --category-id=<value>  (required) ID of the category this budget applies to (integer)
  --currency=<value>     Three-letter lowercase currency code in ISO 4217 format. Defaults to account's primary currency
                         if omitted.
  --notes=<value>        Optional notes for the budget period (max 350 characters)
  --start-date=<value>   (required) Start date of the budget period (YYYY-MM-DD). Must be a valid budget period start
                         date for the account. Use 'lm budgets settings' to check period configuration.

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Create or update a budget for a category and period. If a budget exists for the given start_date and category_id, it
  is updated; otherwise a new one is created. The start_date must be a valid budget period start for the account.
```

_See code: [src/commands/budgets/upsert.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/budgets/upsert.ts)_

## `lm categories create`

Create a new category or category group. Set --is-group to create a category group, optionally with --children to assign existing categories to it.

```
USAGE
  $ lm categories create --name <value> [--json] [--api-key <value>] [--archived] [--children <value>] [--collapsed]
    [--description <value>] [--exclude-from-budget] [--exclude-from-totals] [--group-id <value>] [--is-group]
    [--is-income] [--order <value>]

FLAGS
  --archived             If set, the category is archived and hidden in the Lunch Money app
  --children=<value>     JSON array of category IDs (integers) or new category names (strings) to add to the group. Only
                         valid when --is-group is set. Example: '[123, 456]' or '[123, "New Category"]'
  --collapsed            If set, the category group appears collapsed in the Lunch Money app
  --description=<value>  Description of the category (max 200 characters)
  --exclude-from-budget  If set, transactions in this category will be excluded from the budget
  --exclude-from-totals  If set, transactions in this category will be excluded from totals
  --group-id=<value>     ID of an existing category group to assign this new category to. Cannot be set if --is-group is
                         also set. (integer)
  --is-group             If set, creates a category group instead of a regular category
  --is-income            If set, transactions in this category will be treated as income
  --name=<value>         (required) Name of the new category (1-100 characters). Must not match any existing category or
                         category group name.
  --order=<value>        Display position index on the categories page (integer). Null-order categories appear
                         alphabetically after ordered ones.

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Create a new category or category group. Set --is-group to create a category group, optionally with --children to
  assign existing categories to it.
```

_See code: [src/commands/categories/create.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/categories/create.ts)_

## `lm categories delete ID`

Delete a category or category group. Fails if dependencies exist (budgets, transactions, rules, children, recurring items) unless --force is set.

```
USAGE
  $ lm categories delete ID [--json] [--api-key <value>] [--force]

ARGUMENTS
  ID  Unique identifier of the category to delete (integer)

FLAGS
  --force  Force deletion even if there are dependent budgets, transactions, rules, children, or recurring items

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Delete a category or category group. Fails if dependencies exist (budgets, transactions, rules, children, recurring
  items) unless --force is set.
```

_See code: [src/commands/categories/delete.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/categories/delete.ts)_

## `lm categories get ID`

Retrieve details of a specific category or category group by its ID. For category groups, the response includes child categories in the 'children' property.

```
USAGE
  $ lm categories get ID [--json] [--api-key <value>]

ARGUMENTS
  ID  Unique identifier of the category to retrieve (integer)

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Retrieve details of a specific category or category group by its ID. For category groups, the response includes child
  categories in the 'children' property.
```

_See code: [src/commands/categories/get.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/categories/get.ts)_

## `lm categories list`

Retrieve a list of all categories associated with the user's account. Returns nested category groups by default.

```
USAGE
  $ lm categories list [--json] [--api-key <value>] [--flatten] [--is-group <value>]

FLAGS
  --flatten           Return a flattened list instead of nested category groups. Categories are sorted by their order;
                      null-order categories appear alphabetically after ordered ones.
  --is-group=<value>  Filter by group status. If 'true', only category groups are returned. If 'false', only non-group
                      categories are returned. Overrides --flatten when set.

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Retrieve a list of all categories associated with the user's account. Returns nested category groups by default.
```

_See code: [src/commands/categories/list.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/categories/list.ts)_

## `lm categories update ID`

Update properties of an existing category or category group. Only provided fields are updated; omitted fields remain unchanged.

```
USAGE
  $ lm categories update ID [--json] [--api-key <value>] [--archived <value>] [--children <value>] [--collapsed
    <value>] [--description <value>] [--exclude-from-budget <value>] [--exclude-from-totals <value>] [--group-id
    <value>] [--is-group <value>] [--is-income <value>] [--name <value>] [--order <value>]

ARGUMENTS
  ID  Unique identifier of the category to update (integer)

FLAGS
  --archived=<value>             Whether the category is archived ('true' or 'false')
  --children=<value>             JSON array of category IDs (integers) or new category names (strings) to set as
                                 children. Replaces existing children. Only valid for category groups. Example: '[123,
                                 456]'
  --collapsed=<value>            Whether the category group appears collapsed in the Lunch Money app ('true', 'false',
                                 or 'null')
  --description=<value>          New description for the category (max 200 characters). Pass empty string to clear.
  --exclude-from-budget=<value>  Whether transactions in this category are excluded from the budget ('true' or 'false')
  --exclude-from-totals=<value>  Whether transactions in this category are excluded from totals ('true' or 'false')
  --group-id=<value>             ID of a category group to move this category into, or 'null' to remove from a group
                                 (integer or 'null')
  --is-group=<value>             Cannot be used to convert between category and category group. Must match current
                                 status. ('true', 'false', or 'null')
  --is-income=<value>            Whether transactions in this category are treated as income ('true' or 'false')
  --name=<value>                 New name for the category (1-100 characters)
  --order=<value>                Display position index (integer or 'null'). Position is relative to other categories in
                                 the same group.

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Update properties of an existing category or category group. Only provided fields are updated; omitted fields remain
  unchanged.
```

_See code: [src/commands/categories/update.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/categories/update.ts)_

## `lm help [COMMAND]`

Display help for lm.

```
USAGE
  $ lm help [COMMAND...] [-n]

ARGUMENTS
  [COMMAND...]  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for lm.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/6.2.40/src/commands/help.ts)_

## `lm plaid-accounts get ID`

Retrieve details of a specific Plaid-synced account by its ID

```
USAGE
  $ lm plaid-accounts get ID [--json] [--api-key <value>]

ARGUMENTS
  ID  Unique identifier of the Plaid account to retrieve (integer)

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Retrieve details of a specific Plaid-synced account by its ID
```

_See code: [src/commands/plaid-accounts/get.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/plaid-accounts/get.ts)_

## `lm plaid-accounts list`

Retrieve a list of all accounts synced via Plaid associated with the user's account

```
USAGE
  $ lm plaid-accounts list [--json] [--api-key <value>]

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Retrieve a list of all accounts synced via Plaid associated with the user's account
```

_See code: [src/commands/plaid-accounts/list.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/plaid-accounts/list.ts)_

## `lm plaid-accounts sync`

Trigger a fetch for latest data from Plaid. Returns 202 on success. Rate limited to once per minute. Fetching is a background job; track results via plaid_last_successful_update, last_fetch, and last_import fields.

```
USAGE
  $ lm plaid-accounts sync [--json] [--api-key <value>] [--end-date <value>] [--plaid-account-id <value>] [--start-date
    <value>]

FLAGS
  --end-date=<value>          End of the date range to fetch transactions for (YYYY-MM-DD). Required if --start-date is
                              set.
  --plaid-account-id=<value>  Specific Plaid account ID to fetch. If not set, triggers a fetch for all eligible
                              accounts. (integer)
  --start-date=<value>        Start of the date range to fetch transactions for (YYYY-MM-DD). Required if --end-date is
                              set.

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Trigger a fetch for latest data from Plaid. Returns 202 on success. Rate limited to once per minute. Fetching is a
  background job; track results via plaid_last_successful_update, last_fetch, and last_import fields.
```

_See code: [src/commands/plaid-accounts/sync.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/plaid-accounts/sync.ts)_

## `lm plugins`

List installed plugins.

```
USAGE
  $ lm plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ lm plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.58/src/commands/plugins/index.ts)_

## `lm plugins add PLUGIN`

Installs a plugin into lm.

```
USAGE
  $ lm plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into lm.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the LM_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the LM_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ lm plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ lm plugins add myplugin

  Install a plugin from a github url.

    $ lm plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ lm plugins add someuser/someplugin
```

## `lm plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ lm plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ lm plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.58/src/commands/plugins/inspect.ts)_

## `lm plugins install PLUGIN`

Installs a plugin into lm.

```
USAGE
  $ lm plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into lm.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the LM_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the LM_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ lm plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ lm plugins install myplugin

  Install a plugin from a github url.

    $ lm plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ lm plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.58/src/commands/plugins/install.ts)_

## `lm plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ lm plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ lm plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.58/src/commands/plugins/link.ts)_

## `lm plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ lm plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  [PLUGIN...]  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ lm plugins unlink
  $ lm plugins remove

EXAMPLES
  $ lm plugins remove myplugin
```

## `lm plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ lm plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.58/src/commands/plugins/reset.ts)_

## `lm plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ lm plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  [PLUGIN...]  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ lm plugins unlink
  $ lm plugins remove

EXAMPLES
  $ lm plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.58/src/commands/plugins/uninstall.ts)_

## `lm plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ lm plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  [PLUGIN...]  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ lm plugins unlink
  $ lm plugins remove

EXAMPLES
  $ lm plugins unlink myplugin
```

## `lm plugins update`

Update installed plugins.

```
USAGE
  $ lm plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.58/src/commands/plugins/update.ts)_

## `lm recurring get ID`

Retrieve details of a specific recurring item by its ID, including transaction criteria, overrides, and match information

```
USAGE
  $ lm recurring get ID [--json] [--api-key <value>]

ARGUMENTS
  ID  Unique identifier of the recurring item to retrieve (integer)

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Retrieve details of a specific recurring item by its ID, including transaction criteria, overrides, and match
  information
```

_See code: [src/commands/recurring/get.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/recurring/get.ts)_

## `lm recurring list`

Retrieve all recurring items. The optional date range controls which period is used to populate the 'matches' field showing expected vs found transactions.

```
USAGE
  $ lm recurring list [--json] [--api-key <value>] [--end-date <value>] [--start-date <value>]

FLAGS
  --end-date=<value>    End of date range for populating the matches field (YYYY-MM-DD). Required if --start-date is
                        set.
  --start-date=<value>  Start of date range for populating the matches field (YYYY-MM-DD). Defaults to current month if
                        omitted. Required if --end-date is set.

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Retrieve all recurring items. The optional date range controls which period is used to populate the 'matches' field
  showing expected vs found transactions.
```

_See code: [src/commands/recurring/list.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/recurring/list.ts)_

## `lm summary get`

Retrieve a summary of the user's budget for a date range. For aligned date ranges (matching budget period boundaries), includes budgeted and available amounts per category.

```
USAGE
  $ lm summary get --end-date <value> --start-date <value> [--json] [--api-key <value>]
    [--include-exclude-from-budgets] [--include-occurrences] [--include-past-budget-dates] [--include-rollover-pool]
    [--include-totals]

FLAGS
  --end-date=<value>              (required) End of date range in ISO 8601 format (YYYY-MM-DD). For aligned responses,
                                  use the last day of a budget period.
  --include-exclude-from-budgets  Include categories that have the 'Exclude from Budgets' flag set in the returned
                                  categories array
  --include-occurrences           Include an 'occurrences' array for each category with per-period budget details
                                  (activity, budgeted amount, notes). Only populated for aligned responses.
  --include-past-budget-dates     Include the three budget periods prior to the start date in the occurrences array.
                                  Requires --include-occurrences to also be set.
  --include-rollover-pool         Include a 'rollover_pool' section with the current rollover pool balance and all
                                  previous adjustments
  --include-totals                Include a top-level 'totals' section summarizing inflow and outflow across all
                                  transactions for the date range
  --start-date=<value>            (required) Start of date range in ISO 8601 format (YYYY-MM-DD). For aligned responses,
                                  use the first day of a budget period.

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Retrieve a summary of the user's budget for a date range. For aligned date ranges (matching budget period boundaries),
  includes budgeted and available amounts per category.
```

_See code: [src/commands/summary/get.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/summary/get.ts)_

## `lm tags create`

Create a new tag. Tag name must be unique.

```
USAGE
  $ lm tags create --name <value> [--json] [--api-key <value>] [--archived] [--background-color <value>]
    [--description <value>] [--text-color <value>]

FLAGS
  --archived                  If set, the tag is archived and hidden when creating/updating transactions in the app
  --background-color=<value>  Background color as a hex code (e.g. 'FFE7D4')
  --description=<value>       Description of the tag (max 200 characters)
  --name=<value>              (required) Name of the new tag (1-100 characters). Must not match any existing tag name.
  --text-color=<value>        Text color as a hex code (e.g. '333')

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Create a new tag. Tag name must be unique.
```

_See code: [src/commands/tags/create.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/tags/create.ts)_

## `lm tags delete ID`

Delete a tag. Fails if transactions or rules depend on it unless --force is set.

```
USAGE
  $ lm tags delete ID [--json] [--api-key <value>] [--force]

ARGUMENTS
  ID  Unique identifier of the tag to delete (integer)

FLAGS
  --force  Force deletion even if transactions or rules depend on this tag

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Delete a tag. Fails if transactions or rules depend on it unless --force is set.
```

_See code: [src/commands/tags/delete.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/tags/delete.ts)_

## `lm tags get ID`

Retrieve details of a specific tag by its ID

```
USAGE
  $ lm tags get ID [--json] [--api-key <value>]

ARGUMENTS
  ID  Unique identifier of the tag to retrieve (integer)

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Retrieve details of a specific tag by its ID
```

_See code: [src/commands/tags/get.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/tags/get.ts)_

## `lm tags list`

Retrieve a list of all tags associated with the user's account

```
USAGE
  $ lm tags list [--json] [--api-key <value>]

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Retrieve a list of all tags associated with the user's account
```

_See code: [src/commands/tags/list.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/tags/list.ts)_

## `lm tags update ID`

Update properties of an existing tag. Only provided fields are updated; omitted fields remain unchanged.

```
USAGE
  $ lm tags update ID [--json] [--api-key <value>] [--archived <value>] [--background-color <value>]
    [--description <value>] [--name <value>] [--text-color <value>]

ARGUMENTS
  ID  Unique identifier of the tag to update (integer)

FLAGS
  --archived=<value>          Whether the tag is archived ('true' or 'false')
  --background-color=<value>  Background color as a hex code or 'null' to clear (e.g. 'FFE7D4' or 'null')
  --description=<value>       New description for the tag (max 200 characters)
  --name=<value>              New name for the tag (1-100 characters)
  --text-color=<value>        Text color as a hex code or 'null' to clear (e.g. '333' or 'null')

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Update properties of an existing tag. Only provided fields are updated; omitted fields remain unchanged.
```

_See code: [src/commands/tags/update.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/tags/update.ts)_

## `lm transactions attach-file TRANSACTION-ID`

Attach a file to a transaction. File must be under 10MB. Allowed types: image/jpeg, image/png, application/pdf, image/heic, image/heif.

```
USAGE
  $ lm transactions attach-file TRANSACTION-ID --file <value> [--json] [--api-key <value>] [--notes <value>]

ARGUMENTS
  TRANSACTION-ID  Unique identifier of the transaction to attach the file to (integer)

FLAGS
  --file=<value>   (required) Path to the local file or URL to attach. Must be under 10MB. Allowed types: JPEG, PNG,
                   PDF, HEIC, HEIF.
  --notes=<value>  Optional notes about the file attachment

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Attach a file to a transaction. File must be under 10MB. Allowed types: image/jpeg, image/png, application/pdf,
  image/heic, image/heif.
```

_See code: [src/commands/transactions/attach-file.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/transactions/attach-file.ts)_

## `lm transactions create`

Insert one or more transactions (1-500 per request). Returns created transactions and any skipped duplicates.

```
USAGE
  $ lm transactions create --transactions <value> [--json] [--api-key <value>] [--apply-rules] [--skip-balance-update]
    [--skip-duplicates]

FLAGS
  --apply-rules
      If set, account rules associated with each transaction's manual_account_id will be applied

  --skip-balance-update
      If set, manual account balances will not be updated when transactions are inserted

  --skip-duplicates
      If set, skip transactions matching an existing transaction's date, payee, amount, and account. Deduplication by
      external_id always occurs regardless.

  --transactions=<value>
      (required) JSON array of transaction objects (1-500). Each requires 'date' (YYYY-MM-DD) and 'amount' (numeric,
      positive=debit, negative=credit). Optional fields: payee (string, max 140 chars), category_id (integer), currency
      (3-letter ISO 4217 code), notes (max 350 chars), status ('reviewed'|'unreviewed'), tag_ids (integer array),
      manual_account_id, plaid_account_id, external_id (max 75 chars), custom_metadata (JSON object, max 4096 chars),
      recurring_id, original_name. Example: '[{"date":"2024-01-15","amount":42.50,"payee":"Coffee Shop"}]'

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Insert one or more transactions (1-500 per request). Returns created transactions and any skipped duplicates.
```

_See code: [src/commands/transactions/create.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/transactions/create.ts)_

## `lm transactions delete ID`

Delete a transaction by ID. Split or grouped transactions must be unsplit/ungrouped first. This action is not reversible.

```
USAGE
  $ lm transactions delete ID [--json] [--api-key <value>]

ARGUMENTS
  ID  Unique identifier of the transaction to delete (integer)

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Delete a transaction by ID. Split or grouped transactions must be unsplit/ungrouped first. This action is not
  reversible.
```

_See code: [src/commands/transactions/delete.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/transactions/delete.ts)_

## `lm transactions delete-attachment FILE-ID`

Delete a file attachment from a transaction

```
USAGE
  $ lm transactions delete-attachment FILE-ID [--json] [--api-key <value>]

ARGUMENTS
  FILE-ID  Unique identifier of the file attachment to delete (integer)

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Delete a file attachment from a transaction
```

_See code: [src/commands/transactions/delete-attachment.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/transactions/delete-attachment.ts)_

## `lm transactions delete-many`

Delete multiple transactions in a single request. This action is not reversible.

```
USAGE
  $ lm transactions delete-many --ids <value> [--json] [--api-key <value>]

FLAGS
  --ids=<value>  (required) JSON array of transaction IDs to delete (integers). Example: '[123, 456, 789]'

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Delete multiple transactions in a single request. This action is not reversible.
```

_See code: [src/commands/transactions/delete-many.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/transactions/delete-many.ts)_

## `lm transactions get ID`

Retrieve a single transaction by ID. Includes plaid_metadata, custom_metadata, and files fields. For group/split parents, also includes children.

```
USAGE
  $ lm transactions get ID [--json] [--api-key <value>]

ARGUMENTS
  ID  Unique identifier of the transaction to retrieve (integer)

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Retrieve a single transaction by ID. Includes plaid_metadata, custom_metadata, and files fields. For group/split
  parents, also includes children.
```

_See code: [src/commands/transactions/get.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/transactions/get.ts)_

## `lm transactions get-attachment-url FILE-ID`

Get a signed download URL for a transaction file attachment. The URL expires after a limited time.

```
USAGE
  $ lm transactions get-attachment-url FILE-ID [--json] [--api-key <value>]

ARGUMENTS
  FILE-ID  Unique identifier of the file attachment to download (integer)

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Get a signed download URL for a transaction file attachment. The URL expires after a limited time.
```

_See code: [src/commands/transactions/get-attachment-url.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/transactions/get-attachment-url.ts)_

## `lm transactions group`

Group existing transactions into a single grouped transaction. The grouped transaction amount equals the sum of its children. Original transactions are hidden after grouping.

```
USAGE
  $ lm transactions group --data <value> [--json] [--api-key <value>]

FLAGS
  --data=<value>  (required) JSON object with group details. Required fields: 'ids' (array of 2-500 transaction IDs),
                  'date' (YYYY-MM-DD), 'payee' (string, max 140 chars). Optional: category_id (integer), notes (max 350
                  chars), status ('reviewed'|'unreviewed', default 'reviewed'), tag_ids (integer array). Example:
                  '{"ids":[123,456],"date":"2024-01-15","payee":"Grouped"}'

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Group existing transactions into a single grouped transaction. The grouped transaction amount equals the sum of its
  children. Original transactions are hidden after grouping.
```

_See code: [src/commands/transactions/group.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/transactions/group.ts)_

## `lm transactions list`

Retrieve transactions with optional filters. Returns most recent transactions up to --limit (default 1000, max 2000). Use --offset for pagination when has_more is true.

```
USAGE
  $ lm transactions list [--json] [--api-key <value>] [--category-id <value>] [--created-since <value>] [--end-date
    <value>] [--include-children] [--include-files] [--include-group-children] [--include-metadata] [--include-pending]
    [--include-split-parents] [--is-group-parent] [--is-pending] [--limit <value>] [--manual-account-id <value>]
    [--offset <value>] [--plaid-account-id <value>] [--recurring-id <value>] [--start-date <value>] [--status <value>]
    [--tag-id <value>] [--updated-since <value>]

FLAGS
  --category-id=<value>        Filter by category ID. Also matches category groups. Set to 0 for uncategorized
                               transactions only. (integer)
  --created-since=<value>      Filter to transactions created after this timestamp. Accepts YYYY-MM-DD or ISO 8601
                               datetime. Date-only values are interpreted as midnight UTC.
  --end-date=<value>           End of date range (YYYY-MM-DD). Required if --start-date is set.
  --include-children           Populate the 'children' property with transactions that make up a group or split.
                               Default: false.
  --include-files              Include the 'files' property with attachment details for each transaction. Default:
                               false.
  --include-group-children     Include individual transactions that are part of a transaction group. Normally hidden
                               after grouping. Default: false.
  --include-metadata           Include plaid_metadata and custom_metadata fields in response. Default: false.
  --include-pending            Include pending (not yet posted) transactions in results. Ignored if --is-pending is also
                               set. Default: false.
  --include-split-parents      Include parent transactions that were split. These are normally hidden after splitting.
                               Use with caution. Default: false.
  --is-group-parent            If set, only return transaction groups (where is_group_parent is true)
  --is-pending                 Filter by pending status. Takes precedence over --include-pending. Pending transactions
                               always have status 'unreviewed'.
  --limit=<value>              Maximum number of transactions to return (1-2000, default 1000). Response includes
                               has_more=true if more are available.
  --manual-account-id=<value>  Filter by manual account ID. Set to 0 to exclude manual account transactions. Setting
                               both this and --plaid-account-id to 0 returns cash transactions. (integer)
  --offset=<value>             Number of records to skip for pagination (integer)
  --plaid-account-id=<value>   Filter by Plaid account ID. Set to 0 to exclude Plaid account transactions. Setting both
                               this and --manual-account-id to 0 returns cash transactions. (integer)
  --recurring-id=<value>       Filter to transactions matching this recurring item ID (integer)
  --start-date=<value>         Start of date range (YYYY-MM-DD). Required if --end-date is set.
  --status=<value>             Filter by status. Allowed values: 'reviewed' (user reviewed or auto-reviewed via
                               recurring item), 'unreviewed' (needs review), 'delete_pending' (deleted by synced account
                               after user update)
  --tag-id=<value>             Filter to transactions that have this tag ID (integer)
  --updated-since=<value>      Filter to transactions updated after this timestamp. Accepts YYYY-MM-DD or ISO 8601
                               datetime. Date-only values are interpreted as midnight UTC.

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Retrieve transactions with optional filters. Returns most recent transactions up to --limit (default 1000, max 2000).
  Use --offset for pagination when has_more is true.
```

_See code: [src/commands/transactions/list.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/transactions/list.ts)_

## `lm transactions split ID`

Split a transaction into child transactions. The sum of child amounts must equal the parent amount. After splitting, the parent is hidden and children are shown instead.

```
USAGE
  $ lm transactions split ID --parts <value> [--json] [--api-key <value>]

ARGUMENTS
  ID  Unique identifier of the transaction to split (integer). Cannot be a recurring, grouped, or already-split
      transaction.

FLAGS
  --parts=<value>  (required) JSON array of child transaction objects (2-500). Each requires 'amount' (numeric, must sum
                   to parent amount). Optional fields per child: payee (max 140 chars, inherits from parent), date
                   (YYYY-MM-DD, inherits from parent), category_id (integer, inherits from parent), tag_ids (integer
                   array), notes (max 350 chars, inherits from parent). Example: '[{"amount":25.00,"payee":"Split
                   1"},{"amount":17.45,"payee":"Split 2"}]'

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Split a transaction into child transactions. The sum of child amounts must equal the parent amount. After splitting,
  the parent is hidden and children are shown instead.
```

_See code: [src/commands/transactions/split.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/transactions/split.ts)_

## `lm transactions ungroup ID`

Delete a transaction group and restore the original transactions to their normal ungrouped state

```
USAGE
  $ lm transactions ungroup ID [--json] [--api-key <value>]

ARGUMENTS
  ID  Unique identifier of the transaction group to ungroup (integer). Must be a transaction where is_group_parent is
      true.

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Delete a transaction group and restore the original transactions to their normal ungrouped state
```

_See code: [src/commands/transactions/ungroup.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/transactions/ungroup.ts)_

## `lm transactions unsplit ID`

Reverse a previously split transaction. Deletes the split children and restores the parent to its normal unsplit state.

```
USAGE
  $ lm transactions unsplit ID [--json] [--api-key <value>]

ARGUMENTS
  ID  The split_parent_id of the split transaction to restore (integer)

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Reverse a previously split transaction. Deletes the split children and restores the parent to its normal unsplit
  state.
```

_See code: [src/commands/transactions/unsplit.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/transactions/unsplit.ts)_

## `lm transactions update ID`

Update properties of an existing transaction. Only provided fields are updated. Split or grouped transactions cannot be modified; use split/unsplit/group/ungroup commands instead.

```
USAGE
  $ lm transactions update ID [--json] [--api-key <value>] [--additional-tag-ids <value>] [--amount <value>]
    [--category-id <value>] [--currency <value>] [--custom-metadata <value>] [--data <value>] [--date <value>]
    [--external-id <value>] [--manual-account-id <value>] [--notes <value>] [--original-name <value>] [--payee <value>]
    [--plaid-account-id <value>] [--recurring-id <value>] [--status <value>] [--tag-ids <value>]

ARGUMENTS
  ID  Unique identifier of the transaction to update (integer)

FLAGS
  --additional-tag-ids=<value>  JSON array of tag IDs (integers) to add to existing tags. Cannot be used with --tag-ids.
  --amount=<value>              Numeric amount without currency symbol (e.g. '4.25'). Positive=debit, negative=credit.
                                May not be updated on locked synced accounts.
  --category-id=<value>         Category ID to assign, or use --data with null to clear (integer)
  --currency=<value>            Three-letter lowercase currency code in ISO 4217 format (e.g. 'usd')
  --custom-metadata=<value>     JSON object with additional transaction data. Max 4096 characters when stringified.
  --data=<value>                Full update request body as a JSON string. When provided, all other flags are ignored.
                                Must conform to the transaction update schema.
  --date=<value>                Transaction date in ISO 8601 format (YYYY-MM-DD)
  --external-id=<value>         User-defined external ID (max 75 characters). Transaction must have a manual_account_id.
                                Must be unique per account.
  --manual-account-id=<value>   Manual account ID to associate. Set to null via --data to disassociate. Cannot be set
                                together with plaid-account-id. (integer)
  --notes=<value>               Transaction notes (max 350 characters). Set to empty string to clear.
  --original-name=<value>       Original payee name from source. Cannot be changed (ignored if set).
  --payee=<value>               Payee name (max 140 characters)
  --plaid-account-id=<value>    Plaid account ID to associate. Account must allow transaction modifications. Cannot be
                                set together with manual-account-id. (integer)
  --recurring-id=<value>        ID of the associated recurring item (integer)
  --status=<value>              Transaction status. Allowed values: 'reviewed', 'unreviewed'
  --tag-ids=<value>             JSON array of tag IDs (integers). Overwrites all existing tags. Cannot be used with
                                --additional-tag-ids. Set to '[]' to remove all tags.

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Update properties of an existing transaction. Only provided fields are updated. Split or grouped transactions cannot
  be modified; use split/unsplit/group/ungroup commands instead.
```

_See code: [src/commands/transactions/update.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/transactions/update.ts)_

## `lm transactions update-many`

Update multiple transactions in a single request (1-500). Each transaction object must include an 'id' field plus at least one field to update.

```
USAGE
  $ lm transactions update-many --transactions <value> [--json] [--api-key <value>]

FLAGS
  --transactions=<value>  (required) JSON array of transaction update objects (1-500). Each must have 'id' (integer) and
                          at least one updatable field. Updatable fields: date, amount, payee, category_id, notes,
                          currency, status, tag_ids, additional_tag_ids, external_id, custom_metadata, recurring_id,
                          manual_account_id, plaid_account_id. Example:
                          '[{"id":123,"category_id":456},{"id":789,"status":"reviewed"}]'

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Update multiple transactions in a single request (1-500). Each transaction object must include an 'id' field plus at
  least one field to update.
```

_See code: [src/commands/transactions/update-many.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/transactions/update-many.ts)_

## `lm user me`

Get details about the user associated with the API token, including name, email, account ID, budget name, and primary currency

```
USAGE
  $ lm user me [--json] [--api-key <value>]

GLOBAL FLAGS
  --api-key=<value>  Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)
  --json             Format output as json.

DESCRIPTION
  Get details about the user associated with the API token, including name, email, account ID, budget name, and primary
  currency
```

_See code: [src/commands/user/me.ts](https://github.com/mhriemers/lunch-money-cli/blob/lunch-money-cli-v2.1.0/packages/cli/src/commands/user/me.ts)_

<!-- commandsstop -->

## API Documentation

This CLI wraps the [Lunch Money API](https://lunchmoney.dev). See their docs for details on available fields and behavior.

## License

[MIT](LICENSE)
