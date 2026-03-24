import { Args } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";

export default class TransactionsDeleteAttachment extends BaseCommand {
  static override args = {
    "file-id": Args.integer({ description: "File attachment ID", required: true }),
  };
static override description = "Delete a transaction attachment";

  async run(): Promise<unknown> {
    const { args } = await this.parse(TransactionsDeleteAttachment);
    const client = this.createClient();
    await client.transactions.deleteAttachment(args["file-id"]);
    return this.output({ deleted_file_id: args["file-id"], success: true }, `Deleted attachment ${args["file-id"]}.`);
  }
}
