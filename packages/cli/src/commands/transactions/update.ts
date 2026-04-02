import type { Currency, UpdateTransactionBody } from "@lunch-money/lunch-money-js-v2";

import { Args, Flags } from "@oclif/core";
import { ApiCommand, parseJsonArg } from "lunch-money-cli-core";

export default class TransactionsUpdate extends ApiCommand {
  static override args = {
    id: Args.integer({ description: "Unique identifier of the transaction to update (integer)", required: true }),
  };
  static override description =
    "Update properties of an existing transaction. Only provided fields are updated. Split or grouped transactions cannot be modified; use split/unsplit/group/ungroup commands instead.";
  static override flags = {
    "additional-tag-ids": Flags.string({
      description: "JSON array of tag IDs (integers) to add to existing tags. Cannot be used with --tag-ids.",
    }),
    amount: Flags.string({
      description:
        "Numeric amount without currency symbol (e.g. '4.25'). Positive=debit, negative=credit. May not be updated on locked synced accounts.",
    }),
    "category-id": Flags.integer({ description: "Category ID to assign, or use --data with null to clear (integer)" }),
    currency: Flags.string({ description: "Three-letter lowercase currency code in ISO 4217 format (e.g. 'usd')" }),
    "custom-metadata": Flags.string({
      description: "JSON object with additional transaction data. Max 4096 characters when stringified.",
    }),
    data: Flags.string({
      description:
        "Full update request body as a JSON string. When provided, all other flags are ignored. Must conform to the transaction update schema.",
    }),
    date: Flags.string({ description: "Transaction date in ISO 8601 format (YYYY-MM-DD)" }),
    "external-id": Flags.string({
      description:
        "User-defined external ID (max 75 characters). Transaction must have a manual_account_id. Must be unique per account.",
    }),
    "manual-account-id": Flags.integer({
      description:
        "Manual account ID to associate. Set to null via --data to disassociate. Cannot be set together with plaid-account-id. (integer)",
    }),
    notes: Flags.string({ description: "Transaction notes (max 350 characters). Set to empty string to clear." }),
    "original-name": Flags.string({
      description: "Original payee name from source. Cannot be changed (ignored if set).",
    }),
    payee: Flags.string({ description: "Payee name (max 140 characters)" }),
    "plaid-account-id": Flags.integer({
      description:
        "Plaid account ID to associate. Account must allow transaction modifications. Cannot be set together with manual-account-id. (integer)",
    }),
    "recurring-id": Flags.integer({ description: "ID of the associated recurring item (integer)" }),
    status: Flags.string({ description: "Transaction status. Allowed values: 'reviewed', 'unreviewed'" }),
    "tag-ids": Flags.string({
      description:
        "JSON array of tag IDs (integers). Overwrites all existing tags. Cannot be used with --additional-tag-ids. Set to '[]' to remove all tags.",
    }),
  };

  async run(): Promise<unknown> {
    const { args, flags } = await this.parse(TransactionsUpdate);
    const client = this.createClient(flags["api-key"]);
    let data: UpdateTransactionBody;
    if (flags.data) {
      data = parseJsonArg(flags.data, "data") as UpdateTransactionBody;
    } else {
      data = {};
      if (flags.date) data.date = flags.date;
      if (flags.amount) data.amount = flags.amount;
      if (flags.payee) data.payee = flags.payee;
      if (flags["category-id"]) data.category_id = flags["category-id"];
      if (flags.notes !== undefined) data.notes = flags.notes;
      if (flags.currency) data.currency = flags.currency as Currency;
      if (flags.status) data.status = flags.status as "reviewed" | "unreviewed";
      if (flags["tag-ids"]) data.tag_ids = parseJsonArg(flags["tag-ids"], "tag-ids") as number[];
      if (flags["additional-tag-ids"])
        data.additional_tag_ids = parseJsonArg(flags["additional-tag-ids"], "additional-tag-ids") as number[];
      if (flags["external-id"]) data.external_id = flags["external-id"];
      if (flags["recurring-id"]) data.recurring_id = flags["recurring-id"];
      if (flags["original-name"]) data.original_name = flags["original-name"];
      if (flags["manual-account-id"]) data.manual_account_id = flags["manual-account-id"];
      if (flags["plaid-account-id"]) data.plaid_account_id = flags["plaid-account-id"];
      if (flags["custom-metadata"])
        data.custom_metadata = parseJsonArg(flags["custom-metadata"], "custom-metadata") as Record<string, never>;
    }

    const tx = await client.transactions.update(args.id, data);
    return this.output(tx, `Updated transaction ${args.id}.`);
  }
}
