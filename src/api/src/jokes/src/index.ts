//Let call all our Jokes methods
import { readRandom, readRandomType } from '@/api/src/jokes/src/read/random'
import { readType } from '@/api/src/jokes/src/read/types'

//Personal thing, I like to create a main of CRUD for every type, in this case JOKES
export const JokesApiMethods = {
  Read: {
    readRandom,
    readRandomType,
    readType,
  },
}
