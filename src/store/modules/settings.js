import {mutationsTypes as authMutationsTypes} from '@/store/modules/auth'

const state = {
  isSubmitting: false,
  validationErrors: false,
}

const mutations = {
  [authMutationsTypes.updateCurrentUserStart]: (state) => {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [authMutationsTypes.updateCurrentUserSuccess]: (state) => {
    state.isSubmitting = false
  },
  [authMutationsTypes.updateCurrentUserFail]: (state, payload) => {
    state.isSubmitting = false
    state.validationErrors = payload
  },
}

export default {
  state,
  mutations,
}
