import { Flags } from "@oclif/core";
import { BaseCommand } from "../../base-command.js";
import { parseJsonArg } from "../../client.js";
import type { GroupTransactionsBody } from "@lunch-money/lunch-money-js-v2";

export default class TransactionsGroup extends BaseCommand {
  static override description = "Group multiple transactions together";

  static override flags = {
    data: Flags.string({ description: "JSON object with group details", required: true }),
  };

  async run(): Promise<unknown> {
    const { flags } = await this.parse(TransactionsGroup);
    const client = this.createClient();
    const data = parseJsonArg(flags.data, "data") as GroupTransactionsBody;
    const result = await client.transactions.group(data);
    return this.output(result, `Grouped transactions (group ID: ${(result as unknown as Record<string, unknown>).id ?? "unknown"}).`);
  }
}
