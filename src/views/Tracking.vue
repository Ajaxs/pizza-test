<template>
  <div class="main-column">
    <div class="page page__tracking">
      <h1>Статус заказа #{{ id }}</h1>
      <el-steps :active="status" finish-status="success" align-center>
        <el-step title="Заказ принят" description="Мы приняли ваш заказ"></el-step>
        <el-step title="Заказ готовится" description="Наши повара готовят заказ"></el-step>
        <el-step title="Доставка курьером" description="Курьер уже выехал к вам"></el-step>
        <el-step title="Заказ завершен" description="Спасибо что выбрали нас"></el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { meta } from '@/mixins/meta'

export default Vue.extend({
  name: 'Tracking',
  data () {
    return {
      status: 1
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  mounted () {
    this.$socket.emit('joinTrack', {
      id: this.id
    })
  },
  sockets: {
    changeStatusUser (data) {
      this.status = data
    }
  }
})
</script>
