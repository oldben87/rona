import { formatHomeResults } from 'resources/helpers'

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
    .then(response => response.json())
    .then(data => {
      if (data.statusCode > 204 || data.data === null) {
        throw new Error('Not good status')
      }

      return formatHomeResults(data.data)
    })
    .catch(() => {
      return { error: 'Server Error, Failed to get response from API' }
    })

  return res.slice(0, 180)
}
