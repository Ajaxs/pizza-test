<template>
  <section class="products">
    <h3 class="products__title">{{ section.title }}</h3>
    <div class="products__list">
      <Item
        v-for="product in products"
        :key="product.id"
        :product="product"
        :type="section.key"
      />
    </div>
  </section>
</template>

<script lang="ts">
import Item from './Item.vue'

export default {
  name: 'Section',
  components: {
    Item
  },
  props: {
    section: Object,
    products: Array
  }
}
</script>
