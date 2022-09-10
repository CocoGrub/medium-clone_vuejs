<template>
  <div id='app'>
    <mcv-top-bar />
    <router-view />
  </div>
</template>

<script>
import McvTopBar from './components/TopBar.vue'
import {actionsTypes} from './store/modules/auth'

export default {
  components: {
    McvTopBar
  },
  mounted() {
    this.$store.dispatch(actionsTypes.getCurrentUser)
  }
}
</script>

<style></style>
