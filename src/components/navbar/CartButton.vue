<template>
  <nav class="cart cart_align_right">
    <ul class="cart__list">
      <li class="cart__item">
        <el-button type="danger" @click="goCart">Корзина {{ cost - discount }} руб</el-button>
      </li>
    </ul>
  </nav>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  name: 'CartButton',
  methods: {
    goCart () {
      this.$router.push('/cart')
    }
  },
  computed: {
    ...mapGetters({
      cost: 'cart/cost',
      discount: 'cart/discount'
    })
  }
})
</script>
