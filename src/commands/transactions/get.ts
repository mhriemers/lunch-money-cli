import { Args } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";
import { transactionFields } from "../../columns.js";
import { formatDetail } from "../../formatters.js";

export default class TransactionsGet extends BaseCommand {
  static override args = {
    id: Args.integer({ description: "Transaction ID", required: true }),
  };
static override description = "Get a single transaction by ID";

  async run(): Promise<unknown> {
    const { args } = await this.parse(TransactionsGet);
    const client = this.createClient();
    const tx = await client.transactions.get(args.id);
    return this.output(tx, formatDetail(tx as unknown as Record<string, unknown>, transactionFields));
  }
}
