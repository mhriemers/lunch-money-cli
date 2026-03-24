import { Args } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";

export default class AccountsDelete extends BaseCommand {
  static override args = {
    id: Args.integer({ description: "Account ID", required: true }),
  };
static override description = "Delete a manual account";

  async run(): Promise<unknown> {
    const { args } = await this.parse(AccountsDelete);
    const client = this.createClient();
    await client.manualAccounts.delete(args.id);
    return this.output({ deleted_id: args.id, success: true }, `Deleted account ${args.id}.`);
  }
}
