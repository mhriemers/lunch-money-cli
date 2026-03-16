import { Args, Flags } from "@oclif/core";
import { BaseCommand } from "../../base-command.js";
import type { AttachFileToTransactionBody } from "@lunch-money/lunch-money-js-v2";

export default class TransactionsAttachFile extends BaseCommand {
  static override description = "Attach a file to a transaction";

  static override args = {
    "transaction-id": Args.integer({ description: "Transaction ID", required: true }),
  };

  static override flags = {
    file: Flags.string({ description: "Path or URL of the file to attach", required: true }),
    notes: Flags.string({ description: "Notes for the attachment" }),
  };

  async run(): Promise<unknown> {
    const { args, flags } = await this.parse(TransactionsAttachFile);
    const client = this.createClient();
    const data: AttachFileToTransactionBody = { file: flags.file };
    if (flags.notes) data.notes = flags.notes;
    const result = await client.transactions.attachFile(args["transaction-id"], data);
    return this.output(result, `Attached file to transaction ${args["transaction-id"]}.`);
  }
}
