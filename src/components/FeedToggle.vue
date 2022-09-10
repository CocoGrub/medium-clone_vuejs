<template>
  <div class='feed-toggle'>
    <ul class='nav nav-pills outline-active'>
      <li class='nav-item' v-if='isLoggedIn'>
        <router-link :to="{name:'yourFeed'}"
                     class="{active:routeName==='yourFeed'}">
          Your feed
        </router-link>
      </li>
      <li class='nav-item'>
        <router-link :to="{name:'globalFeed'}"
                     class="{active:routeName==='globalFeed'}">Global feed
        </router-link>
      </li>
      <li class='nav-item' v-if='tagName'>
        <router-link :to="{name:'tag'}"
                     class="{active:routeName==='tag'}">
          <i class='ion-pound' />
          {{ tagName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getterTypes} from '@/store/modules/auth'

export default {
  name: 'McvFeedToggle',
  props: {
    tagName: {
      required: false,
      type: String
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: getterTypes.isLoggedIn
    })
  }
}
</script>

<style scoped></style>
