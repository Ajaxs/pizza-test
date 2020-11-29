<template>
  <div class="modal-pizza__image" v-if="sizeId">
    <img :src="variant.image" :alt="title">
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'ProductSize',
  props: {
    sizeId: Number,
    dough: String,
    title: String
  },
  computed: {
    variant () {
      return this.$store.getters.getPizzaVariant(this.sizeId, this.dough)
    }
  }
})
</script>
