<template>
  <div class="product-property">
    <div class="product-property__title">Тесто</div>
    <div class="product-property__variants">
      <el-radio-group
        v-model="dough"
        size="small"
        fill="#ff5a59"
        @change="updateDough"
      >
        <el-radio-button
          v-for="item in doughs"
          class="label"
          :key="item.id"
          :label="item.dough"
          :disabled="diametr === 25 && item.dough === 'thin'"
        >{{ item.title }}</el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  name: 'ProductDough',
  props: {
    diametr: Number
  },
  data () {
    return {
      dough: 'standart'
    }
  },
  methods: {
    updateDough () {
      this.$emit('dough:update', this.dough)
    }
  },
  computed: {
    ...mapGetters({
      doughs: 'pizzas/doughs'
    })
  },
  mounted () {
    this.updateDough(this.dough)
  },
  watch: {
    diametr (value) {
      if (value === 25) {
        this.dough = 'standart'
        this.updateDough(this.dough)
      }
    }
  }
})
</script>
