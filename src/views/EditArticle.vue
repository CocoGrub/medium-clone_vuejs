<template>
  <div>
    <mcv-loading v-if='isLoading'></mcv-loading>
    <mcv-article-form
      v-if='initialValues'
      :initialValues='initialValues'
      :errors='validationErrors'
      :isSubmitting='isSubmitting'
      @articleSubmit='onSubmit'
    />
  </div>
</template>

<script>
import McvArticleForm from '@/components/ArticleForm'
import McvLoading from '@/components/Loading'
import {mapState} from 'vuex'
import {actionTypes as actionTypesEditArticle} from '@/store/modules/editArticle'
import {actionTypes as actionTypesArticle} from '@/store/modules/article'

export default {
  name: 'McvEditArticle',
  components: {
    McvArticleForm,
    McvLoading
  },
  data() {
    return {}
  },
  computed: {
    initialValues() {
      if (!this.article) {
        return null
      }
      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList || []
      }

    },
    ...mapState({
      isSubmitting: (state) => state.editArticle.isSubmitting,
      isLoading: (state) => state.editArticle.isLoading,
      article: (state) => state.article.data,
      validationErrors: (state) => state.editArticle.validationErrors
    })
  },
  mounted() {
    this.$store.dispatch(actionTypesArticle.getArticle, {slug: this.$route.params.slug})
  },
  methods: {
    onSubmit(articleInput) {
      const slug = this.$route.params.slug
      this.$store.dispatch(actionTypesEditArticle.updateArticle, {slug, articleInput}).then((article) => {
        this.$router.push({name: 'article', params: {slug: article.slug}})
      })
    }
  }
}
</script>

<style scoped>

</style>