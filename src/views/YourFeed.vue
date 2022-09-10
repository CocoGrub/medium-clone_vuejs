<template>
  <div class='home-page'>
    <mcv-banner />
    <div class='container page'>
      <div class='row'>
        <div class='col-md-9'>
          <mcv-feed-toggle />
          <McvFeed :apiUrl='apiUrl' />
        </div>
        <div class='col-md-3'>
          <mcv-popular-tags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvFeed from '@/components/Feed.vue'
import McvPopularTags from '@/components/PopularTags.vue'
import McvBanner from '@/components/Banner.vue'
import McvFeedToggle from '@/components/FeedToggle'

export default {
  name: 'McvYourFeed',
  components: {
    McvFeedToggle,
    McvFeed,
    McvPopularTags,
    McvBanner
  },
  data() {
    return {
      apiUrl: '/articles/feed'
    }
  }
}
</script>
