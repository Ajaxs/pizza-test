<template>
  <div class="main-column">
    <div class="page page__sales">
      <h1>Акции</h1>
      <ul>
        <li><strong>SKIDKA-100</strong> - Скидка 100 руб. (минимальный заказ 500 руб)</li>
        <li><strong>PROMO-300</strong> - Скидка 300 руб. (минимальный заказ 1500 руб)</li>
        <li><strong>BIRTHDAY</strong> - Скидка 250 руб. (минимальный заказ 1000 руб)</li>
      </ul>
      <p>Только до нового года</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { meta } from '@/mixins/meta'

export default Vue.extend({
  name: 'Sales',
  components: {
  }
})
</script>
