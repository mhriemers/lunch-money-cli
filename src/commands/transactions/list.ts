import { Flags } from "@oclif/core";
import { BaseCommand } from "../../base-command.js";
import { formatTable } from "../../formatters.js";
import { transactionColumns } from "../../columns.js";
import type { GetAllTransactionsParams } from "@lunch-money/lunch-money-js-v2";

export default class TransactionsList extends BaseCommand {
  static override description = "List transactions with optional filters";

  static override flags = {
    "start-date": Flags.string({ description: "Start date (YYYY-MM-DD)" }),
    "end-date": Flags.string({ description: "End date (YYYY-MM-DD)" }),
    "category-id": Flags.integer({ description: "Filter by category ID" }),
    "manual-account-id": Flags.integer({ description: "Filter by manual account ID" }),
    "plaid-account-id": Flags.integer({ description: "Filter by Plaid account ID" }),
    "recurring-id": Flags.integer({ description: "Filter by recurring item ID" }),
    "tag-id": Flags.integer({ description: "Filter by tag ID" }),
    status: Flags.string({ description: "Filter by status: reviewed, unreviewed, delete_pending" }),
    "is-pending": Flags.boolean({ description: "Only return pending transactions" }),
    "include-pending": Flags.boolean({ description: "Include pending transactions" }),
    "is-group-parent": Flags.boolean({ description: "Only return transaction groups" }),
    "include-children": Flags.boolean({ description: "Include child transactions in groups/splits" }),
    "include-group-children": Flags.boolean({ description: "Include transactions that are part of groups" }),
    "include-split-parents": Flags.boolean({ description: "Include original split transactions" }),
    "include-metadata": Flags.boolean({ description: "Include custom/plaid metadata" }),
    "include-files": Flags.boolean({ description: "Include file attachment info" }),
    "created-since": Flags.string({ description: "Filter by creation date (YYYY-MM-DD or ISO 8601)" }),
    "updated-since": Flags.string({ description: "Filter by update date (YYYY-MM-DD or ISO 8601)" }),
    limit: Flags.integer({ description: "Max number of transactions to return" }),
    offset: Flags.integer({ description: "Offset for pagination" }),
  };

  async run(): Promise<unknown> {
    const { flags } = await this.parse(TransactionsList);
    const client = this.createClient();
    const params: GetAllTransactionsParams = {};
    if (flags["start-date"]) params.start_date = flags["start-date"];
    if (flags["end-date"]) params.end_date = flags["end-date"];
    if (flags["category-id"]) params.category_id = flags["category-id"];
    if (flags["manual-account-id"]) params.manual_account_id = flags["manual-account-id"];
    if (flags["plaid-account-id"]) params.plaid_account_id = flags["plaid-account-id"];
    if (flags["recurring-id"]) params.recurring_id = flags["recurring-id"];
    if (flags["tag-id"]) params.tag_id = flags["tag-id"];
    if (flags.status) params.status = flags.status as "reviewed" | "unreviewed" | "delete_pending";
    if (flags["is-pending"]) params.is_pending = true;
    if (flags["include-pending"]) params.include_pending = true;
    if (flags["is-group-parent"]) params.is_group_parent = true;
    if (flags["include-children"]) params.include_children = true;
    if (flags["include-group-children"]) params.include_group_children = true;
    if (flags["include-split-parents"]) params.include_split_parents = true;
    if (flags["include-metadata"]) params.include_metadata = true;
    if (flags["include-files"]) params.include_files = true;
    if (flags["created-since"]) params.created_since = flags["created-since"];
    if (flags["updated-since"]) params.updated_since = flags["updated-since"];
    if (flags.limit) params.limit = flags.limit;
    if (flags.offset) params.offset = flags.offset;
    const result = await client.transactions.getAll(params);
    const r = result as unknown as { transactions: Record<string, unknown>[]; hasMore?: boolean; has_more?: boolean };
    let formatted = formatTable(r.transactions ?? [], transactionColumns);
    if (r.hasMore || r.has_more) formatted += "\n(more results available — use --offset to paginate)";
    return this.output(result, formatted);
  }
}
