import {getFeed} from '@/api/feed'

const state = {
  data: null,
  isLoading: false,
  error: null,
}

export const mutationsTypes = {
  getFeedStart: '[feed] getFeedStart',
  getFeedSuccess: '[feed] getFeedSuccess',
  getFeedFail: '[feed] getFeedFail',
}

export const actionsTypes = {
  getFeed: '[feed] getFeed',
}

const mutations = {
  [mutationsTypes.getFeedStart]: (state) => {
    state.isLoading = true
  },
  [mutationsTypes.getFeedSuccess]: (state, payload) => {
    state.data = payload
    state.isLoading = false
  },
  [mutationsTypes.getFeedFail]: (state) => {
    state.isLoading = false
  },
}
const actions = {
  [actionsTypes.getFeed]: (context, {apiUrl}) => {
    return new Promise((resolve) => {
      context.commit(mutationsTypes.getFeedStart)
      getFeed(apiUrl)
        .then((response) => {
          context.commit(mutationsTypes.getFeedSuccess, response.data)
          resolve(response.data)
        })
        .catch(() => {
          context.commit(mutationsTypes.getFeedFail)
        })
    })
  },
}

export default {state, mutations, actions}
