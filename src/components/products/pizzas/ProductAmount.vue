<template>
  <div class="product-property">
    <div class="product-property__title">Количество</div>
    <div class="product-property__amount">
      <div class="product-property__amount-button minus" @click="minusAmount">-</div>
      <div class="product-property__amount-value">{{ amount }}</div>
      <div class="product-property__amount-button" @click="plusAmount">+</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'ProductAmount',
  props: {
    amount: Number
  },
  methods: {
    minusAmount () {
      if (this.amount > 1) {
        this.$emit('amount', this.amount - 1)
      }
    },
    plusAmount () {
      this.$emit('amount', this.amount + 1)
    }
  }
})
</script>
