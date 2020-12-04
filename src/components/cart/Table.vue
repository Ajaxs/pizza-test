<template>
  <div>
    <div v-if="items.length > 0">
      <table class="table-cart">
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td class="cart-image">
              <img :src="item.image" :alt="item.title"/>
            </td>
            <td class="cart-title">
              <strong>{{ item.title }}</strong>
              <div v-if="item.properties.length">+ {{ item.properties.join(', ') }}</div>
            </td>
            <td class="cart-size">Диаметр: {{ item.size }} см</td>
            <td class="cart-amount">
              <amount :id="item.id" :amount="item.amount" />
            </td>
            <td class="cart-price">{{ item.cost }} руб</td>
            <td class="cart-delete">
              <div @click="removeItem(item.id)">
                <i class="el-icon-delete"></i>
              </div>
            </td>
          </tr>
          <total />
        </tbody>
      </table>
      <el-button type="danger">Оформить заказ</el-button>
    </div>
    <div class="no-items" v-else>
      Нет товаров в корзине
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Amount from '@/components/cart/Amount.vue'
import Total from '@/components/cart/Total.vue'

export default Vue.extend({
  name: 'CartTable',
  methods: {
    removeItem (id) {
      this.$store.dispatch('cart/removeItem', id)
    }
  },
  computed: {
    ...mapGetters({
      pizzasItems: 'pizzas/items',
      pizzasSizes: 'pizzas/sizes',
      pizzasVariants: 'pizzas/variants',
      pizzasTopings: 'pizzas/topings',
      cartItems: 'cart/items'
    }),
    items () {
      const itemsArray = []

      if (this.pizzasItems.length > 0 && this.pizzasSizes.length > 0 && this.pizzasVariants.length > 0) {
        this.cartItems.forEach(element => {
          /* Build array to pizzas */
          if (element.type === 'pizzas') {
            const item = this.pizzasItems.find(value => value.id === element.productId)
            const size = this.pizzasSizes.find(value => value.id === element.sizeId)
            const type = this.pizzasVariants.find(value => value.size_id === size.id && value.dough === element.dough)

            /* Add cost topings */
            let topingsCost = 0
            const topingsTitle = []
            element.topings.forEach(value => {
              const topingCurrent = this.pizzasTopings.find(toping => toping.id === value)
              if (topingCurrent) {
                topingsCost += topingCurrent.cost
                topingsTitle.push(topingCurrent.title)
              }
            })
            const cost = (size.cost + topingsCost) * element.amount

            itemsArray.push({
              id: element.id,
              image: type.image,
              title: item.title,
              size: size.diametr,
              amount: element.amount,
              cost: cost,
              properties: topingsTitle
            })
          }
        })
      }

      return itemsArray
    }
  },
  components: {
    Amount,
    Total
  }
})
</script>
