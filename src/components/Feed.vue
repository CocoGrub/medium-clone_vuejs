<template>
  <div>
    Feed {{ apiUrl }}
    <mcv-loading v-if='isLoading' />
    <div v-if='error'>Error</div>
    <div v-if='feed'>
      <div
        class='article-preview'
        v-for='(article, index) in feed.articles'
        :key='index'
      >
        <div class='article-meta'>
          <router-link
            :to="{name:'userProfile',params:{slug:article.author.username}}"
          >
            <img :src='article.author.image' alt='author' />
          </router-link>
          <div class='article-meta'>
            <router-link
              class='author'
              :to="{name:'userProfile',params:{slug:article.author.username}}"
            >
              {{ article.author.username }}
            </router-link>
            <span class='date'>{{ article.createdAt }}</span>
          </div>
          <div class='pull-xs-right'>ADD to favorites</div>
        </div>
        <div>
          <router-link :to="{name:'article',params:{slug:article.slug}}">
            <h1>{{ article.title }}</h1>
            <p>{{ article.description }}</p>
            <span>Read more...</span>
            <mcv-tag-list :tags='article.tagList' />
          </router-link>
        </div>
      </div>
      <mcv-pagination
        :total='total'
        :limit='PostsLimit'
        :currentPage='currentPage'
        :url='url'
      >
      </mcv-pagination>
    </div>
  </div>
</template>

<script>
import McvPagination from '@/components/Pagination'
import McvLoading from '@/components/Loading'
import McvTagList from '@/components/Taglist'
import {actionsTypes} from '@/store/modules/feed'
import {mapState} from 'vuex'
import {PostsLimit} from '@/helpers/variables'
import {stringify, parseUrl} from 'query-string'

export default {
  name: 'McvFeed',
  components: {
    McvPagination,
    McvLoading,
    McvTagList
  },
  data() {
    return {
      total: 500,
      PostsLimit,
      url: '/'
    }
  },
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl)
      const stringifiesParams = stringify({
        limit: this.limit,
        offset: this.offset,
        ...parsedUrl.query
      })
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiesParams}`
      console.log(apiUrlWithParams)
      this.$store.dispatch(actionsTypes.getFeed, {apiUrl: apiUrlWithParams})
    }
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.feed.isLoading,
      feed: (state) => state.feed.data,
      error: (state) => state.feed.error
    }),
    currentPage() {
      return Number(this.$route.query.page) || 1
    },
    baseUrl() {
      return this.$route.path
    },
    offset() {
      return this.currentPage * PostsLimit - PostsLimit
    },
    limit() {
      return PostsLimit
    }
  },
  watch: {
    currentPage() {
      this.fetchFeed()
    }
  },
  mounted() {
    this.fetchFeed()
  }
}
</script>
