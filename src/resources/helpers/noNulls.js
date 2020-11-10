import * as R from 'ramda'

export const noNulls = R.map((prop) => prop || 0)
