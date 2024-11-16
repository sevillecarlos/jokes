//API Call for Read Types
import { getData } from '@/api/src/jokes/src/api-call'
import { API_JOKES_TYPES_ROUTE } from '@/api/src/jokes/config'

const readType = () => getData(API_JOKES_TYPES_ROUTE as string)

export { readType }
