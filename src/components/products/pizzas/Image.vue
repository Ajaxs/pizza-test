<template>
  <div class="modal-pizza__image">
    <img :src="image" :alt="title">
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'ProductImage',
  props: {
    image: String,
    title: String
  }
})
</script>
