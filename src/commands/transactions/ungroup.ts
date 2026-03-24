import { Args } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";

export default class TransactionsUngroup extends BaseCommand {
  static override args = {
    id: Args.integer({ description: "Transaction group ID", required: true }),
  };
static override description = "Ungroup a transaction group";

  async run(): Promise<unknown> {
    const { args } = await this.parse(TransactionsUngroup);
    const client = this.createClient();
    await client.transactions.ungroup(args.id);
    return this.output({ success: true, ungrouped_id: args.id }, `Ungrouped transaction ${args.id}.`);
  }
}
