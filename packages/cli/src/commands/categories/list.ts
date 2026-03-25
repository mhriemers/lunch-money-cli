import type {GetAllCategoriesParams} from '@lunch-money/lunch-money-js-v2'

import {Flags} from '@oclif/core'
import {BaseCommand, categoryColumns, formatTable} from 'lunch-money-cli-core'

export default class CategoriesList extends BaseCommand {
  static override description =
    "Retrieve a list of all categories associated with the user's account. Returns nested category groups by default."
  static override flags = {
    flatten: Flags.boolean({
      description:
        'Return a flattened list instead of nested category groups. Categories are sorted by their order; null-order categories appear alphabetically after ordered ones.',
    }),
    'is-group': Flags.string({
      description:
        "Filter by group status. If 'true', only category groups are returned. If 'false', only non-group categories are returned. Overrides --flatten when set.",
    }),
  }

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CategoriesList)
    const client = this.createClient()
    const params: GetAllCategoriesParams = {}
    if (flags.flatten) params.format = 'flattened'
    if (flags['is-group'] !== undefined) params.is_group = flags['is-group'] === 'true'
    const categories = await client.categories.getAll(params)
    return this.output(categories, formatTable(categories as Record<string, unknown>[], categoryColumns))
  }
}
