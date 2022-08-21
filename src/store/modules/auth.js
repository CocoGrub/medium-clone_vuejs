import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistantStorage'

const mutationsTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFail: '[auth] registerFail',
}
export const actionsTypes = {
  register: '[auth] register',
}

const state = {
  isSubmitting: false,
  currentUser: null,
  user: null,
  validationErrors: null,
  isLoggedIn: null,
}
const mutations = {
  [mutationsTypes.registerStart](state) {
    state.validationErrors = false
    state.isSubmitting = true
  },
  [mutationsTypes.registerSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationsTypes.registerFail](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
}

const actions = {
  [actionsTypes.register](context, credentials) {
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
