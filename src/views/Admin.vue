<template>
  <div class="main-column">
    <div class="page page__admin">
      <h1>Заказы</h1>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Admin',
  sockets: {
    orderAdmin (data) {
      console.log('order', data)
    }
  }
})
</script>
