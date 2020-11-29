import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from '@/types/types'
import { cart } from './modules/cart'
import { products } from './modules/products'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0'
  },
  modules: {
    cart,
    products
  }
}

export default new Vuex.Store<RootState>(store)
