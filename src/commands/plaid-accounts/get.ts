import { Args } from "@oclif/core";
import { BaseCommand } from "../../base-command.js";
import { formatDetail } from "../../formatters.js";
import { plaidAccountFields } from "../../columns.js";

export default class PlaidAccountsGet extends BaseCommand {
  static override description = "Get a specific Plaid account";

  static override args = {
    id: Args.integer({ description: "Plaid account ID", required: true }),
  };

  async run(): Promise<unknown> {
    const { args } = await this.parse(PlaidAccountsGet);
    const client = this.createClient();
    const account = await client.plaidAccounts.get(args.id);
    return this.output(account, formatDetail(account as unknown as Record<string, unknown>, plaidAccountFields));
  }
}
