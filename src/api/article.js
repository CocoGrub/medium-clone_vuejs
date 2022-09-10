import axios from '@/api/axios'

function getArticle(slug) {
  return axios
    .get(`/articles/${slug}`)
    .then((response) => response.data.article)
}

export default {getArticle}
