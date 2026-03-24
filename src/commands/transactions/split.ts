import type { SplitTransaction, SplitTransactionBody } from "@lunch-money/lunch-money-js-v2";

import { Args, Flags } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";
import { parseJsonArg } from "../../client.js";

export default class TransactionsSplit extends BaseCommand {
  static override args = {
    id: Args.integer({ description: "Transaction ID to split", required: true }),
  };
static override description = "Split a transaction into multiple parts";
static override flags = {
    parts: Flags.string({ description: "JSON array of split parts [{amount, payee, date, category_id, tag_ids, notes}]", required: true }),
  };

  async run(): Promise<unknown> {
    const { args, flags } = await this.parse(TransactionsSplit);
    const client = this.createClient();
    const parts = parseJsonArg(flags.parts, "parts") as SplitTransaction[];
    const data: SplitTransactionBody = { child_transactions: parts };
    const result = await client.transactions.split(args.id, data);
    return this.output(result, `Split transaction ${args.id} into ${parts.length} parts.`);
  }
}
