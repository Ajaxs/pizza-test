<template>
  <div class="product-property" v-if="topingsAll">
    <div class="product-property__title">Добавить</div>
    <div class="product-property__variants topings">

      <el-card shadow="hover" v-for="toping in topingsAll" :key="toping.id" class="toping-card">
        <img :src="toping.image" :alt="toping.title">
        <div class="title">{{ toping.title }}</div>
        <el-button
          size="mini"
          class="toping-add"
          :type="isTopingSelected(toping.id) ? 'info' : 'danger'"
          @click="updateTopings(toping.id)"
        >
          {{ isTopingSelected(toping.id) ? 'Удалить' : `+${toping.cost} руб` }}
        </el-button>
      </el-card>

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
    },
    isTopingSelected (id) {
      return this.topings.includes(id)
    }
  },
  computed: {
    topingsAll () {
      return this.$store.getters['pizzas/topingsById'](this.topingsProduct)
    }
  }
})
</script>
