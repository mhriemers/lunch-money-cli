import { accountColumns, ApiCommand, formatTable } from "lunch-money-cli-core";

export default class AccountsList extends ApiCommand {
  static override description =
    "Retrieve a list of all manually-managed accounts (not synced via Plaid) associated with the user's account";

  async run(): Promise<unknown> {
    const { flags } = await this.parse(AccountsList);
    const client = this.createClient(flags["api-key"]);
    const accounts = await client.manualAccounts.getAll();
    return this.output(accounts, formatTable(accounts as Record<string, unknown>[], accountColumns));
  }
}
