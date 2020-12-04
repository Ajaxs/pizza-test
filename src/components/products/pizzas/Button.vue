<template>
  <el-button
    v-if="prepareItem.sizeId"
    type="danger"
    class="product-pizza__button"
    @click="addItemToCart">
    <i class="el-icon-circle-plus-outline"></i> В корзину за {{ cost }} руб
  </el-button>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'PizzaButton',
  props: {
    productId: Number,
    prepareItem: Object
  },
  methods: {
    addItemToCart () {
      const item = this.itemsCart.find(value => {
        return value.productId === this.productId &&
        value.sizeId === this.prepareItem.sizeId &&
        value.dough === this.prepareItem.dough &&
        JSON.stringify(value.topings) === JSON.stringify(this.prepareItem.topings)
      })

      if (item) {
        this.$store.dispatch('cart/updateAmountItem', {
          id: item.id,
          amount: this.prepareItem.amount + 1
        })
      } else {
        const cartItem = JSON.parse(JSON.stringify({
          id: Date.now(),
          type: 'pizzas',
          productId: this.productId,
          sizeId: this.prepareItem.sizeId,
          amount: this.prepareItem.amount,
          dough: this.prepareItem.dough,
          topings: this.prepareItem.topings
        }))
        this.$store.dispatch('cart/addItem', cartItem)
      }
    }
  },
  computed: {
    itemsCart () {
      return this.$store.getters['cart/itemsByType']('pizzas')
    },
    topingsItem () {
      return this.$store.getters['pizzas/topingsById'](this.prepareItem.topings)
    },
    cost () {
      const size = this.$store.getters['pizzas/sizeById'](this.prepareItem.sizeId)

      const topingsCost = this.topingsItem.reduce((acc, value) => {
        return acc + value.cost
      }, 0)
      return (size.cost + topingsCost) * this.prepareItem.amount
    }
  }
})
</script>
