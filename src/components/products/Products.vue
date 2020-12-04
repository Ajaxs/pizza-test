<template>
  <main class="all-products">
    <Section
      v-for="section in sections"
      :key="section.key"
      :section="section"
    />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Section from './Section.vue'

export default Vue.extend({
  name: 'Products',
  data () {
    return {
      sections: [
        { key: 'pizzas', title: 'Пицца' }
        /* { key: 'drinks', title: 'Напитки' } */
      ]
    }
  },
  components: {
    Section
  }
})
</script>
