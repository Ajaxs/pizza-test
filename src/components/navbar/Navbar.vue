<template>
  <div class="navigation navigation_position_top">
    <div class="logo logo_nav">
      <router-link to="/">
        <img class="logo__image" src="https://localhost/images/logo.png" alt="">
      </router-link>
    </div>
    <nav class="menu menu_align_left">
      <ul class="menu__list">
        <li class="menu__item">
          <router-link class="menu__link" to="/" exact>Главная</router-link>
        </li>
        <li class="menu__item">
          <router-link class="menu__link" to="/sales">Скидки</router-link>
        </li>
      </ul>
    </nav>
    <nav class="cart cart_align_right">
      <ul class="cart__list">
        <li class="cart__item">
          <router-link class="cart__link" to="/cart">Корзина {{ totalCost }} руб</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Navbar',
  computed: {
    totalCost () {
      return this.$store.getters.getCost - this.$store.getters.getDiscount
    }
  }
})
</script>
