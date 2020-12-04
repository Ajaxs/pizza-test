import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import axios from '@/config/axios'
import { RootState } from '@/types/types'
import { cart } from './modules/cart'
import { pizzas } from './modules/pizzas'

Vue.use(Vuex)

const state = {
  version: '1.0.0'
}

// mutations
const mutations = {
  init (state, payload) {
    state.pizzas = payload.pizzas
  }
}

// actions
const actions = {
  async init ({ commit }) {
    const result = await axios.get('/api.php')
    commit('init', result.data)
  }
}

// getters
const getters = {}

const store: StoreOptions<RootState> = {
  state,
  mutations,
  actions,
  getters,
  modules: {
    cart,
    pizzas
  }
}

export default new Vuex.Store<RootState>(store)
