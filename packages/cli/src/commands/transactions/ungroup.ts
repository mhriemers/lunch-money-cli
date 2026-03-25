import { Args } from "@oclif/core";
import { ApiCommand } from "lunch-money-cli-core";

export default class TransactionsUngroup extends ApiCommand {
  static override args = {
    id: Args.integer({
      description:
        "Unique identifier of the transaction group to ungroup (integer). Must be a transaction where is_group_parent is true.",
      required: true,
    }),
  };
  static override description =
    "Delete a transaction group and restore the original transactions to their normal ungrouped state";

  async run(): Promise<unknown> {
    const { args, flags } = await this.parse(TransactionsUngroup);
    const client = this.createClient(flags["api-key"]);
    await client.transactions.ungroup(args.id);
    return this.output({ success: true, ungrouped_id: args.id }, `Ungrouped transaction ${args.id}.`);
  }
}
