import { Args } from "@oclif/core";
import { ApiCommand } from "lunch-money-cli-core";

export default class TransactionsDeleteAttachment extends ApiCommand {
  static override args = {
    "file-id": Args.integer({
      description: "Unique identifier of the file attachment to delete (integer)",
      required: true,
    }),
  };
  static override description = "Delete a file attachment from a transaction";

  async run(): Promise<unknown> {
    const { args, flags } = await this.parse(TransactionsDeleteAttachment);
    const client = this.createClient(flags["api-key"]);
    await client.transactions.deleteAttachment(args["file-id"]);
    return this.output({ deleted_file_id: args["file-id"], success: true }, `Deleted attachment ${args["file-id"]}.`);
  }
}
