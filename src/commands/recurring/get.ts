import { Args } from "@oclif/core";
import { BaseCommand } from "../../base-command.js";
import { formatDetail } from "../../formatters.js";
import { recurringFields } from "../../columns.js";

export default class RecurringGet extends BaseCommand {
  static override description = "Get a specific recurring item";

  static override args = {
    id: Args.integer({ description: "Recurring item ID", required: true }),
  };

  async run(): Promise<unknown> {
    const { args } = await this.parse(RecurringGet);
    const client = this.createClient();
    const item = await client.recurringItems.get(args.id);
    return this.output(item, formatDetail(item as unknown as Record<string, unknown>, recurringFields));
  }
}
