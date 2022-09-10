<template>
  <div>
    <mcv-loading v-if='isLoading' />
    <mcv-error-message v-if='error' />
    <div class='sidebar' v-if='popularTags'>
      <p>Popular tags</p>
      <router-link
        class='tag-default tag-pill'
        v-for='tag in popularTags'
        :key='tag'
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

<script>
import {mapState} from 'vuex'
import {actionsTypes} from '@/store/modules/popularTags'
import McvLoading from '@/components/Loading'
import McvErrorMessage from '@/components/ErrorMessage'

export default {
  name: 'McvPopularTags',
  components: {
    McvLoading,
    McvErrorMessage
  },
  computed: {
    ...mapState({
      popularTags: (state) => state.popularTags.data,
      isLoading: (state) => state.popularTags.isLoading,
      error: (state) => state.popularTags.error
    })
  },
  mounted() {
    this.$store.dispatch(actionsTypes.getPopularTags)
  }
}
</script>