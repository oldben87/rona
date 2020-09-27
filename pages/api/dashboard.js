export default async function hello(req, res) {
  const headers = new Headers()
  headers.append("pragma", "no-cache")
  headers.append("cache-control", "no-store")

  const callRona =
    "https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure={%22date%22:%22date%22,%22newCases%22:%22newCasesByPublishDate%22,%20%22newTests%22:%22newTestsByPublishDate%22}"
  try {
    await fetch(callRona, headers)
      .then((response) => response.json())
      .then((data) => {
        const response = data.data
        // reformat to populate null responses from fetch
        const noNull = response.map((item) => {
          let result_no_null = {
            date: item.date.split("-").reverse().join("-"),
            newCases: item.newCases || 0,
            newTests: item.newTests || 0,
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

          if (index < 3) {
            return {
              ...fill,
              date: fill.date,
              newCases: fill.newCases,
              newTests: fill.newTests,
            }
          } else {
            return {
              ...fill,
              date: fill.date,
              newCases: fill.newCases,
              newTests: fill.newTests,
              testSevenDay: testSevenDay.toFixed(1),
              caseSevenDay: caseSevenDay.toFixed(1),
            }
          }
        })
        // send result of data
        if (data.statusCode > 204) {
          throw Error("Not good status")
        } else {
          res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate")
          res.send({ status: 200, data: result })
        }
      })
      .catch(() =>
        res.send({
          status: 500,
          data: { error: "No response from Corona API Server" },
        })
      )
  } catch (err) {
    res.send({
      status: 500,
      data: { error: "No response from server" },
    })
  }
}

export function cases(item) {
  return item.newCases
}

export function tests(item) {
  return item.newTests
}
