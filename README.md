# lunch-money-cli

A command-line interface for the [Lunch Money](https://lunchmoney.app) personal finance API.

<!-- toc -->
* [lunch-money-cli](#lunch-money-cli)
<!-- tocstop -->

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

<!-- usage -->
```sh-session
$ npm install -g lunch-money-cli
$ lm COMMAND
running command...
$ lm (--version)
lunch-money-cli/1.0.4 darwin-arm64 node-v25.6.1
$ lm --help [COMMAND]
USAGE
  $ lm COMMAND
...
```
<!-- usagestop -->

## Commands

<!-- commands -->
* [`lm accounts create`](#lm-accounts-create)
* [`lm accounts delete ID`](#lm-accounts-delete-id)
* [`lm accounts get ID`](#lm-accounts-get-id)
* [`lm accounts list`](#lm-accounts-list)
* [`lm accounts update ID`](#lm-accounts-update-id)
* [`lm auth`](#lm-auth)
* [`lm budgets delete`](#lm-budgets-delete)
* [`lm budgets settings`](#lm-budgets-settings)
* [`lm budgets upsert`](#lm-budgets-upsert)
* [`lm categories create`](#lm-categories-create)
* [`lm categories delete ID`](#lm-categories-delete-id)
* [`lm categories get ID`](#lm-categories-get-id)
* [`lm categories list`](#lm-categories-list)
* [`lm categories update ID`](#lm-categories-update-id)
* [`lm help [COMMAND]`](#lm-help-command)
* [`lm plaid-accounts get ID`](#lm-plaid-accounts-get-id)
* [`lm plaid-accounts list`](#lm-plaid-accounts-list)
* [`lm plaid-accounts sync`](#lm-plaid-accounts-sync)
* [`lm plugins`](#lm-plugins)
* [`lm plugins add PLUGIN`](#lm-plugins-add-plugin)
* [`lm plugins:inspect PLUGIN...`](#lm-pluginsinspect-plugin)
* [`lm plugins install PLUGIN`](#lm-plugins-install-plugin)
* [`lm plugins link PATH`](#lm-plugins-link-path)
* [`lm plugins remove [PLUGIN]`](#lm-plugins-remove-plugin)
* [`lm plugins reset`](#lm-plugins-reset)
* [`lm plugins uninstall [PLUGIN]`](#lm-plugins-uninstall-plugin)
* [`lm plugins unlink [PLUGIN]`](#lm-plugins-unlink-plugin)
* [`lm plugins update`](#lm-plugins-update)
* [`lm recurring get ID`](#lm-recurring-get-id)
* [`lm recurring list`](#lm-recurring-list)
* [`lm summary get`](#lm-summary-get)
* [`lm tags create`](#lm-tags-create)
* [`lm tags delete ID`](#lm-tags-delete-id)
* [`lm tags get ID`](#lm-tags-get-id)
* [`lm tags list`](#lm-tags-list)
* [`lm tags update ID`](#lm-tags-update-id)
* [`lm transactions attach-file TRANSACTION-ID`](#lm-transactions-attach-file-transaction-id)
* [`lm transactions create`](#lm-transactions-create)
* [`lm transactions delete ID`](#lm-transactions-delete-id)
* [`lm transactions delete-attachment FILE-ID`](#lm-transactions-delete-attachment-file-id)
* [`lm transactions delete-many`](#lm-transactions-delete-many)
* [`lm transactions get ID`](#lm-transactions-get-id)
* [`lm transactions get-attachment-url FILE-ID`](#lm-transactions-get-attachment-url-file-id)
* [`lm transactions group`](#lm-transactions-group)
* [`lm transactions list`](#lm-transactions-list)
* [`lm transactions split ID`](#lm-transactions-split-id)
* [`lm transactions ungroup ID`](#lm-transactions-ungroup-id)
* [`lm transactions unsplit ID`](#lm-transactions-unsplit-id)
* [`lm transactions update ID`](#lm-transactions-update-id)
* [`lm transactions update-many`](#lm-transactions-update-many)
* [`lm user me`](#lm-user-me)

## `lm accounts create`

Create a new manual account

```
USAGE
  $ lm accounts create --balance <value> --name <value> --type <value> [--json] [--balance-as-of <value>]
    [--closed-on <value>] [--currency <value>] [--custom-metadata <value>] [--display-name <value>]
    [--exclude-from-transactions] [--external-id <value>] [--institution-name <value>] [--status <value>] [--subtype
    <value>]

FLAGS
  --balance=<value>            (required) Current balance
  --balance-as-of=<value>      Date/time the balance was last updated (ISO 8601)
  --closed-on=<value>          Date the account was closed (YYYY-MM-DD or null)
  --currency=<value>           Currency code
  --custom-metadata=<value>    Custom metadata JSON
  --display-name=<value>       Display name
  --exclude-from-transactions  Exclude account from transactions
  --external-id=<value>        External ID
  --institution-name=<value>   Institution name
  --name=<value>               (required) Account name
  --status=<value>             Status: active or closed
  --subtype=<value>            Account subtype (e.g., checking, savings, brokerage, depository)
  --type=<value>               (required) Account type: cash, credit, investment, "real estate", loan, vehicle,
                               cryptocurrency, "employee compensation", "other liability", "other asset"

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Create a new manual account
```

_See code: [src/commands/accounts/create.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/accounts/create.ts)_

## `lm accounts delete ID`

Delete a manual account

```
USAGE
  $ lm accounts delete ID [--json]

ARGUMENTS
  ID  Account ID

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Delete a manual account
```

_See code: [src/commands/accounts/delete.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/accounts/delete.ts)_

## `lm accounts get ID`

Get a specific manual account

```
USAGE
  $ lm accounts get ID [--json]

ARGUMENTS
  ID  Account ID

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Get a specific manual account
```

_See code: [src/commands/accounts/get.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/accounts/get.ts)_

## `lm accounts list`

List all manual accounts

```
USAGE
  $ lm accounts list [--json]

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List all manual accounts
```

_See code: [src/commands/accounts/list.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/accounts/list.ts)_

## `lm accounts update ID`

Update a manual account

```
USAGE
  $ lm accounts update ID [--json] [--balance <value>] [--balance-as-of <value>] [--closed-on <value>] [--currency
    <value>] [--custom-metadata <value>] [--data <value>] [--display-name <value>] [--exclude-from-transactions <value>]
    [--external-id <value>] [--institution-name <value>] [--name <value>] [--status <value>] [--subtype <value>] [--type
    <value>]

ARGUMENTS
  ID  Account ID

FLAGS
  --balance=<value>                    New balance
  --balance-as-of=<value>              Date/time the balance was last updated (ISO 8601)
  --closed-on=<value>                  Date the account was closed (YYYY-MM-DD or null)
  --currency=<value>                   Currency code
  --custom-metadata=<value>            Custom metadata JSON
  --data=<value>                       Full update body as JSON (overrides other options)
  --display-name=<value>               New display name
  --exclude-from-transactions=<value>  Exclude account from transactions (true/false)
  --external-id=<value>                External ID
  --institution-name=<value>           New institution name
  --name=<value>                       New name
  --status=<value>                     Status: active or closed
  --subtype=<value>                    Account subtype (e.g., checking, savings, brokerage, depository)
  --type=<value>                       Account type: cash, credit, investment, "real estate", loan, vehicle,
                                       cryptocurrency, "employee compensation", "other liability", "other asset"

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Update a manual account
```

_See code: [src/commands/accounts/update.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/accounts/update.ts)_

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

_See code: [src/commands/auth.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/auth.ts)_

## `lm budgets delete`

Remove a budget for a category and period

```
USAGE
  $ lm budgets delete --category-id <value> --start-date <value> [--json]

FLAGS
  --category-id=<value>  (required) Category ID
  --start-date=<value>   (required) Budget period start date (YYYY-MM-DD)

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Remove a budget for a category and period
```

_See code: [src/commands/budgets/delete.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/budgets/delete.ts)_

## `lm budgets settings`

Get budget settings (period granularity, etc.)

```
USAGE
  $ lm budgets settings [--json]

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Get budget settings (period granularity, etc.)
```

_See code: [src/commands/budgets/settings.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/budgets/settings.ts)_

## `lm budgets upsert`

Create or update a budget for a category and period

```
USAGE
  $ lm budgets upsert --amount <value> --category-id <value> --start-date <value> [--json] [--currency <value>]
    [--notes <value>]

FLAGS
  --amount=<value>       (required) Budget amount
  --category-id=<value>  (required) Category ID
  --currency=<value>     Currency code
  --notes=<value>        Budget notes
  --start-date=<value>   (required) Budget period start date (YYYY-MM-DD)

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Create or update a budget for a category and period
```

_See code: [src/commands/budgets/upsert.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/budgets/upsert.ts)_

## `lm categories create`

Create a new category

```
USAGE
  $ lm categories create --name <value> [--json] [--archived] [--children <value>] [--collapsed] [--description
    <value>] [--exclude-from-budget] [--exclude-from-totals] [--group-id <value>] [--is-group] [--is-income] [--order
    <value>]

FLAGS
  --archived             Mark as archived
  --children=<value>     JSON array of child category IDs (for groups)
  --collapsed            Collapse category group
  --description=<value>  Category description
  --exclude-from-budget  Exclude from budget
  --exclude-from-totals  Exclude from totals
  --group-id=<value>     Parent category group ID
  --is-group             Create as category group
  --is-income            Mark as income category
  --name=<value>         (required) Category name
  --order=<value>        Sort order

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Create a new category
```

_See code: [src/commands/categories/create.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/categories/create.ts)_

## `lm categories delete ID`

Delete a category

```
USAGE
  $ lm categories delete ID [--json] [--force]

ARGUMENTS
  ID  Category ID

FLAGS
  --force  Force delete even with dependencies

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Delete a category
```

_See code: [src/commands/categories/delete.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/categories/delete.ts)_

## `lm categories get ID`

Get a specific category by ID

```
USAGE
  $ lm categories get ID [--json]

ARGUMENTS
  ID  Category ID

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Get a specific category by ID
```

_See code: [src/commands/categories/get.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/categories/get.ts)_

## `lm categories list`

List all categories

```
USAGE
  $ lm categories list [--json] [--flatten] [--is-group <value>]

FLAGS
  --flatten           Flatten nested category groups
  --is-group=<value>  Only return category groups (true) or non-groups (false)

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List all categories
```

_See code: [src/commands/categories/list.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/categories/list.ts)_

## `lm categories update ID`

Update an existing category

```
USAGE
  $ lm categories update ID [--json] [--archived <value>] [--children <value>] [--collapsed <value>] [--description
    <value>] [--exclude-from-budget <value>] [--exclude-from-totals <value>] [--group-id <value>] [--is-group <value>]
    [--is-income <value>] [--name <value>] [--order <value>]

ARGUMENTS
  ID  Category ID

FLAGS
  --archived=<value>             Archive status (true/false)
  --children=<value>             JSON array of child category IDs
  --collapsed=<value>            Collapse category group (true/false/null)
  --description=<value>          New description
  --exclude-from-budget=<value>  Exclude from budget (true/false)
  --exclude-from-totals=<value>  Exclude from totals (true/false)
  --group-id=<value>             Move to category group (ID or null)
  --is-group=<value>             Is category group (true/false/null)
  --is-income=<value>            Is income category (true/false)
  --name=<value>                 New name
  --order=<value>                Sort order (number or null)

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Update an existing category
```

_See code: [src/commands/categories/update.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/categories/update.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.37/src/commands/help.ts)_

## `lm plaid-accounts get ID`

Get a specific Plaid account

```
USAGE
  $ lm plaid-accounts get ID [--json]

ARGUMENTS
  ID  Plaid account ID

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Get a specific Plaid account
```

_See code: [src/commands/plaid-accounts/get.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/plaid-accounts/get.ts)_

## `lm plaid-accounts list`

List all Plaid-connected accounts

```
USAGE
  $ lm plaid-accounts list [--json]

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List all Plaid-connected accounts
```

_See code: [src/commands/plaid-accounts/list.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/plaid-accounts/list.ts)_

## `lm plaid-accounts sync`

Trigger a manual sync for Plaid accounts

```
USAGE
  $ lm plaid-accounts sync [--json] [--end-date <value>] [--plaid-account-id <value>] [--start-date <value>]

FLAGS
  --end-date=<value>          End date for the sync (YYYY-MM-DD)
  --plaid-account-id=<value>  Specific Plaid account ID to sync
  --start-date=<value>        Start date for the sync (YYYY-MM-DD)

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Trigger a manual sync for Plaid accounts
```

_See code: [src/commands/plaid-accounts/sync.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/plaid-accounts/sync.ts)_

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

Get a specific recurring item

```
USAGE
  $ lm recurring get ID [--json]

ARGUMENTS
  ID  Recurring item ID

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Get a specific recurring item
```

_See code: [src/commands/recurring/get.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/recurring/get.ts)_

## `lm recurring list`

List all recurring items

```
USAGE
  $ lm recurring list [--json] [--end-date <value>] [--start-date <value>]

FLAGS
  --end-date=<value>    End date (YYYY-MM-DD)
  --start-date=<value>  Start date (YYYY-MM-DD)

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List all recurring items
```

_See code: [src/commands/recurring/list.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/recurring/list.ts)_

## `lm summary get`

Get budget summary for a date range

```
USAGE
  $ lm summary get --end-date <value> --start-date <value> [--json] [--include-exclude-from-budgets]
    [--include-occurrences] [--include-past-budget-dates] [--include-rollover-pool] [--include-totals]

FLAGS
  --end-date=<value>              (required) End date (YYYY-MM-DD)
  --include-exclude-from-budgets  Include categories with 'Exclude from Budgets' flag
  --include-occurrences           Include occurrences array for each category
  --include-past-budget-dates     Include three prior budget occurrences (requires --include-occurrences)
  --include-rollover-pool         Include rollover pool section
  --include-totals                Include top-level totals section
  --start-date=<value>            (required) Start date (YYYY-MM-DD)

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Get budget summary for a date range
```

_See code: [src/commands/summary/get.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/summary/get.ts)_

## `lm tags create`

Create a new tag

```
USAGE
  $ lm tags create --name <value> [--json] [--archived] [--background-color <value>] [--description <value>]
    [--text-color <value>]

FLAGS
  --archived                  Mark as archived
  --background-color=<value>  Background color (hex code)
  --description=<value>       Tag description
  --name=<value>              (required) Tag name
  --text-color=<value>        Text color (hex code)

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Create a new tag
```

_See code: [src/commands/tags/create.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/tags/create.ts)_

## `lm tags delete ID`

Delete a tag

```
USAGE
  $ lm tags delete ID [--json] [--force]

ARGUMENTS
  ID  Tag ID

FLAGS
  --force  Force delete even with dependencies

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Delete a tag
```

_See code: [src/commands/tags/delete.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/tags/delete.ts)_

## `lm tags get ID`

Get a specific tag

```
USAGE
  $ lm tags get ID [--json]

ARGUMENTS
  ID  Tag ID

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Get a specific tag
```

_See code: [src/commands/tags/get.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/tags/get.ts)_

## `lm tags list`

List all tags

```
USAGE
  $ lm tags list [--json]

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List all tags
```

_See code: [src/commands/tags/list.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/tags/list.ts)_

## `lm tags update ID`

Update a tag

```
USAGE
  $ lm tags update ID [--json] [--archived <value>] [--background-color <value>] [--description <value>] [--name
    <value>] [--text-color <value>]

ARGUMENTS
  ID  Tag ID

FLAGS
  --archived=<value>          Archive status (true/false)
  --background-color=<value>  Background color (hex code or null)
  --description=<value>       New description
  --name=<value>              New name
  --text-color=<value>        Text color (hex code or null)

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Update a tag
```

_See code: [src/commands/tags/update.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/tags/update.ts)_

## `lm transactions attach-file TRANSACTION-ID`

Attach a file to a transaction

```
USAGE
  $ lm transactions attach-file TRANSACTION-ID --file <value> [--json] [--notes <value>]

ARGUMENTS
  TRANSACTION-ID  Transaction ID

FLAGS
  --file=<value>   (required) Path or URL of the file to attach
  --notes=<value>  Notes for the attachment

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Attach a file to a transaction
```

_See code: [src/commands/transactions/attach-file.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/transactions/attach-file.ts)_

## `lm transactions create`

Create one or more transactions

```
USAGE
  $ lm transactions create --transactions <value> [--json] [--apply-rules] [--skip-balance-update] [--skip-duplicates]

FLAGS
  --apply-rules           Apply account rules to new transactions
  --skip-balance-update   Don't update manual account balance
  --skip-duplicates       Skip duplicate transactions
  --transactions=<value>  (required) JSON array of transaction objects

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Create one or more transactions
```

_See code: [src/commands/transactions/create.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/transactions/create.ts)_

## `lm transactions delete ID`

Delete a single transaction

```
USAGE
  $ lm transactions delete ID [--json]

ARGUMENTS
  ID  Transaction ID

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Delete a single transaction
```

_See code: [src/commands/transactions/delete.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/transactions/delete.ts)_

## `lm transactions delete-attachment FILE-ID`

Delete a transaction attachment

```
USAGE
  $ lm transactions delete-attachment FILE-ID [--json]

ARGUMENTS
  FILE-ID  File attachment ID

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Delete a transaction attachment
```

_See code: [src/commands/transactions/delete-attachment.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/transactions/delete-attachment.ts)_

## `lm transactions delete-many`

Batch delete multiple transactions

```
USAGE
  $ lm transactions delete-many --ids <value> [--json]

FLAGS
  --ids=<value>  (required) JSON array of transaction IDs to delete

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Batch delete multiple transactions
```

_See code: [src/commands/transactions/delete-many.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/transactions/delete-many.ts)_

## `lm transactions get ID`

Get a single transaction by ID

```
USAGE
  $ lm transactions get ID [--json]

ARGUMENTS
  ID  Transaction ID

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Get a single transaction by ID
```

_See code: [src/commands/transactions/get.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/transactions/get.ts)_

## `lm transactions get-attachment-url FILE-ID`

Get download URL for a transaction attachment

```
USAGE
  $ lm transactions get-attachment-url FILE-ID [--json]

ARGUMENTS
  FILE-ID  File attachment ID

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Get download URL for a transaction attachment
```

_See code: [src/commands/transactions/get-attachment-url.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/transactions/get-attachment-url.ts)_

## `lm transactions group`

Group multiple transactions together

```
USAGE
  $ lm transactions group --data <value> [--json]

FLAGS
  --data=<value>  (required) JSON object with group details

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Group multiple transactions together
```

_See code: [src/commands/transactions/group.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/transactions/group.ts)_

## `lm transactions list`

List transactions with optional filters

```
USAGE
  $ lm transactions list [--json] [--category-id <value>] [--created-since <value>] [--end-date <value>]
    [--include-children] [--include-files] [--include-group-children] [--include-metadata] [--include-pending]
    [--include-split-parents] [--is-group-parent] [--is-pending] [--limit <value>] [--manual-account-id <value>]
    [--offset <value>] [--plaid-account-id <value>] [--recurring-id <value>] [--start-date <value>] [--status <value>]
    [--tag-id <value>] [--updated-since <value>]

FLAGS
  --category-id=<value>        Filter by category ID
  --created-since=<value>      Filter by creation date (YYYY-MM-DD or ISO 8601)
  --end-date=<value>           End date (YYYY-MM-DD)
  --include-children           Include child transactions in groups/splits
  --include-files              Include file attachment info
  --include-group-children     Include transactions that are part of groups
  --include-metadata           Include custom/plaid metadata
  --include-pending            Include pending transactions
  --include-split-parents      Include original split transactions
  --is-group-parent            Only return transaction groups
  --is-pending                 Only return pending transactions
  --limit=<value>              Max number of transactions to return
  --manual-account-id=<value>  Filter by manual account ID
  --offset=<value>             Offset for pagination
  --plaid-account-id=<value>   Filter by Plaid account ID
  --recurring-id=<value>       Filter by recurring item ID
  --start-date=<value>         Start date (YYYY-MM-DD)
  --status=<value>             Filter by status: reviewed, unreviewed, delete_pending
  --tag-id=<value>             Filter by tag ID
  --updated-since=<value>      Filter by update date (YYYY-MM-DD or ISO 8601)

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List transactions with optional filters
```

_See code: [src/commands/transactions/list.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/transactions/list.ts)_

## `lm transactions split ID`

Split a transaction into multiple parts

```
USAGE
  $ lm transactions split ID --parts <value> [--json]

ARGUMENTS
  ID  Transaction ID to split

FLAGS
  --parts=<value>  (required) JSON array of split parts [{amount, payee, date, category_id, tag_ids, notes}]

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Split a transaction into multiple parts
```

_See code: [src/commands/transactions/split.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/transactions/split.ts)_

## `lm transactions ungroup ID`

Ungroup a transaction group

```
USAGE
  $ lm transactions ungroup ID [--json]

ARGUMENTS
  ID  Transaction group ID

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Ungroup a transaction group
```

_See code: [src/commands/transactions/ungroup.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/transactions/ungroup.ts)_

## `lm transactions unsplit ID`

Reverse a transaction split

```
USAGE
  $ lm transactions unsplit ID [--json]

ARGUMENTS
  ID  Transaction ID to unsplit

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Reverse a transaction split
```

_See code: [src/commands/transactions/unsplit.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/transactions/unsplit.ts)_

## `lm transactions update ID`

Update a single transaction

```
USAGE
  $ lm transactions update ID [--json] [--additional-tag-ids <value>] [--amount <value>] [--category-id <value>]
    [--currency <value>] [--custom-metadata <value>] [--data <value>] [--date <value>] [--external-id <value>]
    [--manual-account-id <value>] [--notes <value>] [--original-name <value>] [--payee <value>] [--plaid-account-id
    <value>] [--recurring-id <value>] [--status <value>] [--tag-ids <value>]

ARGUMENTS
  ID  Transaction ID

FLAGS
  --additional-tag-ids=<value>  JSON array of additional tag IDs to add
  --amount=<value>              Transaction amount
  --category-id=<value>         Category ID
  --currency=<value>            Currency code
  --custom-metadata=<value>     Custom metadata JSON
  --data=<value>                Full update body as JSON (overrides other options)
  --date=<value>                Transaction date (YYYY-MM-DD)
  --external-id=<value>         External ID
  --manual-account-id=<value>   Manual account ID
  --notes=<value>               Transaction notes
  --original-name=<value>       Original transaction name
  --payee=<value>               Payee name
  --plaid-account-id=<value>    Plaid account ID
  --recurring-id=<value>        Recurring item ID
  --status=<value>              Status: reviewed or unreviewed
  --tag-ids=<value>             JSON array of tag IDs

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Update a single transaction
```

_See code: [src/commands/transactions/update.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/transactions/update.ts)_

## `lm transactions update-many`

Batch update multiple transactions

```
USAGE
  $ lm transactions update-many --transactions <value> [--json]

FLAGS
  --transactions=<value>  (required) JSON array of transaction updates (each must have id)

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Batch update multiple transactions
```

_See code: [src/commands/transactions/update-many.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/transactions/update-many.ts)_

## `lm user me`

Get current user profile

```
USAGE
  $ lm user me [--json]

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Get current user profile
```

_See code: [src/commands/user/me.ts](https://github.com/mhriemers/lunch-money-cli/blob/v1.0.4/src/commands/user/me.ts)_
<!-- commandsstop -->

## Global Flags

All commands support:

- `--json` — Output raw JSON instead of formatted tables
- `--api-key <token>` — Provide API token inline
- `--help` — Show help for a command

## API Documentation

This CLI wraps the [Lunch Money API](https://lunchmoney.dev). See their docs for details on available fields and behavior.

## License

[MIT](LICENSE)
