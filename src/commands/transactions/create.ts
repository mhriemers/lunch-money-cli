import type { CreateTransactionsBody, InsertTransaction } from "@lunch-money/lunch-money-js-v2";

import { Flags } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";
import { parseJsonArg } from "../../client.js";

export default class TransactionsCreate extends BaseCommand {
  static override description = "Create one or more transactions";
static override flags = {
    "apply-rules": Flags.boolean({ description: "Apply account rules to new transactions" }),
    "skip-balance-update": Flags.boolean({ description: "Don't update manual account balance" }),
    "skip-duplicates": Flags.boolean({ description: "Skip duplicate transactions" }),
    transactions: Flags.string({ description: "JSON array of transaction objects", required: true }),
  };

  async run(): Promise<unknown> {
    const { flags } = await this.parse(TransactionsCreate);
    const client = this.createClient();
    const transactions = parseJsonArg(flags.transactions, "transactions");
    const data: CreateTransactionsBody = {
      transactions: transactions as InsertTransaction[],
    };
    if (flags["apply-rules"]) data.apply_rules = true;
    if (flags["skip-duplicates"]) data.skip_duplicates = true;
    if (flags["skip-balance-update"]) data.skip_balance_update = true;
    const result = await client.transactions.create(data);
    const r = result as unknown as Record<string, unknown>;
    const txns = r.transactions ?? r.ids;
    const n = Array.isArray(txns) ? txns.length : 0;
    return this.output(result, `Created ${n} transaction(s).`);
  }
}
