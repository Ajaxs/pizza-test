<template>
  <div class="product-property" v-if="sizesAll">
    <div class="product-property__title">Диаметр</div>
    <div class="product-property__variants">
      <label v-for="item in sizesAll" :for="`s-${item.id}`" :key="item.id">
        <input
          type="radio"
          name="diametr"
          :checked="item.diametr === diametr"
          :id="`s-${item.id}`"
          @change="updateSize(item.id, item.diametr)"
        >
        {{ item.title }} {{ item.diametr }} см
      </label>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'ProductSize',
  props: {
    productId: Number
  },
  data () {
    return {
      diametr: 25
    }
  },
  methods: {
    updateSize (sizeId, diametr) {
      this.$emit('size:update', { sizeId, diametr })
    }
  },
  computed: {
    sizesAll () {
      return this.$store.getters.getPizzaSizes(this.productId)
    }
  },
  mounted () {
    const size = this.sizesAll.find(value => value.diameter === this.diameter)
    this.updateSize(size.id, this.diameter)
  }
})
</script>
