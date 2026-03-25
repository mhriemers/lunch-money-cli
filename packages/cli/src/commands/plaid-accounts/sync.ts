import type {TriggerPlaidAccountFetchParams} from '@lunch-money/lunch-money-js-v2'

import {Flags} from '@oclif/core'
import {BaseCommand} from 'lunch-money-cli-core'

export default class PlaidAccountsSync extends BaseCommand {
  static override description =
    'Trigger a fetch for latest data from Plaid. Returns 202 on success. Rate limited to once per minute. Fetching is a background job; track results via plaid_last_successful_update, last_fetch, and last_import fields.'
  static override flags = {
    'end-date': Flags.string({
      description: 'End of the date range to fetch transactions for (YYYY-MM-DD). Required if --start-date is set.',
    }),
    'plaid-account-id': Flags.integer({
      description:
        'Specific Plaid account ID to fetch. If not set, triggers a fetch for all eligible accounts. (integer)',
    }),
    'start-date': Flags.string({
      description: 'Start of the date range to fetch transactions for (YYYY-MM-DD). Required if --end-date is set.',
    }),
  }

  async run(): Promise<unknown> {
    const {flags} = await this.parse(PlaidAccountsSync)
    const client = this.createClient()
    const params: TriggerPlaidAccountFetchParams = {}
    if (flags['start-date']) params.start_date = flags['start-date']
    if (flags['end-date']) params.end_date = flags['end-date']
    if (flags['plaid-account-id']) params.id = flags['plaid-account-id']
    await client.plaidAccounts.triggerFetch(params)
    return this.output({message: 'Plaid sync triggered', success: true}, 'Plaid sync triggered.')
  }
}
