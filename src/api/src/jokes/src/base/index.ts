//Creating the setup for Axios Client for be more reusable
import axios from 'axios'
import { API_JOKE_BASE_URL as baseURL } from '../../config'

const setup = () => {
  const { get } = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return { get }
}
//Only call the GET method for Assigment case only, Normally we need all CRUD methods.
export const { get } = setup()
