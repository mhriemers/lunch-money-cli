import type { TriggerPlaidAccountFetchParams } from "@lunch-money/lunch-money-js-v2";

import { Flags } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";

export default class PlaidAccountsSync extends BaseCommand {
  static override description = "Trigger a manual sync for Plaid accounts";
static override flags = {
    "end-date": Flags.string({ description: "End date for the sync (YYYY-MM-DD)" }),
    "plaid-account-id": Flags.integer({ description: "Specific Plaid account ID to sync" }),
    "start-date": Flags.string({ description: "Start date for the sync (YYYY-MM-DD)" }),
  };

  async run(): Promise<unknown> {
    const { flags } = await this.parse(PlaidAccountsSync);
    const client = this.createClient();
    const params: TriggerPlaidAccountFetchParams = {};
    if (flags["start-date"]) params.start_date = flags["start-date"];
    if (flags["end-date"]) params.end_date = flags["end-date"];
    if (flags["plaid-account-id"]) params.id = flags["plaid-account-id"];
    await client.plaidAccounts.triggerFetch(params);
    return this.output({ message: "Plaid sync triggered", success: true }, "Plaid sync triggered.");
  }
}
