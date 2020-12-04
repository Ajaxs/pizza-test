import Vue from 'vue'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from '@/config/axios'
import Socket from '@/config/socket'
import { RadioGroup, RadioButton, Icon, Button, Card, Message, Input } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(VueAxios, Axios)
Vue.use(Socket)

Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Icon)
Vue.use(Button)
Vue.use(Card)
Vue.use(Input)
Vue.prototype.$message = Message

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
