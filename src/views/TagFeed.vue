<template>
  <div class='home-page'>
    <mcv-banner />
    <div class='container page'>
      <div class='row'>
        <div class='col-md-9'>
          <McvFeedToggle :tag-name='tagName' />
          <McvFeed :apiUrl='apiUrl' />
        </div>
        <div class='col-md-3'>
          <McvPopularTags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvFeed from '@/components/Feed.vue'
import McvPopularTags from '@/components/PopularTags.vue'
import McvBanner from '@/components/Banner.vue'
import McvFeedToggle from '@/components/FeedToggle.vue'

export default {
  name: 'McvYourFeed',
  components: {
    McvFeed,
    McvPopularTags,
    McvBanner,
    McvFeedToggle
  },
  computed: {
    tagName() {
      return this.$route.params.slug
    },
    apiUrl() {
      return `articles?tag=${this.tagName}`
    }

  }
}
</script>
