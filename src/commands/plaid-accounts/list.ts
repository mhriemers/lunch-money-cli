import { BaseCommand } from "../../base-command.js";
import { plaidAccountColumns } from "../../columns.js";
import { formatTable } from "../../formatters.js";

export default class PlaidAccountsList extends BaseCommand {
  static override description = "List all Plaid-connected accounts";

  async run(): Promise<unknown> {
    const client = this.createClient();
    const accounts = await client.plaidAccounts.getAll();
    return this.output(accounts, formatTable(accounts as Record<string, unknown>[], plaidAccountColumns));
  }
}
