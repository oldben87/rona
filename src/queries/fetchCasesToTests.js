import * as R from 'ramda'

import { noNulls } from 'resources/helpers'

export const fetchCasesToTests = async () => {
  const headers = new Headers()
  headers.append('Pragma', 'no-cache')
  headers.append('Cache-Control', 'no-store, must-revalidate, no-cache')
  headers.append('Expires', 0)

  const structure = {
    date: 'date',
    newCases: 'newCasesByPublishDate',
    newTests: 'newTestsByPublishDate',
  }

  const uri =
    'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure='

  const result = await fetch(uri + JSON.stringify(structure), headers)
    .then((response) => response.json())
    .then((data) => {
      if (data.statusCode > 204 || data.data === null) {
        throw new Error('Not good status')
      }

      // reformat to populate null responses from fetch and remove jan-march
      const trimmed = R.compose(R.map(noNulls), R.dropLast(85))(data.data)

      // work out percentage difference
      return trimmed.map((item) => {
        if (item.newCases === 0 || item.newTests === 0) {
          return R.assoc('percentage', 0, item)
        }
        return R.assoc(
          'percentage',
          R.compose(R.multiply(100), R.divide)(item.newCases, item.newTests),
          item
        )
      })
    })
    .catch(() => {
      return { error: 'Server Error' }
    })

  return result
}
