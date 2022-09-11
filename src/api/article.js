import axios from '@/api/axios'

export function getArticle(slug) {
  return axios
    .get(`/articles/${slug}`)
    .then((response) => response.data.article)
}

export function deleteArticle(slug) {
  return axios.delete(`/articles/${slug}`)
}
