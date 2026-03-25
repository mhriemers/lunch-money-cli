import {Args} from '@oclif/core'
import {BaseCommand, formatDetail, recurringFields} from 'lunch-money-cli-core'

export default class RecurringGet extends BaseCommand {
  static override args = {
    id: Args.integer({description: 'Unique identifier of the recurring item to retrieve (integer)', required: true}),
  }
  static override description =
    'Retrieve details of a specific recurring item by its ID, including transaction criteria, overrides, and match information'

  async run(): Promise<unknown> {
    const {args} = await this.parse(RecurringGet)
    const client = this.createClient()
    const item = await client.recurringItems.get(args.id)
    return this.output(item, formatDetail(item as unknown as Record<string, unknown>, recurringFields))
  }
}
