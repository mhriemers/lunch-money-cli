import { Args } from "@oclif/core";
import { BaseCommand } from "../../base-command.js";
import { formatDetail } from "../../formatters.js";
import { accountFields } from "../../columns.js";

export default class AccountsGet extends BaseCommand {
  static override description = "Get a specific manual account";

  static override args = {
    id: Args.integer({ description: "Account ID", required: true }),
  };

  async run(): Promise<unknown> {
    const { args } = await this.parse(AccountsGet);
    const client = this.createClient();
    const account = await client.manualAccounts.get(args.id);
    return this.output(account, formatDetail(account as unknown as Record<string, unknown>, accountFields));
  }
}
