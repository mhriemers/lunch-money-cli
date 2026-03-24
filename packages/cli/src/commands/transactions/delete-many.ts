import { Flags } from "@oclif/core";
import { BaseCommand, parseJsonArg } from "lunch-money-cli-core";

export default class TransactionsDeleteMany extends BaseCommand {
  static override description = "Delete multiple transactions in a single request. This action is not reversible.";
static override flags = {
    ids: Flags.string({ description: "JSON array of transaction IDs to delete (integers). Example: '[123, 456, 789]'", required: true }),
  };

  async run(): Promise<unknown> {
    const { flags } = await this.parse(TransactionsDeleteMany);
    const client = this.createClient();
    const ids = parseJsonArg(flags.ids, "ids") as number[];
    await client.transactions.deleteMany({ ids });
    return this.output({ deleted_ids: ids, success: true }, `Deleted ${ids.length} transaction(s).`);
  }
}
