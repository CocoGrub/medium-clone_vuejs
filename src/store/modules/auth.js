import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistantStorage'

const state = {
  isSubmitting: false,
  currentUser: null,
  user: null,
  validationErrors: null,
  isLoggedIn: null,
  isLoading: false,
}

const mutationsTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFail: '[auth] registerFail',

  loginStart: '[auth] registerStart',
  loginSuccess: '[auth] registerSuccess',
  loginFail: '[auth] registerFail',

  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFail: '[auth] getCurrentUserFail',
}
export const actionsTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser',
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
  [mutationsTypes.getCurrentUserStart](state) {
    state.isLoading = true
  },
  [mutationsTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationsTypes.getCurrentUserFail](state) {
    state.isLoading = false
    state.isLoggedIn = false
    state.currentUser = null
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
          setItem('accessToken', response.data.user.token)
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
  [actionsTypes.getCurrentUser](context) {
    context.commit(mutationsTypes.getCurrentUserStart)
    return new Promise((resolve) => {
      authApi
        .getCurrentUser()
        .then((response) => {
          console.log('user', response.data.user)
          context.commit(
            mutationsTypes.getCurrentUserSuccess,
            response.data.user
          )
          resolve(response.data.user)
        })
        .catch(() => {
          context.commit(mutationsTypes.getCurrentUserFail)
        })
    })
  },
}

export const getterTypes = {
  currentUser: '[auth] current user',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonymous: '[auth] isAnonymous',
}

const getters = {
  // getters доступны отовсюду
  [getterTypes.currentUser]: (state) => {
    return state.currentUser
  },
  [getterTypes.isLoggedIn]: (state) => {
    return Boolean(state.isLoggedIn)
  },
  [getterTypes.isAnonymous]: (state) => {
    return state.isLoggedIn === false
  },
}

export default {state, mutations, actions, getters}
