import * as R from 'ramda'

export const noNulls = (item) => {
  const newItem = item

  R.forEach((key) => {
    newItem[key] = newItem[key] || 0
  }, R.keys(newItem))

  return newItem
}
