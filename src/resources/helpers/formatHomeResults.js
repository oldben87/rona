import * as R from 'ramda'

import { noNulls } from 'resources/helpers'

export const sevenDay = (mapFunction, array, indexOfItem) => {
  return R.compose(
    R.mean,
    R.map(mapFunction),
    R.slice(indexOfItem - 3, indexOfItem + 3),
  )(array)
}

export function formatHomeResults(array) {
  //remove null values and removes jan-feb
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
  return result.slice(0, 180)
}

export function cases(item) {
  return item.newCases
}

export function tests(item) {
  return item.newTests
}

export function deaths(item) {
  return item.newDeaths
}

export function covidBeds(item) {
  return item.covidBeds
}
