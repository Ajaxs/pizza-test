<template>
  <div class="navigation navigation_position_top">
    <div class="logo logo_nav">
      <router-link to="/">
        <img class="logo__image" src="https://localhost/images/logo.png" alt="">
      </router-link>
    </div>
    <nav class="menu menu_align_left">
      <ul class="menu__list">
        <li class="menu__item" v-for="link in links" :key="link.url">
          <router-link class="menu__link" :to="link.url" exact>{{ link.title }}</router-link>
        </li>
      </ul>
    </nav>
    <cart-button />
  </div>
</template>

<script>
import Vue from 'vue'
import CartButton from './CartButton.vue'

export default Vue.extend({
  name: 'Navbar',
  data () {
    return {
      links: [
        { url: '/', title: 'Главная' },
        { url: '/sales', title: 'Скидки' },
        { url: '/about', title: 'О компании' }
      ]
    }
  },
  components: {
    CartButton
  }
})
</script>
