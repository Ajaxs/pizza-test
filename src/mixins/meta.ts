import Vue from 'vue'

export const meta = Vue.extend({
  data () {
    return {
      metaTitle: 'Pani Pizza',
      metaDescription: 'Лучшая пицца'
    }
  },
  mounted () {
    document.title = this.metaTitle
    const description = document.querySelector('meta[name="description"]')
    if (description) {
      description.setAttribute('content', this.metaDescription)
    }
  }
})
