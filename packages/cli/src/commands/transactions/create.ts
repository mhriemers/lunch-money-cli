import type {CreateTransactionsBody, InsertTransaction} from '@lunch-money/lunch-money-js-v2'

import {Flags} from '@oclif/core'
import {BaseCommand, parseJsonArg} from 'lunch-money-cli-core'

export default class TransactionsCreate extends BaseCommand {
  static override description =
    'Insert one or more transactions (1-500 per request). Returns created transactions and any skipped duplicates.'
  static override flags = {
    'apply-rules': Flags.boolean({
      description: "If set, account rules associated with each transaction's manual_account_id will be applied",
    }),
    'skip-balance-update': Flags.boolean({
      description: 'If set, manual account balances will not be updated when transactions are inserted',
    }),
    'skip-duplicates': Flags.boolean({
      description:
        "If set, skip transactions matching an existing transaction's date, payee, amount, and account. Deduplication by external_id always occurs regardless.",
    }),
    transactions: Flags.string({
      description:
        'JSON array of transaction objects (1-500). Each requires \'date\' (YYYY-MM-DD) and \'amount\' (numeric, positive=debit, negative=credit). Optional fields: payee (string, max 140 chars), category_id (integer), currency (3-letter ISO 4217 code), notes (max 350 chars), status (\'reviewed\'|\'unreviewed\'), tag_ids (integer array), manual_account_id, plaid_account_id, external_id (max 75 chars), custom_metadata (JSON object, max 4096 chars), recurring_id, original_name. Example: \'[{"date":"2024-01-15","amount":42.50,"payee":"Coffee Shop"}]\'',
      required: true,
    }),
  }

  async run(): Promise<unknown> {
    const {flags} = await this.parse(TransactionsCreate)
    const client = this.createClient()
    const transactions = parseJsonArg(flags.transactions, 'transactions')
    const data: CreateTransactionsBody = {
      transactions: transactions as InsertTransaction[],
    }
    if (flags['apply-rules']) data.apply_rules = true
    if (flags['skip-duplicates']) data.skip_duplicates = true
    if (flags['skip-balance-update']) data.skip_balance_update = true
    const result = await client.transactions.create(data)
    const r = result as unknown as Record<string, unknown>
    const txns = r.transactions ?? r.ids
    const n = Array.isArray(txns) ? txns.length : 0
    return this.output(result, `Created ${n} transaction(s).`)
  }
}
