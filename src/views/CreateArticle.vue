<template>
  <mcv-article-form :initialValues='initialValues' :errors='validationErrors' :isSubmitting='isSubmitting'
                    @articleSubmit='onSubmit' />
</template>

<script>
import McvArticleForm from '@/components/ArticleForm'
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/createArticle'

export default {
  name: 'McvCreateArticle',
  components: {
    McvArticleForm
  },
  data() {
    return {
      initialValues: {
        title: '',
        description: '',
        body: '',
        tagList: []
      }

    }
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.createArticle.isSubmitting,
      validationErrors: (state) => state.createArticle.validationErrors
    })
  },
  methods: {
    onSubmit(articleData) {
      console.log('createArticleVue', articleData)
      this.$store.dispatch(actionTypes.createArticle, articleData).then((article) => {
        this.$router.push({name: 'article', params: {slug: article.slug}})
      })
    }
  }
}
</script>

<style scoped>

</style>