import {createArticle} from '@/api/article'

const state = {
  isSubmitting: false,
  validationErrors: null,
}

export const mutationTypes = {
  createArticleStart: '[createArticle] create article start',
  createArticleSuccess: '[createArticle] create article success',
  createArticleFail: '[createArticle] create article fail',
}
export const actionTypes = {
  createArticle: '[createArticle] create article',
}

const mutations = {
  [mutationTypes.createArticleStart]: (state) => {
    state.isSubmitting = false
  },
  [mutationTypes.createArticleSuccess]: (state) => {
    state.isSubmitting = false
  },
  [mutationTypes.createArticleFail]: (state, payload) => {
    state.isSubmitting = true
    state.validationErrors = payload
  },
}

const actions = {
  [actionTypes.createArticle](context, articleInput) {
    console.log('action', articleInput)
    return new Promise((resolve) => {
      context.commit(mutationTypes.createArticleStart)
      createArticle(articleInput)
        .then((article) => {
          context.commit(mutationTypes.createArticleSuccess, article)
          resolve(article)
        })
        .catch((result) => {
          console.log(result, 'result')
          context.commit(mutationTypes.createArticleFail, result.response.data)
        })
    })
  },
}

export default {
  mutations,
  actions,
  state,
}
