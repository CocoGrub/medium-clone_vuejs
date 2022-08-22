import axios from './axios'

function register(credentials) {
  return axios.post('/users', {user: credentials})
}

function login(credentials) {
  return axios.post('/users/login', {user: credentials})
}
function getCurrentUser() {
  return axios.get('/user')
}

export default {
  register,
  login,
  getCurrentUser,
}
