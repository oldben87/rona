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
      const { statusCode } = data
      if (statusCode > 204 || data.data === null) {
        throw new Error('Not good status')
      }
      // reformat to populate null responses from fetch
      return data.data.map((item, i, arr) => {
        const under5 = item.cumAdmissionsByAge.findIndex(
          (item) => item.age === '0_to_5'
        )
        const under17 = item.cumAdmissionsByAge.findIndex(
          (item) => item.age === '6_to_17'
        )
        let curr =
          item.cumAdmissionsByAge[under17].value +
          item.cumAdmissionsByAge[under5].value
        let next = arr[i + 1]
          ? arr[i + 1].cumAdmissionsByAge[under17].value +
            arr[i + 1].cumAdmissionsByAge[under5].value
          : 0
        return {
          date: item.date,
          newAdmission: curr - next || 0,
        }
      })
    })
    .catch(() => {
      return { error: 'Server Error: unable to fetch' }
    })

  return data
}
