import axios from 'axios'

export function popularTagsApi() {
  return axios.get('/tags').then((response) => response.data.tags)
}
