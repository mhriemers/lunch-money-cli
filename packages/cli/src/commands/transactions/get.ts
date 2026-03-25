import { Args } from "@oclif/core";
import { ApiCommand, formatDetail, transactionFields } from "lunch-money-cli-core";

export default class TransactionsGet extends ApiCommand {
  static override args = {
    id: Args.integer({ description: "Unique identifier of the transaction to retrieve (integer)", required: true }),
  };
  static override description =
    "Retrieve a single transaction by ID. Includes plaid_metadata, custom_metadata, and files fields. For group/split parents, also includes children.";

  async run(): Promise<unknown> {
    const { args, flags } = await this.parse(TransactionsGet);
    const client = this.createClient(flags["api-key"]);
    const tx = await client.transactions.get(args.id);
    return this.output(tx, formatDetail(tx as unknown as Record<string, unknown>, transactionFields));
  }
}
