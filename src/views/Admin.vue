<template>
  <div class="main-column">
    <div class="page page__admin">
      <h1>Заказы</h1>
      <ul>
        <li v-for="item in orders" :key="item.id">
          {{item.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Admin',
  data () {
    return {
      orders: []
    }
  },
  sockets: {
    orderAdmin (data) {
      console.log('order', data)
      this.orders.push(data.order)
    }
  }
})
</script>
