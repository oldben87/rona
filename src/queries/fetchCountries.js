import { formatHomeResults } from 'resources/helpers'

export async function fetchCountries() {
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
  const uriEngland =
    'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure='

  const england = await fetch(uriEngland + JSON.stringify(structure), headers)
    .then((response) => response.json())
    .then((data) => {
      if (data.statusCode > 204 || data.data === null) {
        throw new Error('Not good status')
      }
      return formatHomeResults(data.data)
      // reformat to populate null responses from fetch
    })
    .catch(() => {
      return { error: 'Server Error, England data not found' }
    })

  const uriWales =
    'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=wales&structure='

  const wales = await fetch(uriWales + JSON.stringify(structure), headers)
    .then((response) => response.json())
    .then((data) => {
      if (data.statusCode > 204 || data.data === null) {
        throw new Error('Not good status')
      }
      return formatHomeResults(data.data)
      // reformat to populate null responses from fetch
    })
    .catch(() => {
      return { error: 'Server Error, Wales data not found' }
    })

  const uriScotland =
    'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=scotland&structure='

  const scotland = await fetch(uriScotland + JSON.stringify(structure), headers)
    .then((response) => response.json())
    .then((data) => {
      if (data.statusCode > 204 || data.data === null) {
        throw new Error('Not good status')
      }
      return formatHomeResults(data.data)
      // reformat to populate null responses from fetch
    })
    .catch(() => {
      return { error: 'Server Error, Scotland data not found' }
    })

  const uriNorthernIreland =
    'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=Northern Ireland&structure='

  const northernIreland = await fetch(
    uriNorthernIreland + JSON.stringify(structure),
    headers
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.statusCode > 204 || data.data === null) {
        throw new Error('Not good status')
      }
      return formatHomeResults(data.data)
      // reformat to populate null responses from fetch
    })
    .catch(() => {
      return { error: 'Server Error, NI data not found' }
    })

  return { england, wales, scotland, northernIreland }
}
