import { noNulls } from 'resources/helpers'

export const fetchImmunity = async () => {
  const headers = new Headers()
  headers.append('Pragma', 'no-cache')
  headers.append('Cache-Control', 'no-store, must-revalidate, no-cache')
  headers.append('Expires', 0)

  const structure = {
    date: 'date',
    cumCasesByPublishDate: 'cumCasesByPublishDate',
    newDeaths: 'newDeaths28DaysByPublishDate',
    cumDeaths28DaysByPublishDate: 'cumDeaths28DaysByPublishDate',
    cumAdmissions: 'cumAdmissions',
  }

  const uri =
    'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure='

  const data = await fetch(uri + JSON.stringify(structure), headers)
    .then((response) => response.json())
    .then((data) => {
      if (data.statusCode > 204 || data.data === null) {
        throw new Error('Not good status')
      }
      // reformat to populate null responses from fetch
      return data.data.map(noNulls)
    })
    .catch(() => {
      return { error: 'Server Error: unable to fetch' }
    })

  return data
}
