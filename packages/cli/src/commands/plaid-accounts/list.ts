import {BaseCommand, formatTable, plaidAccountColumns} from 'lunch-money-cli-core'

export default class PlaidAccountsList extends BaseCommand {
  static override description = "Retrieve a list of all accounts synced via Plaid associated with the user's account"

  async run(): Promise<unknown> {
    const client = this.createClient()
    const accounts = await client.plaidAccounts.getAll()
    return this.output(accounts, formatTable(accounts as Record<string, unknown>[], plaidAccountColumns))
  }
}
