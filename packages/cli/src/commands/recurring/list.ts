import type { GetAllRecurringItemsParams } from "@lunch-money/lunch-money-js-v2";

import { Flags } from "@oclif/core";
import { ApiCommand, buildBody, type FieldMapping, formatTable, recurringColumns } from "lunch-money-cli-core";

const optionalFields: FieldMapping[] = [{ flag: "start-date" }, { flag: "end-date" }];

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
    const parameters = buildBody<GetAllRecurringItemsParams>(flags, optionalFields);
    const items = await client.recurringItems.getAll(parameters);
    return this.output(items, formatTable(items as Record<string, unknown>[], recurringColumns));
  }
}
