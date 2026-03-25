import { Args } from "@oclif/core";
import { BaseCommand } from "lunch-money-cli-core";

export default class TransactionsGetAttachmentUrl extends BaseCommand {
  static override args = {
    "file-id": Args.integer({
      description: "Unique identifier of the file attachment to download (integer)",
      required: true,
    }),
  };
  static override description =
    "Get a signed download URL for a transaction file attachment. The URL expires after a limited time.";

  async run(): Promise<unknown> {
    const { args } = await this.parse(TransactionsGetAttachmentUrl);
    const client = this.createClient();
    const result = await client.transactions.getAttachmentUrl(args["file-id"]);
    const url = (result as unknown as Record<string, unknown>).url ?? String(result);
    return this.output(result, String(url));
  }
}
