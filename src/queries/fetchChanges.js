import { noNulls } from 'resources/helpers'

export const fetchChanges = async () => {
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

  const res = await fetch(uri + JSON.stringify(structure), headers)
    .then((response) => response.json())
    .then((data) => {
      if (data.statusCode > 204 || data.data === null) {
        console.log('Error Thrown')
        throw new Error('Not good status')
      }

      const response = data.data
      // reformat to populate null responses from fetch
      const noNull = response.map(noNulls)
      // calculate difference in days and add to reponse

      const result = noNull.map((fill, index) => {
        const slice = noNull.slice(index, index + 2)
        const new_tests = slice.map(tests)
        const new_cases = slice.map(cases)

        const testChange = new_tests.reduce((a, b) => a - b)
        const caseChange = new_cases.reduce((a, b) => a - b)

        const testPercentage = ((testChange / new_tests[1]) * 100).toFixed(1)
        const casePercentage = ((caseChange / new_cases[1]) * 100).toFixed(1)

        const testSevenDay =
          noNull
            .slice(index - 3, index + 3)
            .map(tests)
            .reduce((a, b) => a + b, 0) / 7

        const testSevenDaySlice = noNull.slice(index - 2, index + 4)
        const sevenDay2 = (
          testSevenDaySlice.map(tests).reduce((a, b) => a + b, 0) / 7
        ).toFixed(1)

        const sevenDayTestPercentage =
          ((testSevenDay - sevenDay2) / sevenDay2) * 100

        const caseSevenDay =
          noNull
            .slice(index, index + 7)
            .map(cases)
            .reduce((a, b) => a + b) / 7

        const sevenDay3 = (
          testSevenDaySlice.map(cases).reduce((a, b) => a + b, 0) / 7
        ).toFixed(1)

        const sevenDayCasePercentage =
          ((caseSevenDay - sevenDay3) / sevenDay3) * 100

        if (
          !sevenDayTestPercentage ||
          sevenDayTestPercentage === Infinity ||
          sevenDayTestPercentage === -100
        ) {
          return {
            ...fill,
            testChange,
            caseChange,
            testPercentage,
            casePercentage,
          }
        } else {
          return {
            ...fill,
            testChange,
            caseChange,
            testPercentage,
            casePercentage,
            testSevenDay: testSevenDay.toFixed(1),
            caseSevenDay: caseSevenDay.toFixed(1),
            sevenDayTestPercentage: sevenDayTestPercentage.toFixed(1),
            sevenDayCasePercentage: sevenDayCasePercentage.toFixed(1),
          }
        }
      })

      return result
    })
    .catch(() => {
      return { error: 'Unable to retrieve data' }
    })

  return res
}

function cases(item) {
  return item.newCases
}

function tests(item) {
  return item.newTests
}
