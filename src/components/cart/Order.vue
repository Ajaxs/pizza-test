<template>
  <div class="order">
    <el-button type="danger" @click="modal = true">Оформить заказ</el-button>

    <el-dialog
      title="Оформление заказа"
      width="30%"
      :visible.sync="modal"
      @closed="closeModal">

      <el-form ref="order" :rules="rules" :model="order" label-width="130px">
        <el-form-item label="Ваше имя" prop="name">
          <el-input v-model="order.name" placeholder="Имя"></el-input>
        </el-form-item>
        <el-form-item label="Телефон" prop="phone">
          <el-input v-model="order.phone" placeholder="(xxx) xxx xx xx">
            <template slot="prepend">+7</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Адрес" prop="adress">
          <el-input v-model="order.adress" placeholder="Имя"></el-input>
        </el-form-item>
        <el-form-item label="Время доставки">
          <el-time-select
            placeholder="Укажите время"
            v-model="order.time"
            :picker-options="{
              start: '10:00',
              step: '00:15',
              end: '20:00'
            }">
          </el-time-select>
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
      order: {
        id: '',
        name: '',
        phone: '',
        adress: '',
        time: '',
        cart: []
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

          this.order.id = (Date.now()).toString(16)
          this.order.cart = this.cartItems

          this.$socket.emit('orderUser', {
            order: this.order
          })

          this.$refs.order.resetFields()
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
