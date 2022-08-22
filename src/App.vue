<template>
  <div id="app">
    <mcv-topbar />
    <router-view />
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue'
export default {
  components: {
    'mcv-topbar': TopBar,
  },
}
</script>

<style></style>
