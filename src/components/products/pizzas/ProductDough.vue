<template>
  <div class="product-property">
    <div class="product-property__title">Тесто</div>
    <div class="product-property__variants">
      <label v-for="item of doughs" :for="`d-${item.id}`" :key="item.id">
        <input
          type="radio"
          name="dough"
          :checked="item.dough === dough"
          :id="`d-${item.id}`"
          @change="updateDough(item.dough)"
        >
        {{ item.title }}
      </label>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'ProductDough',
  data () {
    return {
      dough: 'standart'
    }
  },
  methods: {
    updateDough (dough) {
      this.$emit('dough:update', dough)
    }
  },
  computed: {
    doughs () {
      return this.$store.getters.getPizzaDoughsAll
    }
  },
  mounted () {
    this.updateDough(this.dough)
  }
})
</script>
