import authApi from '@/api/auth'

const state = {
  isSubmitting: false,
}
const mutations = {
  registerStart(state) {
    state.isSubmitting = true
  },
  registerSuccess(state) {
    state.isSubmitting = false
  },
  registerFail(state) {
    state.isSubmitting = false
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
