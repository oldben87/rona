export function formatHomeResults(array) {
  const noNull = array.map((item) => {
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
