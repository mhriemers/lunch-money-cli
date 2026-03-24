import { Args } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";

export default class TransactionsDelete extends BaseCommand {
  static override args = {
    id: Args.integer({ description: "Transaction ID", required: true }),
  };
static override description = "Delete a single transaction";

  async run(): Promise<unknown> {
    const { args } = await this.parse(TransactionsDelete);
    const client = this.createClient();
    await client.transactions.delete(args.id);
    return this.output({ deleted_id: args.id, success: true }, `Deleted transaction ${args.id}.`);
  }
}
