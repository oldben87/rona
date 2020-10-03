export default async function hello(req, res) {
  // fuck this header shit
  const headers = new Headers()
  headers.append("Pragma", "no-cache")
  headers.append("Cache-Control", "no-store, must-revalidate, no-cache")
  headers.append("Expires", 0)
  res.setHeader("Pragma", "no-cache")
  res.setHeader("Cache-Control", "no-store, must-revalidate, no-cache")
  res.setHeader("Expires", 0)

  const callRona =
    "https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview" +
    "&structure={" +
    "%22date%22:%22date%22," +
    "%22newCases%22:%22newCasesByPublishDate%22," +
    "%22newTests%22:%22newTestsByPublishDate%22," +
    "%22newDeaths%22:%22newDeaths28DaysByPublishDate%22," +
    "%22newAdmissions%22:%22newAdmissions%22," +
    "%22covidBeds%22:%22covidOccupiedMVBeds%22," +
    "%22hospitalCases%22:%22hospitalCases%22" +
    "}"

  try {
    await fetch(callRona, headers)
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode > 204 || data.data === null) {
          throw new Error("Not good status")
        }
        const response = data.data
        // reformat to populate null responses from fetch
        const noNull = response.map((item) => {
          let result_no_null = {
            date: item.date.split("-").reverse().join("-"),
            newCases: item.newCases || 0,
            newTests: item.newTests || 0,
            newDeaths: item.newDeaths || 0,
            newAdmissions: item.newAdmissions || 0,
            covidBeds: item.covidBeds || 0,
            hospitalCases: item.hospitalCases || 0,
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
        res.send({ status: 200, data: result })
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

function cases(item) {
  return item.newCases
}

function tests(item) {
  return item.newTests
}

function deaths(item) {
  return item.newDeaths
}
