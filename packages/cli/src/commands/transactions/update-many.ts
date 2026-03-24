import type { UpdateTransactionsBody } from "@lunch-money/lunch-money-js-v2";

import { Flags } from "@oclif/core";
import { BaseCommand, parseJsonArg } from "lunch-money-cli-core";

export default class TransactionsUpdateMany extends BaseCommand {
  static override description = "Update multiple transactions in a single request (1-500). Each transaction object must include an 'id' field plus at least one field to update.";
static override flags = {
    transactions: Flags.string({ description: "JSON array of transaction update objects (1-500). Each must have 'id' (integer) and at least one updatable field. Updatable fields: date, amount, payee, category_id, notes, currency, status, tag_ids, additional_tag_ids, external_id, custom_metadata, recurring_id, manual_account_id, plaid_account_id. Example: '[{\"id\":123,\"category_id\":456},{\"id\":789,\"status\":\"reviewed\"}]'", required: true }),
  };

  async run(): Promise<unknown> {
    const { flags } = await this.parse(TransactionsUpdateMany);
    const client = this.createClient();
    const transactions = parseJsonArg(flags.transactions, "transactions");
    const txns = transactions as UpdateTransactionsBody["transactions"];
    const result = await client.transactions.updateMany({ transactions: txns });
    return this.output(result, `Updated ${txns.length} transaction(s).`);
  }
}
