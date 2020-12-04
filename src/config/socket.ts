import store from '@/store'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

const soketConnection = SocketIO('http://localhost:3030')

export default new VueSocketIO({
  debug: process.env !== 'production',
  connection: soketConnection,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
})
