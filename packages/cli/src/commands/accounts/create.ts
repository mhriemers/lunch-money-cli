import type { CreateManualAccountBody } from "@lunch-money/lunch-money-js-v2";

import { Flags } from "@oclif/core";
import { ApiCommand, buildBody, type FieldMapping } from "lunch-money-cli-core";

const optionalFields: FieldMapping[] = [
  { flag: "institution-name" },
  { flag: "display-name" },
  { flag: "subtype" },
  { flag: "currency" },
  { flag: "status" },
  { flag: "external-id" },
  { flag: "custom-metadata", type: "json" },
  { flag: "balance-as-of" },
  { flag: "closed-on", type: "nullable" },
  { flag: "exclude-from-transactions", type: "boolean" },
];

export default class AccountsCreate extends ApiCommand {
  static override description = "Create a new manually-managed account. Requires name, type, and balance at minimum.";
  static override flags = {
    balance: Flags.string({
      description:
        "Current balance as a numeric string up to 4 decimal places (e.g. '195.50'). Do not include currency symbols.",
      required: true,
    }),
    "balance-as-of": Flags.string({
      description:
        "Date/time the balance was last updated in ISO 8601 format. Accepts date (YYYY-MM-DD) or datetime string.",
    }),
    "closed-on": Flags.string({
      description: "Date the account was closed (YYYY-MM-DD format or 'null'). If set, --status must also be 'closed'.",
    }),
    currency: Flags.string({
      description:
        "Three-letter lowercase currency code in ISO 4217 format (e.g. 'usd', 'eur'). Defaults to account's primary currency.",
    }),
    "custom-metadata": Flags.string({
      description:
        'JSON object with additional account data. Must be valid JSON and not exceed 4096 characters when stringified. Example: \'{"key": "value"}\'',
    }),
    "display-name": Flags.string({
      description:
        "Display name for the account. Must be unique across all manual accounts. If not set, derived from institution_name and name.",
    }),
    "exclude-from-transactions": Flags.boolean({
      description: "If set, transactions may not be assigned to this manual account",
    }),
    "external-id": Flags.string({ description: "Optional user-defined ID for the account (max 75 characters)" }),
    "institution-name": Flags.string({ description: "Name of institution holding the account (1-50 characters)" }),
    name: Flags.string({ description: "Name of the manual account (1-45 characters)", required: true }),
    status: Flags.string({ description: "Account status. Allowed values: 'active' (default), 'closed'" }),
    subtype: Flags.string({
      description:
        "Optional account subtype (1-100 characters). Examples: retirement, checking, savings, 'prepaid credit card'",
    }),
    type: Flags.string({
      description:
        "Primary account type. Allowed values: cash, credit, cryptocurrency, 'employee compensation', investment, loan, 'other liability', 'other asset', 'real estate', vehicle",
      required: true,
    }),
  };

  async run(): Promise<unknown> {
    const { flags } = await this.parse(AccountsCreate);
    const client = this.createClient(flags["api-key"]);
    const data: CreateManualAccountBody = {
      balance: flags.balance,
      name: flags.name,
      type: flags.type as CreateManualAccountBody["type"],
      ...buildBody<CreateManualAccountBody>(flags, optionalFields),
    };
    const account = await client.manualAccounts.create(data);
    return this.output(account, `Created account "${account.name}" (ID: ${account.id}).`);
  }
}
