<template>
  <div class="wrapper">
    <Navbar />
    <router-view />
    <footer class="footer">
      <div class="footer__column">
        Pani Pizza &copy; 2020
      </div>
    </footer>
  </div>
</template>

<script>
import Vue from 'vue'
import Navbar from '@/components/navbar/Navbar.vue'
import '@/assets/style.scss'

export default Vue.extend({
  name: 'App',
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
