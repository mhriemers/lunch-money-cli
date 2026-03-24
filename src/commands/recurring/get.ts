import { Args } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";
import { recurringFields } from "../../columns.js";
import { formatDetail } from "../../formatters.js";

export default class RecurringGet extends BaseCommand {
  static override args = {
    id: Args.integer({ description: "Recurring item ID", required: true }),
  };
static override description = "Get a specific recurring item";

  async run(): Promise<unknown> {
    const { args } = await this.parse(RecurringGet);
    const client = this.createClient();
    const item = await client.recurringItems.get(args.id);
    return this.output(item, formatDetail(item as unknown as Record<string, unknown>, recurringFields));
  }
}
