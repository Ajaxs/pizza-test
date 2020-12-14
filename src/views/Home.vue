<template>
  <div class="main-column">
    <header class="header"></header>
    <p>Главная страница 222</p>
    <p>Вся продукция</p>
    <Products />
  </div>
</template>

<script>
import Products from '@/components/products/Products.vue'
import { meta } from '@/mixins/meta'

export default {
  name: 'Home',
  mixins: [meta],
  components: {
    Products
  }
}
</script>
