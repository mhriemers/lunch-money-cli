import { BaseCommand } from "../../base-command.js";
import { formatTable } from "../../formatters.js";
import { accountColumns } from "../../columns.js";

export default class AccountsList extends BaseCommand {
  static override description = "List all manual accounts";

  async run(): Promise<unknown> {
    const client = this.createClient();
    const accounts = await client.manualAccounts.getAll();
    return this.output(accounts, formatTable(accounts as Record<string, unknown>[], accountColumns));
  }
}
