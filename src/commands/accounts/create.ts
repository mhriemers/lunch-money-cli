import { Flags } from "@oclif/core";
import { BaseCommand } from "../../base-command.js";
import { parseJsonArg } from "../../client.js";
import type { CreateManualAccountBody, Currency } from "@lunch-money/lunch-money-js-v2";

export default class AccountsCreate extends BaseCommand {
  static override description = "Create a new manual account";

  static override flags = {
    name: Flags.string({ description: "Account name", required: true }),
    type: Flags.string({ description: 'Account type: cash, credit, investment, "real estate", loan, vehicle, cryptocurrency, "employee compensation", "other liability", "other asset"', required: true }),
    balance: Flags.string({ description: "Current balance", required: true }),
    "institution-name": Flags.string({ description: "Institution name" }),
    "display-name": Flags.string({ description: "Display name" }),
    subtype: Flags.string({ description: "Account subtype (e.g., checking, savings, brokerage, depository)" }),
    currency: Flags.string({ description: "Currency code" }),
    status: Flags.string({ description: "Status: active or closed" }),
    "external-id": Flags.string({ description: "External ID" }),
    "custom-metadata": Flags.string({ description: "Custom metadata JSON" }),
    "balance-as-of": Flags.string({ description: "Date/time the balance was last updated (ISO 8601)" }),
    "closed-on": Flags.string({ description: "Date the account was closed (YYYY-MM-DD or null)" }),
    "exclude-from-transactions": Flags.boolean({ description: "Exclude account from transactions" }),
  };

  async run(): Promise<unknown> {
    const { flags } = await this.parse(AccountsCreate);
    const client = this.createClient();
    const data: CreateManualAccountBody = {
      name: flags.name,
      type: flags.type as CreateManualAccountBody["type"],
      balance: flags.balance,
    };
    if (flags["institution-name"]) data.institution_name = flags["institution-name"];
    if (flags["display-name"]) data.display_name = flags["display-name"];
    if (flags.subtype) data.subtype = flags.subtype;
    if (flags.currency) data.currency = flags.currency as Currency;
    if (flags.status) data.status = flags.status as "active" | "closed";
    if (flags["external-id"]) data.external_id = flags["external-id"];
    if (flags["custom-metadata"]) data.custom_metadata = parseJsonArg(flags["custom-metadata"], "custom-metadata") as { [key: string]: unknown };
    if (flags["balance-as-of"]) data.balance_as_of = flags["balance-as-of"];
    if (flags["closed-on"] !== undefined) data.closed_on = flags["closed-on"] === "null" ? null : flags["closed-on"];
    if (flags["exclude-from-transactions"]) data.exclude_from_transactions = true;
    const account = await client.manualAccounts.create(data);
    const a = account as unknown as Record<string, unknown>;
    return this.output(account, `Created account "${a.name ?? ""}" (ID: ${a.id}).`);
  }
}
