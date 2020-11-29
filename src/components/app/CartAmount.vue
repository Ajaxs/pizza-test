<template>
  <div class="amount">
    <span class="minus" @click="minusAmount">-</span>
    <span class="num">{{ amount }}</span>
    <span class="plus" @click="plusAmount">+</span>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'CartAmount',
  props: {
    amount: Number,
    id: Number
  },
  methods: {
    minusAmount () {
      this.$store.dispatch('updateAmountItemToCart', { id: this.id, amount: this.amount - 1 })
    },
    plusAmount () {
      this.$store.dispatch('updateAmountItemToCart', { id: this.id, amount: this.amount + 1 })
    }
  }
})
</script>
