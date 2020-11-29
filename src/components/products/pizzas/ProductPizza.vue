<template>
  <div class="product-pizza">
    <div class="product-pizza__body" v-if="product">
        <div class="product-pizza__image">
          <product-image
            :size-id="prepareItem.sizeId"
            :dough="prepareItem.dough"
            :title="product.title"
          />
        </div>
        <div class="product-pizza__properties">
          <h1 class="product-pizza__title">{{ product.title }}</h1>
          <div class="product-pizza__description">{{ product.description }}</div>

          <product-size
            :product-id="id"
            @size:update="updateSize"
          />

          <product-dough
            @dough:update="updateDough"
          />
          <product-toping
            :topings-product="product.topings"
            @topings:update="updateTopings"
          />

          <product-button
            :product-id="id"
            :prepare-item="prepareItem"
          />

        </div>
      </div>
    </div>
</template>

<script>
import Vue from 'vue'
import ProductImage from '@/components/products/pizzas/ProductImage.vue'
import ProductSize from '@/components/products/pizzas/ProductSize.vue'
import ProductDough from '@/components/products/pizzas/ProductDough.vue'
import ProductToping from '@/components/products/pizzas/ProductToping.vue'
import ProductButton from '@/components/products/pizzas/ProductButton.vue'

export default Vue.extend({
  name: 'ProductPizza',
  data () {
    return {
      prepareItem: {
        sizeId: null,
        dough: '',
        amount: 1,
        topings: []
      }
    }
  },
  methods: {
    updateSize (data) {
      if (data.diametr === 25) {
        this.prepareItem.dough = 'standart'
      }
      this.prepareItem.sizeId = data.sizeId
    },
    updateDough (dough) {
      this.prepareItem.dough = dough
    },
    updateTopings (topings) {
      this.prepareItem.topings = topings
    }
  },
  computed: {
    id () {
      return Number(this.$route.params.id)
    },
    product () {
      return this.$store.getters.getPizzaProduct(this.id)
    }
  },
  components: {
    ProductImage,
    ProductSize,
    ProductDough,
    ProductToping,
    ProductButton
  }
})
</script>
