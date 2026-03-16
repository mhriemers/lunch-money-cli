import { Flags } from "@oclif/core";
import { BaseCommand } from "../../base-command.js";
import { parseJsonArg } from "../../client.js";

export default class TransactionsDeleteMany extends BaseCommand {
  static override description = "Batch delete multiple transactions";

  static override flags = {
    ids: Flags.string({ description: "JSON array of transaction IDs to delete", required: true }),
  };

  async run(): Promise<unknown> {
    const { flags } = await this.parse(TransactionsDeleteMany);
    const client = this.createClient();
    const ids = parseJsonArg(flags.ids, "ids") as number[];
    await client.transactions.deleteMany({ ids });
    return this.output({ success: true, deleted_ids: ids }, `Deleted ${ids.length} transaction(s).`);
  }
}
