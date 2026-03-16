import { Flags } from "@oclif/core";
import { BaseCommand } from "../../base-command.js";
import { formatTable } from "../../formatters.js";
import { recurringColumns } from "../../columns.js";
import type { GetAllRecurringItemsParams } from "@lunch-money/lunch-money-js-v2";

export default class RecurringList extends BaseCommand {
  static override description = "List all recurring items";

  static override flags = {
    "start-date": Flags.string({ description: "Start date (YYYY-MM-DD)" }),
    "end-date": Flags.string({ description: "End date (YYYY-MM-DD)" }),
  };

  async run(): Promise<unknown> {
    const { flags } = await this.parse(RecurringList);
    const client = this.createClient();
    const params: GetAllRecurringItemsParams = {};
    if (flags["start-date"]) params.start_date = flags["start-date"];
    if (flags["end-date"]) params.end_date = flags["end-date"];
    const items = await client.recurringItems.getAll(params);
    return this.output(items, formatTable(items as Record<string, unknown>[], recurringColumns));
  }
}
