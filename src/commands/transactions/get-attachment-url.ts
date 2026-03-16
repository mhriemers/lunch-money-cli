import { Args } from "@oclif/core";
import { BaseCommand } from "../../base-command.js";

export default class TransactionsGetAttachmentUrl extends BaseCommand {
  static override description = "Get download URL for a transaction attachment";

  static override args = {
    "file-id": Args.integer({ description: "File attachment ID", required: true }),
  };

  async run(): Promise<unknown> {
    const { args } = await this.parse(TransactionsGetAttachmentUrl);
    const client = this.createClient();
    const result = await client.transactions.getAttachmentUrl(args["file-id"]);
    const url = (result as unknown as Record<string, unknown>).url ?? String(result);
    return this.output(result, String(url));
  }
}
