<template>
  <div class="amount">
    <span class="minus" @click="minusAmount">
      <i class="el-icon-remove-outline"></i>
    </span>
    <span class="num">{{ amount }}</span>
    <span class="plus" @click="plusAmount">
      <i class="el-icon-circle-plus-outline"></i>
    </span>
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
      this.$store.dispatch('cart/updateAmountItem', {
        id: this.id,
        amount: this.amount - 1
      })
    },
    plusAmount () {
      this.$store.dispatch('cart/updateAmountItem', {
        id: this.id,
        amount: this.amount + 1
      })
    }
  }
})
</script>
