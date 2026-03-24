import type { SplitTransaction, SplitTransactionBody } from "@lunch-money/lunch-money-js-v2";

import { Args, Flags } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";
import { parseJsonArg } from "../../client.js";

export default class TransactionsSplit extends BaseCommand {
  static override args = {
    id: Args.integer({ description: "Unique identifier of the transaction to split (integer). Cannot be a recurring, grouped, or already-split transaction.", required: true }),
  };
static override description = "Split a transaction into child transactions. The sum of child amounts must equal the parent amount. After splitting, the parent is hidden and children are shown instead.";
static override flags = {
    parts: Flags.string({ description: "JSON array of child transaction objects (2-500). Each requires 'amount' (numeric, must sum to parent amount). Optional fields per child: payee (max 140 chars, inherits from parent), date (YYYY-MM-DD, inherits from parent), category_id (integer, inherits from parent), tag_ids (integer array), notes (max 350 chars, inherits from parent). Example: '[{\"amount\":25.00,\"payee\":\"Split 1\"},{\"amount\":17.45,\"payee\":\"Split 2\"}]'", required: true }),
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
