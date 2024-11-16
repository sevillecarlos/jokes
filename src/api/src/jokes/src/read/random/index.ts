//API Call for Read Jokes
import { getData } from '@/api/src/jokes/src/api-call'
import {
  API_JOKES_RANDOM_JOKE_ROUTE,
  API_JOKES_RANDOM_TYPE_TEN_JOKE_ROUTE,
} from '@/api/src/jokes/config'
import { replaceValue } from '@/utils/helper/src'
import { KEYS } from '@/api/src/jokes/config'

const readRandom = (quantity: number) => getData(`${API_JOKES_RANDOM_JOKE_ROUTE}${quantity}`)

const readRandomType = (type: string) =>
  getData(replaceValue(API_JOKES_RANDOM_TYPE_TEN_JOKE_ROUTE as string, KEYS.type, type))

export { readRandom, readRandomType }
