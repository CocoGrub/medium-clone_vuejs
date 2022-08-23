<template>
  <div>
    Feed {{ apiUrl }}
    <div v-if="isLoading">...Loading</div>
    <div v-if="error">Error</div>
    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            to="{name:'userProfile',params:{slug:article.author.username}}"
          >
            <img :src="article.author.image" alt="author" />
          </router-link>
          <div class="article-meta">
            <router-link
              class="author"
              to="{name:'userProfile',params:{slug:article.author.username}}"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">ADD to favorites</div>
        </div>
        <router-link to="{name:'article',params:{slug:article.slug}}">
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          TAG-LIST
        </router-link>
        Pagination
      </div>
    </div>
  </div>
</template>

<script>
import {actionsTypes} from '@/store/modules/feed'
import {mapState} from 'vuex'
export default {
  name: 'McvFeed',
  data: () => {
    return {}
  },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.feed.isLoading,
      feed: (state) => state.feed.data,
      error: (state) => state.feed.error,
    }),
  },
  mounted() {
    this.$store.dispatch(actionsTypes.getFeed, {apiUrl: this.apiUrl})
  },
}
</script>
