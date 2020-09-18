export default async (req, res) => {
  const callRona =
    "https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure={%22date%22:%22date%22,%22newCases%22:%22newCasesByPublishDate%22,%20%22newTests%22:%22newTestsByPublishDate%22}"
  try {
    await fetch(callRona)
      .then((response) => response.json())
      .then((data) => {
        const response = data.data
        // reformat to populate null responses from fetch
        const noNull = response.map((item) => {
          let result_no_null = {
            date: item.date,
            newCases: item.newCases || 0,
            newTests: item.newTests || 0,
          }
          return result_no_null
        })
        // calculate difference in days and add to reponse
        const result = noNull.map((fill, index) => {
          const slice = noNull.slice(index, index + 2)
          const new_tests = slice.map(tests)
          const new_cases = slice.map(cases)

          const testChange = new_tests.reduce((a, b) => a - b)
          const caseChange = new_cases.reduce((a, b) => a - b)

          const testPercentage = Math.floor((testChange / new_tests[1]) * 100)
          const casePercentage = Math.floor((caseChange / new_cases[1]) * 100)

          return {
            ...fill,
            testChange,
            caseChange,
            testPercentage,
            casePercentage,
          }
        })
        //send result of data
        res.send({ status: 200, data: result })
      })
      .catch(() => res.send({ status: 400, error: "Failed to Fetch" }))
  } catch (err) {
    console.log(err)
  }
}

function cases(item) {
  return item.newCases
}

function tests(item) {
  return item.newTests
}
