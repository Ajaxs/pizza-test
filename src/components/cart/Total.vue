<template>
  <tr>
    <td :colspan="discount > 0 ? 2 : 4" class="coupon">
      <el-input placeholder="Введите скидочный купон" v-model="cod" class="coupon-input"></el-input>
      <el-button type="danger" @click="applayDiscount">Применить</el-button>
    </td>
    <td colspan="2" class="discount" v-if="discount > 0">
      {{ cost }} руб - {{ discount }} руб
    </td>
    <td class="cost-total">= {{ cost - discount }} руб</td>
    <td></td>
  </tr>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  name: 'Total',
  data () {
    return {
      cod: ''
    }
  },
  methods: {
    async applayDiscount () {
      if (this.cod) {
        try {
          const response = await this.axios.post('/discount.php', {
            promocod: this.cod,
            cost: this.cost
          })

          let discount, promocod, type

          if (response.data.status === 'success') {
            discount = response.data.discount
            promocod = response.data.cod
            type = 'success'
          } else {
            discount = 0
            promocod = ''
            this.cod = ''
            type = 'error'
          }

          this.$message({
            message: response.data.message,
            type: type
          })

          this.$store.dispatch('cart/applayDiscount', {
            discount,
            promocod
          })
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      promocod: 'cart/promocod',
      cost: 'cart/cost',
      discount: 'cart/discount'
    })
  },
  created () {
    this.cod = this.promocod
  }
})
</script>
