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

function updateCurrentUser(currentUserInput) {
  return axios
    .put('/user', {user: currentUserInput})
    .then((response) => response.data.user)
}

export default {
  register,
  login,
  getCurrentUser,
  updateCurrentUser,
}
