import type { Currency, UpdateTransactionBody } from "@lunch-money/lunch-money-js-v2";

import { Args, Flags } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";
import { parseJsonArg } from "../../client.js";

export default class TransactionsUpdate extends BaseCommand {
  static override args = {
    id: Args.integer({ description: "Transaction ID", required: true }),
  };
static override description = "Update a single transaction";
static override flags = {
    "additional-tag-ids": Flags.string({ description: "JSON array of additional tag IDs to add" }),
    amount: Flags.string({ description: "Transaction amount" }),
    "category-id": Flags.integer({ description: "Category ID" }),
    currency: Flags.string({ description: "Currency code" }),
    "custom-metadata": Flags.string({ description: "Custom metadata JSON" }),
    data: Flags.string({ description: "Full update body as JSON (overrides other options)" }),
    date: Flags.string({ description: "Transaction date (YYYY-MM-DD)" }),
    "external-id": Flags.string({ description: "External ID" }),
    "manual-account-id": Flags.integer({ description: "Manual account ID" }),
    notes: Flags.string({ description: "Transaction notes" }),
    "original-name": Flags.string({ description: "Original transaction name" }),
    payee: Flags.string({ description: "Payee name" }),
    "plaid-account-id": Flags.integer({ description: "Plaid account ID" }),
    "recurring-id": Flags.integer({ description: "Recurring item ID" }),
    status: Flags.string({ description: "Status: reviewed or unreviewed" }),
    "tag-ids": Flags.string({ description: "JSON array of tag IDs" }),
  };

  async run(): Promise<unknown> {
    const { args, flags } = await this.parse(TransactionsUpdate);
    const client = this.createClient();
    let data: UpdateTransactionBody;
    if (flags.data) {
      data = parseJsonArg(flags.data, "data") as UpdateTransactionBody;
    } else {
      data = {};
      if (flags.date) data.date = flags.date;
      if (flags.amount) data.amount = flags.amount;
      if (flags.payee) data.payee = flags.payee;
      if (flags["category-id"]) data.category_id = flags["category-id"];
      if (flags.notes) data.notes = flags.notes;
      if (flags.currency) data.currency = flags.currency as Currency;
      if (flags.status) data.status = flags.status as "reviewed" | "unreviewed";
      if (flags["tag-ids"]) data.tag_ids = parseJsonArg(flags["tag-ids"], "tag-ids") as number[];
      if (flags["additional-tag-ids"]) data.additional_tag_ids = parseJsonArg(flags["additional-tag-ids"], "additional-tag-ids") as number[];
      if (flags["external-id"]) data.external_id = flags["external-id"];
      if (flags["recurring-id"]) data.recurring_id = flags["recurring-id"];
      if (flags["original-name"]) data.original_name = flags["original-name"];
      if (flags["manual-account-id"]) data.manual_account_id = flags["manual-account-id"];
      if (flags["plaid-account-id"]) data.plaid_account_id = flags["plaid-account-id"];
      if (flags["custom-metadata"]) data.custom_metadata = parseJsonArg(flags["custom-metadata"], "custom-metadata") as Record<string, never>;
    }

    const tx = await client.transactions.update(args.id, data);
    return this.output(tx, `Updated transaction ${args.id}.`);
  }
}
