import { Args } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";

export default class TransactionsUnsplit extends BaseCommand {
  static override args = {
    id: Args.integer({ description: "Transaction ID to unsplit", required: true }),
  };
static override description = "Reverse a transaction split";

  async run(): Promise<unknown> {
    const { args } = await this.parse(TransactionsUnsplit);
    const client = this.createClient();
    await client.transactions.unsplit(args.id);
    return this.output({ success: true, unsplit_id: args.id }, `Unsplit transaction ${args.id}.`);
  }
}
