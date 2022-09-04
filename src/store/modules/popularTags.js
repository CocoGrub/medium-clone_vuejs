import {popularTagsApi} from '@/api/popularTags'

const state = {
  data: null,
  isLoading: false,
  error: null,
}

export const mutationsTypes = {
  getPopularTagsStart: '[popularTags] getPopularTagsStart',
  getPopularTagsSuccess: '[popularTags] getPopularTagsSuccess',
  getPopularTagsFail: '[popularTags] getPopularTagsFail',
}

const mutations = {
  [mutationsTypes.getPopularTagsStart]: (state) => {
    state.isLoading = true
  },
  [mutationsTypes.getPopularTagsSuccess]: (state, payload) => {
    state.data = payload
    state.isLoading = false
  },
  [mutationsTypes.getPopularTagsFail]: (state) => {
    state.isLoading = false
  },
}

export const actionsTypes = {
  getPopularTags: '[popularTags] getPopularTags',
}

const actions = {
  [actionsTypes.getPopularTags]: (context) => {
    return new Promise((resolve) => {
      context.commit(mutationsTypes.getPopularTagsStart)
      popularTagsApi()
        .then((tags) => {
          context.commit(mutationsTypes.getPopularTagsSuccess, tags)
          resolve(tags)
        })
        .catch(() => {
          context.commit(mutationsTypes.getPopularTagsFail)
        })
    })
  },
}

export default {state, mutations, actions}
