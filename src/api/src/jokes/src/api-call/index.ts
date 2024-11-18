//Creating a Main Promise Call methods, only making Get method(for assigment case onyl, normally create all CRUD method)
import { get } from '../base'
import type { Jokes } from '../../model'
import { type AxiosResponse, AxiosError } from 'axios'

const getData = (url: string): Promise<Jokes | Jokes[] | String[] | AxiosError<unknown, any>> =>
  get(url)
    .then((response: AxiosResponse<Jokes | Jokes[] | String[]>) => response.data)
    .catch((error: AxiosError) => error)

export { getData }
