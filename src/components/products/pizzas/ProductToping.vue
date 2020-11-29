<template>
  <div class="product-property" v-if="topingsAll">
    <div class="product-property__title">Добавить</div>
    <div class="product-property__variants topings">
      <div class="product-property__toping" v-for="toping in topingsAll" :key="toping.id">
        <img :src="toping.image" alt="">
        <div class="title">{{ toping.title }}</div>
        <div class="cost">+{{ toping.cost }} руб</div>
        <button @click="updateTopings(toping.id)">
          {{ topings.includes(toping.id) ? 'Удалить' : 'Добавить' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'ProductToping',
  props: {
    topingsProduct: Array
  },
  data () {
    return {
      topings: []
    }
  },
  methods: {
    updateTopings (topingId) {
      const topingIndex = this.topings.findIndex(value => value === topingId)
      if (topingIndex >= 0) {
        this.topings.splice(topingIndex, 1)
      } else {
        this.topings.push(topingId)
      }
      this.topings.sort((a, b) => a - b)
      this.$emit('topings:update', this.topings)
    }
  },
  computed: {
    topingsAll () {
      return this.$store.getters.getPizzaTopings(this.topingsProduct)
    }
  }
})
</script>
