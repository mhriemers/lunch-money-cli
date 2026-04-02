import type { GroupTransactionsBody } from "@lunch-money/lunch-money-js-v2";

import { Flags } from "@oclif/core";
import { ApiCommand, parseJsonArg } from "lunch-money-cli-core";

export default class TransactionsGroup extends ApiCommand {
  static override description =
    "Group existing transactions into a single grouped transaction. The grouped transaction amount equals the sum of its children. Original transactions are hidden after grouping.";
  static override flags = {
    data: Flags.string({
      description:
        "JSON object with group details. Required fields: 'ids' (array of 2-500 transaction IDs), 'date' (YYYY-MM-DD), 'payee' (string, max 140 chars). Optional: category_id (integer), notes (max 350 chars), status ('reviewed'|'unreviewed', default 'reviewed'), tag_ids (integer array). Example: '{\"ids\":[123,456],\"date\":\"2024-01-15\",\"payee\":\"Grouped\"}'",
      required: true,
    }),
  };

  async run(): Promise<unknown> {
    const { flags } = await this.parse(TransactionsGroup);
    const client = this.createClient(flags["api-key"]);
    const data = parseJsonArg(flags.data, "data") as GroupTransactionsBody;
    const result = await client.transactions.group(data);
    return this.output(result, `Grouped transactions (group ID: ${result.id}).`);
  }
}
