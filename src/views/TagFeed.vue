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
import McvFeed from '@/components/Feed'
import McvPopularTags from '@/components/PopularTags'
import McvBanner from '@/components/Banner'
import McvFeedToggle from '@/components/FeedToggle'

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
