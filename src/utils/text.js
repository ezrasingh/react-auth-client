import { startCase, lowerCase, flow } from 'lodash'

/** Return string with each words first letter capitalized */
export const titleCase = flow(lowerCase, startCase)