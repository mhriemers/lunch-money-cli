import type { GetAllRecurringItemsParams } from "@lunch-money/lunch-money-js-v2";

import { Flags } from "@oclif/core";
import { ApiCommand, formatTable, recurringColumns } from "lunch-money-cli-core";

export default class RecurringList extends ApiCommand {
  static override description =
    "Retrieve all recurring items. The optional date range controls which period is used to populate the 'matches' field showing expected vs found transactions.";
  static override flags = {
    "end-date": Flags.string({
      description: "End of date range for populating the matches field (YYYY-MM-DD). Required if --start-date is set.",
    }),
    "start-date": Flags.string({
      description:
        "Start of date range for populating the matches field (YYYY-MM-DD). Defaults to current month if omitted. Required if --end-date is set.",
    }),
  };

  async run(): Promise<unknown> {
    const { flags } = await this.parse(RecurringList);
    const client = this.createClient(flags["api-key"]);
    const params: GetAllRecurringItemsParams = {};
    if (flags["start-date"]) params.start_date = flags["start-date"];
    if (flags["end-date"]) params.end_date = flags["end-date"];
    const items = await client.recurringItems.getAll(params);
    return this.output(items, formatTable(items as Record<string, unknown>[], recurringColumns));
  }
}
