import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistantStorage'

const mutationsTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFail: '[auth] registerFail',
  loginStart: '[auth] registerStart',
  loginSuccess: '[auth] registerSuccess',
  loginFail: '[auth] registerFail',
}
export const actionsTypes = {
  register: '[auth] register',
  login: '[auth] login',
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
  [mutationsTypes.loginStart](state) {
    state.validationErrors = false
    state.isSubmitting = true
  },
  [mutationsTypes.loginSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationsTypes.loginFail](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
}

const actions = {
  [actionsTypes.register](context, credentials) {
    context.commit(mutationsTypes.registerStart)
    return new Promise((resolve, reject) => {
      authApi
        .register(credentials)
        .then((response) => {
          context.commit(mutationsTypes.registerSuccess, response.data.user)
          setItem('accessTocken', response.data.user.token)
          resolve(response)
        })
        .catch((result) => {
          reject(result)
          context.commit(
            mutationsTypes.registerFail,
            result.response.data.errors
          )
        })
    })
  },
  [actionsTypes.login](context, credentials) {
    context.commit(mutationsTypes.loginStart)
    return new Promise(() => {
      authApi
        .login(credentials)
        .then((response) => {
          context.commit(mutationsTypes.loginSuccess(state, response.data.user))
        })
        .catch((result) => {
          context.commit(
            mutationsTypes.loginFail,
            (state, result.response.data.errors)
          )
        })
    })
  },
}

export default {state, mutations, actions}
