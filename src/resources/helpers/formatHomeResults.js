import * as R from 'ramda'

import { noNulls } from 'resources/helpers'

const sevenDay = (fn, arr, i) => {
  return R.compose(R.mean, R.map(fn), R.slice(i - 3, i + 3))(arr)
}

export function formatHomeResults(array) {
  const noNull = R.compose(R.map(noNulls), R.dropLast(60))(array)
  // calculate difference in days and add to reponse
  const result = noNull.map((obj, index) => {
    if (index < 3) {
      return {
        ...obj,
      }
    }
    const testSevenDay = sevenDay(tests, noNull, index)

    const caseSevenDay = sevenDay(cases, noNull, index)

    const deathSevenDay = sevenDay(deaths, noNull, index)

    return {
      ...obj,
      testSevenDay: testSevenDay.toFixed(1),
      caseSevenDay: caseSevenDay.toFixed(1),
      deathSevenDay: deathSevenDay.toFixed(1),
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
