import type { UpdateManualAccountBody } from "@lunch-money/lunch-money-js-v2";

import { Args, Flags } from "@oclif/core";
import { ApiCommand, buildBody, type FieldMapping, parseJsonArg } from "lunch-money-cli-core";

const fieldMappings: FieldMapping[] = [
  { flag: "name" },
  { flag: "institution-name" },
  { flag: "display-name" },
  { flag: "type" },
  { flag: "subtype" },
  { flag: "balance" },
  { flag: "currency" },
  { flag: "balance-as-of" },
  { flag: "status" },
  { flag: "closed-on", type: "nullable" },
  { flag: "external-id" },
  { flag: "custom-metadata", type: "json" },
  { flag: "exclude-from-transactions", type: "boolean" },
];

export default class AccountsUpdate extends ApiCommand {
  static override args = {
    id: Args.integer({ description: "Unique identifier of the manual account to update (integer)", required: true }),
  };
  static override description =
    "Update properties of an existing manually-managed account. Only provided fields are updated; omitted fields remain unchanged.";
  static override flags = {
    balance: Flags.string({
      description:
        "New balance as a numeric string up to 4 decimal places (e.g. '195.50'). Do not include currency symbols.",
    }),
    "balance-as-of": Flags.string({
      description:
        "Date/time for the balance update in ISO 8601 format. Ignored if --balance is not also set. Defaults to current time when --balance is provided.",
    }),
    "closed-on": Flags.string({
      description:
        "Date the account was closed (YYYY-MM-DD format or 'null'). If updating a non-closed account, --status must also be set to 'closed'.",
    }),
    currency: Flags.string({
      description: "New three-letter lowercase currency code in ISO 4217 format (e.g. 'usd', 'eur')",
    }),
    "custom-metadata": Flags.string({
      description:
        'JSON object with additional account data. Must be valid JSON, max 4096 characters when stringified. Example: \'{"key": "value"}\'',
    }),
    data: Flags.string({
      description:
        "Full update request body as a JSON string. When provided, all other flags are ignored. Must conform to the manual account update schema.",
    }),
    "display-name": Flags.string({
      description: "New display name for the account. Must be unique across all manual accounts.",
    }),
    "exclude-from-transactions": Flags.string({
      description: "Whether transactions may be assigned to this account ('true' or 'false')",
    }),
    "external-id": Flags.string({ description: "Optional user-defined ID for the account (max 75 characters)" }),
    "institution-name": Flags.string({ description: "New institution name (1-50 characters)" }),
    name: Flags.string({ description: "New name for the account (1-45 characters)" }),
    status: Flags.string({
      description:
        "Account status. Allowed values: 'active', 'closed'. If set to 'closed', the closed_on date defaults to today unless also specified.",
    }),
    subtype: Flags.string({
      description:
        "New account subtype (1-100 characters). Examples: retirement, checking, savings, 'prepaid credit card'",
    }),
    type: Flags.string({
      description:
        "New primary account type. Allowed values: cash, credit, cryptocurrency, 'employee compensation', investment, loan, 'other liability', 'other asset', 'real estate', vehicle",
    }),
  };

  async run(): Promise<unknown> {
    const { args, flags } = await this.parse(AccountsUpdate);
    const client = this.createClient(flags["api-key"]);
    const data: UpdateManualAccountBody = flags.data
      ? (parseJsonArg(flags.data, "data") as UpdateManualAccountBody)
      : buildBody<UpdateManualAccountBody>(flags, fieldMappings);
    const account = await client.manualAccounts.update(args.id, data);
    return this.output(account, `Updated account ${args.id}.`);
  }
}
