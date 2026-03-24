import type { GetAllTransactionsParams } from "@lunch-money/lunch-money-js-v2";

import { Flags } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";
import { transactionColumns } from "../../columns.js";
import { formatTable } from "../../formatters.js";

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
  static override description = "List transactions with optional filters";
static override flags = {
    "category-id": Flags.integer({ description: "Filter by category ID" }),
    "created-since": Flags.string({ description: "Filter by creation date (YYYY-MM-DD or ISO 8601)" }),
    "end-date": Flags.string({ description: "End date (YYYY-MM-DD)" }),
    "include-children": Flags.boolean({ description: "Include child transactions in groups/splits" }),
    "include-files": Flags.boolean({ description: "Include file attachment info" }),
    "include-group-children": Flags.boolean({ description: "Include transactions that are part of groups" }),
    "include-metadata": Flags.boolean({ description: "Include custom/plaid metadata" }),
    "include-pending": Flags.boolean({ description: "Include pending transactions" }),
    "include-split-parents": Flags.boolean({ description: "Include original split transactions" }),
    "is-group-parent": Flags.boolean({ description: "Only return transaction groups" }),
    "is-pending": Flags.boolean({ description: "Only return pending transactions" }),
    limit: Flags.integer({ description: "Max number of transactions to return" }),
    "manual-account-id": Flags.integer({ description: "Filter by manual account ID" }),
    offset: Flags.integer({ description: "Offset for pagination" }),
    "plaid-account-id": Flags.integer({ description: "Filter by Plaid account ID" }),
    "recurring-id": Flags.integer({ description: "Filter by recurring item ID" }),
    "start-date": Flags.string({ description: "Start date (YYYY-MM-DD)" }),
    status: Flags.string({ description: "Filter by status: reviewed, unreviewed, delete_pending" }),
    "tag-id": Flags.integer({ description: "Filter by tag ID" }),
    "updated-since": Flags.string({ description: "Filter by update date (YYYY-MM-DD or ISO 8601)" }),
  };

  async run(): Promise<unknown> {
    const { flags } = await this.parse(TransactionsList);
    const client = this.createClient();
    const params = buildParams(flags);
    const result = await client.transactions.getAll(params);
    const r = result as unknown as { has_more?: boolean; hasMore?: boolean; transactions: Record<string, unknown>[]; };
    let formatted = formatTable(r.transactions ?? [], transactionColumns);
    if (r.hasMore || r.has_more) formatted += "\n(more results available — use --offset to paginate)";
    return this.output(result, formatted);
  }
}
