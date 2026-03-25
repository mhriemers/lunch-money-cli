import type { GetAllTransactionsParams } from "@lunch-money/lunch-money-js-v2";

import { Flags } from "@oclif/core";
import { BaseCommand, formatTable, transactionColumns } from "lunch-money-cli-core";

const flagParamMap: Record<string, string> = {
  "category-id": "category_id",
  "created-since": "created_since",
  "end-date": "end_date",
  "include-children": "include_children",
  "include-files": "include_files",
  "include-group-children": "include_group_children",
  "include-metadata": "include_metadata",
  "include-pending": "include_pending",
  "include-split-parents": "include_split_parents",
  "is-group-parent": "is_group_parent",
  "is-pending": "is_pending",
  limit: "limit",
  "manual-account-id": "manual_account_id",
  offset: "offset",
  "plaid-account-id": "plaid_account_id",
  "recurring-id": "recurring_id",
  "start-date": "start_date",
  status: "status",
  "tag-id": "tag_id",
  "updated-since": "updated_since",
};

function buildParams(flags: Record<string, unknown>): GetAllTransactionsParams {
  const params: Record<string, unknown> = {};
  for (const [flag, param] of Object.entries(flagParamMap)) {
    if (flags[flag] !== undefined) params[param] = flags[flag];
  }

  return params as GetAllTransactionsParams;
}

export default class TransactionsList extends BaseCommand {
  static override description =
    "Retrieve transactions with optional filters. Returns most recent transactions up to --limit (default 1000, max 2000). Use --offset for pagination when has_more is true.";
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
        "Maximum number of transactions to return (1-2000, default 1000). Response includes has_more=true if more are available.",
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
    const client = this.createClient();
    const params = buildParams(flags);
    const result = await client.transactions.getAll(params);
    const r = result as unknown as { has_more?: boolean; hasMore?: boolean; transactions: Record<string, unknown>[] };
    let formatted = formatTable(r.transactions ?? [], transactionColumns);
    if (r.hasMore || r.has_more) formatted += "\n(more results available — use --offset to paginate)";
    return this.output(result, formatted);
  }
}
