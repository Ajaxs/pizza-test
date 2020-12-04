<template>
  <div class="order">
    <el-button type="danger" @click="modal = true">Оформить заказ</el-button>

    <el-dialog
      title="Оформление заказа"
      width="30%"
      :visible.sync="modal"
      @closed="closeModal">

      <el-form ref="order" :rules="rules" :model="user" label-width="120px">
        <el-form-item label="Ваше имя" prop="name">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="Телефон" prop="phone">
          <el-input v-model="user.phone"></el-input>
        </el-form-item>
        <el-form-item label="Адрес" prop="adress">
          <el-input v-model="user.adress"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="modal = false">Отмена</el-button>
        <el-button type="danger" @click="checkOrder">Оформить заказ</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  name: 'Order',
  data () {
    return {
      modal: false,
      user: {
        name: '',
        phone: '',
        adress: ''
      },
      rules: {
        name: [
          { required: true, message: 'Поле не должно быть пустым', trigger: 'blur' },
          { min: 2, message: 'Минимальная длинна 2 символа', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: 'Поле не должно быть пустым', trigger: 'blur' },
          { min: 10, message: 'Минимальная длинна 10 символа', trigger: 'blur' }
        ],
        adress: [
          { required: true, message: 'Поле не должно быть пустым', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    checkOrder () {
      this.$refs.order.validate(async (valid) => {
        if (valid) {
          console.log('valid')
          /*
          try {
            const response = await this.axios.post('/orders.php', {
              user: this.user,
              cart: this.cartItems
            })
          } catch (err) {
            console.log(err)
          } */

          this.$socket.emit('orderUser', {
            user: this.user,
            cart: this.cartItems
          })
        } else {
          console.log('error submit!!')
        }
      })
    },
    closeModal () {
      this.$refs.order.clearValidate()
    }
  },
  computed: {
    ...mapGetters({
      cartItems: 'cart/items'
    })
  }
})
</script>
