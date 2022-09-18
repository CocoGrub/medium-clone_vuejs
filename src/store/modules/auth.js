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

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFail: '[auth] registerFail',

  loginStart: '[auth] registerStart',
  loginSuccess: '[auth] registerSuccess',
  loginFail: '[auth] registerFail',

  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFail: '[auth] getCurrentUserFail',

  updateCurrentUserStart: '[auth] updateCurrentUserStart',
  updateCurrentUserSuccess: '[auth] updateCurrentUserSuccess',
  updateCurrentUserFail: '[auth] updateCurrentUserFail',

  logout: '[auth] logout',
}
export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser',
  updateCurrentUser: '[auth] updateCurrentUser',
  logout: '[auth] logout',
}

const mutations = {
  [mutationTypes.registerStart](state) {
    state.validationErrors = false
    state.isSubmitting = true
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.registerFail](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationTypes.loginStart](state) {
    state.validationErrors = false
    state.isSubmitting = true
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.loginFail](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.getCurrentUserFail](state) {
    state.isLoading = false
    state.isLoggedIn = false
    state.currentUser = null
  },

  [mutationTypes.updateCurrentUserStart]() {},
  [mutationTypes.updateCurrentUserSuccess](state, payload) {
    state.currentUser = payload
  },
  [mutationTypes.updateCurrentUserFail]() {},

  [mutationTypes.logout]() {
    state.currentUser = null
    state.isLoggedIn = false
  },
}

const actions = {
  [actionTypes.register](context, credentials) {
    context.commit(mutationTypes.registerStart)
    return new Promise((resolve, reject) => {
      authApi
        .register(credentials)
        .then((response) => {
          context.commit(mutationTypes.registerSuccess, response.data.user)
          setItem('accessToken', response.data.user.token)
          resolve(response)
        })
        .catch((result) => {
          reject(result)
          context.commit(
            mutationTypes.registerFail,
            result.response.data.errors
          )
        })
    })
  },
  [actionTypes.login](context, credentials) {
    context.commit(mutationTypes.loginStart)
    return new Promise(() => {
      authApi
        .login(credentials)
        .then((response) => {
          context.commit(mutationTypes.loginSuccess(state, response.data.user))
        })
        .catch((result) => {
          context.commit(
            mutationTypes.loginFail,
            (state, result.response.data.errors)
          )
        })
    })
  },
  [actionTypes.getCurrentUser](context) {
    context.commit(mutationTypes.getCurrentUserStart)
    return new Promise((resolve) => {
      authApi
        .getCurrentUser()
        .then((response) => {
          context.commit(
            mutationTypes.getCurrentUserSuccess,
            response.data.user
          )
          resolve(response.data.user)
        })
        .catch(() => {
          context.commit(mutationTypes.getCurrentUserFail)
        })
    })
  },
  [actionTypes.updateCurrentUser](context, {currentUserInput}) {
    context.commit(mutationTypes.updateCurrentUserStart)
    return new Promise((resolve) => {
      authApi
        .updateCurrentUser(currentUserInput)
        .then((user) => {
          context.commit(mutationTypes.updateCurrentUserSuccess, user)
          resolve(user)
        })
        .catch((result) => {
          context.commit(
            mutationTypes.updateCurrentUserFail,
            result.response.data.errors
          )
        })
    })
  },
  [actionTypes.logout](context) {
    return new Promise((resolve) => {
      setItem('accessToken', '')
      context.commit(mutationTypes.logout)
      resolve()
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
