import { Args } from "@oclif/core";
import { accountFields, ApiCommand, formatDetail } from "lunch-money-cli-core";

export default class AccountsGet extends ApiCommand {
  static override args = {
    id: Args.integer({ description: "Unique identifier of the manual account to retrieve (integer)", required: true }),
  };
  static override description = "Retrieve details of a specific manually-managed account by its ID";

  async run(): Promise<unknown> {
    const { args, flags } = await this.parse(AccountsGet);
    const client = this.createClient(flags["api-key"]);
    const account = await client.manualAccounts.get(args.id);
    return this.output(account, formatDetail(account as unknown as Record<string, unknown>, accountFields));
  }
}
