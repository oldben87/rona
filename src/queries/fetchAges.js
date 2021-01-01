export const fetchAges = async () => {
  const headers = new Headers()
  headers.append('Pragma', 'no-cache')
  headers.append('Cache-Control', 'no-store, must-revalidate, no-cache')
  headers.append('Expires', 0)

  const structure = {
    date: 'date',
    cumAdmissionsByAge: 'cumAdmissionsByAge',
  }
  const uri =
    'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure='

  const data = await fetch(uri + JSON.stringify(structure), headers)
    .then((response) => response.json())
    .then((data) => {
      if (data.statusCode > 204 || data.data === null) {
        throw new Error('Not good status')
      }
      // reformat to populate null responses from fetch
      return data.data
    })
    .catch(() => {
      return { error: 'Server Error: unable to fetch' }
    })

  return data
}
