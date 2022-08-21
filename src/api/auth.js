import axios from './axios'

function register(credentials) {
  return axios.post('/users', {user: credentials})
}

export default {
  register,
}
