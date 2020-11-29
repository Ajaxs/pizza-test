<template>
  <div class="modal" :class="{show: status}">
    <div class="modal__overlay" @click="modalClose"></div>
    <div class="modal__dialog">
      <button class="modal__close" @click="modalClose">&times;</button>
      <div class="modal__body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Modal',
  props: ['open'],
  data () {
    return {
      status: false
    }
  },
  methods: {
    modalShow () {
      this.status = true
    },
    modalClose () {
      this.$router.push({ path: '/' })
      /* this.status = false */
    }
  },
  mounted () {
    this.status = this.open
    /* this.$root.$on('modal:show', this.modalShow) */
  }
})
</script>
