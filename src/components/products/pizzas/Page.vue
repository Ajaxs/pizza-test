<template>
  <div class="main-column">
    <div class="product-pizza">
      <div class="product-pizza__body" v-if="product">
          <div class="product-pizza__image">
            <pic :image="image" :title="product.title" />
          </div>
          <div class="product-pizza__properties">
            <h1 class="product-pizza__title">{{ product.title }}</h1>
            <div class="product-pizza__description">{{ product.description }}</div>

            <size :product-id="id" @size:update="updateSize" />
            <dough :diametr="diametr" @dough:update="updateDough" />
            <toping :topings-product="product.topings" @topings:update="updateTopings" />
            <btn :product-id="id" :prepare-item="prepareItem" />
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Vue from 'vue'
import Pic from '@/components/products/pizzas/Image.vue'
import Size from '@/components/products/pizzas/Size.vue'
import Dough from '@/components/products/pizzas/Dough.vue'
import Toping from '@/components/products/pizzas/Toping.vue'
import Btn from '@/components/products/pizzas/Button.vue'

export default Vue.extend({
  name: 'ProductPizza',
  data () {
    return {
      diametr: null,
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
      this.diametr = data.diametr
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
      return this.$store.getters['pizzas/itemById'](this.id)
    },
    image () {
      const variant = this.$store.getters['pizzas/varintBySizeAndDough'](this.prepareItem.sizeId, this.prepareItem.dough)
      return variant ? variant.image : ''
    }
  },
  components: {
    Pic,
    Size,
    Dough,
    Toping,
    Btn
  }
})
</script>
