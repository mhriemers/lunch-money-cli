import type {Currency, UpsertBudgetBody} from '@lunch-money/lunch-money-js-v2'

import {Flags} from '@oclif/core'
import {BaseCommand} from 'lunch-money-cli-core'

export default class BudgetsUpsert extends BaseCommand {
  static override description =
    'Create or update a budget for a category and period. If a budget exists for the given start_date and category_id, it is updated; otherwise a new one is created. The start_date must be a valid budget period start for the account.'
  static override flags = {
    amount: Flags.string({
      description: "Budget amount as a number or numeric string (e.g. '500' or '250.50')",
      required: true,
    }),
    'category-id': Flags.integer({description: 'ID of the category this budget applies to (integer)', required: true}),
    currency: Flags.string({
      description:
        "Three-letter lowercase currency code in ISO 4217 format. Defaults to account's primary currency if omitted.",
    }),
    notes: Flags.string({description: 'Optional notes for the budget period (max 350 characters)'}),
    'start-date': Flags.string({
      description:
        "Start date of the budget period (YYYY-MM-DD). Must be a valid budget period start date for the account. Use 'lm budgets settings' to check period configuration.",
      required: true,
    }),
  }

  async run(): Promise<unknown> {
    const {flags} = await this.parse(BudgetsUpsert)
    const client = this.createClient()
    const data: UpsertBudgetBody = {
      amount: Number(flags.amount),
      category_id: flags['category-id'],
      start_date: flags['start-date'],
    }
    if (flags.currency) data.currency = flags.currency as Currency
    if (flags.notes) data.notes = flags.notes
    const result = await client.budgets.upsert(data)
    return this.output(result, `Budget saved for category ${flags['category-id']} starting ${flags['start-date']}.`)
  }
}
