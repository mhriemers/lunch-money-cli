import { BaseCommand } from "../../base-command.js";
import { budgetSettingsFields } from "../../columns.js";
import { formatDetail } from "../../formatters.js";

export default class BudgetsSettings extends BaseCommand {
  static override description = "Get budget settings (period granularity, etc.)";

  async run(): Promise<unknown> {
    const client = this.createClient();
    const settings = await client.budgets.getSettings();
    return this.output(settings, formatDetail(settings as unknown as Record<string, unknown>, budgetSettingsFields));
  }
}
