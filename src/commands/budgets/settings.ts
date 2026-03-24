import { BaseCommand } from "../../base-command.js";
import { budgetSettingsFields } from "../../columns.js";
import { formatDetail } from "../../formatters.js";

export default class BudgetsSettings extends BaseCommand {
  static override description = "Retrieve budget period and display settings for the account, including granularity (week/month/twice a month), quantity, anchor date, and display preferences";

  async run(): Promise<unknown> {
    const client = this.createClient();
    const settings = await client.budgets.getSettings();
    return this.output(settings, formatDetail(settings as unknown as Record<string, unknown>, budgetSettingsFields));
  }
}
