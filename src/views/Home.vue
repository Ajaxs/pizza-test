<template>
  <div class="main-column">
    <header class="header"></header>
    <Products />
  </div>
</template>

<script lang="ts">
import Products from '@/components/products/Products.vue'

export default {
  name: 'Home',
  components: {
    Products
  },
  sockets: {
    connect: function () {
      console.log('socket connected 1')
    },
    echoTest: function (data) {
      console.log('echo: ', data)
    }
  }
}
</script>
