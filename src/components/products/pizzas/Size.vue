<template>
  <div class="product-property" v-if="sizes">
    <div class="product-property__title">Диаметр</div>
    <div class="product-property__variants">
      <el-radio-group
        v-model="diametr"
        size="small"
        fill="#ff5a59"
        @change="updateSize"
      >
        <el-radio-button
          v-for="item in sizes"
          class="label"
          :key="item.id"
          :label="item.diametr"
        >{{ item.title }} {{ item.diametr }} см</el-radio-button>
      </el-radio-group>
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
    updateSize () {
      const size = this.sizes.find(value => value.diametr === this.diametr)
      this.$emit('size:update', { sizeId: size.id, diametr: size.diametr })
    }
  },
  computed: {
    sizes () {
      return this.$store.getters['pizzas/sizesByProductId'](this.productId)
    }
  },
  mounted () {
    const size = this.sizes.find(value => value.diameter === this.diameter)
    this.updateSize(size.id, this.diameter)
  }
})
</script>
