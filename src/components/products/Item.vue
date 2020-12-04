<template>
  <article class="product">
    <div class="product__body">
      <div class="product__image">
        <div class="product__label" v-if="product.new">Новинка</div>
        <div class="product__likes" v-if="product.likes">&#10084; {{ product.likes }}</div>
        <img :src="product.image" @click="showProduct(product.id)" :alt="product.title">
      </div>
      <div class="product__title">{{ product.title }}</div>
      <div class="product__description" v-if="product.description">{{ product.description }}</div>
    </div>
    <footer class="product__footer">
      <div class="product__cost">от {{ minCost }} руб</div>
      <el-button class="product__link" type="danger" @click="showProduct(product.id)">
        Подробнее
      </el-button>
    </footer>
  </article>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Item',
  props: {
    product: Object,
    type: String
  },
  methods: {
    showProduct (id) {
      this.$router.push(`/products/${this.type}/${id}`)
    }
  },
  computed: {
    minCost () {
      const sizes = this.$store.getters[`${this.type}/sizesByProductId`](this.product.id)
      const costs = sizes.map(value => value.cost)
      return Math.min.apply(null, costs)
    }
  }
})
</script>
