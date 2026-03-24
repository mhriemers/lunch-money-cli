import { Args } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";
import { plaidAccountFields } from "../../columns.js";
import { formatDetail } from "../../formatters.js";

export default class PlaidAccountsGet extends BaseCommand {
  static override args = {
    id: Args.integer({ description: "Unique identifier of the Plaid account to retrieve (integer)", required: true }),
  };
static override description = "Retrieve details of a specific Plaid-synced account by its ID";

  async run(): Promise<unknown> {
    const { args } = await this.parse(PlaidAccountsGet);
    const client = this.createClient();
    const account = await client.plaidAccounts.get(args.id);
    return this.output(account, formatDetail(account as unknown as Record<string, unknown>, plaidAccountFields));
  }
}
