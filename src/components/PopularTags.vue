<script>
import {mapState} from 'vuex'
import {actionsTypes} from '@/store/modules/popularTags'
import McvLoading from '@/components/Loading'
import McvErrorMessage from '@/components/ErrorMessage'

export default {
  name: 'mcv-popularTags',
  components: {
    McvLoading,
    McvErrorMessage,
  },
  computed: {
    ...mapState({
      popularTags: (state) => state.popularTags.data,
      isLoading: (state) => state.popularTags.isLoading,
      error: (state) => state.popularTags.error,
    }),
  },
  mounted() {
    this.$store.dispatch(actionsTypes.getPopularTags)
  },
  methods: {
    changeTest() {
      this.$store.commit('[popularTags] getPopularTagsTest', this.test)
    },
  },
}
</script>

<template>
  <div>
    <mcv-loading :is="loading" />
    <mcv-error-message :is="error" />
    <div class="sidebar" v-if="popularTags">
      <p>Popular tags</p>
      <router-link
        class="tag-default tag-pill"
        v-for="tag in popularTags"
        :key="tag"
        :to="{
          name: 'tag',
          params: {
            slug: tag,
          },
        }"
      >
        {{ tag }}
      </router-link>
    </div>
  </div>
</template>
