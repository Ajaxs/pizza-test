<template>
  <button
    class="product-pizza__button"
    v-if="prepareItem.sizeId"
    @click="addItemToCart"
  >В корзину за {{ costProduct }} руб</button>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'ProductButton',
  props: {
    productId: Number,
    prepareItem: Object
  },
  methods: {
    addItemToCart () {
      const item = this.itemsCartToType.find(value => {
        return value.productId === this.productId &&
        value.sizeId === this.prepareItem.sizeId &&
        value.dough === this.prepareItem.dough &&
        JSON.stringify(value.topings) === JSON.stringify(this.prepareItem.topings)
      })

      if (item) {
        this.$store.dispatch('updateItemToCart', {
          id: item.id,
          amount: this.prepareItem.amount
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
        this.$store.dispatch('addItemToCart', cartItem)
      }
    }
  },
  computed: {
    itemsCartToType () {
      return this.$store.getters.getItemsCartToType('pizzas')
    },
    topingsProduct () {
      return this.$store.getters.getPizzaTopings(this.prepareItem.topings)
    },
    costProduct () {
      const size = this.$store.getters.getPizzaSize(this.prepareItem.sizeId)

      const topingsCost = this.topingsProduct.reduce((acc, value) => {
        return acc + value.cost
      }, 0)
      return (size.cost + topingsCost) * this.prepareItem.amount
    }
  }
})
</script>
