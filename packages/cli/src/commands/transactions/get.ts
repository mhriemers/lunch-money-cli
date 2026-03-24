import { Args } from "@oclif/core";
import { BaseCommand, formatDetail, transactionFields } from "lunch-money-cli-core";

export default class TransactionsGet extends BaseCommand {
  static override args = {
    id: Args.integer({ description: "Unique identifier of the transaction to retrieve (integer)", required: true }),
  };
static override description = "Retrieve a single transaction by ID. Includes plaid_metadata, custom_metadata, and files fields. For group/split parents, also includes children.";

  async run(): Promise<unknown> {
    const { args } = await this.parse(TransactionsGet);
    const client = this.createClient();
    const tx = await client.transactions.get(args.id);
    return this.output(tx, formatDetail(tx as unknown as Record<string, unknown>, transactionFields));
  }
}
