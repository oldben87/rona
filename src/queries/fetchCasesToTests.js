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

      // reformat to populate null responses from fetch
      const noNull = data.data.map(noNulls)

      // work out percentage difference
      return noNull.splice(0, noNull.length - 85).map((item) => {
        const percentage = Math.min(
          (item.newCases / item.newTests) * 100
        ).toFixed(2)
        if (percentage === 'Infinity' || percentage === 'NaN') {
          return {
            ...item,
            percentage: '0',
          }
        } else {
          return {
            ...item,
            percentage,
          }
        }
      })
    })
    .catch(() => {
      return { error: 'Server Error Overview' }
    })

  return result
}
