<template>
  <div class="main-column">
    <div class="page page__cart">
      <h1>Корзина</h1>
      <table class="table-cart" v-if="cartItems.length">
        <cart-table :cart="cartItems" />
      </table>
      <div class="no-items" v-else>
        Нет товаров в корзине
      </div>

      <total />

      <order />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { meta } from '@/mixins/meta'
import CartTable from '@/components/cart/Table.vue'
import Total from '@/components/cart/Total.vue'
import Order from '@/components/cart/Order.vue'

export default Vue.extend({
  name: 'Cart',
  data () {
    return {
      meta: {
        title: 'Корзина'
      }
    }
  },
  computed: {
    ...mapGetters({
      cartItems: 'cart/items'
    })
  },
  components: {
    CartTable,
    Total,
    Order
  }
})
</script>
