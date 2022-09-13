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
  return axios
    .post('/articles/', {article: articleData})
    .then((response) => response.data.article)
}

export default {
  getArticle,
  deleteArticle,
  createArticle,
}
