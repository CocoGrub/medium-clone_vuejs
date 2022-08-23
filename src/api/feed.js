import axios from 'axios'

export function getFeed(apiUrl) {
  return axios.get(apiUrl)
}
