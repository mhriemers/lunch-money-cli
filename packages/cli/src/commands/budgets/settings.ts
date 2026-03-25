import { ApiCommand, budgetSettingsFields, formatDetail } from "lunch-money-cli-core";

export default class BudgetsSettings extends ApiCommand {
  static override description =
    "Retrieve budget period and display settings for the account, including granularity (week/month/twice a month), quantity, anchor date, and display preferences";

  async run(): Promise<unknown> {
    const { flags } = await this.parse(BudgetsSettings);
    const client = this.createClient(flags["api-key"]);
    const settings = await client.budgets.getSettings();
    return this.output(settings, formatDetail(settings as unknown as Record<string, unknown>, budgetSettingsFields));
  }
}
