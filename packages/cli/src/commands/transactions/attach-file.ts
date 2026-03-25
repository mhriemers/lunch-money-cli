import type { AttachFileToTransactionBody } from "@lunch-money/lunch-money-js-v2";

import { Args, Flags } from "@oclif/core";
import { ApiCommand } from "lunch-money-cli-core";

export default class TransactionsAttachFile extends ApiCommand {
  static override args = {
    "transaction-id": Args.integer({
      description: "Unique identifier of the transaction to attach the file to (integer)",
      required: true,
    }),
  };
  static override description =
    "Attach a file to a transaction. File must be under 10MB. Allowed types: image/jpeg, image/png, application/pdf, image/heic, image/heif.";
  static override flags = {
    file: Flags.string({
      description:
        "Path to the local file or URL to attach. Must be under 10MB. Allowed types: JPEG, PNG, PDF, HEIC, HEIF.",
      required: true,
    }),
    notes: Flags.string({ description: "Optional notes about the file attachment" }),
  };

  async run(): Promise<unknown> {
    const { args, flags } = await this.parse(TransactionsAttachFile);
    const client = this.createClient(flags["api-key"]);
    const data: AttachFileToTransactionBody = { file: flags.file };
    if (flags.notes) data.notes = flags.notes;
    const result = await client.transactions.attachFile(args["transaction-id"], data);
    return this.output(result, `Attached file to transaction ${args["transaction-id"]}.`);
  }
}
