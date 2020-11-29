<template>
  <div class="page page__cart">
    <h1>Корзина</h1>
    <CartTable />
  </div>
</template>

<script>
import Vue from 'vue'
import CartTable from '@/components/app/CartTable.vue'

export default Vue.extend({
  name: 'Cart',
  components: {
    CartTable
  }
})
</script>
