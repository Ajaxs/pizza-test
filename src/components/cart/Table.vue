<template>
  <tbody>
    <tr v-for="item in items" :key="item.id">
      <td class="cart-image">
        <img :src="item.image" :alt="item.title"/>
      </td>
      <td class="cart-title">
        <strong>{{ item.title }}</strong>
        <div v-if="item.properties.length">+ {{ item.properties.join(', ') }}</div>
      </td>
      <td class="cart-size">
        Диаметр: {{ item.size }} см<br>
        {{ item.dough }}
      </td>
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
  </tbody>
</template>

<script>
import Vue from 'vue'
import Amount from '@/components/cart/Amount.vue'
import { getPizzas } from '@/mixins/getPizzas'

export default Vue.extend({
  name: 'CartTable',
  props: {
    cart: Array
  },
  mixins: [getPizzas],
  methods: {
    removeItem (id) {
      this.$store.dispatch('cart/removeItem', id)
    }
  },
  computed: {
    items () {
      const itemsArray = []

      if (this.pizzasItems.length > 0 && this.pizzasSizes.length > 0 && this.pizzasVariants.length > 0) {
        this.cart.forEach(element => {
          /* Build array to pizzas */
          if (element.type === 'pizzas') {
            const item = this.pizzasItems.find(value => value.id === element.productId)
            const size = this.pizzasSizes.find(value => value.id === element.sizeId)
            const type = this.pizzasVariants.find(value => value.size_id === size.id && value.dough === element.dough)
            const dough = this.pizzasDoughs.find(value => value.dough === type.dough)

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
              dough: dough.title,
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
    Amount
  }
})
</script>
