import { Args } from "@oclif/core";
import { ApiCommand, formatDetail, plaidAccountFields } from "lunch-money-cli-core";

export default class PlaidAccountsGet extends ApiCommand {
  static override args = {
    id: Args.integer({ description: "Unique identifier of the Plaid account to retrieve (integer)", required: true }),
  };
  static override description = "Retrieve details of a specific Plaid-synced account by its ID";

  async run(): Promise<unknown> {
    const { args, flags } = await this.parse(PlaidAccountsGet);
    const client = this.createClient(flags["api-key"]);
    const account = await client.plaidAccounts.get(args.id);
    return this.output(account, formatDetail(account as unknown as Record<string, unknown>, plaidAccountFields));
  }
}
