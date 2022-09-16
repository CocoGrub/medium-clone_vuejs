import {updateArticle} from '@/api/article'

const state = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  article: null,
}

export const mutationTypes = {
  updateArticleStart: '[updateArticle] update article start',
  updateArticleSuccess: '[updateArticle] update article success',
  updateArticleFail: '[updateArticle] update article fail',

  getArticleStart: '[updateArticle] update article start',
  getArticleSuccess: '[updateArticle] update article success',
  getArticleFail: '[updateArticle] update article fail',
}
export const actionTypes = {
  updateArticle: '[updateArticle] update article',
  getArticle: '[updateArticle] update article',
}

const mutations = {
  [mutationTypes.updateArticleStart]: (state) => {
    state.isSubmitting = true
  },
  [mutationTypes.updateArticleSuccess]: (state) => {
    state.isSubmitting = false
  },
  [mutationTypes.updateArticleFail]: (state, payload) => {
    state.isSubmitting = false
    state.validationErrors = payload
  },

  [mutationTypes.getArticleStart]: (state) => {
    state.isLoading = true
  },
  [mutationTypes.getArticleSuccess]: (state, payload) => {
    state.isLoading = false
    state.article = payload
  },
  [mutationTypes.getArticleFail]: (state, payload) => {
    state.isLoading = false
    state.validationErrors = payload
  },
}

const actions = {
  [actionTypes.updateArticle](context, {slug, articleInput}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.updateArticleStart)
      updateArticle(slug, articleInput)
        .then((article) => {
          context.commit(mutationTypes.updateArticleSuccess, article)
          resolve(article)
        })
        .catch((result) => {
          context.commit(mutationTypes.updateArticleFail, result.response.data)
        })
    })
  },
  // [actionsTypes.getArticle]: (context, {slug}) => {
  //   return new Promise((resolve) => {
  //     context.commit(mutationsTypes.getArticleStart)
  //     getArticle(slug)
  //       .then((tags) => {
  //         context.commit(mutationsTypes.getArticleSuccess, tags)
  //         resolve(tags)
  //       })
  //       .catch(() => {
  //         context.commit(mutationsTypes.getArticleFail)
  //       })
  //   })
  // },
}

export default {
  mutations,
  actions,
  state,
}
