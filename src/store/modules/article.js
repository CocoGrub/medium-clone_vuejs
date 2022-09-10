import {getArticle} from '@/api/article'

const state = {
  data: null,
  isLoading: false,
  error: null,
}

export const mutationsTypes = {
  getArticleStart: '[article] getArticleStart',
  getArticleSuccess: '[article] getArticleSuccess',
  getArticleFail: '[article] getArticleFail',
}

const mutations = {
  [mutationsTypes.getArticleStart]: (state) => {
    state.isLoading = true
  },
  [mutationsTypes.getArticleSuccess]: (state, payload) => {
    state.data = payload
    state.isLoading = false
  },
  [mutationsTypes.getArticleFail]: (state) => {
    state.isLoading = false
  },
}

export const actionsTypes = {
  getArticle: '[article] getArticle',
}

const actions = {
  [actionsTypes.getArticle]: (context, {slug}) => {
    return new Promise((resolve) => {
      context.commit(mutationsTypes.getArticleStart)
      getArticle(slug)
        .then((tags) => {
          context.commit(mutationsTypes.getArticleSuccess, tags)
          resolve(tags)
        })
        .catch(() => {
          context.commit(mutationsTypes.getArticleFail)
        })
    })
  },
}

export default {state, mutations, actions}
