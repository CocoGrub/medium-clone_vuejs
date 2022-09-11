import {deleteArticle, getArticle} from '@/api/article'

const state = {
  data: null,
  isLoading: false,
  error: null,
}

export const mutationsTypes = {
  getArticleStart: '[article] getArticleStart',
  getArticleSuccess: '[article] getArticleSuccess',
  getArticleFail: '[article] getArticleFail',

  deleteArticleStart: '[article] deleteArticleStart',
  deleteArticleSuccess: '[article] deleteArticleSuccess',
  deleteArticleFail: '[article] deleteArticleFail',
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

  [mutationsTypes.deleteArticleStart]: () => {},
  [mutationsTypes.deleteArticleSuccess]: () => {},
  [mutationsTypes.deleteArticleFail]: () => {},
}

export const actionsTypes = {
  getArticle: '[article] getArticle',
  deleteArticle: '[article] deleteArticle',
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
  [actionsTypes.deleteArticle]: (context, {slug}) => {
    return new Promise((resolve) => {
      context.commit(mutationsTypes.deleteArticleStart)
      deleteArticle(slug)
        .then(() => {
          context.commit(mutationsTypes.deleteArticleSuccess)
          resolve()
        })
        .catch(() => {
          context.commit(mutationsTypes.deleteArticleFail)
        })
    })
  },
}

export default {state, mutations, actions}
