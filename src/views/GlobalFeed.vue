<template>
  <div class='home-page'>
    <mcv-banner />
    <div class='container page'>
      <div class='row'>
        <div class='col-md-9'>
          <div class="col-md-9"><McvFeed/></div>
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

export default {
  name: 'McvGlobalFeed',
  components: {
    McvFeed,
    McvPopularTags,
    McvBanner
  },
  data() {
    return {
      apiUrl: '/articles'
    }
  }
}
</script>
