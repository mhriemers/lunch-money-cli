import type { AccountType, Currency, UpdateManualAccountBody } from "@lunch-money/lunch-money-js-v2";

import { Args, Flags } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";
import { parseJsonArg } from "../../client.js";

export default class AccountsUpdate extends BaseCommand {
  static override args = {
    id: Args.integer({ description: "Account ID", required: true }),
  };
static override description = "Update a manual account";
static override flags = {
    balance: Flags.string({ description: "New balance" }),
    "balance-as-of": Flags.string({ description: "Date/time the balance was last updated (ISO 8601)" }),
    "closed-on": Flags.string({ description: "Date the account was closed (YYYY-MM-DD or null)" }),
    currency: Flags.string({ description: "Currency code" }),
    "custom-metadata": Flags.string({ description: "Custom metadata JSON" }),
    data: Flags.string({ description: "Full update body as JSON (overrides other options)" }),
    "display-name": Flags.string({ description: "New display name" }),
    "exclude-from-transactions": Flags.string({ description: "Exclude account from transactions (true/false)" }),
    "external-id": Flags.string({ description: "External ID" }),
    "institution-name": Flags.string({ description: "New institution name" }),
    name: Flags.string({ description: "New name" }),
    status: Flags.string({ description: "Status: active or closed" }),
    subtype: Flags.string({ description: "Account subtype (e.g., checking, savings, brokerage, depository)" }),
    type: Flags.string({ description: 'Account type: cash, credit, investment, "real estate", loan, vehicle, cryptocurrency, "employee compensation", "other liability", "other asset"' }),
  };

  async run(): Promise<unknown> {
    const { args, flags } = await this.parse(AccountsUpdate);
    const client = this.createClient();
    let data: UpdateManualAccountBody;
    if (flags.data) {
      data = parseJsonArg(flags.data, "data") as UpdateManualAccountBody;
    } else {
      data = {};
      if (flags.name) data.name = flags.name;
      if (flags["institution-name"]) data.institution_name = flags["institution-name"];
      if (flags["display-name"]) data.display_name = flags["display-name"];
      if (flags.type) data.type = flags.type as AccountType;
      if (flags.subtype) data.subtype = flags.subtype;
      if (flags.balance) data.balance = flags.balance;
      if (flags.currency) data.currency = flags.currency as Currency;
      if (flags["balance-as-of"]) data.balance_as_of = flags["balance-as-of"];
      if (flags.status) data.status = flags.status as "active" | "closed";
      if (flags["closed-on"] !== undefined) data.closed_on = flags["closed-on"] === "null" ? null : flags["closed-on"];
      if (flags["external-id"]) data.external_id = flags["external-id"];
      if (flags["custom-metadata"]) data.custom_metadata = parseJsonArg(flags["custom-metadata"], "custom-metadata") as { [key: string]: unknown };
      if (flags["exclude-from-transactions"] !== undefined) data.exclude_from_transactions = flags["exclude-from-transactions"] === "true";
    }

    const account = await client.manualAccounts.update(args.id, data);
    return this.output(account, `Updated account ${args.id}.`);
  }
}
