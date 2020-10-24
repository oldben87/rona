export async function fetchHome() {
  const headers = new Headers()
  headers.append('Pragma', 'no-cache')
  headers.append('Cache-Control', 'no-store, must-revalidate, no-cache')
  headers.append('Expires', 0)

  const structure = {
    date: 'date',
    newCases: 'newCasesByPublishDate',
    newTests: 'newTestsByPublishDate',
    newDeaths: 'newDeaths28DaysByPublishDate',
    newAdmissions: 'newAdmissions',
    covidBeds: 'covidOccupiedMVBeds',
    hospitalCases: 'hospitalCases',
    cumCasesByPublishDate: 'cumCasesByPublishDate',
    cumDeaths28DaysByPublishDate: 'cumDeaths28DaysByPublishDate',
    cumAdmissions: 'cumAdmissions',
    cumTestsByPublishDate: 'cumTestsByPublishDate',
  }
  const uri =
    'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure='

  const res = await fetch(uri + JSON.stringify(structure), headers)
    .then((response) => response.json())
    .then((data) => {
      if (data.statusCode > 204 || data.data === null) {
        throw new Error('Not good status')
      }
      // Remove Null's and replace with 0
      const noNull = data.data.map((item) => {
        let result_no_null = {
          date: item.date.split('-').reverse().join('-'),
          newCases: item.newCases || 0,
          newTests: item.newTests || 0,
          newDeaths: item.newDeaths || 0,
          newAdmissions: item.newAdmissions || 0,
          covidBeds: item.covidBeds || 0,
          hospitalCases: item.hospitalCases || 0,
          cumCasesByPublishDate: item.cumCasesByPublishDate || 0,
          cumDeaths28DaysByPublishDate: item.cumDeaths28DaysByPublishDate || 0,
          cumAdmissions: item.cumAdmissions || 0,
          cumTestsByPublishDate: item.cumTestsByPublishDate || 0,
        }
        return result_no_null
      })
      // calculate difference in days and add to reponse
      const result = noNull.map((fill, index) => {
        const testSevenDay =
          noNull
            .slice(index - 3, index + 3)
            .map(tests)
            .reduce((a, b) => a + b, 0) / 7

        const caseSevenDay =
          noNull
            .slice(index - 3, index + 3)
            .map(cases)
            .reduce((a, b) => a + b, 0) / 7

        const deathSevenDay =
          noNull
            .slice(index - 3, index + 3)
            .map(deaths)
            .reduce((a, b) => a + b, 0) / 7

        if (index < 3) {
          return {
            ...fill,
          }
        } else {
          return {
            ...fill,
            testSevenDay: testSevenDay.toFixed(1),
            caseSevenDay: caseSevenDay.toFixed(1),
            deathSevenDay: deathSevenDay.toFixed(1),
          }
        }
      })
      // send result of data
      return result
    })
    .catch(() => {
      return { error: 'Server Error, Failed to get response from API' }
    })

  return res
}

function cases(item) {
  return item.newCases
}

function tests(item) {
  return item.newTests
}

function deaths(item) {
  return item.newDeaths
}
