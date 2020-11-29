<template>
  <div>
    <div v-if="items.length > 0">
      <table class="table-cart">
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td class="cart-image">
              <img :src="item.image" alt=""/>
            </td>
            <td class="cart-title">
              <strong>{{ item.title }}</strong>
              <div v-if="item.properties.length">+ {{ item.properties.join(', ') }}</div>
            </td>
            <td class="cart-size">Диаметр: {{ item.size }} см</td>
            <td class="cart-amount">
              <cart-amount :id="item.id" :amount="item.amount" />
            </td>
            <td class="cart-price">{{ item.cost }} руб</td>
            <td class="cart-delete">
              <div @click="removeItemCart(item.id)">
                <img src="https://localhost/images/delete.svg" alt="">
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="3" class="coupon">
              <input type="text" v-model="cod" placeholder="Введите скидочный купон">
              <button @click="setDiscount">Применить</button>
            </td>
            <td class="discount">
              -{{ discount }} руб
            </td>
            <td>
              {{cost}} {{ cost - discount }} руб
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <button class="send-order">Оформить заказ</button>
    </div>
    <div class="no-items" v-else>
      Нет товаров в корзине
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import CartAmount from '@/components/app/CartAmount.vue'

export default Vue.extend({
  name: 'CartTable',
  data () {
    return {
      cod: ''
    }
  },
  methods: {
    removeItemCart (id) {
      this.$store.dispatch('removeItemCart', id)
    },
    setDiscount () {
      if (this.cod) {
        this.axios.post('/discount.php', {
          promocod: this.cod,
          cost: this.cost
        }).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'success') {
              this.$store.dispatch('setPromocod', {
                discount: response.data.discount,
                promocod: response.data.cod
              })
            } else {
              console.log(response.data.message)
            }
          }
        }).catch(err => {
          console.error(err)
        })
      }
    }
  },
  computed: {
    cartItems () {
      return this.$store.getters.getItemsCart
    },
    items () {
      const pizzasItems = this.$store.getters.getPizzaItemsAll
      const pizzasSizes = this.$store.getters.getPizzaSizesAll
      const pizzasVariants = this.$store.getters.getPizzaVariantsAll
      const pizzasTopings = this.$store.getters.getPizzaTopingsAll
      const itemsArray = []

      if (pizzasItems.length > 0 && pizzasSizes.length > 0 && pizzasVariants.length > 0) {
        this.cartItems.forEach(element => {
          if (element.type === 'pizzas') {
            const item = pizzasItems.find(value => value.id === element.productId)
            const size = pizzasSizes.find(value => value.id === element.sizeId)
            const type = pizzasVariants.find(value => value.size_id === size.id && value.dough === element.dough)
            let topingsCost = 0
            const topingsTitle = []
            element.topings.forEach(value => {
              const topingCurrent = pizzasTopings.find(toping => toping.id === value)
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
    },
    discount () {
      return this.$store.getters.getDiscount
    },
    promocod () {
      return this.$store.getters.getPromocod
    },
    cost () {
      return this.$store.getters.getCost
    }
  },
  components: {
    CartAmount
  }
})
</script>
