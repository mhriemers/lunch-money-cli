import type { UpdateTransactionsBody } from "@lunch-money/lunch-money-js-v2";

import { Flags } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";
import { parseJsonArg } from "../../client.js";

export default class TransactionsUpdateMany extends BaseCommand {
  static override description = "Batch update multiple transactions";
static override flags = {
    transactions: Flags.string({ description: "JSON array of transaction updates (each must have id)", required: true }),
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
