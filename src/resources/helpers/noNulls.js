import * as R from 'ramda'

export const noNulls = (obj) => R.map((prop) => prop || 0)(obj)
