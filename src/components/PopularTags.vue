<script>
import {mapState} from 'vuex'
import {actionsTypes} from '@/store/modules/popularTags'

export default {
  name: 'mcv-popularTags',
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
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Something went wrong</div>
    <div class="sidbar" v-if="popularTags">
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
