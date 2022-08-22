<template>
  <div id="app">
    <mcv-topbar />
    <router-view />
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue'
import {actionsTypes} from './store/modules/auth'
export default {
  components: {
    'mcv-topbar': TopBar,
  },
  mounted() {
    this.$store.dispatch(actionsTypes.getCurrentUser)
  },
}
</script>

<style></style>
