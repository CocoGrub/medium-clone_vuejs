import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistantStorage'

const state = {
  isSubmitting: false,
  currentUser: null,
  user: null,
  validiationError: null,
  isLoggedIn: null,
}
const mutations = {
  registerStart(state) {
    state.validiationError = false
    state.isSubmitting = true
  },
  registerSuccess(state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  registerFail(state, payload) {
    state.isSubmitting = false
    state.errors = payload
  },
}

const actions = {
  ARegister(context, credentials) {
    context.commit('registerStart')
    return new Promise((resolve, reject) => {
      authApi
        .register(credentials)
        .then((response) => {
          context.commit('registerSuccess', response.data.user)
          setItem('accessTocken', response.data.user.token)
          resolve(response)
        })
        .catch((result) => {
          reject(result)
          context.commit('registerFail', result.response.data.errors)
        })
    })
  },
}

export default {state, mutations, actions}
