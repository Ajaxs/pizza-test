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
    connect () {
      console.log('socket connected')
    },
    echo (data) {
      console.log('echo', data)
    }
  },
  mounted () {
    this.$socket.emit('test', 'Ololo')
  }
}
</script>
