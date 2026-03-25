import { accountColumns, BaseCommand, formatTable } from "lunch-money-cli-core";

export default class AccountsList extends BaseCommand {
  static override description =
    "Retrieve a list of all manually-managed accounts (not synced via Plaid) associated with the user's account";

  async run(): Promise<unknown> {
    const client = this.createClient();
    const accounts = await client.manualAccounts.getAll();
    return this.output(accounts, formatTable(accounts as Record<string, unknown>[], accountColumns));
  }
}
