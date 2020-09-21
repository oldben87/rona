export default async function hello(req, res) {
  const callRona =
    "https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=utla;areaName=Bristol,%20City%20of&structure={%22date%22:%22date%22,%22newCases%22:%22newCasesByPublishDate%22,%20%22newTests%22:%22newTestsByPublishDate%22}"
  try {
    await fetch(callRona)
      .then((response) => response.json())
      .then((data) => {
        const response = data.data
        // reformat to populate null responses from fetch
        const noNull = response.map((item) => {
          let result_no_null = {
            date: item.date.split("-").reverse().join(" - "),
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

          const testPercentage = ((testChange / new_tests[1]) * 100).toFixed(1)
          const casePercentage = ((caseChange / new_cases[1]) * 100).toFixed(1)

          const testSevenDay =
            noNull
              .slice(index, index + 7)
              .map(tests)
              .reduce((a, b) => a + b, 0) / 7

          const testSevenDaySlice = noNull.slice(index + 1, index + 8)
          const sevenDay2 = (
            testSevenDaySlice
              .map(tests)
              .reduce((sum, current) => sum + current, 0) / 7
          ).toFixed(1)

          const sevenDayTestPercentage =
            ((testSevenDay - sevenDay2) / sevenDay2) * 100

          const caseSevenDay =
            noNull
              .slice(index, index + 7)
              .map(cases)
              .reduce((a, b) => a + b) / 7

          const sevenDay3 = (
            testSevenDaySlice
              .map(cases)
              .reduce((sum, current) => sum + current, 0) / 7
          ).toFixed(1)

          const sevenDayCasePercentage =
            ((caseSevenDay - sevenDay3) / sevenDay3) * 100
          return {
            ...fill,
            testChange,
            caseChange,
            testPercentage,
            casePercentage,
            testSevenDay: testSevenDay.toFixed(1),
            caseSevenDay: caseSevenDay.toFixed(1),
            sevenDayTestPercentage: sevenDayTestPercentage.toFixed(2),
            sevenDayCasePercentage: sevenDayCasePercentage.toFixed(2),
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

export function cases(item) {
  return item.newCases
}

export function tests(item) {
  return item.newTests
}
