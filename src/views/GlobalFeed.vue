<template>
  <div class="home-page">
    McvGlobalFeed
    <div class="container page">
      <div class="row">
        <div class="col-md-9"><McvFeed :apiUrl="apiUrl" /></div>
        <div class="col-md-3">Popular Tags</div>
      </div>
    </div>
  </div>
</template>

<script>
import McvFeed from '@/components/Feed.vue'
export default {
  name: 'McvGlobalFeed',
  components: {
    McvFeed,
  },
  data() {
    return {
      apiUrl: '/articles',
    }
  },
}
</script>
