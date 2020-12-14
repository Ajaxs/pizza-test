<template>
  <div class="main-column">
    <div class="page page__admin">
      <h1>Заказы</h1>

      <div class="order">
        <div class="order__header">
          <div class="order__id">Заказа</div>
          <div class="order__name">Имя</div>
          <div class="order__phone">Телефон</div>
          <div class="order__adress">Адрес</div>
          <div class="order__time">Время доставки</div>
          <div class="order__buttons"> </div>
        </div>
        <div v-for="item in orders" :key="item.id">
          <div class="order__user">
            <div class="order__id">{{ item.id }}</div>
            <div class="order__name">{{ item.name }}</div>
            <div class="order__phone">{{ item.phone }}</div>
            <div class="order__adress">{{ item.adress }}</div>
            <div class="order__time">{{ item.time }}</div>
            <div class="order__buttons">
              <el-button @click="changeStatus(item.id, 2)">Готовится</el-button>
              <el-button @click="changeStatus(item.id, 3)">Отправлен</el-button>
              <el-button @click="changeStatus(item.id, 4)">Завершен</el-button>
            </div>
          </div>
          <div class="product-list">
            <h3 class="product-list__title">Детали заказа</h3>
            <table class="product-list__table">
              <tr v-for="item in getItems(item.cart)" :key="item.id">
                <td class="product-list__image"><img :src="item.image" :alt="item.title"/></td>
                <td>
                  {{ item.title }}
                  <div v-if="item.properties.length">+ {{ item.properties.join(', ') }}</div>
                </td>
                <td>
                  Диаметр: {{ item.size }} см<br>
                  {{ item.dough }}
                </td>
                <td>{{ item.amount }}</td>
                <td>{{ item.cost }} руб</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <p>Text Comment 2</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { meta } from '@/mixins/meta'
import { getPizzas } from '@/mixins/getPizzas'

export default Vue.extend({
  name: 'Admin',
  mixins: [getPizzas],
  data () {
    return {
      orders: [
        {
          adress: 'gdfgfdgfd',
          cart: [
            { id: 1607074164779, type: 'pizzas', productId: 1, sizeId: 1, amount: 2, dough: 'standart', topings: [] },
            { id: 1607089626069, type: 'pizzas', productId: 4, sizeId: 10, amount: 5, dough: 'standart', topings: [3, 4] },
            { id: 1607178858117, type: 'pizzas', productId: 6, sizeId: 18, amount: 1, dough: 'thin', topings: [] }
          ],
          id: '17633367e2d',
          name: 'dfdsf',
          phone: '454354354353',
          time: '10:30'
        }
      ]
    }
  },
  methods: {
    changeStatus (id, status) {
      this.$socket.emit('changeStatusAdmin', {
        id,
        status
      })
    },
    getItems (cart) {
      const itemsArray = []

      if (this.pizzasItems.length > 0 && this.pizzasSizes.length > 0 && this.pizzasVariants.length > 0) {
        cart.forEach(element => {
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
  sockets: {
    orderAdmin (data) {
      this.orders.push(data.order)
    }
  }
})
</script>
