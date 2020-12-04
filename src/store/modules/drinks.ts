import { Module, ActionTree, MutationTree, GetterTree } from 'vuex'
import { RootState, IDrinks } from '@/types/types'

const state: IDrinks = {
  items: [],
  sizes: []
}

// mutations
const mutations: MutationTree<IDrinks> = {}

// actions
const actions: ActionTree<IDrinks, RootState> = {}

// getters
const getters: GetterTree<IDrinks, RootState> = {}

export const drinks: Module<IDrinks, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
