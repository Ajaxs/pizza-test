<template>
  <div class="main-column">
    <div class="page page__cart">
      <h1>Корзина</h1>
      <cart-table />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import CartTable from '@/components/cart/Table.vue'

export default Vue.extend({
  name: 'Cart',
  components: {
    CartTable
  }
})
</script>
