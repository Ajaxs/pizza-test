<template>
  <div class="wrapper">
    <Navbar />
    <div class="main-column">
      <header class="header"></header>
      <router-view />
    </div>
    <footer class="footer">
      <div class="footer__column">
        Panni Pizza &copy; 2020
      </div>
    </footer>
  </div>
</template>

<script>
import Vue from 'vue'
import Navbar from '@/components/navbar/Navbar.vue'

export default Vue.extend({
  name: 'App',
  data () {
    return {
      domain: process.env.VUE_APP_IMG_DOMAIN
    }
  },
  computed: {
    productType () {
      return this.$route.query.product || null
    }
  },
  created () {
    this.$store.dispatch('init')
  },
  components: {
    Navbar
  }
})
</script>

<style lang="scss">
  @import '@/assets/style.scss';
</style>
