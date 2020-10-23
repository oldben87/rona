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
      const response = data.data
      // reformat to populate null responses from fetch
      const noNull = response.map((item) => {
        let result_no_null = {
          ...item,
          date: item.date.split('-').reverse().join('-'),
          newCases: item.newCases || 0,
          newTests: item.newTests || 0,
        }
        return result_no_null
      })

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
