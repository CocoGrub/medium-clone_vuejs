import axios from '@/api/axios'

function getArticle(slug) {
  return axios
    .get(`/articles/${slug}`)
    .then((response) => response.data.article)
}

function deleteArticle(slug) {
  return axios.delete(`/articles/${slug}`)
}

function createArticle(articleData) {
  console.log(articleData)
  return axios
    .post(`/articles`, {article: articleData})
    .then((response) => response.data.article)
}

function updateArticle(slug, articleInput) {
  return axios
    .put(`/articles/${slug}`, articleInput)
    .then((response) => response.data.article)
}

export {getArticle, deleteArticle, createArticle, updateArticle}
