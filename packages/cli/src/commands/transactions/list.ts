import type { GetAllTransactionsParams } from "@lunch-money/lunch-money-js-v2";

import { Flags } from "@oclif/core";
import { ApiCommand, buildBody, type FieldMapping, formatTable, transactionColumns } from "lunch-money-cli-core";

const fieldMappings: FieldMapping[] = [
  { flag: "category-id" },
  { flag: "created-since" },
  { flag: "end-date" },
  { flag: "include-children" },
  { flag: "include-files" },
  { flag: "include-group-children" },
  { flag: "include-metadata" },
  { flag: "include-pending" },
  { flag: "include-split-parents" },
  { flag: "is-group-parent" },
  { flag: "is-pending" },
  { flag: "limit" },
  { flag: "manual-account-id" },
  { flag: "offset" },
  { flag: "plaid-account-id" },
  { flag: "recurring-id" },
  { flag: "start-date" },
  { flag: "status" },
  { flag: "tag-id" },
  { flag: "updated-since" },
];

export default class TransactionsList extends ApiCommand {
  static override description =
    "Retrieve transactions with optional filters. Returns most recent transactions up to --limit (default 1000, max 2000). Use --offset for pagination when hasMore is true.";
  static override flags = {
    "category-id": Flags.integer({
      description:
        "Filter by category ID. Also matches category groups. Set to 0 for uncategorized transactions only. (integer)",
    }),
    "created-since": Flags.string({
      description:
        "Filter to transactions created after this timestamp. Accepts YYYY-MM-DD or ISO 8601 datetime. Date-only values are interpreted as midnight UTC.",
    }),
    "end-date": Flags.string({ description: "End of date range (YYYY-MM-DD). Required if --start-date is set." }),
    "include-children": Flags.boolean({
      description: "Populate the 'children' property with transactions that make up a group or split. Default: false.",
    }),
    "include-files": Flags.boolean({
      description: "Include the 'files' property with attachment details for each transaction. Default: false.",
    }),
    "include-group-children": Flags.boolean({
      description:
        "Include individual transactions that are part of a transaction group. Normally hidden after grouping. Default: false.",
    }),
    "include-metadata": Flags.boolean({
      description: "Include plaid_metadata and custom_metadata fields in response. Default: false.",
    }),
    "include-pending": Flags.boolean({
      description:
        "Include pending (not yet posted) transactions in results. Ignored if --is-pending is also set. Default: false.",
    }),
    "include-split-parents": Flags.boolean({
      description:
        "Include parent transactions that were split. These are normally hidden after splitting. Use with caution. Default: false.",
    }),
    "is-group-parent": Flags.boolean({
      description: "If set, only return transaction groups (where is_group_parent is true)",
    }),
    "is-pending": Flags.boolean({
      description:
        "Filter by pending status. Takes precedence over --include-pending. Pending transactions always have status 'unreviewed'.",
    }),
    limit: Flags.integer({
      description:
        "Maximum number of transactions to return (1-2000, default 1000). Response includes hasMore=true if more are available.",
    }),
    "manual-account-id": Flags.integer({
      description:
        "Filter by manual account ID. Set to 0 to exclude manual account transactions. Setting both this and --plaid-account-id to 0 returns cash transactions. (integer)",
    }),
    offset: Flags.integer({ description: "Number of records to skip for pagination (integer)" }),
    "plaid-account-id": Flags.integer({
      description:
        "Filter by Plaid account ID. Set to 0 to exclude Plaid account transactions. Setting both this and --manual-account-id to 0 returns cash transactions. (integer)",
    }),
    "recurring-id": Flags.integer({ description: "Filter to transactions matching this recurring item ID (integer)" }),
    "start-date": Flags.string({ description: "Start of date range (YYYY-MM-DD). Required if --end-date is set." }),
    status: Flags.string({
      description:
        "Filter by status. Allowed values: 'reviewed' (user reviewed or auto-reviewed via recurring item), 'unreviewed' (needs review), 'delete_pending' (deleted by synced account after user update)",
    }),
    "tag-id": Flags.integer({ description: "Filter to transactions that have this tag ID (integer)" }),
    "updated-since": Flags.string({
      description:
        "Filter to transactions updated after this timestamp. Accepts YYYY-MM-DD or ISO 8601 datetime. Date-only values are interpreted as midnight UTC.",
    }),
  };

  async run(): Promise<unknown> {
    const { flags } = await this.parse(TransactionsList);
    const client = this.createClient(flags["api-key"]);
    const parameters = buildBody<GetAllTransactionsParams>(flags, fieldMappings);
    const result = await client.transactions.getAll(parameters);
    let formatted = formatTable(result.transactions as Record<string, unknown>[], transactionColumns);
    if (result.hasMore) formatted += "\n(more results available — use --offset to paginate)";
    return this.output(result, formatted);
  }
}
